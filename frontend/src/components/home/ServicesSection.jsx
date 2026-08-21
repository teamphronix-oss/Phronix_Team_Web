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
          <CardCarousel interval={4000}>
            {services.map((s, idx) => (
              <ServiceCard key={s.id} service={s} index={idx} />
            ))}
          </CardCarousel>
          <div className="services-cta-wrap">
            <Link to="/services" className="services-more-btn">
              <span>See All Services</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

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
