import { Link } from 'react-router-dom';

const anchorLinks = [
  { href: '/#WHAT', label: 'WHAT' },
  { href: '/#WHY', label: 'WHY' },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-horizon bg-midnight/80 px-5 py-4 backdrop-blur-md sm:px-12">
      <Link
        to="/"
        className="font-display text-base font-semibold tracking-[0.22em] text-neon-pink no-underline"
      >
        COMEBACK<span className="text-neon-cyan"> KID</span>
      </Link>
      <nav aria-label="Main" className="flex items-center gap-4 sm:gap-8">
        {anchorLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hidden font-mono text-[0.78rem] tracking-[0.18em] text-fog no-underline transition-colors hover:text-neon-cyan sm:inline"
          >
            {link.label}
          </a>
        ))}
        <Link
          to="/stories"
          className="font-mono text-[0.78rem] tracking-[0.18em] text-fog no-underline transition-colors hover:text-neon-cyan"
        >
          STORIES
        </Link>
        <Link
          to="/tell-your-story"
          className="rounded-[3px] border border-neon-pink px-3.5 py-1.5 font-mono text-[0.78rem] tracking-[0.18em] text-neon-pink no-underline transition-colors hover:bg-neon-pink hover:text-midnight"
        >
          GET STARTED
        </Link>
      </nav>
    </header>
  );
}
