import * as Icons from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function ServiceCard({ service }) {
  const Icon = Icons[service.icon] || Icons.Sparkles;
  const description = service.description || service.shortDescription;
  const tags = service.features || service.technologies || [];
  const price = service.price_range || service.priceRange;

  return (
    <div className="card service-card service-card--minimal">
      <div className="service-card__top">
        <div className="service-card__icon-wrap">
          <Icon size={22} strokeWidth={1.8} className="service-card__icon-svg" />
        </div>
      </div>
      <div className="service-card__body">
        <h3 className="service-card__title">{service.name}</h3>
        {description && <p className="service-card__desc">{description}</p>}
        {tags.length > 0 && (
          <div className="service-card__tags">
            {tags.map((f) => (
              <span className="service-card__tag" key={f}>
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="service-card__footer">
        {price && (
          <div className="service-card__price-badge">
            <span className="service-card__price-label">Starting at</span>
            <span className="service-card__price-val">{price}</span>
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
