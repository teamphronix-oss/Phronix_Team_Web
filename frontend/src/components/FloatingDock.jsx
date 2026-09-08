import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, ArrowRight } from "lucide-react";
import logoVideo from "../assets/Video/give_me_just_my_logo_in_white.mp4";

/* Home page dock items. "touch" and "start" are pinned — always visible
   from the top of the page. The rest reveal in order while the user
   scrolls through the matching sections below. */
const DEFAULT_ITEMS = [
  { id: "touch", label: "GET IN TOUCH", hasVideo: true, videoSrc: logoVideo, avatar: true },
  { id: "start", label: "Start a project", type: "link", to: "/projects", pinned: true, scrollGated: true, cta: true },
  { id: "aibot", label: "Talk to our AI Bot", type: "action", action: "open-chatbot", pinned: true },
  { id: "us", label: "THIS IS US", hasVideo: true, videoSrc: logoVideo },
  { id: "pitch", label: "PITCHDECK", hasVideo: true, videoSrc: logoVideo },
  { id: "awwwards", label: "OUR AWWWARDS TALK", hasVideo: true, videoSrc: logoVideo },
];

/* Number of items pinned at the top of the dock (always visible,
   never gated behind scroll position). Keep this in sync with how
   many leading items in DEFAULT_ITEMS carry pinned: true. */
const PINNED_COUNT = 3;

/* Selector for the hero's own "Start a project" button. The dock's
   matching pill only appears once this one has scrolled out of view,
   so the CTA never feels duplicated on first load. */
const HERO_CTA_SELECTOR = ".hero__button--primary";

/* Keep these selectors distinct. They correspond to:
   1. About / This Is Us
   2. Services / Pitchdeck
   3. Projects / Our Awwwards Talk */
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

  /* Reveal the dock's "Start a project" pill only once the hero's own
     CTA button has scrolled out of the viewport, so we never show two
     "Start a project" buttons on screen at the same time. */
  useEffect(() => {
    const heroCta = document.querySelector(HERO_CTA_SELECTOR);
    if (!heroCta) {
      setHeroCtaGone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroCtaGone(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-88px 0px 0px 0px" }
    );

    observer.observe(heroCta);
    return () => observer.disconnect();
  }, []);

 useEffect(() => {
  const targets = sectionSelectors
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);

  if (targets.length === 0) return;

  let startY = null;
  let lastActiveIdx = -1;

  const updateFromScroll = () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    /*
     * The sequence starts when the first matching section
     * reaches the same visual point as before.
     */
    if (startY === null) {
      const firstRect = targets[0].getBoundingClientRect();

      startY =
        firstRect.top +
        window.scrollY -
        viewportHeight * 0.45;
    }

    /*
     * The complete scroll range available for the dock.
     */
    const pageEndY =
      document.documentElement.scrollHeight - viewportHeight;

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
     * Divide the ENTIRE available scroll distance
     * into exactly 3 equal zones.
     *
     * Zone 0 → THIS IS US
     * Zone 1 → PITCHDECK
     * Zone 2 → OUR AWWWARDS TALK
     */
    const totalScrollDistance = pageEndY - startY;

    const zoneSize =
      totalScrollDistance / targets.length;

    const distanceFromStart =
      scrollY - startY;

    let activeIdx = Math.floor(
      distanceFromStart / zoneSize
    );

    /*
     * Keep the index safely inside 0–2.
     */
    activeIdx = Math.max(
      0,
      Math.min(activeIdx, targets.length - 1)
    );

    /*
     * Don't update React unnecessarily.
     */
    if (activeIdx === lastActiveIdx) return;

    lastActiveIdx = activeIdx;

    /*
     * Reveal the cards progressively.
     */
    setVisibleCount((prev) =>
      Math.max(prev, activeIdx + 1)
    );

    /*
     * Map (offset by PINNED_COUNT since the leading rows are
     * always-visible pinned items, not scroll-revealed ones):
     *
     * activeIdx 0 → items[3] → THIS IS US
     * activeIdx 1 → items[4] → PITCHDECK
     * activeIdx 2 → items[5] → OUR AWWWARDS TALK
     */
    setOpenId(
      items[activeIdx + PINNED_COUNT]?.id ?? null
    );
  };

  const initialise = () => {
    startY = null;
    lastActiveIdx = -1;
    updateFromScroll();
  };

  initialise();

  window.addEventListener(
    "scroll",
    updateFromScroll,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    initialise
  );

  return () => {
    window.removeEventListener(
      "scroll",
      updateFromScroll
    );

    window.removeEventListener(
      "resize",
      initialise
    );
  };
}, [sectionSelectors, items]);
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