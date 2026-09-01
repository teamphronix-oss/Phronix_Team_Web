import { Play } from "lucide-react";

export default function YouTubeCard({ video }) {
  return (
    <div className="card youtube-card">
      <div className="youtube-card__frame">
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className="youtube-card__thumb"
          aria-label={`Watch ${video.title} on YouTube`}
        >
          <img
            src={video.thumbnail_url || "/assets/placeholder-youtube.svg"}
            alt={video.title}
            loading="lazy"
          />

          <span className="youtube-card__play">
            <Play size={22} fill="currentColor" />
          </span>
        </a>
      </div>

      <h3>{video.title}</h3>

      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn--outline btn--sm"
      >
        Watch on YouTube
      </a>
    </div>
  );
}