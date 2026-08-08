const STOPS = [
  { step: 1, label: "Search" },
  { step: 2, label: "Choose car" },
  { step: 3, label: "Extras" },
  { step: 4, label: "Confirmed" },
];

export default function RouteLine({ step }) {
  return (
    <div className="route-line-wrap">
      <div className="route-stops">
        {STOPS.map((s) => (
          <div
            key={s.step}
            className={`stop ${s.step === step ? "active" : ""} ${s.step < step ? "done" : ""}`}
          >
            <div className="dot" />
            {s.label.toUpperCase()}
          </div>
        ))}
      </div>
      <div className="route-line" />
    </div>
  );
}
