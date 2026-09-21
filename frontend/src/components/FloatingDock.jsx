import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, ArrowRight } from "lucide-react";
import logoVideo from "../assets/Video/give_me_just_my_logo_in_white.mp4";

/* Home page dock items.
   - "start": Primary CTA that appears once the hero section has scrolled out of view.
   - Each card corresponds to a SINGLE unique section on the page.
   - Each card appears ONLY when its section is currently in view, and disappears once scrolled past. */
const DEFAULT_ITEMS = [
  {
    id: "start",
    label: "Start a project",
    type: "link",
    to: "/projects",
    pinned: true,
    scrollGated: true,
    cta: true,
  },
  {
    id: "touch",
    label: "WHY US",
    hasVideo: true,
    videoSrc: logoVideo,
    avatar: true,
    sectionSelector: ".section.why",
  },
  {
    id: "aibot",
    label: "TALK TO AI",
    type: "action",
    action: "open-chatbot",
    sectionSelector: ".ai-retrofit",
  },
  {
    id: "us",
    label: "DOCTIFI",
    hasVideo: true,
    videoSrc: logoVideo,
    sectionSelector: ".showcase-section",
  },
  {
    id: "pitch",
    label: "OILTRACK",
    hasVideo: true,
    videoSrc: logoVideo,
    sectionSelector: ".projects-section",
  },
  {
    id: "awwwards",
    label: "OUR AWWWADS TALK",
    hasVideo: true,
    videoSrc: logoVideo,
    sectionSelector: ".features-powerhouse",
  },
];

/* Selector for the hero section. The dock remains completely hidden
   while any part of the hero is still on screen. */
const HERO_CTA_SELECTOR = ".hero--particle";

/* Bottom CTA section selector. The dock tucks away when reaching
   the bottom CTA so it never collides with the page's final action buttons. */
const BOTTOM_CTA_SELECTOR = ".cta, .home-cta-spacing";

export default function FloatingDock({ items = DEFAULT_ITEMS }) {
  const [openId, setOpenId] = useState(null);
  const [activeItemIds, setActiveItemIds] = useState(new Set());
  const [heroCtaGone, setHeroCtaGone] = useState(false);
  const [bottomCtaVisible, setBottomCtaVisible] = useState(false);

  useEffect(() => {
    const heroEl = document.querySelector(HERO_CTA_SELECTOR);
    const bottomCtaEl = document.querySelector(BOTTOM_CTA_SELECTOR);

    const updateVisibility = () => {
      const viewportHeight = window.innerHeight;

      // 1. Hero check: hero must be completely scrolled out of the viewport
      let isHeroGone = true;
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        // Hero is gone only when its bottom has scrolled past the top of the viewport
        isHeroGone = heroRect.bottom <= 0;
        setHeroCtaGone(isHeroGone);
      } else {
        setHeroCtaGone(true);
      }

      // 2. Bottom CTA check: hide when reaching bottom CTA
      let isBottomVisible = false;
      if (bottomCtaEl) {
        const ctaRect = bottomCtaEl.getBoundingClientRect();
        isBottomVisible = ctaRect.top < viewportHeight && ctaRect.bottom > 0;
        setBottomCtaVisible(isBottomVisible);
      }

      // If we are still in the hero section or already at the bottom CTA, no contextual cards should show
      if (!isHeroGone || isBottomVisible) {
        setActiveItemIds(new Set());
        setOpenId(null);
        return;
      }

      // 3. Section checks: each card appears ONLY when its specific section is in the active reading area
      const nextActive = new Set();
      let latestActiveId = null;

      items.forEach((item) => {
        if (!item.sectionSelector) return;
        const target = document.querySelector(item.sectionSelector);
        if (!target) return;

        const rect = target.getBoundingClientRect();
        // A section is active when its top is within the upper 65% of screen and bottom hasn't scrolled past top 20%
        if (rect.top <= viewportHeight * 0.65 && rect.bottom >= viewportHeight * 0.2) {
          nextActive.add(item.id);
          latestActiveId = item.id;
        }
      });

      setActiveItemIds(nextActive);

      // Manage open video panel for the active section
      if (latestActiveId) {
        setOpenId((prev) => {
          if (!nextActive.has(prev)) {
            const itemObj = items.find((it) => it.id === latestActiveId);
            return itemObj?.hasVideo ? latestActiveId : null;
          }
          return prev;
        });
      } else {
        setOpenId(null);
      }
    };

    // Initial check
    updateVisibility();

    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [items]);

  const hasAnyVisible = heroCtaGone && !bottomCtaVisible;

  return (
    <aside className={`floating-dock${hasAnyVisible ? " floating-dock--pinned" : ""}`}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;

        // When hero is still visible or bottom CTA is reached, nothing is visible
        let isVisible = false;
        if (heroCtaGone && !bottomCtaVisible) {
          if (item.id === "start" || item.cta) {
            // "Start a project" is visible throughout once hero is passed
            isVisible = true;
          } else {
            // Contextual cards are visible ONLY when their section is active
            isVisible = activeItemIds.has(item.id);
          }
        }

        return (
          <DockItem
            key={item.id}
            item={item}
            index={index}
            isOpen={isOpen && isVisible}
            isVisible={isVisible}
            onToggle={() => setOpenId(isOpen ? null : item.id)}
          />
        );
      })}
    </aside>
  );
}

function DockItem({ item, index, isOpen, isVisible, onToggle }) {
  const videoRef = useRef(null);
  const isLink = item.type === "link";
  const isAction = item.type === "action";

  const handleAction = () => {
    if (item.action === "open-chatbot") {
      window.dispatchEvent(new CustomEvent("phronix:open-chatbot"));
    }
  };

  useEffect(() => {
    if (!item.hasVideo || !videoRef.current) return;

    if (isOpen) {
      videoRef.current.muted = true;
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise) playPromise.catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isOpen, item.hasVideo]);

  return (
    <div
      className={`floating-dock__item${
        isVisible ? " floating-dock__item--visible" : ""
      }${isOpen ? " floating-dock__item--open" : ""}${
        item.pinned ? " floating-dock__item--pinned" : ""
      }${item.cta ? " floating-dock__item--cta" : ""}`}
      style={{
        "--dock-delay": "0ms",
      }}
    >
      {isLink ? (
        <Link
          to={item.to}
          className={`floating-dock__row floating-dock__row--link${
            item.cta ? " floating-dock__row--cta" : ""
          }`}
          tabIndex={isVisible ? 0 : -1}
        >
          <span className="floating-dock__row-label">
            {item.avatar && <span className="floating-dock__avatar" aria-hidden="true" />}
            <span>{item.label}</span>
          </span>
          <ArrowRight size={14} />
        </Link>
      ) : isAction ? (
        <button
          type="button"
          className="floating-dock__row floating-dock__row--link"
          onClick={handleAction}
          tabIndex={isVisible ? 0 : -1}
        >
          <span className="floating-dock__row-label">
            <span>{item.label}</span>
          </span>
          <ArrowRight size={14} />
        </button>
      ) : (
        <button
          type="button"
          className="floating-dock__row"
          onClick={onToggle}
          aria-expanded={isOpen}
          tabIndex={isVisible ? 0 : -1}
        >
          <span className="floating-dock__row-label">
            {item.avatar && <span className="floating-dock__avatar" aria-hidden="true" />}
            <span>{item.label}</span>
          </span>
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </button>
      )}

      {item.hasVideo && (
        <div
          className={`floating-dock__panel${
            isOpen ? " floating-dock__panel--open" : ""
          }`}
          aria-hidden={!isOpen}
        >
          <div className="floating-dock__panel-inner">
            <div className="floating-dock__video">
              <video ref={videoRef} muted loop playsInline>
                <source src={item.videoSrc} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}