import { useReactions } from '../hooks/useStoryData.js';

export default function ReactionRow({ story }) {
  const { addReaction, countFor } = useReactions();

  return (
    <div className="flex flex-wrap gap-2">
      {Object.keys(story.reactions).map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            addReaction(story.id, emoji);
          }}
          aria-label={`React with ${emoji}, currently ${countFor(story, emoji)}`}
          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-horizon bg-midnight px-3 py-1 transition hover:-translate-y-0.5 hover:border-neon-cyan active:scale-95"
        >
          <span className="text-base leading-none">{emoji}</span>
          <span className="font-mono text-[0.72rem] tracking-[0.08em] text-fog">
            {countFor(story, emoji)}
          </span>
        </button>
      ))}
    </div>
  );
}
