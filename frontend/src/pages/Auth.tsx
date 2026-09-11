import {
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import {
  createAccount,
  getProfile,
} from "../data/userData";

export default function Auth() {
  const existingProfile = getProfile();

  const [name, setName] = useState(
    existingProfile.name === "Harish"
      ? ""
      : existingProfile.name
  );

  const [email, setEmail] = useState(
    existingProfile.email ===
      "harish@example.com"
      ? ""
      : existingProfile.email
  );

  const [error, setError] = useState("");

  function handleSubmit() {
    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    createAccount({
     name: cleanName,
     email: cleanEmail,
    });

    window.location.href = "/";
  }

  return (
    <div className="page-enter min-h-screen bg-[#f6f7f9] text-[#111827]">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden bg-[#111827] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full border border-white/10" />
          <div className="absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full border border-white/10" />
          <div className="absolute -bottom-32 -left-20 h-[380px] w-[380px] rounded-full bg-white/[0.025]" />

          <div className="relative">
            <p className="text-xl font-bold tracking-tight">
              Finora
            </p>

            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-white/40">
              Smart banking
            </p>
          </div>

          <div className="relative max-w-xl">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <Sparkles size={21} />
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight">
              Your money.
              <br />
              Your control.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-6 text-white/50">
              A modern financial workspace designed to
              help you understand, manage and move your
              money with confidence.
            </p>

            <p className="mt-5 max-w-md text-sm font-semibold leading-6 text-white/80">
              Note: Sample transactions and payments are already
              included for a smoother, easier experience.
            </p>

          </div>

          <div className="relative flex items-center gap-6 text-xs text-white/40">
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} />
              Secure by design
            </span>

            <span className="flex items-center gap-2">
              <LockKeyhole size={14} />
              Private account
            </span>
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 md:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <p className="text-xl font-bold">Finora</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Smart banking
              </p>
            </div>

            <div className="fade-up">
              <p className="text-sm font-medium text-gray-400">
                Welcome to Finora
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                Create your account
              </h1>

              <p className="mt-2 text-sm leading-6 text-gray-400">
                Set up your personal Finora workspace.
              </p>
            </div>

            <div className="fade-up stagger-2 mt-8 space-y-5 rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm md:p-7">
              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Full name
                </label>

                <input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setError("");
                  }}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600">
                  Email address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setError("");
                  }}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white"
                />
              </div>

              {error && (
                <div className="success-enter rounded-xl bg-gray-50 px-4 py-3 text-xs font-medium text-gray-700">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                className="premium-button flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-3.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Enter Finora
                <ArrowRight size={17} />
              </button>
            </div>

            <p className="mt-6 text-center text-[11px] leading-5 text-gray-400">
              This portfolio demo stores your account
              profile locally in your browser. No real
              banking credentials are collected.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}