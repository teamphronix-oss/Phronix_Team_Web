import { useEffect, useState } from "react";
import FloatingDock from "../components/FloatingDock";
import Seam from "../components/Seam";
import siteConfig from "../data/siteConfig";
import staticTestimonials from "../data/testimonials";
import HeroSection from "../components/home/HeroSection";
import TrustedBySection from "../components/home/TrustedBySection";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import WhySection from "../components/home/WhySection";
import MarketingSection from "../components/home/MarketingSection";
import CampaignDashboardSection from "../components/home/CampaignDashboardSection";
import AIRetrofitSection from "../components/home/AIRetrofitSection";
import ShowcaseSection from "../components/home/ShowcaseSection";
import ProjectsSection from "../components/home/ProjectsSection";
import PageEcosystemSection from "../components/home/PageEcosystemSection";
import PowerhouseSection from "../components/home/PowerhouseSection";
import TopFeaturesSection from "../components/home/TopFeaturesSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import PayUpdateSection from "../components/home/PayUpdateSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
  const [testimonials, setTestimonials] = useState(staticTestimonials);

  useEffect(() => {
    fetch(`${siteConfig.apiBaseUrl}/testimonials`)
      .then((res) => res.json())
      .then((data) => {
        if (data.testimonials && data.testimonials.length > 0) {
          const mapped = data.testimonials.map((t) => ({
            ...t,
            feedback: t.message || t.feedback,
            logo: t.photo_url || t.logo,
            company: t.company_name || t.company,
            clientName: t.name || t.clientName,
          }));
          setTestimonials(mapped);
        }
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
      <MarketingSection />
      <CampaignDashboardSection />
      <AIRetrofitSection />
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