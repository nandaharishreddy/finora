import {
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  Check,
  Plus,
  Search,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

import BankCard from "../components/BankCard";
import Sidebar from "../components/Sidebar";
import SpendingChart from "../components/SpendingChart";

import {
  addTransaction,
  getBalance,
  getTotalExpenses,
  getTotalIncome,
  getTransactions,
  type Transaction,
  type TransactionCategory,
  type TransactionType,
} from "../data/finoraData";

import { getProfile } from "../data/userData";

const CATEGORIES: TransactionCategory[] = [
  "Salary",
  "Freelance",
  "Food",
  "Shopping",
  "Entertainment",
  "Transport",
  "Bills",
  "Subscriptions",
  "Other",
];

export default function Dashboard() {
  const profile = getProfile();

  const [transactions, setTransactions] = useState<Transaction[]>(
    getTransactions()
  );

  const [showAddTransaction, setShowAddTransaction] =
    useState(false);

  const balance = getBalance(transactions);
  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);

  const recentTransactions = transactions.slice(0, 5);

  const initial = profile.name.charAt(0).toUpperCase();

  function refreshTransactions() {
    setTransactions(getTransactions());
  }

  return (
    <div className="page-enter min-h-screen bg-[#f6f7f9] text-[#111827]">
      <Sidebar active="accounts" />

      <main className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/90 px-5 pl-16 backdrop-blur-xl md:px-8 lg:pl-8">
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 sm:flex">
              <Search
                size={16}
                className="text-gray-400"
              />

              <input
                placeholder="Search"
                className="w-36 bg-transparent text-sm outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="sm:hidden">
              <p className="text-lg font-bold">
                Finora
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="premium-button relative rounded-xl border border-gray-200 p-2.5 text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >
              <Bell size={18} />

              <span className="pulse-soft absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-black" />
            </button>

            <div className="hidden h-8 w-px bg-gray-200 sm:block" />

            <div className="flex items-center gap-2">
              <div className="float-soft flex h-9 w-9 items-center justify-center rounded-full bg-[#111827] text-xs font-semibold text-white">
                {initial}
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold">
                  {profile.name}
                </p>

                <p className="text-[11px] text-gray-400">
                  Personal
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1500px] px-5 py-7 md:px-8">
          <div className="fade-up mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">
                Good evening, {profile.name}
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
                Here's your financial overview.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowAddTransaction(true)}
              className="premium-button flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 md:w-auto"
            >
              <Plus size={17} />
              Add transaction
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <BalanceCard
              title="Total balance"
              amount={balance}
              change="Calculated from transactions"
              icon={<Wallet size={18} />}
            />

            <BalanceCard
              title="Income"
              amount={income}
              change="Recorded income"
              icon={<ArrowDownLeft size={18} />}
            />

            <BalanceCard
              title="Expenses"
              amount={expenses}
              change="Recorded expenses"
              icon={<ArrowUpRight size={18} />}
            />
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
            <section className="premium-card fade-up stagger-3 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5">
                <p className="text-sm font-semibold">
                  Spending overview
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Based on your recorded transactions
                </p>
              </div>

              <SpendingChart
                transactions={transactions}
              />
            </section>

            <section className="premium-card fade-up stagger-4 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5">
                <p className="text-sm font-semibold">
                  Your card
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Platinum Debit
                </p>
              </div>

              <BankCard />
            </section>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_1.5fr]">
            <section className="premium-card fade-up stagger-4 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <p className="text-sm font-semibold">
                Quick transfer
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Send money from your Finora account
              </p>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/payments";
                }}
                className="premium-button mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                <ArrowUpRight size={17} />
                Send money
              </button>
            </section>

            <section className="premium-card fade-up stagger-5 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Recent transactions
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Your latest account activity
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    window.location.href = "/transactions";
                  }}
                  className="premium-button rounded-lg px-2 py-1 text-xs font-semibold hover:bg-gray-100"
                >
                  View all
                </button>
              </div>

              <div className="divide-y divide-gray-100">
                {recentTransactions.map(
                  (transaction) => (
                    <RecentTransaction
                      key={transaction.id}
                      transaction={transaction}
                    />
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </main>

      {showAddTransaction && (
        <AddTransactionModal
          onClose={() => setShowAddTransaction(false)}
          onSaved={() => {
            refreshTransactions();
            setShowAddTransaction(false);
          }}
        />
      )}
    </div>
  );
}

function AddTransactionModal({
  onClose,
  onSaved,
}: {
  onClose: () => void;
  onSaved: () => void;
}) {
  const [type, setType] =
    useState<TransactionType>("income");

  const [title, setTitle] = useState("");
  const [category, setCategory] =
    useState<TransactionCategory>("Salary");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const numericAmount = Number(amount);

  function handleSave() {
    setError("");

    if (!title.trim()) {
      setError("Please enter a transaction name.");
      return;
    }

    if (
      !numericAmount ||
      numericAmount <= 0 ||
      !Number.isFinite(numericAmount)
    ) {
      setError("Please enter a valid amount.");
      return;
    }

    if (!date) {
      setError("Please select a date.");
      return;
    }

    setSaving(true);

    window.setTimeout(() => {
      addTransaction({
        title: title.trim(),
        category,
        type,
        amount: numericAmount,
        date,
        description: description.trim() || undefined,
      });

      setSaving(false);
      setSaved(true);

      window.setTimeout(() => {
        onSaved();
      }, 500);
    }, 450);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div
        className="drawer-enter max-h-[90vh] w-full max-w-[520px] overflow-y-auto rounded-[28px] border border-gray-200 bg-white p-5 shadow-2xl md:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
              Account activity
            </p>

            <h2 className="mt-2 text-xl font-bold tracking-tight">
              Add transaction
            </h2>

            <p className="mt-1 text-xs leading-5 text-gray-400">
              Record income or an expense in your Finora account.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="premium-button rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 rounded-xl bg-gray-100 p-1">
          <button
            type="button"
            onClick={() => {
              setType("income");
              setCategory("Salary");
              setError("");
            }}
            className={`rounded-lg py-2.5 text-xs font-semibold transition ${
              type === "income"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <ArrowDownLeft size={15} />
              Income
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setType("expense");
              setCategory("Other");
              setError("");
            }}
            className={`rounded-lg py-2.5 text-xs font-semibold transition ${
              type === "expense"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <ArrowUpRight size={15} />
              Expense
            </span>
          </button>
        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-xs font-medium text-gray-700">
            {error}
          </div>
        )}

        {saved ? (
          <div className="success-enter py-14 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#111827] text-white">
              <Check size={21} />
            </div>

            <p className="mt-4 text-sm font-semibold">
              Transaction added
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Your account has been updated.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-600">
                {type === "income"
                  ? "Income name"
                  : "Expense name"}
              </label>

              <input
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  setError("");
                }}
                placeholder={
                  type === "income"
                    ? "e.g. Salary"
                    : "e.g. Groceries"
                }
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-600">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(event) => {
                    setCategory(
                      event.target.value as TransactionCategory
                    );
                    setError("");
                  }}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
                >
                  {CATEGORIES.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-gray-600">
                  Amount
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="1"
                    value={amount}
                    onChange={(event) => {
                      setAmount(event.target.value);
                      setError("");
                    }}
                    placeholder="0"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-sm font-semibold outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-600">
                Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  setError("");
                }}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-600">
                Description
                <span className="ml-1 font-normal text-gray-400">
                  Optional
                </span>
              </label>

              <textarea
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                  setError("");
                }}
                placeholder="Add a note..."
                rows={3}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
              />
            </div>

            <button
              type="button"
              disabled={saving}
              onClick={handleSave}
              className="premium-button flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-3.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                "Saving..."
              ) : (
                <>
                  <Plus size={17} />
                  Add {type === "income" ? "income" : "expense"}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function BalanceCard({
  title,
  amount,
  change,
  icon,
}: {
  title: string;
  amount: number;
  change: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="premium-card fade-up stagger-2 rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-400">
          {title}
        </p>

        <div className="icon-motion flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
          {icon}
        </div>
      </div>

      <p className="number-pop mt-5 text-2xl font-bold tracking-tight">
        {formatCurrency(amount)}
      </p>

      <p className="mt-2 text-[11px] font-medium text-gray-400">
        {change}
      </p>
    </div>
  );
}

function RecentTransaction({
  transaction,
}: {
  transaction: Transaction;
}) {
  const isIncome =
    transaction.type === "income";

  return (
    <div className="group flex items-center justify-between gap-4 py-4 transition hover:translate-x-1">
      <div className="flex min-w-0 items-center gap-3">
        <div className="icon-motion flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100">
          {isIncome ? (
            <ArrowDownLeft size={17} />
          ) : (
            <ArrowUpRight size={17} />
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {transaction.title}
          </p>

          <p className="mt-0.5 text-xs text-gray-400">
            {transaction.category} ·{" "}
            {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <p className="shrink-0 text-sm font-semibold">
        {isIncome ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </p>
    </div>
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(new Date(`${date}T00:00:00`));
}