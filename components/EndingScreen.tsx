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
    good:     { border: "rgba(22,163,74,0.4)",  bg: "rgba(22,163,74,0.06)",   btnGrad: "linear-gradient(135deg,#16a34a,#0d9488)",  btnShadow: "rgba(22,163,74,0.35)",   labelColor: "#15803d",  statBg: "rgba(22,163,74,0.08)" },
    normal:   { border: "rgba(245,158,11,0.4)", bg: "rgba(245,158,11,0.05)", btnGrad: "linear-gradient(135deg,#f59e0b,#f97316)",  btnShadow: "rgba(245,158,11,0.35)", labelColor: "#b45309",  statBg: "rgba(245,158,11,0.08)" },
    bad:      { border: "rgba(220,38,38,0.4)",  bg: "rgba(220,38,38,0.05)",  btnGrad: "linear-gradient(135deg,#dc2626,#f97316)",  btnShadow: "rgba(220,38,38,0.3)",   labelColor: "#b91c1c",  statBg: "rgba(220,38,38,0.07)" },
    gameover: { border: "rgba(220,38,38,0.5)",  bg: "rgba(220,38,38,0.06)",  btnGrad: "linear-gradient(135deg,#dc2626,#9f1239)",  btnShadow: "rgba(220,38,38,0.4)",   labelColor: "#991b1b",  statBg: "rgba(220,38,38,0.08)" },
  }[ending.type];

  const accuracyColor = accuracy >= 80 ? "#16a34a" : accuracy >= 60 ? "#d97706" : "#dc2626";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 phase-transition">
      <div
        className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-lg"
        style={{
          background: "#ffffff",
          border: `2px solid ${theme.border}`,
          boxShadow: `0 12px 40px ${theme.bg}`,
        }}
      >
        <IllustrationCard
          src={ending.image}
          alt={ending.title}
          className="aspect-[16/9]"
          overlay
        />

        <div className="p-6 md:p-8 text-center" style={{ background: theme.bg }}>
          <h2
            className="text-3xl md:text-4xl font-black mb-3"
            style={{ color: theme.labelColor }}
          >
            {ending.title}
          </h2>

          <p className="text-base md:text-lg leading-relaxed whitespace-pre-line mb-8" style={{ color: "#1e4a72" }}>
            {ending.body}
          </p>

          {/* 결과 스탯 */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(2,132,199,0.06)", border: "1.5px solid rgba(2,132,199,0.2)" }}
            >
              <p className="text-2xl font-black" style={{ color: accuracyColor }}>{accuracy}%</p>
              <p className="text-sm font-semibold mt-1" style={{ color: "#4a7090" }}>정답률</p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(22,163,74,0.06)", border: "1.5px solid rgba(22,163,74,0.2)" }}
            >
              <p className="text-2xl font-black" style={{ color: "#16a34a" }}>
                {life}<span className="text-sm font-normal" style={{ color: "#4a7090" }}>/{maxLife}</span>
              </p>
              <p className="text-sm font-semibold mt-1" style={{ color: "#4a7090" }}>생명력</p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(2,132,199,0.06)", border: "1.5px solid rgba(2,132,199,0.2)" }}
            >
              <p className="text-2xl font-black" style={{ color: "#0284c7" }}>
                {mental}<span className="text-sm font-normal" style={{ color: "#4a7090" }}>/{maxMental}</span>
              </p>
              <p className="text-sm font-semibold mt-1" style={{ color: "#4a7090" }}>정신 에너지</p>
            </div>
          </div>

          <div className="text-sm font-semibold mb-6" style={{ color: "#4a7090" }}>
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
