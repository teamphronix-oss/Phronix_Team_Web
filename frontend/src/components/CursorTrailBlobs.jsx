import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   Phronix Fluid Stardust & Comet Ribbon Cursor Trail
   - Silky smooth dynamic comet ribbon with neon gradient
   - Luminous microscopic stardust particles with gentle physics
   - Click shockwave & spark bursts
   - Auto-sleep when idle for clean, distraction-free reading
   ───────────────────────────────────────────────────────────── */
export default function CursorTrailBlobs() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const ctx = canvas.getContext("2d");
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Trail points for the fluid ribbon (extended for a longer, smoother tail)
    const maxTrailPoints = 30;
    const trailPoints = [];

    // Particle pool for stardust sparks
    const particles = [];
    const maxParticles = 85;

    // Burst particles for clicks
    const burstParticles = [];

    let mouseX = -100;
    let mouseY = -100;
    let lastMouseX = -100;
    let lastMouseY = -100;
    let lastMoveTime = performance.now();
    let isMouseInWindow = false;
    let rafId;

    // Color palette for stardust & comet: Ice Blue -> Neon Teal -> Soft Indigo
    const PALETTE = [
      { r: 56, g: 189, b: 248 },  // Ice Blue
      { r: 45, g: 212, b: 191 },  // Neon Teal
      { r: 14, g: 165, b: 233 },  // Ocean Blue
      { r: 129, g: 140, b: 248 }, // Indigo Violet
    ];

    const addParticle = (x, y, speed, vx, vy) => {
      if (particles.length >= maxParticles) {
        particles.shift();
      }
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const angle = Math.random() * Math.PI * 2;
      const spreadSpeed = (Math.random() * 0.7 + 0.15) * (speed > 5 ? 1.4 : 0.7);

      particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: (vx * 0.12) + Math.cos(angle) * spreadSpeed,
        vy: (vy * 0.12) + Math.sin(angle) * spreadSpeed,
        size: Math.random() * 2.4 + 0.8,
        color,
        alpha: Math.random() * 0.4 + 0.6,
        life: 1.0,
        decay: Math.random() * 0.014 + 0.009, // Longer floating lifespan
      });
    };

    const addClickBurst = (x, y) => {
      const count = 18;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
        const velocity = Math.random() * 3.8 + 1.8;
        const color = PALETTE[i % PALETTE.length];
        burstParticles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * 3.0 + 1.2,
          color,
          alpha: 1.0,
          life: 1.0,
          decay: Math.random() * 0.018 + 0.012,
        });
      }
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (x <= 1 || y <= 1 || x >= window.innerWidth - 1 || y >= window.innerHeight - 1) {
        isMouseInWindow = false;
        trailPoints.length = 0;
        return;
      }

      isMouseInWindow = true;
      lastMoveTime = performance.now();

      const dx = x - (lastMouseX === -100 ? x : lastMouseX);
      const dy = y - (lastMouseY === -100 ? y : lastMouseY);
      const dist = Math.hypot(dx, dy);

      mouseX = x;
      mouseY = y;
      lastMouseX = x;
      lastMouseY = y;

      // Add to ribbon trail
      trailPoints.unshift({ x, y, time: performance.now() });
      if (trailPoints.length > maxTrailPoints) {
        trailPoints.pop();
      }

      // Spawn stardust particles along path
      if (dist > 3) {
        const spawnCount = Math.min(Math.floor(dist / 7) + 1, 4);
        for (let i = 0; i < spawnCount; i++) {
          const t = i / spawnCount;
          const px = x - dx * t;
          const py = y - dy * t;
          addParticle(px, py, dist, dx, dy);
        }
      }
    };

    const handleMouseDown = (e) => {
      addClickBurst(e.clientX, e.clientY);
    };

    const handleMouseLeave = () => {
      isMouseInWindow = false;
      trailPoints.length = 0;
    };

    const handleMouseOut = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        isMouseInWindow = false;
        trailPoints.length = 0;
      }
    };

    const handleMouseEnter = (e) => {
      if (e.clientX > 1 && e.clientY > 1 && e.clientX < window.innerWidth - 1 && e.clientY < window.innerHeight - 1) {
        isMouseInWindow = true;
        lastMoveTime = performance.now();
      }
    };

    const render = () => {
      const now = performance.now();
      const timeSinceMove = now - lastMoveTime;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // ── 1. DRAW FLUID COMET RIBBON ──
      // Remove old trail points (extended lifespan for longer ribbon)
      while (trailPoints.length > 0 && now - trailPoints[trailPoints.length - 1].time > 550) {
        trailPoints.pop();
      }

      if (trailPoints.length > 2 && isMouseInWindow) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 0; i < trailPoints.length - 1; i++) {
          const pt = trailPoints[i];
          const nextPt = trailPoints[i + 1];
          const progress = i / trailPoints.length; // 0 (newest) -> 1 (oldest)
          const alpha = (1 - progress) * 0.42 * Math.max(0, 1 - timeSinceMove / 450);

          if (alpha <= 0.01) continue;

          const xc = (pt.x + nextPt.x) / 2;
          const yc = (pt.y + nextPt.y) / 2;

          ctx.beginPath();
          ctx.moveTo(pt.x, pt.y);
          ctx.quadraticCurveTo(pt.x, pt.y, xc, yc);

          const lineWidth = Math.max(0.6, (1 - progress) * 5.5);
          ctx.lineWidth = lineWidth;

          // Gradient color transition from cyan to indigo
          const r = Math.round(56 + progress * (129 - 56));
          const g = Math.round(189 + progress * (140 - 189));
          const b = Math.round(248 + progress * (248 - 248));

          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          ctx.stroke();
        }
        ctx.restore();
      }

      // ── 2. DRAW STARDUST PARTICLES ──
      if (particles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95;
          p.vy *= 0.95;
          p.life -= p.decay;

          if (p.life <= 0) {
            particles.splice(i, 1);
            continue;
          }

          const currentAlpha = p.alpha * p.life;
          const currentSize = p.size * (0.3 + 0.7 * p.life);

          // Glow halo
          ctx.beginPath();
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.28})`;
          ctx.arc(p.x, p.y, currentSize * 2.4, 0, Math.PI * 2);
          ctx.fill();

          // Sparkle core
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * 0.85})`;
          ctx.arc(p.x, p.y, currentSize * 0.65, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // ── 3. DRAW CLICK BURST PARTICLES ──
      if (burstParticles.length > 0) {
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        for (let i = burstParticles.length - 1; i >= 0; i--) {
          const bp = burstParticles[i];
          bp.x += bp.vx;
          bp.y += bp.vy;
          bp.vx *= 0.92;
          bp.vy *= 0.92;
          bp.life -= bp.decay;

          if (bp.life <= 0) {
            burstParticles.splice(i, 1);
            continue;
          }

          const currentAlpha = bp.alpha * bp.life;
          const currentSize = bp.size * bp.life;

          ctx.beginPath();
          ctx.fillStyle = `rgba(${bp.color.r}, ${bp.color.g}, ${bp.color.b}, ${currentAlpha * 0.5})`;
          ctx.arc(bp.x, bp.y, currentSize * 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
          ctx.arc(bp.x, bp.y, currentSize * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      rafId = requestAnimationFrame(render);
    };

    const handleBlur = () => {
      isMouseInWindow = false;
      trailPoints.length = 0;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isMouseInWindow = false;
        trailPoints.length = 0;
      }
    };

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("pointerdown", handleMouseDown, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });
    window.addEventListener("pointerout", handleMouseOut, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handleMouseDown);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("pointerout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="cursor-trail-blobs"
      aria-hidden="true"
    />
  );
}