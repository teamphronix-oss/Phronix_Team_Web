import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Phronix Next-Gen Interactive Custom Cursor
   - Velocity-aware aerodynamic aura morphing
   - Luminous high-contrast pinpoint core with ambient pulse
   - Magnetic hover expansion on cards, buttons & interactive elements
   - Click impulse shockwaves
   - Zero re-render architecture running at 60/120fps
   ───────────────────────────────────────────────────────────── */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const ringInnerRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let labelX = -100;
    let labelY = -100;

    let prevMouseX = -100;
    let prevMouseY = -100;
    let angle = 0;
    let stretch = 1;

    let isInitialized = false;
    let isVisible = false;
    let isMouseDown = false;
    let isHovering = false;
    let rafId;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    const setVisibleState = (visible) => {
      isVisible = visible;
      if (dot) {
        dot.style.opacity = visible ? "1" : "0";
        dot.style.visibility = visible ? "visible" : "hidden";
        if (visible) dot.classList.remove("custom-cursor--hidden");
        else dot.classList.add("custom-cursor--hidden");
      }
      if (ring) {
        ring.style.opacity = visible ? "1" : "0";
        ring.style.visibility = visible ? "visible" : "hidden";
        if (visible) ring.classList.remove("custom-cursor--hidden");
        else ring.classList.add("custom-cursor--hidden");
      }
      if (label && !visible) {
        label.classList.remove("custom-cursor__label--visible");
      }
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // Hide instantly if pointer is at/outside window boundaries
      if (x <= 1 || y <= 1 || x >= window.innerWidth - 1 || y >= window.innerHeight - 1) {
        setVisibleState(false);
        return;
      }

      mouseX = x;
      mouseY = y;

      if (!isInitialized) {
        ringX = mouseX;
        ringY = mouseY;
        labelX = mouseX;
        labelY = mouseY;
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        isInitialized = true;
      }

      if (!isVisible) {
        setVisibleState(true);
      }

      if (dot) {
        const dotScale = isMouseDown ? 0.7 : (isHovering ? 1.3 : 1);
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }
    };

    const animate = () => {
      if (isInitialized && isVisible) {
        // Dot transform
        if (dot) {
          const dotScale = isMouseDown ? 0.7 : (isHovering ? 1.3 : 1);
          dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
        }

        // Direct, responsive concentric tracking for the ring
        const lerpFactor = isHovering ? 0.45 : 0.38;
        ringX += (mouseX - ringX) * lerpFactor;
        ringY += (mouseY - ringY) * lerpFactor;

        // Strict geometric clamp: Dot stays tightly concentric inside the outer ring (max 4.5px displacement)
        const maxOffset = isHovering ? 7 : 4.5;
        const dx = ringX - mouseX;
        const dy = ringY - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist > maxOffset && dist > 0) {
          const ratio = maxOffset / dist;
          ringX = mouseX + dx * ratio;
          ringY = mouseY + dy * ratio;
        }

        // Calculate velocity and motion angle for dynamic stretch
        const vx = mouseX - prevMouseX;
        const vy = mouseY - prevMouseY;
        const speed = Math.hypot(vx, vy);

        if (speed > 1.5) {
          angle = Math.atan2(vy, vx);
          const targetStretch = Math.min(1 + speed * 0.015, 1.35);
          stretch += (targetStretch - stretch) * 0.3;
        } else {
          stretch += (1 - stretch) * 0.2;
        }

        prevMouseX = mouseX;
        prevMouseY = mouseY;

        if (ring) {
          const deg = (angle * 180) / Math.PI;
          const scaleY = isMouseDown ? 0.82 : 1 / Math.sqrt(stretch);
          const scaleX = isMouseDown ? 0.82 : stretch;

          if (isHovering) {
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${isMouseDown ? 0.85 : 1})`;
          } else {
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${deg}deg) scale(${scaleX}, ${scaleY})`;
          }
        }

        // Smooth lerp for label
        labelX += (mouseX - labelX) * 0.18;
        labelY += (mouseY - labelY) * 0.18;
        if (label) {
          label.style.transform = `translate3d(${labelX}px, ${labelY}px, 0) translate(-50%, -150%)`;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e) => {
      if (e.clientX > 1 && e.clientY > 1 && e.clientX < window.innerWidth - 1 && e.clientY < window.innerHeight - 1) {
        if (!isVisible) setVisibleState(true);
      }

      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const clickable = target.closest(
        'a, button, [role="button"], [data-cursor="hover"], .btn, .intake-pill, .intake-card-pill, .cal-day-btn, .cal-slot-btn, .browser-card, .tf-card, .pay-update__btn'
      );

      isHovering = Boolean(clickable);

      if (isHovering) {
        dot?.classList.add("custom-cursor__dot--hover");
        ring?.classList.add("custom-cursor__ring--hover");
      } else {
        dot?.classList.remove("custom-cursor__dot--hover");
        ring?.classList.remove("custom-cursor__ring--hover");
      }

      const labelTarget = target.closest("[data-cursor-label]");
      if (labelTarget && label) {
        const text = labelTarget.getAttribute("data-cursor-label");
        if (text) {
          label.textContent = text;
          label.classList.add("custom-cursor__label--visible");
        } else {
          label.classList.remove("custom-cursor__label--visible");
        }
      } else if (label) {
        label.classList.remove("custom-cursor__label--visible");
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;
      dot?.classList.add("custom-cursor__dot--active");
      ring?.classList.add("custom-cursor__ring--active");
    };

    const handleMouseUp = () => {
      isMouseDown = false;
      dot?.classList.remove("custom-cursor__dot--active");
      ring?.classList.remove("custom-cursor__ring--active");
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        setVisibleState(false);
      }
    };

    const handlePointerOut = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        setVisibleState(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setVisibleState(false);
    };

    const handleMouseEnterWindow = (e) => {
      if (e.clientX > 1 && e.clientY > 1 && e.clientX < window.innerWidth - 1 && e.clientY < window.innerHeight - 1) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        setVisibleState(true);
      }
    };

    const handleBlur = () => {
      setVisibleState(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVisibleState(false);
      }
    };

    // Use pointer events (fired by macOS/browsers even when window is not focused)
    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerover", handleMouseOver, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("pointerdown", handleMouseDown, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("pointerup", handleMouseUp, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.documentElement.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerover", handleMouseOver);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("pointerdown", handleMouseDown);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("pointerup", handleMouseUp);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("pointerout", handlePointerOut);

      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="custom-cursor__dot custom-cursor--hidden"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="custom-cursor__ring custom-cursor--hidden"
        aria-hidden="true"
      >
        <div ref={ringInnerRef} className="custom-cursor__ring-core" />
      </div>
      <div
        ref={labelRef}
        className="custom-cursor__label"
        aria-hidden="true"
      />
    </>
  );
}