import {
  Bot,
  Sparkles,
  Cpu,
  Wand2,
  Mic,
  MessageSquare,
  Zap,
  Eye,
  Workflow,
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
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading";
import "../../styles/home/showcase.css";

const aiTools = [
  { icon: Bot, label: "AI Chatbots" },
  { icon: Sparkles, label: "AI Assistants" },
  { icon: Cpu, label: "AI Agents" },
  { icon: Zap, label: "AI Automation" },
  { icon: Wand2, label: "Generative AI" },
  { icon: Mic, label: "Voice AI" },
  { icon: FileText, label: "Document Intelligence" },
  { icon: Eye, label: "Computer Vision" },
  { icon: Workflow, label: "AI Workflows" },
  { icon: BarChart3, label: "AI Data Analysis" },
  { icon: TrendingUp, label: "Predictive Analytics" },
  { icon: UserCircle, label: "AI Personalization" }
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
                    <Icon size={16} className="spec-bento__ai-icon" />
                    <span className="spec-bento__ai-label">{item.label}</span>
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

            <div className="spec-bento__ticker-vertical">
              <div className="spec-bento__ticker-v-track">
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

            <div className="spec-bento__ticker-horizontal">
              <div className="spec-bento__ticker-h-track">
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