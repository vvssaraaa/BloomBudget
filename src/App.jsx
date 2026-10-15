
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const STORAGE_KEY = "bloombudget-data";
const CATEGORIES = ["Food", "Transport", "Shopping", "Study", "Bills", "Salary", "Other"];
const COLORS = ["#c9b2f0", "#f4b8d2", "#b8e3c8", "#f6d989", "#b8dbe8", "#d9c2ef", "#edc9b0"];

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const initialData = {
  transactions: [
    { id: 1, description: "Coffee with friends", category: "Food", date: today(), amount: 65, type: "expense" },
    { id: 2, description: "Part-time salary", category: "Salary", date: today(), amount: 5000, type: "income" },
    { id: 3, description: "Little shopping trip", category: "Shopping", date: today(), amount: 240, type: "expense" },
    { id: 4, description: "Monthly transport", category: "Transport", date: today(), amount: 450, type: "expense" }
  ],
  goal: { name: "Something special", target: 10000, saved: 3200 }
};

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && Array.isArray(saved.transactions) && saved.goal) {
      return {
        transactions: saved.transactions,
        goal: {
          name: String(saved.goal.name || "Something special"),
          target: Number(saved.goal.target) > 0 ? Number(saved.goal.target) : 10000,
          saved: Math.max(0, Number(saved.goal.saved) || 0)
        }
      };
    }
  } catch {
    // Use sample data if storage is empty or unreadable.
  }
  return initialData;
}

const money = amount =>
  new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 2
  }).format(amount);

const dateLabel = value =>
  new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" })
    .format(new Date(`${value}T12:00:00`));

function PixelFlower() {
  return (
    <div className="flower-sprite" role="img" aria-label="Your pixel flower companion">
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
      <a className="brand" href="#home">
        <span className="brand-flower">✿</span>
        <span>Bloom<span className="brand-light">Budget</span></span>
      </a>
      <p className="side-label">YOUR WORLD</p>
      <nav aria-label="Main navigation">
        {[["⌂", "Dashboard", "#home"], ["▤", "Transactions", "#transactions"], ["◉", "Spending", "#spending"], ["♡", "Savings quest", "#savings"]].map(([icon, label, href], i) =>
          <a key={label} className={`nav-item ${i === 0 ? "selected" : ""}`} href={href}>
            <span>{icon}</span>{label}
          </a>
        )}
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

function TransactionForm({ onAdd }) {
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const description = String(data.get("description") || "").trim();
    const amount = Number(data.get("amount"));
    const category = String(data.get("category") || "");
    const date = String(data.get("date") || "");

    if (!description || description.length > 80) {
      setError("Add a description (maximum 80 characters).");
      return;
    }
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }
    if (!CATEGORIES.includes(category) || !date || date > today()) {
      setError("Choose a valid category and a date that is not in the future.");
      return;
    }

    onAdd({ description, amount: Math.round(amount * 100) / 100, category, date, type });
    form.reset();
    setType("expense");
    setError("");
    form.elements.description.focus();
  }

  return (
    <Panel eyebrow="COIN INVENTORY" title="Add a transaction" className="form-panel">
      <form id="transactions" onSubmit={submit}>
        <label>Description
          <input name="description" placeholder="e.g. Matcha with friends" maxLength="80" required />
        </label>
        <div className="form-row">
          <label>Amount (NOK)
            <input name="amount" type="number" placeholder="0.00" min="0.01" step="0.01" required />
          </label>
          <label>Type
            <select name="type" value={type} onChange={e => setType(e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>Category
            <select name="category" defaultValue="" required>
              <option value="" disabled>Choose one</option>
              {CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <label>Date
            <input name="date" type="date" defaultValue={today()} max={today()} required />
          </label>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button type="submit" className="pixel-button">＋ Add coins</button>
      </form>
      <p className="form-note">Every coin has a little story. ♡</p>
    </Panel>
  );
}

function SpendingPanel({ transactions }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const expenses = transactions.filter(t => t.type === "expense");
    const totals = CATEGORIES.map(category =>
      expenses.filter(t => t.category === category).reduce((sum, t) => sum + t.amount, 0)
    );
    const active = CATEGORIES.map((category, i) => ({ category, total: totals[i], color: COLORS[i] }))
      .filter(item => item.total > 0);

    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: active.map(item => item.category),
        datasets: [{
          data: active.map(item => item.total),
          backgroundColor: active.map(item => item.color),
          borderColor: "#49345f",
          borderWidth: 2,
          hoverOffset: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "62%",
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: context => ` ${context.label}: ${money(context.raw)}`
            }
          }
        }
      }
    });

    return () => chartRef.current?.destroy();
  }, [transactions]);

  const expenses = transactions.filter(t => t.type === "expense");
  const total = expenses.reduce((sum, t) => sum + t.amount, 0);
  const categories = CATEGORIES.map((category, i) => ({
    category,
    color: COLORS[i],
    total: expenses.filter(t => t.category === category).reduce((sum, t) => sum + t.amount, 0)
  })).filter(item => item.total > 0);

  return (
    <Panel eyebrow="COIN REPORT" title="Spending stats" className="spending-panel" >
      <p className="muted">Where did your coins wander this month?</p>
      <div className="spending-layout">
        <div className="donut">
          <canvas ref={canvasRef} role="img" aria-label="Doughnut chart of expenses by category" />
          <div className="donut-center"><span>✿</span><small>SPENT</small><small>{money(total)}</small></div>
        </div>
        {categories.length ? (
          <ul className="legend">
            {categories.map(item => (
              <li key={item.category}>
                <i style={{ background: item.color }} />
                <span>{item.category}</span>
                <strong>{total ? Math.round(item.total / total * 100) : 0}%</strong>
              </li>
            ))}
          </ul>
        ) : <p className="muted">No expenses yet. Add one to grow your chart!</p>}
      </div>
      <div className="game-tip"><span>🌱</span><p><strong>Garden wisdom</strong><br />Know your spending to help your savings grow.</p></div>
    </Panel>
  );
}

function TransactionList({ transactions, onDelete }) {
  const sorted = [...transactions].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  if (!sorted.length) return <p className="muted">Your coin history is empty. Add your first transaction!</p>;

  return (
    <div className="transaction-list">
      {sorted.map(t => (
        <article className="transaction" key={t.id}>
          <span className={`transaction-icon ${t.type === "income" ? "mint" : "pink"}`} aria-hidden="true">
            {t.type === "income" ? "✿" : "♡"}
          </span>
          <div className="transaction-details">
            <strong>{t.description}</strong>
            <small>{t.category} · {dateLabel(t.date)}</small>
          </div>
          <strong className={`amount ${t.type === "income" ? "earned" : ""}`}>
            {t.type === "income" ? "+" : "−"} {money(t.amount)}
          </strong>
          <button className="delete-button" type="button" aria-label={`Delete ${t.description}`} title="Delete transaction" onClick={() => onDelete(t.id)}>×</button>
        </article>
      ))}
    </div>
  );
}

function SavingsPanel({ goal, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(goal.name);
  const [target, setTarget] = useState(String(goal.target));
  const [saved, setSaved] = useState(String(goal.saved));
  const [error, setError] = useState("");

  useEffect(() => {
    setName(goal.name);
    setTarget(String(goal.target));
    setSaved(String(goal.saved));
  }, [goal]);

  function submit(event) {
    event.preventDefault();
    const cleanName = name.trim();
    const targetValue = Number(target);
    const savedValue = Number(saved);

    if (!cleanName || cleanName.length > 60 || !Number.isFinite(targetValue) ||
        !Number.isFinite(savedValue) || targetValue <= 0 || savedValue < 0) {
      setError("Enter a name, a positive target, and savings of zero or more.");
      return;
    }

    onUpdate({
      name: cleanName,
      target: Math.round(targetValue * 100) / 100,
      saved: Math.round(savedValue * 100) / 100
    });
    setError("");
    setEditing(false);
  }

  const percent = Math.min(100, Math.round(goal.saved / goal.target * 100));

  return (
    <Panel eyebrow="MAIN QUEST" title="Treasure goal" className="savings-panel">
      <div className="savings-content">
        <div className="companion-card"><span className="sparkle">✦</span><PixelFlower /><small>YOUR BUDDY</small><strong>Bloomie Lv. 3</strong></div>
        <div className="goal-info">
          <small className="muted">SAVING UP FOR</small>
          <h3>{goal.name}</h3>
          <p className="goal-amount">{money(goal.saved)} <span>/ {money(goal.target)}</span></p>
          <div className="goal-track" role="progressbar" aria-label="Savings goal progress" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100">
            <span style={{ width: `${percent}%` }} />
          </div>
          <strong className="goal-percent">{percent}% COMPLETE</strong>
          <button type="button" className="outline-button" onClick={() => setEditing(value => !value)}>
            {editing ? "Cancel editing" : "♡ Edit quest"}
          </button>
        </div>
      </div>

      {editing && (
        <form className="goal-form" onSubmit={submit}>
          <label>Goal name<input value={name} onChange={e => setName(e.target.value)} maxLength="60" required /></label>
          <div className="form-row">
            <label>Target (NOK)<input type="number" min="0.01" step="0.01" value={target} onChange={e => setTarget(e.target.value)} required /></label>
            <label>Saved (NOK)<input type="number" min="0" step="0.01" value={saved} onChange={e => setSaved(e.target.value)} required /></label>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="pixel-button" type="submit">Save quest</button>
        </form>
      )}

      <div className="game-tip pink-tip"><span>⭐</span><p><strong>Quest reminder</strong><br />Every little saving is XP for your future.</p></div>
    </Panel>
  );
}

export default function App() {
  const [data, setData] = useState(loadData);
  const { transactions, goal } = data;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      console.warn("BloomBudget could not save data to localStorage.");
    }
  }, [data]);

  const income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  function addTransaction(transaction) {
    setData(current => ({
      ...current,
      transactions: [...current.transactions, { ...transaction, id: Date.now() + Math.random() }]
    }));
  }

  function deleteTransaction(id) {
    setData(current => ({
      ...current,
      transactions: current.transactions.filter(t => t.id !== id)
    }));
  }

  function updateGoal(nextGoal) {
    setData(current => ({ ...current, goal: nextGoal }));
  }

  const month = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date()).toUpperCase();

  return (
    <div className="app">
      <Sidebar />
      <main className="main" id="home">
        <header className="topbar">
          <span>MY WORLD <b>/</b> DASHBOARD</span>
          <div><span className="month-tag">✿ {month}</span><span className="profile" aria-label="Profile">🌸</span></div>
        </header>

        <section className="welcome">
          <div>
            <small className="pixel-label">PLAYER 001 · MONEY GARDEN</small>
            <h1>Let's make your money <span>bloom!</span></h1>
            <p>Welcome back, little saver. Ready for a new quest?</p>
          </div>
          <div className="garden-art" aria-hidden="true"><span className="cloud">☁</span><span className="sun">☼</span><span className="garden-flower">✿</span><span className="garden-flower second">✿</span><span className="grass">▰ ▰ ▰ ▰ ▰</span></div>
        </section>

        <div className="level-bar">
          <span>✦ LEVEL 03</span><div className="xp-track"><span /></div>
          <span>GROW YOUR HABITS</span><span className="coin-count">🟡 {money(balance)}</span>
        </div>

        <section className="summary-grid" aria-label="Financial summary">
          <SummaryCard icon="↗" label="COINS EARNED" amount={income} note="✿ A little income magic" color="income" />
          <SummaryCard icon="↘" label="COINS SPENT" amount={expenses} note="♡ Money on the move" color="expense" />
          <SummaryCard icon="♧" label="COINS LEFT" amount={balance} note="✦ Income minus expenses" color="balance" />
        </section>

        <div className="dashboard-grid">
          <TransactionForm onAdd={addTransaction} />
          <SpendingPanel transactions={transactions} />
          <Panel eyebrow="LATEST ACTIVITY" title="Coin history" className="recent-panel">
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </Panel>
          <div id="savings"><SavingsPanel goal={goal} onUpdate={updateGoal} /></div>
        </div>

        <footer>✿ BLOOMBUDGET · A LITTLE GAME FOR YOUR MONEY ✿</footer>
      </main>
    </div>
  );
}
