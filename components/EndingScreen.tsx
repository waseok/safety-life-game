"use client";

import { useEffect, useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import { endings } from "@/data/endings";
import IllustrationCard from "./IllustrationCard";

export default function EndingScreen() {
  const resetGame = useGameStore((s) => s.resetGame);
  const correctCount = useGameStore((s) => s.correctCount);
  const totalChoices = useGameStore((s) => s.totalChoices);
  const life = useGameStore((s) => s.life);
  const mental = useGameStore((s) => s.mental);
  const maxLife = useGameStore((s) => s.maxLife);
  const maxMental = useGameStore((s) => s.maxMental);
  const isGameOver = useGameStore((s) => s.isGameOver);

  const ending = useMemo(() => {
    if (isGameOver) return endings.find((e) => e.type === "gameover")!;
    if (life >= 60 && mental >= 60) return endings.find((e) => e.type === "good")!;
    if (life >= 30 && mental >= 30) return endings.find((e) => e.type === "normal")!;
    return endings.find((e) => e.type === "bad")!;
  }, [life, mental, isGameOver]);

  useEffect(() => {
    if (ending.type === "good") {
      import("canvas-confetti").then((mod) => {
        const confetti = mod.default;
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
        setTimeout(() => {
          confetti({ particleCount: 80, spread: 100, origin: { y: 0.5 } });
        }, 500);
      });
    }
  }, [ending.type]);

  const accuracy = totalChoices > 0 ? Math.round((correctCount / totalChoices) * 100) : 0;

  const borderColor =
    ending.type === "good"
      ? "border-green-500/30"
      : ending.type === "normal"
        ? "border-blue-500/30"
        : ending.type === "bad"
          ? "border-amber-500/30"
          : "border-red-500/30";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 phase-transition">
      <div className={`max-w-2xl w-full game-card overflow-hidden border-2 ${borderColor}`}>
        <IllustrationCard
          src={ending.image}
          alt={ending.title}
          className="aspect-[16/9]"
          overlay
        />

        <div className="p-6 md:p-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white">
            {ending.title}
          </h2>

          <p className="text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line mb-8">
            {ending.body}
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-2xl font-bold text-white">{accuracy}%</p>
              <p className="text-xs text-white/40 mt-1">정답률</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-2xl font-bold text-red-400">
                {life}
                <span className="text-sm text-white/30">/{maxLife}</span>
              </p>
              <p className="text-xs text-white/40 mt-1">생명력</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
              <p className="text-2xl font-bold text-violet-400">
                {mental}
                <span className="text-sm text-white/30">/{maxMental}</span>
              </p>
              <p className="text-xs text-white/40 mt-1">정신 에너지</p>
            </div>
          </div>

          <div className="text-xs text-white/30 mb-6">
            {correctCount}/{totalChoices} 문항 정답
          </div>

          <button
            onClick={resetGame}
            className="w-full py-4 rounded-xl font-bold text-lg
                       bg-gradient-to-r from-blue-600 to-violet-600
                       hover:from-blue-500 hover:to-violet-500
                       transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                       text-white shadow-lg shadow-blue-500/20"
          >
            다시 도전하기
          </button>
        </div>
      </div>
    </div>
  );
}
