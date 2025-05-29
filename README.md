# React + PHP (XAMPP) Full Stack App

ToDoList-React-PHP is a full-stack To-Do list application combining React (with Vite) on the frontend and PHP on the backend. 
It's designed for local development using XAMPP.

- **Frontend**: [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
- **Backend**: [PHP](https://www.php.net/) served via [XAMPP](https://www.apachefriends.org/)
- Ideal for local development with a modern frontend and traditional backend.

---
## Table of Contents
- [📁 Project Structure](#-project-structure)
- [✅ Requirements](#-requirements)
- [📦 Required npm Packages](#-required-npm-packages)
- [▶️ How to View/Use Project](#️-how-to-viewuse-project)

---
## 📁 Project Structure
- **[`php-backend/`](https://github.com/Ge0rgeM/ToDoList-React-PHP/tree/main/php-backend)**: PHP backend logic
- [`checkSession.php`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/php-backend/checkSession.php): checks Session
- **[`src/`](https://github.com/Ge0rgeM/ToDoList-React-PHP/tree/main/src)**: Static assets
    - [`assets/`](https://github.com/Ge0rgeM/ToDoList-React-PHP/tree/main/src/assets): PNG images for task delete functionality
    - [`Header/`](https://github.com/Ge0rgeM/ToDoList-React-PHP/tree/main/src/Header): Header component code for the frontend
    - [`Container/`](https://github.com/Ge0rgeM/ToDoList-React-PHP/tree/main/src/Container): Main container component code for the frontend
    - [`Pages/`](https://github.com/Ge0rgeM/ToDoList-React-PHP/tree/main/src/Pages): Pages that are accessible by the user
    - [`ProtectedRoute/`](https://github.com/Ge0rgeM/ToDoList-React-PHP/tree/main/src/ProtectedRoute): Code that protects the main page (ToDoList) from unauthorized access
    - [`App.jsx`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/src/App.jsx): Main APP Component 
    - [`index.css`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/src/index.css): Just CSS for index.html 
    - [`main.php`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/src/main.jsx): React Entry Point
- [`index.html`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/index.html): Just Simple HTML
- [`README.md`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/README.md): Project Documentation
- [`.gitignore`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/README.md): Files that need to be ignored
- [`eslint.config.js`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/eslint.config.js): ESLint configuration for better code quality
- [`package.json`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/package.json): Project metadata and dependencies
- [`package-lock.json`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/package-lock.json): Locked dependency tree for consistent installs
- [`vite.config.js`](https://github.com/Ge0rgeM/ToDoList-React-PHP/blob/main/vite.config.js): Vite-specific build settings

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

Follow these steps to run the project on your local machine:

### 📁 1. Clone the Repository
```bash
git clone https://github.com/Ge0rgeM/ToDoList-React-PHP.git
cd ToDoList-React-PHP
```

### 📦 2. Install Node.js Dependencies
```bash
npm install
```
### 🐘 3. Set Up the PHP Backend
 - Navigate to the *php-backend/* folder.
 ```bash
 cd ToDoList-React-PHP/php-backend
 ```
 - Run a local PHP server or move the folder into your XAMPP htdocs folder.
 - Open XAMPP-control and start Apache and MySQL server.
 - You **do not** need to create anything in the database, since the code can do it by itself.
 - Update *config.php* with your database credentials. (If your credentials are default you can leave it as it is).
 - In *php-backend/* directory start server by writing:
 ```bash
 cd ToDoList-React-PHP/php-backend
 php -S localhost:8000
 ```
### ▶️ 4. Start the Development Server
In the project root (*cd .../ToDoList-React-PHP*), run:
```bash
npm run dev
```
This will start Vite server (website).

### 🌐 5. Open the App in Your Browser
In your web browser, write:
 - *http://localhost:5173* 

P.s. Make sure that PHP is running and accessible.


---
Let me know if you'd like to add database setup instructions or screenshots too!