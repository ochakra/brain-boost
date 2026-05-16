"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { addExercisePoints } from "@/lib/progress";
import type { Badge } from "@/lib/progress";
import { useLang } from "@/components/LanguageProvider";

const Confetti = dynamic(() => import("@/components/Confetti"), { ssr: false });
const BadgeCelebration = dynamic(() => import("@/components/BadgeCelebration"), { ssr: false });
const PointsPopup = dynamic(() => import("@/components/PointsPopup"), { ssr: false });

type Question = { q: string; answer: number; emoji: string };

function generateQuestions(): Question[] {
  const ops = [
    () => { const a = Math.floor(Math.random()*50)+10, b = Math.floor(Math.random()*30)+5; return { q:`${a} + ${b} = ?`, answer:a+b, emoji:"➕" }; },
    () => { const b = Math.floor(Math.random()*20)+5, a = Math.floor(Math.random()*30)+b; return { q:`${a} - ${b} = ?`, answer:a-b, emoji:"➖" }; },
    () => { const a = Math.floor(Math.random()*9)+2, b = Math.floor(Math.random()*9)+2; return { q:`${a} × ${b} = ?`, answer:a*b, emoji:"✖️" }; },
    () => { const b = Math.floor(Math.random()*8)+2, ans = Math.floor(Math.random()*10)+2; return { q:`${b*ans} ÷ ${b} = ?`, answer:ans, emoji:"➗" }; },
  ];
  return Array.from({ length: 5 }, (_, i) => ops[i % ops.length]());
}

export default function NumberChallengePage() {
  const { t } = useLang();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct"|"wrong"|null>(null);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [pointsKey, setPointsKey] = useState(0);

  useEffect(() => { setQuestions(generateQuestions()); }, []);

  const submit = useCallback(() => {
    if (!input) return;
    const q = questions[current], correct = parseInt(input) === q.answer;
    setFeedback(correct ? "correct" : "wrong");
    const newScore = correct ? score + 1 : score;
    if (correct) setScore(newScore);
    setTimeout(() => {
      setFeedback(null); setInput("");
      if (current + 1 >= questions.length) {
        const pts = newScore * 6;
        const { newBadges: nb } = addExercisePoints("number-challenge", pts);
        setPointsEarned(pts); setPointsKey(k => k+1); setNewBadges(nb);
        window.dispatchEvent(new Event("progress-updated"));
        setDone(true);
        if (newScore >= 4) setShowConfetti(true);
      } else { setCurrent(c => c+1); }
    }, 1000);
  }, [input, questions, current, score]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Enter") submit(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [submit]);

  const q = questions[current];

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)" }}>
      {showConfetti && <Confetti />}
      {pointsEarned > 0 && <PointsPopup key={pointsKey} points={pointsEarned} />}
      {newBadges.length > 0 && <BadgeCelebration badges={newBadges} onClose={() => setNewBadges([])} />}

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="text-3xl hover:scale-110 transition-transform">←</Link>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-blue-800">{t.nc_title}</h1>
            <p className="text-blue-600 text-lg">{t.nc_subtitle}</p>
          </div>
        </div>

        {!done && q ? (
          <div className="text-center">
            <div className="flex gap-2 justify-center mb-6">
              {questions.map((_, i) => <div key={i} className={`w-8 h-3 rounded-full transition-all ${i < current ? "bg-blue-500" : i === current ? "bg-blue-300" : "bg-gray-200"}`} />)}
            </div>
            <div className="text-5xl mb-4">{q.emoji}</div>
            <div className={`bg-white rounded-3xl p-8 shadow-lg mb-6 border-2 transition-all ${feedback === "correct" ? "bg-green-50 border-green-400" : feedback === "wrong" ? "bg-red-50 border-red-300" : "border-blue-100"}`}>
              <p className="text-5xl font-bold text-blue-800 mb-4">{q.q}</p>
              {feedback === "correct" && <p className="text-3xl text-green-600 font-bold bounce-in">{t.nc_correct}</p>}
              {feedback === "wrong" && <p className="text-2xl text-red-600 font-semibold bounce-in">{t.nc_answer} <strong>{q.answer}</strong></p>}
            </div>
            {!feedback && (
              <>
                <input type="number" value={input} onChange={e => setInput(e.target.value)} autoFocus
                  className="w-full text-center text-4xl font-bold border-2 border-blue-300 rounded-2xl p-4 mb-4 focus:outline-none focus:border-blue-500 bg-white" />
                <button onClick={submit} disabled={!input} className="shine-btn w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-2xl font-bold py-4 rounded-2xl transition-all active:scale-95">
                  {t.checkAnswer}
                </button>
              </>
            )}
          </div>
        ) : done ? (
          <div className="text-center bg-white rounded-3xl p-8 shadow-lg bounce-in">
            <div className="text-6xl mb-4">{score >= 4 ? "🏆" : score >= 2 ? "⭐" : "💪"}</div>
            <p className="text-3xl font-bold text-blue-800 mb-2">{score >= 4 ? t.nc_excellent : score >= 2 ? t.nc_goodJob : t.nc_keepPracticing}</p>
            <p className="text-2xl text-blue-700 mb-6">{t.nc_outOf(score, 5)}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setQuestions(generateQuestions()); setCurrent(0); setScore(0); setDone(false); setShowConfetti(false); setInput(""); }}
                className="bg-blue-500 text-white rounded-full px-6 py-3 font-semibold text-xl hover:bg-blue-600 transition-colors">{t.playAgain}</button>
              <Link href="/" className="bg-gray-200 text-gray-700 rounded-full px-6 py-3 font-semibold text-xl hover:bg-gray-300 transition-colors">{t.home}</Link>
            </div>
          </div>
        ) : <div className="text-center text-2xl text-blue-600">...</div>}
      </div>
    </main>
  );
}
