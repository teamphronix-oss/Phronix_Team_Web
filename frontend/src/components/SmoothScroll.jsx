import { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll
 * ------------
 * Wraps the app in a Lenis instance for buttery, eased scrolling instead
 * of the browser's default instant/step scroll. Runs a single rAF loop
 * for the whole app (mount this once, high up in the tree — see App.jsx).
 *
 * - Respects prefers-reduced-motion: Lenis is never created for users who
 *   have that OS setting on, so scrolling stays native/instant for them.
 * - Exposes the live Lenis instance via useLenis() so other components
 *   (ScrollToTop on route change, ScrollToTopButton's click handler, any
 *   future anchor-link nav) can drive the same smoothed scroll instead of
 *   calling window.scrollTo directly and fighting Lenis's own rAF loop.
 * - Lenis's default mode scrolls the real window (it just eases the
 *   values), so fixed-position UI (Navbar, CustomCursor, FloatingDock,
 *   ScrollToTopButton, WhatsAppButton) keeps working unchanged.
 */

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      // Keep native touch scrolling on mobile devices — Lenis smooths
      // wheel/drag input on desktop, touch stays direct + responsive.
      syncTouch: false,
    });

    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}