import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import SecureDownloadCard from "../components/SecureDownloadCard";
import { useAuth } from "../context/AuthContext";
import siteConfig from "../data/siteConfig";

const API = siteConfig.apiBaseUrl;

export default function Downloads() {
  const { user, loginWithGoogle } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/downloads/client`)
      .then((res) => res.json())
      .then((data) => setProjects(data.downloads || []))
      .catch((err) => console.error("Failed to load client downloads:", err))
      .finally(() => setLoading(false));
  }, []);

  const anyRequiresLogin = projects.some((p) => p.requires_login);

  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="Downloads"
          title="Client project downloads"
          description="Request access and we'll email you a secure, one-time activation link. Nothing is stored in a public folder."
        />

        {anyRequiresLogin && !user && (
          <div className="notice notice--gold">
            <ShieldCheck size={18} />
            <span>Sign in with Google to request downloads that require an account.</span>
            <button className="btn btn--gold btn--sm" onClick={loginWithGoogle}>
              Sign in with Google
            </button>
          </div>
        )}

        <div className="grid grid--3">
          {projects.map((p) => (
            <SecureDownloadCard key={p.id} project={p} projectType="client" />
          ))}
        </div>

        {!loading && projects.length === 0 && (
          <p className="empty-state">No client downloads available yet.</p>
        )}
      </div>
    </div>
  );
}
