# 🟢 Green Publications — MERN Stack Website

A full-stack book publishing website built with MongoDB, Express, React, and Node.js.

---

## 📁 Project Structure

```
green-publications/
├── client/          # React Frontend (port 3000)
└── server/          # Express Backend (port 5000)
```

---

## ⚙️ Setup Instructions (Windows)

### Step 1 — Clone / Open Project
Open the project folder in VS Code.

---

### Step 2 — Setup Backend (Server)

```bash
# Open a terminal in VS Code
cd server
npm install
```

**Create your `.env` file:**
1. Copy `.env.example` → rename to `.env`
2. Fill in your MongoDB Atlas connection string:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/green-publications?retryWrites=true&w=majority
JWT_SECRET=green_pub_super_secret_2024
NODE_ENV=development
```

**Start the server:**
```bash
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
✅ MongoDB Atlas Connected: cluster0.xxxxx.mongodb.net
```

---

### Step 3 — Create Admin Account (One Time Only)

After the server is running, open your browser and go to:
```
POST http://localhost:5000/api/auth/seed
```

Or use this curl command in a new terminal:
```bash
curl -X POST http://localhost:5000/api/auth/seed
```

Default admin credentials:
- **Email:** admin@greenpublications.com
- **Password:** admin123456

> ⚠️ Change the password after first login via the database!

---

### Step 4 — Setup Frontend (Client)

Open a **new terminal** in VS Code:

```bash
cd client
npm install
npm start
```

React app opens at: **http://localhost:3000**

---

### Step 5 — Add Your Logo

Place your logo file at:
```
client/public/logo.png
```

---

### Step 6 — Add Books via Admin Panel

1. Go to: http://localhost:3000/admin/login
2. Login with the credentials from Step 3
3. Click "Add Book" to add your 6 books with covers and prices

---

## 🔌 API Endpoints

| Method | Route | Access | Description |
|--------|-------|--------|-------------|
| GET | /api/books | Public | Get all books |
| GET | /api/books/:id | Public | Get one book |
| POST | /api/books | Admin | Add a book |
| PUT | /api/books/:id | Admin | Edit a book |
| DELETE | /api/books/:id | Admin | Delete a book |
| POST | /api/orders | Public | Place an order |
| GET | /api/orders | Admin | View all orders |
| PUT | /api/orders/:id | Admin | Update order status |
| DELETE | /api/orders/:id | Admin | Delete an order |
| POST | /api/auth/login | Public | Admin login |
| GET | /api/auth/me | Admin | Get admin profile |
| POST | /api/auth/seed | Public | Create first admin (run once) |

---

## 🧰 Tech Stack

- **Frontend:** React 18, React Router v6, Axios, react-hot-toast, react-icons
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud)
- **Auth:** JWT + bcryptjs
- **File Upload:** Multer (local /uploads)

---

## 📞 Support

Contact: info@greenpublications.com.bd
