import { useEffect, useState } from "react";
import { Instagram, ArrowUpRight, ShieldCheck } from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import SecureDownloadCard from "../components/SecureDownloadCard";
import YouTubeCard from "../components/YouTubeCard";
import Seam from "../components/Seam";
import { useAuth } from "../context/AuthContext";
import siteConfig from "../data/siteConfig";
import staticYoutubeVideos from "../data/youtube";

const API = siteConfig.apiBaseUrl;

export default function Projects() {
  const { user, loginWithGoogle } = useAuth();

  // Student download projects state
  const [studentDownloads, setStudentDownloads] = useState([]);
  const [studentLoading, setStudentLoading] = useState(true);

  // YouTube videos state
  const [youtubeVideos, setYoutubeVideos] = useState(staticYoutubeVideos || []);

  useEffect(() => {
    let mounted = true;

    fetch(`${API}/downloads/student`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setStudentDownloads(data.downloads || []);
      })
      .catch((err) => console.error("Failed to load student downloads:", err))
      .finally(() => {
        if (mounted) setStudentLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    fetch(`${API}/youtube-videos`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted && data.videos && data.videos.length > 0) {
          setYoutubeVideos(data.videos);
        }
      })
      .catch((err) => console.error("YouTube videos API error:", err));

    return () => {
      mounted = false;
    };
  }, []);

  const anyRequiresLogin = studentDownloads.some((p) => p.requires_login);

  const instagramUrl =
    siteConfig.socialLinks?.instagram ||
    siteConfig.social?.instagram ||
    "https://instagram.com/phronix.tech";

  return (
    <div className="page-head-section section">
      {/* ─────────────────────────────────────────── */}
      {/* Student Project Downloads */}
      {/* ─────────────────────────────────────────── */}
      <div className="container section">
        <SectionHeading
          eyebrow="Student Resources"
          title="Student project downloads"
          description="Request access and we'll email you a secure, one-time activation link."
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

        {studentLoading && (
          <div className="grid grid--3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="card project-card project-card--skeleton">
                <div className="project-card__image skeleton-pulse" />
                <div className="skeleton-line skeleton-line--title skeleton-pulse" />
                <div className="skeleton-line skeleton-line--text skeleton-pulse" />
              </div>
            ))}
          </div>
        )}

        {!studentLoading && studentDownloads.length > 0 && (
          <div className="grid grid--3">
            {studentDownloads.map((p) => (
              <SecureDownloadCard key={p.id} project={p} projectType="student" />
            ))}
          </div>
        )}

        {!studentLoading && studentDownloads.length === 0 && (
          <div className="empty-state-wrap">
            <p className="empty-state">No student project downloads available right now.</p>
          </div>
        )}
      </div>

      <Seam />

      {/* ─────────────────────────────────────────── */}
      {/* YouTube */}
      {/* ─────────────────────────────────────────── */}
      <div className="container section">
        <SectionHeading
          eyebrow="Video"
          title="From the Phronix channel"
          description="Build walkthroughs, demos, and behind-the-scenes content."
        />

        <div className="grid grid--3">
          {youtubeVideos.map((video) => (
            <YouTubeCard key={video.id} video={video} />
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────── */}
      {/* Instagram */}
      {/* ─────────────────────────────────────────── */}
      <div className="container">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-banner"
        >
          <span className="instagram-banner__icon">
            <Instagram size={22} />
          </span>

          <span>
            <strong>Follow @phronix.tech</strong>

            <span className="instagram-banner__sub">
              Project drops, team updates, and behind-the-scenes on Instagram
            </span>
          </span>

          <ArrowUpRight size={20} />
        </a>
      </div>
    </div>
  );
}