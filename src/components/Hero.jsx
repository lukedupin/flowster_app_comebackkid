import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col items-center overflow-hidden px-6 pt-24 text-center md:pt-32">
      <p className="mb-6 font-mono text-xs tracking-[0.32em] text-neon-cyan">
        A TRIBUTE INSPIRED BY THE MIDNIGHT
      </p>

      <h1 className="grid gap-1 font-neon font-normal leading-[1.05]" aria-label="Comeback Kid">
        <span className="neon-pink-glow animate-flicker text-[clamp(2.6rem,9vw,6.5rem)]">
          COMEBACK
        </span>
        <span className="neon-cyan-glow animate-flicker text-[clamp(2.6rem,9vw,6.5rem)] [animation-delay:0.9s]">
          KID
        </span>
      </h1>

      <p className="mt-8 font-display text-[clamp(0.9rem,2.4vw,1.2rem)] font-medium tracking-[0.45em] text-moon">
        NEVER SAY DIE.
      </p>

      <p className="mx-auto mt-5 max-w-xl text-fog">
        A place for the stories of people who got knocked down and got back up
        — set to the song that helped them do it.
      </p>

      <div className="relative z-[2] mt-10 flex flex-wrap justify-center gap-4">
        <Link
          to="/stories"
          className="rounded-[3px] bg-neon-pink px-6 py-3.5 font-mono text-[0.82rem] tracking-[0.16em] text-midnight no-underline shadow-[0_0_22px_rgba(255,45,120,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,45,120,0.8)]"
        >
          SHARE YOUR STORY
        </Link>
        <a
          href="#WHAT"
          className="rounded-[3px] border border-horizon px-6 py-3.5 font-mono text-[0.82rem] tracking-[0.16em] text-fog no-underline transition-colors hover:border-neon-cyan hover:text-neon-cyan"
        >
          WHAT IS THIS?
        </a>
      </div>

      {/* Retro horizon: scanline sun + perspective grid */}
      <div
        className="pointer-events-none relative mt-auto h-[clamp(160px,26vh,260px)] w-full"
        aria-hidden="true"
      >
        <div className="retro-sun absolute bottom-[34%] left-1/2 aspect-square w-[clamp(140px,22vw,240px)] -translate-x-1/2 rounded-full opacity-90" />
        <div className="grid-floor absolute inset-x-0 bottom-0 h-2/5" />
      </div>
    </section>
  );
}
