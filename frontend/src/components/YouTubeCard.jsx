import { useState } from "react";
import { Play } from "lucide-react";

function getEmbedUrl(url) {
  try {
    const u = new URL(url);
    const id = u.searchParams.get("v") || u.pathname.split("/").pop();
    return `https://www.youtube.com/embed/${id}?autoplay=1`;
  } catch {
    return url;
  }
}

export default function YouTubeCard({ video }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="card youtube-card">
      <div className="youtube-card__frame">
        {playing ? (
          <iframe
            src={getEmbedUrl(video.url)}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            className="youtube-card__thumb"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
          >
            <img src={video.thumbnail} alt="" loading="lazy" />
            <span className="youtube-card__play"><Play size={22} fill="currentColor" /></span>
          </button>
        )}
      </div>
      <h3>{video.title}</h3>
      <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
        Watch on YouTube
      </a>
    </div>
  );
}
