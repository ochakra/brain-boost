"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { addExercisePoints } from "@/lib/progress";
import type { Badge } from "@/lib/progress";
import { useLang } from "@/components/LanguageProvider";
import { PROMPTS_EN, PROMPTS_HI, PROMPTS_MR } from "@/lib/translations";
import { pickNUnseen } from "@/lib/picker";

const Confetti = dynamic(() => import("@/components/Confetti"), { ssr: false });
const BadgeCelebration = dynamic(() => import("@/components/BadgeCelebration"), { ssr: false });
const PointsPopup = dynamic(() => import("@/components/PointsPopup"), { ssr: false });

const SESSION_SIZE = 5;

export default function MemoryRecallPage() {
  const { t, lang } = useLang();
  const allPrompts = lang === "hi" ? PROMPTS_HI : lang === "mr" ? PROMPTS_MR : PROMPTS_EN;

  const [prompts, setPrompts] = useState<typeof PROMPTS_EN>([]);
  const [answers, setAnswers] = useState<string[]>(Array(SESSION_SIZE).fill(""));
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [pointsKey, setPointsKey] = useState(0);

  useEffect(() => {
    setPrompts(pickNUnseen(`memory-recall-${lang}`, allPrompts, SESSION_SIZE));
    setAnswers(Array(SESSION_SIZE).fill(""));
    setStep(0); setDone(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleNext = () => {
    if (step < prompts.length - 1) { setStep(step + 1); return; }
    const filled = answers.filter(a => a.trim().length > 0).length;
    const pts = 10 + filled * 4;
    const { newBadges: nb } = addExercisePoints("memory-recall", pts);
    setPointsEarned(pts); setPointsKey(k => k + 1); setNewBadges(nb);
    window.dispatchEvent(new Event("progress-updated"));
    setDone(true); setShowConfetti(true);
  };

  const filledCount = answers.filter(a => a.trim().length > 0).length;
  const prompt = prompts[step];

  if (!prompts.length) return <div className="min-h-screen flex items-center justify-center text-2xl">Loading...</div>;

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)" }}>
      {showConfetti && <Confetti />}
      {pointsEarned > 0 && <PointsPopup key={pointsKey} points={pointsEarned} />}
      {newBadges.length > 0 && <BadgeCelebration badges={newBadges} onClose={() => setNewBadges([])} />}

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/" className="text-3xl hover:scale-110 transition-transform">←</Link>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-green-800">{t.mr_title}</h1>
            <p className="text-green-600 text-lg">{t.mr_subtitle}</p>
          </div>
        </div>

        {!done ? (
          <div>
            <div className="flex gap-2 justify-center mb-6">
              {prompts.map((_, i) => <div key={i} className={`w-8 h-3 rounded-full transition-all ${i < step ? "bg-green-500" : i === step ? "bg-green-300" : "bg-gray-200"}`} />)}
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-green-100 mb-4 bounce-in" key={step}>
              <div className="text-5xl text-center mb-4">{prompt?.icon}</div>
              <p className="text-2xl font-semibold text-green-800 text-center mb-4">{prompt?.question}</p>
              <textarea value={answers[step]} onChange={e => { const u = [...answers]; u[step] = e.target.value; setAnswers(u); }}
                placeholder={t.mr_placeholder} rows={4}
                className="w-full border-2 border-green-200 rounded-2xl p-4 text-xl text-gray-700 focus:outline-none focus:border-green-400 resize-none" />
            </div>
            <div className="flex gap-3">
              {step > 0 && <button onClick={() => setStep(step - 1)} className="flex-1 bg-gray-200 text-gray-700 rounded-2xl py-4 text-xl font-semibold hover:bg-gray-300 transition-colors">{t.back}</button>}
              <button onClick={handleNext} className="flex-1 shine-btn bg-green-500 text-white rounded-2xl py-4 text-xl font-bold hover:bg-green-600 active:scale-95 transition-all">
                {step < prompts.length - 1 ? t.next : t.finish}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center bg-white rounded-3xl p-8 shadow-lg bounce-in">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-3xl font-bold text-green-800 mb-2">{t.mr_amazingTitle}</h2>
            <p className="text-xl text-green-700 mb-4">{t.mr_amazingBody(filledCount, prompts.length)}</p>
            <p className="text-gray-600 text-lg mb-6">{t.mr_tip}</p>
            <div className="text-left space-y-3 mb-6">
              {prompts.map((p, i) => answers[i].trim() ? (
                <div key={i} className="bg-green-50 rounded-2xl p-3 border border-green-200">
                  <p className="text-green-700 font-semibold text-sm">{p.icon} {p.question}</p>
                  <p className="text-gray-700 mt-1">{answers[i]}</p>
                </div>
              ) : null)}
            </div>
            <div className="flex gap-3 justify-center">
              <button onClick={() => {
                setPrompts(pickNUnseen(`memory-recall-${lang}`, allPrompts, SESSION_SIZE));
                setAnswers(Array(SESSION_SIZE).fill("")); setStep(0); setDone(false); setShowConfetti(false);
              }} className="bg-green-500 text-white rounded-full px-6 py-3 font-semibold text-xl hover:bg-green-600 transition-colors">{t.tryAgain}</button>
              <Link href="/" className="bg-gray-200 text-gray-700 rounded-full px-6 py-3 font-semibold text-xl hover:bg-gray-300 transition-colors">{t.home}</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
