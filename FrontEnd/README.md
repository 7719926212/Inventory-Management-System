# IMS - Inventory Management System Frontend

React + React Router + Axios + Bootstrap frontend for the Inventory Management System.

## Backend
Spring Boot backend runs on:
http://localhost:8081

The frontend calls:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/products
- POST /api/products
- GET /api/products/{id}
- PUT /api/products/{id}
- DELETE /api/products/{id}
- GET /api/categories
- POST /api/categories

## Run
npm install
npm run dev

Frontend default:
http://localhost:5173

## Implemented
- Registration/Login
- JWT Bearer token in Axios interceptor
- Protected routes
- Dashboard
- Product CRUD
- Product search by name/SKU
- Category filter
- Delete product
- Low-stock display (quantity <= 5)
- SKU format example WOOD-001
- Responsive Bootstrap UI
- Hover effects
- Loading, empty and error states
