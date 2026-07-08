import { useState } from 'react';
import { parseYouTubeId } from '../hooks/useStoryData.js';

const LENSES = [
  'Siddhartha Gautama',
  'Marcus Aurelius',
  'Jesus Christ',
  'Friedrich Nietzsche',
  'Confucius',
  'Lao Tzu',
  'Nelson Mandela',
  'Plato / Aristotle / Socrates',
];

const VOICES = [
  { id: 'warm', name: 'Warm & Grounded (male)' },
  { id: 'bright', name: 'Bright & Energetic (female)' },
  { id: 'deep', name: 'Deep & Cinematic (male)' },
  { id: 'soft', name: 'Soft & Reflective (female)' },
];

const MAX_VIDEOS = 5;

export default function FinalTouch({ onComplete }) {
  const [gratitude, setGratitude] = useState('');
  const [lens, setLens] = useState(null);
  const [voice, setVoice] = useState(null);
  const [videoInput, setVideoInput] = useState('');
  const [videos, setVideos] = useState([]);
  const [videoError, setVideoError] = useState('');

  const addVideo = () => {
    const id = parseYouTubeId(videoInput);
    if (!id) {
      setVideoError('Enter a valid YouTube link.');
      return;
    }
    if (videos.includes(id)) {
      setVideoError('That video is already added.');
      return;
    }
    setVideos((prev) => [...prev, id]);
    setVideoInput('');
    setVideoError('');
  };

  const removeVideo = (id) => {
    setVideos((prev) => prev.filter((v) => v !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!voice) return;
    onComplete?.({ gratitude, lens, voice, videos });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-10">
      <section>
        <h2 className="mb-2 font-display text-lg font-semibold tracking-[0.14em] text-moon">
          SHARE A MESSAGE OF<span className="text-neon-pink"> GRATITUDE</span> WITH THE<span className="text-neon-cyan"> MIDNIGHT</span>
        </h2>
        <p className="mb-4 text-fog">
          Please take a moment to thank<span className="text-neon-pink"> Tim McEwan</span> and<span className="text-neon-cyan"> Tyler Lyle</span>.
        </p>
        <textarea
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          rows={4}
          placeholder="Thank you for..."
          className="w-full resize-y rounded-md border border-horizon bg-dusk p-4 leading-relaxed text-moon placeholder:text-fog/50 focus:border-neon-pink focus:outline-none"
        />
      </section>

      <section>
        <h2 className="mb-2 font-display text-lg font-semibold tracking-[0.14em] text-moon">
          SELECT A<span className="text-neon-cyan"> LENS</span>
        </h2>
        <p className="mb-4 text-fog">Select a lens to tell your story through (optional).</p>
        <div className="flex flex-wrap gap-3">
          {LENSES.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setLens((prev) => (prev === option ? null : option))}
              className={`cursor-pointer rounded-[3px] border px-4 py-2 font-mono text-[0.78rem] tracking-[0.14em] transition-colors ${
                lens === option
                  ? 'border-neon-cyan bg-neon-cyan text-midnight'
                  : 'border-horizon text-fog hover:border-neon-cyan hover:text-neon-cyan'
              }`}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-display text-lg font-semibold tracking-[0.14em] text-moon">
          SELECT A<span className="text-neon-pink"> VOICE</span>
        </h2>
        <p className="mb-4 text-fog">Select a voice for your story teller.</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {VOICES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setVoice(option.id)}
              className={`cursor-pointer rounded-md border px-4 py-3 text-left font-mono text-[0.78rem] tracking-[0.1em] transition-colors ${
                voice === option.id
                  ? 'border-neon-pink bg-neon-pink/10 text-neon-pink'
                  : 'border-horizon text-fog hover:border-neon-pink hover:text-neon-pink'
              }`}
            >
              {option.name.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-display text-lg font-semibold tracking-[0.14em] text-moon">
          <span className="text-neon-pink">EMBED</span> YOUTUBE <span className="text-neon-cyan">VIDEOS</span>
        </h2>
        <p className="mb-4 text-fog">
          Pick any number of YouTube videos that will be embedded into your story.
        </p>

        <div className="flex gap-3">
          <input
            type="text"
            value={videoInput}
            onChange={(e) => {
              setVideoInput(e.target.value);
              setVideoError('');
            }}
            placeholder="Paste a YouTube link..."
            disabled={videos.length >= MAX_VIDEOS}
            className="flex-1 rounded-md border border-horizon bg-dusk px-4 py-3 text-moon placeholder:text-fog/50 focus:border-neon-pink focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button
            type="button"
            onClick={addVideo}
            disabled={videos.length >= MAX_VIDEOS}
            className="cursor-pointer rounded-[3px] border border-neon-cyan px-5 font-mono text-[0.78rem] tracking-[0.14em] text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-midnight disabled:cursor-not-allowed disabled:opacity-40"
          >
            ADD
          </button>
        </div>

        {videoError && <p className="mt-2 font-mono text-[0.72rem] text-neon-red">{videoError}</p>}
        {videos.length >= MAX_VIDEOS && (
          <p className="mt-2 font-mono text-[0.72rem] text-fog/60">MAX OF {MAX_VIDEOS} REACHED</p>
        )}

        {videos.length > 0 && (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {videos.map((id) => (
              <li
                key={id}
                className="flex items-center justify-between gap-3 rounded-md border border-horizon bg-dusk px-4 py-3"
              >
                <span className="truncate font-mono text-[0.78rem] text-fog">{id}</span>
                <button
                  type="button"
                  onClick={() => removeVideo(id)}
                  aria-label={`Remove video ${id}`}
                  className="cursor-pointer font-mono text-[0.72rem] tracking-[0.1em] text-neon-red hover:underline"
                >
                  REMOVE
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        type="submit"
        disabled={!voice}
        className="cursor-pointer rounded-[3px] bg-neon-pink px-8 py-3.5 font-mono text-[0.82rem] tracking-[0.16em] text-midnight shadow-[0_0_22px_rgba(255,45,120,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,45,120,0.8)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        FINISH
      </button>
    </form>
  );
}
