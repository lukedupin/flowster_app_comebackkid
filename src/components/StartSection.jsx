import { Link } from 'react-router-dom';
import { Section } from './Section.jsx';

export default function StartSection() {
  return (
    <Section id="START" className="border-t border-horizon text-center">
      <h2 className="mb-9 bg-gradient-to-r from-neon-pink via-sunset to-neon-cyan bg-clip-text font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-semibold tracking-[0.14em] text-transparent">
        READY FOR YOUR COMEBACK?
      </h2>
      <p className="mx-auto mb-9 max-w-xl text-fog">
        Tell us where you fell, and how you got back up. Your story might be
        the reason someone else stands up tomorrow.
      </p>
      <Link
        to="/tell-your-story"
        className="inline-block rounded-[3px] bg-neon-pink px-10 py-4 font-mono text-base tracking-[0.16em] text-midnight no-underline shadow-[0_0_22px_rgba(255,45,120,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,45,120,0.8)]"
      >
        GET STARTED →
      </Link>
    </Section>
  );
}
