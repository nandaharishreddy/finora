import type { Transaction } from "../data/finoraData";

type SpendingChartProps = {
  transactions: Transaction[];
};

export default function SpendingChart({
  transactions,
}: SpendingChartProps) {
  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const monthlyData = getLastSixMonths(expenses);

  const maxValue = Math.max(
    ...monthlyData.map((item) => item.amount),
    1
  );

  return (
    <div>
      <div className="flex h-[230px] items-end gap-3 border-b border-gray-100 px-2">
        {monthlyData.map((item) => {
          const height =
            item.amount === 0
              ? 4
              : Math.max((item.amount / maxValue) * 100, 8);

          return (
            <div
              key={item.key}
              className="flex h-full flex-1 flex-col items-center justify-end"
            >
              <div className="mb-2 text-[10px] font-medium text-gray-400">
                {formatCompactCurrency(item.amount)}
              </div>

              <div
                className="w-full max-w-[46px] rounded-t-xl bg-[#111827] transition-all duration-500"
                style={{
                  height: `${height}%`,
                }}
              />

              <div className="mt-3 text-[10px] font-medium text-gray-400">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400">
            Total spending
          </p>

          <p className="mt-1 text-lg font-bold">
            {formatCurrency(
              expenses.reduce(
                (total, transaction) =>
                  total + transaction.amount,
                0
              )
            )}
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 px-3 py-2">
          <p className="text-[10px] font-medium text-gray-400">
            Transactions
          </p>

          <p className="mt-0.5 text-sm font-semibold">
            {expenses.length}
          </p>
        </div>
      </div>
    </div>
  );
}

function getLastSixMonths(expenses: Transaction[]) {
  const now = new Date();

  const months = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - i,
      1
    );

    const year = date.getFullYear();
    const month = date.getMonth();

    const amount = expenses
      .filter((transaction) => {
        const transactionDate = new Date(
          `${transaction.date}T00:00:00`
        );

        return (
          transactionDate.getFullYear() === year &&
          transactionDate.getMonth() === month
        );
      })
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    months.push({
      key: `${year}-${month}`,
      label: date.toLocaleDateString("en-IN", {
        month: "short",
      }),
      amount,
    });
  }

  return months;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCompactCurrency(amount: number) {
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }

  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }

  return `₹${amount}`;
}