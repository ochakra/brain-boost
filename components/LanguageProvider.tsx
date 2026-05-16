"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Lang, TRANSLATIONS, Translations } from "@/lib/translations";

type LangCtx = { lang: Lang; t: Translations; setLang: (l: Lang) => void };
const LangContext = createContext<LangCtx>({
  lang: "en",
  t: TRANSLATIONS.en,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("brain-boost-lang") as Lang | null;
    if (saved && saved in TRANSLATIONS) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("brain-boost-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, t: TRANSLATIONS[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() { return useContext(LangContext); }
