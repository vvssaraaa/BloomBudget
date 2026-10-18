
export const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Study",
  "Bills",
  "Salary",
  "Other"
];

export const COLORS = [
  "#c9b2f0",
  "#f4b8d2",
  "#b8e3c8",
  "#f6d989",
  "#b8dbe8",
  "#d9c2ef",
  "#edc9b0"
];

export function today() {
  const date = new Date();

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function money(amount) {
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    maximumFractionDigits: 2
  }).format(amount);
}

export function dateLabel(value) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short"
  }).format(new Date(`${value}T12:00:00`));
}

export function calculateTotals(transactions) {
  const income = transactions
    .filter(transaction => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expenses = transactions
    .filter(transaction => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses
  };
}

export function calculateXP(transactions) {
  return transactions.length * 10;
}

export function calculateLevel(xp) {
  return Math.floor(xp / 100) + 1;
}

export function calculateLevelProgress(xp) {
  const currentXP = xp % 100;
  const xpNeeded = 100;

  return {
    currentXP,
    xpNeeded,
    percentage: (currentXP / xpNeeded) * 100
  };
}

