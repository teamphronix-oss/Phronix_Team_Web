import { Linkedin, Github } from "lucide-react";

export default function TeamCard({ member }) {
  return (
    <div className="team-hover-card">
      <img
        src={member.image}
        alt={member.name}
        className="team-hover-card__img"
        loading="lazy"
      />

      <div className="team-hover-card__overlay">
        <div className="team-hover-card__base">
          <h3>{member.name}</h3>
          <span className="team-hover-card__role">{member.role}</span>
        </div>

        <div className="team-hover-card__extra">
          <p>{member.bio}</p>

          {member.skills?.length > 0 && (
            <div className="team-hover-card__tags">
              {member.skills.map((s) => (
                <span className="tag" key={s}>{s}</span>
              ))}
            </div>
          )}

          <div className="team-hover-card__links">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
              >
                <Linkedin size={16} />
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on GitHub`}
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}