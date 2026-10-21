
import { useEffect, useState } from "react";
import { money } from "../Utils/calculations";
import Pet from "./pet";


export default function SavingsGoal({ goal, onUpdate }) {
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

    if (
      !cleanName ||
      cleanName.length > 60 ||
      !Number.isFinite(targetValue) ||
      !Number.isFinite(savedValue) ||
      targetValue <= 0 ||
      savedValue < 0
    ) {
      setError(
        "Enter a name, a positive target, and savings of zero or more."
      );
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

  const percent = Math.min(
    100,
    Math.round((goal.saved / goal.target) * 100)
  );

  return (
    <section className="panel savings-panel">
      <header className="panel-title">
        <div>
          <small className="pixel-label">MAIN QUEST</small>
          <h2>Treasure goal</h2>
        </div>

        <span className="panel-star" aria-hidden="true">✳</span>
      </header>

      <div className="savings-content">
          <Pet level={3} />
          <strong>Bloomie Lv. 3</strong>
        </div>

        <div className="goal-info">
          <small className="muted">SAVING UP FOR</small>
          <h3>{goal.name}</h3>

          <p className="goal-amount">
            {money(goal.saved)}
            <span>/ {money(goal.target)}</span>
          </p>

          <div
            className="goal-track"
            role="progressbar"
            aria-label="Savings goal progress"
            aria-valuenow={percent}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span style={{ width: `${percent}%` }} />
          </div>

          <strong className="goal-percent">
            {percent}% COMPLETE
          </strong>

          <button
            type="button"
            className="outline-button"
            onClick={() => {
              setEditing(value => !value);
              setError("");
            }}
          >
            {editing ? "Cancel editing" : "♡ Edit quest"}
          </button>
        </div>

      {editing && (
        <form className="goal-form" onSubmit={submit}>
          <label>
            Goal name
            <input
              value={name}
              onChange={event => setName(event.target.value)}
              maxLength="60"
              required
            />
          </label>

          <div className="form-row">
            <label>
              Target (NOK)
              <input
                type="number"
                min="0.01"
                step="0.01"
                value={target}
                onChange={event => setTarget(event.target.value)}
                required
              />
            </label>

            <label>
              Saved (NOK)
              <input
                type="number"
                min="0"
                step="0.01"
                value={saved}
                onChange={event => setSaved(event.target.value)}
                required
              />
            </label>
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button className="pixel-button" type="submit">
            Save quest
          </button>
        </form>
      )}

      <div className="game-tip pink-tip">
        <span>⭐</span>
        <p>
          <strong>Quest reminder</strong>
          <br />
          Every little saving is XP for your future.
        </p>
      </div>
    </section>
  );
}
