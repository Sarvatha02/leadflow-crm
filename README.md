# LeadFlow CRM – Lead Management System

A full-stack Lead Management System built using React, Node.js, and PostgreSQL.
This application allows users to manage leads, update their status, and track basic conversion metrics through a clean and structured UI.

---

## 🚀 Features

* Add new leads (Name, Phone, Source)
* View all leads in a table
* Update lead status (Interested / Not Interested / Converted)
* Delete leads
* Search leads by name or phone (client-side filtering)
* Dashboard showing:

  * Total Leads
  * Converted Leads
  * Interested Leads
  * Conversion Rate
* Form validation on both frontend and backend

---

## 🛠️ Tech Stack

**Frontend**

* React (Vite)
* Custom CSS
* Fetch API

**Backend**

* Node.js


**Database**

* PostgreSQL

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sarvatha02/leadflow-crm.git
cd leadflow-crm
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=lead_db
```

Start the backend server:

```bash
node server.js
```

Backend runs on:
http://localhost:5000

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
http://localhost:5173

---


## 📁 Project Structure

leadflow-crm/
│
├── backend/
│   ├── controllers/
│   │   └── leadController.js
│   ├── routes/
│   │   └── leadRoutes.js
│   ├── .env
│   ├── db.js
│   ├── server.js
│   └── setupDb.js
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LeadForm.jsx
│   │   │   └── LeadList.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   └── vite.config.js

---


