import {
  Bot,
  Layers3,
  Share2,
  TrendingUp,
  Palette,
  BarChart3,
  CircleCheck,
} from "lucide-react";

import SectionHeading from "../../components/SectionHeading";
import "../../styles/home/powerhouse.css";

export default function PowerhouseSection() {
  const features = [
    {
      icon: Bot,
      title: "AI & Automation",
      description:
        "Intelligent systems that work so you can focus on growth.",
      items: [
        "AI Agents & Assistants",
        "Workflow Automation",
        "Chatbots & Voice AI",
        "Internal Tools",
      ],
      className: "cyan",
    },
    {
      icon: Layers3,
      title: "Digital Products",
      description:
        "Powerful digital products built for performance and scale.",
      items: [
        "Websites & Web Apps",
        "Landing Pages",
        "Mobile Apps",
        "Dashboards & Platforms",
      ],
      className: "blue",
    },
    {
      icon: Share2,
      title: "Social & Content",
      description:
        "Engage your audience with content that converts and builds trust.",
      items: [
        "Social Media Management",
        "Content Strategy",
        "Reels & Short-Form Content",
        "Community Growth",
      ],
      className: "pink",
    },
    {
      icon: TrendingUp,
      title: "Marketing & Growth",
      description:
        "Data-driven marketing strategies that bring leads and scale revenue.",
      items: [
        "SEO & Visibility",
        "Paid Campaigns",
        "Lead Generation",
        "Analytics & Optimization",
      ],
      className: "green",
    },
    {
      icon: Palette,
      title: "Brand & Creative",
      description:
        "Memorable brands and creative that make your business stand out.",
      items: [
        "Brand Identity",
        "UI/UX Design",
        "Creative & Motion",
        "Pitch Decks & Presentations",
      ],
      className: "purple",
    },
    {
      icon: BarChart3,
      title: "Data & Intelligence",
      description:
        "Turn your data into valuable insights and smarter decisions.",
      items: [
        "Analytics & Reporting",
        "Business Dashboards",
        "Predictive Insights",
        "Data Automation",
      ],
      className: "orange",
    },
  ];

  return (
    <section className="section section--space features-powerhouse">
      <div className="container">

        <SectionHeading
          eyebrow="What We Do"
         title={
            <>
              More Than Just Software.
              <br />
              We <span className="powerhouse-gradient">Build, Automate & Grow</span>
              <br />
              <span className="powerhouse-gradient">Digital Businesses.</span>
            </>
          }
          description="From AI agents to social growth — everything you need to launch, scale and dominate online."
        />

        <div className="features-powerhouse__grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                className={`features-powerhouse__card features-powerhouse__card--${feature.className}`}
                key={index}
              >
                <div className="powerhouse-card__top">
                  <div className="powerhouse-card__icon">
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  <div className="powerhouse-card__heading">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>

                <div className="powerhouse-card__line" />

                <div className="powerhouse-card__items">
                  {feature.items.map((item, itemIndex) => (
                    <div className="powerhouse-card__item" key={itemIndex}>
                      <CircleCheck size={15} strokeWidth={2} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="powerhouse-stats">
          <div className="powerhouse-stat">
            <strong>50+</strong>
            <span>Projects Delivered</span>
          </div>

          <div className="powerhouse-stat">
            <strong>30+</strong>
            <span>Happy Clients</span>
          </div>

          <div className="powerhouse-stat">
            <strong>98%</strong>
            <span>Project Success</span>
          </div>

          <div className="powerhouse-stat">
            <strong>24/7</strong>
            <span>Support & Care</span>
          </div>
        </div>

      </div>
    </section>
  );
}