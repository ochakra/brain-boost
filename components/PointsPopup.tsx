"use client";
import { useEffect, useState } from "react";

export default function PointsPopup({ points }: { points: number }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="bg-amber-400 text-white text-3xl font-bold rounded-full px-8 py-3 shadow-xl bounce-in">
        +{points} points! ⭐
      </div>
    </div>
  );
}
