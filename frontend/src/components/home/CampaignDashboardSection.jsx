import { TrendingUp, MousePointerClick, Target, Wallet } from "lucide-react";
import SectionHeading from "../SectionHeading";
import CountUp from "../CountUp";
import "../../styles/home/campaign-dashboard.css";

// 14-day mock click trend — illustrative, not live data.
const trend = [32, 40, 38, 52, 48, 60, 55, 70, 66, 78, 74, 88, 82, 95];

const stats = [
  { icon: TrendingUp, end: 128, decimals: 0, suffix: "K+", label: "Impressions / mo" },
  { icon: MousePointerClick, end: 4.2, decimals: 1, suffix: "%", label: "Avg. click-through rate" },
  { icon: Target, end: 3.1, decimals: 1, suffix: "K+", label: "Conversions tracked" },
  { icon: Wallet, end: 4.8, decimals: 1, suffix: "x", label: "Avg. ROAS" },
];

export default function CampaignDashboardSection() {
  const max = Math.max(...trend);

  return (
    <section className="section campaign-dash">
      <div className="container">
        <SectionHeading
          eyebrow="Campaigns, Managed End to End"
          title="What running your ads actually looks like"
          description="A sample of the kind of reporting every paid campaign we run gets — tracked, attributed, and reviewed with you, not just handed off."
          center
        />

        <div className="campaign-dash__card">
          <div className="campaign-dash__card-header">
            <span className="campaign-dash__card-title">Click Trend — Last 14 Days</span>
            <span className="campaign-dash__card-badge">Sample data</span>
          </div>

          <div className="campaign-dash__chart" aria-hidden="true">
            {trend.map((v, i) => (
              <span
                key={i}
                className="campaign-dash__chart-bar"
                style={{
                  height: `${(v / max) * 100}%`,
                  animationDelay: `${i * 40}ms`,
                }}
              />
            ))}
          </div>

          <div className="campaign-dash__stats">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div className="campaign-dash__stat" key={s.label}>
                  <div className="campaign-dash__stat-icon">
                    <Icon size={16} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="campaign-dash__stat-value">
                      <CountUp end={s.end} decimals={s.decimals} suffix={s.suffix} />
                    </div>
                    <div className="campaign-dash__stat-label">{s.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
