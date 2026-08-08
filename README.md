# 🚘✨ Milestone — Rent a Car

> ### 🛣️ **Your Journey. Your Car. Your Milestone.**
>
> A modern **full-stack car rental platform** built with **React ⚛️ + Flask 🐍 + SQL 🗄️**, designed with a clean booking flow, dynamic pricing, vehicle search, optional extras, and booking confirmation.

<p align="center">

**⚡ Fast • 🎨 Modern • 🚗 Interactive • 🔐 API-Driven • 📱 Responsive**

</p>

---

## 🌟 Overview

**Milestone — Rent a Car** is a full-stack vehicle rental application that provides a smooth end-to-end rental experience:

```text
🔎 Search
   ↓
🚘 Browse Cars
   ↓
🎯 Select Vehicle
   ↓
✨ Add Extras
   ↓
💰 Calculate Price
   ↓
📋 Confirm Booking
   ↓
🎉 Rental Confirmed
```

The application uses a **React + Vite** frontend communicating with a **Flask REST API**, while **SQLAlchemy + SQLite** handles persistent data storage.

> 💡 **Important:** All final booking prices are calculated and validated **server-side**, helping prevent incorrect client-side pricing.

---

# 🎨✨ Features

### 🔍 Smart Car Search

Search and filter the available fleet based on vehicle category.

* 🚘 Browse available vehicles
* 🚙 Filter by category
* 📍 Select pickup location
* 📅 Choose pickup & drop-off dates
* ⚡ Fast API-powered results

---

### 🚗 Vehicle Selection

Explore available cars through an interactive vehicle grid.

**Vehicle information can include:**

* 🏷️ Vehicle name
* 🚘 Category
* 💵 Daily rental rate
* 👥 Passenger capacity
* 🧳 Luggage capacity
* ⚙️ Transmission
* ⛽ Fuel type

---

### ✨ Rental Extras

Customize your rental with optional services:

| Extra             | Description                  |
| ----------------- | ---------------------------- |
| 🛰️ **GPS**       | Navigation assistance        |
| 👶 **Child Seat** | Additional child safety seat |
| 🛡️ **Insurance** | Additional rental protection |

---

### 💰 Dynamic Pricing

The application calculates the rental price based on:

```text
🚘 Vehicle Daily Rate
        ×
📅 Number of Rental Days
        +
✨ Selected Extras
        +
🧾 7% Tax
        ↓
💰 FINAL TOTAL
```

> 🔒 The **backend is the source of truth**. The frontend summary is only for preview; the Flask server recalculates the final amount when a booking is submitted.

---

### 📋 Booking Confirmation

After submitting a rental, users receive a confirmation containing:

* 🚘 Selected vehicle
* 📍 Pickup location
* 📅 Rental dates
* ✨ Selected extras
* 💵 Rental subtotal
* 🧾 Tax
* 💰 Final price

---

### 📖 Trip Log

Previously created bookings can be retrieved through:

```http
GET /api/bookings
```

This provides a simple booking history / trip log for the application.

---

# 🧱 Tech Stack

<div align="center">

### 🎨 Frontend

**React ⚛️**
**Vite ⚡**
**JavaScript 🟨**
**CSS3 🎨**

### 🐍 Backend

**Python 🐍**
**Flask 🌶️**
**Flask REST API 🔌**
**SQLAlchemy 🗄️**

### 💾 Database

**SQLite 🪶**

*PostgreSQL and MySQL can also be used with minor configuration changes.*

</div>

---

# 📂 Project Structure

```text
milestone-app/
│
├── 🐍 backend/
│   ├── app.py
│   ├── models.py
│   ├── schema.sql
│   └── requirements.txt
│
└── ⚛️ frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── api.js
    │   ├── index.css
    │   │
    │   └── components/
    │       ├── RouteLine.jsx
    │       ├── SearchPanel.jsx
    │       ├── CarGrid.jsx
    │       ├── ExtrasPanel.jsx
    │       ├── Confirmation.jsx
    │       └── CarSVG.jsx
    │
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

# 🧩 Application Architecture

```text
                    👤 USER
                      │
                      ▼
             ┌─────────────────┐
             │   ⚛️ React UI   │
             └────────┬────────┘
                      │
                      │ HTTP / REST
                      ▼
             ┌─────────────────┐
             │  🌶️ Flask API  │
             └────────┬────────┘
                      │
              ┌───────┴────────┐
              ▼                ▼
       ┌─────────────┐  ┌──────────────┐
       │ SQLAlchemy  │  │ Price Engine │
       └──────┬──────┘  └──────────────┘
              │
              ▼
        ┌─────────────┐
        │ 🗄️ SQLite   │
        │ milestone.db│
        └─────────────┘
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Project

```bash
git clone <your-repository-url>
cd milestone-app
```

---

# 🐍 2️⃣ Start the Backend

Navigate into the backend directory:

```bash
cd backend
```

Create a virtual environment:

### Linux / macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

### Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start Flask:

```bash
python app.py
```

The backend will run at:

```text
http://localhost:5000
```

🎉 On the first run, the application automatically creates:

```text
milestone.db
```

and seeds the initial vehicle fleet.

---

# ⚛️ 3️⃣ Start the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔌 API Documentation

## 🚘 Get All Cars

```http
GET /api/cars
```

Optional category filter:

```http
GET /api/cars?category=SUV
```

---

## 🚗 Get Single Car

```http
GET /api/cars/<id>
```

Example:

```http
GET /api/cars/1
```

---

## 🏷️ Get Categories

```http
GET /api/categories
```

Returns the available vehicle categories.

Example:

```json
[
  "Economy",
  "SUV",
  "Luxury",
  "Sedan"
]
```

---

# 📅 Create Booking

```http
POST /api/bookings
```

Example request:

```json
{
  "carId": 1,
  "location": "Downtown Station",
  "pickupDate": "2026-08-08",
  "dropoffDate": "2026-08-11",
  "extras": {
    "gps": true,
    "childSeat": false,
    "insurance": true
  }
}
```

### 🧠 Server-Side Pricing

The server calculates:

```text
Base Rental
     +
GPS
     +
Child Seat
     +
Insurance
     +
7% Tax
     =
FINAL PRICE
```

The frontend **cannot determine the authoritative final price**.

---

# 📖 Get Booking History

```http
GET /api/bookings
```

Returns previously created bookings.

Useful for the application's:

> 📚 **Trip Log**

---

# ❤️ Health Check

```http
GET /api/health
```

Example response:

```json
{
  "status": "ok"
}
```

---

# 🗄️ Database

The application uses **SQLite by default**:

```text
milestone.db
```

The database is automatically created using the SQLAlchemy models.

### Main Models

```text
🚘 Car
│
├── id
├── name
├── category
├── price
├── capacity
├── luggage
├── transmission
└── fuel

📅 Booking
│
├── id
├── car_id
├── location
├── pickup_date
├── dropoff_date
├── extras
└── total_price
```

---

# 📜 Raw SQL Schema

The project also includes:

```text
backend/schema.sql
```

You normally **do not need to execute this manually**, because the Flask application creates and seeds the database automatically.

If you want to manually import it using SQLite:

```bash
sqlite3 milestone.db < schema.sql
```

---

# 🔄 Database Migration

The application can be adapted for:

```text
🪶 SQLite
      │
      ├──────────────► 🐘 PostgreSQL
      │
      └──────────────► 🐬 MySQL
```

Update:

```python
SQLALCHEMY_DATABASE_URI
```

inside:

```text
backend/app.py
```

Minor SQL type adjustments may be required depending on the target database.

---

# ⚡ Frontend API Proxy

During development, Vite proxies API requests:

```text
React
  │
  │ /api/*
  ▼
Vite Dev Server
  │
  ▼
Flask :5000
```

Configuration is located in:

```text
frontend/vite.config.js
```

This allows the frontend to communicate with Flask without manually writing the backend URL throughout the application.

---

# 🎨 UI Components

The frontend is organized into reusable React components:

| Component          | Purpose                        |
| ------------------ | ------------------------------ |
| `App.jsx`          | 🧠 Main application flow       |
| `SearchPanel.jsx`  | 🔎 Search & rental parameters  |
| `CarGrid.jsx`      | 🚘 Vehicle listing             |
| `ExtrasPanel.jsx`  | ✨ Optional rental extras       |
| `Confirmation.jsx` | 🎉 Booking confirmation        |
| `RouteLine.jsx`    | 🛣️ Booking-flow visualization |
| `CarSVG.jsx`       | 🚗 Vehicle illustration        |
| `api.js`           | 🔌 Flask API communication     |

---

# 🛡️ Pricing Security

One of the most important design decisions is **server-side price validation**.

### ❌ Frontend

The frontend may calculate:

```text
Estimated Total
```

but this value is only used for UI feedback.

### ✅ Backend

When the user submits a booking:

```text
POST /api/bookings
        │
        ▼
Validate Request
        │
        ▼
Fetch Car From Database
        │
        ▼
Calculate Rental Days
        │
        ▼
Calculate Extras
        │
        ▼
Apply 7% Tax
        │
        ▼
Calculate Final Price
        │
        ▼
Save Booking
```

This prevents the client from being the final authority over the rental price.

---

# 🧪 Example User Journey

```text
┌─────────────────────────────┐
│ 🔎 Search Rental            │
│                             │
│ Location: Downtown Station  │
│ Pickup: 08 Aug 2026         │
│ Dropoff: 11 Aug 2026        │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ 🚘 Choose Your Car          │
│                             │
│ 🚗 Sedan                    │
│ 🚙 SUV                      │
│ 🏎️ Luxury                  │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ ✨ Customize Rental         │
│                             │
│ ☑ GPS                       │
│ ☐ Child Seat                │
│ ☑ Insurance                 │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│ 💰 Price Summary            │
│                             │
│ Rental       $XXX           │
│ Extras       $XX            │
│ Tax          $XX            │
│ ───────────────────         │
│ Total        $XXX           │
└──────────────┬──────────────┘
               │
               ▼
        🎉 BOOKING CONFIRMED
```

---

# 🧰 Development Commands

### Backend

```bash
cd backend
source venv/bin/activate
python app.py
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Production Build

```bash
npm run build
```

---

# ⚠️ Current Limitations

This project is a **functional full-stack demonstration**, not a production payment platform.

Currently it does **not** include:

* 🔐 User authentication
* 👤 User accounts
* 💳 Online payment processing
* 📧 Production email notifications
* 📱 SMS notifications
* 🔒 Advanced authorization
* ☁️ Production cloud deployment
* 🧾 Invoice generation
* 🛡️ Enterprise security controls

---

# 🚀 Future Improvements

The project can be extended with:

### 🔐 Authentication

```text
JWT Authentication
      +
Role-Based Access
      +
Admin Dashboard
```

### 💳 Payments

Integrate a payment gateway for:

* Card payments
* Online wallets
* Booking deposits
* Refunds

### 📍 Advanced Fleet Management

* GPS tracking
* Vehicle availability calendar
* Maintenance status
* Branch management
* Vehicle utilization analytics

### 📊 Admin Analytics

```text
📈 Revenue
🚘 Fleet Utilization
📅 Booking Trends
💰 Most Profitable Vehicles
👥 Customer Statistics
```

### ☁️ Deployment

Possible production architecture:

```text
React + Vite
     │
     ▼
Vercel / Netlify
     │
     ▼
Flask REST API
     │
     ▼
PostgreSQL
     │
     ▼
Cloud Infrastructure
```

---

# 🌟 Why This Project?

**Milestone — Rent a Car** demonstrates practical full-stack development concepts:

> ⚛️ **React Frontend**
> 🐍 **Flask REST API**
> 🗄️ **SQL Database**
> 🔌 **API Integration**
> 💰 **Server-Side Pricing**
> 🧩 **Component-Based Architecture**
> 📅 **Booking Workflow**
> 🎨 **Responsive UI**

It is suitable as a **portfolio project, university project, full-stack demonstration, or foundation for a production-grade rental platform.**

---

# 📜 License

This project is available for educational and development purposes.

---

<div align="center">

# 🚘✨ Milestone

### **Rent it. Drive it. Make it your milestone. 🛣️**

**Built with ❤️ using React + Flask + SQL**

⭐ **If you like this project, consider giving the repository a star!** ⭐

</div>

<img width="921" height="678" alt="image" src="https://github.com/user-attachments/assets/d801e339-bb74-4382-8be7-978954b1b59d" />

