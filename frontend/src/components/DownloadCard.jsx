import { useState } from "react";
import { Download, Lock, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import siteConfig from "../data/siteConfig";

// Requests a short-lived, signed download URL from the backend. The backend
// verifies the session (and project password, if required) before issuing
// it — no file path or secret ever lives in this component.
export default function DownloadCard({ project }) {
  const { user, loginWithGoogle } = useAuth();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");

  async function handleDownload(e) {
    e.preventDefault();
    if (!user) return loginWithGoogle();

    setStatus("loading");
    setError("");
    try {
      const res = await fetch(`${siteConfig.apiBaseUrl}/downloads/${project.id}/request`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Unable to start download.");
      window.location.href = data.downloadUrl; // short-lived, single-use URL
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <form className="card download-card" onSubmit={handleDownload}>
      <div className="download-card__head">
        <h3>{project.name}</h3>
        {project.version && <span className="tag">{project.version}</span>}
      </div>
      <p>{project.description}</p>

      {project.requiresAuth && (
        <div className="field">
          <label htmlFor={`pw-${project.id}`}>Project password (if provided)</label>
          <input
            id={`pw-${project.id}`}
            type="password"
            placeholder="Leave blank if none was given to you"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}

      {error && <p className="field-error">{error}</p>}

      <button type="submit" className="btn btn--gold btn--block" disabled={status === "loading"}>
        {status === "loading" ? (
          <><Loader2 size={16} className="spin" /> Preparing download…</>
        ) : !user ? (
          <><Lock size={16} /> Sign in to download</>
        ) : (
          <><Download size={16} /> Download ZIP</>
        )}
      </button>
    </form>
  );
}
