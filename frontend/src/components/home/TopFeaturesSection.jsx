import { Headphones, Bot, Star, Search, ShieldCheck, Palette } from "lucide-react";
import "../../styles/home/top-features.css";

export default function TopFeaturesSection() {
  return (
    <>
      <section className="section top-features">
        <div className="container">
          <div className="top-features__intro">
            <span className="eyebrow-badge">Complete Page Ecosystem</span>
            <h2 className="top-features__title">
              <span className="top-features__grad">Top-Notch Features</span> Included
            </h2>
            <p>Everything you need for a smooth, professional build — no extra cost, no hidden hassle.</p>
          </div>

          <div className="top-features__grid">
            <div className="tf-card">
              <div className="tf-card__icon">
                <Headphones size={24} strokeWidth={1.8} />
              </div>
              <h4>24x7 Support</h4>
              <p>Reach us anytime via bot or a real call — help is always one message away.</p>
            </div>

            <div className="tf-card">
              <div className="tf-card__icon">
                <Bot size={24} strokeWidth={1.8} />
              </div>
              <h4>AI-First Thinking</h4>
              <p>Smart automation baked into the build — so your product works smarter from day one.</p>
            </div>

            <div className="tf-card">
              <div className="tf-card__icon">
                <Star size={24} strokeWidth={1.8} />
              </div>
              <h4>Social Review Optimization</h4>
              <p>Built to earn trust — optimized to collect and showcase great reviews.</p>
            </div>

            <div className="tf-card">
              <div className="tf-card__icon">
                <Search size={24} strokeWidth={1.8} />
              </div>
              <h4>SEO Optimized & Scalable</h4>
              <p>Built to rank better, load faster, and grow with your business.</p>
            </div>

            <div className="tf-card">
              <div className="tf-card__icon">
                <ShieldCheck size={24} strokeWidth={1.8} />
              </div>
              <h4>Security & High-Speed Performance</h4>
              <p>Locked-down, optimized code that stays fast without cutting corners.</p>
            </div>

            <div className="tf-card">
              <div className="tf-card__icon">
                <Palette size={24} strokeWidth={1.8} />
              </div>
              <h4>Fully Customized Design</h4>
              <p>Colors, fonts, and layout — shaped to match your brand exactly.</p>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}