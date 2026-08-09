"""Backend tests for Rafeek Homes API - contact/inquiries flow."""
import os
import time
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Read from frontend .env directly
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip()
                break
BASE_URL = BASE_URL.rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health / regression: server started without KeyError ---
def test_root_healthy(api):
    r = api.get(f"{BASE_URL}/api/", timeout=20)
    assert r.status_code == 200, r.text
    assert r.json() == {"message": "Rafeek Homes API"}


# --- Contact form end-to-end ---
def test_contact_submission_and_persistence(api):
    payload = {
        "name": "TEST_John Doe",
        "email": "TEST_john@example.com",
        "phone": "+91 99945 56889",
        "interest": "Villa Construction",
        "message": "TEST_Please share more details about your services.",
    }
    r = api.post(f"{BASE_URL}/api/contact", json=payload, timeout=45)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("status") == "success"
    assert isinstance(data.get("id"), str) and len(data["id"]) > 0
    assert "email_sent" in data and isinstance(data["email_sent"], bool)
    inquiry_id = data["id"]

    # persistence via GET /api/inquiries
    time.sleep(0.5)
    r2 = api.get(f"{BASE_URL}/api/inquiries", timeout=20)
    assert r2.status_code == 200, r2.text
    items = r2.json()
    assert isinstance(items, list)
    match = next((it for it in items if it.get("id") == inquiry_id), None)
    assert match is not None, "Newly-created inquiry not found in list"
    assert match["name"] == payload["name"]
    assert match["email"] == payload["email"]
    assert match["phone"] == payload["phone"]
    assert match["interest"] == payload["interest"]
    assert match["message"] == payload["message"]


# --- Validation ---
def test_contact_invalid_email_rejected(api):
    r = api.post(
        f"{BASE_URL}/api/contact",
        json={
            "name": "TEST_Bad Email",
            "email": "not-an-email",
            "phone": "1234567890",
            "interest": "General",
            "message": "TEST_bad email",
        },
        timeout=20,
    )
    assert r.status_code == 422, f"Expected 422, got {r.status_code}: {r.text}"


def test_root_still_alive_after_validation(api):
    # Regression: server didn't crash
    r = api.get(f"{BASE_URL}/api/", timeout=20)
    assert r.status_code == 200
