# 🛡️ ADRA Backend

The backend layer of the ADRA Smart Tourism Platform serves as the **central API Gateway**, securely routing requests, managing service availability, enforcing role-based access, and enabling dynamic interactions between frontend clients and microservices.

---

## ⚙️ Key Responsibilities

| Function                        | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| 🌐 API Gateway                 | Single entry point for all service and UI requests.                        |
| 🔐 Authentication & Roles      | Manages secure access using JWT tokens and role-based rules.              |
| 🧠 Dynamic Routing              | Detects service availability and forwards or falls back automatically.    |
| 🧾 Logging & Monitoring         | Tracks request history and system health (future integration).            |
| 📦 Service Integration          | Connects to microservices via `.env` IPs/portsd.            |

---

## 📁 Folder Structure

```

backend/
├── src/
│   ├── routes/            # REST API endpoints grouped by feature (e.g., /chat, /guide)
│   ├── controllers/       # Business logic for each endpoint
│   ├── middleware/        # Authentication, fallback handler, logging
│   ├── services/          # Connectors to external microservices (Chat, AI, etc.)
│   ├── config/            # Environment configs and role definitions
│   ├── types/             # TypeScript interfaces and types
│   ├── utils/             # Utility functions
│   └── index.ts           # Main entry for Express server
├── .env                   # Dynamic port/IP config for all services
├── package.json
└── tsconfig.json

```

---

## 🔐 Authentication Strategy

- Uses JWTs for secure user sessions.
- Role-based access per endpoint (tourist, guide, artisan, admin).
- Auth middleware included for easy expansion.

---

## 🌍 Dynamic Service Handling

Services are registered by IP and port in `.env` like:

```

CHAT\_SERVICE\_URL=[http://172.25.0.5:5001](http://172.25.0.5:5001)
GUIDE\_SERVICE\_URL=[http://172.25.0.6:5002](http://172.25.0.6:5002)

````

If a service is **offline**, backend returns a **friendly fallback**:
```json
{ "message": "Coming Soon" }
````

---

## 🧪 Testing the Backend

Once you run:

```bash
npm install
npm run dev
```

You can test routes like:

* `GET /api/chat/status`
* `POST /api/guide/plan`
* `GET /api/services/available`

---

## 📜 License

This backend is part of the proprietary ADRA project.

© 2025 ADRA Team. All rights reserved.

---
