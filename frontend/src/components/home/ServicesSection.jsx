import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "../../components/SectionHeading";
import ServiceCard from "../../components/ServiceCard";
import CardCarousel from "../../components/CardCarousel";
import staticServices from "../../data/services";
import "../../styles/home/services.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function ServicesSection() {
  const [services, setServices] = useState(staticServices);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch(`${API}/services`);

        if (!response.ok) {
          throw new Error("Failed to load services");
        }

        const data = await response.json();
        if (data.services && data.services.length > 0) {
          setServices(data.services);
        }
      } catch (error) {
        console.error("Home services API error:", error);
      }
    }

    loadServices();
  }, []);

  return (
    <>
      <section className="section section--soft section--space">
        <div className="container">
          <SectionHeading
            eyebrow="What We Do"
            title="Services built around real product needs"
            description="From first prototype to the campaign that fills it — nine disciplines spanning engineering and marketing, one team."
          />

          <CardCarousel interval={4000}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
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
