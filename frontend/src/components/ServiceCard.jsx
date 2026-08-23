import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.Sparkles;

  return (
    <div className="card service-card service-card--minimal">
      <div className="service-card__top">
        <div className="service-card__icon-wrap">
          <Icon size={22} strokeWidth={1.8} className="service-card__icon-svg" />
        </div>
      </div>
      <div className="service-card__body">
        <h3 className="service-card__title">{service.name}</h3>
        <p className="service-card__desc">{service.description}</p>
        {service.features?.length > 0 && (
          <div className="service-card__tags">
            {service.features.map((f) => (
              <span className="service-card__tag" key={f}>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="service-card__footer">
        {service.price_range && (
          <div className="service-card__price-badge">
            <span className="service-card__price-label">Starting at</span>
            <span className="service-card__price-val">{service.price_range}</span>
          </div>
        )}
        <Link
          to="/contact"
          className="service-card__action-btn"
          data-cursor-label="Inquire"
        >
          <span>Get Started</span>
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </div>
  );
}
