import { useState, useEffect, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import logoVideo from "../assets/Video/give_me_just_my_logo_in_white.mp4";

/* Default (Home page) content — kept as default props so
   `<FloatingDock />` with no props behaves exactly as before. */
const DEFAULT_ITEMS = [
  { id: "touch", label: "GET IN TOUCH", hasVideo: true, videoSrc: logoVideo, avatar: true },
  { id: "us", label: "THIS IS US", hasVideo: true, videoSrc: logoVideo },
  { id: "pitch", label: "PITCHDECK", hasVideo: true, videoSrc: logoVideo },
  { id: "awwwards", label: "OUR AWWWARDS TALK", hasVideo: true, videoSrc: logoVideo },
];

/* Which sections on the host page trigger each row (index 0 in this
   list -> items[1], index 1 -> items[2], etc. — item[0] is always
   visible/open-able and isn't tied to a section). */
const DEFAULT_SECTION_SELECTORS = [".about__grid", ".section--space", ".projects-showcase"];

/* How long (ms) to wait after scrolling out of a section's active
   zone before auto-closing its video — avoids the panel/video
   snapping shut the instant the user scrolls a little too far. */
const CLOSE_DELAY = 3000;

export default function FloatingDock({
  items = DEFAULT_ITEMS,
  sectionSelectors = DEFAULT_SECTION_SELECTORS,
}) {
  const [openId, setOpenId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const closeTimerRef = useRef(null);

  useEffect(() => {
    const targets = sectionSelectors
      .map((sel) => document.querySelector(sel))
      .filter(Boolean);

    if (targets.length === 0) return;

    // Tracks which section is currently "active" (near the vertical
    // centre of the screen). -1 means none — i.e. user is back up
    // near the always-visible first row.
    let activeIdx = -1;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = targets.indexOf(entry.target);
          if (idx === -1) return;

          if (entry.isIntersecting) {
            // Re-entered (or a new section became active) — cancel
            // any pending close from before, it's no longer needed.
            if (closeTimerRef.current) {
              clearTimeout(closeTimerRef.current);
              closeTimerRef.current = null;
            }

            // Reveal stays sticky (never un-reveals).
            setVisibleCount((prev) => Math.max(prev, idx + 1));

            // Auto-open + auto-play this row's video.
            activeIdx = idx;
            setOpenId(items[idx + 1]?.id ?? null);
          } else if (activeIdx === idx) {
            // Left this section — don't close immediately. Wait a
            // bit in case the user scrolls back in or it was just a
            // brief overshoot; pauses its video via DockItem's
            // effect below once it actually closes.
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
            closeTimerRef.current = setTimeout(() => {
              activeIdx = -1;
              setOpenId(null);
              closeTimerRef.current = null;
            }, CLOSE_DELAY);
          }
        });
      },
      {
        // Thin trigger band around the vertical centre of the screen.
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => {
      observer.disconnect();
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionSelectors, items]);

  const isPinned = visibleCount > 0;

  return (
    <div className={`floating-dock${isPinned ? " floating-dock--pinned" : ""}`}>
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        const isVisible = index === 0 ? true : index - 1 < visibleCount;
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
    </div>
  );
}

function DockItem({ item, index, isOpen, isVisible, onToggle }) {
  const videoRef = useRef(null);

  // Plays/pauses whenever `isOpen` changes — whether from a manual
  // click OR the scroll-driven auto-open above. Video is `muted`, so
  // browsers (incl. mobile Safari) allow programmatic play() here
  // without a direct click gesture on this element.
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
      }`}
      style={{
        transitionDelay: isVisible ? `${Math.max(0, index - 1) * 90}ms` : "0ms",
      }}
    >
      <button
        className="floating-dock__row"
        onClick={onToggle}
        aria-expanded={isOpen}
        tabIndex={isVisible ? 0 : -1}
      >
        <span className="floating-dock__row-label">
          {item.avatar && (
            <span className="floating-dock__avatar" aria-hidden="true" />
          )}
          <span>{item.label}</span>
        </span>
        {isOpen ? <Minus size={14} /> : <Plus size={14} />}
      </button>

      {item.hasVideo && (
        <div
          className={`floating-dock__panel${
            isOpen ? "" : " floating-dock__panel--hidden"
          }`}
        >
          <div className="floating-dock__video">
            <video ref={videoRef} muted loop playsInline controls>
              <source src={item.videoSrc} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
}