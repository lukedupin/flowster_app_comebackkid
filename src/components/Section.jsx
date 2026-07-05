export function Section({ id, className = '', children }) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-5xl px-5 py-20 sm:px-12 md:py-28 ${className}`}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }) {
  return (
    <p className="mb-4 font-mono text-xs tracking-[0.32em] text-neon-cyan">
      {children}
    </p>
  );
}

export function SectionTitle({ children, className = '' }) {
  return (
    <h2
      className={`mb-9 font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-semibold tracking-[0.14em] ${className}`}
    >
      {children}
    </h2>
  );
}

export function Card({ title, children, accent = 'pink' }) {
  const accentClasses =
    accent === 'cyan'
      ? { border: 'border-t-neon-cyan', title: 'text-neon-cyan' }
      : { border: 'border-t-neon-pink', title: 'text-neon-pink' };

  return (
    <article
      className={`rounded-md border border-horizon border-t-2 bg-dusk p-8 ${accentClasses.border}`}
    >
      <h3
        className={`mb-3.5 font-display text-[1.05rem] font-medium tracking-[0.18em] ${accentClasses.title}`}
      >
        {title}
      </h3>
      <p className="text-fog">{children}</p>
    </article>
  );
}
