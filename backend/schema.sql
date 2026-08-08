-- Milestone Rent-a-Car — database schema
-- Works as-is on SQLite; for Postgres/MySQL swap AUTOINCREMENT -> SERIAL / AUTO_INCREMENT
-- and BOOLEAN defaults as needed.

DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS cars;

CREATE TABLE cars (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    name            TEXT NOT NULL,
    category        TEXT NOT NULL,          -- Economy, Sedan, SUV, Electric, Van, Luxury, Truck
    seats           INTEGER NOT NULL,
    transmission    TEXT NOT NULL,           -- Automatic, Manual
    economy         TEXT NOT NULL,           -- e.g. "36 mpg" or "230 mi range"
    price_per_day   NUMERIC(10,2) NOT NULL,
    shape           TEXT NOT NULL,           -- icon shape key used by the frontend: hatch, sedan, suv, van, sport, truck
    color           TEXT NOT NULL,           -- hex accent color used by the frontend
    active          BOOLEAN NOT NULL DEFAULT 1
);

CREATE TABLE bookings (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    code            TEXT NOT NULL UNIQUE,    -- e.g. MS-7K2QH1
    car_id          INTEGER NOT NULL REFERENCES cars(id),
    location        TEXT NOT NULL,
    pickup_date     DATE NOT NULL,
    dropoff_date    DATE NOT NULL,
    days            INTEGER NOT NULL,
    gps             BOOLEAN NOT NULL DEFAULT 0,
    child_seat      BOOLEAN NOT NULL DEFAULT 0,
    insurance       BOOLEAN NOT NULL DEFAULT 0,
    subtotal        NUMERIC(10,2) NOT NULL,
    tax             NUMERIC(10,2) NOT NULL,
    total           NUMERIC(10,2) NOT NULL,
    created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_bookings_car_id ON bookings(car_id);
CREATE INDEX idx_cars_category ON cars(category);

-- Seed data: the fleet
INSERT INTO cars (name, category, seats, transmission, economy, price_per_day, shape, color) VALUES
('Nimbus Hatch',     'Economy',  5, 'Automatic', '42 mpg',        34.00, 'hatch', '#6C7075'),
('Voyager Sedan',    'Sedan',    5, 'Automatic', '36 mpg',        48.00, 'sedan', '#2A2D31'),
('Highlander SUV',   'SUV',      7, 'Automatic', '26 mpg',        68.00, 'suv',   '#E1552B'),
('Zephyr EV',        'Electric', 5, 'Automatic', '230 mi range',  72.00, 'sedan', '#2F9E7D'),
('Atlas Van',        'Van',      8, 'Automatic', '22 mpg',        85.00, 'van',   '#6C7075'),
('Sterling Coupe',   'Luxury',   4, 'Automatic', '28 mpg',       120.00, 'sport', '#B8912F'),
('Ridge Pickup',     'Truck',    5, 'Automatic', '24 mpg',        75.00, 'truck', '#2A2D31'),
('Compass Hatch',    'Economy',  5, 'Manual',    '44 mpg',        31.00, 'hatch', '#E1552B');
