import { ArrowUpRight, Database, Cloud, Boxes, Server, Workflow, Smartphone, Type } from "lucide-react";
import SectionHeading from "../../components/SectionHeading";
import "../../styles/home/powerhouse.css";
import "../../styles/home/feature-trio.css";

export default function PowerhouseSection() {
  return (
    <>
      <section className="section section--space features-powerhouse">
        <div className="container">
          <SectionHeading
            eyebrow="All-in-One Powerhouse"
            title="Everything You Need, Built Right In"
            description="From first commit to production infra — the whole stack comes ready, so you skip the setup and start shipping."
          />
          <div className="features-powerhouse__grid">
            <div className="features-powerhouse__card">
              <h3>Fast Project Kickoffs</h3>
              <p>Save weeks of setup. We spin up a production-ready boilerplate so your idea starts shipping from day one.</p>
              <div className="fp-mock">
                <div className="fp-mock__bar"><span /><span /><span /></div>
                <div className="fp-mock__body">
                  <div className="fp-mock__thumb fp-mock__thumb--a">
                    <span>Landing Page</span>
                  </div>
                  <div className="fp-mock__thumb fp-mock__thumb--b">
                    <span>Admin Dashboard</span>
                  </div>
                </div>
                <span className="fp-mock__download" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </div>

            <div className="features-powerhouse__card">
              <h3>Integrated Tech Stack</h3>
              <p>Every tool you need — no extra cost, no hassle. Battle-tested integrations, ready out of the box.</p>
              <div className="fp-stack-grid">
                <div className="fp-stack-item"><Database size={22} /><span>PostgreSQL</span></div>
                <div className="fp-stack-item"><Cloud size={22} /><span>AWS</span></div>
                <div className="fp-stack-item"><Boxes size={22} /><span>Docker</span></div>
                <div className="fp-stack-item"><Server size={22} /><span>Node.js</span></div>
                <div className="fp-stack-item"><Workflow size={22} /><span>CI / CD</span></div>
                <div className="fp-stack-item"><Smartphone size={22} /><span>React Native</span></div>
              </div>
            </div>
          </div>

          {/* ── NEW: 3-box row (BrightHub-style) below the 2 cards ── */}
          <div className="feature-trio__grid">

            {/* Col 1 — Pick Your Stack */}
            <div className="feature-trio__col">
              <h3>Pick Your Stack</h3>
              <p>Choose the frameworks and integrations that fit your product — nothing forced, nothing locked in.</p>
              <div className="feature-trio__visual">
                <div className="ft-font-mock">
                  <span className="ft-font-mock__badge">
                    <Type size={18} />
                  </span>
                  <div className="ft-font-mock__line ft-font-mock__line--sm">React · Next.js · Node</div>
                  <div className="ft-font-mock__line ft-font-mock__line--md" style={{ marginTop: 10 }}>PostgreSQL · Supabase</div>
                  <div className="ft-font-mock__line ft-font-mock__line--lg" style={{ marginTop: 10 }}>Your Stack, Your Rules</div>
                </div>
              </div>
            </div>

            {/* Col 2 — Structured Page Builder */}
            <div className="feature-trio__col">
              <h3>Structured Page Builder</h3>
              <p>Every page follows a clean header–content–footer architecture, easy to extend as you grow.</p>
              <div className="feature-trio__visual">
                <div className="ft-builder-mock">
                  <div className="ft-builder-mock__block ft-builder-mock__block--header">Header</div>
                  <div className="ft-builder-mock__block ft-builder-mock__block--content">Content Block</div>
                  <div className="ft-builder-mock__block ft-builder-mock__block--footer">Footer</div>
                </div>
              </div>
            </div>

            {/* Col 3 — SEO-Ready & Blazing Fast */}
            <div className="feature-trio__col">
              <h3>SEO-Ready &amp; Blazing Fast</h3>
              <p>Built for speed and top scores on Core Web Vitals — no extra optimization work needed.</p>
              <div className="feature-trio__visual">
                <div className="ft-gauge-mock">
                  <div className="ft-gauge-mock__bar"><span /></div>
                  <div className="ft-gauge-mock__score">
                    <span className="ft-gauge-mock__grade">A</span>
                    <div>
                      <strong>&gt;90%</strong>
                      <span>Performance Score</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
    </>
  );
}
