import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getStory } from '../data/stories.js';
import { useExtraVideos, parseYouTubeId } from '../hooks/useStoryData.js';
import YouTubeEmbed from '../components/YouTubeEmbed.jsx';
import ReactionRow from '../components/ReactionRow.jsx';
import { Eyebrow } from '../components/Section.jsx';

export default function StoryDetail() {
  const { id } = useParams();
  const story = getStory(id);
  const { videos, addVideo } = useExtraVideos(id);
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  if (!story) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-12">
        <h1 className="font-display text-2xl font-semibold tracking-[0.14em]">
          STORY NOT FOUND
        </h1>
        <p className="mt-4 text-fog">
          This one hasn't been told yet. Maybe it's yours.
        </p>
        <Link
          to="/stories"
          className="mt-8 inline-block font-mono text-[0.82rem] tracking-[0.16em] text-neon-pink no-underline hover:text-neon-cyan"
        >
          ← BACK TO STORIES
        </Link>
      </section>
    );
  }

  const handleAddVideo = (e) => {
    e.preventDefault();
    const videoId = parseYouTubeId(url);
    if (!videoId) {
      setError('Paste a YouTube link (or an 11-character video ID) to add it.');
      return;
    }
    addVideo(videoId);
    setUrl('');
    setError('');
  };

  const allVideos = [...story.extraVideos, ...videos];

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-12 md:py-24">
      <Link
        to="/stories"
        className="font-mono text-[0.78rem] tracking-[0.18em] text-fog no-underline hover:text-neon-cyan"
      >
        ← ALL STORIES
      </Link>

      <div className="mt-8">
        <Eyebrow>A COMEBACK STORY</Eyebrow>
        <h1 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-semibold tracking-[0.14em]">
          {story.title}
        </h1>
        <p className="mt-3 text-fog">{story.description}</p>
      </div>

      <div className="mt-8">
        <YouTubeEmbed videoId={story.youtubeId} title={story.title} />
      </div>

      <div className="mt-6">
        <ReactionRow story={story} />
      </div>

      {/* Full transcription */}
      <div className="mt-12 border-t border-horizon pt-10">
        <h2 className="mb-6 font-mono text-xs tracking-[0.32em] text-neon-cyan">
          FULL TRANSCRIPTION
        </h2>
        <div className="grid gap-5">
          {story.transcript.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-moon/90">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Extra videos */}
      {allVideos.length > 0 && (
      <div className="mt-12 border-t border-horizon pt-10">
        <h2 className="mb-2 font-mono text-xs tracking-[0.32em] text-neon-cyan">
          OTHER VIDEOS
        </h2>
        <p className="mb-6 text-[0.95rem] text-fog">
          These videos were added by the storyteller.
        </p>

        {allVideos.length > 0 && (
          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            {allVideos.map((videoId, i) => (
              <YouTubeEmbed key={`${videoId}-${i}`} videoId={videoId} title="Added video" />
            ))}
          </div>
        )}
      </div>
      )}
    </section>
  );
}
