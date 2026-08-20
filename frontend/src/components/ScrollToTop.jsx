import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls the window to the top every time the route (pathname) changes.
 * Without this, React Router keeps the browser's current scroll position
 * when navigating between pages, so clicking a navbar link while deep-scrolled
 * on another page would land you on a new page but still scrolled down.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}