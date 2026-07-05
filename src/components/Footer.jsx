export default function Footer() {
  return (
    <footer id="CONTACT" className="border-t border-horizon px-5 pb-10 pt-14 text-center sm:px-12">
      <p className="neon-footer-glow mb-10 font-neon text-[1.4rem]">COMEBACK KID</p>

      <div className="mx-auto mb-10 grid max-w-3xl gap-8 sm:grid-cols-3">
        <div>
          <p className="mb-2 font-mono text-[0.7rem] tracking-[0.28em] text-fog">CONTACT</p>
          <a
            href="mailto:hello@example.com"
            className="font-display text-[0.92rem] tracking-[0.12em] text-moon no-underline hover:text-neon-cyan"
          >
            HELLO@EXAMPLE.COM
          </a>
        </div>
        <div>
          <p className="mb-2 font-mono text-[0.7rem] tracking-[0.28em] text-fog">LISTEN</p>
          <a
            href="https://themidnight.lnk.to/listenAP"
            rel="noopener"
            className="font-display text-[0.92rem] tracking-[0.12em] text-moon no-underline hover:text-neon-cyan"
          >
            THE MIDNIGHT — MUSIC
          </a>
        </div>
        <div>
          <p className="mb-2 font-mono text-[0.7rem] tracking-[0.28em] text-fog">MADE WITH</p>
          <p className="font-display text-[0.92rem] tracking-[0.12em] text-moon">
            SYNTHS, NEON &amp; GRATITUDE
          </p>
        </div>
      </div>

      <p className="font-mono text-[0.72rem] tracking-[0.1em] text-fog/60">
        A fan-made tribute. Not affiliated with The Midnight.
      </p>
    </footer>
  );
}
