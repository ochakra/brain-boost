"use client";
import Link from "next/link";
import WhatsAppShare from "@/components/WhatsAppShare";
import StatsBar from "@/components/StatsBar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLang } from "@/components/LanguageProvider";

export default function Home() {
  const { t } = useLang();

  const exercises = [
    { id: "word-puzzle",      emoji: "🔤", ...t.exercises_list.wordPuzzle,      color: "from-purple-400 to-purple-600", bg: "bg-purple-50", border: "border-purple-200", minutes: "10 min", pts: "30 pts" },
    { id: "number-challenge", emoji: "🔢", ...t.exercises_list.numberChallenge, color: "from-blue-400 to-blue-600",     bg: "bg-blue-50",   border: "border-blue-200",   minutes: "5 min",  pts: "30 pts" },
    { id: "memory-recall",    emoji: "📖", ...t.exercises_list.memoryRecall,    color: "from-green-400 to-green-600",   bg: "bg-green-50",  border: "border-green-200",  minutes: "5 min",  pts: "30 pts" },
    { id: "learn-something",  emoji: "🌍", ...t.exercises_list.learnSomething,  color: "from-orange-400 to-orange-600", bg: "bg-orange-50", border: "border-orange-200", minutes: "10 min", pts: "30 pts" },
    { id: "visualization",    emoji: "🧘", ...t.exercises_list.mindJourney,     color: "from-pink-400 to-pink-600",     bg: "bg-pink-50",   border: "border-pink-200",   minutes: "5 min",  pts: "20 pts" },
  ];

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #fef9f0 0%, #fef3e2 100%)" }}>
      <div className="text-center pt-10 pb-4 px-4">
        <div className="text-6xl mb-3 float">🧠</div>
        <h1 className="text-5xl font-bold text-amber-800 mb-2">{t.appName}</h1>
        <p className="text-2xl text-amber-700">{t.appSubtitle}</p>
        <div className="mt-3 inline-block bg-amber-100 border border-amber-300 rounded-full px-5 py-2 text-amber-800 font-semibold text-xl">
          {t.todaysWorkout}
        </div>
      </div>

      {/* Language switcher */}
      <div className="max-w-2xl mx-auto px-4 pb-2">
        <LanguageSwitcher />
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-10">
        <div className="mt-4">
          <StatsBar />
        </div>

        <div className="space-y-4">
          {exercises.map((ex, i) => (
            <Link key={ex.id} href={`/exercise/${ex.id}`}>
              <div
                className={`${ex.bg} ${ex.border} border-2 rounded-3xl p-5 flex items-center gap-4 shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer bounce-in`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className={`bg-gradient-to-br ${ex.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0`}>
                  {ex.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-bold text-gray-800">{ex.title}</h2>
                    <span className="text-sm bg-white rounded-full px-2 py-0.5 text-gray-500 border">{ex.minutes}</span>
                    <span className="text-sm bg-amber-100 rounded-full px-2 py-0.5 text-amber-700 border border-amber-200 font-semibold">{ex.pts}</span>
                  </div>
                  <p className="text-gray-600 text-xl">{ex.subtitle}</p>
                  <p className="text-gray-500 text-base mt-0.5">{ex.description}</p>
                </div>
                <div className="text-3xl text-gray-300">›</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5">
          <WhatsAppShare />
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 text-center mt-4">
          <div className="text-3xl mb-2">💡</div>
          <p className="text-amber-800 font-semibold text-xl">{t.tipTitle}</p>
          <p className="text-amber-700 mt-1 text-lg">{t.tipBody}</p>
        </div>
      </div>
    </main>
  );
}
