"use client";

import { useEffect, useMemo, useRef } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { endings } from "@/data/endings";
import { AREA_VIDEOS, AREA_BOARD_URL } from "@/data/safetyVideos";
import IllustrationCard from "./IllustrationCard";

export default function EndingScreen() {
  const resetGame = useGameStore((s) => s.resetGame);
  const saveScore = useGameStore((s) => s.saveScore);
  const correctCount = useGameStore((s) => s.correctCount);
  const totalChoices = useGameStore((s) => s.totalChoices);
  const life = useGameStore((s) => s.life);
  const mental = useGameStore((s) => s.mental);
  const maxLife = useGameStore((s) => s.maxLife);
  const maxMental = useGameStore((s) => s.maxMental);
  const isGameOver = useGameStore((s) => s.isGameOver);
  const gameOverAreaId = useGameStore((s) => s.gameOverAreaId);
  const playerName = useGameStore((s) => s.playerName);
  const rankings = useGameStore((s) => s.rankings);

  const saved = useRef(false);

  const ending = useMemo(() => {
    if (isGameOver) return endings.find((e) => e.type === "gameover")!;
    if (life >= 60 && mental >= 60) return endings.find((e) => e.type === "good")!;
    if (life >= 30 && mental >= 30) return endings.find((e) => e.type === "normal")!;
    return endings.find((e) => e.type === "bad")!;
  }, [life, mental, isGameOver]);

  useEffect(() => {
    if (!saved.current) {
      saveScore();
      saved.current = true;
    }
  }, [saveScore]);

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
  const finalScore = life + mental + (correctCount * 10);

  const theme = {
    good:     { border: "rgba(22,163,74,0.4)",  bg: "rgba(22,163,74,0.06)",   btnGrad: "linear-gradient(135deg,#16a34a,#0d9488)",  btnShadow: "rgba(22,163,74,0.35)",   labelColor: "#15803d" },
    normal:   { border: "rgba(26,111,181,0.4)", bg: "rgba(26,111,181,0.05)", btnGrad: "linear-gradient(135deg,#1a6fb5,#42a5f5)",  btnShadow: "rgba(26,111,181,0.35)", labelColor: "#1565c0" },
    bad:      { border: "rgba(211,47,47,0.4)",  bg: "rgba(211,47,47,0.05)",  btnGrad: "linear-gradient(135deg,#d32f2f,#ff7043)",  btnShadow: "rgba(211,47,47,0.3)",   labelColor: "#c62828" },
    gameover: { border: "rgba(211,47,47,0.5)",  bg: "rgba(211,47,47,0.06)",  btnGrad: "linear-gradient(135deg,#d32f2f,#c62828)",  btnShadow: "rgba(211,47,47,0.4)",   labelColor: "#b71c1c" },
  }[ending.type];

  const accuracyColor = accuracy >= 80 ? "#0d8a6a" : accuracy >= 60 ? "#ffa726" : "#d32f2f";
  const gameOverArea = isGameOver && gameOverAreaId ? allAreas.find((a) => a.id === gameOverAreaId) : null;
  const videos = gameOverAreaId ? (AREA_VIDEOS[gameOverAreaId] ?? []) : [];

  const myRank = rankings.findIndex((r) => r.name === playerName && r.score === finalScore) + 1;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 phase-transition">
      <div
        className="max-w-3xl w-full rounded-2xl overflow-hidden shadow-lg"
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
            className="text-3xl md:text-4xl font-black mb-1"
            style={{ color: theme.labelColor }}
          >
            {ending.title}
          </h2>

          {playerName && (
            <p className="text-base font-bold text-on-surface/60 mb-3">
              {playerName}님의 결과
            </p>
          )}

          <p className="text-base md:text-lg leading-relaxed whitespace-pre-line mb-6" style={{ color: "#1a4a6e" }}>
            {ending.body}
          </p>

          {/* 최종 점수 */}
          <div className="mb-6 p-5 rounded-2xl" style={{ background: "rgba(26,111,181,0.06)", border: "2px solid rgba(26,111,181,0.15)" }}>
            <p className="text-sm font-bold text-primary/60 mb-1">최종 점수</p>
            <p className="text-5xl font-black text-primary">{finalScore}<span className="text-lg font-bold text-primary/40">점</span></p>
            {myRank > 0 && (
              <p className="text-sm font-bold mt-2" style={{ color: "#ffa726" }}>
                🏆 전체 {myRank}위
              </p>
            )}
          </div>

          {/* 결과 스탯 */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="rounded-xl p-4" style={{ background: "rgba(26,111,181,0.06)", border: "1.5px solid rgba(26,111,181,0.15)" }}>
              <p className="text-2xl font-black" style={{ color: accuracyColor }}>{accuracy}%</p>
              <p className="text-sm font-semibold mt-1" style={{ color: "#5a7a94" }}>정답률</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(13,138,106,0.06)", border: "1.5px solid rgba(13,138,106,0.15)" }}>
              <p className="text-2xl font-black" style={{ color: "#0d8a6a" }}>
                {life}<span className="text-sm font-normal" style={{ color: "#5a7a94" }}>/{maxLife}</span>
              </p>
              <p className="text-sm font-semibold mt-1" style={{ color: "#5a7a94" }}>생명력</p>
            </div>
            <div className="rounded-xl p-4" style={{ background: "rgba(26,111,181,0.06)", border: "1.5px solid rgba(26,111,181,0.15)" }}>
              <p className="text-2xl font-black" style={{ color: "#1a6fb5" }}>
                {mental}<span className="text-sm font-normal" style={{ color: "#5a7a94" }}>/{maxMental}</span>
              </p>
              <p className="text-sm font-semibold mt-1" style={{ color: "#5a7a94" }}>판단력</p>
            </div>
          </div>

          <div className="text-sm font-semibold mb-4" style={{ color: "#5a7a94" }}>
            {correctCount}/{totalChoices} 문항 정답
          </div>

          {/* 랭킹 미니 보드 */}
          {rankings.length > 0 && (
            <div className="mb-5 p-4 rounded-xl text-left" style={{ background: "rgba(26,111,181,0.04)", border: "1.5px solid rgba(26,111,181,0.12)" }}>
              <p className="text-sm font-black text-primary mb-3">🏆 랭킹 Top 5</p>
              <div className="space-y-2">
                {rankings.slice(0, 5).map((r, i) => (
                  <div
                    key={`${r.name}-${i}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      r.name === playerName && r.score === finalScore ? "bg-primary/10 border border-primary/20" : ""
                    }`}
                  >
                    <span className="font-black text-primary w-6">{i + 1}</span>
                    <span className="flex-1 font-bold text-on-surface">{r.name}</span>
                    <span className="font-black text-primary">{r.score}점</span>
                    <span className="text-xs text-on-surface/40">{r.accuracy}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 게임오버 시 영상 학습 링크 */}
          {isGameOver && (
            <div
              className="mb-5 p-4 rounded-xl text-left"
              style={{ background: "rgba(211,47,47,0.06)", border: "1.5px solid rgba(211,47,47,0.22)" }}
            >
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

              <p className="text-sm font-black mb-2" style={{ color: "#d32f2f" }}>
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
                        background: "rgba(211,47,47,0.08)",
                        border: "1px solid rgba(211,47,47,0.25)",
                        color: "#c62828",
                      }}
                    >
                      ▶ {v.title}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-sm mb-2" style={{ color: "#1a4a6e" }}>
                  아래 링크에서 영역별 영상을 확인하세요.
                </p>
              )}

              <a
                href={AREA_BOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold underline"
                style={{ color: "#5a7a94" }}
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
