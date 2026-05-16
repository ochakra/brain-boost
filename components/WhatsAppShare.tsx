"use client";
import { useLang } from "@/components/LanguageProvider";

export default function WhatsAppShare() {
  const { t } = useLang();

  const share = async () => {
    const appUrl = typeof window !== "undefined" ? window.location.origin : "";
    const text = `${t.whatsappMsg}\n\n🔗 ${appUrl}`;

    // Use native share sheet on mobile (works with WhatsApp, iMessage, etc.)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // User cancelled or share failed — fall through to wa.me
      }
    }

    // Desktop fallback: open WhatsApp web
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <button
      onClick={share}
      className="shine-btn flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 active:scale-95 text-white rounded-2xl py-4 px-6 text-xl font-bold transition-all shadow-lg"
    >
      {t.whatsappBtn}
    </button>
  );
}
