# 📱 ADRA Prototype

**A Frontend Mockup for the Smart Cultural Tourism Platform**

This directory contains the working prototype for the ADRA platform's user interface, designed to simulate the user experience and layout of the production system. This is a **frontend-only** preview and is **not connected** to live services or backend APIs.

---

## 🚀 Purpose

The prototype was created to:

* Visualize the design and UX of the final app
* Test navigation and layout across key sections
* Validate multi-role support (Tourist, Guide, Artisan, Admin)
* Showcase service pages before backend integration

---

## 📁 Directory Overview

```bash
Prototype/src/
├── pages/               # Page views (auth, home, profile, services, etc.)
├── components/          # Shared layout elements like navigation bar
├── layouts/             # Application-wide layout wrapper
├── assets/              # Static media (images, videos for preview)
├── locales/             # Translation files (ar / en)
├── config/              # Role configuration
├── context/             # Theme & context providers
├── hooks/               # Custom React hooks (role-based filters)
├── routes/              # App routing logic
├── services/            # Mocked API services (auth only)
├── store/               # Global state (auth store)
├── i18n.ts              # i18n config
└── main.tsx             # App entry point
```

---

## 🧩 Key Pages Implemented

* `/` – Welcome / Home page with hero, features, and trending content
* `/auth/login` – Login screen with role switcher
* `/auth/signup` – Signup screen
* `/profile` – User profile (dynamic role-aware)
* `/services/smart-guide` – AI-powered tour planner mockup
* `/services/book-experience` – Local experience booking
* `/services/discover-nearby` – Location-based discovery
* `/services/live-translate` – Translation UI sample
* `/services/preserve-culture` – Cultural preservation samples
* `/services/marketplace` – Future e-commerce landing
* `/services/events-activities` – Event listing (demo only)
* `/services/my-bookings` – Booking history
* `/services/local-streams` – Live content streams
* `/shorts` – Interactive tourism shorts mock

---

## 🌐 Internationalization

* Fully structured for Arabic & English (`/locales/ar`, `/locales/en`)
* `i18n.ts` manages translation loading & switching
* RTL layout supported dynamically

---

## 🎨 Technologies

| Stack         | Description                      |
| ------------- | -------------------------------- |
| React + Vite  | Lightweight React frontend setup |
| Tailwind CSS  | Utility-first modern styling     |
| Framer Motion | Animations & transitions         |
| React Icons   | Icon library                     |
| TypeScript    | Type safety for components       |

---

## ⚠️ Limitations

* This prototype does **not include any backend connection**
* All service pages are static or mocked
* Booking / Chat / Translation pages are for UX testing only

---

## 📜 License

This prototype is the intellectual property of the **ADRA Team**.
All rights reserved. For internal hackathon use and presentation purposes only.

---
