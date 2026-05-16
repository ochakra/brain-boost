"use client";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { addExercisePoints } from "@/lib/progress";
import type { Badge } from "@/lib/progress";

const Confetti = dynamic(() => import("@/components/Confetti"), { ssr: false });
const BadgeCelebration = dynamic(() => import("@/components/BadgeCelebration"), { ssr: false });
const PointsPopup = dynamic(() => import("@/components/PointsPopup"), { ssr: false });

const LESSONS = [
  { category: "Spanish Words 🇪🇸", words: [
    { word: "Feliz", meaning: "Happy", example: "¡Estoy feliz! (I am happy!)" },
    { word: "Gracias", meaning: "Thank you", example: "¡Muchas gracias! (Thank you very much!)" },
    { word: "Amigo", meaning: "Friend", example: "Mi amigo (My friend)" },
  ]},
  { category: "Fun Science Facts 🔬", words: [
    { word: "Neurons", meaning: "Brain cells that send messages", example: "You have about 86 billion neurons in your brain!" },
    { word: "Photosynthesis", meaning: "How plants make food from sunlight", example: "Trees use sunlight, water and air to grow!" },
    { word: "Gravity", meaning: "The force that pulls things down", example: "Gravity keeps us on the ground!" },
  ]},
  { category: "Hindi Words 🇮🇳", words: [
    { word: "Khushi", meaning: "Happiness / Joy", example: "Aaj bahut khushi hai! (There is so much joy today!)" },
    { word: "Pyaar", meaning: "Love", example: "Pyaar sabse badi cheez hai (Love is the greatest thing)" },
    { word: "Shanti", meaning: "Peace / Calm", example: "Mann mein shanti raho (Keep peace in your heart)" },
  ]},
  { category: "Beautiful English Words 📚", words: [
    { word: "Serendipity", meaning: "Finding something wonderful by surprise", example: "Meeting an old friend on a walk — that is serendipity!" },
    { word: "Euphoria", meaning: "A feeling of extreme happiness", example: "Holding your grandchild fills you with euphoria." },
    { word: "Tranquil", meaning: "Peaceful and quiet", example: "A tranquil morning by the garden." },
  ]},
];

function getTodayLesson() {
  return LESSONS[new Date().getDate() % LESSONS.length];
}

export default function LearnSomethingPage() {
  const lesson = getTodayLesson();
  const [wordIndex, setWordIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [learned, setLearned] = useState<number[]>([]);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [pointsKey, setPointsKey] = useState(0);

  const markLearned = () => {
    const newLearned = [...learned, wordIndex];
    setLearned(newLearned);
    if (wordIndex + 1 >= lesson.words.length) {
      const pts = 10 * newLearned.length;
      const { newBadges: nb } = addExercisePoints("learn-something", pts);
      setPointsEarned(pts); setPointsKey(k => k+1);
      setNewBadges(nb);
      window.dispatchEvent(new Event("progress-updated"));
      setDone(true); setShowConfetti(true);
    } else { setWordIndex(wordIndex + 1); setFlipped(false); }
  };

  const word = lesson.words[wordIndex];

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #ffedd5 0%, #fef3c7 100%)" }}>
      {showConfetti && <Confetti />}
      {pointsEarned > 0 && <PointsPopup key={pointsKey} points={pointsEarned} />}
      {newBadges.length > 0 && <BadgeCelebration badges={newBadges} onClose={() => setNewBadges([])} />}

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-3xl hover:scale-110 transition-transform">←</Link>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-orange-800">🌍 Learn Something New</h1>
            <p className="text-orange-600 text-lg">{lesson.category}</p>
          </div>
        </div>

        {!done ? (
          <div>
            <div className="flex gap-2 justify-center mb-6">
              {lesson.words.map((_, i) => <div key={i} className={`w-8 h-3 rounded-full transition-all ${learned.includes(i) ? "bg-orange-500" : i === wordIndex ? "bg-orange-300" : "bg-gray-200"}`} />)}
            </div>
            <div onClick={() => setFlipped(!flipped)} className="cursor-pointer select-none">
              <div className={`bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 min-h-[220px] flex flex-col items-center justify-center text-center ${flipped ? "border-orange-400 bg-orange-50" : "border-orange-100"}`}>
                {!flipped ? (
                  <div className="bounce-in">
                    <p className="text-gray-400 text-lg mb-3">Today&apos;s new word</p>
                    <p className="text-5xl font-bold text-orange-700 mb-3">{word.word}</p>
                    <p className="text-gray-400 text-lg">👆 Tap to see the meaning!</p>
                  </div>
                ) : (
                  <div className="bounce-in">
                    <p className="text-3xl font-bold text-orange-800 mb-3">{word.meaning}</p>
                    <div className="bg-orange-100 rounded-2xl p-3 mt-2">
                      <p className="text-orange-700 text-lg italic">&ldquo;{word.example}&rdquo;</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-center text-gray-500 mt-3 mb-5 text-lg">
              {!flipped ? "Tap the card to reveal the meaning" : "Read it out loud to remember it better! 🗣️"}
            </p>
            {flipped && (
              <button onClick={markLearned} className="shine-btn w-full bg-orange-500 text-white rounded-2xl py-4 text-2xl font-bold hover:bg-orange-600 active:scale-95 transition-all bounce-in">
                I learned it! ✅ (+10 pts)
              </button>
            )}
          </div>
        ) : (
          <div className="text-center bg-white rounded-3xl p-8 shadow-lg bounce-in">
            <div className="text-6xl mb-4">🎓</div>
            <h2 className="text-3xl font-bold text-orange-800 mb-2">You learned 3 new things!</h2>
            <p className="text-xl text-orange-600 mb-4">From: {lesson.category}</p>
            <div className="text-left space-y-3 mb-6">
              {lesson.words.map((w, i) => (
                <div key={i} className="bg-orange-50 rounded-2xl p-3 border border-orange-200">
                  <span className="font-bold text-orange-800">{w.word}</span>
                  <span className="text-gray-600"> — {w.meaning}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mb-4">Try to use one of these words today! 💬</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setWordIndex(0); setFlipped(false); setDone(false); setLearned([]); setShowConfetti(false); }}
                className="bg-orange-500 text-white rounded-full px-6 py-3 font-semibold text-xl hover:bg-orange-600 transition-colors">Review Again 🔄</button>
              <Link href="/" className="bg-gray-200 text-gray-700 rounded-full px-6 py-3 font-semibold text-xl hover:bg-gray-300 transition-colors">Home 🏠</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
