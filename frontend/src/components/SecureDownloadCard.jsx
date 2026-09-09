import { useState } from "react";
import { Download, Lock, Loader2, Mail, CheckCircle2, MessageCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import siteConfig from "../data/siteConfig";

const API = siteConfig.apiBaseUrl;

// Requests a one-time activation link for a project. For most downloads the
// backend emails the link straight to the requester. For downloads where
// the backend responds with redirectWhatsapp:true (admin-notified/manual
// review projects), the link instead goes to the team's inbox, and this
// component shows a short "redirecting" notice before opening WhatsApp with
// a prefilled message naming the project   the actual admin notification
// email was already sent the moment the request was made.
export default function SecureDownloadCard({ project, projectType }) {
  const { user, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | sent | redirecting | error
  const [error, setError] = useState("");
  const [resultMessage, setResultMessage] = useState("");

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

      setResultMessage(data.message || "Request received.");

      if (data.redirectWhatsapp) {
        setStatus("redirecting");

        const waMessage = `Hi Phronix, I'd like to request access to download "${project.name}".`;
        const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

        setTimeout(() => {
          window.location.href = waUrl;
        }, 6000);
      } else {
        setStatus("sent");
      }
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

      {status === "sent" && (
        <p className="field-success">
          <CheckCircle2 size={16} />
          {resultMessage}
        </p>
      )}

      {status === "redirecting" && (
        <p className="field-success">
          <MessageCircle size={16} />
          {resultMessage} Opening WhatsApp in a moment   send the message so our team can follow up.
        </p>
      )}

      {status !== "sent" && status !== "redirecting" && (
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
