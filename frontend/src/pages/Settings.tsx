import {
  ArrowLeft,
  Bell,
  Check,
  ChevronRight,
  Lock,
  LogOut,
  Mail,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

import Sidebar from "../components/Sidebar";

import {
  getPreferences,
  getProfile,
  savePreferences,
  saveProfile,
  logout,
  type UserPreferences,
  type UserProfile,
} from "../data/userData";

export default function Settings() {
  const [profile, setProfile] = useState<UserProfile>(
    getProfile()
  );

  const [preferences, setPreferences] =
    useState<UserPreferences>(getPreferences());

  const [modal, setModal] = useState<
    "personal" | "password" | "security" | null
  >(null);

  function updatePreferences(
    updates: Partial<UserPreferences>
  ) {
    const updated = {
      ...preferences,
      ...updates,
    };

    setPreferences(updated);
    savePreferences(updated);
  }

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <div className="page-enter min-h-screen bg-[#f6f7f9] text-[#111827]">
      <Sidebar active="settings" />

      <main className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-[76px] items-center border-b border-gray-200 bg-white/90 px-5 pl-16 backdrop-blur-xl md:px-8 lg:pl-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
              Preferences
            </p>

            <h1 className="mt-1 text-lg font-bold tracking-tight md:text-xl">
              Settings
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-[1000px] px-5 py-7 md:px-8 md:py-10">
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

          <div className="fade-up mb-7">
            <p className="text-sm font-medium text-gray-400">
              Manage your Finora account
            </p>

            <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
              Account settings
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Control your personal information, security and preferences.
            </p>
          </div>

          {/* Profile */}
          <section className="premium-card fade-up rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#111827] text-sm font-bold text-white">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <p className="truncate text-base font-bold">
                  {profile.name}
                </p>

                <p className="mt-1 truncate text-xs text-gray-400">
                  {profile.email}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <SettingsRow
                icon={<User size={17} />}
                title="Personal information"
                description="Update your name and email address"
                onClick={() => setModal("personal")}
              />
            </div>
          </section>

          {/* Security */}
          <section className="premium-card fade-up stagger-2 mt-5 rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5">
              <p className="text-sm font-semibold">
                Security
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Protect your account and payment activity
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              <SettingsRow
                icon={<Lock size={17} />}
                title="Password"
                description="Manage your account password"
                onClick={() => setModal("password")}
              />

              <SettingsRow
                icon={<ShieldCheck size={17} />}
                title="Security settings"
                description="Manage additional security preferences"
                onClick={() => setModal("security")}
              />
            </div>
          </section>

          {/* Notifications */}
          <section className="premium-card fade-up stagger-3 mt-5 rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5">
              <p className="text-sm font-semibold">
                Notifications
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Choose how Finora keeps you informed
              </p>
            </div>

            <div className="divide-y divide-gray-100">
              <ToggleRow
                icon={<Bell size={17} />}
                title="Push notifications"
                description="Receive important account notifications"
                enabled={preferences.notifications}
                onChange={(enabled) =>
                  updatePreferences({
                    notifications: enabled,
                  })
                }
              />

              <ToggleRow
                icon={<Mail size={17} />}
                title="Marketing emails"
                description="Receive product updates and offers"
                enabled={preferences.marketingEmails}
                onChange={(enabled) =>
                  updatePreferences({
                    marketingEmails: enabled,
                  })
                }
              />
            </div>
          </section>

          {/* Account */}
          <section className="fade-up stagger-4 mt-5 rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5">
              <p className="text-sm font-semibold">
                Account
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Manage your current Finora session
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="premium-button flex w-full items-center justify-between rounded-xl border border-gray-200 px-4 py-4 text-left hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                  <LogOut size={16} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Log out
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    End your current Finora session
                  </p>
                </div>
              </div>

              <ChevronRight size={16} className="text-gray-400" />
            </button>
          </section>

          <p className="mt-6 text-center text-[11px] leading-5 text-gray-400">
            Finora is a frontend portfolio simulation.
            <br />
            Account data is stored locally in your browser.
          </p>
        </div>
      </main>

      {modal && (
        <SettingsModal
          type={modal}
          profile={profile}
          name={profile.name}
          email={profile.email}
          setName={(name) => {
            setProfile((current) => ({
              ...current,
              name,
            }));
          }}
          setEmail={(email) => {
            setProfile((current) => ({
              ...current,
              email,
            }));
          }}
          onClose={() => setModal(null)}
          onSavePersonal={(name, email) => {
            const updatedProfile = {
              name,
              email,
            };

            saveProfile(updatedProfile);
            setProfile(updatedProfile);
            setModal(null);
          }}
        />
      )}
    </div>
  );
}

function SettingsRow({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-4 rounded-2xl px-2 py-4 text-left transition hover:bg-gray-50"
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="icon-motion flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="mt-1 truncate text-xs text-gray-400">
            {description}
          </p>
        </div>
      </div>

      <ChevronRight
        size={17}
        className="shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-gray-500"
      />
    </button>
  );
}

function ToggleRow({
  icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        aria-label={`${title}: ${enabled ? "on" : "off"}`}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          enabled ? "bg-[#111827]" : "bg-gray-200"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function SettingsModal({
  type,
  profile,
  name,
  email,
  setName,
  setEmail,
  onClose,
  onSavePersonal,
}: {
  type: "personal" | "password" | "security";
  profile: UserProfile;
  name: string;
  email: string;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  onClose: () => void;
  onSavePersonal: (name: string, email: string) => void;
}) {
  const [saved, setSaved] = useState(false);

  const [biometric, setBiometric] = useState(
    getPreferences().biometricLogin
  );

  function handlePersonalSave() {
    if (!name.trim() || !email.trim()) {
      return;
    }

    onSavePersonal(name.trim(), email.trim());
  }

  function handleBiometricChange(enabled: boolean) {
    setBiometric(enabled);

    const preferences = getPreferences();

    savePreferences({
      ...preferences,
      biometricLogin: enabled,
    });
  }

  const titles = {
    personal: "Personal information",
    password: "Password",
    security: "Security settings",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30 p-0 backdrop-blur-sm md:items-center md:p-5">
      <div className="drawer-enter max-h-[90vh] w-full overflow-y-auto rounded-t-[28px] bg-white p-6 shadow-2xl md:max-w-[520px] md:rounded-[28px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-400">
              Settings
            </p>

            <h2 className="mt-1 text-xl font-bold tracking-tight">
              {titles[type]}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="premium-button rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        {type === "personal" && (
          <div className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-600">
                Full name
              </label>

              <input
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Your name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-600">
                Email address
              </label>

              <input
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-400 focus:bg-white focus:ring-4 focus:ring-gray-100"
              />
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs leading-5 text-gray-400">
                Current account:{" "}
                <span className="font-semibold text-gray-600">
                  {profile.email}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={handlePersonalSave}
              className="premium-button flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              <Check size={16} />
              Save changes
            </button>
          </div>
        )}

        {type === "password" && (
          <div className="mt-7">
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                <Lock size={17} className="text-gray-600" />
              </div>

              <p className="mt-4 text-sm font-semibold">
                Password management
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-400">
                In this portfolio version, authentication is simulated
                locally in your browser. A production application would
                connect this section to a secure authentication service.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSaved(true);

                window.setTimeout(() => {
                  setSaved(false);
                }, 1800);
              }}
              className="premium-button mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111827] py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              {saved ? (
                <>
                  <Check size={16} />
                  Saved
                </>
              ) : (
                <>
                  <ShieldCheck size={16} />
                  Continue
                </>
              )}
            </button>
          </div>
        )}

        {type === "security" && (
          <div className="mt-7">
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">
                    Biometric login
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Use biometric authentication on supported devices.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleBiometricChange(!biometric)
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                    biometric
                      ? "bg-[#111827]"
                      : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                      biometric ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 text-gray-600"
                />

                <div>
                  <p className="text-sm font-semibold">
                    Local security state
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-400">
                    Your preference is stored locally in this browser.
                    This is a portfolio simulation and does not provide
                    real banking security.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}