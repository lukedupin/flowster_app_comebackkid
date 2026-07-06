import { useState } from 'react';

/**
 * Lightweight YouTube embed: shows the video thumbnail with a neon play
 * button, and only loads the real iframe (autoplaying) once clicked.
 */
export default function YouTubeEmbed({
  videoId,
  title = 'Story video',
  start,
  end,
  onPlay,
  bounce = false,
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    const params = new URLSearchParams({ autoplay: '1' });
    if (start != null) params.set('start', String(start));
    if (end != null) params.set('end', String(end));

    return (
      <div className="aspect-video w-full overflow-hidden rounded-md border border-horizon">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setPlaying(true);
        onPlay?.();
      }}
      aria-label={`Play video: ${title}`}
      className={`group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-md border border-horizon bg-dusk transition-colors hover:border-neon-pink ${
        bounce ? 'animate-bounce' : ''
      }`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
      />
      <span className="absolute inset-0 grid place-items-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-midnight/70 shadow-[0_0_22px_rgba(255,45,120,0.55)] backdrop-blur-sm transition-transform group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-neon-pink" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
