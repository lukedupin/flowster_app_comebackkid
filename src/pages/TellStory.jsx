import { useEffect, useRef, useState } from 'react';
import { Eyebrow } from '../components/Section.jsx';
import { useLocalStorage } from '../hooks/useStoryData.js';

const SpeechRecognition =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

export default function TellStory() {
  const [started, setStarted] = useState(false);
  const [text, setText] = useLocalStorage('ck-story-draft', '');
  const [listening, setListening] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const recognitionRef = useRef(null);
  const textareaRef = useRef(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    recognitionRef.current?.stop();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-12">
        <p className="neon-footer-glow font-neon text-2xl">THANK YOU</p>
        <h1 className="mt-8 font-display text-2xl font-semibold tracking-[0.14em]">
          YOUR STORY IS SAVED
        </h1>
        <p className="mt-4 text-fog">
          It's stored safely on this device for now. When submissions open,
          you'll be able to send it in with one click — and it might be the
          reason someone else gets back up.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-8 cursor-pointer rounded-[3px] border border-neon-cyan px-6 py-3 font-mono text-[0.82rem] tracking-[0.16em] text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-midnight"
        >
          KEEP EDITING
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-5 py-16 sm:px-12 md:py-24">
      <Eyebrow>TELL YOUR STORY</Eyebrow>
      <h1 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-semibold tracking-[0.14em]">
        EVERY COMEBACK STARTS SOMEWHERE
      </h1>
      <p className="mt-5 text-fog">
        This is the part where you talk. Where you fell, what it cost, and the
        moment you decided to get up. It doesn't need to be polished — the best
        comeback stories never are. Type it, or hit the mic and just say it
        out loud like you're telling a friend on a long night drive.
      </p>
      <p className="mt-3 text-fog">
        Your words save automatically on this device, so you can come back to
        it whenever you're ready.
      </p>

      {!started ? (
        <button
          type="button"
          onClick={handleStart}
          className="mt-10 cursor-pointer rounded-[3px] bg-neon-pink px-8 py-4 font-mono text-[0.9rem] tracking-[0.16em] text-midnight shadow-[0_0_22px_rgba(255,45,120,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,45,120,0.8)]"
        >
          LET'S GET STARTED
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="relative">
            <label htmlFor="story" className="sr-only">
              Your story
            </label>
            <textarea
              id="story"
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={12}
              placeholder="It started on a Tuesday..."
              className="w-full resize-y rounded-md border border-horizon bg-dusk p-5 pr-16 leading-relaxed text-moon placeholder:text-fog/50 focus:border-neon-pink focus:outline-none"
            />

            {/* Mic button */}
            <button
              type="button"
              onClick={toggleMic}
              disabled={!SpeechRecognition}
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
            <button
              type="submit"
              className="cursor-pointer rounded-[3px] bg-neon-pink px-8 py-3.5 font-mono text-[0.82rem] tracking-[0.16em] text-midnight shadow-[0_0_22px_rgba(255,45,120,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,45,120,0.8)]"
            >
              SAVE MY STORY
            </button>
            <span className="font-mono text-[0.72rem] tracking-[0.1em] text-fog/60">
              {text.trim() ? `${text.trim().split(/\s+/).length} WORDS` : 'DRAFT AUTOSAVES'}
            </span>
          </div>
        </form>
      )}
    </section>
  );
}
