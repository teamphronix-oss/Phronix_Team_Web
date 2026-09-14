import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, ArrowRight } from "lucide-react";
import logoVideo from "../assets/Video/give_me_just_my_logo_in_white.mp4";

/* Home page dock items. Only "start" and "touch" are pinned  always
   visible from the top of the page. Everything else (including
   TALK TO AI) reveals in order, one at a time from below, while the
   user scrolls through the page. */
const DEFAULT_ITEMS = [
  { id: "start", label: "Start a project", type: "link", to: "/projects", pinned: true, scrollGated: true, cta: true },
  { id: "touch", label: "WHY US", hasVideo: true, videoSrc: logoVideo, avatar: true, pinned: true },
  { id: "aibot", label: "TALK TO AI", type: "action", action: "open-chatbot" },
  { id: "us", label: "DOCTIFI", hasVideo: true, videoSrc: logoVideo },
  { id: "pitch", label: "OILTRACK", hasVideo: true, videoSrc: logoVideo },
  { id: "awwwards", label: "OUR AWWWADS TALK", hasVideo: true, videoSrc: logoVideo },
];

/* Number of items pinned at the top of the dock (always visible,
   never gated behind scroll position). Keep this in sync with how
   many leading items in DEFAULT_ITEMS carry pinned: true. */
const PINNED_COUNT = 2;

/* Ids cycled through as the user scrolls, in the exact order they
   should become active: TALK TO AI → DOCTIFI → OILTRACK. */
const SCROLL_CYCLE_IDS = ["aibot", "us", "pitch"];

/* Relative scroll-time weight for each id above (same order/length
   as SCROLL_CYCLE_IDS). TALK TO AI gets a smaller share of the
   scroll distance; DOCTIFI and OILTRACK each get a bigger share so
   they stay open/active for longer as the user scrolls. Tune the
   ratios here, not the logic below, to adjust how long each card
   stays open. */
const SCROLL_CYCLE_WEIGHTS = [1, 2, 2]; // total weight = 5

/* Selector for the WHOLE hero section (not just its button). The
   dock's matching "Start a project" pill only appears once the
   entire hero has scrolled fully out of view, so it never feels
   duplicated while any part of the hero is still on screen. */
const HERO_CTA_SELECTOR = ".hero--particle";

/* Only the first entry is used now  it's the single anchor that
   marks where the weighted scroll cycle should begin. */
const DEFAULT_SECTION_SELECTORS = [
  ".about__grid",
  ".section--soft.section--space",
  ".projects-showcase",
];

/* Motion timings are intentionally kept together so the scroll feel can
   be tuned without hunting through the component. */
const REVEAL_STAGGER_MS = 180;

export default function FloatingDock({
  items = DEFAULT_ITEMS,
  sectionSelectors = DEFAULT_SECTION_SELECTORS,
}) {
  const [openId, setOpenId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [heroCtaGone, setHeroCtaGone] = useState(false);

  /* Reveal the dock's "Start a project" pill only once the entire
     hero section has scrolled out of the viewport, so we never show
     two "Start a project" buttons on screen at the same time. */
  useEffect(() => {
    const heroCta = document.querySelector(HERO_CTA_SELECTOR);
    if (!heroCta) {
      setHeroCtaGone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroCtaGone(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Only need one anchor to know when the weighted scroll cycle should begin.
    const startTarget = document.querySelector(sectionSelectors[0]);
    if (!startTarget) return;

    let startY = null;
    let lastActiveIdx = -1;

    const updateFromScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      /*
       * The sequence starts when the first anchor section
       * reaches the same visual point as before.
       */
      if (startY === null) {
        const rect = startTarget.getBoundingClientRect();
        startY = rect.top + window.scrollY - viewportHeight * 0.45;
      }

      /*
       * The complete scroll range available for the dock.
       */
      const pageEndY = document.documentElement.scrollHeight - viewportHeight;

      /*
       * If we haven't reached the starting point yet,
       * close all video panels.
       */
      if (scrollY < startY) {
        if (lastActiveIdx !== -1) {
          lastActiveIdx = -1;
          setOpenId(null);
        }
        return;
      }

      /*
       * Once we reach the actual bottom of the page,
       * close the currently open panel.
       */
      if (scrollY >= pageEndY - 20) {
        if (lastActiveIdx !== -1) {
          lastActiveIdx = -1;
          setOpenId(null);
        }
        return;
      }

      /*
       * Split the ENTIRE remaining scroll distance into weighted
       * zones instead of equal thirds  TALK TO AI gets a shorter
       * zone while DOCTIFI and OILTRACK each get a longer one, so
       * they stay open longer as the user scrolls.
       *
       * Zone 0 → TALK TO AI  (weight 1)
       * Zone 1 → DOCTIFI     (weight 2)
       * Zone 2 → OILTRACK    (weight 2)
       */
      const totalScrollDistance = pageEndY - startY;
      const totalWeight = SCROLL_CYCLE_WEIGHTS.reduce((sum, w) => sum + w, 0);
      const distanceFromStart = scrollY - startY;

      // Walk the weighted zones to find which one distanceFromStart falls in.
      let activeIdx = SCROLL_CYCLE_IDS.length - 1;
      let cumulative = 0;
      for (let i = 0; i < SCROLL_CYCLE_WEIGHTS.length; i++) {
        cumulative += (SCROLL_CYCLE_WEIGHTS[i] / totalWeight) * totalScrollDistance;
        if (distanceFromStart < cumulative) {
          activeIdx = i;
          break;
        }
      }

      /*
       * Keep the index safely inside the cycle's bounds.
       */
      activeIdx = Math.max(0, Math.min(activeIdx, SCROLL_CYCLE_IDS.length - 1));

      /*
       * Don't update React unnecessarily.
       */
      if (activeIdx === lastActiveIdx) return;
      lastActiveIdx = activeIdx;

      /*
       * "aibot" is the first scroll-revealed item right after the
       * pinned ones, so activeIdx maps 1:1 onto visibleCount here
       * (no offset needed  nothing pinned sits inside the scroll
       * cycle anymore).
       */
      setVisibleCount((prev) => Math.max(prev, activeIdx + 1));

      setOpenId(SCROLL_CYCLE_IDS[activeIdx]);
    };

    const initialise = () => {
      startY = null;
      lastActiveIdx = -1;
      updateFromScroll();
    };

    initialise();

    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", initialise);

    return () => {
      window.removeEventListener("scroll", updateFromScroll);
      window.removeEventListener("resize", initialise);
    };
  }, [sectionSelectors]);

  const isPinned = visibleCount > 0;

  return (
    <aside className={`floating-dock${isPinned ? " floating-dock--pinned" : ""}`}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        let isVisible =
          index < PINNED_COUNT || index - PINNED_COUNT < visibleCount;

        if (item.scrollGated) {
          isVisible = isVisible && heroCtaGone;
        }

        return (
          <DockItem
            key={item.id}
            item={item}
            index={index}
            isOpen={isOpen}
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
        "--dock-delay": `${
          Math.max(0, index - PINNED_COUNT) * REVEAL_STAGGER_MS
        }ms`,
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