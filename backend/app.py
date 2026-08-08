import os
import random
import string
from datetime import datetime, date

from flask import Flask, jsonify, request
from flask_cors import CORS

from models import db, Car, Booking

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
EXTRA_PRICE = {"gps": 8, "childSeat": 6, "insurance": 18}
TAX_RATE = 0.07


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{os.path.join(BASE_DIR, 'milestone.db')}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.init_app(app)
    CORS(app)  # allow the React dev server (different port) to call this API

    with app.app_context():
        db.create_all()
        _seed_if_empty()

    register_routes(app)
    return app


def _seed_if_empty():
    if Car.query.count() > 0:
        return
    fleet = [
        ("Nimbus Hatch", "Economy", 5, "Automatic", "42 mpg", 34.00, "hatch", "#6C7075"),
        ("Voyager Sedan", "Sedan", 5, "Automatic", "36 mpg", 48.00, "sedan", "#2A2D31"),
        ("Highlander SUV", "SUV", 7, "Automatic", "26 mpg", 68.00, "suv", "#E1552B"),
        ("Zephyr EV", "Electric", 5, "Automatic", "230 mi range", 72.00, "sedan", "#2F9E7D"),
        ("Atlas Van", "Van", 8, "Automatic", "22 mpg", 85.00, "van", "#6C7075"),
        ("Sterling Coupe", "Luxury", 4, "Automatic", "28 mpg", 120.00, "sport", "#B8912F"),
        ("Ridge Pickup", "Truck", 5, "Automatic", "24 mpg", 75.00, "truck", "#2A2D31"),
        ("Compass Hatch", "Economy", 5, "Manual", "44 mpg", 31.00, "hatch", "#E1552B"),
    ]
    for name, category, seats, trans, econ, price, shape, color in fleet:
        db.session.add(
            Car(
                name=name, category=category, seats=seats, transmission=trans,
                economy=econ, price_per_day=price, shape=shape, color=color,
            )
        )
    db.session.commit()


def _gen_code():
    return "MS-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=6))


def register_routes(app):

    @app.get("/api/cars")
    def list_cars():
        category = request.args.get("category")
        query = Car.query.filter_by(active=True)
        if category and category.lower() != "all":
            query = query.filter_by(category=category)
        cars = query.order_by(Car.price_per_day).all()
        return jsonify([c.to_dict() for c in cars])

    @app.get("/api/cars/<int:car_id>")
    def get_car(car_id):
        car = Car.query.get_or_404(car_id)
        return jsonify(car.to_dict())

    @app.get("/api/categories")
    def list_categories():
        rows = db.session.query(Car.category).distinct().all()
        return jsonify(sorted(r[0] for r in rows))

    @app.post("/api/bookings")
    def create_booking():
        data = request.get_json(force=True) or {}

        car_id = data.get("carId")
        location = (data.get("location") or "").strip()
        pickup_str = data.get("pickupDate")
        dropoff_str = data.get("dropoffDate")
        extras = data.get("extras") or {}

        if not car_id or not location or not pickup_str or not dropoff_str:
            return jsonify({"error": "carId, location, pickupDate and dropoffDate are required"}), 400

        car = Car.query.get(car_id)
        if not car:
            return jsonify({"error": "car not found"}), 404

        try:
            pickup = datetime.strptime(pickup_str, "%Y-%m-%d").date()
            dropoff = datetime.strptime(dropoff_str, "%Y-%m-%d").date()
        except ValueError:
            return jsonify({"error": "dates must be YYYY-MM-DD"}), 400

        days = (dropoff - pickup).days
        if days < 1:
            days = 1

        # Server computes the price — never trust a client-sent total.
        days_price = days * float(car.price_per_day)
        extras_total = sum(EXTRA_PRICE[k] * days for k in EXTRA_PRICE if extras.get(k))
        subtotal = days_price + extras_total
        tax = round(subtotal * TAX_RATE, 2)
        total = round(subtotal + tax, 2)

        code = _gen_code()
        while Booking.query.filter_by(code=code).first():
            code = _gen_code()

        booking = Booking(
            code=code,
            car_id=car.id,
            location=location,
            pickup_date=pickup,
            dropoff_date=dropoff,
            days=days,
            gps=bool(extras.get("gps")),
            child_seat=bool(extras.get("childSeat")),
            insurance=bool(extras.get("insurance")),
            subtotal=subtotal,
            tax=tax,
            total=total,
        )
        db.session.add(booking)
        db.session.commit()

        return jsonify(booking.to_dict()), 201

    @app.get("/api/bookings")
    def list_bookings():
        bookings = Booking.query.order_by(Booking.created_at.desc()).all()
        return jsonify([b.to_dict() for b in bookings])

    @app.get("/api/health")
    def health():
        return jsonify({"status": "ok"})


app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5000)
