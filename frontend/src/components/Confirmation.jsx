const EXTRA_LABELS = { gps: "GPS", childSeat: "Child seat", insurance: "Full insurance" };

export default function Confirmation({ booking, bookings, onNewSearch }) {
  if (!booking) return null;

  const activeExtras = Object.keys(booking.extras).filter((k) => booking.extras[k]);
  const extrasText = activeExtras.length ? activeExtras.map((k) => EXTRA_LABELS[k]).join(", ") : "None";

  return (
    <>
      <div className="ticket">
        <div className="ticket-top">
          <div>
            <h2>Trip locked in</h2>
            <div className="ticket-code">{booking.code}</div>
          </div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--lane)" }}>
            MILESTONE
          </div>
        </div>
        <div className="perforation" />
        <div className="ticket-grid">
          <div className="ticket-item"><label>Vehicle</label><div>{booking.car.name}</div></div>
          <div className="ticket-item"><label>Pickup location</label><div>{booking.location}</div></div>
          <div className="ticket-item"><label>Pickup date</label><div>{booking.pickupDate}</div></div>
          <div className="ticket-item"><label>Return date</label><div>{booking.dropoffDate}</div></div>
          <div className="ticket-item"><label>Duration</label><div>{booking.days} day{booking.days > 1 ? "s" : ""}</div></div>
          <div className="ticket-item"><label>Add-ons</label><div>{extrasText}</div></div>
        </div>
        <div className="ticket-total">
          <span className="mono" style={{ fontSize: 13, color: "#B7B4AC", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Total charged
          </span>
          <span className="amt">${booking.total.toFixed(2)}</span>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 22 }}>
        <button className="btn-ghost" onClick={onNewSearch}>Book another trip</button>
      </div>

      {bookings.length > 1 && (
        <div className="trip-log">
          <h3 className="display">Trip log</h3>
          {bookings.map((b) => (
            <div className="trip-item" key={b.code}>
              <span className="n">
                {b.car.name}{" "}
                <span className="mono" style={{ color: "var(--steel)", fontWeight: 400 }}>· {b.code}</span>
              </span>
              <span className="p">${b.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
