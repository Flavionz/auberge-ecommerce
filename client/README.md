# 🍷 Auberge Espagnol

A modern, full-stack e-commerce platform for gourmet Spanish products, built with React, TypeScript, and Node.js.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Authentication](#authentication)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

Auberge Espagnol is a premium e-commerce platform designed for selling authentic Spanish gourmet products. The application features a modern, responsive frontend with an elegant dark theme, and a robust backend powered by Express.js and Prisma ORM.

## ✨ Features

### Customer Features
- 🛍️ Browse curated collection of Spanish gourmet products
- 🔍 Advanced product filtering and search
- 🛒 Shopping cart management
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🎨 Modern dark-themed UI with gold accents

### Admin Features
- 📊 Comprehensive admin dashboard with statistics
- ➕ Add, edit, and manage products
- 📦 Inventory management
- 📈 Sales analytics and insights
- 🔐 Protected admin routes

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Icon library
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Prisma** - ORM and database toolkit
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens

### DevOps & Tools
- **Git** - Version control
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🏗️ Architecture

The project follows a monorepo structure with separated client and server applications:

```
auberge-project/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── contexts/      # React Context providers
│   │   ├── pages/         # Page components
│   │   │   ├── admin/    # Admin dashboard pages
│   │   │   ├── auth/     # Authentication pages
│   │   │   └── shop/     # Customer-facing pages
│   │   ├── App.tsx       # Root component
│   │   └── main.tsx      # Entry point
│   └── package.json
│
└── server/                # Express backend
    ├── src/
    │   ├── controllers/  # Request handlers
    │   ├── routes/       # API routes
    │   ├── middleware/   # Custom middleware
    │   ├── prisma/       # Database schema & migrations
    │   └── server.ts     # Express app setup
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/auberge-espagnol.git
   cd auberge-espagnol
   ```

2. **Install dependencies**
   ```bash
   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**

   Create `.env` files in both client and server directories:

   **Server `.env`:**
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/auberge_db"
   JWT_SECRET="your-secret-key"
   PORT=3001
   ```

   **Client `.env`:**
   ```env
   VITE_API_URL=http://localhost:3001
   ```

4. **Database Setup**
   ```bash
   cd server
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the application**

   **Development mode:**
   ```bash
   # Terminal 1 - Start backend
   cd server
   npm run dev

   # Terminal 2 - Start frontend
   cd client
   npm run dev
   ```

   The application will be available at:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`

## 📁 Project Structure

### Key Directories

#### Client (`/client/src`)

```
src/
├── components/
│   ├── admin/           # Admin-specific components
│   │   ├── AdminLayout.tsx
│   │   └── AdminSidebar.tsx
│   ├── Navbar.tsx       # Main navigation
│   ├── Footer.tsx       # Site footer
│   └── ProductCard.tsx  # Product display component
│
├── contexts/
│   └── AuthContext.tsx  # Authentication state management
│
├── pages/
│   ├── admin/
│   │   ├── AdminDashboardPage.tsx
│   │   ├── AddProductPage.tsx
│   │   └── ManageProductsPage.tsx
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── AdminRouteProtector.tsx
│   ├── shop/
│   │   └── BoutiquePage.tsx
│   └── HomePage.tsx
│
├── App.tsx              # Root component with providers
├── AppRouter.tsx        # Route configuration
└── main.tsx            # Application entry point
```

#### Server (`/server/src`)

```
src/
├── controllers/
│   ├── authController.ts
│   └── productController.ts
│
├── routes/
│   ├── authRoutes.ts
│   └── productRoutes.ts
│
├── middleware/
│   ├── authMiddleware.ts
│   └── errorHandler.ts
│
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Database migrations
│
└── server.ts           # Express server setup
```

## 🔐 Authentication

The application implements a dual-role authentication system:

### User Roles
- **Customer**: Standard user with shopping capabilities
- **Admin**: Full access to dashboard and product management

### Current Implementation (Development)
```typescript
// Demo credentials
Admin: admin@auberge.com / admin
User: user@auberge.com / user
```

### Authentication Flow
1. User submits credentials via `LoginPage`
2. `AuthContext` manages authentication state
3. State persists in `localStorage`
4. `AdminRouteProtector` guards admin routes
5. Protected routes redirect unauthorized users

### Production Considerations
For production deployment, implement:
- JWT-based authentication
- HTTP-only cookies for token storage
- Password hashing with bcrypt
- Email verification
- Password reset functionality
- Rate limiting on auth endpoints

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Products
```
GET    /api/products          # Get all products
GET    /api/products/:id      # Get product by ID
POST   /api/products          # Create product (Admin)
PUT    /api/products/:id      # Update product (Admin)
DELETE /api/products/:id      # Delete product (Admin)
```

#### Authentication
```
POST   /api/auth/login        # User login
POST   /api/auth/register     # User registration
POST   /api/auth/logout       # User logout
GET    /api/auth/verify       # Verify token
```

## 🎨 Design System

### Color Palette
- **Primary**: Gold (#D4AF37) - Luxury and premium feel
- **Background**: Dark (#1a1a1a) - Modern, sophisticated
- **Accent**: Terracotta (#E07A5F) - Warmth and Spanish heritage
- **Text**: White/Gray - High contrast readability

### Typography
- **Headings**: Serif fonts for elegance
- **Body**: Sans-serif for readability
- **Tracking**: Wide letter-spacing for luxury feel

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd server
npm run build
# Set environment variables
# Deploy to hosting platform
```

### Database (Supabase/Railway)
- Set up PostgreSQL instance
- Run migrations: `npx prisma migrate deploy`
- Update `DATABASE_URL` in production environment

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run with coverage
npm run test:coverage
```

## 📈 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Order management system
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Multi-language support (ES/FR/EN)
- [ ] Advanced search with filters
- [ ] Customer account dashboard
- [ ] Inventory alerts
- [ ] Analytics dashboard

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the repository owner.

## 📄 License

This project is proprietary and confidential.

## 👤 Author

**Terenzi Flavio**


---

Built with ❤️ and ☕ for gourmet food lovers