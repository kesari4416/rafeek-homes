# Rafeek Homes — Product Requirements Document

## Original Problem Statement
User requested a construction-company website inspired by suffolk.com for "Rafeek Homes", using their YouTube channel (https://www.youtube.com/@Rafeekhomessivaganga) for branding and content. Goal: showcase projects + generate leads.

## Business Context
Rafeek Homes / Rafeek Construction — a home builder & real-estate developer in Sivagangai, Tamil Nadu, India. Builds and sells individual villas / duplex homes (2BHK, 3BHK, 1000–1150 sq.ft, ₹40–85 lakhs). Active YouTube channel with home tours & launches.
- Phone: +91 99945 56889
- Address: Rafeek Construction, Muthu Nagar, Sivaganga - 630561
- Lead email recipient: sales@sparkcurv.com

## Architecture
- Frontend: React 19 (CRA + craco), Tailwind, framer-motion, @studio-freight/lenis (smooth scroll), react-fast-marquee, lucide-react icons. Single-page marketing site.
- Backend: FastAPI + Motor (MongoDB). Routes under /api.
- Email: Emergent-managed Resend proxy (EMAIL_BASE_URL constant, X-Email-Key header, from_name=Rafeek Homes).

## User Personas
1. Home buyer in Sivagangai looking for ready/under-construction homes.
2. Client wanting a custom home/villa built (turnkey).
3. Job seeker (careers).

## Core Requirements (static)
- Award-worthy, kinetic, editorial design (Earthy Brutalism: bone/sand + terracotta #C25E40).
- Sections: Hero, Marquee, About/Manifesto, Services, Stats, Projects, Videos (real YouTube embeds), Testimonials, Careers, Contact.
- Working lead form that saves to DB and emails the owner.

## Implemented (2026-08-08)
- Full single-page site with all sections; masked line-by-line hero reveal, parallax hero image, Lenis smooth scroll, count-up stats, marquees, hover micro-interactions.
- Real YouTube videos embedded (6 videos from the channel) + channel subscribe link.
- Contact form -> POST /api/contact: saves Inquiry to Mongo + sends styled HTML lead email to sales@sparkcurv.com (verified: email_sent=true). GET /api/inquiries to list.
- YouTube channel logo downloaded to /rafeek-logo.jpg and used in nav/footer.

## Verified
- Backend: /api/, POST /api/contact (email_sent true), GET /api/inquiries — all pass via curl.
- Frontend: compiles clean, hero renders with animation, no console errors.
- NOT visually screenshot-verified below the hero (screenshot harness conflicts with Lenis virtual scroll); code uses standard verified layout patterns.

## Backlog
- P1: Individual project detail pages; filter homes by budget/BHK.
- P1: Admin view for inquiries.
- P2: WhatsApp click-to-chat, Google Maps embed for office, multilingual (Tamil) toggle.
- P2: Real project photos from the owner (currently premium stock imagery).

## Next Tasks
- Gather real project photos & exact home listings from owner to replace stock.
- Optional admin dashboard for leads.
