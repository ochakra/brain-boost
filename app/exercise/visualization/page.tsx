"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { addExercisePoints } from "@/lib/progress";
import type { Badge } from "@/lib/progress";
import { useLang } from "@/components/LanguageProvider";

const Confetti = dynamic(() => import("@/components/Confetti"), { ssr: false });
const BadgeCelebration = dynamic(() => import("@/components/BadgeCelebration"), { ssr: false });
const PointsPopup = dynamic(() => import("@/components/PointsPopup"), { ssr: false });

export default function VisualizationPage() {
  const { t } = useLang();
  const journeys = t.viz_journeys;
  const journey = journeys[new Date().getDate() % journeys.length];

  const [step, setStep] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [pointsKey, setPointsKey] = useState(0);

  useEffect(() => {
    if (step < 0 || done) return;
    setTimeLeft(journey.steps[step].duration);
    const interval = setInterval(() => setTimeLeft(t => t <= 1 ? (clearInterval(interval), 0) : t - 1), 1000);
    return () => clearInterval(interval);
  }, [step, journey, done]);

  const goNext = () => {
    if (step + 1 >= journey.steps.length) {
      const pts = 20;
      const { newBadges: nb } = addExercisePoints("visualization", pts);
      setPointsEarned(pts); setPointsKey(k => k+1); setNewBadges(nb);
      window.dispatchEvent(new Event("progress-updated"));
      setDone(true); setShowConfetti(true);
    } else { setStep(step + 1); }
  };

  const currentStep = step >= 0 && step < journey.steps.length ? journey.steps[step] : null;
  const progress = step >= 0 ? ((step + 1) / journey.steps.length) * 100 : 0;

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)" }}>
      {showConfetti && <Confetti />}
      {pointsEarned > 0 && <PointsPopup key={pointsKey} points={pointsEarned} />}
      {newBadges.length > 0 && <BadgeCelebration badges={newBadges} onClose={() => setNewBadges([])} />}

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-3xl hover:scale-110 transition-transform">←</Link>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-pink-800">{t.viz_title}</h1>
            <p className="text-pink-600 text-lg">{journey.title}</p>
          </div>
        </div>

        {step === -1 && !done && (
          <div className="text-center bounce-in">
            <div className="text-8xl mb-6 float">{journey.emoji}</div>
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-pink-100 mb-6">
              <h2 className="text-3xl font-bold text-pink-800 mb-3">{journey.title}</h2>
              <p className="text-xl text-gray-600 mb-4">{journey.steps.length} steps · 20 {t.points} 🌟</p>
              <div className="text-left space-y-2 text-lg text-gray-600">
                <p>{t.viz_comfort1}</p>
                <p>{t.viz_comfort2}</p>
                <p>{t.viz_comfort3}</p>
              </div>
            </div>
            <button onClick={() => setStep(0)} className="shine-btn w-full bg-pink-500 text-white rounded-2xl py-5 text-2xl font-bold hover:bg-pink-600 active:scale-95 transition-all">
              {t.viz_begin} {journey.emoji}
            </button>
          </div>
        )}

        {step >= 0 && !done && currentStep && (
          <div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
              <div className="bg-pink-400 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-pink-100 mb-6 min-h-[200px] flex flex-col items-center justify-center text-center bounce-in" key={step}>
              <div className="text-4xl mb-4">{["🌬️","🌸","🌈","🎵","🌿","💧","⭐"][step % 7]}</div>
              <p className="text-2xl text-gray-800 leading-relaxed">{currentStep.text}</p>
            </div>
            <div className="text-center mb-4">
              <div className="inline-block bg-pink-100 rounded-full px-5 py-2 text-pink-700 font-semibold text-xl">
                {timeLeft > 0 ? `⏱ ${timeLeft}...` : t.viz_readyNext}
              </div>
            </div>
            <button onClick={goNext} className="shine-btn w-full bg-pink-500 text-white rounded-2xl py-4 text-2xl font-bold hover:bg-pink-600 active:scale-95 transition-all">
              {step + 1 >= journey.steps.length ? t.viz_complete : `${t.next.replace("→","").trim()} →`}
            </button>
            <p className="text-center text-gray-400 mt-3">{t.viz_stepOf(step + 1, journey.steps.length)}</p>
          </div>
        )}

        {done && (
          <div className="text-center bg-white rounded-3xl p-8 shadow-lg bounce-in">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-3xl font-bold text-pink-800 mb-2">{t.viz_wonTitle}</h2>
            <p className="text-xl text-pink-700 mb-2">{journey.title}</p>
            <p className="text-gray-600 text-lg mb-6">{t.viz_wonBody}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setStep(-1); setDone(false); setShowConfetti(false); }}
                className="bg-pink-500 text-white rounded-full px-6 py-3 font-semibold text-xl hover:bg-pink-600 transition-colors">{t.viz_doAgain}</button>
              <Link href="/" className="bg-gray-200 text-gray-700 rounded-full px-6 py-3 font-semibold text-xl hover:bg-gray-300 transition-colors">{t.home}</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
