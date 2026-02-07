# Woodiez Portfolio (naberMüdür?)

This is a full-stack developer portfolio website built for Woodiez.

## Stack

**Frontend:** React 18 (Vite) + TailwindCSS
**Backend:** Express.js (Node.js)
**Database:** MySQL 8
**Auth:** JWT
**ORM:** Sequelize

## Features

- User Authentication (Register, Login, Protected Routes)
- Dashboard to manage portfolio projects
- Modern, responsive UI with Framer Motion animations
- Toast notifications, form validation, error handling

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/your-username/naberMüdür?
cd naberMüdür?
```

### 2. Setup MySQL Database

- Ensure you have MySQL 8 running.
- Create a new database named `woodiez_portfolio`.
- Execute the SQL script located at `server/sql/init.sql` to create the necessary tables.

  ```sql
  -- Example command to run the SQL script (adjust for your client)
  mysql -u root -p woodiez_portfolio < server/sql/init.sql
  ```

### 3. Backend Setup (server)

```bash
cd server
npm install
cp .env.example .env
```

Edit the `.env` file with your MySQL database credentials and a strong JWT secret:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=woodiez_portfolio
JWT_SECRET=supersecretjwtkey
JWT_EXPIRES_IN=1h
```

Start the backend server:

```bash
npm start
```

The server will be running at `http://localhost:5000`.

### 4. Frontend Setup (client)

Open a new terminal window and navigate to the `client` directory:

```bash
cd ../client
npm install
cp .env.example .env
```

Edit the `.env` file if your backend API base URL is different (default is `http://localhost:5000/api`):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application will be available at `http://localhost:3000`.

## Technologies Used

- **Frontend:** React, Vite, TailwindCSS, Framer Motion, React Router DOM, Axios, React Toastify
- **Backend:** Express.js, Sequelize, MySQL2, Bcrypt.js, JSON Web Token, Joi, Helmet, CORS, Express Rate Limit

## Folder Structure

```
.
├── README.md
├── .gitignore
├── server
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── app.js
│   ├── sql
│   │   └── init.sql
│   ├── config
│   │   └── database.js
│   ├── models
│   │   ├── user.js
│   │   └── project.js
│   ├── controllers
│   │   ├── authController.js
│   │   └── projectController.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── projectRoutes.js
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── validationMiddleware.js
│   └── util
│       └── jwt.js
└── client
    ├── .env
    ├── .env.example
    ├── package.json
    ├── vite.config.js
    ├── index.html
    ├── src
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── index.css
    │   ├── api
    │   │   └── axiosInstance.js
    │   ├── components
    │   │   ├── ui
    │   │   ├── layout
    │   │   └── ProjectForm.jsx
    │   ├── context
    │   │   └── AuthContext.jsx
    │   ├── hooks
    │   │   └── useAuth.js
    │   ├── pages
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── NotFound.jsx
```