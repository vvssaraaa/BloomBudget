export default function Sidebar() {
  const links = [
    ["⌂", "Dashboard", "#home"],
    ["▤", "Transactions", "#transactions"],
    ["◉", "Spending", "#spending"],
    ["♡", "Savings quest", "#savings"]
  ];

  return (
    <aside className="sidebar">
      <a className="brand" href="#home">
        <span className="brand-flower">✿</span>
        <span>
          Bloom<span className="brand-light">Budget</span>
        </span>
      </a>

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
        <span className="quest-flower">✿</span>
        <small className="pixel-label">DAILY QUEST</small>
        <strong>Be kind to your coins!</strong>
        <p>Little steps grow big things.</p>
        <div className="xp-track"><span /></div>
        <small>One transaction at a time</small>
      </div>

      <p className="side-footer">♡ SAVE · GROW · REPEAT ♡</p>
    </aside>
  );
}
