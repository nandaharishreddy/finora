import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CircleAlert,
  Loader2,
  Send,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  addTransaction,
  getBalance,
  getTransactions,
} from "../data/finoraData";

import { getProfile } from "../data/userData";

export default function Payments() {
  const profile = getProfile();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const balance = useMemo(() => {
    return getBalance(getTransactions());
  }, [success]);

  const numericAmount = Number(amount);

  const isValidAmount =
    numericAmount > 0 &&
    Number.isFinite(numericAmount) &&
    numericAmount <= balance;

  function handlePayment() {
    setError("");
    setSuccess(false);

    if (!recipient.trim()) {
      setError("Please enter a recipient.");
      return;
    }

    if (!numericAmount || numericAmount <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    if (numericAmount > balance) {
      setError("Insufficient balance.");
      return;
    }

    setProcessing(true);

    window.setTimeout(() => {
      addTransaction({
        title: recipient.trim(),
        category: "Other",
        type: "expense",
        amount: numericAmount,
        date: new Date().toISOString().slice(0, 10),
        description:
          note.trim() || `Payment from ${profile.name}'s Finora account`,
      });

      setProcessing(false);
      setSuccess(true);
      setRecipient("");
      setAmount("");
      setNote("");
    }, 650);
  }

  return (
    <div className="page-enter min-h-screen bg-[#f6f7f9] text-[#111827]">
      <Sidebar active="payments" />

      <main className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/90 px-5 pl-16 backdrop-blur-xl md:px-8 lg:pl-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
              Payments
            </p>

            <h1 className="mt-1 text-lg font-bold tracking-tight md:text-xl">
              Send money
            </h1>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <Wallet size={15} className="text-gray-500" />

            <span className="text-xs font-semibold text-gray-700">
              ₹
              {balance.toLocaleString("en-IN")}
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-[1200px] px-5 py-7 md:px-8 md:py-10">
          <button
            type="button"
            onClick={() => {
              window.location.href = "/";
            }}
            className="premium-button mb-6 flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-gray-500 hover:bg-white hover:text-gray-900"
          >
            <ArrowLeft size={15} />
            Back to dashboard
          </button>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Payment form */}
            <section className="premium-card fade-up rounded-[26px] border border-gray-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-100 text-gray-700">
                  <Send size={19} />
                </div>

                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400">
                  Transfer
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight">
                  Send money securely
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-gray-500">
                  Make a payment directly from your Finora personal account.
                </p>
              </div>

              {success && (
                <div className="success-enter mb-5 flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#111827] text-white">
                    <Check size={16} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Payment successful
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      The payment has been added to your transaction history.
                    </p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <CircleAlert
                    size={18}
                    className="mt-0.5 shrink-0 text-gray-700"
                  />

                  <p className="text-sm font-medium text-gray-700">
                    {error}
                  </p>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Recipient
                  </label>

                  <input
                    value={recipient}
                    onChange={(event) => {
                      setRecipient(event.target.value);
                      setError("");
                      setSuccess(false);
                    }}
                    placeholder="Name or recipient"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
                  />
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
                        setSuccess(false);
                      }}
                      placeholder="0"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-9 pr-4 text-sm font-semibold outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
                    />
                  </div>

                  <p className="mt-2 text-[11px] text-gray-400">
                    Available balance: ₹
                    {balance.toLocaleString("en-IN")}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-600">
                    Note
                    <span className="ml-1 font-normal text-gray-400">
                      Optional
                    </span>
                  </label>

                  <textarea
                    value={note}
                    onChange={(event) => {
                      setNote(event.target.value);
                      setError("");
                      setSuccess(false);
                    }}
                    placeholder="What's this payment for?"
                    rows={3}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
                  />
                </div>

                <button
                  type="button"
                  disabled={processing || !isValidAmount || !recipient.trim()}
                  onClick={handlePayment}
                  className="premium-button flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-3.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {processing ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Processing payment...
                    </>
                  ) : (
                    <>
                      <ArrowUpRight size={17} />
                      Send payment
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* Preview */}
            <section className="fade-up stagger-2 h-fit rounded-[26px] bg-[#111827] p-6 text-white shadow-xl md:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/40">
                Payment preview
              </p>

              <h2 className="mt-2 text-xl font-bold">
                {profile.name}'s Finora
              </h2>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs text-white/40">Sending to</p>

                <p className="mt-2 truncate text-base font-semibold">
                  {recipient.trim() || "Recipient name"}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-xs text-white/40">Amount</p>

                <p className="mt-2 text-4xl font-bold tracking-tight">
                  ₹
                  {numericAmount > 0
                    ? numericAmount.toLocaleString("en-IN")
                    : "0"}
                </p>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50">
                    Remaining balance
                  </span>

                  <span className="text-sm font-semibold">
                    ₹
                    {Math.max(
                      0,
                      balance -
                        (numericAmount > 0 ? numericAmount : 0)
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[11px] text-white/40">
                <div className="h-1.5 w-1.5 rounded-full bg-white/60" />

                Protected by Finora security
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}