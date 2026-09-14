import { useEffect, useMemo, useState } from "react";
import { ShieldCheck, X, Play, Code2, TrendingUp, Bot, ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import SecureDownloadCard from "../components/SecureDownloadCard";
import ProjectCard from "../components/ProjectCard";
import Seam from "../components/Seam";
import { useAuth } from "../context/AuthContext";
import siteConfig from "../data/siteConfig";
import {
  projects as portfolioProjects,
  projectCategories as portfolioCategories,
} from "../data/projects";

const API = siteConfig.apiBaseUrl;

export default function Downloads() {
  const { user, loginWithGoogle } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Portfolio projects state (moved here from Projects.jsx)
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch(`${API}/downloads/client`)
      .then((res) => res.json())
      .then((data) => setProjects(data.downloads || []))
      .catch((err) => console.error("Failed to load client downloads:", err))
      .finally(() => setLoading(false));
  }, []);

  const anyRequiresLogin = projects.some((p) => p.requires_login);

  const filteredProjects = useMemo(() => {
    if (category === "All") return portfolioProjects;
    return portfolioProjects.filter((p) => p.category === category);
  }, [category]);

  return (
    <div className="page-head-section section">
      {/* ─────────────────────────────────────────── */}
      {/* Featured Projects / Case Studies */}
      {/* ─────────────────────────────────────────── */}
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio & Case Studies"
          title="Engineered to build. Managed to grow."
          description="From high-conversion platforms and cross-platform apps to automated AI workflows and performance campaigns — explore our client work."
        />

        {/* Category Filters from projects.js */}
        <div className="filter-bar" role="tablist" aria-label="Filter projects by category">
          {portfolioCategories.map((c) => (
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

        {/* Portfolio Projects Grid */}
        <div className="grid grid--3">
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onViewDetails={setActive}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="empty-state-wrap">
            <p className="empty-state">No projects found in this category.</p>
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

            {/* Pillar Breakdown Tabs when available */}
            {active.pillarDetails && (
              <ProjectPillarTabs details={active.pillarDetails} />
            )}

            {active.features && active.features.length > 0 && (
              <div style={{ margin: "16px 0" }}>
                <h4 style={{ fontSize: "14px", marginBottom: "8px", color: "var(--ink)" }}>Key Highlights:</h4>
                <ul style={{ paddingLeft: "20px", color: "var(--ink-soft)", fontSize: "13.5px", lineHeight: 1.6 }}>
                  {active.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
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
              {(active.demoUrl || active.demo_url || active.youtube_url) && (
                <a
                  href={active.demoUrl || active.demo_url || active.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm"
                >
                  <Play size={15} />
                  Watch Video
                </a>
              )}

              <a
                href="/contact"
                className="btn btn--gold btn--sm"
              >
                Contact Us
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      )}

      <Seam />

      {/* ─────────────────────────────────────────── */}
      {/* Client Project Downloads */}
      {/* ─────────────────────────────────────────── */}
      <div className="container section">
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