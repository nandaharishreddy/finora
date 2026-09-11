import {
  ArrowDownLeft,
  ArrowUpRight,
  Search,
  Trash2,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  deleteTransaction,
  getBalance,
  getTotalExpenses,
  getTotalIncome,
  getTransactions,
  type Transaction,
} from "../data/finoraData";

import { getProfile } from "../data/userData";

export default function Transactions() {
  const profile = getProfile();

  const [transactions, setTransactions] = useState<Transaction[]>(
    getTransactions()
  );

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return transactions;
    }

    return transactions.filter((transaction) => {
      return (
        transaction.title.toLowerCase().includes(query) ||
        transaction.category.toLowerCase().includes(query) ||
        transaction.description?.toLowerCase().includes(query)
      );
    });
  }, [transactions, search]);

  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);
  const balance = getBalance(transactions);

  function handleDelete(id: string) {
    setDeletingId(id);

    window.setTimeout(() => {
      deleteTransaction(id);

      setTransactions(getTransactions());
      setDeletingId(null);
    }, 250);
  }

  return (
    <div className="page-enter min-h-screen bg-[#f6f7f9] text-[#111827]">
      <Sidebar active="transactions" />

      <main className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/90 px-5 pl-16 backdrop-blur-xl md:px-8 lg:pl-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
              Activity
            </p>

            <h1 className="mt-1 text-lg font-bold tracking-tight md:text-xl">
              Transactions
            </h1>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 sm:flex">
            <Wallet size={15} className="text-gray-500" />

            <span className="text-xs font-semibold text-gray-700">
              {profile.name}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-[1400px] px-5 py-7 md:px-8 md:py-10">
          <div className="fade-up mb-7">
            <p className="text-sm font-medium text-gray-400">
              {profile.name}'s account activity
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
              Every transaction, in one place.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              Search, review and manage your recorded Finora transactions.
            </p>
          </div>

          {/* Summary */}
          <div className="grid gap-4 md:grid-cols-3">
            <SummaryCard
              label="Balance"
              value={balance}
              icon={<Wallet size={17} />}
            />

            <SummaryCard
              label="Total income"
              value={income}
              icon={<ArrowDownLeft size={17} />}
            />

            <SummaryCard
              label="Total expenses"
              value={expenses}
              icon={<ArrowUpRight size={17} />}
            />
          </div>

          {/* Transactions */}
          <section className="premium-card fade-up stagger-3 mt-5 rounded-[26px] border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 md:flex-row md:items-center md:justify-between md:p-6">
              <div>
                <p className="text-sm font-semibold">
                  Transaction history
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {filteredTransactions.length} transaction
                  {filteredTransactions.length === 1 ? "" : "s"} shown
                </p>
              </div>

              <div className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 md:w-[300px]">
                <Search
                  size={16}
                  className="shrink-0 text-gray-400"
                />

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search transactions"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                  <Search size={19} className="text-gray-500" />
                </div>

                <p className="mt-4 text-sm font-semibold">
                  No transactions found
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Try a different search term.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredTransactions.map((transaction, index) => {
                  const isIncome = transaction.type === "income";
                  const isDeleting = deletingId === transaction.id;

                  return (
                    <div
                      key={transaction.id}
                      className={`group flex items-center justify-between gap-4 px-5 py-4 transition-all duration-300 md:px-6 ${
                        isDeleting
                          ? "translate-x-3 opacity-0"
                          : "opacity-100"
                      }`}
                      style={{
                        animationDelay: `${Math.min(index * 35, 250)}ms`,
                      }}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`icon-motion flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            isIncome
                              ? "bg-gray-100 text-gray-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
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

                          <p className="mt-1 truncate text-xs text-gray-400">
                            {transaction.category}
                            {" · "}
                            {formatDate(transaction.date)}
                          </p>

                          {transaction.description && (
                            <p className="mt-1 hidden max-w-[500px] truncate text-xs text-gray-400 md:block">
                              {transaction.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-semibold">
                            {isIncome ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
                          </p>

                          <p className="mt-1 text-[10px] font-medium uppercase tracking-wide text-gray-400">
                            {isIncome ? "Income" : "Expense"}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDelete(transaction.id)}
                          disabled={isDeleting}
                          aria-label={`Delete ${transaction.title}`}
                          className="premium-button rounded-lg p-2 text-gray-300 opacity-100 transition hover:bg-gray-100 hover:text-gray-700 md:opacity-0 md:group-hover:opacity-100"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="premium-card fade-up stagger-2 rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-gray-400">
          {label}
        </p>

        <div className="icon-motion flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
          {icon}
        </div>
      </div>

      <p className="number-pop mt-5 text-2xl font-bold tracking-tight">
        {formatCurrency(value)}
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
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}