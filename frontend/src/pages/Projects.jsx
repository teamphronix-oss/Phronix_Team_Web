import { useEffect, useMemo, useState } from "react";
import {
  X,
  Github,
  Play,
  Instagram,
  ArrowUpRight,
  ShieldCheck,
  Code2,
  TrendingUp,
  Bot,
} from "lucide-react";

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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [youtubeVideos, setYoutubeVideos] = useState(staticYoutubeVideos || []);
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);

  useEffect(() => {
    let mounted = true;

    fetch(`${API}/downloads/student`)
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setProjects(data.downloads || []);
      })
      .catch((err) => console.error("Failed to load student downloads:", err))
      .finally(() => {
        if (mounted) setLoading(false);
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

  const anyRequiresLogin = projects.some((p) => p.requires_login);

  const categories = useMemo(() => {
    const found = projects.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(found)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (category === "All") return projects;
    return projects.filter((p) => p.category === category);
  }, [projects, category]);

  const instagramUrl =
    siteConfig.socialLinks?.instagram ||
    siteConfig.social?.instagram ||
    "https://instagram.com/phronix.tech";

  return (
    <div className="page-head-section section">
      {/* ─────────────────────────────────────────── */}
      {/* Student Project Downloads */}
      {/* ─────────────────────────────────────────── */}

      <div className="container">
        <SectionHeading
          eyebrow="Projects"
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

        {categories.length > 1 && (
          <div className="filter-bar" role="tablist" aria-label="Filter projects by category">
            {categories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                className={`filter-chip ${category === c ? "filter-chip--active" : ""}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {loading && (
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

        {!loading && (
          <div className="grid grid--3">
            {filteredProjects.map((p) => (
              <SecureDownloadCard key={p.id} project={p} projectType="student" />
            ))}
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="empty-state-wrap">
            <p className="empty-state">No student project downloads available yet.</p>
          </div>
        )}

        {!loading && projects.length > 0 && filteredProjects.length === 0 && (
          <div className="empty-state-wrap">
            <p className="empty-state">No projects in this category yet.</p>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────── */}
      {/* Project Details Modal */}
      {/* ─────────────────────────────────────────── */}

      {active && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
          >
            <button
              className="modal__close"
              onClick={() => setActive(null)}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <img
              src={active.image || active.image_url || "/assets/placeholder-project.svg"}
              alt={`${active.name} preview`}
              className="modal__image"
            />

            {active.category && <span className="tag">{active.category}</span>}

            <h3>{active.name}</h3>

            <p>{active.description}</p>

            {active.pillarDetails && (
              <ProjectPillarTabs details={active.pillarDetails} />
            )}

            {active.technologies?.length > 0 && (
              <div className="service-card__tags">
                {active.technologies.map((technology) => (
                  <span className="tag" key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
            )}

            <div className="project-card__actions">
              {(active.githubUrl || active.github_url) && (
                <a
                  href={active.githubUrl || active.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm"
                >
                  <Github size={15} />
                  View Code
                </a>
              )}

              {(active.demoUrl || active.demo_url || active.youtube_url) && (
                <a
                  href={active.demoUrl || active.demo_url || active.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--gold btn--sm"
                >
                  <Play size={15} />
                  Watch Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

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

/* Tabbed breakdown shown inside a project's modal when it touched more than
   one discipline — e.g. a case study that involved both a build and a
   marketing campaign, or a build with an AI layer added on top. */
const PILLAR_TAB_CONFIG = {
  build: { label: "The Build", icon: Code2 },
  campaign: { label: "The Campaign", icon: TrendingUp },
  ai: { label: "The AI Layer", icon: Bot },
};

function ProjectPillarTabs({ details }) {
  const availableKeys = Object.keys(PILLAR_TAB_CONFIG).filter(
    (k) => details && details[k]
  );
  const [tab, setTab] = useState(availableKeys[0]);

  if (availableKeys.length === 0) return null;

  return (
    <div className="project-pillar-tabs">
      <div className="project-pillar-tabs__nav" role="tablist">
        {availableKeys.map((key) => {
          const { label, icon: Icon } = PILLAR_TAB_CONFIG[key];
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              className={`project-pillar-tabs__btn ${
                tab === key ? "project-pillar-tabs__btn--active" : ""
              }`}
              onClick={() => setTab(key)}
            >
              <Icon size={13} strokeWidth={2} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
      <p className="project-pillar-tabs__body">{details[tab]}</p>
    </div>
  );
}
