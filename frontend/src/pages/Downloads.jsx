import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import DownloadCard from "../components/DownloadCard";
import { useAuth } from "../context/AuthContext";
import siteConfig from "../data/siteConfig";

const API = siteConfig.apiBaseUrl;
const API_ORIGIN = API.replace(/\/api$/, "");

export default function Downloads() {
  const { user, loginWithGoogle } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/downloads`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.downloads || []).map((d) => ({
          ...d,
          requiresAuth: d.requires_auth ?? d.requiresPassword ?? true,
          image: d.image_url
            ? d.image_url.startsWith("http")
              ? d.image_url
              : `${API_ORIGIN}${d.image_url}`
            : "",
        }));
        setProjects(mapped);
      })
      .catch((err) => console.error("Failed to load downloads:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="Downloads"
          title="Project downloads"
          description="Available to authorized users only. Files are served through short-lived, signed links issued by our backend — never stored in a public folder."
        />

        {!user && (
          <div className="notice notice--gold">
            <ShieldCheck size={18} />
            <span>Sign in with Google to unlock available downloads.</span>
            <button className="btn btn--gold btn--sm" onClick={loginWithGoogle}>
              Sign in with Google
            </button>
          </div>
        )}

        <div className="grid grid--3">
          {projects.map((p) => (
            <DownloadCard key={p.id} project={p} />
          ))}
        </div>

        {!loading && projects.length === 0 && (
          <p className="empty-state">No downloadable projects available yet.</p>
        )}
      </div>
    </div>
  );
}