# FoodHub - Backend (API Server)

Robust and scalable REST API server for **FoodHub**, built with Node.js and Express.js.  
It handles authentication, meals, orders, reviews, statistics, and role-based access control using Prisma ORM.

---

## Core Features

### Authentication & Authorization
- Secure login system
- Role-based access control (ADMIN, PROVIDER, CUSTOMER)
- Protected routes using middleware

### Meals & Restaurant Management
- Create / update / delete meals
- Restaurant creation and management
- Category management (Admin only)
- Provider-specific meal system
- Home page meal listing

### Order System
- Create orders (Customer)
- View customer orders
- Provider order management
- Admin order management
- Update order status system

### Reviews
- Create reviews (authenticated users)

### Dashboard & Stats
- Customer stats
- Provider dashboard stats
- Admin analytics dashboard

### User Management
- Login system
- Profile update
- Admin user management
- Category creation (Admin only)

---

## Tech Stack

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL / MySQL
- Multer (File Upload)
- dotenv
- Session-based Authentication

---

Live Website URL Frontend: https://client-sandy-kappa.vercel.app

Live Website URL Backend: https://backend-theta-peach-32.vercel.app

GitHub Repository Link Frontend: https://github.com/TwistMehedi/asiggment-4-frontend

GitHub Repository Link Backend: https://github.com/TwistMehedi/foodHub-backend

## Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/TwistMehedi/foodHub-backend
cd foodHub-backend
npm install
npx prisma generate
npx prisma migrate dev
Create .env and follow example.env
npm run dev
