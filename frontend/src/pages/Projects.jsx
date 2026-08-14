import { useEffect, useMemo, useState } from "react";
import { X, Github, Play, Instagram, ArrowUpRight } from "lucide-react";

import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import YouTubeCard from "../components/YouTubeCard";
import Seam from "../components/Seam";

import { projects as staticProjects } from "../data/projects";
import youtubeVideos from "../data/youtube";
import siteConfig from "../data/siteConfig";

const API = siteConfig.apiBaseUrl;
const API_ORIGIN = API.replace(/\/api$/, "");

const DEFAULT_CATEGORIES = [
  "All",
  "Web App",
  "Mobile App",
  "E-Commerce",
  "Dashboard",
  "Open Source",
];

function normalizeProject(project) {
  let imageUrl = project.image || "";

  if (imageUrl) {
    // Already a complete URL
    if (
      imageUrl.startsWith("http://") ||
      imageUrl.startsWith("https://") ||
      imageUrl.startsWith("data:")
    ) {
      imageUrl = imageUrl;
    }

    // Backend-served upload (multer disk storage, served via express.static
    // at /uploads on the API server — NOT Supabase Storage)
    else {
      imageUrl = `${API_ORIGIN}/${imageUrl.replace(/^\/+/, "")}`;
    }
  }

  return {
    ...project,

    githubUrl:
      project.githubUrl ||
      project.github_url ||
      "",

    demoUrl:
      project.demoUrl ||
      project.demo_url ||
      "",

    technologies: Array.isArray(project.technologies)
      ? project.technologies
      : [],

    image:
      imageUrl ||
      "/assets/placeholder-project.svg",
  };
}
export default function Projects() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);

  const [apiProjects, setApiProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // ─────────────────────────────────────────────
  // Load projects added from Admin Dashboard
  // ─────────────────────────────────────────────
  useEffect(() => {
    let mounted = true;

    async function loadProjects() {
      try {
        setLoading(true);

        const res = await fetch(`${API}/projects`);

        if (!res.ok) {
          throw new Error("Failed to load projects.");
        }

        const data = await res.json();

        if (mounted) {
          const normalized = (data.projects || []).map(normalizeProject);
          setApiProjects(normalized);
        }
      } catch (error) {
        console.error("Projects API error:", error);

        if (mounted) {
          setApiProjects([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      mounted = false;
    };
  }, []);

  // ─────────────────────────────────────────────
  // Combine static + Admin projects
  // ─────────────────────────────────────────────
  const allProjects = useMemo(() => {
    const staticData = staticProjects.map(normalizeProject);

    const combined = [...staticData, ...apiProjects];

    // Avoid duplicate projects if same ID exists
    const uniqueProjects = [];
    const seen = new Set();

    combined.forEach((project) => {
      const key =
        project.id ||
        project.name?.toLowerCase().trim();

      if (!seen.has(key)) {
        seen.add(key);
        uniqueProjects.push(project);
      }
    });

    return uniqueProjects;
  }, [apiProjects]);

  // ─────────────────────────────────────────────
  // Dynamic categories
  // ─────────────────────────────────────────────
  const categories = useMemo(() => {
    const dynamicCategories = allProjects
      .map((project) => project.category)
      .filter(Boolean);

    return [
      ...new Set([
        ...DEFAULT_CATEGORIES,
        ...dynamicCategories,
      ]),
    ];
  }, [allProjects]);

  // ─────────────────────────────────────────────
  // Filter projects
  // ─────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (category === "All") {
      return allProjects;
    }

    return allProjects.filter(
      (project) => project.category === category
    );
  }, [allProjects, category]);

  // ─────────────────────────────────────────────
  // GitHub projects
  // ─────────────────────────────────────────────
  const githubProjects = useMemo(() => {
    return allProjects.filter(
      (project) => project.githubUrl
    );
  }, [allProjects]);

  return (
    <div className="page-head-section section">
      {/* ─────────────────────────────────────────── */}
      {/* Main Projects */}
      {/* ─────────────────────────────────────────── */}

      <div className="container">
        <SectionHeading
          eyebrow="Projects"
          title="Work we've shipped"
          description="Completed projects across web, mobile, and open source."
        />

        {/* Category Filters */}
        <div
          className="filter-bar"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={category === c}
              className={`filter-chip ${
                category === c
                  ? "filter-chip--active"
                  : ""
              }`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <p className="empty-state">
            Loading projects...
          </p>
        )}

        {/* Projects Grid */}
        {!loading && (
          <div className="grid grid--3">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={setActive}
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filtered.length === 0 && (
          <p className="empty-state">
            No projects in this category yet.
          </p>
        )}
      </div>

      {/* ─────────────────────────────────────────── */}
      {/* Project Details Modal */}
      {/* ─────────────────────────────────────────── */}

      {active && (
        <div
          className="modal-overlay"
          onClick={() => setActive(null)}
        >
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
              src={
                active.image ||
                "/assets/placeholder-project.svg"
              }
              alt={`${active.name} preview`}
              className="modal__image"
            />

            <span className="tag">
              {active.category}
            </span>

            <h3>{active.name}</h3>

            <p>{active.description}</p>

            <div className="service-card__tags">
              {(active.technologies || []).map((technology) => (
                <span
                  className="tag"
                  key={technology}
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="project-card__actions">
              {active.githubUrl && (
                <a
                  href={active.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline btn--sm"
                >
                  <Github size={15} />
                  View Code
                </a>
              )}

              {active.demoUrl && (
                <a
                  href={active.demoUrl}
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
      {/* GitHub Projects */}
      {/* ─────────────────────────────────────────── */}

      <div className="container section">
        <SectionHeading
          eyebrow="Open Source"
          title="GitHub Projects"
          description="Repositories we maintain publicly. All links open securely in a new tab."
        />

        <div className="grid grid--3">
          {githubProjects.map((project) => (
            <div
              className="card"
              key={`gh-${project.id}`}
            >
              <h3>{project.name}</h3>

              <p>{project.description}</p>

              <div className="service-card__tags">
                {(project.technologies || []).map(
                  (technology) => (
                    <span
                      className="tag"
                      key={technology}
                    >
                      {technology}
                    </span>
                  )
                )}
              </div>

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline btn--sm service-card__cta"
              >
                <Github size={15} />
                View Repository
              </a>
            </div>
          ))}
        </div>
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
            <YouTubeCard
              key={video.id}
              video={video}
            />
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────── */}
      {/* Instagram */}
      {/* ─────────────────────────────────────────── */}

      <div className="container">
        <a
          href={siteConfig.social.instagram}
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
              Project drops, team updates, and
              behind-the-scenes on Instagram
            </span>
          </span>

          <ArrowUpRight size={20} />
        </a>
      </div>
    </div>
  );
}