import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.Sparkles;

  return (
    <article className="card service-card">
      {/* Icon */}
      <div className="service-card__icon">
        <Icon size={22} strokeWidth={1.8} />
      </div>

      {/* Service name */}
      <h3>{service.name}</h3>

      {/* Description */}
      {service.shortDescription && (
        <p>{service.shortDescription}</p>
      )}

      {/* Technologies */}
      {Array.isArray(service.technologies) &&
        service.technologies.length > 0 && (
          <div className="service-card__tags">
            {service.technologies.map((technology) => (
              <span
                className="tag"
                key={technology}
              >
                {technology}
              </span>
            ))}
          </div>
        )}

      {/* Bottom section */}
      <div className="service-card__footer">
        {service.priceRange && (
          <div className="service-card__price">
            <span className="service-card__price-label">
              STARTING AT
            </span>

            <strong>{service.priceRange}</strong>
          </div>
        )}

        <Link
          to="/contact"
          className="btn btn--outline btn--sm service-card__cta"
        >
          Get Started
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}