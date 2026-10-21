
import { useState } from "react";
import { CATEGORIES, today } from "../Utils/calculations";

export default function TransactionForm({ onAdd, balance }) {
  const [type, setType] = useState("expense");
  const [error, setError] = useState("");

  function submit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const description = String(
      formData.get("description") || ""
    ).trim();

    const amount = Number(formData.get("amount"));
    const category = String(formData.get("category") || "");
    const date = String(formData.get("date") || "");

    if (!description || description.length > 80) {
      setError("Add a description (maximum 80 characters).");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }
    if (type === "expense" && amount > balance) {
      setError("Not enough coins! Check your available balance.");
      return;
    }

    if (
      !CATEGORIES.includes(category) ||
      !date ||
      date > today()
    ) {
      setError(
        "Choose a valid category and a date that is not in the future."
      );
      return;
    }
   
    onAdd({
      description,
      amount: Math.round(amount * 100) / 100,
      category,
      date,
      type
    });

    form.reset();
    setType("expense");
    setError("");
    form.elements.description.focus();
  }

  return (
    <section className="panel">
      <header className="panel-title">
        <div>
          <small className="pixel-label">ADD TO YOUR JOURNEY</small>
          <h2>Add transaction</h2>
        </div>

        <span className="panel-star" aria-hidden="true">✳</span>
      </header>

      <form id="transactions" onSubmit={submit}>
        <label>
          Description
          <input
            name="description"
            placeholder="e.g. Matcha with friends"
            maxLength="80"
            required
          />
        </label>

        <div className="form-row">
          <label>
            Amount (NOK)
            <input
              name="amount"
              type="number"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              required
            />
          </label>

         <div>
          <span className="field-label">Type</span>
          <div className="type-toggle" role="group" aria-label="Transaction type">
            <button type="button"
            className={`income ${type === "income" ? "active" : ""}`}
            onClick={() => setType("income")}>Income</button>
          <button
            type="button"
            className={`expense ${type === "expense" ? "active" : ""}`}
            onClick={() => setType("expense")}>Expense</button>
            </div>
          </div>
        </div>

        <div className="form-row">
          <label>
            Category
            <select name="category" defaultValue="" required>
              <option value="" disabled>
                Choose one
              </option>

              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date
            <input
              name="date"
              type="date"
              defaultValue={today()}
              max={today()}
              required
            />
          </label>
        </div>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="pixel-button">
          ＋ Add coins
        </button>
      </form>

      <p className="form-note">
        Every coin has a little story. ♡
      </p>
    </section>
  );
}
