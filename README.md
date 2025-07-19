SMART TOURISM GUIDE - FULLSTACK PLATFORM
========================================

An intelligent AI-powered tourism platform designed for Tourists, Guides, Artisans, and Admins. The system is structured for scalability, modularity, and mobile readiness across all operating systems including Android, iOS, Huawei, and the Web.

------------------------------------------------------------
🌐 PROJECT STRUCTURE
------------------------------------------------------------

ADRA/
│
├── frontend/         # React + Vite + Tailwind UI (PWA Ready)
│   ├── .env          # VITE_API_BASE for backend
│   └── src/
│       ├── auth/     # Login, Signup, JWT, Role Routing
│       ├── pages/    # Feature pages (Chat, Image, Tools, etc.)
│       ├── layout/   # Layouts per role
│       ├── api/      # Fetch wrappers and interceptors
│       └── hooks/    # Auth / Tab manager / UI logic

├── backend/          # Central API Gateway
│   ├── routes/       # login, signup, verify
│   ├── controllers/  # role logic + JWT
│   ├── middlewares/  # auth guard, error handling
│   └── utils/        # helper functions

└── services/         # Independent Microservices (optional containers)
    ├── chat-service/
    ├── image-service/
    ├── message-service/
    └── booking-service/

------------------------------------------------------------
🔐 AUTHENTICATION DESIGN
------------------------------------------------------------

- One backend service handles all login/signup.
- Role-based access is determined after login.
- JWT token is returned and stored in `localStorage`.
- Each frontend page or route checks token + role.
- New actors (Guide, Artisan, Admin) redirect to their dashboards after login.
- Services themselves don’t handle auth logic.

------------------------------------------------------------
🚀 INSTALLATION AND INITIALIZATION
------------------------------------------------------------

1. Clone Project
----------------
git clone https://github.com/your-org/adra-tourism-platform.git
cd adra-tourism-platform

2. FRONTEND SETUP
-----------------
cd frontend

npm create vite@latest -- --template react-ts
npm install vite@4.4.9 --save-dev
npm install
npm install -D tailwindcss@3.4.1 postcss autoprefixer
npx tailwindcss init -p

# Configure tailwind.config.js and index.css properly

.env file (example):
--------------------
VITE_API_BASE=http://localhost:4000

3. BACKEND SETUP
----------------
cd ../backend
npm install

.env file (example):
--------------------
PORT=4000
JWT_SECRET=yourSecretKey

npm run dev

4. START LOCAL DEVELOPMENT
---------------------------
# Terminal 1: Start backend
cd backend && npm run dev

# Terminal 2: Start frontend
cd frontend && npm run dev

------------------------------------------------------------
📱 MOBILE / APP STORE DEPLOYMENT
------------------------------------------------------------

The frontend is PWA-ready and can also be exported using Capacitor or React Native WebView.

✅ Android (Google Play)
✅ iOS (App Store)
✅ Huawei (AppGallery)
✅ Web Browser (PWA)

Use `npm run build` in frontend and wrap with:
- Capacitor (Recommended)
- Expo (React Native wrapper)
- TWA (Trusted Web Activities for Android)

------------------------------------------------------------
📦 PLANNED FEATURES (MODULAR)
------------------------------------------------------------

Each service is accessed via its path (e.g., /chat, /image) and handled dynamically in UI.

If a service is down, UI will show:
- Static page
- "Coming Soon" label
- Placeholder images

All tabs remain in UI regardless of availability.

You may maintain a registry file `services.txt` like:

[AVAILABLE SERVICES]
/chat
/image
/message

[COMING SOON]
/tools
/booking
/ai-guide

------------------------------------------------------------
🧠 KEY MODULES (SIMPLE DESCRIPTION)
------------------------------------------------------------

Tourist:
- Discover attractions
- Book tours/workshops
- Buy artisan products

Guide:
- Manage own tours
- Set calendar + prices
- Communicate with tourists

Artisan:
- Sell products
- Schedule workshops
- Upload content

Admin:
- Moderate content
- Analyze traffic + reports
- Manage campaigns

------------------------------------------------------------
💡 DEVELOPMENT TIPS
------------------------------------------------------------

- Do NOT hardcode service URLs — use `.env` and dynamic routing.
- Always design UI with fallback states.
- Every page/component should respect the actor's role.
- Maintain services modularly: they are replaceable containers.
- Use placeholder components to keep UI functional even when backend is not ready.

------------------------------------------------------------
👥 TEAM ROLES
------------------------------------------------------------

- Frontend Developers – focus on UI, Role Navigation, Dynamic Tabs, PWA
- Backend Developers – handle auth, routing, service proxying
- AI Developers – build assistant tools, tagging, recommendations
- Mobile Engineers – export builds using Capacitor or Expo
- DevOps – manage Docker, Kubernetes, deployment pipelines

------------------------------------------------------------
📘 FINAL NOTE
------------------------------------------------------------

This project is still under active development. The frontend is designed as a stable base that will not require structural changes when backend services are connected or replaced.

Always use:
- Professional naming conventions
- Role-safe routing
- Environment-based configuration

> Contact the lead maintainer for questions or onboarding new team members.
