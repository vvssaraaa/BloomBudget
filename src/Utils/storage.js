
const STORAGE_KEY = "bloombudget-data";

export function today() {
  const date = new Date();

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export const initialData = {
  transactions: [
    {
      id: 1,
      description: "Coffee with friends",
      category: "Food",
      date: today(),
      amount: 65,
      type: "expense"
    },
    {
      id: 2,
      description: "Part-time salary",
      category: "Salary",
      date: today(),
      amount: 5000,
      type: "income"
    },
    {
      id: 3,
      description: "Little shopping trip",
      category: "Shopping",
      date: today(),
      amount: 240,
      type: "expense"
    },
    {
      id: 4,
      description: "Monthly transport",
      category: "Transport",
      date: today(),
      amount: 450,
      type: "expense"
    }
  ],
  goal: {
    name: "Something special",
    target: 10000,
    saved: 3200
  }
};

export function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (saved && Array.isArray(saved.transactions) && saved.goal) {
      return {
        transactions: saved.transactions,
        goal: {
          name: String(saved.goal.name || "Something special"),
          target: Number(saved.goal.target) > 0
            ? Number(saved.goal.target)
            : 10000,
          saved: Math.max(0, Number(saved.goal.saved) || 0)
        }
      };
    }
  } catch {
    // Use sample data if storage is empty or unreadable.
  }

  return initialData;
}

export function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    console.warn("BloomBudget could not save data to localStorage.");
  }
}
