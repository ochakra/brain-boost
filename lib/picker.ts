// Returns a random item from an array that hasn't been shown recently.
// Seen items are stored in localStorage under the given key.
// Once all items have been seen, the history resets.

export function pickUnseen<T>(key: string, items: T[]): T {
  if (typeof window === "undefined") return items[0];
  const raw = localStorage.getItem(`seen-${key}`);
  let seen: number[] = raw ? JSON.parse(raw) : [];

  // Reset if all items seen
  if (seen.length >= items.length) seen = [];

  const available = items.map((_, i) => i).filter(i => !seen.includes(i));
  const pick = available[Math.floor(Math.random() * available.length)];

  seen.push(pick);
  localStorage.setItem(`seen-${key}`, JSON.stringify(seen));
  return items[pick];
}

export function pickNUnseen<T>(key: string, items: T[], n: number): T[] {
  if (typeof window === "undefined") return items.slice(0, n);
  const raw = localStorage.getItem(`seen-${key}`);
  let seen: number[] = raw ? JSON.parse(raw) : [];

  if (seen.length + n > items.length) seen = [];

  const available = items.map((_, i) => i).filter(i => !seen.includes(i));
  const picks: number[] = [];
  while (picks.length < n && available.length > 0) {
    const idx = Math.floor(Math.random() * available.length);
    picks.push(available.splice(idx, 1)[0]);
  }

  seen.push(...picks);
  localStorage.setItem(`seen-${key}`, JSON.stringify(seen));
  return picks.map(i => items[i]);
}
