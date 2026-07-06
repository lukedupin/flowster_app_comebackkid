// Renders **bold** as cyan and *italic* as pink, without pulling in a markdown parser.
export default function EmphasisText({ text }) {
  if (!text) return null;

  const parts = text.split(/(\*\*.+?\*\*|\*.+?\*)/g).filter(Boolean);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="text-neon-cyan">
          {part.slice(2, -2)}
        </span>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <span key={i} className="text-neon-pink">
          {part.slice(1, -1)}
        </span>
      );
    }
    return part;
  });
}
