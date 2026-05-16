"use client";
import { useEffect } from "react";

export default function Confetti() {
  useEffect(() => {
    import("canvas-confetti").then((mod) => {
      const confetti = mod.default;
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    });
  }, []);
  return null;
}
