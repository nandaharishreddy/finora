
import {
  ArrowDownLeft,
  ArrowUpRight,
  BarChart3,
  CreditCard,
  LogOut,
  Menu,
  Settings,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

import {
  getProfile,
  logout,
} from "../data/userData";

export default function Sidebar({
  active,
}: {
  active: string;
}) {
  const [open, setOpen] = useState(false);

  const profile = getProfile();

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-[250px] border-r border-gray-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-[76px] items-center border-b border-gray-100 px-6">
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Finora
              </h1>

              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400">
                Smart banking
              </p>
            </div>
          </div>

          <div className="flex-1 px-4 py-6">
            <NavSection title="Overview">
              <NavItem
                active={active === "accounts"}
                icon={<Wallet size={18} />}
                label="Accounts"
                path="/"
              />

              <NavItem
                active={active === "transactions"}
                icon={<ArrowUpRight size={18} />}
                label="Transactions"
                path="/transactions"
              />

              <NavItem
                active={active === "cards"}
                icon={<CreditCard size={18} />}
                label="Cards"
                path="/cards"
              />

              <NavItem
                active={active === "payments"}
                icon={<ArrowDownLeft size={18} />}
                label="Payments"
                path="/payments"
              />
            </NavSection>

            <NavSection title="Insights">
              <NavItem
                active={active === "analytics"}
                icon={<BarChart3 size={18} />}
                label="Analytics"
                path="/analytics"
              />

              <NavItem
                active={active === "settings"}
                icon={<Settings size={18} />}
                label="Settings"
                path="/settings"
              />
            </NavSection>
          </div>

          <div className="border-t border-gray-100 p-4">
            <UserPanel
              profile={profile}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </aside>

      {/* Mobile top button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="premium-button fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm lg:hidden"
      >
        <Menu size={18} />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-[2px] lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] w-[280px] bg-white shadow-2xl transition-transform duration-300 lg:hidden ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-[76px] items-center justify-between border-b border-gray-100 px-6">
            <div>
              <p className="text-xl font-bold tracking-tight">
                Finora
              </p>

              <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                Smart banking
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-6">
            <NavSection title="Overview">
              <MobileNav
                active={active === "accounts"}
                label="Accounts"
                path="/"
                close={() => setOpen(false)}
              />

              <MobileNav
                active={active === "transactions"}
                label="Transactions"
                path="/transactions"
                close={() => setOpen(false)}
              />

              <MobileNav
                active={active === "cards"}
                label="Cards"
                path="/cards"
                close={() => setOpen(false)}
              />

              <MobileNav
                active={active === "payments"}
                label="Payments"
                path="/payments"
                close={() => setOpen(false)}
              />
            </NavSection>

            <NavSection title="Insights">
              <MobileNav
                active={active === "analytics"}
                label="Analytics"
                path="/analytics"
                close={() => setOpen(false)}
              />

              <MobileNav
                active={active === "settings"}
                label="Settings"
                path="/settings"
                close={() => setOpen(false)}
              />
            </NavSection>
          </div>

          <div className="border-t border-gray-100 p-4">
            <UserPanel
              profile={profile}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-400">
        {title}
      </p>

      <div className="mt-3 space-y-1">
        {children}
      </div>
    </div>
  );
}

function NavItem({
  active,
  icon,
  label,
  path,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  path: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = path;
      }}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
        active
          ? "bg-[#111827] text-white"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function MobileNav({
  active,
  label,
  path,
  close,
}: {
  active: boolean;
  label: string;
  path: string;
  close: () => void;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        close();
        window.location.href = path;
      }}
      className={`w-full rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
        active
          ? "bg-[#111827] text-white"
          : "text-gray-500 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

function UserPanel({
  profile,
  onLogout,
}: {
  profile: {
    name: string;
    email: string;
  };
  onLogout: () => void;
}) {
  const initial =
    profile.name.trim().charAt(0).toUpperCase() ||
    "U";

  return (
    <div>
      <div className="flex items-center gap-3 px-2 py-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111827] text-xs font-semibold text-white">
          {initial}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {profile.name}
          </p>

          <p className="truncate text-xs text-gray-400">
            Personal account
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onLogout}
        className="mt-2 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
      >
        <LogOut size={14} />
        Log out
      </button>
    </div>
  );
}