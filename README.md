# TaskFlow – Full-Stack Task Management Web Application

TaskFlow is a modern, responsive, full-stack task management web application designed for users to organize daily activities, categorize tasks, set priorities and deadlines, track completed tasks, and monitor personal productivity.

---

## 🛠 Tech Stack

### Frontend
- **Framework & Tooling**: React.js (JavaScript, ES6+), Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Context API

### Backend
- **Framework**: NestJS (TypeScript, Node.js)
- **Database & ORM**: PostgreSQL, TypeORM
- **Authentication & Security**: JWT (JSON Web Tokens), bcrypt password hashing, HttpOnly cookies
- **Validation**: `class-validator`, `class-transformer`
- **Documentation**: Swagger (OpenAPI)

---

## 📁 Repository Structure

```text
TaskFlow/
├── frontend/             # React (Vite) client application
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/  # common, layout, tasks, categories
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/              # NestJS REST API application
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── tasks/
│   │   ├── categories/
│   │   ├── dashboard/
│   │   ├── common/
│   │   ├── config/
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── test/
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                 # Project documentation and specifications
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18+ or v20+)
- npm
- Git
- PostgreSQL (v14+)

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will start at `http://localhost:5173`.

### 3. Backend Setup
```bash
cd backend
npm install
npm run start:dev
```
The backend API will start at `http://localhost:3000/api`.

---

## 🗺 Implementation Roadmap
- [x] **Phase 1**: Project Initialization & Monorepo Setup
- [ ] **Phase 2**: Frontend Dashboard UI & Component System
- [ ] **Phase 3**: Backend Foundation, PostgreSQL & TypeORM Setup
- [ ] **Phase 4**: Backend Authentication & Security
- [ ] **Phase 5**: Frontend Authentication & Protected Routes
- [ ] **Phase 6**: Backend Task Management API
- [ ] **Phase 7**: Frontend Task Management UI & Interactions
- [ ] **Phase 8**: Task Priorities & Due Dates
- [ ] **Phase 9**: Category Management
- [ ] **Phase 10**: Task Filtering, Search & Sorting
- [ ] **Phase 11**: Dashboard Statistics & Metrics
- [ ] **Phase 12**: Automated Testing & Security Hardening
- [ ] **Phase 13**: Documentation & Production Deployment
