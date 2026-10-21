// src/components/GardenArt.jsx
// Low poly night forest: moon, pines, glowing cabin. Replaces the emoji "garden-art" block.
function Pine({ x, y = 0, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3" y="120" width="6" height="12" fill="#2a1a12" />
      <polygon points="0,62 20,104 -20,104" fill="#1d6a3a" />
      <polygon points="0,62 0,104 -20,104" fill="#2a8a4c" />
      <polygon points="0,84 26,126 -26,126" fill="#154f2b" />
      <polygon points="0,84 0,126 -26,126" fill="#1d6a3a" />
    </g>
  );
}

export default function GardenArt() {
  return (
    <div className="garden-art" aria-hidden="true">
      <svg viewBox="0 0 360 150" preserveAspectRatio="xMaxYMax meet">
        {/* moon + glow */}
        <circle cx="262" cy="34" r="32" fill="#ed78a8" opacity="0.18" />
        <circle cx="262" cy="34" r="18" fill="#ed78a8" />
        <polygon points="262,16 274,28 250,28" fill="#ffb0c8" opacity="0.6" />

        {/* back hills */}
        <polygon points="0,150 0,112 70,86 130,110 200,80 270,108 360,84 360,150" fill="#241540" />
        <polygon points="0,150 0,112 70,86 70,150" fill="#2d1a50" />

        {/* ground */}
        <polygon points="0,150 0,130 80,120 170,128 260,118 360,126 360,150" fill="#0e2417" />

        {/* trees */}
        <Pine x={28} y={-8} s={0.9} />
        <Pine x={66} y={0} s={0.75} />
        <Pine x={292} y={-6} s={0.95} />
        <Pine x={330} y={2} s={0.75} />

        {/* cabin */}
        <rect x="156" y="104" width="56" height="28" fill="#3a2418" />
        <rect x="156" y="104" width="28" height="28" fill="#2f1c13" />
        <polygon points="148,104 184,80 220,104" fill="#6a2442" />
        <polygon points="148,104 184,80 184,104" fill="#521a34" />
        <rect x="190" y="112" width="12" height="12" fill="#f2d779" />
        <rect x="186" y="108" width="20" height="20" fill="#f2d779" opacity="0.18" />
      </svg>
    </div>
  );
}