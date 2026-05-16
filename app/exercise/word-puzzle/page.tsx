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

const WORDS_EN = [
  { word: "BRAIN", hint: "The organ inside your head that controls everything 🧠" },
  { word: "SMILE", hint: "What your face does when you are happy 😊" },
  { word: "MUSIC", hint: "Beautiful sounds you listen to 🎵" },
  { word: "HEART", hint: "The organ that pumps blood and feels love ❤️" },
  { word: "LIGHT", hint: "What the sun gives us every morning ☀️" },
  { word: "PEACE", hint: "A calm and quiet feeling inside 🕊️" },
  { word: "GARDEN", hint: "A place where flowers and vegetables grow 🌸" },
  { word: "FRIEND", hint: "Someone you love spending time with 🤝" },
  { word: "MEMORY", hint: "When you remember something from the past 💭" },
  { word: "WISDOM", hint: "Knowledge gained from many years of life 📚" },
];
const WORDS_HI = [
  { word: "KHUSHI",  hint: "खुशी — जब मन में आनंद हो 😊" },
  { word: "PYAAR",   hint: "प्यार — जो दिल से महसूस होता है ❤️" },
  { word: "SHANTI",  hint: "शांति — मन का सुकून 🕊️" },
  { word: "UMEED",   hint: "उम्मीद — भविष्य पर भरोसा 🌟" },
  { word: "SUNDAR",  hint: "सुंदर — जो देखने में अच्छा लगे 🌸" },
  { word: "MITRATA", hint: "मित्रता — दोस्ती का एक और नाम 🤝" },
];
const WORDS_MR = [
  { word: "ANAND",   hint: "आनंद — मनातील आनंद 😊" },
  { word: "PREM",    hint: "प्रेम — हृदयातून जाणवते ❤️" },
  { word: "SHANTI",  hint: "शांती — मनाची शांतता 🕊️" },
  { word: "AASHA",   hint: "आशा — भविष्यावरचा विश्वास 🌟" },
  { word: "SUNDAR",  hint: "सुंदर — पाहायला छान वाटते 🌸" },
  { word: "MAITRI",  hint: "मैत्री — मित्रत्वाचे नाव 🤝" },
];

const MAX_GUESSES = 6;

function getLetterStatus(guess: string, word: string) {
  const result: ("correct"|"present"|"absent")[] = Array(guess.length).fill("absent");
  const wordArr = word.split(""), guessArr = guess.split(""), used = Array(word.length).fill(false);
  for (let i = 0; i < guessArr.length; i++) {
    if (guessArr[i] === wordArr[i]) { result[i] = "correct"; used[i] = true; }
  }
  for (let i = 0; i < guessArr.length; i++) {
    if (result[i] === "correct") continue;
    for (let j = 0; j < wordArr.length; j++) {
      if (!used[j] && guessArr[i] === wordArr[j]) { result[i] = "present"; used[j] = true; break; }
    }
  }
  return result;
}

const TILE = {
  correct: "bg-green-500 text-white border-green-500",
  present: "bg-amber-400 text-white border-amber-400",
  absent:  "bg-gray-400 text-white border-gray-400",
  empty:   "bg-white text-gray-800 border-gray-300",
  active:  "bg-white text-gray-800 border-gray-500",
};

export default function WordPuzzlePage() {
  const { t, lang } = useLang();
  const WORDS = lang === "hi" ? WORDS_HI : lang === "mr" ? WORDS_MR : WORDS_EN;
  const { word, hint } = WORDS[new Date().getDate() % WORDS.length];
  const wordLen = word.length;

  const [guesses, setGuesses] = useState<string[]>([]);
  const [current, setCurrent] = useState("");
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [shake, setShake] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);
  const [pointsEarned, setPointsEarned] = useState(0);
  const [pointsKey, setPointsKey] = useState(0);

  const awardPoints = useCallback((guessCount: number) => {
    const pts = Math.max(10, 30 - (guessCount - 1) * 4);
    const { newBadges: nb } = addExercisePoints("word-puzzle", pts);
    setPointsEarned(pts); setPointsKey(k => k + 1); setNewBadges(nb);
    window.dispatchEvent(new Event("progress-updated"));
  }, []);

  const submit = useCallback(() => {
    if (current.length !== wordLen) { setShake(true); setTimeout(() => setShake(false), 400); return; }
    const newGuesses = [...guesses, current];
    setGuesses(newGuesses); setCurrent("");
    if (current === word) { setWon(true); awardPoints(newGuesses.length); }
    else if (newGuesses.length >= MAX_GUESSES) setLost(true);
  }, [current, guesses, word, wordLen, awardPoints]);

  const handleKey = useCallback((key: string) => {
    if (won || lost) return;
    if (key === "ENTER") { submit(); return; }
    if (key === "DEL") { setCurrent(c => c.slice(0, -1)); return; }
    if (/^[A-Z]$/.test(key) && current.length < wordLen) setCurrent(c => c + key);
  }, [won, lost, submit, current, wordLen]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k === "ENTER") handleKey("ENTER");
      else if (k === "BACKSPACE") handleKey("DEL");
      else if (/^[A-Z]$/.test(k)) handleKey(k);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [handleKey]);

  const KEYS = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["ENTER","Z","X","C","V","B","N","M","DEL"],
  ];

  const usedLetters: Record<string, "correct"|"present"|"absent"> = {};
  guesses.forEach(g => {
    getLetterStatus(g, word).forEach((s, i) => {
      const ch = g[i];
      if (!usedLetters[ch] || (usedLetters[ch] !== "correct" && s === "correct") || (usedLetters[ch] === "absent" && s === "present"))
        usedLetters[ch] = s;
    });
  });

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)" }}>
      {won && <Confetti />}
      {pointsEarned > 0 && <PointsPopup key={pointsKey} points={pointsEarned} />}
      {newBadges.length > 0 && <BadgeCelebration badges={newBadges} onClose={() => setNewBadges([])} />}

      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/" className="text-3xl hover:scale-110 transition-transform">←</Link>
          <div className="flex-1 text-center">
            <h1 className="text-3xl font-bold text-purple-800">{t.wp_title}</h1>
            <p className="text-purple-600 text-lg">{t.wp_subtitle(wordLen)}</p>
          </div>
        </div>

        <div className="text-center mb-4">
          <button onClick={() => setShowHint(!showHint)} className="bg-purple-100 border-2 border-purple-300 rounded-full px-5 py-2 text-purple-700 font-semibold text-lg hover:bg-purple-200 transition-colors">
            {showHint ? t.wp_hideHint : t.wp_showHint}
          </button>
          {showHint && <div className="mt-3 bg-white rounded-2xl p-4 border-2 border-purple-200 text-purple-800 text-lg bounce-in">{hint}</div>}
        </div>

        <div className={`flex flex-col items-center gap-2 mb-6 ${shake ? "wiggle" : ""}`}>
          {Array.from({ length: MAX_GUESSES }).map((_, row) => {
            const guess = guesses[row], isActive = row === guesses.length;
            return (
              <div key={row} className="flex gap-2">
                {Array.from({ length: wordLen }).map((_, col) => {
                  let letter = "", style = TILE.empty;
                  if (guess) { letter = guess[col] ?? ""; style = TILE[getLetterStatus(guess, word)[col]]; }
                  else if (isActive) { letter = current[col] ?? ""; style = letter ? TILE.active : TILE.empty; }
                  return <div key={col} className={`w-12 h-12 border-2 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300 ${style}`}>{letter}</div>;
                })}
              </div>
            );
          })}
        </div>

        {won && (
          <div className="text-center bg-green-100 border-2 border-green-400 rounded-3xl p-5 mb-4 bounce-in">
            <div className="text-5xl mb-2">🎉</div>
            <p className="text-2xl font-bold text-green-800">{t.wp_won}</p>
            <p className="text-green-700 text-lg mt-1">{t.wp_wordWas} <strong>{word}</strong></p>
            <Link href="/" className="mt-3 inline-block bg-green-500 text-white rounded-full px-6 py-2 font-semibold text-lg hover:bg-green-600 transition-colors">{t.wp_backToHome}</Link>
          </div>
        )}
        {lost && !won && (
          <div className="text-center bg-red-50 border-2 border-red-300 rounded-3xl p-5 mb-4 bounce-in">
            <div className="text-5xl mb-2">😊</div>
            <p className="text-2xl font-bold text-red-700">{t.wp_lostTitle}</p>
            <p className="text-3xl font-bold text-red-800 mt-1">{word}</p>
            <p className="text-gray-600 mt-1">{hint}</p>
            <Link href="/" className="mt-3 inline-block bg-purple-500 text-white rounded-full px-6 py-2 font-semibold text-lg hover:bg-purple-600 transition-colors">{t.wp_backToHome}</Link>
          </div>
        )}

        {!won && !lost && (
          <div className="flex flex-col items-center gap-2">
            {KEYS.map((row, ri) => (
              <div key={ri} className="flex gap-1.5">
                {row.map((key) => {
                  const status = usedLetters[key];
                  let style = "bg-gray-200 text-gray-800";
                  if (status === "correct") style = "bg-green-500 text-white";
                  else if (status === "present") style = "bg-amber-400 text-white";
                  else if (status === "absent") style = "bg-gray-400 text-white";
                  return (
                    <button key={key} onClick={() => handleKey(key)}
                      className={`${style} ${key === "ENTER" || key === "DEL" ? "px-3 text-sm" : "w-9"} h-12 rounded-lg font-bold text-base hover:opacity-80 active:scale-95 transition-all`}>
                      {key === "DEL" ? "⌫" : key}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
