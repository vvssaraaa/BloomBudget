
import { dateLabel, money } from "../Utils/calculations";

export default function TransactionList({ transactions, onDelete }) {
  const sorted = [...transactions].sort(
    (a, b) => b.date.localeCompare(a.date) || b.id - a.id
  );

  if (!sorted.length) {
    return (
      <p className="muted">
        Your coin history is empty. Add your first transaction!
      </p>
    );
  }

  return (
    <div className="transaction-list">
      {sorted.map(transaction => (
        <article className="transaction" key={transaction.id}>
          <span
            className={`transaction-icon ${
              transaction.type === "income" ? "mint" : "pink"
            }`}
            aria-hidden="true"
          >
            {transaction.type === "income" ? "✿" : "♡"}
          </span>

          <div className="transaction-details">
            <strong>{transaction.description}</strong>
            <small>
              {transaction.category} · {dateLabel(transaction.date)}
            </small>
          </div>

          <strong
            className={`amount ${
              transaction.type === "income" ? "earned" : ""
            }`}
          >
            {transaction.type === "income" ? "+" : "−"}{" "}
            {money(transaction.amount)}
          </strong>

          <button
            className="delete-button"
            type="button"
            aria-label={`Delete ${transaction.description}`}
            title="Delete transaction"
            onClick={() => onDelete(transaction.id)}
          >
            ×
          </button>
        </article>
      ))}
    </div>
  );
}
