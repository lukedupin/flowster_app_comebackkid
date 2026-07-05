import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable (private mode, etc.) — state still works in memory.
    }
  }, [key, value]);

  return [value, setValue];
}

/**
 * Emoji reactions the visitor has added, layered on top of each story's
 * seed counts. Shape: { [storyId]: { [emoji]: extraCount } }
 */
export function useReactions() {
  const [extras, setExtras] = useLocalStorage('ck-reactions', {});

  const addReaction = (storyId, emoji) => {
    setExtras((prev) => ({
      ...prev,
      [storyId]: {
        ...prev[storyId],
        [emoji]: (prev[storyId]?.[emoji] ?? 0) + 1,
      },
    }));
  };

  const countFor = (story, emoji) =>
    (story.reactions[emoji] ?? 0) + (extras[story.id]?.[emoji] ?? 0);

  return { addReaction, countFor };
}

/**
 * Extra YouTube videos visitors have embedded on a story page.
 * Shape: { [storyId]: [videoId, ...] }
 */
export function useExtraVideos(storyId) {
  const [all, setAll] = useLocalStorage('ck-extra-videos', {});
  const videos = all[storyId] ?? [];

  const addVideo = (videoId) => {
    setAll((prev) => ({
      ...prev,
      [storyId]: [...(prev[storyId] ?? []), videoId],
    }));
  };

  return { videos, addVideo };
}

/** Pull an 11-character YouTube video ID out of any common URL form. */
export function parseYouTubeId(input) {
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
  const match = trimmed.match(
    /(?:youtube\.com\/(?:watch\?.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}
