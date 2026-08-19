import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { KeyRound } from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import { useAdminAuth } from "../context/AdminAuthContext";

import "../styles/admin-auth.css";

export default function AdminResetPassword() {
  const { token } = useParams();
  const { resetPassword } = useAdminAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    try {
      await resetPassword(token, password);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-head-section section admin-auth-page">
      <div className="container admin-auth-page__inner">
        <SectionHeading
          center
          eyebrow="Admin"
          title="Set a new password"
          description="Choose a new password for the admin account."
        />

        <form className="card admin-auth-card" onSubmit={handleSubmit}>
          <div className="admin-auth-card__icon">
            <KeyRound size={26} />
          </div>

          {error && <div className="admin-auth-card__error">{error}</div>}

          <label className="admin-field">
            <span>New password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </label>

          <label className="admin-field">
            <span>Confirm password</span>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
            />
          </label>

          <button className="btn btn--gold btn--block" type="submit" disabled={submitting}>
            {submitting ? "Updating…" : "Update password"}
          </button>

          <Link to="/login" className="admin-auth-card__link">
            Back to sign in
          </Link>
        </form>
      </div>
    </div>
  );
}
