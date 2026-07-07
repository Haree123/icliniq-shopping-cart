<img width="1727" height="1002" alt="Screenshot 2026-07-08 at 3 30 58 AM" src="https://github.com/user-attachments/assets/d3313109-0636-4278-9503-07bab5e18b48" />
# 🛒 Shopping Cart Application

A full-stack Shopping Cart application built with **Astro.js**, **React**, **TypeScript**, following **Domain Driven Design (DDD)** principles and **Test Driven Development (TDD)** practices. The application is fully containerized using **Docker** and includes comprehensive backend testing.

---

# Features

## Product Management

- Create a product
- Update product details
- Delete a product
- Fetch all products
- Fetch a product by ID

## Shopping Cart

- View cart
- Add items to cart
- Update item quantity
- Remove items from cart

## Frontend

- Responsive UI
- Product Management
- Shopping Cart
- Toast notifications
- Loading states
- Error handling

---

# Tech Stack

## Frontend

- Astro 7
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Lucide Icons
- Sonner

## Backend

- Astro API Routes
- TypeScript
- Zod Validation

## Testing

- Jest
- Unit Testing
- Integration Testing

## Containerization

- Docker
- Docker Compose

---

# Project Structure

```text
src
├── components
│   ├── cart
│   ├── common
│   ├── product
│   └── ui
│
├── features
│   ├── cart
│   └── product
│
├── lib
│   └── api
│
├── services
│
├── shared
│
├── pages
│
└── types
```

---

# Architecture

The project follows a Domain Driven Design (DDD) approach.

```text
Request

↓

API Route

↓

Controller

↓

Service

↓

Repository

↓

Entity

↓

Response
```

Each domain (Product and Cart) contains:

- Controller
- Service
- Repository
- Entity
- Mapper
- Validator
- Types
- Module

---

# API Endpoints

## Product

| Method | Endpoint          | Description         |
| ------ | ----------------- | ------------------- |
| GET    | /api/products     | Fetch all products  |
| GET    | /api/products/:id | Fetch product by ID |
| POST   | /api/products     | Create product      |
| PUT    | /api/products/:id | Update product      |
| DELETE | /api/products/:id | Delete product      |

---

## Cart

| Method | Endpoint                   | Description     |
| ------ | -------------------------- | --------------- |
| GET    | /api/cart                  | View cart       |
| POST   | /api/cart                  | Add item        |
| PUT    | /api/cart/items/:productId | Update quantity |
| DELETE | /api/cart/items/:productId | Remove item     |

---

# Validation

Validation is implemented using **Zod**.

Examples:

- Product name is required
- Price must be greater than zero
- Stock cannot be negative
- Quantity cannot exceed available stock

---

# Error Handling

Custom error classes are used throughout the application.

Examples:

- 400 Bad Request
- 404 Not Found
- 409 Conflict
- 500 Internal Server Error

All API responses follow a consistent structure.

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {}
}
```

---

# Testing

## Unit Tests

Implemented for:

- Product Entity
- Product Service
- Cart Entity
- Cart Service

Run:

```bash
npm run test:unit
```

---

## Integration Tests

Implemented for:

- Product APIs
- Cart APIs

Run:

```bash
npm run test:integration
```

Run all backend tests:

```bash
npm run test:all
```

---

# Running Locally

## Install

```bash
npm install
```

Start development server

```bash
npm run dev
```

Application:

```
http://localhost:4321
```

---

# Docker

Build and start the application

```bash
npm run docker:start
```

Stop

```bash
npm run docker:stop
```

Restart

```bash
npm run docker:restart
```

Application:

```
http://localhost:4321
```

---

# Design Decisions

- Domain Driven Design (DDD) folder structure
- Separation of Controller, Service, Repository and Entity layers
- In-memory repositories for assessment simplicity
- Service layer contains business rules
- Zod used for request validation
- Shared error handling across all APIs
- React components built using shadcn/ui
- Responsive layout with Tailwind CSS
- Multi-stage Docker build for optimized production image

---

# Future Improvements

- Database integration (MongoDB/PostgreSQL)
- Authentication & Authorization
- Persistent cart storage
- Pagination & Filtering
- Product Search
- Image Upload
- Inventory Reservation
- Frontend component tests (React Testing Library)
- End-to-End tests (Playwright)

---

# Author

**Haree Prasad**
Senior Software Engineer

---

# Screenshots

## Product Management

The Product Management page allows users to create, edit, and delete products, with real-time validation and toast notifications.

![Product Management](https://github.com/user-attachments/assets/0130d1fa-d018-41ab-8a60-4ec57cdf6a38)

## Shopping Cart

The Shopping Cart page displays added products, allows quantity updates, and automatically recalculates the total amount.

![Shopping Cart](https://github.com/user-attachments/assets/b98bab35-04b0-4a84-8f11-5b679997f6fc)
