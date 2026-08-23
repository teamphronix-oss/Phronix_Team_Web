import { useEffect, useRef, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function TeamCarousel() {
  const [team, setTeam] = useState([]);

  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    async function loadTeam() {
      try {
        const response = await fetch(`${API}/team`);

        if (!response.ok) {
          throw new Error("Failed to load team");
        }

        const data = await response.json();
        setTeam(data.team || []);
      } catch (error) {
        console.error("Team API error:", error);
      }
    }

    loadTeam();
  }, []);

  useEffect(() => {
    if (team.length === 0) return;

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const singleSetWidth = track.scrollWidth / 3;
    const speed = 0.55;
    let prevActive = null;

    const step = () => {
      if (!pausedRef.current) {
        posRef.current -= speed;

        if (Math.abs(posRef.current) >= singleSetWidth) {
          posRef.current += singleSetWidth;
        }

        track.style.transform = `translateX(${posRef.current}px)`;
      }

      const containerRect = container.getBoundingClientRect();
      const containerCenter =
        containerRect.left + containerRect.width / 2;

      let closestIndex = null;
      let closestDist = Infinity;

      const cards = track.children;

      for (let i = 0; i < cards.length; i++) {
        const rect = cards[i].getBoundingClientRect();
        const dist = Math.abs(
          rect.left + rect.width / 2 - containerCenter
        );

        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      }

      if (closestIndex !== prevActive) {
        if (prevActive !== null && cards[prevActive]) {
          cards[prevActive].classList.remove(
            "team-carousel__card--active"
          );
        }

        if (cards[closestIndex]) {
          cards[closestIndex].classList.add(
            "team-carousel__card--active"
          );
        }

        prevActive = closestIndex;
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
  }, [team]);

  if (team.length === 0) {
    return null;
  }

  const LOOP_TEAM = [...team, ...team, ...team];

  return (
    <div
      className="team-carousel"
      ref={containerRef}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="team-carousel__track" ref={trackRef}>
        {LOOP_TEAM.map((member, i) => (
          <div
            className="team-carousel__card"
            key={`${member.id}-${i}`}
          >
            <img
              src={member.image}
              alt={member.name}
              className="team-carousel__img"
              loading="lazy"
            />

            <div className="team-carousel__overlay">
              <strong>{member.name}</strong>
              <span>{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}