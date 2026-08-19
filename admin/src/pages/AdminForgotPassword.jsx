import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

import { useAdminAuth } from "../context/AdminAuthContext";

import "../styles/admin-auth.css";

export default function AdminForgotPassword() {
  const { forgotPassword } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);
    try {
      const msg = await forgotPassword(email);
      setMessage(msg);
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
          <h2 className="admin-auth-card__title">Reset admin password</h2>

          <div className="admin-auth-card__icon">
            <Mail size={26} />
          </div>

          <p className="admin-auth-card__description">
            Enter the admin email — a reset link will be sent if it's registered.
          </p>

          {message && <div className="admin-auth-card__success">{message}</div>}
          {error && <div className="admin-auth-card__error">{error}</div>}

          <label className="admin-field">
            <span>Admin email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <button className="btn btn--gold btn--block" type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send reset link"}
          </button>

          <Link to="/login" className="admin-auth-card__link">
            Back to sign in
          </Link>
        </form>
      </div>
    </div>
  );
}
