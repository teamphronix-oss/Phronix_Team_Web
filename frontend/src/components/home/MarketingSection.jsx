import { Search, Target, Palette, Share2 } from "lucide-react";
import SectionHeading from "../SectionHeading";
import CountUp from "../CountUp";
import "../../styles/home/marketing.css";

const pillars = [
  {
    icon: Search,
    title: "SEO & Organic Growth",
    desc: "Technical SEO, on-page structure, and content that compounds — built to rank, not just to launch.",
  },
  {
    icon: Target,
    title: "Paid & Performance",
    desc: "Search and social campaigns built around conversion tracking and measurable return, not vanity impressions.",
  },
  {
    icon: Palette,
    title: "Brand & Positioning",
    desc: "Messaging, identity, and a story that holds together across every page, ad, and pitch deck.",
  },
  {
    icon: Share2,
    title: "Content & Social",
    desc: "Editorial calendars and social systems that keep a brand visible and consistent, week after week.",
  },
];

const stats = [
  { end: 3.4, decimals: 1, suffix: "x", label: "avg. organic traffic growth" },
  { end: 4.8, decimals: 1, suffix: "x", label: "avg. paid campaign ROAS" },
  { end: 60, decimals: 0, suffix: "+", label: "campaigns launched" },
  { end: 25, decimals: 0, suffix: "+", label: "brands positioned" },
];

export default function MarketingSection() {
  return (
    <section className="section marketing-section">
      <div className="container">
        <SectionHeading
          eyebrow="Marketing & Growth"
          title="We don't just ship it. We sell it."
          description="Engineering gets a product live. Marketing gets it in front of the people who'll actually buy it. We run both under one roof, so the site we build and the campaigns that drive to it are never working from two different playbooks."
          center
        />

        <div className="marketing-section__grid">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div className="marketing-card" key={p.title}>
                <div className="marketing-card__icon">
                  <Icon size={20} strokeWidth={1.8} />
                </div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="marketing-stats">
          {stats.map((s) => (
            <div className="marketing-stats__item" key={s.label}>
              <span className="marketing-stats__value">
                <CountUp end={s.end} decimals={s.decimals} suffix={s.suffix} />
              </span>
              <span className="marketing-stats__label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
