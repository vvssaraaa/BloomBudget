// src/components/Pet.jsx
export default function Pet({ level = 1, message = "You're on track!" }) {
  return (
    <div className="companion-card">
      <div className="pet-scene">
        <span className="pet-bubble">{message}</span>

        <svg
          className="pet"
          viewBox="0 0 130 112"
          role="img"
          aria-label="Bloomie, your savings buddy"
        >
          {/* tail */}
          <g className="pet-tail">
            <polygon points="92,100 118,84 124,62 108,74 96,86" fill="#8e5ad0" />
            <polygon points="108,74 124,62 120,78" fill="#cfa8ff" />
          </g>

          {/* body */}
          <polygon points="36,84 84,84 92,106 28,106" fill="#8e5ad0" />
          <polygon points="36,84 60,84 60,106 28,106" fill="#7c49c0" />

          {/* ears */}
          <polygon points="26,44 34,8 58,30" fill="#8e5ad0" />
          <polygon points="34,36 37,18 49,30" fill="#ed78a8" />
          <polygon points="94,44 86,8 62,30" fill="#a470e8" />
          <polygon points="86,36 83,18 71,30" fill="#ed78a8" />

          {/* head facets */}
          <polygon points="22,50 60,26 98,50 92,84 60,96 28,84" fill="#b985f5" />
          <polygon points="22,50 60,26 60,96 28,84" fill="#a470e8" />
          <polygon points="22,50 60,26 98,50 60,60" fill="#cfa8ff" />

          {/* forehead gem */}
          <polygon points="60,31 66,40 60,49 54,40" fill="#79d6a0" />
          <polygon points="60,31 66,40 60,40" fill="#a8f0c6" />

          {/* eyes */}
          <g className="pet-eyes">
            <circle cx="45" cy="64" r="6" fill="#1a0f2b" />
            <circle cx="75" cy="64" r="6" fill="#1a0f2b" />
            <circle cx="47" cy="62" r="2" fill="#fff" />
            <circle cx="77" cy="62" r="2" fill="#fff" />
          </g>

          {/* cheeks, nose, mouth */}
          <ellipse cx="36" cy="75" rx="6" ry="4" fill="#ed78a8" opacity="0.55" />
          <ellipse cx="84" cy="75" rx="6" ry="4" fill="#ed78a8" opacity="0.55" />
          <polygon points="56,72 64,72 60,77" fill="#ed78a8" />
          <path
            d="M54 80 Q60 86 66 80"
            fill="none"
            stroke="#1a0f2b"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <small>Your buddy</small>
      <strong>Bloomie Lv. {level}</strong>
    </div>
  );
}