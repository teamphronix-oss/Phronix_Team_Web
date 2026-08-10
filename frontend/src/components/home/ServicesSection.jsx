import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "../../components/SectionHeading";
import ServiceCard from "../../components/ServiceCard";
import CardCarousel from "../../components/CardCarousel";
import services from "../../data/services";
import "../../styles/home/services.css";

export default function ServicesSection() {
  return (
    <>
      <section className="section section--soft section--space">
        <div className="container">
          <SectionHeading
            eyebrow="What We Do"
            title="Services built around real product needs"
            description="From first prototype to scaled infrastructure — six disciplines, one team."
          />
          <CardCarousel interval={3000}>
  {services.slice(0, 3).map((s) => (
    <ServiceCard key={s.id} service={s} />
  ))}
</CardCarousel>
          <Link to="/services" className="btn btn--outline home__more-link">
            See all services <ArrowUpRight size={16} />
          </Link>

          <div className="trust-bar">
            <span className="trust-bar__item">
              <Check size={16} /> Full Source Code Ownership
            </span>
            <span className="trust-bar__item">
              <Check size={16} /> Free Support Post-Launch
            </span>
            <span className="trust-bar__item">
              <Check size={16} /> Senior Engineers on Every Project
            </span>
          </div>
        </div>
      </section>

    </>
  );
}
