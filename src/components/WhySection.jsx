import { Section, Eyebrow, SectionTitle, Card } from './Section.jsx';

export default function WhySection() {
  return (
    <Section id="WHY">
      <Eyebrow>02 — WHY IT'S HERE</Eyebrow>
      <SectionTitle>GIVING BACK WHAT THE MUSIC GAVE</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="THE SONG HELPED ME" accent="cyan">
          This song carried me through more than I can easily explain. It was
          there on the bad nights and the long drives and the mornings that
          needed a reason. This is me giving something back.
        </Card>
        <Card title="MUSIC IS MAGIC" accent="cyan">
          The Midnight is transforming people's lives — one late-night listen
          at a time. I've watched it happen, and I've felt it happen. I want to
          help that magic reach the next person who needs it.
        </Card>
      </div>
    </Section>
  );
}
