import CarSVG from "./CarSVG.jsx";

const EXTRA_PRICE = { gps: 8, childSeat: 6, insurance: 18 };
const TAX_RATE = 0.07;

export function computeTotals(car, days, extras) {
  const daysPrice = days * car.price;
  const extrasTotal = Object.keys(extras).reduce(
    (sum, key) => (extras[key] ? sum + EXTRA_PRICE[key] * days : sum),
    0
  );
  const subtotal = daysPrice + extrasTotal;
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  return { daysPrice, extrasTotal, subtotal, tax, total };
}

const ROWS = [
  { key: "gps", title: "GPS navigation", desc: "Turn-by-turn directions, offline maps" },
  { key: "childSeat", title: "Child seat", desc: "Rear-facing, ages 0–4" },
  { key: "insurance", title: "Full damage insurance", desc: "Zero deductible, covers third-party too" },
];

export default function ExtrasPanel({ car, days, extras, setExtras, onConfirm, onBack, submitting }) {
  const totals = computeTotals(car, days, extras);

  return (
    <div className="booking-layout">
      <div className="panel">
        <div className="selected-car-strip">
          <div className="selected-car-stage">
            <CarSVG shape={car.shape} color={car.color} width={90} height={60} />
          </div>
          <div>
            <h3 className="display" style={{ fontSize: 22, margin: 0 }}>{car.name}</h3>
            <div className="mono" style={{ color: "var(--steel)", fontSize: 13, marginTop: 4 }}>
              {car.category} · {car.seats} seats · ${car.price}/day
            </div>
          </div>
        </div>

        {ROWS.map((row) => (
          <div className="extra-row" key={row.key}>
            <div className="extra-info">
              <h3>{row.title}</h3>
              <p>{row.desc}</p>
            </div>
            <button
              className={`toggle ${extras[row.key] ? "on" : ""}`}
              onClick={() => setExtras({ ...extras, [row.key]: !extras[row.key] })}
              aria-pressed={extras[row.key]}
              aria-label={row.title}
            />
          </div>
        ))}
      </div>

      <div className="panel">
        <h3 style={{ fontSize: 18, textTransform: "none", fontWeight: 600, fontFamily: "'Inter',sans-serif", letterSpacing: 0, marginBottom: 6 }}>
          Trip summary
        </h3>
        <div className="summary-line">
          <span>{days} day{days > 1 ? "s" : ""} rental — ${car.price}/day</span>
          <span className="mono">${totals.daysPrice}</span>
        </div>
        {ROWS.map((row) =>
          extras[row.key] ? (
            <div className="summary-line" key={row.key}>
              <span>{row.title}</span>
              <span className="mono">${EXTRA_PRICE[row.key] * days}</span>
            </div>
          ) : null
        )}
        <div className="summary-line">
          <span>Taxes &amp; fees (7%)</span>
          <span className="mono">${totals.tax.toFixed(2)}</span>
        </div>
        <div className="summary-line total">
          <span>Total due</span>
          <span>${totals.total.toFixed(2)}</span>
        </div>
        <button className="btn-primary" style={{ width: "100%", marginTop: 20, padding: 14 }} onClick={onConfirm} disabled={submitting}>
          {submitting ? "Booking…" : "Confirm booking"}
        </button>
        <button className="btn-ghost" style={{ width: "100%", marginTop: 10, padding: 12 }} onClick={onBack}>
          Back to results
        </button>
      </div>
    </div>
  );
}
