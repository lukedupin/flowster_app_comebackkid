import { Link } from 'react-router-dom';
import { Eyebrow, SectionTitle } from './Section.jsx';

const stories = [
  {
    tag: 'NEVER SAY DIE',
    text: 'The ones who hear those two words and feel something switch on. Quitting was never on the table.',
  },
  {
    tag: 'KNOCKED DOWN',
    text: 'The people who hit the floor — lost the job, the person, the plan — and got up anyway. Every single time.',
  },
  {
    tag: 'DREAM DEFENDERS',
    text: 'The ones who refuse to deny their dreams, no matter how many people told them to be realistic.',
  },
  {
    tag: 'THE OVERLOOKED',
    text: 'Passed over. Underestimated. Written off. Still here, still swinging, still becoming.',
  },
];

export default function StoriesSection() {
  return (
    <section id="STORIES" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-12">
        <Eyebrow>03 — WHO IT'S FOR</Eyebrow>
        <SectionTitle>THE COMEBACK KIDS</SectionTitle>
        <p className="mb-10 max-w-xl text-fog">
          If any of these sound like you, you're already one of us.
        </p>
      </div>

      <div className="marquee-mask overflow-hidden" aria-label="Who this is for">
        <div className="animate-marquee flex w-max gap-6 hover:[animation-play-state:paused]">
          {[...stories, ...stories].map((story, i) => (
            <article
              key={`${story.tag}-${i}`}
              className="w-80 shrink-0 rounded-md border border-horizon bg-dusk p-7 transition-colors hover:border-neon-pink"
              aria-hidden={i >= stories.length}
            >
              <p className="mb-3 font-mono text-[0.72rem] tracking-[0.24em] text-neon-cyan">
                {story.tag}
              </p>
              <p className="text-[0.95rem] text-fog">{story.text}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-5xl px-5 sm:px-12">
        <Link
          to="/stories"
          className="font-mono text-[0.82rem] tracking-[0.18em] text-neon-pink no-underline hover:text-neon-cyan"
        >
          READ THE STORIES →
        </Link>
      </div>
    </section>
  );
}
