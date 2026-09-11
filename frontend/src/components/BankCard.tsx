import {
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  Unlock,
} from "lucide-react";
import { useEffect, useState } from "react";

import { getProfile } from "../data/userData";

export default function BankCard() {
  const profile = getProfile();

  const [showNumber, setShowNumber] =
    useState(false);

  const [frozen, setFrozen] = useState(() => {
    return (
      localStorage.getItem(
        "finora-card-frozen"
      ) === "true"
    );
  });

  useEffect(() => {
    localStorage.setItem(
      "finora-card-frozen",
      String(frozen)
    );
  }, [frozen]);

  const cardNumber = showNumber
    ? "4829 1038 7291 6428"
    : "•••• •••• •••• 6428";

  return (
    <div
      className={`relative overflow-hidden rounded-[24px] p-6 text-white shadow-xl transition-all duration-300 ${
        frozen
          ? "bg-gray-500"
          : "bg-[#111827]"
      }`}
    >
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10" />

      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10" />

      <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-white/[0.03]" />

      <div
        className={`relative z-10 transition-all duration-300 ${
          frozen
            ? "opacity-60 blur-[1px]"
            : ""
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
              Finora
            </p>

            <p className="mt-1 text-xs text-white/60">
              Platinum Debit
            </p>
          </div>

          <CreditCard size={24} />
        </div>

        <div className="mt-8">
          <div className="flex h-8 w-11 items-center justify-center rounded-md border border-white/20 bg-white/10">
            <div className="h-5 w-7 rounded border border-white/20" />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <p className="font-mono text-[15px] tracking-[0.16em] text-white/90">
            {cardNumber}
          </p>

          <button
            type="button"
            onClick={() =>
              setShowNumber(!showNumber)
            }
            className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
          >
            {showNumber ? (
              <EyeOff size={16} />
            ) : (
              <Eye size={16} />
            )}
          </button>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-[8px] uppercase tracking-widest text-white/40">
              Card holder
            </p>

            <p className="mt-1 text-xs font-medium tracking-wide">
              {profile.name.toUpperCase()}
            </p>
          </div>

          <div>
            <p className="text-[8px] uppercase tracking-widest text-white/40">
              Expires
            </p>

            <p className="mt-1 text-xs font-medium">
              09/29
            </p>
          </div>

          <div>
            <p className="text-lg font-bold italic tracking-tight">
              VISA
            </p>
          </div>
        </div>
      </div>

      {frozen && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          <div className="success-enter rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold shadow-lg backdrop-blur-md">
            🔒 Card frozen
          </div>
        </div>
      )}

      <div className="relative z-30 mt-5 border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={() =>
            setFrozen((current) => !current)
          }
          className={`premium-button flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold ${
            frozen
              ? "bg-white text-gray-900"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          {frozen ? (
            <>
              <Unlock size={14} />
              Unfreeze card
            </>
          ) : (
            <>
              <Lock size={14} />
              Freeze card
            </>
          )}
        </button>
      </div>
    </div>
  );
}