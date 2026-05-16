"use client";
import { useEffect, useState } from "react";
import { Badge } from "@/lib/progress";

export default function BadgeCelebration({ badges, onClose }: { badges: Badge[]; onClose: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => { setVisible(false); onClose(); }, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  if (!visible || badges.length === 0) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4" onClick={() => { setVisible(false); onClose(); }}>
      <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-amber-400 max-w-sm w-full text-center bounce-in">
        <div className="text-5xl mb-3">🎉</div>
        <h2 className="text-2xl font-bold text-amber-800 mb-4">New Badge{badges.length > 1 ? "s" : ""} Earned!</h2>
        <div className="space-y-3">
          {badges.map(b => (
            <div key={b.id} className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3">
              <p className="text-4xl mb-1">{b.emoji}</p>
              <p className="text-xl font-bold text-amber-800">{b.name}</p>
              <p className="text-gray-600">{b.description}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-4">Tap anywhere to continue</p>
      </div>
    </div>
  );
}
