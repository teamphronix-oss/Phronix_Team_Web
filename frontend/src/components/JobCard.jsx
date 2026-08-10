import { useState } from "react";
import { Briefcase, MapPin, Clock, ChevronDown } from "lucide-react";
import siteConfig from "../data/siteConfig";

export default function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);

  const mailSubject = encodeURIComponent(`Application: ${job.title}`);
  const mailBody = encodeURIComponent(
    `Hi Phronix team,\n\nI'd like to apply for the ${job.title} role.\n\nHere's a bit about me:\n`
  );
  const applyHref = `mailto:${siteConfig.careersEmail || siteConfig.email}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div className="card job-card">
      <div className="job-card__head">
        <div>
          <h3>{job.title}</h3>
          <div className="job-card__meta">
            <span><Briefcase size={14} /> {job.department}</span>
            <span><MapPin size={14} /> {job.location}</span>
            <span><Clock size={14} /> {job.type}</span>
          </div>
        </div>
        {!job.open && <span className="badge">Closed</span>}
      </div>

      <p className="job-card__desc">{job.description}</p>

      <button
        type="button"
        className="job-card__toggle"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        {expanded ? "Hide details" : "View details"}
        <ChevronDown size={16} className={expanded ? "job-card__chev job-card__chev--open" : "job-card__chev"} />
      </button>

      {expanded && (
        <div className="job-card__details">
          {job.responsibilities?.length > 0 && (
            <>
              <h4>What you'll do</h4>
              <ul>
                {job.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          )}
          {job.requirements?.length > 0 && (
            <>
              <h4>What we're looking for</h4>
              <ul>
                {job.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </>
          )}
          {job.experience && (
            <p className="job-card__experience">
              <strong>Experience:</strong> {job.experience}
            </p>
          )}
        </div>
      )}

      {job.open ? (
        <a href={applyHref} className="btn btn--gold btn--sm job-card__cta">
          Apply Now
        </a>
      ) : (
        <span className="btn btn--outline btn--sm job-card__cta job-card__cta--disabled">
          Position Closed
        </span>
      )}
    </div>
  );
}