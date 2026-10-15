
const transactions = [
  { icon: "☕", name: "Coffee with friends", category: "Food & drinks", date: "14 Oct", amount: -65, color: "pink" },
  { icon: "✿", name: "Part-time salary", category: "Salary", date: "12 Oct", amount: 5000, color: "lilac" },
  { icon: "♡", name: "Little shopping trip", category: "Shopping", date: "10 Oct", amount: -240, color: "yellow" },
  { icon: "▰", name: "Monthly transport", category: "Transport", date: "08 Oct", amount: -450, color: "mint" }
];

const money = amount =>
  new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 0
  }).format(amount);

function PixelFlower() {
  return (
    <div className="flower-sprite" aria-label="Your pixel flower companion" role="img">
      <i className="petal top" /><i className="petal left" />
      <i className="petal right" /><i className="petal bottom" />
      <span className="flower-face">•ᴗ•</span>
      <span className="stem" /><span className="leaf" />
    </div>
  );
}

function Panel({ eyebrow, title, children, className = "" }) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-title">
        <div><small className="pixel-label">{eyebrow}</small><h2>{title}</h2></div>
        <span className="panel-star" aria-hidden="true">✳</span>
      </header>
      {children}
    </section>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <a className="brand" href="#home"><span className="brand-flower">✿</span><span>Bloom<span className="brand-light">Budget</span></span></a>
      <p className="side-label">YOUR WORLD</p>
      <nav>
        {[["⌂", "Dashboard", "#home"], ["▤", "Transactions", "#transactions"], ["◉", "Spending", "#spending"], ["♡", "Savings quest", "#savings"]].map(([icon, label, href], i) =>
          <a key={label} className={`nav-item ${i === 0 ? "selected" : ""}`} href={href}><span>{icon}</span>{label}</a>
        )}
      </nav>
      <div className="side-quest">
        <span className="quest-flower">✿</span>
        <small className="pixel-label">DAILY QUEST</small>
        <strong>Be kind to your coins!</strong>
        <p>Little steps grow big things.</p>
        <div className="xp-track"><span /></div>
        <small>3 / 5 good money habits</small>
      </div>
      <p className="side-footer">♡ SAVE · GROW · REPEAT ♡</p>
    </aside>
  );
}

function SummaryCard({ icon, label, amount, note, color }) {
  return (
    <article className={`summary ${color}`}>
      <div className="summary-top"><span className="summary-icon">{icon}</span><small>{label}</small></div>
      <p className="summary-amount">{money(amount)}</p>
      <p className="summary-note">{note}</p>
      <span className="summary-spark" aria-hidden="true">✦</span>
    </article>
  );
}

function TransactionList() {
  return (
    <div className="transaction-list">
      {transactions.map(t => (
        <article className="transaction" key={t.name}>
          <span className={`transaction-icon ${t.color}`}>{t.icon}</span>
          <div className="transaction-details"><strong>{t.name}</strong><small>{t.category} · {t.date}</small></div>
          <strong className={`amount ${t.amount > 0 ? "earned" : ""}`}>{t.amount > 0 ? "+" : "−"} {money(Math.abs(t.amount))}</strong>
        </article>
      ))}
    </div>
  );
}

function SpendingPanel() {
  return (
    <Panel eyebrow="COIN REPORT" title="Spending stats" className="spending-panel" >
      <p className="muted">Where did your coins wander this month?</p>
      <div className="spending-layout">
        <div className="donut" role="img" aria-label="Sample spending breakdown: food 40 percent, shopping 25 percent, transport 20 percent, other 15 percent">
          <div className="donut-center"><span>✿</span><small>COINS</small><small>SPENT</small></div>
        </div>
        <ul className="legend">
          {[["Food", "40%", "lilac"], ["Shopping", "25%", "pink"], ["Transport", "20%", "mint"], ["Other", "15%", "yellow"]].map(([name, percent, color]) =>
            <li key={name}><i className={color} /><span>{name}</span><strong>{percent}</strong></li>
          )}
        </ul>
      </div>
      <div className="game-tip"><span>🌱</span><p><strong>Garden wisdom</strong><br />Know your spending to help your savings grow.</p></div>
    </Panel>
  );
}

function TransactionForm() {
  return (
    <Panel eyebrow="COIN INVENTORY" title="Add a transaction" className="form-panel">
      <form>
        <label>Description<input placeholder="e.g. Matcha with friends" /></label>
        <div className="form-row">
          <label>Amount (NOK)<input type="number" placeholder="0" min="0" /></label>
          <label>Type<select defaultValue="expense"><option value="expense">Expense</option><option value="income">Income</option></select></label>
        </div>
        <div className="form-row">
          <label>Category<select defaultValue=""><option value="" disabled>Choose one</option><option>Food</option><option>Transport</option><option>Shopping</option><option>Study</option><option>Bills</option><option>Salary</option><option>Other</option></select></label>
          <label>Date<input type="date" defaultValue="2026-10-15" /></label>
        </div>
        <button type="button" className="pixel-button">＋ Add coins</button>
      </form>
      <p className="form-note">Every coin has a little story. ♡</p>
    </Panel>
  );
}

function SavingsPanel() {
  return (
    <Panel eyebrow="MAIN QUEST" title="Treasure goal" className="savings-panel">
      <div className="savings-content">
        <div className="companion-card"><span className="sparkle">✦</span><PixelFlower /><small>YOUR BUDDY</small><strong>Bloomie Lv. 3</strong></div>
        <div className="goal-info">
          <small className="muted">SAVING UP FOR</small>
          <h3>Something special</h3>
          <p className="goal-amount">{money(3200)} <span>/ {money(10000)}</span></p>
          <div className="goal-track"><span /></div>
          <strong className="goal-percent">32% COMPLETE</strong>
          <button type="button" className="outline-button">♡ Edit quest</button>
        </div>
      </div>
      <div className="game-tip pink-tip"><span>⭐</span><p><strong>Quest reminder</strong><br />Every little saving is XP for your future.</p></div>
    </Panel>
  );
}

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main" id="home">
        <header className="topbar"><span>MY WORLD <b> / </b> DASHBOARD</span><div><span className="month-tag">✿ OCTOBER 2026</span><span className="profile">🌸</span></div></header>
        <section className="welcome">
          <div><small className="pixel-label">PLAYER 001 · MONEY GARDEN</small><h1>Let's make your money <span>bloom!</span></h1><p>Welcome back, little saver. Ready for a new quest?</p></div>
          <div className="garden-art" aria-hidden="true"><span className="cloud">☁</span><span className="sun">☼</span><span className="garden-flower">✿</span><span className="garden-flower second">✿</span><span className="grass">▰ ▰ ▰ ▰ ▰</span></div>
        </section>

        <div className="level-bar"><span>✦ LEVEL 03</span><div className="xp-track"><span /></div><span>650 / 1000 XP</span><span className="coin-count">🟡 8,220</span></div>

        <section className="summary-grid" aria-label="Monthly financial summary">
          <SummaryCard icon="↗" label="COINS EARNED" amount={12500} note="✿ A little income magic" color="income" />
          <SummaryCard icon="↘" label="COINS SPENT" amount={4280} note="♡ Money on the move" color="expense" />
          <SummaryCard icon="♧" label="COINS LEFT" amount={8220} note="✦ Your garden is growing" color="balance" />
        </section>

        <div className="dashboard-grid">
          <TransactionForm />
          <SpendingPanel />
          <Panel eyebrow="LATEST ACTIVITY" title="Coin history" className="recent-panel">
            <TransactionList />
            <a href="#transactions" className="view-all">VIEW ALL TRANSACTIONS ↗</a>
          </Panel>
          <div id="savings"><SavingsPanel /></div>
        </div>

        <footer>✿ BLOOMBUDGET · A LITTLE GAME FOR YOUR MONEY ✿</footer>
      </main>
    </div>
  );
}
