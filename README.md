# SMART TOURISM GUIDE - FRONTEND SETUP & STRUCTURE

This document outlines the professional, complete, and scalable frontend setup for the Smart Tourism Guide platform, focusing on building a modern and responsive UI with dynamic service handling, role-based routing, and future-ready deployment.

---

## 🔰 OVERVIEW

The **frontend** is a React + TypeScript application using **Vite** for speed, **Tailwind CSS** for modern design, and **PWA-ready configuration** to support deployment on:

* Android (Google Play)
* iOS (App Store)
* Huawei (AppGallery)
* Web Browser (PWA)
* Desktop Web

It will act as the **dynamic holder** for all services, where:

* Each service (chat, image, booking...) appears as an application in the UI.
* If a service is unavailable, it shows a “Coming Soon” page.
* The UI is built once and never changed when services are added or removed.

---

## 🚀 FRONTEND SETUP - STEP BY STEP

**Step 1: Create the Project**

* Navigate to your `frontend` folder:
  `cd ~/Documents/ADRA/frontend`
* Create project using Vite:
  `npm create vite@latest -- --template react-ts`

**Step 2: Install Vite**

* Install exact version used:
  `npm install vite@4.4.9 --save-dev`

**Step 3: Install Project Dependencies**

* Run full installation:
  `npm install`

**Step 4: Install Tailwind CSS**

* Install Tailwind + PostCSS:
  `npm install -D tailwindcss@3.4.1 postcss autoprefixer`
* Initialize configuration:
  `npx tailwindcss init -p`

**Step 5: Configure Tailwind**

* In `tailwind.config.js`:

```js
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
]
```

* In `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 6: Create `.env`**

* In the root of `frontend/`, create `.env`:

```
VITE_API_BASE=http://localhost:4000
```

**Step 7: Create Project Structure**

* Suggested structure:

```
frontend/
├── .env
├── public/
├── src/
│   ├── assets/               → Images, logos
│   ├── auth/                 → Login, Signup, Role Auth
│   ├── components/           → Reusable UI components
│   ├── layout/               → Layouts per role (Tourist, Guide…)
│   ├── pages/                → Main pages (Home, Chat, Image…)
│   ├── services/             → API wrappers for each service
│   ├── store/                → Global state (auth, tabs…)
│   ├── hooks/                → Custom hooks (useAuth, useTabs…)
│   ├── utils/                → Helper functions
│   ├── App.tsx
│   └── main.tsx
```

**Step 8: Run the Development Server**

* Start the frontend:
  `npm run dev`
* Access via:
  `http://localhost:5173`

---

## 🎯 FRONTEND CORE FEATURES

✅ **Dynamic App Menu (Application-Style UI)**

* Tabs: “File”, “Edit”, “Insert”, “Chat”, “Image”, etc.
* Tabs are **loaded dynamically** based on backend service availability.

✅ **Role-Based Layout**

* Tourist, Guide, Artisan, Admin see different dashboards after login.

✅ **Fallback UI**

* If a service like `/chat` is unavailable, its page shows:

  * "Coming Soon"
  * Default logo + placeholder content

✅ **Environment-Driven Routing**

* All backend URLs are derived from `.env`
* Services never hardcoded.

✅ **Modern UI Support**

* Animations, transitions, page motions
* Responsive grid layout
* Mobile-first design

✅ **Ready for Integration**

* API calls handled via centralized service layer
* Only change needed: switch `.env` for production or Kubernetes

---

## 📁 SERVICE TRACKING

Maintain a `services.txt` file (or dynamic API call) to track available services:

Example:

```
[ENABLED]
/chat
/image
/message

[COMING_SOON]
/ai-guide
/booking
```

The frontend uses this to:

* Render the correct tabs
* Show "Available Now" or "Coming Soon" views

---

## 📲 DEPLOYMENT OPTIONS

Once frontend is ready:

* Build: `npm run build`
* Wrap for mobile using:

  * **Capacitor** → Android, iOS, Huawei
  * **Expo WebView** → React Native Wrapper
  * **TWA** → Android Chrome Web Store

---

## 💡 DEVELOPER GUIDELINES

* Always use `.env` for all URLs.
* Don’t remove tabs — show fallback if service is not yet available.
* Respect roles in routing and UI.
* Create one layout system for all actors.
* Build once — never modify per service.

---

## ✅ NEXT STEPS AFTER FRONTEND SETUP

1. Implement **Login / Signup** page.
2. Implement **Role-Based Routing**.
3. Create App Layout & Dynamic Menu.
4. Design service pages (`/chat`, `/image`, …).
5. Add fallback logic if a service is missing.
6. Connect with backend when ready.
