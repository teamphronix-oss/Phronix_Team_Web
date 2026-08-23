import {
  Sparkles,
  MessageSquare,
  Zap,
  Target,
  Video,
  UserCircle,
  FileText,
  Image,
  Type,
  Grid3x3,
  Layers,
  Bell,
  CreditCard,
  Search,
  Settings,
  Megaphone,
  TrendingUp,
  Mail,
  Share2,
  Users,
  ShieldCheck,
  BarChart3,
  Palette,
  ArrowUpRight
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import "../../styles/home/showcase.css";
import {
  IconAiChatbots,
  IconAiAssistants,
  IconAiAgents,
  IconAiAutomation,
  IconGenerativeAi,
  IconVoiceAi,
  IconDocumentIntelligence,
  IconComputerVision,
  IconAiWorkflows,
  IconAiDataAnalysis,
  IconPredictiveAnalytics,
  IconAiPersonalization,
} from "./AiCapabilityIcons";

const aiTools = [
  {
    icon: IconAiChatbots,
    label: "AI Chatbots",
    description: "Smart conversational experiences that engage.",
  },
  {
    icon: IconAiAssistants,
    label: "AI Assistants",
    description: "Intelligent assistants that help users get things done.",
  },
  {
    icon: IconAiAgents,
    label: "AI Agents",
    description: "Autonomous agents that think, plan and act.",
  },
  {
    icon: IconAiAutomation,
    label: "AI Automation",
    description: "Automate repetitive tasks and business processes.",
  },
  {
    icon: IconGenerativeAi,
    label: "Generative AI",
    description: "Generate text, images, code and more.",
  },
  {
    icon: IconVoiceAi,
    label: "Voice AI",
    description: "Voice interactions and speech understanding.",
  },
  {
    icon: IconDocumentIntelligence,
    label: "Document Intelligence",
    description: "Extract, analyze and understand data from documents.",
  },
  {
    icon: IconComputerVision,
    label: "Computer Vision",
    description: "Analyze images and videos with AI-powered vision.",
  },
  {
    icon: IconAiWorkflows,
    label: "AI Workflows",
    description: "Build intelligent workflows that connect everything.",
  },
  {
    icon: IconAiDataAnalysis,
    label: "AI Data Analysis",
    description: "Turn raw data into meaningful insights and reports.",
  },
  {
    icon: IconPredictiveAnalytics,
    label: "Predictive Analytics",
    description: "Predict trends and outcomes to make better decisions.",
  },
  {
    icon: IconAiPersonalization,
    label: "AI Personalization",
    description: "Deliver personalized experiences that adapt to every user.",
  },
];

const websiteTools = [
  { icon: Video, label: "Video" },
  { icon: UserCircle, label: "Auth" },
  { icon: FileText, label: "Editor" },
  { icon: Image, label: "Media" },
  { icon: Type, label: "Heading" },
  { icon: Grid3x3, label: "Carousel" },
  { icon: MessageSquare, label: "Chat" },
  { icon: Layers, label: "Layout" },
  { icon: Bell, label: "Notifications" },
  { icon: CreditCard, label: "Payments" },
  { icon: Search, label: "Search" },
  { icon: Settings, label: "Settings" }
];

const marketingTools = [
  { icon: Megaphone, label: "Campaigns" },
  { icon: TrendingUp, label: "Growth" },
  { icon: Mail, label: "Email" },
  { icon: Share2, label: "Social" },
  { icon: Users, label: "Audience" },
  { icon: Zap, label: "Ad Targeting" },
  { icon: ShieldCheck, label: "SEO" },
  { icon: FileText, label: "Content" },
  { icon: BarChart3, label: "Analytics" },
  { icon: UserCircle, label: "Influencer" },
  { icon: Target, label: "Retargeting" },
  { icon: Palette, label: "Branding" }
];

export default function ShowcaseSection() {
  /* Both marquees are frozen on their first item (top of the list /
     left of the row) until the tile is actually on screen. Unlike a
     one-shot trigger, this restarts the animation from scratch every
     time the tile re-enters the viewport — bumping a "key" forces
     React to remount the track, which resets the CSS animation to
     0%. Without that reset, scrolling down (which takes a few
     seconds) would let the animation keep running in the background,
     so you'd always land on a mid-list frame instead of item 1. */
  const webTickerRef = useRef(null);
  const [webTickerPlaying, setWebTickerPlaying] = useState(false);
  const [webTickerKey, setWebTickerKey] = useState(0);

  const mktTickerRef = useRef(null);
  const [mktTickerPlaying, setMktTickerPlaying] = useState(false);
  const [mktTickerKey, setMktTickerKey] = useState(0);

  useEffect(() => {
    const node = webTickerRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWebTickerKey((k) => k + 1);
          setWebTickerPlaying(true);
        } else {
          setWebTickerPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = mktTickerRef.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMktTickerKey((k) => k + 1);
          setMktTickerPlaying(true);
        } else {
          setMktTickerPlaying(false);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section showcase-section">
      <div className="container">
        <SectionHeading
          eyebrow="Toolkit & Stack"
          title="Everything we build into your product"
          description="A complete ecosystem spanning intelligent AI capabilities, modern web infrastructure, and conversion-focused marketing tools."
        />

        {/* ── BENTO SPEC GRID ───────────────────────────────────── */}
        <div className="spec-bento">

          {/* 1. HERO TILE — AI TOOLS (Static 4×3 Grid) ─────────── */}
          <div className="spec-bento__tile spec-bento__tile--hero">
            <div className="spec-bento__header">
              <div className="spec-bento__badge-wrap">
                <div className="spec-bento__icon-badge spec-bento__icon-badge--ai">
                  <Sparkles size={16} />
                </div>
                <div className="spec-bento__title-group">
                  <h3 className="spec-bento__title">AI capabilities</h3>
                  <p className="spec-bento__subtitle">Intelligent solutions we build into your product.</p>
                </div>
              </div>
              <span className="spec-bento__count">×12</span>
            </div>

            <div className="spec-bento__ai-grid">
              {aiTools.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="spec-bento__ai-card">
                    <Icon size={34} className="spec-bento__ai-icon" />
                    <span className="spec-bento__ai-label">{item.label}</span>
                    {item.description && (
                      <p className="spec-bento__ai-desc">{item.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. WEB TILE — WEBSITE TOOLS (Vertical Marquee) ──────── */}
          <div className="spec-bento__tile spec-bento__tile--web">
            <div className="spec-bento__header">
              <div className="spec-bento__badge-wrap">
                <div className="spec-bento__icon-badge spec-bento__icon-badge--web">
                  <Layers size={16} />
                </div>
                <h3 className="spec-bento__title">Website tools</h3>
              </div>
              <span className="spec-bento__count">×12</span>
            </div>

            <div className="spec-bento__ticker-vertical" ref={webTickerRef}>
              <div
                key={webTickerKey}
                className={`spec-bento__ticker-v-track${
                  webTickerPlaying ? " is-playing" : ""
                }`}
              >
                {/* First copy for screen readers and visible flow */}
                <div className="spec-bento__v-list">
                  {websiteTools.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="spec-bento__v-row">
                        <Icon size={15} className="spec-bento__web-icon" />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>
                {/* Duplicated copy for seamless loop (aria-hidden) */}
                <div className="spec-bento__v-list" aria-hidden="true">
                  {websiteTools.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="spec-bento__v-row">
                        <Icon size={15} className="spec-bento__web-icon" />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 3. MKT TILE — MARKETING TOOLS (Stat + Horizontal Marquee) */}
          <div className="spec-bento__tile spec-bento__tile--mkt">
            <div className="spec-bento__header">
              <div className="spec-bento__badge-wrap">
                <div className="spec-bento__icon-badge spec-bento__icon-badge--mkt">
                  <Megaphone size={16} />
                </div>
                <h3 className="spec-bento__title">Marketing tools</h3>
              </div>
            </div>

            <div className="spec-bento__mkt-body">
              <div className="spec-bento__stat-num">12</div>
              <p className="spec-bento__stat-subhead">ways to reach an audience</p>
            </div>

            <div className="spec-bento__ticker-horizontal" ref={mktTickerRef}>
              <div
                key={mktTickerKey}
                className={`spec-bento__ticker-h-track${
                  mktTickerPlaying ? " is-playing" : ""
                }`}
              >
                {/* First copy */}
                <div className="spec-bento__h-list">
                  {marketingTools.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="spec-bento__chip">
                        <Icon size={14} className="spec-bento__mkt-icon" />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>
                {/* Duplicated copy for loop (aria-hidden) */}
                <div className="spec-bento__h-list" aria-hidden="true">
                  {marketingTools.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="spec-bento__chip">
                        <Icon size={14} className="spec-bento__mkt-icon" />
                        <span>{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 4. TOTAL TILE — AGGREGATE STAT (Static & Centered) ──── */}
          <div className="spec-bento__tile spec-bento__tile--total">
            <div className="spec-bento__total-content">
              <div className="spec-bento__total-num">36</div>
              <div className="spec-bento__total-label">tools, one platform</div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="showcase-cta-wrap">
          <Link to="/contact" className="btn btn--outline home__more-link">
            <span>Start Building With Phronix</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}