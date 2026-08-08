import CarSVG from "./CarSVG.jsx";

export default function CarGrid({ cars, loading, error, onSelect }) {
  if (loading) {
    return <div className="empty">Loading the fleet…</div>;
  }
  if (error) {
    return <div className="empty">Couldn't reach the server: {error}</div>;
  }
  if (cars.length === 0) {
    return <div className="empty">No vehicles match that filter. Try another type.</div>;
  }

  return (
    <div className="car-grid">
      {cars.map((c) => (
        <div className="car-card" key={c.id}>
          <span className="car-tag" style={{ background: c.color }}>{c.category}</span>
          <div className="car-stage">
            <CarSVG shape={c.shape} color={c.color} />
          </div>
          <div className="car-name display">{c.name}</div>
          <div className="car-meta">
            <span>{c.seats} seats</span>
            <span>·</span>
            <span>{c.transmission}</span>
            <span>·</span>
            <span>{c.economy}</span>
          </div>
          <div className="car-footer">
            <div className="price mono">
              ${c.price}<span>/day</span>
            </div>
            <button className="btn-primary" onClick={() => onSelect(c)}>Select</button>
          </div>
        </div>
      ))}
    </div>
  );
}
