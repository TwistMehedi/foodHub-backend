# FoodHub Backend - Seed Data Guide

## Overview
This backend provides a complete food delivery API with comprehensive seed data for testing and development.

## Seeded Data Summary

### Categories (5 total)
- Pizza
- Burger
- Pasta
- Dessert
- Beverages

### Providers/Restaurants (3 total)
1. **Mario's Italian Kitchen** - Italian cuisine
2. **Burger Barn** - American burgers
3. **Sweet Dreams Bakery** - Desserts and bakery

### Meals (9 total)
- **Pizza**: Margherita Pizza ($12.99), Pepperoni Pizza ($14.99), BBQ Chicken Pizza ($16.99)
- **Burger**: Classic Cheeseburger ($10.99), Bacon Deluxe Burger ($13.99), Veggie Burger ($11.99)
- **Pasta**: Spaghetti Carbonara ($13.99), Penne Arrabbiata ($11.99), Fettuccine Alfredo ($12.99)
- **Dessert**: Chocolate Lava Cake ($7.99), Tiramisu ($6.99), Cheesecake ($8.99)
- **Beverages**: Fresh Orange Juice ($4.99), Cappuccino ($3.99), Iced Tea ($2.99)

### Users
- **Admin**: admin@foodhub.com
- **Providers**: 3 restaurant owners
- **Customers**: 8 sample customers

### Orders & Reviews
- 15 sample orders with various statuses
- Reviews for delivered orders

## API Endpoints

### Authentication
```
GET    /api/auth/get-session
POST   /api/auth/sign-in
POST   /api/auth/sign-up
POST   /api/auth/sign-out
POST   /api/auth/social/google
```

### Meals Management
```
GET    /api/meals              # All meals with filtering
GET    /api/meals/:id          # Single meal details
GET    /api/meals/home         # Featured meals for home page
GET    /api/meals/categories   # All categories
GET    /api/meals/providers    # All restaurants
GET    /api/meals/provider/:id # Restaurant details
POST   /api/meals/create       # Create meal (provider)
PUT    /api/meals/:id          # Update meal (provider)
DELETE /api/meals/:id          # Delete meal (provider)
```

### Restaurant Management
```
POST   /api/meals/create-resturant    # Create restaurant (provider)
GET    /api/meals/get-resturant      # Get provider's restaurant
PUT    /api/meals/edit/resturant     # Update restaurant (provider)
GET    /api/meals/admin/resturants   # All restaurants (admin)
```

### Order Management
```
POST   /api/order/create              # Create order
GET    /api/order/me                  # Customer orders
GET    /api/order/me/provider         # Provider orders
GET    /api/order/:id                 # Order details
GET    /api/order/provider/for/:id    # Provider order details
PATCH  /api/order/status/:id          # Update order status (provider)
GET    /api/order/admin/orders        # All orders (admin)
PATCH  /api/order/admin/order/status  # Update order status (admin)
```

### User Management
```
GET    /api/user/admin/users          # All users (admin)
PUT    /api/user/profile-update       # Update profile
```

### Reviews & Stats
```
POST   /api/review                    # Create review
GET    /api/stats/all                 # Provider stats
GET    /api/stats/admin/all           # Admin stats
```

## Running the Seed Script

```bash
# Seed admin user
npm run seed:admin

# Seed comprehensive data
npm run seed:data
```

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

## Sample API Calls

### Get all meals
```bash
curl http://localhost:3000/api/meals
```

### Get categories
```bash
curl http://localhost:3000/api/meals/categories
```

### Get providers
```bash
curl http://localhost:3000/api/meals/providers
```

### Get home meals
```bash
curl http://localhost:3000/api/meals/home
```

## Database Schema

The application uses PostgreSQL with Prisma ORM and includes the following models:
- User (customers, providers, admin)
- ProviderProfile (restaurant details)
- Meal (food items)
- Category (meal categories)
- Order (customer orders)
- OrderItem (order line items)
- Review (meal ratings)
- Address (delivery addresses)

## Authentication

Uses Better Auth with support for:
- Email/password authentication
- Google OAuth
- Session management
- Role-based access control (ADMIN, PROVIDER, CUSTOMER)

## Features

- ✅ Complete CRUD operations for meals and restaurants
- ✅ Order management with status tracking
- ✅ Review and rating system
- ✅ User role management
- ✅ Image upload support (Cloudinary)
- ✅ Comprehensive seed data
- ✅ Pagination and filtering
- ✅ Error handling and validation</content>
<parameter name="filePath">/workspaces/foodHub-backend/SEED_DATA_README.md