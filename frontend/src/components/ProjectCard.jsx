import { Github, Play, ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, onViewDetails }) {
  return (
    <div className="card project-card">
      <div className="project-card__image">
        <img src={project.image} alt={`${project.name} preview`} loading="lazy" />
        <span className="tag project-card__category">{project.category}</span>
      </div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <div className="service-card__tags">
        {project.technologies.map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>
      <div className="project-card__actions">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
            <Github size={15} /> Code
          </a>
        )}
        {project.demoUrl && (
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
            <Play size={15} /> Demo
          </a>
        )}
        <button className="btn btn--gold btn--sm" onClick={() => onViewDetails(project)}>
          Details <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}
