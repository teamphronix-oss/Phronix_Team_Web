import { Bot, Cpu, Workflow } from "lucide-react";
import SectionHeading from "../SectionHeading";
import BeforeAfterSlider from "../BeforeAfterSlider";
import "../../styles/home/ai-retrofit.css";

const pillars = [
  {
    icon: Bot,
    title: "AI Chatbots & Copilots",
    desc: "Trained on your product and docs — live on your site, handling support and sales conversations.",
  },
  {
    icon: Cpu,
    title: "AI in Existing Software",
    desc: "We don't require a rebuild. AI features get layered onto the system you already run.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    desc: "The manual, repetitive parts of your process — automated, monitored, and handed off documented.",
  },
];

const beforeMock = (
  <div className="ba-mock ba-mock--before">
    <div className="ba-mock-row"><span className="ba-mock-dot" />Order #4471 — "Where's my package?" <span className="ba-mock-badge">Unread</span></div>
    <div className="ba-mock-row"><span className="ba-mock-dot" />Refund request — 3 days old <span className="ba-mock-badge">Unread</span></div>
    <div className="ba-mock-row"><span className="ba-mock-dot" />"Do you ship internationally?" <span className="ba-mock-badge">Unread</span></div>
    <div className="ba-mock-row"><span className="ba-mock-dot" />Order #4498 — sizing question <span className="ba-mock-badge">Unread</span></div>
  </div>
);

const afterMock = (
  <div className="ba-mock ba-mock--after">
    <div className="ba-mock-row">Order #4471 — tracking link sent <span className="ba-mock-badge">Resolved · 4s</span></div>
    <div className="ba-mock-row">Refund routed to policy flow <span className="ba-mock-badge">Resolved · 9s</span></div>
    <div className="ba-mock-row">Shipping FAQ answered <span className="ba-mock-badge">Resolved · 2s</span></div>
    <div className="ba-mock-row">Sizing chart linked <span className="ba-mock-badge">Resolved · 3s</span></div>
  </div>
);

export default function AIRetrofitSection() {
  return (
    <section className="section ai-retrofit">
      <div className="container">
        <SectionHeading
          eyebrow="AI, Done Practically"
          title="Same software. New AI layer."
          description="This isn't a rebuild-from-scratch pitch. We add AI to what you already have — a support inbox, an internal tool, a legacy dashboard — and measure it in hours saved and tickets resolved, not buzzwords."
          center
        />

        <BeforeAfterSlider
          before={beforeMock}
          after={afterMock}
          beforeLabel="Manual inbox"
          afterLabel="AI-handled"
        />
        <p className="ai-retrofit__caption">Drag to compare — a support inbox before and after an AI layer.</p>

        <div className="ai-retrofit__grid">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div className="ai-retrofit__card" key={p.title}>
                <div className="ai-retrofit__icon">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
