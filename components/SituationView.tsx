"use client";

import { useState, useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { Choice } from "@/types/game";
import IllustrationCard from "./IllustrationCard";
import ResourceBar from "./ResourceBar";
import { useSound } from "@/hooks/useSound";

const CHOICE_STYLES = [
  {
    bg:      "linear-gradient(135deg, #1565c0, #1e88e5)",
    shadow:  "0 6px 0 #0d47a1",
    hoverShadow: "0 4px 0 #0d47a1",
    label:   "A",
    labelBg: "rgba(255,255,255,0.2)",
    accent:  "#bbdefb",
  },
  {
    bg:      "linear-gradient(135deg, #0d8a6a, #26a69a)",
    shadow:  "0 6px 0 #00695c",
    hoverShadow: "0 4px 0 #00695c",
    label:   "B",
    labelBg: "rgba(255,255,255,0.2)",
    accent:  "#b2dfdb",
  },
  {
    bg:      "linear-gradient(135deg, #7b1fa2, #9c27b0)",
    shadow:  "0 6px 0 #4a148c",
    hoverShadow: "0 4px 0 #4a148c",
    label:   "C",
    labelBg: "rgba(255,255,255,0.2)",
    accent:  "#e1bee7",
  },
];

export default function SituationView() {
  const makeChoice         = useGameStore((s) => s.makeChoice);
  const quitToAreaSelect   = useGameStore((s) => s.quitToAreaSelect);
  const resetGame          = useGameStore((s) => s.resetGame);
  const currentAreaIndex   = useGameStore((s) => s.currentAreaIndex);
  const currentSituationIndex = useGameStore((s) => s.currentSituationIndex);
  const [isChoosing, setIsChoosing]     = useState(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showHomeConfirm, setShowHomeConfirm] = useState(false);
  const { playClick } = useSound();

  const area      = allAreas[currentAreaIndex];
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
    <div className="min-h-screen flex flex-col bg-surface">
      <ResourceBar />

      <div className="flex-1 flex flex-col items-center pb-8 phase-transition">
        <div className="max-w-6xl w-full px-4 md:px-6">

          {/* 네비게이션 바 */}
          <div className="flex items-center gap-2 py-3">
            <button
              onClick={() => setShowQuitConfirm(true)}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{ background: "rgba(26,111,181,0.08)", border: "1px solid rgba(26,111,181,0.2)", color: "#1a6fb5" }}
            >
              ← 영역 선택
            </button>
            <button
              onClick={() => setShowHomeConfirm(true)}
              className="px-4 py-2 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{ background: "rgba(211,47,47,0.07)", border: "1px solid rgba(211,47,47,0.2)", color: "#d32f2f" }}
            >
              🏠 처음으로
            </button>
            {subArea && (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: `${area.color}12`, border: `1px solid ${area.color}30`, color: area.color }}>
                {subArea.title}
              </span>
            )}
          </div>

          {/* 확인 다이얼로그 */}
          {showQuitConfirm && (
            <div className="mb-3 p-4 rounded-xl"
              style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.3)" }}>
              <p className="text-sm mb-3 font-semibold" style={{ color: "#92400e" }}>
                ⚠️ 이 영역을 포기하고 돌아갈까요?
                <br /><span className="text-xs font-normal text-on-surface/50">현재 영역 진행 상황이 초기화됩니다.</span>
              </p>
              <div className="flex gap-2">
                <button onClick={quitToAreaSelect}
                  className="px-4 py-2 rounded-lg text-sm font-bold"
                  style={{ background: "rgba(245,158,11,0.15)", color: "#b45309" }}>
                  포기하기
                </button>
                <button onClick={() => setShowQuitConfirm(false)}
                  className="px-4 py-2 rounded-lg text-sm text-on-surface/50">
                  계속하기
                </button>
              </div>
            </div>
          )}
          {showHomeConfirm && (
            <div className="mb-3 p-4 rounded-xl"
              style={{ background: "rgba(179,27,37,0.05)", border: "1px solid rgba(179,27,37,0.25)" }}>
              <p className="text-sm mb-3 font-semibold" style={{ color: "#7f1d1d" }}>
                🏠 처음 화면으로 돌아갈까요?
                <br /><span className="text-xs font-normal text-on-surface/50">모든 진행 상황이 초기화됩니다.</span>
              </p>
              <div className="flex gap-2">
                <button onClick={resetGame}
                  className="px-4 py-2 rounded-lg text-sm font-bold"
                  style={{ background: "rgba(211,47,47,0.1)", color: "#d32f2f" }}>
                  초기화
                </button>
                <button onClick={() => setShowHomeConfirm(false)}
                  className="px-4 py-2 rounded-lg text-sm text-on-surface/50">
                  계속하기
                </button>
              </div>
            </div>
          )}

          {/* PC: 이미지+텍스트 좌측 / 선택지 우측 — 모바일: 세로 스택 */}
          <div className="flex flex-col lg:flex-row gap-6">

            {/* 좌측: 삽화 + 상황 설명 */}
            <div className="flex-1 min-w-0">
              <div className="rounded-2xl overflow-hidden shadow-lg"
                style={{ border: `2px solid ${area.color}25` }}>
                <div className="relative aspect-[16/9]">
                  <IllustrationCard
                    src={situation.image}
                    alt={situation.title}
                    subAreaId={situation.subAreaId}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold shadow-md"
                      style={{ color: area.color }}>
                      ⚠️ {subArea?.title ?? area.title}: {situation.title}
                    </span>
                  </div>
                </div>

                <div className="p-5 md:p-6 bg-white">
                  <p className="text-sm md:text-base lg:text-lg leading-relaxed text-on-surface font-medium whitespace-pre-line">
                    {situation.body}
                  </p>
                </div>
              </div>

              {/* 힌트 봇 말풍선 */}
              <div className="mt-4 flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center text-2xl shadow-sm border-2 border-white">
                  🤖
                </div>
                <div className="flex-1 bg-white rounded-2xl rounded-tl-none px-5 py-3 shadow-sm border border-outline-variant/30 relative">
                  <p className="text-xs font-black text-secondary mb-1 uppercase tracking-widest">Safety Guard Bot</p>
                  <p className="text-sm text-on-surface/70 font-medium leading-relaxed">
                    신중하게 생각하고 가장 안전한 선택을 해보세요! 안전이 최우선입니다.
                  </p>
                  <div className="absolute -left-2 top-4 w-4 h-4 bg-white rotate-45 border-l border-b border-outline-variant/30" />
                </div>
              </div>
            </div>

            {/* 우측: 선택지 */}
            <div className="lg:w-[420px] xl:w-[480px] flex-shrink-0">
              <p className="text-xs font-black uppercase tracking-widest text-primary mb-3">
                🚨 어떻게 하시겠습니까?
              </p>
              <div className="flex flex-col gap-3">
                {shuffledChoices.map((choice, idx) => {
                  const style = CHOICE_STYLES[idx % CHOICE_STYLES.length];
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleChoice(choice)}
                      disabled={isChoosing}
                      className={`relative rounded-2xl px-5 py-5 text-left flex items-start gap-4
                        transition-all duration-150 text-white font-bold
                        ${isChoosing ? "opacity-40 cursor-not-allowed" : "active:translate-y-1 hover:-translate-y-0.5"}`}
                      style={{
                        background: style.bg,
                        boxShadow: style.shadow,
                      }}
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-base font-black mt-0.5"
                        style={{ background: style.labelBg, border: "2px solid rgba(255,255,255,0.4)" }}>
                        {style.label}
                      </span>
                      <span className="leading-relaxed text-base">
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
    </div>
  );
}
