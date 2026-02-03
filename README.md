🛠️ FoodHub - Backend (API Server)
"Robust API for Seamless Meal Management"

This is the core API server for FoodHub, built with Node.js and Express.js. It handles all business logic, user authentication, and database interactions using Prisma ORM.
🔐 Core Capabilities
Role-Based Access Control (RBAC): Secure API access management tailored to Admin, Provider, and Customer roles.

Database Management: Efficient schema handling and queries using Prisma ORM with PostgreSQL/MySQL.

Robust Error Handling: Global TryCatch utility for centralized error management and cleaner controllers.

Security & CORS: Configured with secure headers and frontend URL whitelisting to prevent unauthorized access.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

ORM: Prisma

Authentication: JWT (JSON Web Token)

Environment Management: Dotenv

Database: PostgreSQL / MySQL

Project Structure
├── config/         # Environment & Database configurations
├── routes/         # API Route definitions (Auth, Admin, Provider)
├── controllers/    # Business logic & Request handling
├── middleware/     # Auth, Role Verification & Error middlewares
├── utils/          # Helper functions (TryCatch, Custom Errors)
└── prisma/         # Database schema & Migration files

📦 Getting Started

Clone the repository:

Bash
git clone https://github.com/your-username/foodhub-backend.git

Environment Setup: Create a .env file in the root directory and add your credentials:

Code snippet
PORT=5000
DATABASE_URL="your-database-connection-string"
JWT_SECRET="your-super-secret-key"

Generate Prisma Client:

Bash
npx prisma generate

Run the server:

Bash
npm start

📡 API Endpoints Summary

MethodEndpointDescriptionPOST/api/auth/registerRegister a new user accountPOST/api/auth/loginAuthenticate user & receive tokenGET/api/admin/usersRetrieve all registered users (Admin only)GET/api/admin/ordersView and manage all platform ordersPATCH/api/provider/orders/:idUpdate order status (Processing/Delivered)

🛡️ Security Note
Ensure that the JWT_SECRET is never exposed in the frontend or public repositories. This backend expects the token to be sent via Cookies or the Authorization Header as a Bearer token.
