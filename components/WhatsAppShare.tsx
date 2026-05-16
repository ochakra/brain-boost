"use client";
import { useLang } from "@/components/LanguageProvider";

export default function WhatsAppShare() {
  const { t } = useLang();
  const share = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(t.whatsappMsg)}`, "_blank");
  };
  return (
    <button onClick={share} className="shine-btn flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white rounded-2xl py-4 px-6 text-xl font-bold transition-all shadow-lg">
      {t.whatsappBtn}
    </button>
  );
}
