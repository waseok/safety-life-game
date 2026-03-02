"use client";

import { useState, useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { Choice } from "@/types/game";
import IllustrationCard from "./IllustrationCard";
import ResourceBar from "./ResourceBar";
import { useSound } from "@/hooks/useSound";

const CHOICE_COLORS = [
  { bg: "rgba(2,132,199,0.08)", border: "rgba(2,132,199,0.35)", text: "#0369a1", hover: "rgba(2,132,199,0.14)" },
  { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.35)", text: "#b45309", hover: "rgba(245,158,11,0.14)" },
  { bg: "rgba(22,163,74,0.08)", border: "rgba(22,163,74,0.35)", text: "#15803d", hover: "rgba(22,163,74,0.14)" },
  { bg: "rgba(139,92,246,0.08)", border: "rgba(139,92,246,0.35)", text: "#7c3aed", hover: "rgba(139,92,246,0.14)" },
];

export default function SituationView() {
  const makeChoice = useGameStore((s) => s.makeChoice);
  const quitToAreaSelect = useGameStore((s) => s.quitToAreaSelect);
  const resetGame = useGameStore((s) => s.resetGame);
  const currentAreaIndex = useGameStore((s) => s.currentAreaIndex);
  const currentSituationIndex = useGameStore((s) => s.currentSituationIndex);
  const [isChoosing, setIsChoosing] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showHomeConfirm, setShowHomeConfirm] = useState(false);
  const { playClick } = useSound();

  const area = allAreas[currentAreaIndex];
  const situation = area?.situations[currentSituationIndex];

  const shuffledChoices = useMemo(() => {
    if (!situation) return [];
    return [...situation.choices].sort(() => Math.random() - 0.5);
  }, [situation?.id]);

  if (!area || !situation) return null;

  const subArea = area.subAreas.find((s) => s.id === situation.subAreaId);

  const handleChoice = (choice: Choice) => {
    if (isChoosing) return;
    playClick();
    setIsChoosing(true);
    setTimeout(() => {
      makeChoice(situation.id, choice);
      setIsChoosing(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#eef6ff" }}>
      <ResourceBar />

      <div className="flex-1 flex flex-col items-center p-4 pb-8 phase-transition">
        <div className="max-w-2xl w-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQuitConfirm(true)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(2,132,199,0.08)",
                  border: "1px solid rgba(2,132,199,0.22)",
                  color: "#0284c7",
                }}
              >
                ← 영역 선택
              </button>
              <button
                onClick={() => setShowHomeConfirm(true)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(220,38,38,0.07)",
                  border: "1px solid rgba(220,38,38,0.2)",
                  color: "#dc2626",
                }}
              >
                🏠 처음으로
              </button>
              {subArea && (
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: `${area.color}12`,
                    border: `1px solid ${area.color}30`,
                    color: area.color,
                  }}
                >
                  {subArea.title}
                </span>
              )}
            </div>
          </div>

          {/* 포기 확인 다이얼로그 */}
          {showQuitConfirm && (
            <div
              className="mb-4 p-4 rounded-xl"
              style={{
                background: "rgba(245,158,11,0.07)",
                border: "1px solid rgba(245,158,11,0.3)",
              }}
            >
              <p className="text-sm mb-3 font-semibold" style={{ color: "#92400e" }}>
                ⚠️ 이 영역을 포기하고 영역 선택 화면으로 돌아갈까요?
                <br />
                <span className="text-xs font-normal" style={{ color: "#b45309" }}>현재 영역의 진행 상황은 초기화됩니다.</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={quitToAreaSelect}
                  className="px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                  style={{ background: "rgba(245,158,11,0.15)", color: "#b45309" }}
                >
                  포기하기
                </button>
                <button
                  onClick={() => setShowQuitConfirm(false)}
                  className="px-4 py-2 rounded-lg text-sm transition-colors"
                  style={{ background: "rgba(0,0,0,0.05)", color: "#4a7090" }}
                >
                  계속하기
                </button>
              </div>
            </div>
          )}

          {/* 홈 확인 다이얼로그 */}
          {showHomeConfirm && (
            <div
              className="mb-4 p-4 rounded-xl"
              style={{
                background: "rgba(220,38,38,0.05)",
                border: "1px solid rgba(220,38,38,0.25)",
              }}
            >
              <p className="text-sm mb-3 font-semibold" style={{ color: "#7f1d1d" }}>
                🏠 처음 화면으로 돌아갈까요?
                <br />
                <span className="text-xs font-normal" style={{ color: "#dc2626" }}>모든 진행 상황이 초기화됩니다.</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={resetGame}
                  className="px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                  style={{ background: "rgba(220,38,38,0.1)", color: "#dc2626" }}
                >
                  초기화
                </button>
                <button
                  onClick={() => setShowHomeConfirm(false)}
                  className="px-4 py-2 rounded-lg text-sm transition-colors"
                  style={{ background: "rgba(0,0,0,0.05)", color: "#4a7090" }}
                >
                  계속하기
                </button>
              </div>
            </div>
          )}

          {/* 상황 카드 */}
          <div className="game-card overflow-hidden mb-5">
            <IllustrationCard
              src={situation.image}
              alt={situation.title}
              subAreaId={situation.subAreaId}
              className="aspect-[16/9]"
            />
            <div className="p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: "#0d2a4a" }}>
                {situation.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ color: "#3a5a7a" }}>
                {situation.body}
              </p>
            </div>
          </div>

          {/* 선택지 - 3열 그리드 */}
          <div>
            <p className="text-sm font-black uppercase tracking-widest mb-3" style={{ color: "#0284c7" }}>
              🚨 어떻게 하시겠습니까?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {shuffledChoices.map((choice, idx) => {
                const col = CHOICE_COLORS[idx % CHOICE_COLORS.length];
                return (
                  <button
                    key={choice.id}
                    onClick={() => handleChoice(choice)}
                    disabled={isChoosing}
                    className={`relative rounded-xl px-4 py-4 text-left text-sm font-medium
                      transition-all duration-200 cursor-pointer
                      ${isChoosing ? "opacity-40 cursor-not-allowed" : "hover:scale-[1.03] active:scale-[0.98]"}`}
                    style={{
                      background: col.bg,
                      border: `2px solid ${col.border}`,
                      color: "#0d2a4a",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    {/* 라벨 */}
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg text-xs font-black mb-2"
                      style={{
                        background: col.bg,
                        border: `1.5px solid ${col.border}`,
                        color: col.text,
                      }}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed text-sm" style={{ color: "#0d2a4a" }}>
                      {choice.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
