const BODIES = {
  hatch: (color) => `<path d="M14 62 Q14 44 34 42 L46 26 Q52 20 62 20 L96 20 Q104 20 108 26 L118 42 Q140 44 144 62 L144 66 L14 66 Z" fill="${color}"/>
    <path d="M50 40 L58 26 L92 26 L100 40 Z" fill="none" stroke="#FAF7F1" stroke-width="2" opacity="0.55"/>`,
  sedan: (color) => `<path d="M10 60 Q10 44 30 42 L42 24 Q48 18 58 18 L100 18 Q108 18 112 24 L126 42 Q148 44 150 60 L150 65 L10 65 Z" fill="${color}"/>
    <path d="M46 38 L56 24 L98 24 L108 38 Z" fill="none" stroke="#FAF7F1" stroke-width="2" opacity="0.55"/>`,
  suv: (color) => `<path d="M12 62 Q12 40 32 38 L40 20 Q46 14 56 14 L104 14 Q112 14 118 20 L126 38 Q148 40 150 62 L150 68 L12 68 Z" fill="${color}"/>
    <path d="M44 36 L52 20 L108 20 L118 36 Z" fill="none" stroke="#FAF7F1" stroke-width="2" opacity="0.55"/>`,
  van: (color) => `<path d="M10 62 Q10 30 26 28 L128 28 Q148 30 150 62 L150 68 L10 68 Z" fill="${color}"/>
    <path d="M30 32 L30 60 M60 32 L60 60 M90 32 L90 60" stroke="#FAF7F1" stroke-width="2" opacity="0.4"/>`,
  sport: (color) => `<path d="M8 60 Q8 48 26 45 L44 22 Q50 16 62 16 L96 16 Q106 16 112 24 L132 44 Q152 46 154 60 L154 64 L8 64 Z" fill="${color}"/>
    <path d="M48 38 L58 22 L96 22 L108 38 Z" fill="none" stroke="#FAF7F1" stroke-width="2" opacity="0.55"/>`,
  truck: (color) => `<path d="M10 60 Q10 42 28 40 L38 22 Q44 16 54 16 L86 16 Q92 16 92 22 L92 40 L150 40 Q152 42 152 60 L152 66 L10 66 Z" fill="${color}"/>
    <path d="M46 36 L54 22 L84 22 L84 36 Z" fill="none" stroke="#FAF7F1" stroke-width="2" opacity="0.55"/>`,
};

export default function CarSVG({ shape = "sedan", color = "#2A2D31", width = 160, height = 90 }) {
  const body = (BODIES[shape] || BODIES.sedan)(color);
  return (
    <svg width={width} height={height} viewBox="0 0 160 90">
      <g dangerouslySetInnerHTML={{ __html: body }} />
      <circle cx="42" cy="66" r="11" fill="#1C1D20" />
      <circle cx="42" cy="66" r="4" fill="#EFEBE3" />
      <circle cx="120" cy="66" r="11" fill="#1C1D20" />
      <circle cx="120" cy="66" r="4" fill="#EFEBE3" />
    </svg>
  );
}
