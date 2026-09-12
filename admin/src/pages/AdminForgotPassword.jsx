import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ShieldCheck } from "lucide-react";

import { useAdminAuth } from "../context/AdminAuthContext";

import "../styles/admin-auth.css";

export default function AdminForgotPassword() {
  const { forgotPassword, verifyOtp } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSendCode(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      const msg = await forgotPassword(email);
      setMessage(msg);
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    try {
      const resetToken = await verifyOtp(email, otp);

      navigate("/reset-password", {
        state: { resetToken },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-head-section section admin-auth-page">
      <div className="container admin-auth-page__inner">
        <form
          className="card admin-auth-card"
          onSubmit={step === 1 ? handleSendCode : handleVerifyOtp}
        >
          <span className="admin-auth-card__eyebrow">
            ADMIN
          </span>

          <h2 className="admin-auth-card__title">
            {step === 1
              ? "Reset admin password"
              : "Verify your email"}
          </h2>

          <div className="admin-auth-card__icon">
            {step === 1 ? (
              <Mail size={26} />
            ) : (
              <ShieldCheck size={26} />
            )}
          </div>

          {step === 1 ? (
            <>
              <p className="admin-auth-card__description">
                Enter your admin email and we'll send you a verification code.
              </p>

              {message && (
                <div className="admin-auth-card__success">
                  {message}
                </div>
              )}

              {error && (
                <div className="admin-auth-card__error">
                  {error}
                </div>
              )}

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

              <button
                className="btn btn--gold btn--block"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Sending…"
                  : "Send verification code"}
              </button>
            </>
          ) : (
            <>
              <p className="admin-auth-card__description">
                Enter the 6-digit verification code sent to your email.
              </p>

              {message && (
                <div className="admin-auth-card__success">
                  {message}
                </div>
              )}

              {error && (
                <div className="admin-auth-card__error">
                  {error}
                </div>
              )}

              <label className="admin-field">
                <span>Verification code</span>

                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  autoComplete="one-time-code"
                  required
                />
              </label>

              <button
                className="btn btn--gold btn--block"
                type="submit"
                disabled={submitting || otp.length !== 6}
              >
                {submitting ? "Verifying…" : "Verify code"}
              </button>

              <button
                type="button"
                className="admin-auth-card__link"
                onClick={() => {
                  setStep(1);
                  setOtp("");
                  setError("");
                  setMessage("");
                }}
              >
                Change email
              </button>
            </>
          )}

          <Link
            to="/login"
            className="admin-auth-card__link"
          >
            Back to sign in
          </Link>
        </form>
      </div>
    </div>
  );
}