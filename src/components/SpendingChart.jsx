
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { CATEGORIES, COLORS, money, today } from "../Utils/calculations";

export default function SpendingChart({ transactions }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const currentMonth = today().slice(0, 7);

  const expenses = transactions.filter(
    transaction =>
      transaction.type === "expense" &&
      transaction.date.startsWith(currentMonth)
  );

  const categories = CATEGORIES.map((category, index) => ({
    category,
    color: COLORS[index % COLORS.length],
    total: expenses
      .filter(transaction => transaction.category === category)
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  })).filter(item => item.total > 0);

  const total = expenses.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    chartRef.current?.destroy();

    if (categories.length === 0) {
      chartRef.current = null;
      return;
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels: categories.map(item => item.category),
        datasets: [
          {
            data: categories.map(item => item.total),
            backgroundColor: categories.map(item => item.color),
            borderColor: "#0d1512",
            borderWidth: 3,
            hoverOffset: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        cutout: "62%",
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: context =>
                ` ${context.label}: ${money(context.raw)}`
            }
          }
        }
      }
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [transactions, categories.length]);

  return (
    <section id="spending" className="panel spending-panel">
      <header className="panel-title">
        <div>
          <small className="pixel-label">COIN REPORT</small>
          <h2>Spending stats</h2>
        </div>
        <span className="panel-star" aria-hidden="true">✳</span>
      </header>

      <p className="muted">
        Where did your coins wander this month?
      </p>

      <div className="spending-layout">
        <div className="donut">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Doughnut chart of expenses by category this month"
          />
          <div className="donut-center">
            <span>✿</span>
            <small>SPENT</small>
            <small>{money(total)}</small>
          </div>
        </div>

        {categories.length > 0 ? (
          <ul className="legend">
            {categories.map(item => (
              <li key={item.category}>
                <i style={{ background: item.color }} />
                <span>{item.category}</span>
                <span className="legend-amount">{money(item.total)}</span>
                <strong>
                  {total
                    ? Math.round((item.total / total) * 100)
                    : 0}
                  %
                </strong>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">
            No expenses this month. Add one to grow your chart!
          </p>
        )}
      </div>

      <div className="game-tip">
        <span>🌱</span>
        <p>
          <strong>Garden wisdom</strong>
          <br />
          Know your spending to help your savings grow.
        </p>
      </div>
    </section>
  );
}
