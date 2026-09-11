import Dashboard from "./pages/Dashboard";
import Cards from "./pages/Cards";
import Payments from "./pages/Payments";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";

import { isAuthenticated } from "./data/userData";

export default function App() {
  const path = window.location.pathname;

  if (!isAuthenticated() && path !== "/login") {
    return <Auth />;
  }

  if (path === "/login") {
    return <Auth />;
  }

  if (path === "/cards") {
    return <Cards />;
  }

  if (path === "/transactions") {
    return <Transactions />;
  }

  if (path === "/payments") {
    return <Payments />;
  }

  if (path === "/analytics") {
    return <Analytics />;
  }

  if (path === "/settings") {
    return <Settings />;
  }

  return <Dashboard />;
}