export default function Sidebar() {
  const links = [
    ["⌂", "Dashboard", "#home"],
    ["▤", "Transactions", "#transactions"],
    ["◉", "Spending", "#spending"],
    ["♡", "Savings quest", "#savings"]
  ];

  return (
    <aside className="sidebar">
      <div className="brand">
        <svg className="brand-gem" viewBox="0 0 40 46" aria-hidden="true">
          <polygon points="20,2 32,16 20,30 8,16" fill="#b985f5" />
          <polygon points="20,2 32,16 20,16" fill="#d9b8ff" />
          <polygon points="8,24 13,31 8,38 3,31" fill="#ed78a8" />
          <polygon points="32,24 37,31 32,38 27,31" fill="#79d6a0" />
          <polygon points="20,30 22,46 18,46" fill="#1d6a3a" />
        </svg>

        <div className="brand-text">
          <span>BloomBudget</span>
          <small>Your little money garden</small>
        </div>
      </div>

      <p className="side-label">YOUR WORLD</p>

      <nav aria-label="Main navigation">
        {links.map(([icon, label, href], index) => (
          <a
            key={label}
            className={`nav-item ${index === 0 ? "selected" : ""}`}
            href={href}
          >
            <span>{icon}</span>
            {label}
          </a>
        ))}
      </nav>

      <div className="side-quest">
        <span className="quest-flower">
          <svg
            viewBox="0 0 60 70"
            width="48"
            height="56"
            aria-hidden="true"
            style={{ display: "block", margin: "0 auto 8px" }}
          >
            <polygon points="30,4 38,20 30,34 22,20" fill="#b985f5" />
            <polygon points="30,4 38,20 30,20" fill="#cfa8ff" />
            <polygon points="12,22 20,34 12,44 4,34" fill="#ed78a8" />
            <polygon points="48,22 56,34 48,44 40,34" fill="#79d6a0" />
            <polygon points="30,34 33,66 27,66" fill="#1d6a3a" />
            <polygon points="12,44 30,52 30,56 14,50" fill="#2a8a4c" />
          </svg>
        </span>

        <small className="pixel-label">DAILY QUEST</small>
        <strong>Be kind to your coins!</strong>
        <p>Little steps grow big things.</p>

        <div className="xp-track">
          <span />
        </div>

        <small>One transaction at a time</small>
      </div>

      <p className="side-footer">♡ SAVE · GROW · REPEAT ♡</p>
    </aside>
  );
}