# L'Auberge Espagnole

Full-stack e-commerce platform for premium Spanish gourmet products, currently in active development for a real client.

**Live Demo:** Coming Soon  
**Repository:** [github.com/Flavionz/auberge-ecommerce](https://github.com/Flavionz/auberge-ecommerce)

---

## About

L'Auberge Espagnole is a production-ready e-commerce application being developed for a business specializing in authentic Spanish gourmet products. The platform enables customers to browse and purchase products while providing administrators with comprehensive management tools.

This is an **active client project** with real business requirements, showcasing full-stack development capabilities and modern web architecture.

---

## Tech Stack

**Frontend**
- React 18 + TypeScript
- React Router v6
- Tailwind CSS
- Axios
- Vite

**Backend**
- Node.js + Express.js
- Prisma ORM
- SQLite (development) → PostgreSQL (production)
- JWT Authentication
- bcryptjs + jsonwebtoken
- Multer (file uploads)

**Security**
- JWT token-based authentication
- Bcrypt password hashing
- Role-based access control (Admin/User)
- Protected API routes with middleware

---

## Key Features

### Customer Experience
- Browse curated collection of Spanish gourmet products
- Advanced product filtering by category
- Responsive design (mobile, tablet, desktop)
- Modern dark-themed UI with premium aesthetics

### Admin Dashboard
- Secure authentication with JWT
- Product management (CRUD operations)
- Image upload with drag-and-drop
- Real-time inventory tracking
- Business analytics overview

---

## API Architecture

**Authentication Endpoints**
```
POST   /api/auth/register    - User registration
POST   /api/auth/login       - User authentication
GET    /api/auth/verify      - Token verification
```

**Product Endpoints**
```
GET    /api/products         - Retrieve all products
POST   /api/products         - Create product (Admin)
PUT    /api/products/:id     - Update product (Admin)
DELETE /api/products/:id     - Delete product (Admin)
```

---

## Database Schema
```prisma
User {
  id, email, password (hashed), role, createdAt
}

Category {
  id, name, products[]
}

Product {
  id, name, description, price, stock, image, categoryId, createdAt
}
```

---

## Project Status

🟢 **In Active Development**

Current focus: Implementing shopping cart, checkout flow, and payment integration.

---

## Developer

**Flavio Terenzi**  
Full-Stack Developer

[GitHub](https://github.com/Flavionz) | [LinkedIn](https://www.linkedin.com/in/flavioterenzi/)

---

*This project demonstrates production-ready full-stack development with modern authentication, RESTful API design, and scalable architecture for real-world business requirements.*

Built with ❤️ and ☕ for gourmet food lovers

