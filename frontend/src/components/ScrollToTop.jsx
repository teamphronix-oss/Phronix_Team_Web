import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "./SmoothScroll";

/**
 * Scrolls the window to the top every time the route (pathname) changes.
 * Without this, React Router keeps the browser's current scroll position
 * when navigating between pages, so clicking a navbar link while deep-scrolled
 * on another page would land you on a new page but still scrolled down.
 *
 * When Lenis is active, we reset through lenis.scrollTo() instead of
 * window.scrollTo() — Lenis tracks its own internal scroll state, so
 * bypassing it would leave it out of sync with the real scroll position
 * and cause a jump/stutter on the next wheel input. `immediate: true`
 * means this reset itself is instant (no eased animation on page change),
 * matching the previous behavior; only in-page scrolling gets the smooth feel.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    const lenis = lenisRef?.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, lenisRef]);

  return null;
}