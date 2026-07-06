import { useEffect, useRef, useState } from 'react';
import { storyPhases } from '../data/storyPhases.js';
import EmphasisText from './EmphasisText.jsx';
import YouTubeEmbed from './YouTubeEmbed.jsx';

const VIDEO_ID = 'fEwy-2ohf_4'; // https://www.youtube.com/watch?v=fEwy-2ohf_4

const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

const phaseHasVideo = (phase) => phase.start != null || phase.end != null;

export default function StoryComposer({ onSubmit, onStartedChange, storyParts, onPhaseChange }) {
  const [started, setStarted] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [text, setText] = useState(storyParts[0] ?? '');
  const [listening, setListening] = useState(false);
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [errorPulseKey, setErrorPulseKey] = useState(0);
  const [videoPlayed, setVideoPlayed] = useState(!phaseHasVideo(storyPhases[0]));
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    onStartedChange?.(started);
  }, [started, onStartedChange]);

  // Wire up speech recognition once (if the browser supports it).
  useEffect(() => {
    if (!SpeechRecognition) return;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const chunk = Array.from(event.results)
        .slice(event.resultIndex)
        .map((result) => result[0].transcript)
        .join(' ')
        .trim();
      if (chunk) {
        setText((prev) => (prev ? `${prev.trim()} ${chunk}` : chunk));
      }
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, [setText]);

  const toggleMic = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  };

  const handleStart = () => {
    setStarted(true);
    // Focus the textarea once it renders.
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const isLastPhase = phaseIndex === storyPhases.length - 1;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setShowEmptyError(true);
      setErrorPulseKey((k) => k + 1);
      return;
    }
    setShowEmptyError(false);
    onPhaseChange?.(phaseIndex, text);
    if (isLastPhase) {
      recognitionRef.current?.stop();
      onSubmit?.();
    } else {
      const nextIndex = phaseIndex + 1;
      setPhaseIndex(nextIndex);
      setText(storyParts[nextIndex] ?? '');
      setVideoPlayed(!phaseHasVideo(storyPhases[nextIndex]));
      requestAnimationFrame(() => textareaRef.current?.focus());
    }
  };

  const goBack = () => {
    setShowEmptyError(false);
    const prevIndex = Math.max(0, phaseIndex - 1);
    setPhaseIndex(prevIndex);
    setText(storyParts[prevIndex] ?? '');
    setVideoPlayed(!phaseHasVideo(storyPhases[prevIndex]));
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  if (!started) {
    return (
      <button
        type="button"
        onClick={handleStart}
        className="mt-10 cursor-pointer rounded-[3px] bg-neon-pink px-8 py-4 font-mono text-[0.9rem] tracking-[0.16em] text-midnight shadow-[0_0_22px_rgba(255,45,120,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,45,120,0.8)]"
      >
        LET'S GET STARTED
      </button>
    );
  }

  const phase = storyPhases[phaseIndex];

  return (
    <div className="mt-10">
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <p className="mb-2 font-mono text-[0.72rem] tracking-[0.2em] text-fog/60">
            PHASE {phaseIndex + 1} OF {storyPhases.length}
          </p>
          <h2 className="font-display text-xl font-semibold tracking-[0.12em] text-moon">
            {phase.title.toUpperCase()}
          </h2>
          {phase.lyrics && (
            <p className="mt-2 max-w-sm font-mono text-[0.78rem] italic leading-relaxed text-fog/50">
              “{phase.lyrics}”
            </p>
          )}
        </div>

        {phaseHasVideo(phase) && (
          <div className="w-28 shrink-0 sm:w-36">
            <YouTubeEmbed
              key={phaseIndex}
              videoId={VIDEO_ID}
              title={phase.title}
              start={phase.start}
              end={phase.end}
              onPlay={() => setVideoPlayed(true)}
              bounce
            />
          </div>
        )}
      </div>

      <p className="mb-6 text-fog">
        <EmphasisText text={phase.description} />
      </p>

      <form onSubmit={handleFormSubmit}>
        <div className="relative">
          <label htmlFor="story" className="sr-only">
            Your story
          </label>
          <textarea
            id="story"
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (e.target.value.trim()) setShowEmptyError(false);
            }}
            disabled={!videoPlayed}
            rows={12}
            placeholder={
              videoPlayed
                ? phase.placeholder
                : 'Press play on the video to unlock this phase...'
            }
            className="w-full resize-y rounded-md border border-horizon bg-dusk p-5 pr-16 leading-relaxed text-moon placeholder:text-fog/50 focus:border-neon-pink focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />

          {showEmptyError && (
            <span
              key={errorPulseKey}
              aria-hidden="true"
              className="animate-pulse-pink pointer-events-none absolute inset-0 rounded-md"
            />
          )}

          {/* Mic button */}
          <button
            type="button"
            onClick={toggleMic}
            disabled={!SpeechRecognition || !videoPlayed}
            aria-pressed={listening}
            aria-label={listening ? 'Stop dictating' : 'Dictate your story'}
            title={
              SpeechRecognition
                ? listening
                  ? 'Stop dictating'
                  : 'Dictate your story'
                : 'Voice input is not supported in this browser'
            }
            className={`absolute right-4 top-4 grid h-11 w-11 cursor-pointer place-items-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-40 ${
              listening
                ? 'animate-pulse border-neon-red bg-neon-red/20 text-neon-red shadow-[0_0_18px_rgba(255,77,94,0.6)]'
                : 'border-horizon bg-midnight text-fog hover:border-neon-cyan hover:text-neon-cyan'
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z" />
            </svg>
          </button>
        </div>

        {listening && (
          <p className="mt-3 font-mono text-[0.78rem] tracking-[0.12em] text-neon-red">
            ● LISTENING — SPEAK YOUR STORY
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {phaseIndex > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="cursor-pointer rounded-[3px] border border-neon-cyan px-6 py-3.5 font-mono text-[0.82rem] tracking-[0.16em] text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-midnight"
            >
              BACK
            </button>
          )}
          <button
            type="submit"
            className="cursor-pointer rounded-[3px] bg-neon-pink px-8 py-3.5 font-mono text-[0.82rem] tracking-[0.16em] text-midnight shadow-[0_0_22px_rgba(255,45,120,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,45,120,0.8)]"
          >
            {isLastPhase ? 'I AM BRAVE' : 'NEXT'}
          </button>
        </div>
      </form>
    </div>
  );
}
