// Seed stories. Replace youtubeId values with the real videos for each story
// (the current IDs are placeholders so the embeds work out of the box).
// An ID is the 11-character code from a YouTube URL: youtube.com/watch?v=<ID>

export const stories = [
  {
    id: 'the-long-drive-back',
    title: 'THE LONG DRIVE BACK',
    description:
      'Laid off on a Tuesday, driving home with one song on repeat. Six months later, a new career and a new city.',
    youtubeId: 'dQw4w9WgXcQ',
    reactions: { '🔥': 24, '💪': 18, '🌅': 9 },
    transcript: [
      "They walked me out at 10 in the morning. Fourteen years, and it took them eleven minutes. I sat in the parking garage for a long time before I could even start the car.",
      "Somewhere on the highway the song came on. I'd heard it a hundred times, but that day it landed different — like it was talking directly to me. I turned it up and just drove.",
      "I didn't fix everything that week, or that month. But I stopped introducing myself by the job I'd lost. I started applying to the work I'd always talked myself out of.",
      "Six months later I signed an offer in a city I'd never lived in. I played the song in the car on the way to my first day. Windows down. Never say die.",
    ],
    extraVideos: [],
  },
  {
    id: 'told-to-be-realistic',
    title: 'TOLD TO BE REALISTIC',
    description:
      'Everyone said the music thing was a phase. Three EPs later, the phase is paying rent.',
    youtubeId: 'dQw4w9WgXcQ',
    reactions: { '🎹': 31, '🔥': 15, '❤️': 12 },
    transcript: [
      "I got the 'be realistic' speech at every family dinner for about five years. Realistic meant quiet. Realistic meant smaller.",
      "I kept writing anyway — lunch breaks, late nights, a synth I bought used and repaired twice. The first EP went nowhere. So did the second, mostly.",
      "The third one found its people. Not millions of them. Enough of them. Enough to keep going, which it turns out is all I ever needed permission for.",
      "Nobody gives you that permission, by the way. You take it.",
    ],
    extraVideos: [],
  },
  {
    id: 'ten-count',
    title: 'THE TEN COUNT',
    description:
      'An injury ended the season. It did not end the athlete. A story about getting up before the count runs out.',
    youtubeId: 'dQw4w9WgXcQ',
    reactions: { '💪': 40, '🔥': 22 },
    transcript: [
      "The doctor used the word 'career-ending' like it was a weather report. I heard it in slow motion.",
      "Rehab is the most boring fight you will ever be in. Nobody cheers. There's no walkout music. It's just you, a resistance band, and a wall you stare at.",
      "So I made my own walkout music. Same song, every session, every small ugly rep. It turned a hospital hallway into an arena.",
      "I came back. Not the same — better in some ways, honest about others. The comeback isn't the moment the crowd sees. It's the thousand mornings they don't.",
    ],
    extraVideos: [],
  },
];

export function getStory(id) {
  return stories.find((story) => story.id === id);
}
