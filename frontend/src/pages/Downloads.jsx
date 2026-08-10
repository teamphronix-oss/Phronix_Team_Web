import { ShieldCheck } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import DownloadCard from "../components/DownloadCard";
import downloadableProjects from "../data/downloads";
import { useAuth } from "../context/AuthContext";

export default function Downloads() {
  const { user, loginWithGoogle } = useAuth();

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
          {downloadableProjects.map((p) => (
            <DownloadCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
