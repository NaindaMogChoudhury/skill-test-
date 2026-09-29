# Full-Stack Library Book Management System

A full-stack Library Book Management application built with **React.js**, **Node.js/Express**, and **MongoDB/Mongoose**.

## Features
- **Frontend (React.js)**:
  - Form containing: Book Title, Author Name, ISBN, Category, Publication Year
  - "Add Book" submission button
  - State management using `useState`
  - HTTP requests to backend using `Axios`
  - Success & error message notifications
  - Form auto-reset after submission
- **Backend (Node.js & Express)**:
  - `POST /api/books`: Validates fields and saves new book to MongoDB
  - `GET /api/books`: Retrieves all book records
  - Clean error handling & CORS configuration
- **Database (MongoDB & Mongoose)**:
  - Strongly-typed `Book` schema with Mongoose validations

## Setup & Running

### 1. Backend
```bash
cd backend
npm install
npm start
```
Server runs on `http://localhost:5000`

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:3000`
