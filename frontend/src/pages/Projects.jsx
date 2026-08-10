import { useMemo, useState } from "react";
import { X, Github, Play, Instagram, ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import YouTubeCard from "../components/YouTubeCard";
import Seam from "../components/Seam";
import { projects, projectCategories } from "../data/projects";
import youtubeVideos from "../data/youtube";
import siteConfig from "../data/siteConfig";

const githubProjects = projects.filter((p) => p.githubUrl);

export default function Projects() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);

  const filtered = useMemo(
    () => (category === "All" ? projects : projects.filter((p) => p.category === category)),
    [category]
  );

  return (
    <div className="page-head-section section">
      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Work we've shipped"
          description="Completed projects across web, mobile, and open source."
        />

        <div className="filter-bar" role="tablist" aria-label="Filter projects by category">
          {projectCategories.map((c) => (
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

        <div className="grid grid--3">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} onViewDetails={setActive} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="empty-state">No projects in this category yet.</p>
        )}
      </div>

      {active && (
        <div className="modal-overlay" onClick={() => setActive(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={active.name}>
            <button className="modal__close" onClick={() => setActive(null)} aria-label="Close details">
              <X size={20} />
            </button>
            <img src={active.image} alt={`${active.name} preview`} className="modal__image" />
            <span className="tag">{active.category}</span>
            <h3>{active.name}</h3>
            <p>{active.description}</p>
            <div className="service-card__tags">
              {active.technologies.map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <div className="project-card__actions">
              {active.githubUrl && (
                <a href={active.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
                  <Github size={15} /> View Code
                </a>
              )}
              {active.demoUrl && (
                <a href={active.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn--gold btn--sm">
                  <Play size={15} /> Watch Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Seam />

      {/* ── GitHub Projects ─────────────────────────────── */}
      <div className="container section">
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub Projects"
          description="Repositories we maintain publicly. All links open securely in a new tab."
        />
        <div className="grid grid--3">
          {githubProjects.map((p) => (
            <div className="card" key={`gh-${p.id}`}>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="service-card__tags">
                {p.technologies.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm service-card__cta"
              >
                <Github size={15} /> View Repository
              </a>
            </div>
          ))}
        </div>
      </div>

      <Seam />

      {/* ── YouTube ──────────────────────────────────────── */}
      <div className="container section">
        <SectionHeading
          eyebrow="Video"
          title="From the Phronix channel"
          description="Build walkthroughs, demos, and behind-the-scenes content."
        />
        <div className="grid grid--3">
          {youtubeVideos.map((v) => (
            <YouTubeCard key={v.id} video={v} />
          ))}
        </div>
      </div>

      {/* ── Instagram CTA ────────────────────────────────── */}
      <div className="container">
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="instagram-banner"
        >
          <span className="instagram-banner__icon"><Instagram size={22} /></span>
          <span>
            <strong>Follow @phronix.tech</strong>
            <span className="instagram-banner__sub">Project drops, team updates, and behind-the-scenes on Instagram</span>
          </span>
          <ArrowUpRight size={20} />
        </a>
      </div>
    </div>
  );
}
