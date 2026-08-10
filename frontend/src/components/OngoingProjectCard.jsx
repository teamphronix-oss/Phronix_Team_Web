const statusClass = {
  Planning: "badge--planning",
  "In Development": "badge--development",
  Testing: "badge--testing",
  "Near Completion": "badge--completion",
};

function formatDate(d) {
  if (!d) return "TBD";
  return new Date(d).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export default function OngoingProjectCard({ project }) {
  return (
    <div className="card ongoing-card">
      <div className="ongoing-card__image">
        <img src={project.image} alt={`${project.name} preview`} loading="lazy" />
      </div>
      <div className="ongoing-card__head">
        <h3>{project.name}</h3>
        <span className={`badge ${statusClass[project.status] || ""}`}>{project.status}</span>
      </div>
      <p>{project.description}</p>
      <div className="service-card__tags">
        {project.technologies.map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>
      <div className="ongoing-card__dates">
        <span>Started: {formatDate(project.startDate)}</span>
        <span>Target: {formatDate(project.expectedCompletion)}</span>
      </div>
    </div>
  );
}
