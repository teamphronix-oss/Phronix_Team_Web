import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ShieldCheck, Lock, Eye, EyeOff } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import "../../styles/admin/admin-auth.css";

export default function AdminLogin() {
  const { admin, loading, login } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  if (!loading && admin) return <Navigate to="/admin" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-head-section section admin-auth-page">
      <div className="container admin-auth-page__inner">
        <form className="card admin-auth-card" onSubmit={handleSubmit}>
          <span className="admin-auth-card__eyebrow">— ADMIN</span>
          <h2 className="admin-auth-card__title">Admin sign in</h2>

          <div className="admin-auth-card__icon">
            <ShieldCheck size={26} />
          </div>

          <p className="admin-auth-card__description">
            Sign in to edit the Phronix website — team, projects, and site logo.
          </p>

          {error && <div className="admin-auth-card__error">{error}</div>}

          <label className="admin-field">
            <span>Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className="admin-field">
            <span>Password</span>
            <div className="admin-field__password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="admin-field__toggle-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </label>

          <Link to="/admin/forgot-password" className="admin-auth-card__link">
            Forgot password?
          </Link>

          <button className="btn btn--gold btn--block" type="submit" disabled={submitting}>
            <Lock size={16} /> {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}