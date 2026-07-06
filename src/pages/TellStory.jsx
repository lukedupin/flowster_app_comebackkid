import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow, Card } from '../components/Section.jsx';
import StoryComposer from '../components/StoryComposer.jsx';
import FinalTouch from '../components/FinalTouch.jsx';
import { useLocalStorage } from '../hooks/useStoryData.js';

const processSteps = [
  {
    title: 'TELL STORY',
    accent: 'pink',
    body: 'Talk or type'
  },
  {
    title: 'SELECT LENS',
    accent: 'cyan',
    body: 'Pick the mood'
  },
  {
    title: 'SHARE STORY',
    accent: 'pink',
    body: 'Get a recap'
  },
];

export default function TellStory() {
  const [submitted, setSubmitted] = useState(false);
  const [finalTouch, setFinalTouch] = useState(false);
  const [composing, setComposing] = useState(false);
  const [storyParts, setStoryParts] = useLocalStorage('ck-story-parts', []);

  const handlePhaseChange = (index, text) => {
    setStoryParts((prev) => {
      const next = [...prev];
      while (next.length <= index) next.push('');
      next[index] = text;
      return next;
    });
  };

  if (finalTouch && !submitted) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-12 md:py-24">
        <Eyebrow>THE FINAL TOUCH</Eyebrow>
        <h1 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-semibold tracking-[0.14em]">
          ONE LAST THING
        </h1>
        <p className="mt-5 text-fog">
          A few last touches before your comeback goes out into the world.
        </p>
        <FinalTouch onComplete={() => setSubmitted(true)} />
      </section>
    );
  }

  if (submitted) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-12">
        <p className="neon-footer-glow font-neon text-2xl">THANK YOU</p>
        <h1 className="mt-8 font-display text-2xl font-semibold tracking-[0.14em]">
          YOUR STORY IS PROCESSING
        </h1>
        <p className="mt-4 text-fog">
          When it's ready, you'll be able to view 
          and share it. <span className="text-neon-cyan">Your story</span> might be the
          reason someone else<span className="text-neon-pink"> gets back up.</span>
        </p>
        <Link
          to="/stories"
          className="mt-8 inline-block cursor-pointer rounded-[3px] border border-neon-cyan px-6 py-3 font-mono text-[0.82rem] tracking-[0.16em] text-neon-cyan no-underline transition-colors hover:bg-neon-cyan hover:text-midnight"
        >
          STORIES
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-5 py-16 sm:px-12 md:py-24">
      <Eyebrow>TELL YOUR STORY</Eyebrow>
      {!composing && <>
        <h1 className="font-display text-[clamp(1.8rem,5vw,3rem)] font-semibold tracking-[0.14em]">
          EVERY COMEBACK STARTS SOMEWHERE
        </h1>
        <p className="mt-5 text-fog">
          It doesn't need to be polished — the best comeback stories never are.
          Here's how it works.
        </p>
      </>}

      {!composing && (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {processSteps.map((step) => (
              <Card key={step.title} title={step.title} accent={step.accent}>
                {step.body}
              </Card>
            ))}
          </div>

          <p className="mt-8 text-fog">
            Ready?
          </p>
        </>
      )}

      <StoryComposer
        onSubmit={() => setFinalTouch(true)}
        onStartedChange={setComposing}
        storyParts={storyParts}
        onPhaseChange={handlePhaseChange}
      />
    </section>
  );
}
