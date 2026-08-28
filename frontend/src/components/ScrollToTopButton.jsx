import { useEffect, useState, useRef } from "react";
import { ArrowUp } from "lucide-react";
import { useLenis } from "./SmoothScroll";

const RADIUS = 24;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~150.796

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef(null);
  const isVisibleRef = useRef(false);
  const lenisRef = useLenis();

  useEffect(() => {
    let rafId = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      const offset = CIRCUMFERENCE - progress * CIRCUMFERENCE;

      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = `${offset}px`;
      }

      const shouldShow = scrollTop > 220;
      if (shouldShow !== isVisibleRef.current) {
        isVisibleRef.current = shouldShow;
        setIsVisible(shouldShow);
      }
    };

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    const lenis = lenisRef?.current;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      type="button"
      className={`scroll-top-btn ${isVisible ? "is-visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      data-cursor-label="Top"
    >
      <svg
        className="scroll-top-btn__progress"
        viewBox="0 0 54 54"
        aria-hidden="true"
      >
        <circle
          className="scroll-top-btn__progress-bg"
          cx="27"
          cy="27"
          r={RADIUS}
        />
        <circle
          ref={circleRef}
          className="scroll-top-btn__progress-bar"
          cx="27"
          cy="27"
          r={RADIUS}
          style={{
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: CIRCUMFERENCE,
          }}
        />
      </svg>
      <span className="scroll-top-btn__icon">
        <ArrowUp size={20} strokeWidth={2.4} />
      </span>
      <span className="scroll-top-btn__tooltip">Scroll to Top</span>
    </button>
  );
}