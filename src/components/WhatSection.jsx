import { Section, Eyebrow, SectionTitle, Card } from './Section.jsx';

export default function WhatSection() {
  return (
    <Section id="WHAT">
      <Eyebrow>01 — WHAT IS THIS?</Eyebrow>
      <SectionTitle>A SONG THAT BECAME A PLACE</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="A LOVE LETTER">
          This site is a love letter to my favorite song. Some songs are just
          songs. This one showed up at the exact moment it was needed and never
          really left. Building this is the closest thing to writing back.
        </Card>
        <Card title="A STORY COLLECTOR">
          It's also a way to capture the comeback kid stories — the falls, the
          getting-back-ups, the quiet decisions to keep going. The song belongs
          to everyone it helped. So should the stories.
        </Card>
      </div>
    </Section>
  );
}
