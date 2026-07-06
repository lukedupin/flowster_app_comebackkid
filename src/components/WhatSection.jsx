import { Section, Eyebrow, SectionTitle, Card } from './Section.jsx';

export default function WhatSection() {
  return (
    <Section id="WHAT">
      <Eyebrow>01 — WHAT IS THIS?</Eyebrow>
      <SectionTitle>A SONG THAT SAVED MY LIFE</SectionTitle>
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="A LOVE LETTER">
          This site is a love letter to my favorite song. Some music is magic.
          This one showed up at the exact moment I needed it.
          When I saw it live, I cried, and I knew I needed to give back.
          Building this site is my<span class="text-neon-cyan"> contribution</span>.
        </Card>
        <Card title="A STORY COLLECTOR">
          This isn't about me, its about the people who get knocked down and get back up. 
          Comeback kids are<span class="text-neon-cyan"> inspirational</span>, and their stories deserve to be told.
        </Card>
      </div>
    </Section>
  );
}
