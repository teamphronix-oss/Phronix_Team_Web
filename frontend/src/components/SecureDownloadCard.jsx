import { useState } from "react";
import { Download, Lock, Loader2, Mail, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import siteConfig from "../data/siteConfig";

const API = siteConfig.apiBaseUrl;

// Requests a one-time activation link for a project. The backend emails the
// link (never returns a direct file URL here) — the actual ZIP is only
// reachable after the person opens that emailed link and it validates.
export default function SecureDownloadCard({ project, projectType }) {
  const { user, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | sent | error
  const [error, setError] = useState("");

  const needsLogin = project.requires_login && !user;

  async function handleRequest(e) {
    e.preventDefault();

    if (needsLogin) {
      loginWithGoogle();
      return;
    }

    if (!project.requires_login && !email.trim()) {
      setStatus("error");
      setError("Please enter your email address.");
      return;
    }

    setStatus("loading");
    setError("");

    try {
      const res = await fetch(`${API}/downloads/${projectType}/${project.slug}/request`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project.requires_login ? {} : { email: email.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Unable to request this download.");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <form className="card download-card" onSubmit={handleRequest}>
      {project.image_url && (
        <a
          href={project.youtube_url || undefined}
          target={project.youtube_url ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="download-card__thumb"
        >
          <img src={project.image_url} alt={project.name} />
        </a>
      )}

      <div className="download-card__head">
        <h3>{project.name}</h3>
        {project.version && <span className="tag">{project.version}</span>}
      </div>

      <p>{project.description}</p>

      {status === "sent" ? (
        <p className="field-success">
          <CheckCircle2 size={16} />
          Check your email — we sent a one-time activation link.
        </p>
      ) : (
        <>
          {!project.requires_login && (
            <div className="field">
              <label htmlFor={`email-${project.id}`}>Your email</label>
              <input
                id={`email-${project.id}`}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {error && <p className="field-error">{error}</p>}

          <button type="submit" className="btn btn--gold btn--block" disabled={status === "loading"}>
            {status === "loading" ? (
              <>
                <Loader2 size={16} className="spin" /> Sending link…
              </>
            ) : needsLogin ? (
              <>
                <Lock size={16} /> Sign in to request
              </>
            ) : (
              <>
                <Mail size={16} /> Request download
              </>
            )}
          </button>
        </>
      )}
    </form>
  );
}
