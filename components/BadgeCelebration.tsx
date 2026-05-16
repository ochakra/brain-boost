"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/lib/progress";
import { useLang } from "@/components/LanguageProvider";

export default function BadgeCelebration({ badges, onClose }: { badges: Badge[]; onClose: () => void }) {
  const { t } = useLang();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => { setVisible(false); onClose(); }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible || badges.length === 0) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4" onClick={() => { setVisible(false); onClose(); }}>
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-amber-400 max-w-sm w-full text-center bounce-in">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-amber-800 mb-4">
          {t.badge_newTitle}{badges.length > 1 ? "" : ""}
        </h2>
        <div className="space-y-3">
          {badges.map(b => (
            <div key={b.id} className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3">
              <p className="text-4xl mb-1">{b.emoji}</p>
              <p className="text-xl font-bold text-amber-800">{t.badgeNames[b.id]?.name ?? b.name}</p>
              <p className="text-gray-600">{t.badgeNames[b.id]?.description ?? b.description}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-4">{t.badge_tapToContinue}</p>
      </div>
    </div>
  );
}
