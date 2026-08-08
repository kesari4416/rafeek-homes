from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import httpx
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email (Emergent managed Resend proxy)
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class InquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    interest: Optional[str] = "General Enquiry"
    message: str


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    interest: str = "General Enquiry"
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


def build_lead_email(inq: Inquiry) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F8F6;padding:32px 0;font-family:Arial,Helvetica,sans-serif;">
      <tr><td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e5e1d8;">
          <tr><td style="background:#1A1A1A;padding:28px 32px;">
            <div style="color:#C25E40;font-size:12px;letter-spacing:3px;text-transform:uppercase;">New Website Lead</div>
            <div style="color:#ffffff;font-size:24px;font-weight:bold;margin-top:6px;">Rafeek Homes</div>
          </td></tr>
          <tr><td style="padding:32px;">
            <p style="font-size:15px;color:#4A4A4A;margin:0 0 20px;">You have received a new enquiry from your website.</p>
            <table width="100%" cellpadding="8" cellspacing="0" style="font-size:15px;color:#1A1A1A;border-collapse:collapse;">
              <tr><td style="width:130px;color:#8a8a8a;">Name</td><td style="font-weight:bold;">{inq.name}</td></tr>
              <tr><td style="color:#8a8a8a;">Phone</td><td style="font-weight:bold;">{inq.phone}</td></tr>
              <tr><td style="color:#8a8a8a;">Email</td><td style="font-weight:bold;">{inq.email}</td></tr>
              <tr><td style="color:#8a8a8a;">Interest</td><td style="font-weight:bold;">{inq.interest}</td></tr>
            </table>
            <div style="margin-top:20px;padding:16px;background:#F9F8F6;border-left:3px solid #C25E40;">
              <div style="color:#8a8a8a;font-size:12px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Message</div>
              <div style="font-size:15px;color:#1A1A1A;line-height:1.6;">{inq.message}</div>
            </div>
          </td></tr>
          <tr><td style="padding:20px 32px;border-top:1px solid #e5e1d8;font-size:12px;color:#8a8a8a;">
            Rafeek Construction, Muthu Nagar, Sivaganga - 630561 &middot; +91 99945 56889
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def send_email(recipient: str, subject: str, html: str, reply_to: Optional[str] = None):
    payload = {"to": [recipient], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to:
        payload["contact_email"] = reply_to
    async with httpx.AsyncClient(timeout=30) as http_client:
        resp = await http_client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Rafeek Homes API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


@api_router.post("/contact")
async def create_inquiry(payload: InquiryCreate):
    inquiry = Inquiry(**payload.model_dump())
    await db.inquiries.insert_one(inquiry.model_dump())

    email_sent = False
    try:
        await send_email(
            recipient=OWNER_EMAIL,
            subject=f"New Enquiry from {inquiry.name} — Rafeek Homes",
            html=build_lead_email(inquiry),
            reply_to=inquiry.email,
        )
        email_sent = True
    except Exception as e:
        logger.error(f"Lead email failed: {e}")

    return {"status": "success", "id": inquiry.id, "email_sent": email_sent}


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries():
    docs = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return [Inquiry(**d) for d in docs]


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
