import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.Sparkles;

  return (
    <div className="card service-card">
      <div className="service-card__icon">
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3>{service.name}</h3>
      <p>{service.shortDescription}</p>
      {service.priceRange && (
        <div className="service-card__price">{service.priceRange}</div>
      )}
      {service.technologies?.length > 0 && (
        <div className="service-card__tags">
          {service.technologies.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
      )}
      <Link to="/contact" className="btn btn--outline btn--sm service-card__cta">
        Contact Us
      </Link>
    </div>
  );
}