export type TransactionType = "income" | "expense";

export type TransactionCategory =
  | "Salary"
  | "Freelance"
  | "Food"
  | "Shopping"
  | "Entertainment"
  | "Transport"
  | "Bills"
  | "Subscriptions"
  | "Other";

export type Transaction = {
  id: string;
  title: string;
  category: TransactionCategory;
  type: TransactionType;
  amount: number;
  date: string;
  description?: string;
};

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "txn-001",
    title: "Salary",
    category: "Salary",
    type: "income",
    amount: 85000,
    date: "2026-09-05",
    description: "Monthly salary",
  },
  {
    id: "txn-002",
    title: "Freelance payment",
    category: "Freelance",
    type: "income",
    amount: 18000,
    date: "2026-09-02",
    description: "Freelance project payment",
  },
  {
    id: "txn-003",
    title: "Netflix",
    category: "Subscriptions",
    type: "expense",
    amount: 649,
    date: "2026-09-11",
    description: "Monthly subscription",
  },
  {
    id: "txn-004",
    title: "Swiggy",
    category: "Food",
    type: "expense",
    amount: 428,
    date: "2026-09-04",
    description: "Food order",
  },
  {
    id: "txn-005",
    title: "Amazon",
    category: "Shopping",
    type: "expense",
    amount: 2499,
    date: "2026-09-03",
    description: "Online purchase",
  },
  {
    id: "txn-006",
    title: "Uber",
    category: "Transport",
    type: "expense",
    amount: 386,
    date: "2026-09-02",
    description: "Ride payment",
  },
  {
    id: "txn-007",
    title: "Spotify",
    category: "Subscriptions",
    type: "expense",
    amount: 119,
    date: "2026-09-01",
    description: "Monthly subscription",
  },
  {
    id: "txn-008",
    title: "Zomato",
    category: "Food",
    type: "expense",
    amount: 742,
    date: "2026-08-29",
    description: "Food order",
  },
  {
    id: "txn-009",
    title: "Apple",
    category: "Shopping",
    type: "expense",
    amount: 1299,
    date: "2026-08-28",
    description: "Apple purchase",
  },
  {
    id: "txn-010",
    title: "Electricity bill",
    category: "Bills",
    type: "expense",
    amount: 1840,
    date: "2026-08-27",
    description: "Monthly electricity bill",
  },
];

const STORAGE_KEY = "finora-transactions";

function loadTransactions(): Transaction[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Fall back to initial data if localStorage is unavailable/corrupted.
  }

  return INITIAL_TRANSACTIONS;
}

function saveTransactions(transactions: Transaction[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(transactions)
  );
}

export function getTransactions(): Transaction[] {
  return loadTransactions();
}

export function addTransaction(
  transaction: Omit<Transaction, "id">
): Transaction {
  const transactions = loadTransactions();

  const newTransaction: Transaction = {
    ...transaction,
    id: `txn-${Date.now()}`,
  };

  const updatedTransactions = [
    newTransaction,
    ...transactions,
  ];

  saveTransactions(updatedTransactions);

  return newTransaction;
}

export function deleteTransaction(id: string) {
  const transactions = loadTransactions();

  const updatedTransactions = transactions.filter(
    (transaction) => transaction.id !== id
  );

  saveTransactions(updatedTransactions);
}

export function getTotalIncome(
  transactions: Transaction[] = loadTransactions()
): number {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
}

export function getTotalExpenses(
  transactions: Transaction[] = loadTransactions()
): number {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
}

export function getBalance(
  transactions: Transaction[] = loadTransactions()
): number {
  return (
    getTotalIncome(transactions) -
    getTotalExpenses(transactions)
  );
}

export function getCategoryExpenses(
  transactions: Transaction[] = loadTransactions()
) {
  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const categoryTotals: Record<string, number> = {};

  expenses.forEach((transaction) => {
    categoryTotals[transaction.category] =
      (categoryTotals[transaction.category] || 0) +
      transaction.amount;
  });

  return categoryTotals;
}

export function resetFinoraData() {
  localStorage.removeItem(STORAGE_KEY);
}