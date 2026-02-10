# FoodHub - Backend (API Server)
# Robust API for Seamless Meal Management

This is the core API server for FoodHub, built with Node.js and Express.js. It handles all business logic, user authentication, and database interactions using Prisma ORM.
# Core Capabilities
Role-Based Access Control Secure API access management tailored to Admin, Provider, and Customer roles.

Database Management: Efficient schema handling and queries using Prisma ORM with PostgreSQL.

Robust Error Handling: Global TryCatch utility for centralized error management and cleaner controllers.

Security & CORS: Configured with secure headers and frontend URL whitelisting to prevent unauthorized access.

# Tech Stack
Runtime: Node.js

Framework: Express.js

ORM: Prisma

Authentication: Betther Auth (session based aythentucation)

Environment Management: Dotenv

Database: PostgreSQL / MySQL

# Getting Started

Clone the repository:   https://github.com/TwistMehedi/foodHub-backend

Environment Setup: Create a .env file in the root directory and add your credentials check clone projrect env.local file for needed credential

Generate Prisma Client

npx prisma generate

npm start
