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

  const theme = {
    good:     { border: "rgba(34,197,94,0.35)",   glow: "rgba(34,197,94,0.1)",   btnGrad: "linear-gradient(135deg,#22c55e,#10b981)", btnShadow: "rgba(34,197,94,0.35)",   label: "#4ade80" },
    normal:   { border: "rgba(249,115,22,0.35)",  glow: "rgba(249,115,22,0.08)", btnGrad: "linear-gradient(135deg,#f97316,#fbbf24)", btnShadow: "rgba(249,115,22,0.35)",  label: "#fb923c" },
    bad:      { border: "rgba(251,191,36,0.35)",  glow: "rgba(251,191,36,0.06)", btnGrad: "linear-gradient(135deg,#f59e0b,#f97316)", btnShadow: "rgba(251,191,36,0.3)",   label: "#fbbf24" },
    gameover: { border: "rgba(239,68,68,0.35)",   glow: "rgba(239,68,68,0.08)",  btnGrad: "linear-gradient(135deg,#ef4444,#f97316)", btnShadow: "rgba(239,68,68,0.35)",   label: "#f87171" },
  }[ending.type];

  const accuracyColor =
    accuracy >= 80 ? "#4ade80" : accuracy >= 60 ? "#fbbf24" : "#f87171";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 phase-transition">
      <div
        className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{
          background: "linear-gradient(145deg, #0e1a2e 0%, #080f1e 100%)",
          border: `1px solid ${theme.border}`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 60px ${theme.glow}`,
        }}
      >
        <IllustrationCard
          src={ending.image}
          alt={ending.title}
          className="aspect-[16/9]"
          overlay
        />

        <div className="p-6 md:p-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-black mb-3"
            style={{ color: theme.label }}
          >
            {ending.title}
          </h2>

          <p className="text-sm md:text-base leading-relaxed whitespace-pre-line mb-8" style={{ color: "rgba(240,244,255,0.65)" }}>
            {ending.body}
          </p>

          {/* 결과 스탯 */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-2xl font-black" style={{ color: accuracyColor }}>{accuracy}%</p>
              <p className="text-xs mt-1" style={{ color: "rgba(240,244,255,0.35)" }}>정답률</p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-2xl font-black" style={{ color: "#f87171" }}>
                {life}<span className="text-sm" style={{ color: "rgba(240,244,255,0.25)" }}>/{maxLife}</span>
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(240,244,255,0.35)" }}>생명력</p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-2xl font-black" style={{ color: "#c084fc" }}>
                {mental}<span className="text-sm" style={{ color: "rgba(240,244,255,0.25)" }}>/{maxMental}</span>
              </p>
              <p className="text-xs mt-1" style={{ color: "rgba(240,244,255,0.35)" }}>정신 에너지</p>
            </div>
          </div>

          <div className="text-xs mb-6" style={{ color: "rgba(240,244,255,0.25)" }}>
            {correctCount}/{totalChoices} 문항 정답
          </div>

          <button
            onClick={resetGame}
            className="w-full py-4 rounded-xl font-black text-lg text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: theme.btnGrad,
              boxShadow: `0 8px 24px ${theme.btnShadow}`,
            }}
          >
            🔄 다시 도전하기
          </button>
        </div>
      </div>
    </div>
  );
}
