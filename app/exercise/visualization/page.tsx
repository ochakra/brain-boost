"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { addExercisePoints } from "@/lib/progress";
import type { Badge } from "@/lib/progress";

const Confetti = dynamic(() => import("@/components/Confetti"), { ssr: false });
const BadgeCelebration = dynamic(() => import("@/components/BadgeCelebration"), { ssr: false });
const PointsPopup = dynamic(() => import("@/components/PointsPopup"), { ssr: false });

const JOURNEYS = [
  { title: "Morning in the Garden", emoji: "🌸", steps: [
    { text: "Close your eyes. Take a deep breath in... and slowly breathe out. Feel your body relax.", duration: 8 },
    { text: "Imagine you are standing in a beautiful garden in the morning. The air is cool and fresh.", duration: 8 },
    { text: "You see colorful flowers around you — red roses, yellow marigolds, pink jasmine. Can you smell them?", duration: 10 },
    { text: "You hear birds singing. A gentle breeze touches your face. The sun is warm and golden.", duration: 10 },
    { text: "Walk slowly along a path in the garden. Notice the green grass under your feet.", duration: 8 },
    { text: "You reach a bench. Sit down, close your eyes (in the visualization), and feel the peace.", duration: 10 },
    { text: "Take three more deep breaths. Feel grateful for this beautiful moment. Slowly open your eyes. 😊", duration: 8 },
  ]},
  { title: "Walk by the River", emoji: "🌊", steps: [
    { text: "Sit comfortably. Close your eyes. Take a slow, deep breath. Let all worries float away.", duration: 8 },
    { text: "You are standing by a gentle river. The water is clear and calm, flowing slowly.", duration: 8 },
    { text: "You hear the soft sound of water over stones. It is peaceful and soothing.", duration: 10 },
    { text: "You see small fish swimming. A butterfly lands near you on a flower.", duration: 10 },
    { text: "The sky above is blue with soft white clouds. You feel completely safe and at peace.", duration: 8 },
    { text: "You dip your hand into the cool water. It feels refreshing and gentle.", duration: 8 },
    { text: "Breathe in the clean river air. Smile. Slowly bring yourself back to the room. 💙", duration: 8 },
  ]},
  { title: "Visit Your Happiest Memory", emoji: "💛", steps: [
    { text: "Find a comfortable position. Close your eyes. Breathe slowly in and out.", duration: 8 },
    { text: "Think of a time when you felt very happy. A family gathering, a celebration, or a peaceful day.", duration: 10 },
    { text: "Picture that moment clearly. Who was there with you? What did they look like?", duration: 10 },
    { text: "What sounds do you hear in this memory? Laughter? Music? The sound of cooking?", duration: 10 },
    { text: "What smells are there? What can you taste? Let the memory feel real and vivid.", duration: 10 },
    { text: "Feel the warmth and joy of that moment fill your heart.", duration: 10 },
    { text: "Carry this feeling with you. Take a gentle breath and slowly open your eyes. 🌟", duration: 8 },
  ]},
];

function getTodayJourney() { return JOURNEYS[new Date().getDate() % JOURNEYS.length]; }

export default function VisualizationPage() {
  const journey = getTodayJourney();
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
      setPointsEarned(pts); setPointsKey(k => k+1);
      setNewBadges(nb);
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
            <h1 className="text-3xl font-bold text-pink-800">🧘 Mind Journey</h1>
            <p className="text-pink-600 text-lg">{journey.title}</p>
          </div>
        </div>

        {step === -1 && !done && (
          <div className="text-center bounce-in">
            <div className="text-8xl mb-6 float">{journey.emoji}</div>
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-pink-100 mb-6">
              <h2 className="text-3xl font-bold text-pink-800 mb-3">{journey.title}</h2>
              <p className="text-xl text-gray-600 mb-4">A gentle {journey.steps.length}-step guided visualization. Earn 20 points! 🌟</p>
              <div className="text-left space-y-2 text-lg text-gray-600">
                <p>✅ Find a comfortable chair</p>
                <p>✅ 5 quiet minutes for yourself</p>
                <p>✅ Read or close your eyes</p>
              </div>
            </div>
            <button onClick={() => setStep(0)} className="shine-btn w-full bg-pink-500 text-white rounded-2xl py-5 text-2xl font-bold hover:bg-pink-600 active:scale-95 transition-all">
              Begin Journey {journey.emoji}
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
                {timeLeft > 0 ? `⏱ ${timeLeft} seconds...` : "Ready for next step"}
              </div>
            </div>
            <button onClick={goNext} className="shine-btn w-full bg-pink-500 text-white rounded-2xl py-4 text-2xl font-bold hover:bg-pink-600 active:scale-95 transition-all">
              {step + 1 >= journey.steps.length ? "Complete Journey ✓" : "Next Step →"}
            </button>
            <p className="text-center text-gray-400 mt-3">Step {step + 1} of {journey.steps.length}</p>
          </div>
        )}

        {done && (
          <div className="text-center bg-white rounded-3xl p-8 shadow-lg bounce-in">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-3xl font-bold text-pink-800 mb-2">Wonderful!</h2>
            <p className="text-xl text-pink-700 mb-2">You completed your Mind Journey!</p>
            <p className="text-gray-600 text-lg mb-6">Visualization exercises strengthen your memory and reduce stress. You are taking great care of your brain! 🧠</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setStep(-1); setDone(false); setShowConfetti(false); }}
                className="bg-pink-500 text-white rounded-full px-6 py-3 font-semibold text-xl hover:bg-pink-600 transition-colors">Do it Again 🔄</button>
              <Link href="/" className="bg-gray-200 text-gray-700 rounded-full px-6 py-3 font-semibold text-xl hover:bg-gray-300 transition-colors">Home 🏠</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
