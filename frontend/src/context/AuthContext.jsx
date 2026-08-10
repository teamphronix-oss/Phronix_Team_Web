import { createContext, useContext, useEffect, useState } from "react";
import siteConfig from "../data/siteConfig";

// Lightweight client-side auth context. It never talks to Google directly —
// it only holds whatever user object the backend session/JWT confirms.
// See backend/routes/auth.js for the real Google OAuth flow.
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function loadSession() {
      try {
        const res = await fetch(`${siteConfig.apiBaseUrl}/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setUser(data.user);
        }
      } catch {
        // Backend not reachable — user simply stays logged out.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadSession();
    return () => {
      cancelled = true;
    };
  }, []);

  function loginWithGoogle() {
    window.location.href = `${siteConfig.apiBaseUrl}/auth/google`;
  }

  async function logout() {
    try {
      await fetch(`${siteConfig.apiBaseUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
