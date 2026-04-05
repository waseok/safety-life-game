"use client";

import { useState, useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { Choice } from "@/types/game";
import IllustrationCard from "./IllustrationCard";
import ResourceBar from "./ResourceBar";
import { useSound } from "@/hooks/useSound";

// 선택지별 스타일 (3가지 색상 테마)
const CHOICE_STYLES = [
  {
    bg:      "linear-gradient(to bottom, #3b82f6, #1d4ed8)",
    shadow:  "0 8px 0 #1e3a8a",
    hoverShadow: "0 4px 0 #1e3a8a",
    label:   "A",
    labelBg: "rgba(255,255,255,0.25)",
  },
  {
    bg:      "linear-gradient(to bottom, #fd8863, #9b3e20)",
    shadow:  "0 8px 0 #8b3315",
    hoverShadow: "0 4px 0 #8b3315",
    label:   "B",
    labelBg: "rgba(255,255,255,0.25)",
  },
  {
    bg:      "linear-gradient(to bottom, #c1fd7c, #3c6600)",
    shadow:  "0 8px 0 #1e3300",
    hoverShadow: "0 4px 0 #1e3300",
    label:   "C",
    labelBg: "rgba(255,255,255,0.25)",
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
        <div className="max-w-2xl w-full">

          {/* ── 네비게이션 바 ── */}
          <div className="flex items-center gap-2 px-4 py-3">
            <button
              onClick={() => setShowQuitConfirm(true)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{ background: "rgba(0,99,132,0.08)", border: "1px solid rgba(0,99,132,0.2)", color: "#006384" }}
            >
              ← 영역 선택
            </button>
            <button
              onClick={() => setShowHomeConfirm(true)}
              className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
              style={{ background: "rgba(179,27,37,0.07)", border: "1px solid rgba(179,27,37,0.2)", color: "#b31b25" }}
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

          {/* ── 확인 다이얼로그 ── */}
          {showQuitConfirm && (
            <div className="mx-4 mb-3 p-4 rounded-xl"
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
            <div className="mx-4 mb-3 p-4 rounded-xl"
              style={{ background: "rgba(179,27,37,0.05)", border: "1px solid rgba(179,27,37,0.25)" }}>
              <p className="text-sm mb-3 font-semibold" style={{ color: "#7f1d1d" }}>
                🏠 처음 화면으로 돌아갈까요?
                <br /><span className="text-xs font-normal text-on-surface/50">모든 진행 상황이 초기화됩니다.</span>
              </p>
              <div className="flex gap-2">
                <button onClick={resetGame}
                  className="px-4 py-2 rounded-lg text-sm font-bold"
                  style={{ background: "rgba(179,27,37,0.1)", color: "#b31b25" }}>
                  초기화
                </button>
                <button onClick={() => setShowHomeConfirm(false)}
                  className="px-4 py-2 rounded-lg text-sm text-on-surface/50">
                  계속하기
                </button>
              </div>
            </div>
          )}

          {/* ── 삽화 카드 ── */}
          <div className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-lg relative group"
            style={{ border: `2px solid ${area.color}25` }}>

            {/* 삽화 이미지 */}
            <div className="relative aspect-[16/9]">
              <IllustrationCard
                src={situation.image}
                alt={situation.title}
                subAreaId={situation.subAreaId}
                className="w-full h-full"
              />
              {/* 그라디언트 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* 상황 레이블 배지 */}
              <div className="absolute top-4 left-4">
                <span className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold shadow-md"
                  style={{ color: area.color }}>
                  ⚠️ {subArea?.title ?? area.title}: {situation.title}
                </span>
              </div>
            </div>

            {/* 상황 텍스트 */}
            <div className="p-5 bg-white">
              <p className="text-sm md:text-base leading-relaxed text-on-surface font-medium whitespace-pre-line">
                {situation.body}
              </p>
            </div>
          </div>

          {/* ── 힌트 봇 말풍선 ── */}
          <div className="mx-4 mb-5 flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex-shrink-0 flex items-center justify-center text-2xl shadow-sm border-2 border-white">
              🤖
            </div>
            <div className="flex-1 bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-outline-variant/30 relative">
              <p className="text-xs font-black text-secondary mb-1 uppercase tracking-widest">Safety Guard Bot</p>
              <p className="text-sm text-on-surface/70 font-medium leading-relaxed">
                신중하게 생각하고 가장 안전한 선택을 해보세요! 안전이 최우선입니다.
              </p>
              <div className="absolute -left-2 top-4 w-4 h-4 bg-white rotate-45 border-l border-b border-outline-variant/30" />
            </div>
          </div>

          {/* ── 선택지 ── */}
          <div className="px-4">
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
                    className={`relative rounded-2xl px-5 py-4 text-left flex items-center gap-4
                      transition-all duration-150 text-white font-bold
                      ${isChoosing ? "opacity-40 cursor-not-allowed" : "active:translate-y-1"}`}
                    style={{
                      background: style.bg,
                      boxShadow: style.shadow,
                    }}
                    onMouseOver={(e) => {
                      if (!isChoosing) {
                        (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLButtonElement).style.boxShadow =
                          style.shadow.replace("8px", "10px");
                      }
                    }}
                    onMouseOut={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = style.shadow;
                    }}
                  >
                    {/* 라벨 원형 뱃지 */}
                    <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-black"
                      style={{ background: style.labelBg, border: "2px solid rgba(255,255,255,0.4)" }}>
                      {style.label}
                    </span>
                    <span className="leading-relaxed text-sm md:text-base drop-shadow-sm">
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
