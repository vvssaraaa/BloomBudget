import { money } from "../Utils/calculations";

function SummaryCard({ icon, label, amount, note, color }) {
  return (
    <article className={`summary ${color}`}>
      <div className="summary-top">
        <span className="summary-icon">{icon}</span>
        <small>{label}</small>
      </div>

      <p className="summary-amount">{money(amount)}</p>
      <p className="summary-note">{note}</p>
      <span className="summary-spark" aria-hidden="true">✦</span>
    </article>
  );
}

export default function SummaryCards({ income, expenses, balance }) {
  return (
    <section className="summary-grid" aria-label="Financial summary">
      <SummaryCard
        icon="↗"
        label="COINS EARNED"
        amount={income}
        note="✿ A little income magic"
        color="income"
      />

      <SummaryCard
        icon="↘"
        label="COINS SPENT"
        amount={expenses}
        note="♡ Money on the move"
        color="expense"
      />

      <SummaryCard
        icon="♧"
        label="COINS LEFT"
        amount={balance}
        note="✦ Income minus expenses"
        color="balance"
      />
    </section>
  );
}
