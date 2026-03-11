"use client";

import { useEffect, useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { endings } from "@/data/endings";
import { AREA_VIDEOS, AREA_BOARD_URL } from "@/data/safetyVideos";
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
  const gameOverAreaId = useGameStore((s) => s.gameOverAreaId);

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
  // gameOverAreaId로 정확한 영역 영상 표시
  const gameOverArea = isGameOver && gameOverAreaId ? allAreas.find((a) => a.id === gameOverAreaId) : null;
  const videos = gameOverAreaId ? (AREA_VIDEOS[gameOverAreaId] ?? []) : [];

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
              <p className="text-sm font-semibold mt-1" style={{ color: "#4a7090" }}>판단력</p>
            </div>
          </div>

          <div className="text-sm font-semibold mb-4" style={{ color: "#4a7090" }}>
            {correctCount}/{totalChoices} 문항 정답
          </div>

          {/* 게임오버 시 영상 학습 링크 */}
          {isGameOver && (
            <div
              className="mb-5 p-4 rounded-xl text-left"
              style={{ background: "rgba(220,38,38,0.06)", border: "1.5px solid rgba(220,38,38,0.22)" }}
            >
              {/* 어느 영역 영상인지 명시 */}
              {gameOverArea && (
                <div className="mb-2">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-black"
                    style={{
                      background: `${gameOverArea.color}15`,
                      border: `1.5px solid ${gameOverArea.color}40`,
                      color: gameOverArea.color,
                    }}
                  >
                    {gameOverArea.icon} {gameOverArea.title} 안전교육 영상
                  </span>
                </div>
              )}

              <p className="text-sm font-black mb-2" style={{ color: "#dc2626" }}>
                📺 영상으로 학습하고 다시 도전해보세요!
              </p>

              {videos.length > 0 ? (
                <div className="flex flex-col gap-2 mb-2">
                  {videos.map((v) => (
                    <a
                      key={v.url}
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-[1.01]"
                      style={{
                        background: "rgba(220,38,38,0.08)",
                        border: "1px solid rgba(220,38,38,0.25)",
                        color: "#b91c1c",
                      }}
                    >
                      ▶ {v.title}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm mb-2" style={{ color: "#1e4a72" }}>
                  아래 링크에서 영역별 영상을 확인하세요.
                </p>
              )}

              <a
                href={AREA_BOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold underline"
                style={{ color: "#4a7090" }}
              >
                🔗 경기도교육청 나침반 5분 안전교육 전체 보기 →
              </a>
            </div>
          )}

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
