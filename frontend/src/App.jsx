import { useEffect, useState } from "react";
import { getCars, getBookings, createBooking } from "./api.js";
import RouteLine from "./components/RouteLine.jsx";
import SearchPanel from "./components/SearchPanel.jsx";
import CarGrid from "./components/CarGrid.jsx";
import ExtrasPanel from "./components/ExtrasPanel.jsx";
import Confirmation from "./components/Confirmation.jsx";

const CATEGORIES = ["Economy", "Sedan", "SUV", "Electric", "Van", "Luxury", "Truck"];

function todayStr(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

function rentalDays(pickup, dropoff) {
  const diff = Math.round((new Date(dropoff) - new Date(pickup)) / 86400000);
  return diff > 0 ? diff : 1;
}

export default function App() {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState({
    location: "Downtown Station",
    pickupDate: todayStr(0),
    dropoffDate: todayStr(3),
    category: "all",
  });

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCar, setSelectedCar] = useState(null);
  const [extras, setExtras] = useState({ gps: false, childSeat: false, insurance: false });
  const [submitting, setSubmitting] = useState(false);

  const [lastBooking, setLastBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  const days = rentalDays(search.pickupDate, search.dropoffDate);

  async function loadCars(category) {
    setLoading(true);
    setError(null);
    try {
      const data = await getCars(category);
      setCars(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCars(search.category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSearch() {
    setStep(1);
    loadCars(search.category);
  }

  function handleSelectCar(car) {
    setSelectedCar(car);
    setExtras({ gps: false, childSeat: false, insurance: false });
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleConfirm() {
    setSubmitting(true);
    setError(null);
    try {
      const booking = await createBooking({
        carId: selectedCar.id,
        location: search.location,
        pickupDate: search.pickupDate,
        dropoffDate: search.dropoffDate,
        extras,
      });
      setLastBooking(booking);
      const all = await getBookings();
      setBookings(all);
      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleNewSearch() {
    setStep(1);
    setSelectedCar(null);
    loadCars(search.category);
  }

  return (
    <>
      <header>
        <div className="logo">
          <div className="logo-mark">M</div>
          <div className="logo-text">MILESTONE</div>
        </div>
        <nav>
          <span className="mono">STEP {step} OF 4</span>
          <span className="trip-count mono">
            {bookings.length} {bookings.length === 1 ? "TRIP BOOKED" : "TRIPS BOOKED"}
          </span>
        </nav>
      </header>

      <section className="hero">
        <svg className="road-bg" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <line x1="0" y1="360" x2="1200" y2="360" stroke="#3A3C41" strokeWidth="1" />
          <line x1="0" y1="200" x2="1200" y2="200" stroke="#F2C230" strokeWidth="3" strokeDasharray="26 22" opacity="0.5" />
        </svg>
        <div className="hero-inner">
          <div className="eyebrow">Pickup anywhere · Drop off anywhere</div>
          <h1>Every trip<br />starts at<br />mile zero.</h1>
          <p className="sub">Search the fleet, pick your route, and lock in a rate — no counters, no hidden fees, no waiting in line.</p>
        </div>

        <RouteLine step={step} />

        <SearchPanel search={search} setSearch={setSearch} categories={CATEGORIES} onSearch={handleSearch} />
      </section>

      <main>
        {step <= 2 && (
          <div>
            <div className="section-head">
              <h2>{loading ? "Loading…" : `${cars.length} vehicle${cars.length === 1 ? "" : "s"} available`}</h2>
              <div className="filter-chips">
                {["all", ...CATEGORIES].map((c) => (
                  <button
                    key={c}
                    className={`chip ${search.category === c ? "active" : ""}`}
                    onClick={() => {
                      const next = { ...search, category: c };
                      setSearch(next);
                      loadCars(c);
                    }}
                  >
                    {c === "all" ? "All" : c}
                  </button>
                ))}
              </div>
            </div>
            <CarGrid cars={cars} loading={loading} error={error} onSelect={handleSelectCar} />
          </div>
        )}

        {step === 3 && selectedCar && (
          <div>
            <div className="section-head"><h2>Complete your booking</h2></div>
            <ExtrasPanel
              car={selectedCar}
              days={days}
              extras={extras}
              setExtras={setExtras}
              onConfirm={handleConfirm}
              onBack={() => setStep(1)}
              submitting={submitting}
            />
            {error && <p style={{ color: "var(--signal)", marginTop: 12 }}>{error}</p>}
          </div>
        )}

        {step === 4 && lastBooking && (
          <Confirmation booking={lastBooking} bookings={bookings} onNewSearch={handleNewSearch} />
        )}
      </main>

      <footer>
        MILESTONE RENT-A-CAR — REACT + FLASK + SQL DEMO
      </footer>
    </>
  );
}
