import { useEffect, useState } from "react";
import FloatingDock from "../components/FloatingDock";
import Seam from "../components/Seam";
import siteConfig from "../data/siteConfig";
import HeroSection from "../components/home/HeroSection";
import TrustedBySection from "../components/home/TrustedBySection";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import WhySection from "../components/home/WhySection";
import ShowcaseSection from "../components/home/ShowcaseSection";
import ProjectsSection from "../components/home/ProjectsSection";
import PageEcosystemSection from "../components/home/PageEcosystemSection";
import PowerhouseSection from "../components/home/PowerhouseSection";
import TopFeaturesSection from "../components/home/TopFeaturesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import PayUpdateSection from "../components/home/PayUpdateSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  const [testimonials, setTestimonials] = useState([]);

useEffect(() => {
    fetch(`${siteConfig.apiBaseUrl}/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = (data.testimonials || []).map((t) => ({
          ...t,
          feedback: t.message,
          logo: t.photo_url,
          company: t.company_name,
          clientName: t.name,
        }));
        setTestimonials(mapped);
      })
      .catch((err) => console.error("Failed to load testimonials:", err));
  }, []);
  
  return (
    <>
      <FloatingDock />
      <HeroSection />
      <TrustedBySection />
      <Seam />
      <AboutSection />
      <Seam />
      <ServicesSection />
      <WhySection />
      <ShowcaseSection />
      <ProjectsSection />
      <Seam />
      <PageEcosystemSection />
      <PowerhouseSection />
      <TopFeaturesSection />
      <TestimonialsSection testimonials={testimonials} />
      <PayUpdateSection />
      <div className="home-cta-spacing">
  <CTASection />
</div>
    </>
  );
}