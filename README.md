# Comeback Kid — React + Tailwind

The same one-page "Comeback Kid" landing site, converted from Astro to a React app built with Vite and Tailwind CSS v4. Same look and feel: The Midnight's midnight navy, neon pink + cyan, all-caps display type, and the retro synthwave horizon.

## Run it

```bash
npm install
npm run dev      # local dev at http://localhost:5173
npm run build    # static build to ./dist
```

## Pages & routing (React Router)

| Route | Page |
| --- | --- |
| `/` | Landing page (hero, what, why, marquee, CTA) |
| `/stories` | Story archive — "Tell your Story" button, story cards with click-to-play YouTube video, title, description, and emoji reactions (click to +1) |
| `/stories/:id` | Full story — transcription, reactions, and a form to embed additional playable YouTube videos |
| `/tell-your-story` | Story composer — intro copy, "Let's get started" button, and a textarea with a mic for voice dictation |

Notes on behavior:

- **Emoji reactions, embedded videos, and story drafts persist in `localStorage`** — there's no backend yet, so everything is per-device. Swap the hooks in `src/hooks/useStoryData.js` for API calls when you add one.
- **Videos are click-to-play**: a thumbnail facade loads the real YouTube iframe (privacy-enhanced `youtube-nocookie.com`) only when clicked, so the list page stays fast.
- **The mic uses the Web Speech API** (`SpeechRecognition`) — supported in Chrome/Edge/Safari; the button disables itself with a tooltip in browsers that don't support it.
- **Seed stories** live in `src/data/stories.js`. The `youtubeId` values are placeholders — replace them with the real video ID for each story (the 11-character code from `youtube.com/watch?v=<ID>`).

## Structure

```
index.html                     # fonts + root
src/
  main.jsx                     # React entry + BrowserRouter
  App.jsx                      # routes + scroll management
  index.css                    # Tailwind import, @theme tokens, custom neon/marquee effects
  data/
    stories.js                 # seed stories (video, description, transcript, reactions)
  hooks/
    useStoryData.js            # localStorage hooks: reactions, extra videos, drafts + YouTube URL parser
  pages/
    Home.jsx                   # composes the landing sections
    Stories.jsx                # story archive
    StoryDetail.jsx            # transcription + embeddable videos
    TellStory.jsx              # composer with mic dictation
  components/
    Nav.jsx
    Hero.jsx                   # neon sign + retro horizon
    Section.jsx                # Section / Eyebrow / SectionTitle / Card primitives
    YouTubeEmbed.jsx           # click-to-play video facade
    ReactionRow.jsx            # emoji buttons with counts
    WhatSection.jsx
    WhySection.jsx
    StoriesSection.jsx         # scrolling stories marquee
    StartSection.jsx           # GET STARTED → CTA
    Footer.jsx                 # Midnight-style CONTACT block
```

## How Tailwind is set up

Tailwind v4 via the `@tailwindcss/vite` plugin — no `tailwind.config.js` needed. All design tokens live in the `@theme` block in `src/index.css`, which generates utilities like `bg-midnight`, `text-neon-pink`, `border-horizon`, `font-display`, and `animate-marquee`. A handful of effects Tailwind can't express (neon text-shadow glow, the scanline sun, the perspective grid floor, the marquee edge fade) are small custom classes in the same file.

## Customize

- **Colors / fonts** — edit the `@theme` block in `src/index.css`.
- **Copy** — each section's text lives in its component; the scrolling story cards are the `stories` array in `StoriesSection.jsx`.
- **Get started link** — the CTA (`StartSection.jsx`) and footer point to `mailto:hello@example.com`. Swap for your form, Discord, or submission page.
