export default function Pet({
  level = 1,
  message = "You're on track!"
}) {
  return (
    <div className="companion-card">
      <div className="pet-scene">
        <span className="pet-bubble">{message}</span>

        <svg
          className="pet"
          viewBox="0 0 130 112"
          role="img"
          aria-label="Bloomie, tuxedo cat savings buddy"
        >
          {/* Tail */}
          <g className="pet-tail">
            <polygon
              points="88,100 106,92 116,70 123,74 118,96 98,108"
              fill="#21182d"
            />
            <polygon points="116,70 123,74 119,82" fill="#ffffff" />
          </g>

          {/* Body (smaller = chibi proportions) */}
          <polygon points="38,84 82,84 92,109 28,109" fill="#21182d" />

          {/* White chest */}
          <polygon points="50,86 70,86 78,109 42,109" fill="#ffffff" />

          {/* Mitten paws */}
          <polygon points="36,99 51,99 52,111 32,111" fill="#ffffff" />
          <polygon points="69,99 84,99 88,111 68,111" fill="#ffffff" />

          {/* Ears: shorter, wider, set on the sides */}
          <polygon points="22,48 24,12 54,30" fill="#21182d" />
          <polygon points="28,38 29,22 43,31" fill="#f5e0e9" />

          <polygon points="98,48 96,12 66,30" fill="#21182d" />
          <polygon points="92,38 91,22 77,31" fill="#f5e0e9" />

          {/* Head: wider and rounder */}
          <polygon
            points="19,58 27,38 45,27 60,24 75,27 93,38 101,58 97,78 82,90 60,94 38,90 23,78"
            fill="#21182d"
          />

          {/* Small forehead blaze */}
          <polygon points="56,28 64,28 65,42 60,49 55,42" fill="#ffffff" />

          {/* Small round muzzle */}
          <polygon
            points="42,77 52,71 60,74 68,71 78,77 74,88 60,92 46,88"
            fill="#ffffff"
          />

          {/* Whiskers */}
          <g
            stroke="#f4e9ff"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.7"
          >
            <line x1="38" y1="80" x2="21" y2="77" />
            <line x1="38" y1="85" x2="22" y2="88" />
            <line x1="82" y1="80" x2="99" y2="77" />
            <line x1="82" y1="85" x2="98" y2="88" />
          </g>

          {/* Eyes: big, wide-set, sparkly */}
          <g className="pet-eyes">
            <ellipse cx="42" cy="61" rx="10" ry="11" fill="#7c4e11" />
            <ellipse cx="78" cy="61" rx="10" ry="11" fill="#7c4e11" />
            <ellipse cx="43" cy="62" rx="6.5" ry="8" fill="#21182d" />
            <ellipse cx="79" cy="62" rx="6.5" ry="8" fill="#21182d" />
            <circle cx="40" cy="57" r="3.4" fill="#ffffff" />
            <circle cx="76" cy="57" r="3.4" fill="#ffffff" />
            <circle cx="46" cy="66" r="1.7" fill="#ffffff" />
            <circle cx="82" cy="66" r="1.7" fill="#ffffff" />
          </g>

          {/* Rosy cheeks */}
          <ellipse
            cx="30"
            cy="75"
            rx="7"
            ry="4"
            fill="#f091b9"
            opacity="0.85"
          />
          <ellipse
            cx="90"
            cy="75"
            rx="7"
            ry="4"
            fill="#ed78a8"
            opacity="0.85"
          />

          {/* Tiny nose */}
          <polygon points="56.5,74 63.5,74 60,78 " fill="#ed78a8" />

          {/* Little "w" smile */}
          <path
            d="M60 78 L60 80.5 M60 80.5 Q56.5 85 53 81 M60 80.5 Q63.5 85 67 81"
            fill="none"
            stroke="#21182d"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Tiny collar */}
          <polygon points="47,91 60,95 73,91 69,99 51,99" fill="#811140" />
          <polygon points="60,97 64,101 60,105 56,101" fill="#f2d779" />
        </svg>
      </div>

      <small>Your buddy</small>
      <strong>Bloomie Lv. {level}</strong>
    </div>
  );
}