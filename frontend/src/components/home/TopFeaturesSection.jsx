import { Headphones, RefreshCw, Globe, Search, Zap, Palette } from "lucide-react";
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
              <h4>Friendly Support</h4>
              <p>We're here when you need us — fast, helpful, and human.</p>
            </div>

            <div className="tf-card">
              <div className="tf-card__icon">
                <RefreshCw size={24} strokeWidth={1.8} />
              </div>
              <h4>Free Post-Launch Updates</h4>
              <p>Enjoy ongoing improvements, bug fixes, and small tweaks — on us.</p>
            </div>

            <div className="tf-card">
              <div className="tf-card__icon">
                <Globe size={24} strokeWidth={1.8} />
              </div>
              <h4>Cross-Browser Compatible</h4>
              <p>Looks and works perfectly on Chrome, Safari, Firefox, and Edge.</p>
            </div>

            <div className="tf-card">
              <div className="tf-card__icon">
                <Search size={24} strokeWidth={1.8} />
              </div>
              <h4>SEO Optimized</h4>
              <p>Built to rank better and load faster on all major search engines.</p>
            </div>

            <div className="tf-card">
              <div className="tf-card__icon">
                <Zap size={24} strokeWidth={1.8} />
              </div>
              <h4>Blazing Fast Performance</h4>
              <p>Optimized code and structure for speed and smooth performance.</p>
            </div>

            <div className="tf-card">
              <div className="tf-card__icon">
                <Palette size={24} strokeWidth={1.8} />
              </div>
              <h4>Fully Customizable Design</h4>
              <p>Colors, fonts, and layout — shaped to match your brand exactly.</p>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
