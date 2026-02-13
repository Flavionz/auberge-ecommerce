# L'Auberge Espagnole

Modern full-stack e-commerce platform for premium Spanish gourmet products, developed for a real business with local delivery service in the Metz region, France.

**Repository:** [github.com/Flavionz/auberge-ecommerce](https://github.com/Flavionz/auberge-ecommerce)

---

## Overview

L'Auberge Espagnole is a production-ready e-commerce application built for an artisanal business specializing in authentic Spanish gourmet products. The platform addresses specific business requirements including local delivery logistics, inventory management, and secure payment processing.

**Note:** This is an active client project. The repository is public for portfolio purposes with client authorization, showcasing real-world development practices and problem-solving approaches.

---

## Technical Architecture

### Frontend Stack
- React 18 with TypeScript for type-safe component development
- React Router v6 for client-side routing and navigation
- Tailwind CSS for responsive, utility-first styling
- Context API for global state management
- Axios for API communication
- Vite as build tool and development server

### Backend Stack
- Node.js with Express.js framework
- Prisma ORM for type-safe database operations
- PostgreSQL 16 for production-grade data persistence
- JWT-based authentication with bcrypt hashing
- Multer for multipart/form-data handling
- RESTful API architecture

### Infrastructure
- Docker Compose for containerized development environment
- PostgreSQL running in Alpine Linux container
- PgAdmin 4 for database administration
- Persistent volume storage for data durability
- Network isolation between services

---

## Core Features

### Customer-Facing Interface
The platform provides a seamless shopping experience with product browsing, category filtering, shopping cart functionality, and a multi-step checkout process. The design adapts responsively across mobile, tablet, and desktop devices with a premium dark-themed aesthetic.

A unique aspect of this project is the **postal code validation system** that verifies delivery eligibility based on geographic proximity (15km radius from Metz), reflecting the business's local delivery model where the owner personally delivers orders.

### Administrative Interface
The admin dashboard offers comprehensive control over the e-commerce operations. Administrators can manage product catalogs with full CRUD capabilities, handle image uploads through an intuitive drag-and-drop interface, track inventory in real-time, and monitor business analytics.

The system includes role-based access control to ensure proper separation of concerns between administrative and customer-facing functionalities.

### Business Logic Implementation
The application implements specific business requirements including:
- Delivery zone validation for specific postal codes
- Free local delivery within eligible zones
- Payment method flexibility (cash on delivery and online payment infrastructure)
- Order management workflow with status tracking
- User account management with delivery address persistence

---

## Database Design

The application uses a relational database schema with four primary entities:

**Users** store authentication credentials (hashed), role assignments, and delivery information including addresses and postal codes. Each user can have multiple associated orders.

**Products** contain catalog information including names, descriptions, pricing, stock levels, images, and category relationships. Products link to categories through foreign key constraints.

**Categories** organize the product catalog into logical groupings, with each category supporting multiple products.

**Orders** capture transaction details including user relationships, item lists (stored as JSON), delivery addresses, payment methods, and order status tracking with timestamps.

---

## API Structure

The backend exposes RESTful endpoints organized into logical groups:

**Authentication endpoints** handle user registration, login, and token verification. All authentication uses JWT tokens with configurable expiration and bcrypt password hashing.

**Product endpoints** provide catalog access for customers and management capabilities for administrators. Product creation and updates require admin authentication.

**Order endpoints** manage the order lifecycle from creation through fulfillment. Users can view their order history while administrators have access to all orders with status update capabilities.

**User management endpoints** allow profile updates, address management, and password changes with proper authentication middleware.

---

## Development Approach

This project emphasizes **production-ready code** with proper error handling, input validation, and security best practices. The architecture is designed for scalability and maintainability.

The use of **TypeScript** throughout the frontend ensures type safety and improved developer experience. **Prisma ORM** provides type-safe database access with automatic migration handling.

**Docker containerization** ensures consistent development and deployment environments, with PostgreSQL running in an isolated container alongside PgAdmin for database administration.

The codebase follows modern React patterns including functional components, hooks, and context-based state management. The backend implements middleware for authentication, error handling, and request logging.

---

## Project Status

Currently in active development. The core e-commerce functionality is complete and operational. Ongoing work includes order confirmation flows, email notification systems, and payment gateway integration.

---

## Technical Highlights

- Full-stack TypeScript implementation
- Containerized development environment with Docker
- Production-grade PostgreSQL database with Prisma ORM
- JWT-based authentication with role-based access control
- RESTful API design with proper HTTP semantics
- Responsive UI with modern CSS frameworks
- Real-time cart updates and state management
- Multi-step form validation and user feedback
- Image upload and storage handling
- Secure password hashing and token management

---

## Developer

**Flavio Terenzi**  
Full-Stack Developer

[GitHub](https://github.com/Flavionz) | [LinkedIn](https://www.linkedin.com/in/flavioterenzi/)

---

Built with ❤️ and ☕ for gourmet food lovers