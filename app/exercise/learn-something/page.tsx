"use client";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { addExercisePoints } from "@/lib/progress";
import type { Badge } from "@/lib/progress";
import { useLang } from "@/components/LanguageProvider";

const Confetti = dynamic(() => import("@/components/Confetti"), { ssr: false });
const BadgeCelebration = dynamic(() => import("@/components/BadgeCelebration"), { ssr: false });
const PointsPopup = dynamic(() => import("@/components/PointsPopup"), { ssr: false });

type Lesson = { id: string; category: string; flag: string; words: { word: string; script?: string; meaning: string; example: string }[] };

const LESSONS: Lesson[] = [
  { id: "hindi", category: "Hindi / हिंदी", flag: "🇮🇳", words: [
    { word: "Khushi",    script: "खुशी",     meaning: "Happiness / Joy",   example: "Aaj bahut khushi hai! (There is so much joy today!)" },
    { word: "Pyaar",     script: "प्यार",    meaning: "Love",               example: "Pyaar sabse badi cheez hai. (Love is the greatest thing.)" },
    { word: "Shanti",    script: "शांति",    meaning: "Peace / Calm",       example: "Mann mein shanti raho. (Keep peace in your heart.)" },
    { word: "Umeed",     script: "उम्मीद",   meaning: "Hope",               example: "Umeed pe duniya kayam hai. (The world stands on hope.)" },
    { word: "Sundar",    script: "सुंदर",    meaning: "Beautiful",          example: "Yeh phool bahut sundar hai. (This flower is very beautiful.)" },
    { word: "Dhanyavaad",script: "धन्यवाद",  meaning: "Thank you",          example: "Aapka bahut dhanyavaad! (Thank you very much!)" },
  ]},
  { id: "marathi", category: "Marathi / मराठी", flag: "🪔", words: [
    { word: "Anand",     script: "आनंद",     meaning: "Joy / Happiness",    example: "Mala khup anand zala! (I felt so much joy!)" },
    { word: "Prem",      script: "प्रेम",    meaning: "Love",               example: "Prem he jeevanache sar aahe. (Love is the essence of life.)" },
    { word: "Shanti",    script: "शांती",    meaning: "Peace",              example: "Manala shanti mila. (The mind found peace.)" },
    { word: "Aasha",     script: "आशा",      meaning: "Hope",               example: "Aasha sodoo naka. (Never give up hope.)" },
    { word: "Sundar",    script: "सुंदर",    meaning: "Beautiful",          example: "Ha nisar khup sundar aahe. (This scenery is very beautiful.)" },
    { word: "Dhanyawad", script: "धन्यवाद",  meaning: "Thank you",          example: "Tumchya madatisathi dhanyawad! (Thank you for your help!)" },
  ]},
  { id: "spanish", category: "Spanish / Español", flag: "🇪🇸", words: [
    { word: "Feliz",     meaning: "Happy",        example: "¡Estoy feliz! (I am happy!)" },
    { word: "Gracias",   meaning: "Thank you",    example: "¡Muchas gracias! (Thank you very much!)" },
    { word: "Amigo",     meaning: "Friend",       example: "Mi amigo es muy bueno. (My friend is very good.)" },
    { word: "Corazón",   meaning: "Heart",        example: "Te quiero con todo mi corazón. (I love you with all my heart.)" },
    { word: "Paz",       meaning: "Peace",        example: "Vivo en paz. (I live in peace.)" },
    { word: "Hermoso",   meaning: "Beautiful",    example: "¡Qué día tan hermoso! (What a beautiful day!)" },
  ]},
  { id: "english", category: "Beautiful English", flag: "📚", words: [
    { word: "Serendipity", meaning: "Finding something wonderful by surprise",   example: "Meeting an old friend on a walk — that is serendipity!" },
    { word: "Euphoria",    meaning: "A feeling of extreme happiness",            example: "Holding your grandchild fills you with euphoria." },
    { word: "Tranquil",    meaning: "Peaceful and quiet",                        example: "A tranquil morning by the garden." },
    { word: "Cherish",     meaning: "To love and protect something deeply",      example: "I cherish every moment with my family." },
    { word: "Radiant",     meaning: "Glowing with joy or health",                example: "She had a radiant smile." },
    { word: "Wisdom",      meaning: "Deep understanding gained over a lifetime", example: "With age comes wisdom." },
  ]},
  { id: "science", category: "Fun Science / विज्ञान", flag: "🔬", words: [
    { word: "Neurons",        meaning: "Brain cells that send messages",         example: "You have about 86 billion neurons in your brain!" },
    { word: "Photosynthesis", meaning: "How plants make food from sunlight",     example: "Trees use sunlight, water and air to grow!" },
    { word: "Gravity",        meaning: "The force that pulls things down",       example: "Gravity keeps us on the ground!" },
    { word: "Oxygen",         meaning: "The gas we breathe to stay alive",       example: "Trees produce the oxygen we breathe every day." },
    { word: "Hibernation",    meaning: "A deep winter sleep some animals take",  example: "Bears hibernate through the cold winter months." },
    { word: "Echo",           meaning: "A sound that bounces back to you",       example: "Shout near a mountain and you will hear an echo!" },
  ]},
];

const WORDS_PER_SESSION = 3;

export default function LearnSomethingPage() {
  const { t } = useLang();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [learned, setLearned] = useState<number[]>([]);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [pointsKey, setPointsKey] = useState(0);

  const lesson = LESSONS.find(l => l.id === selectedId) ?? null;
  const offset = lesson ? (new Date().getDate() * 2) % Math.max(1, lesson.words.length - WORDS_PER_SESSION + 1) : 0;
  const sessionWords = lesson ? lesson.words.slice(offset, offset + WORDS_PER_SESSION) : [];

  const reset = () => { setWordIndex(0); setFlipped(false); setDone(false); setLearned([]); setShowConfetti(false); };

  const markLearned = () => {
    const newLearned = [...learned, wordIndex];
    setLearned(newLearned);
    if (wordIndex + 1 >= sessionWords.length) {
      const pts = 10 * newLearned.length;
      const { newBadges: nb } = addExercisePoints("learn-something", pts);
      setPointsEarned(pts); setPointsKey(k => k + 1); setNewBadges(nb);
      window.dispatchEvent(new Event("progress-updated"));
      setDone(true); setShowConfetti(true);
    } else { setWordIndex(wordIndex + 1); setFlipped(false); }
  };

  const word = lesson ? sessionWords[wordIndex] : null;

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #ffedd5 0%, #fef3c7 100%)" }}>
      {showConfetti && <Confetti />}
      {pointsEarned > 0 && <PointsPopup key={pointsKey} points={pointsEarned} />}
      {newBadges.length > 0 && <BadgeCelebration badges={newBadges} onClose={() => setNewBadges([])} />}

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          {lesson && !done
            ? <button onClick={() => { setSelectedId(null); reset(); }} className="text-3xl hover:scale-110 transition-transform">←</button>
            : <Link href="/" className="text-3xl hover:scale-110 transition-transform">←</Link>}
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-orange-800">{t.ls_title}</h1>
            <p className="text-orange-600 text-lg">{lesson ? `${lesson.flag} ${lesson.category}` : t.ls_choosePrompt}</p>
          </div>
        </div>

        {!lesson && (
          <div className="space-y-3 bounce-in">
            <p className="text-center text-gray-600 text-xl mb-5">{t.chooseLanguage}</p>
            {LESSONS.map(l => (
              <button key={l.id} onClick={() => { setSelectedId(l.id); reset(); }}
                className="w-full bg-white border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 rounded-3xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left">
                <span className="text-4xl">{l.flag}</span>
                <div>
                  <p className="text-2xl font-bold text-orange-800">{l.category}</p>
                  <p className="text-gray-500 text-lg">{l.words.length} words · {WORDS_PER_SESSION} per session</p>
                </div>
                <span className="ml-auto text-2xl text-gray-300">›</span>
              </button>
            ))}
          </div>
        )}

        {lesson && !done && word && (
          <div>
            <div className="flex gap-2 justify-center mb-6">
              {sessionWords.map((_, i) => <div key={i} className={`w-8 h-3 rounded-full transition-all ${learned.includes(i) ? "bg-orange-500" : i === wordIndex ? "bg-orange-300" : "bg-gray-200"}`} />)}
            </div>
            <div onClick={() => setFlipped(!flipped)} className="cursor-pointer select-none">
              <div className={`bg-white rounded-3xl p-8 shadow-xl border-2 transition-all duration-300 min-h-[240px] flex flex-col items-center justify-center text-center ${flipped ? "border-orange-400 bg-orange-50" : "border-orange-100"}`}>
                {!flipped ? (
                  <div className="bounce-in">
                    <p className="text-gray-400 text-lg mb-2">{t.ls_todaysWord}</p>
                    <p className="text-5xl font-bold text-orange-700 mb-2">{word.word}</p>
                    {word.script && <p className="text-3xl text-orange-400 mb-3">{word.script}</p>}
                    <p className="text-gray-400 text-lg">{t.ls_tapToReveal}</p>
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
            <p className="text-center text-gray-500 mt-3 mb-5 text-lg">{!flipped ? t.ls_tapToReveal : t.ls_readAloud}</p>
            {flipped && (
              <button onClick={markLearned} className="shine-btn w-full bg-orange-500 text-white rounded-2xl py-4 text-2xl font-bold hover:bg-orange-600 active:scale-95 transition-all bounce-in">
                {t.ls_iLearned}
              </button>
            )}
          </div>
        )}

        {done && lesson && (
          <div className="text-center bg-white rounded-3xl p-8 shadow-lg bounce-in">
            <div className="text-6xl mb-4">🎓</div>
            <h2 className="text-3xl font-bold text-orange-800 mb-2">{t.ls_learnedTitle(sessionWords.length)}</h2>
            <p className="text-xl text-orange-600 mb-4">{lesson.flag} {lesson.category}</p>
            <div className="text-left space-y-3 mb-6">
              {sessionWords.map((w, i) => (
                <div key={i} className="bg-orange-50 rounded-2xl p-3 border border-orange-200">
                  <span className="font-bold text-orange-800">{w.word}</span>
                  {w.script && <span className="text-orange-400 ml-2">{w.script}</span>}
                  <span className="text-gray-600"> — {w.meaning}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mb-5">{t.ls_tryWord}</p>
            <div className="flex flex-col gap-3">
              <button onClick={reset} className="bg-orange-500 text-white rounded-full px-6 py-3 font-semibold text-xl hover:bg-orange-600 transition-colors">{t.reviewAgain}</button>
              <button onClick={() => { setSelectedId(null); reset(); }} className="bg-amber-100 text-amber-800 rounded-full px-6 py-3 font-semibold text-xl hover:bg-amber-200 transition-colors">{t.tryAnotherLanguage}</button>
              <Link href="/" className="bg-gray-200 text-gray-700 rounded-full px-6 py-3 font-semibold text-xl hover:bg-gray-300 transition-colors text-center">{t.home}</Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
