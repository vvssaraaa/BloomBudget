
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SpendingChart from "./components/SpendingChart";
import SavingsGoal from "./components/SavingGoal";
import LevelProgress from "./components/LevelProgress";
import GardenArt from "./components/garden";

import { calculateTotals } from "./Utils/calculations";
import { loadData, saveData } from "./Utils/storage";

export default function App() {
  const [data, setData] = useState(loadData);
  const { transactions, goal } = data;

  useEffect(() => {
    saveData(data);
  }, [data]);

  const { income, expenses, balance } = calculateTotals(transactions);

  function addTransaction(transaction) {
    setData(current => ({
      ...current,
      transactions: [
        ...current.transactions,
        { ...transaction, id: Date.now() + Math.random() }
      ]
    }));
  }

  function deleteTransaction(id) {
    setData(current => ({
      ...current,
      transactions: current.transactions.filter(
        transaction => transaction.id !== id
      )
    }));
  }

  function updateGoal(nextGoal) {
    setData(current => ({
      ...current,
      goal: nextGoal
    }));
  }

  const month = new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric"
  }).format(new Date()).toUpperCase();

  return (
    <div className="app">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Sidebar />

      <main className="main" id="main-content">
        <header className="topbar">
          <span>
            MY WORLD <b>/</b> DASHBOARD
          </span>

          <div>
            <span className="month-tag">✿ {month}</span>
            <span className="profile" aria-label="Profile">
              ✿
            </span>
          </div>
        </header>

        <section className="welcome">
          <div>
            <small className="pixel-label">
              PLAYER 001 · MONEY GARDEN
            </small>

            <h1>
              Let's make your money{" "}
              <span>
                <strong>BLOOM!</strong>
              </span>
            </h1>
          </div>

         <GardenArt />
        </section>

        <LevelProgress
          transactions={transactions}
          balanceLabel={new Intl.NumberFormat("nb-NO", {
            style: "currency",
            currency: "NOK",
            maximumFractionDigits: 2
          }).format(balance)}
        />

        <SummaryCards
          income={income}
          expenses={expenses}
          balance={balance}
        />

        <div className="dashboard-grid">
          <TransactionForm
            onAdd={addTransaction}
            balance={balance}
          />

          <SpendingChart transactions={transactions} />

          <section
            id="transaction-history"
            className="panel recent-panel"
            aria-labelledby="transaction-history-heading"
          >
            <header className="panel-title">
              <div>
                <small className="pixel-label">LATEST ACTIVITY</small>
                <h2 id="transaction-history-heading">Coin history</h2>
              </div>

              <span className="panel-star" aria-hidden="true">
                ✳
              </span>
            </header>

            <TransactionList
              transactions={transactions}
              onDelete={deleteTransaction}
            />
          </section>

          <div id="savings">
            <SavingsGoal
              goal={goal}
              onUpdate={updateGoal}
            />
          </div>
        </div>

        <footer>
          ✿ BLOOMBUDGET · A LITTLE GAME FOR YOUR MONEY ✿
        </footer>
      </main>
    </div>
  );
}
