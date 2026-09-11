import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  PieChart,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useMemo } from "react";

import Sidebar from "../components/Sidebar";

import {
  getBalance,
  getCategoryExpenses,
  getTotalExpenses,
  getTotalIncome,
  getTransactions,
} from "../data/finoraData";

import { getProfile } from "../data/userData";

export default function Analytics() {
  const profile = getProfile();

  const transactions = getTransactions();

  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);
  const balance = getBalance(transactions);

  const categoryExpenses = getCategoryExpenses(transactions);

  const categoryData = useMemo(() => {
    return Object.entries(categoryExpenses)
      .map(([category, amount]) => ({
        category,
        amount,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [transactions]);

  const highestCategory = categoryData[0];

  const savingsRate =
    income > 0
      ? Math.max(0, ((income - expenses) / income) * 100)
      : 0;

  const expenseShare =
    income > 0 ? Math.min(100, (expenses / income) * 100) : 0;

  return (
    <div className="page-enter min-h-screen bg-[#f6f7f9] text-[#111827]">
      <Sidebar active="analytics" />

      <main className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/90 px-5 pl-16 backdrop-blur-xl md:px-8 lg:pl-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
              Insights
            </p>

            <h1 className="mt-1 text-lg font-bold tracking-tight md:text-xl">
              Analytics
            </h1>
          </div>

          <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 sm:flex">
            <BarChart3 size={15} className="text-gray-500" />

            <span className="text-xs font-semibold text-gray-700">
              Financial overview
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-[1400px] px-5 py-7 md:px-8 md:py-10">
          <div className="fade-up mb-7">
            <p className="text-sm font-medium text-gray-400">
              {profile.name}'s financial insights
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
              Understand where your money goes.
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
              A simple view of your income, expenses and spending patterns
              based on your Finora activity.
            </p>
          </div>

          {/* Top metrics */}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Current balance"
              value={formatCurrency(balance)}
              description="Income minus expenses"
              icon={<Wallet size={18} />}
            />

            <MetricCard
              label="Total income"
              value={formatCurrency(income)}
              description="Recorded income"
              icon={<ArrowDownLeft size={18} />}
            />

            <MetricCard
              label="Total expenses"
              value={formatCurrency(expenses)}
              description="Recorded spending"
              icon={<ArrowUpRight size={18} />}
            />

            <MetricCard
              label="Savings rate"
              value={`${savingsRate.toFixed(0)}%`}
              description="Based on recorded activity"
              icon={<TrendingUp size={18} />}
            />
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
            {/* Spending categories */}
            <section className="premium-card fade-up stagger-3 rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Spending by category
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Where your recorded expenses are going
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                  <PieChart size={17} />
                </div>
              </div>

              {categoryData.length === 0 ? (
                <div className="py-14 text-center">
                  <p className="text-sm font-semibold">
                    No expense data yet
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Add transactions to see your spending breakdown.
                  </p>
                </div>
              ) : (
                <div className="mt-7 space-y-5">
                  {categoryData.map((item, index) => {
                    const percentage =
                      expenses > 0
                        ? (item.amount / expenses) * 100
                        : 0;

                    return (
                      <div
                        key={item.category}
                        className="fade-up"
                        style={{
                          animationDelay: `${index * 55}ms`,
                        }}
                      >
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-2">
                            <div className="h-2 w-2 shrink-0 rounded-full bg-[#111827]" />

                            <span className="truncate text-xs font-semibold">
                              {item.category}
                            </span>
                          </div>

                          <div className="flex shrink-0 items-center gap-3">
                            <span className="text-xs font-semibold">
                              {formatCurrency(item.amount)}
                            </span>

                            <span className="w-10 text-right text-[10px] text-gray-400">
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-[#111827] transition-all duration-700"
                            style={{
                              width: `${Math.max(
                                percentage,
                                2
                              )}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Spending snapshot */}
            <section className="fade-up stagger-4 rounded-[26px] bg-[#111827] p-6 text-white shadow-xl md:p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <CircleDollarSign size={18} />
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                Spending snapshot
              </p>

              <h3 className="mt-2 text-2xl font-bold tracking-tight">
                {highestCategory
                  ? highestCategory.category
                  : "No data yet"}
              </h3>

              <p className="mt-2 text-sm leading-6 text-white/50">
                {highestCategory
                  ? `Your largest recorded spending category is ${highestCategory.category}.`
                  : "Add some expense transactions to generate insights."}
              </p>

              {highestCategory && (
                <div className="mt-8">
                  <p className="text-xs text-white/40">
                    Amount spent
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    {formatCurrency(highestCategory.amount)}
                  </p>
                </div>
              )}

              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">
                    Expenses vs income
                  </span>

                  <span className="text-sm font-semibold">
                    {expenseShare.toFixed(0)}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white transition-all duration-700"
                    style={{
                      width: `${expenseShare}%`,
                    }}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Financial health */}
          <section className="premium-card fade-up stagger-5 mt-5 rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">
                  Financial overview
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  A quick interpretation of your current activity
                </p>
              </div>

              {balance >= 0 ? (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                  <TrendingUp size={17} />
                </div>
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                  <TrendingDown size={17} />
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <InsightCard
                title="Cash position"
                value={
                  balance >= 0
                    ? "Positive"
                    : "Needs attention"
                }
                description={
                  balance >= 0
                    ? "Your recorded income is currently above your expenses."
                    : "Your recorded expenses are currently above your income."
                }
              />

              <InsightCard
                title="Savings"
                value={`${savingsRate.toFixed(0)}%`}
                description="Estimated savings rate from the recorded transactions."
              />

              <InsightCard
                title="Top category"
                value={
                  highestCategory?.category || "No data"
                }
                description={
                  highestCategory
                    ? `${formatCurrency(
                        highestCategory.amount
                      )} recorded in this category.`
                    : "Add expense transactions to see your top category."
                }
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  label,
  value,
  description,
  icon,
}: {
  label: string;
  value: string;
  description: string;
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
        {value}
      </p>

      <p className="mt-2 text-[11px] font-medium text-gray-400">
        {description}
      </p>
    </div>
  );
}

function InsightCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
      <p className="text-xs font-medium text-gray-400">
        {title}
      </p>

      <p className="mt-3 text-lg font-bold tracking-tight">
        {value}
      </p>

      <p className="mt-2 text-xs leading-5 text-gray-400">
        {description}
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