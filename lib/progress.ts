export type Badge = {
  id: string;
  emoji: string;
  name: string;
  description: string;
  earned: boolean;
};

export type Progress = {
  totalPoints: number;
  totalExercises: number;
  streak: number;
  lastPlayedDate: string;
  exerciseCounts: Record<string, number>;
  earnedBadgeIds: string[];
};

const DEFAULT: Progress = {
  totalPoints: 0,
  totalExercises: 0,
  streak: 0,
  lastPlayedDate: "",
  exerciseCounts: {},
  earnedBadgeIds: [],
};

const ALL_BADGES: Omit<Badge, "earned">[] = [
  { id: "first_step",   emoji: "🌱", name: "First Step",     description: "Complete your first exercise" },
  { id: "word_master",  emoji: "📝", name: "Word Master",    description: "Complete Word Puzzle 5 times" },
  { id: "math_whiz",    emoji: "🔢", name: "Math Whiz",      description: "Complete Number Challenge 5 times" },
  { id: "storyteller",  emoji: "📖", name: "Storyteller",    description: "Complete Memory Recall 5 times" },
  { id: "scholar",      emoji: "🎓", name: "Scholar",        description: "Learn Something New 5 times" },
  { id: "zen_master",   emoji: "🧘", name: "Zen Master",     description: "Complete Mind Journey 5 times" },
  { id: "on_fire",      emoji: "🔥", name: "On Fire!",       description: "3-day streak" },
  { id: "week_warrior", emoji: "🏆", name: "Week Warrior",   description: "7-day streak" },
  { id: "century",      emoji: "💯", name: "Century",        description: "Earn 100 points" },
  { id: "all_rounder",  emoji: "⭐", name: "All-Rounder",    description: "Try all 5 exercises" },
];

export function getProgress(): Progress {
  if (typeof window === "undefined") return { ...DEFAULT };
  try {
    const raw = localStorage.getItem("brain-boost-progress");
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : { ...DEFAULT };
  } catch {
    return { ...DEFAULT };
  }
}

export function saveProgress(p: Progress) {
  localStorage.setItem("brain-boost-progress", JSON.stringify(p));
}

export function addExercisePoints(exerciseId: string, points: number): { newBadges: Badge[]; newStreak: number } {
  const p = getProgress();
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  p.totalPoints += points;
  p.totalExercises += 1;
  p.exerciseCounts[exerciseId] = (p.exerciseCounts[exerciseId] ?? 0) + 1;

  if (p.lastPlayedDate === yesterday) {
    p.streak += 1;
  } else if (p.lastPlayedDate !== today) {
    p.streak = 1;
  }
  p.lastPlayedDate = today;

  const newBadges: Badge[] = [];
  const check = (id: string, condition: boolean) => {
    if (condition && !p.earnedBadgeIds.includes(id)) {
      p.earnedBadgeIds.push(id);
      const def = ALL_BADGES.find(b => b.id === id)!;
      newBadges.push({ ...def, earned: true });
    }
  };

  check("first_step",   p.totalExercises >= 1);
  check("word_master",  (p.exerciseCounts["word-puzzle"] ?? 0) >= 5);
  check("math_whiz",    (p.exerciseCounts["number-challenge"] ?? 0) >= 5);
  check("storyteller",  (p.exerciseCounts["memory-recall"] ?? 0) >= 5);
  check("scholar",      (p.exerciseCounts["learn-something"] ?? 0) >= 5);
  check("zen_master",   (p.exerciseCounts["visualization"] ?? 0) >= 5);
  check("on_fire",      p.streak >= 3);
  check("week_warrior", p.streak >= 7);
  check("century",      p.totalPoints >= 100);
  check("all_rounder",  Object.keys(p.exerciseCounts).length >= 5);

  saveProgress(p);
  return { newBadges, newStreak: p.streak };
}

export function getBadges(): Badge[] {
  const p = getProgress();
  return ALL_BADGES.map(b => ({ ...b, earned: p.earnedBadgeIds.includes(b.id) }));
}

export function getLevel(points: number): { level: number; title: string; emoji: string; nextAt: number } {
  if (points < 50)  return { level: 1, title: "Brain Beginner",  emoji: "🌱", nextAt: 50 };
  if (points < 150) return { level: 2, title: "Mind Explorer",   emoji: "🌟", nextAt: 150 };
  if (points < 300) return { level: 3, title: "Memory Master",   emoji: "🧠", nextAt: 300 };
  if (points < 500) return { level: 4, title: "Wisdom Keeper",   emoji: "🏆", nextAt: 500 };
  return              { level: 5, title: "Brain Champion",  emoji: "👑", nextAt: Infinity };
}
