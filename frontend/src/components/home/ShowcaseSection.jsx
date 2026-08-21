import { Video, UserCircle, FileText, Image, Type, Grid3x3, MessageSquare, Layers, Zap, ShieldCheck, Bot, Sparkles, Cpu, Wand2, Brain, Mic, Megaphone, TrendingUp, Mail, Share2, Eye, Workflow, Database, Target, Bell, CreditCard, Search, Settings, BarChart3, Users, Palette } from "lucide-react";
import "../../styles/home/showcase.css";

export default function ShowcaseSection() {
  return (
    <>
      <section className="section showcase-wrap">
        <div className="container">
          <div className="showcase">

            {/* Col 1 — AI tools widget grid */}
            <div className="showcase__col showcase__col--a">
              <span className="eyebrow showcase__label">AI Tools</span>
              <div className="widget-marquee showcase__marquee--top">
                <div className="widget-marquee__row widget-marquee__row--rtl">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Bot size={18} /><span>Chatbot</span></div>
                    <div className="widget-grid__item"><Sparkles size={18} /><span>AI Assistant</span></div>
                    <div className="widget-grid__item"><Bot size={18} /><span>Chatbot</span></div>
                    <div className="widget-grid__item"><Sparkles size={18} /><span>AI Assistant</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--ltr">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Cpu size={18} /><span>Automation</span></div>
                    <div className="widget-grid__item"><Wand2 size={18} /><span>Image AI</span></div>
                    <div className="widget-grid__item"><Cpu size={18} /><span>Automation</span></div>
                    <div className="widget-grid__item"><Wand2 size={18} /><span>Image AI</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--rtl">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Brain size={18} /><span>Smart Insights</span></div>
                    <div className="widget-grid__item"><Mic size={18} /><span>Voice AI</span></div>
                    <div className="widget-grid__item"><Brain size={18} /><span>Smart Insights</span></div>
                    <div className="widget-grid__item"><Mic size={18} /><span>Voice AI</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--ltr">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><MessageSquare size={18} /><span>NLP</span></div>
                    <div className="widget-grid__item"><Zap size={18} /><span>Predictive</span></div>
                    <div className="widget-grid__item"><MessageSquare size={18} /><span>NLP</span></div>
                    <div className="widget-grid__item"><Zap size={18} /><span>Predictive</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--rtl">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Eye size={18} /><span>Vision AI</span></div>
                    <div className="widget-grid__item"><Workflow size={18} /><span>Workflow AI</span></div>
                    <div className="widget-grid__item"><Eye size={18} /><span>Vision AI</span></div>
                    <div className="widget-grid__item"><Workflow size={18} /><span>Workflow AI</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--ltr">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Database size={18} /><span>Data Analysis</span></div>
                    <div className="widget-grid__item"><Target size={18} /><span>Recommendations</span></div>
                    <div className="widget-grid__item"><Database size={18} /><span>Data Analysis</span></div>
                    <div className="widget-grid__item"><Target size={18} /><span>Recommendations</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 2 — website tools widget grid */}
            <div className="showcase__col showcase__col--b">
              <span className="eyebrow showcase__label">Website Tools</span>
              <div className="widget-marquee">
                <div className="widget-marquee__row widget-marquee__row--rtl">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Video size={18} /><span>Video</span></div>
                    <div className="widget-grid__item"><UserCircle size={18} /><span>Auth</span></div>
                    <div className="widget-grid__item"><Video size={18} /><span>Video</span></div>
                    <div className="widget-grid__item"><UserCircle size={18} /><span>Auth</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--ltr">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><FileText size={18} /><span>Editor</span></div>
                    <div className="widget-grid__item"><Image size={18} /><span>Media</span></div>
                    <div className="widget-grid__item"><FileText size={18} /><span>Editor</span></div>
                    <div className="widget-grid__item"><Image size={18} /><span>Media</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--rtl">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Type size={18} /><span>Heading</span></div>
                    <div className="widget-grid__item"><Grid3x3 size={18} /><span>Carousel</span></div>
                    <div className="widget-grid__item"><Type size={18} /><span>Heading</span></div>
                    <div className="widget-grid__item"><Grid3x3 size={18} /><span>Carousel</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--ltr">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><MessageSquare size={18} /><span>Chat</span></div>
                    <div className="widget-grid__item"><Layers size={18} /><span>Layout</span></div>
                    <div className="widget-grid__item"><MessageSquare size={18} /><span>Chat</span></div>
                    <div className="widget-grid__item"><Layers size={18} /><span>Layout</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--rtl">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Bell size={18} /><span>Notifications</span></div>
                    <div className="widget-grid__item"><CreditCard size={18} /><span>Payments</span></div>
                    <div className="widget-grid__item"><Bell size={18} /><span>Notifications</span></div>
                    <div className="widget-grid__item"><CreditCard size={18} /><span>Payments</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--ltr">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Search size={18} /><span>Search</span></div>
                    <div className="widget-grid__item"><Settings size={18} /><span>Settings</span></div>
                    <div className="widget-grid__item"><Search size={18} /><span>Search</span></div>
                    <div className="widget-grid__item"><Settings size={18} /><span>Settings</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3 — marketing tools widget grid */}
            <div className="showcase__col showcase__col--c">
              <span className="eyebrow showcase__label">Marketing Tools</span>
              <div className="widget-marquee showcase__marquee--top">
                <div className="widget-marquee__row widget-marquee__row--rtl">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Megaphone size={18} /><span>Campaigns</span></div>
                    <div className="widget-grid__item"><TrendingUp size={18} /><span>Growth</span></div>
                    <div className="widget-grid__item"><Megaphone size={18} /><span>Campaigns</span></div>
                    <div className="widget-grid__item"><TrendingUp size={18} /><span>Growth</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--ltr">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Mail size={18} /><span>Email</span></div>
                    <div className="widget-grid__item"><Share2 size={18} /><span>Social</span></div>
                    <div className="widget-grid__item"><Mail size={18} /><span>Email</span></div>
                    <div className="widget-grid__item"><Share2 size={18} /><span>Social</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--rtl">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><UserCircle size={18} /><span>Audience</span></div>
                    <div className="widget-grid__item"><Zap size={18} /><span>Ad Targeting</span></div>
                    <div className="widget-grid__item"><UserCircle size={18} /><span>Audience</span></div>
                    <div className="widget-grid__item"><Zap size={18} /><span>Ad Targeting</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--ltr">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><ShieldCheck size={18} /><span>SEO</span></div>
                    <div className="widget-grid__item"><FileText size={18} /><span>Content</span></div>
                    <div className="widget-grid__item"><ShieldCheck size={18} /><span>SEO</span></div>
                    <div className="widget-grid__item"><FileText size={18} /><span>Content</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--rtl">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><BarChart3 size={18} /><span>Analytics</span></div>
                    <div className="widget-grid__item"><Users size={18} /><span>Influencer</span></div>
                    <div className="widget-grid__item"><BarChart3 size={18} /><span>Analytics</span></div>
                    <div className="widget-grid__item"><Users size={18} /><span>Influencer</span></div>
                  </div>
                </div>
                <div className="widget-marquee__row widget-marquee__row--ltr">
                  <div className="widget-marquee__track">
                    <div className="widget-grid__item"><Target size={18} /><span>Retargeting</span></div>
                    <div className="widget-grid__item"><Palette size={18} /><span>Branding</span></div>
                    <div className="widget-grid__item"><Target size={18} /><span>Retargeting</span></div>
                    <div className="widget-grid__item"><Palette size={18} /><span>Branding</span></div>
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