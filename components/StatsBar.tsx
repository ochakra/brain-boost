"use client";
import { useEffect, useState } from "react";
import { getProgress, getBadges, getLevel } from "@/lib/progress";

export default function StatsBar() {
  const [p, setP] = useState({ totalPoints: 0, totalExercises: 0, streak: 0, earnedBadgeIds: [] as string[] });

  useEffect(() => {
    const prog = getProgress();
    setP(prog);
    const handler = () => setP(getProgress());
    window.addEventListener("progress-updated", handler);
    return () => window.removeEventListener("progress-updated", handler);
  }, []);

  const level = getLevel(p.totalPoints);
  const badges = getBadges().filter(b => b.earned);
  const pct = level.nextAt === Infinity ? 100 : Math.min(100, Math.round((p.totalPoints / level.nextAt) * 100));

  return (
    <div className="bg-white border-2 border-amber-200 rounded-3xl p-5 shadow-md mb-4">
      {/* Level and points */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{level.emoji}</span>
          <div>
            <p className="font-bold text-gray-800 text-xl leading-tight">{level.title}</p>
            <p className="text-gray-500 text-base">Level {level.level}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-amber-600">{p.totalPoints}</p>
          <p className="text-gray-500 text-base">points</p>
        </div>
      </div>

      {/* Progress bar to next level */}
      {level.nextAt !== Infinity && (
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress to Level {level.level + 1}</span>
            <span>{p.totalPoints} / {level.nextAt} pts</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-amber-400 to-amber-500 h-3 rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="flex gap-3">
        <div className="flex-1 bg-amber-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-amber-700">{p.totalExercises}</p>
          <p className="text-gray-500 text-sm">Exercises</p>
        </div>
        <div className="flex-1 bg-orange-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-orange-600">{p.streak} 🔥</p>
          <p className="text-gray-500 text-sm">Day Streak</p>
        </div>
        <div className="flex-1 bg-yellow-50 rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-yellow-600">{badges.length}</p>
          <p className="text-gray-500 text-sm">Badges</p>
        </div>
      </div>

      {/* Earned badges */}
      {badges.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {badges.map(b => (
            <div key={b.id} title={b.description} className="bg-amber-100 border border-amber-300 rounded-full px-3 py-1 flex items-center gap-1 text-sm font-semibold text-amber-800">
              {b.emoji} {b.name}
            </div>
          ))}
        </div>
      )}

      {badges.length === 0 && (
        <p className="text-center text-gray-400 text-sm mt-3">Complete exercises to earn badges! 🏅</p>
      )}
    </div>
  );
}
