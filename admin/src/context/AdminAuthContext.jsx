import { createContext, useContext, useEffect, useState } from "react";
import siteConfig from "../data/siteConfig";

// Separate from AuthContext (that one is Google login for site visitors).
// This one is the site-owner admin — username/password, JWT cookie.
const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const res = await fetch(`${siteConfig.apiBaseUrl}/admin/me`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.admin);
      } else {
        setAdmin(null);
      }
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function login(username, password) {
    const res = await fetch(`${siteConfig.apiBaseUrl}/admin/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed.");
    setAdmin(data.admin);
    return data.admin;
  }

  async function logout() {
    try {
      await fetch(`${siteConfig.apiBaseUrl}/admin/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setAdmin(null);
    }
  }

  async function forgotPassword(email) {
    const res = await fetch(`${siteConfig.apiBaseUrl}/admin/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong.");
    return data.message;
  }

  async function resetPassword(token, password) {
    const res = await fetch(`${siteConfig.apiBaseUrl}/admin/reset-password/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong.");
    return data.message;
  }

  return (
    <AdminAuthContext.Provider
      value={{ admin, loading, login, logout, forgotPassword, resetPassword }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
