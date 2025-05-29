# React + PHP (XAMPP) Full Stack App

ToDoList-React-PHP is a full-stack To-Do list application combining React (with Vite) on the frontend and PHP on the backend. 
It's designed for local development using XAMPP.

- **Frontend**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Backend**: [PHP](https://www.php.net/) served via [XAMPP](https://www.apachefriends.org/)
- Ideal for local development with a modern frontend and traditional backend.

---
## Table of Contents

---
## 📁 Project Structure
- **php-backend/**: PHP backend logic
- [`checkSession.php`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/php-backend/checkSession.php): checks Session
- **[`src/`](https://github.com/Ge0rgeM/ToDoList-React-PHP/tree/main/src)**: Static assets
    - [`assets/`](): PNG images for task delete functionality
    - [`Header/`](): Header component code for the frontend
    - [`Container/`](): Main container component code for the frontend
    - [`Pages/`](): Pages that are accessible by the user
    - [`ProtectedRoute/`](): Code that protects the main page (ToDoList) from unauthorized access
    - [`App.jsx`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/php-backend/checkSession.php): Main APP Component 
    - [`index.css`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/php-backend/checkSession.php): Just CSS for index.html 
    - [`main.php`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/php-backend/checkSession.php): React Entry Point
- [`index.html`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/php-backend/checkSession.php): Just Simple HTML
- [`README.md`](): Project Documentation

---
## ✅ Requirements

To run this project locally, you need to have the following installed:

- 🟢 [Node.js](https://nodejs.org/) (v18 or higher)
- 📦 [npm](https://www.npmjs.com/) (comes with Node.js)
- 🌐 A modern browser (e.g., Chrome, Firefox)
- 🐘 A PHP server (e.g., XAMPP, Laragon, or built-in PHP server)
- 🛢️ MySQL database (or compatible)

### 📦 Required npm Packages

Install all packages with:

```bash
npm install
```

---
## ▶️ How to View/Use Project

# 1. npm install
# npm run dev

# Change DB connection

# Open XAMPP Start server

# cd php-backend
# php -S localhost:8000