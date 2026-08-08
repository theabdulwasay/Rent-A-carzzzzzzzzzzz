# Milestone — Rent a Car

A full-stack car rental app: **React** frontend, **Flask** REST API, **SQL** (SQLite by default) database.

```
milestone-app/
├── backend/
│   ├── app.py            # Flask app + routes
│   ├── models.py         # SQLAlchemy models (Car, Booking)
│   ├── schema.sql        # Raw SQL schema + seed data (for reference / manual import)
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.jsx        # Main flow: search → results → extras → confirmation
    │   ├── api.js         # fetch() wrapper for the Flask API
    │   ├── index.css
    │   └── components/
    │       ├── RouteLine.jsx
    │       ├── SearchPanel.jsx
    │       ├── CarGrid.jsx
    │       ├── ExtrasPanel.jsx
    │       ├── Confirmation.jsx
    │       └── CarSVG.jsx
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## 1. Backend (Flask + SQLite)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Runs on **http://localhost:5000**. On first run it creates `milestone.db` (SQLite) from the
SQLAlchemy models and seeds the fleet automatically — you don't need to run `schema.sql` by
hand unless you want to inspect/import the raw SQL into Postgres/MySQL/another SQLite client.

To load `schema.sql` manually instead (e.g. with the `sqlite3` CLI):

```bash
sqlite3 milestone.db < schema.sql
```

### API endpoints

| Method | Path                  | Description                                   |
|--------|-----------------------|------------------------------------------------|
| GET    | `/api/cars`            | List cars, optional `?category=SUV`            |
| GET    | `/api/cars/<id>`       | Get one car                                     |
| GET    | `/api/categories`      | Distinct vehicle categories                     |
| POST   | `/api/bookings`        | Create a booking (server computes the price)    |
| GET    | `/api/bookings`        | List all bookings (used for the trip log)       |
| GET    | `/api/health`          | Health check                                    |

`POST /api/bookings` body:
```json
{
  "carId": 1,
  "location": "Downtown Station",
  "pickupDate": "2026-08-08",
  "dropoffDate": "2026-08-11",
  "extras": { "gps": true, "childSeat": false, "insurance": true }
}
```

## 2. Frontend (React + Vite)

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Runs on **http://localhost:5173** and proxies `/api/*` calls to the Flask server on port 5000
(see `vite.config.js`), so start the backend first.

## Notes

- Pricing (day rate, extras, 7% tax) is computed **server-side** in `app.py` on every booking —
  the frontend's live summary is for display only and is always re-validated.
- Swap `SQLALCHEMY_DATABASE_URI` in `app.py` to point at Postgres/MySQL instead of SQLite; the
  models and `schema.sql` are portable with minor type tweaks (noted in `schema.sql`).
- No auth/payments — this is a functional demo, not production-ready for real transactions.
