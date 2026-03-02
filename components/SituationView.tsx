"use client";

import { useState, useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { Choice } from "@/types/game";
import IllustrationCard from "./IllustrationCard";
import ResourceBar from "./ResourceBar";

const CHOICE_COLORS = [
  { bg: "rgba(59,130,246,0.2)", border: "rgba(59,130,246,0.5)", text: "#60a5fa" },
  { bg: "rgba(249,115,22,0.2)", border: "rgba(249,115,22,0.5)", text: "#fb923c" },
  { bg: "rgba(34,197,94,0.2)", border: "rgba(34,197,94,0.5)", text: "#4ade80" },
  { bg: "rgba(168,85,247,0.2)", border: "rgba(168,85,247,0.5)", text: "#c084fc" },
];

export default function SituationView() {
  const makeChoice = useGameStore((s) => s.makeChoice);
  const quitToAreaSelect = useGameStore((s) => s.quitToAreaSelect);
  const currentAreaIndex = useGameStore((s) => s.currentAreaIndex);
  const currentSituationIndex = useGameStore((s) => s.currentSituationIndex);
  const [isChoosing, setIsChoosing] = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);

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
    setIsChoosing(true);
    setTimeout(() => {
      makeChoice(situation.id, choice);
      setIsChoosing(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ResourceBar />

      <div className="flex-1 flex flex-col items-center p-4 pb-8 phase-transition">
        <div className="max-w-2xl w-full">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQuitConfirm(true)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(249,115,22,0.08)",
                  border: "1px solid rgba(249,115,22,0.2)",
                  color: "rgba(249,115,22,0.7)",
                }}
              >
                ← 영역 선택
              </button>
              {subArea && (
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: `${area.color}15`,
                    border: `1px solid ${area.color}35`,
                    color: area.color,
                  }}
                >
                  {subArea.title}
                </span>
              )}
            </div>
            <span
              className="text-xs font-mono font-bold px-3 py-1 rounded-full"
              style={{
                background: "rgba(249,115,22,0.1)",
                color: "rgba(249,115,22,0.7)",
                border: "1px solid rgba(249,115,22,0.15)",
              }}
            >
              {currentSituationIndex + 1} / {area.situations.length}
            </span>
          </div>

          {/* 포기 확인 다이얼로그 */}
          {showQuitConfirm && (
            <div
              className="mb-4 p-4 rounded-xl"
              style={{
                background: "rgba(249,115,22,0.08)",
                border: "1px solid rgba(249,115,22,0.25)",
              }}
            >
              <p className="text-sm mb-3" style={{ color: "rgba(251,191,36,0.9)" }}>
                ⚠️ 이 영역을 포기하고 영역 선택 화면으로 돌아갈까요?
                <br />
                <span className="text-xs" style={{ color: "rgba(251,191,36,0.5)" }}>현재 영역의 진행 상황은 초기화됩니다.</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={quitToAreaSelect}
                  className="px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                  style={{ background: "rgba(249,115,22,0.2)", color: "#fb923c" }}
                >
                  포기하기
                </button>
                <button
                  onClick={() => setShowQuitConfirm(false)}
                  className="px-4 py-2 rounded-lg text-sm transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(240,244,255,0.5)" }}
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
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {situation.title}
              </h3>
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-line" style={{ color: "rgba(240,244,255,0.7)" }}>
                {situation.body}
              </p>
            </div>
          </div>

          {/* 선택지 */}
          <div className="space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgba(249,115,22,0.6)" }}>
              🚨 어떻게 하시겠습니까?
            </p>
            {shuffledChoices.map((choice, idx) => {
              const col = CHOICE_COLORS[idx % CHOICE_COLORS.length];
              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  disabled={isChoosing}
                  className={`choice-btn flex items-start gap-3 ${isChoosing ? "opacity-40 cursor-not-allowed" : ""}`}
                >
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black mt-0.5"
                    style={{
                      background: col.bg,
                      border: `1px solid ${col.border}`,
                      color: col.text,
                    }}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1 leading-relaxed">{choice.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
