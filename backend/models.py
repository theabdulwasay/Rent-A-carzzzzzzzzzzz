from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Car(db.Model):
    __tablename__ = "cars"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    category = db.Column(db.String(30), nullable=False)
    seats = db.Column(db.Integer, nullable=False)
    transmission = db.Column(db.String(20), nullable=False)
    economy = db.Column(db.String(30), nullable=False)
    price_per_day = db.Column(db.Numeric(10, 2), nullable=False)
    shape = db.Column(db.String(20), nullable=False)
    color = db.Column(db.String(10), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=True)

    bookings = db.relationship("Booking", backref="car", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "seats": self.seats,
            "transmission": self.transmission,
            "economy": self.economy,
            "price": float(self.price_per_day),
            "shape": self.shape,
            "color": self.color,
        }


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    code = db.Column(db.String(20), nullable=False, unique=True)
    car_id = db.Column(db.Integer, db.ForeignKey("cars.id"), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    pickup_date = db.Column(db.Date, nullable=False)
    dropoff_date = db.Column(db.Date, nullable=False)
    days = db.Column(db.Integer, nullable=False)
    gps = db.Column(db.Boolean, nullable=False, default=False)
    child_seat = db.Column(db.Boolean, nullable=False, default=False)
    insurance = db.Column(db.Boolean, nullable=False, default=False)
    subtotal = db.Column(db.Numeric(10, 2), nullable=False)
    tax = db.Column(db.Numeric(10, 2), nullable=False)
    total = db.Column(db.Numeric(10, 2), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "id": self.id,
            "code": self.code,
            "car": self.car.to_dict() if self.car else None,
            "location": self.location,
            "pickupDate": self.pickup_date.isoformat(),
            "dropoffDate": self.dropoff_date.isoformat(),
            "days": self.days,
            "extras": {
                "gps": self.gps,
                "childSeat": self.child_seat,
                "insurance": self.insurance,
            },
            "subtotal": float(self.subtotal),
            "tax": float(self.tax),
            "total": float(self.total),
            "createdAt": self.created_at.isoformat() if self.created_at else None,
        }
