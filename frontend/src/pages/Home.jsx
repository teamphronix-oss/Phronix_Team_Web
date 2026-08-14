import FloatingDock from "../components/FloatingDock";
import Seam from "../components/Seam";
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
import testimonials from "../data/testimonials";
import PayUpdateSection from "../components/home/PayUpdateSection";
import CTASection from "../components/home/CTASection";

export default function Home() {
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
