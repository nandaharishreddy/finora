import {
  ArrowLeft,
  CreditCard,
  Eye,
  EyeOff,
  Lock,
  MoreHorizontal,
  Settings,
  ShieldCheck,
  Unlock,
  Globe,
  Smartphone,
  Wifi,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  getCardSettings,
  saveCardSettings,
  type CardSettings,
  getProfile,
} from "../data/userData";

export default function Cards() {
  const profile = getProfile();

  const [showNumber, setShowNumber] = useState(false);

  const [frozen, setFrozen] = useState(() => {
    return (
      localStorage.getItem(
        "finora-card-frozen"
      ) === "true"
    );
  });

  const [freezing, setFreezing] = useState(false);

  const [settingsOpen, setSettingsOpen] =
    useState(false);

  const [cardSettings, setCardSettings] =
    useState<CardSettings>(getCardSettings());

  useEffect(() => {
    localStorage.setItem(
      "finora-card-frozen",
      String(frozen)
    );
  }, [frozen]);

  function toggleFreeze() {
    setFreezing(true);

    window.setTimeout(() => {
      setFrozen((value) => !value);
      setFreezing(false);
    }, 220);
  }

  function updateCardSetting(
    key: keyof CardSettings
  ) {
    const current = cardSettings[key];

    if (typeof current !== "boolean") {
      return;
    }

    const updated = {
      ...cardSettings,
      [key]: !current,
    };

    setCardSettings(updated);
    saveCardSettings(updated);
  }

  const cardNumber = showNumber
    ? "4829 1038 7291 6428"
    : "•••• •••• •••• 6428";

  return (
    <div className="page-enter min-h-screen bg-[#f6f7f9] text-[#111827]">
      <Sidebar active="cards" />

      <main className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white/90 px-5 pl-16 backdrop-blur-xl md:px-8 lg:pl-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="premium-button rounded-xl border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <p className="text-sm font-semibold">
                Cards
              </p>

              <p className="hidden text-xs text-gray-400 sm:block">
                Manage your Finora cards
              </p>
            </div>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#111827] text-xs font-semibold text-white">
            {profile.name.charAt(0).toUpperCase()}
          </div>
        </header>

        <div className="mx-auto max-w-[1200px] px-5 py-8 md:px-8">
          <div className="fade-up mb-7">
            <p className="text-sm font-medium text-gray-400">
              Payment cards
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight">
              Your cards
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Manage your cards and security controls.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <section className="premium-card fade-up stagger-1 rounded-[24px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">
                    Platinum Debit
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    Visa debit card
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSettingsOpen(true)
                  }
                  className="premium-button rounded-xl border border-gray-200 p-2 text-gray-500 hover:bg-gray-50"
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>

              <div
                className={`group relative overflow-hidden rounded-[28px] p-7 text-white shadow-2xl transition-all duration-500 md:p-8 ${
                  frozen
                    ? "bg-gray-500"
                    : "bg-[#111827] hover:-translate-y-1"
                } ${
                  freezing
                    ? "scale-[0.985] opacity-80"
                    : "scale-100 opacity-100"
                }`}
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-110" />

                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-white/10 transition-transform duration-700 group-hover:scale-110" />

                <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-white/[0.03]" />

                <div
                  className={`relative z-10 transition-all duration-500 ${
                    frozen
                      ? "scale-[0.99] opacity-50 blur-[1px]"
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

                    <CreditCard
                      size={26}
                      strokeWidth={1.5}
                      className="transition-transform duration-500 group-hover:rotate-6"
                    />
                  </div>

                  <div className="mt-12">
                    <div className="flex h-9 w-12 items-center justify-center rounded-md border border-white/20 bg-white/10">
                      <div className="h-5 w-7 rounded border border-white/20" />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <p className="number-pop font-mono text-base tracking-[0.16em] text-white/90">
                      {cardNumber}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setShowNumber(
                          (value) => !value
                        )
                      }
                      className="premium-button rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white"
                    >
                      {showNumber ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>
                  </div>

                  <div className="mt-7 flex items-end justify-between">
                    <div>
                      <p className="text-[8px] uppercase tracking-widest text-white/40">
                        Card holder
                      </p>

                      <p className="mt-1 text-xs font-medium tracking-wide">
                        {profile.name
                          .toUpperCase()}
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
                    <div className="success-enter rounded-full border border-white/10 bg-black/30 px-5 py-2.5 text-xs font-semibold shadow-lg backdrop-blur-md">
                      🔒 Card frozen
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={toggleFreeze}
                  disabled={freezing}
                  className={`premium-button flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold ${
                    frozen
                      ? "bg-[#111827] text-white hover:bg-gray-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {frozen ? (
                    <>
                      <Unlock size={16} />
                      Unfreeze card
                    </>
                  ) : (
                    <>
                      <Lock size={16} />
                      Freeze card
                    </>
                  )}
                </button>
              </div>
            </section>

            <div className="space-y-5">
              <section className="premium-card fade-up stagger-2 rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="icon-motion flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                    <ShieldCheck size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Card status
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Current card availability
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                  <div>
                    <p className="text-xs text-gray-400">
                      Status
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {frozen
                        ? "Frozen"
                        : "Active"}
                    </p>
                  </div>

                  <span className="rounded-full bg-gray-900 px-3 py-1 text-[11px] font-semibold text-white">
                    {frozen
                      ? "Frozen"
                      : "Active"}
                  </span>
                </div>
              </section>

              <section className="premium-card fade-up stagger-3 rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="icon-motion flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                    <CreditCard size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Spending limit
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      Your daily card limit
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-bold">
                      ₹
                      {cardSettings.dailyLimit.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <p className="text-xs text-gray-400">
                      per day
                    </p>
                  </div>

                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-[34%] rounded-full bg-[#111827]" />
                  </div>

                  <p className="mt-2 text-[11px] text-gray-400">
                    ₹17,000 used today
                  </p>
                </div>
              </section>

              <section className="premium-card fade-up stagger-4 rounded-[24px] border border-gray-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() =>
                    setSettingsOpen(true)
                  }
                  className="group flex w-full items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="icon-motion flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100">
                      <Settings size={18} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        Card settings
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Manage card preferences
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    size={17}
                    className="text-gray-400 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </section>
            </div>
          </div>
        </div>
      </main>

      {settingsOpen && (
        <CardSettingsModal
          settings={cardSettings}
          updateSetting={updateCardSetting}
          onClose={() =>
            setSettingsOpen(false)
          }
        />
      )}
    </div>
  );
}

function CardSettingsModal({
  settings,
  updateSetting,
  onClose,
}: {
  settings: CardSettings;
  updateSetting: (
    key: keyof CardSettings
  ) => void;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="success-enter w-full max-w-lg rounded-[24px] border border-gray-200 bg-white shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="flex items-start justify-between border-b border-gray-100 p-6">
          <div>
            <p className="text-lg font-semibold">
              Card settings
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Manage how your card can be used.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          <CardSettingRow
            icon={<Wifi size={18} />}
            title="Contactless payments"
            description="Pay using tap-to-pay"
            enabled={settings.contactless}
            onClick={() =>
              updateSetting("contactless")
            }
          />

          <CardSettingRow
            icon={<Smartphone size={18} />}
            title="Online payments"
            description="Allow payments on websites and apps"
            enabled={settings.onlinePayments}
            onClick={() =>
              updateSetting("onlinePayments")
            }
          />

          <CardSettingRow
            icon={<Globe size={18} />}
            title="International payments"
            description="Allow card payments outside India"
            enabled={
              settings.internationalPayments
            }
            onClick={() =>
              updateSetting(
                "internationalPayments"
              )
            }
          />
        </div>

        <div className="border-t border-gray-100 p-6">
          <p className="text-xs font-semibold text-gray-600">
            Daily spending limit
          </p>

          <p className="mt-1 text-xs text-gray-400">
            ₹{settings.dailyLimit.toLocaleString("en-IN")} per day
          </p>

          <button
            type="button"
            onClick={onClose}
            className="premium-button mt-5 w-full rounded-xl bg-[#111827] py-3 text-sm font-semibold text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

function CardSettingRow({
  icon,
  title,
  description,
  enabled,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-5 p-5">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {description}
          </p>
        </div>
      </div>

      <Toggle
        enabled={enabled}
        onClick={onClick}
      />
    </div>
  );
}

function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        enabled
          ? "bg-[#111827]"
          : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function ChevronRight({
  size,
  className,
}: {
  size: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={className}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}