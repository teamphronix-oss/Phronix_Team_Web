import { useState } from "react";
import { Github, Play, ArrowUpRight, Code2 } from "lucide-react";

export default function ProjectCard({ project, onViewDetails }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="card project-card">
      <div className="project-card__image">
        {!hasError && project.image ? (
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="project-card__placeholder">
            <Code2 size={32} className="project-card__placeholder-icon" />
            <span className="project-card__placeholder-text">{project.name}</span>
          </div>
        )}
        <span className="tag project-card__category">{project.category}</span>
      </div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="service-card__tags">
        {project.technologies?.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
      <div className="project-card__actions">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline btn--sm"
          >
            <Github size={15} /> Code
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--outline btn--sm"
          >
            <Play size={15} /> Demo
          </a>
        )}
        <button
          type="button"
          className="btn btn--gold btn--sm"
          onClick={() => onViewDetails(project)}
        >
          Details <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}
