import { Link } from 'react-router-dom';
import { stories } from '../data/stories.js';
import YouTubeEmbed from '../components/YouTubeEmbed.jsx';
import ReactionRow from '../components/ReactionRow.jsx';
import { Eyebrow } from '../components/Section.jsx';

export default function Stories() {
  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:px-12 md:py-24">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>THE ARCHIVE</Eyebrow>
          <h1 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-semibold tracking-[0.14em]">
            COMEBACK STORIES
          </h1>
          <p className="mt-3 max-w-xl text-fog">
            Real falls. Real get-back-ups. Watch them, read them, and send some
            love with a reaction.
          </p>
        </div>
        <Link
          to="/tell-your-story"
          className="rounded-[3px] bg-neon-pink px-6 py-3.5 font-mono text-[0.82rem] tracking-[0.16em] text-midnight no-underline shadow-[0_0_22px_rgba(255,45,120,0.55)] transition hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(255,45,120,0.8)]"
        >
          TELL YOUR STORY
        </Link>
      </div>

      <div className="grid gap-8">
        {stories.map((story) => (
          <article
            key={story.id}
            className="grid gap-6 rounded-md border border-horizon bg-dusk p-6 md:grid-cols-[minmax(0,22rem)_1fr] md:p-8"
          >
            <YouTubeEmbed videoId={story.youtubeId} title={story.title} />

            <div className="flex flex-col gap-4">
              <div>
                <Link
                  to={`/stories/${story.id}`}
                  className="font-display text-xl font-medium tracking-[0.16em] text-moon no-underline transition-colors hover:text-neon-cyan"
                >
                  {story.title}
                </Link>
                <p className="mt-2 text-[0.95rem] text-fog">{story.description}</p>
              </div>

              <ReactionRow story={story} />

              <Link
                to={`/stories/${story.id}`}
                className="mt-auto font-mono text-[0.78rem] tracking-[0.18em] text-neon-pink no-underline hover:text-neon-cyan"
              >
                READ THE FULL STORY →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
