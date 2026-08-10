import { Video, UserCircle, FileText, Image, Type, Grid3x3, MessageSquare, Layers, Zap, ShieldCheck } from "lucide-react";
import "../../styles/home/showcase.css";

export default function ShowcaseSection() {
  return (
    <>
      <section className="section showcase-wrap">
        <div className="container">
          <div className="showcase">

            {/* Col 1 — browser mockup */}
            <div className="showcase__col showcase__col--a">
              <h3>Built for Every Industry</h3>
              <p>One codebase, infinite use-cases — production-ready foundations across web, mobile, and cloud.</p>

              <div className="browser-mock">
                <div className="browser-mock__bar">
                  <span /><span /><span />
                </div>
                <div className="browser-mock__body">
                  <div className="browser-mock__thumb browser-mock__thumb--1">
                    <span>E-Commerce Platform</span>
                  </div>
                  <div className="browser-mock__thumb browser-mock__thumb--2">
                    <span>SaaS Dashboard</span>
                  </div>
                  <div className="browser-mock__thumb browser-mock__thumb--3">
                    <span>Booking System</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2 — widget grid */}
            <div className="showcase__col showcase__col--b">
              <div className="widget-marquee">
                <div className="widget-marquee__row widget-marquee__row--rtl">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Video size={18} /><span>Video</span></div>
                    <div className="widget-grid__item"><UserCircle size={18} /><span>Auth</span></div>
                    <div className="widget-grid__item"><FileText size={18} /><span>Editor</span></div>
                    <div className="widget-grid__item"><Image size={18} /><span>Media</span></div>
                    <div className="widget-grid__item"><Video size={18} /><span>Video</span></div>
                    <div className="widget-grid__item"><UserCircle size={18} /><span>Auth</span></div>
                    <div className="widget-grid__item"><FileText size={18} /><span>Editor</span></div>
                    <div className="widget-grid__item"><Image size={18} /><span>Media</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--ltr">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Type size={18} /><span>Heading</span></div>
                    <div className="widget-grid__item"><Grid3x3 size={18} /><span>Carousel</span></div>
                    <div className="widget-grid__item"><MessageSquare size={18} /><span>Chat</span></div>
                    <div className="widget-grid__item"><Layers size={18} /><span>Layout</span></div>
                    <div className="widget-grid__item"><Type size={18} /><span>Heading</span></div>
                    <div className="widget-grid__item"><Grid3x3 size={18} /><span>Carousel</span></div>
                    <div className="widget-grid__item"><MessageSquare size={18} /><span>Chat</span></div>
                    <div className="widget-grid__item"><Layers size={18} /><span>Layout</span></div>
                  </div>
                </div>
              </div>
              <h3>
                <span className="showcase__grad">40+ Projects</span> Shipped.<br />
                Zero Guesswork.
              </h3>
              <p>Reusable, battle-tested building blocks. No plugins — just clean components that launch fast.</p>
            </div>

            {/* Col 3 — phone mockup */}
            <div className="showcase__col showcase__col--c">
              <h3>Designed to Perform</h3>
              <p>Every build optimized for speed, accessibility, and mobile-first experiences.</p>

              <div className="phone-mock">
                <div className="phone-mock__frame">
                  <div className="phone-mock__notch" />
                  <div className="phone-mock__screen">
                    <div className="phone-mock__row phone-mock__row--wide" />
                    <div className="phone-mock__row" />
                    <div className="phone-mock__btn" />
                  </div>
                </div>
                <span className="phone-mock__badge phone-mock__badge--zap">
                  <Zap size={18} />
                </span>
                <span className="phone-mock__badge phone-mock__badge--shield">
                  <ShieldCheck size={18} />
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  );
}
