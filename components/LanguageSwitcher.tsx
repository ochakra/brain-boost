"use client";
import { useLang } from "@/components/LanguageProvider";
import { LANG_FLAGS, LANG_NAMES, Lang } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex gap-2 justify-center">
      {(["en", "hi", "mr"] as Lang[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-lg font-semibold border-2 transition-all ${
            lang === l
              ? "bg-amber-500 text-white border-amber-500 shadow-md"
              : "bg-white text-gray-700 border-gray-200 hover:border-amber-300"
          }`}
        >
          {LANG_FLAGS[l]} {LANG_NAMES[l]}
        </button>
      ))}
    </div>
  );
}
