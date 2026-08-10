import { useEffect, useRef, useState } from "react";

/* Custom cursor: a small solid dot that tracks the mouse exactly, plus
   a larger soft ring that trails behind with slight lag (spring-like
   easing) for that "liquid follow" feel seen on sites like lamalama.com.
   The ring grows and the dot fades when hovering any clickable element
   (a, button, [role="button"], or anything with data-cursor="hover").

   NEW: a floating label/tag (small dark pill with text) that follows
   the cursor and shows whatever text is set via data-cursor-label="..."
   on the hovered element — this is the "# Chocolate Amsterdam" style
   tag seen following the mouse on lamalama.com when hovering a logo. */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [labelText, setLabelText] = useState(null);

  useEffect(() => {
    // Skip entirely on touch devices — custom cursors don't make sense
    // there and we don't want to hide the real (only) pointer.
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let labelX = 0;
    let labelY = 0;
    let rafId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      // Simple lerp for a soft trailing/spring feel behind the dot.
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      }
      // Label trails a bit slower/looser than the ring so it feels
      // like it's being "dragged" behind the cursor.
      labelX += (mouseX - labelX) * 0.14;
      labelY += (mouseY - labelY) * 0.14;
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${labelX}px, ${labelY}px) translate(-50%, -140%)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    const handleOver = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], [data-cursor="hover"]'
      );
      setIsHovering(Boolean(target));

      // Walk up to find the nearest element carrying a label — lets
      // you tag a whole card/logo block once instead of every child.
      const labelTarget = e.target.closest("[data-cursor-label]");
      setLabelText(labelTarget ? labelTarget.getAttribute("data-cursor-label") : null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor__dot${
          isHovering ? " custom-cursor__dot--hover" : ""
        }${isVisible ? "" : " custom-cursor--hidden"}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`custom-cursor__ring${
          isHovering ? " custom-cursor__ring--hover" : ""
        }${isVisible ? "" : " custom-cursor--hidden"}`}
        aria-hidden="true"
      />
      <div
        ref={labelRef}
        className={`custom-cursor__label${
          labelText && isVisible ? " custom-cursor__label--visible" : ""
        }`}
        aria-hidden="true"
      >
        {labelText}
      </div>
    </>
  );
}