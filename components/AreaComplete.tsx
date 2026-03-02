"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { useSound } from "@/hooks/useSound";

const BADGE_LEVELS = [
  { min: 90, label: "완벽 이수", icon: "🥇", color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.4)" },
  { min: 70, label: "우수 이수", icon: "🥈", color: "#0284c7", bg: "rgba(2,132,199,0.12)", border: "rgba(2,132,199,0.4)" },
  { min: 0,  label: "이수 완료", icon: "🎖️", color: "#16a34a", bg: "rgba(22,163,74,0.12)", border: "rgba(22,163,74,0.4)" },
];

export default function AreaComplete() {
  const proceedFromAreaComplete = useGameStore((s) => s.proceedFromAreaComplete);
  const resetGame = useGameStore((s) => s.resetGame);
  const currentAreaIndex = useGameStore((s) => s.currentAreaIndex);
  const areaResults = useGameStore((s) => s.areaResults);
  const completedAreas = useGameStore((s) => s.completedAreas);
  const { playAreaComplete } = useSound();

  const area = allAreas[currentAreaIndex];
  const result = areaResults.find((r) => r.areaId === area?.id);
  const accuracy = result && result.totalChoices > 0
    ? Math.round((result.correctCount / result.totalChoices) * 100)
    : 0;

  const badge = BADGE_LEVELS.find((b) => accuracy >= b.min) ?? BADGE_LEVELS[2];
  const allDone = completedAreas.length >= allAreas.length;

  useEffect(() => {
    playAreaComplete();
    if (allDone) {
      import("canvas-confetti").then((mod) => {
        const confetti = mod.default;
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      });
    }
  }, []);

  if (!area) return null;

  const accuracyColor = accuracy >= 80 ? "#16a34a" : accuracy >= 60 ? "#f59e0b" : "#dc2626";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 phase-transition">
      <div
        className="max-w-md w-full rounded-3xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: `2px solid ${badge.border}`,
          boxShadow: `0 20px 60px rgba(0,0,0,0.12), 0 0 0 4px ${badge.bg}`,
        }}
      >
        {/* 상단 컬러 헤더 */}
        <div
          className="px-6 pt-8 pb-6 text-center"
          style={{
            background: `linear-gradient(135deg, ${badge.bg}, rgba(255,255,255,0))`,
            borderBottom: `1px solid ${badge.border}`,
          }}
        >
          {/* 영역 완료 표시 */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{
                background: `${area.color}18`,
                color: area.color,
                border: `1px solid ${area.color}40`,
              }}
            >
              {area.icon} {area.title}
            </span>
          </div>

          <p className="text-sm font-bold mb-5" style={{ color: badge.color }}>
            영역 학습 완료!
          </p>

          {/* 안전 이수 뱃지 */}
          <div className="flex justify-center mb-2">
            <div
              className="badge-pop relative flex flex-col items-center justify-center w-32 h-32 rounded-full"
              style={{
                background: `radial-gradient(circle, ${badge.bg} 0%, rgba(255,255,255,0.8) 100%)`,
                border: `3px solid ${badge.border}`,
                boxShadow: `0 0 0 6px ${badge.bg}, 0 8px 32px rgba(0,0,0,0.1)`,
              }}
            >
              <span className="text-4xl mb-1">{badge.icon}</span>
              <span className="text-[10px] font-black tracking-wide" style={{ color: badge.color }}>
                {badge.label}
              </span>
            </div>
          </div>

          {/* 인증서 느낌 */}
          <div
            className="mt-4 mx-4 px-4 py-2 rounded-xl text-center warning-stripe"
            style={{ border: `1px dashed ${badge.border}` }}
          >
            <p className="text-xs font-bold" style={{ color: badge.color }}>
              안전보건 교육 이수증
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "#4a7090" }}>
              {area.title} 영역 {result?.totalChoices ?? 0}문항 이수
            </p>
          </div>
        </div>

        {/* 결과 상세 */}
        <div className="p-6">
          {/* 정확도 게이지 */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold" style={{ color: "#0d2a4a" }}>
                정답률
              </span>
              <span
                className="text-2xl font-black"
                style={{ color: accuracyColor }}
              >
                {accuracy}%
              </span>
            </div>
            <div className="h-4 rounded-full overflow-hidden" style={{ background: "rgba(2,132,199,0.1)" }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${accuracy}%`,
                  background: `linear-gradient(90deg, ${accuracyColor}aa, ${accuracyColor})`,
                  boxShadow: `0 0 8px ${accuracyColor}60`,
                }}
              />
            </div>
            <p className="text-xs mt-1 text-right" style={{ color: "#4a7090" }}>
              {result?.correctCount ?? 0} / {result?.totalChoices ?? 0} 정답
            </p>
          </div>

          {/* 총평 메시지 */}
          <div
            className="p-4 rounded-xl mb-5 text-sm leading-relaxed"
            style={{
              background: accuracy >= 80
                ? "rgba(22,163,74,0.06)"
                : accuracy >= 60
                ? "rgba(245,158,11,0.06)"
                : "rgba(220,38,38,0.05)",
              border: `1px solid ${accuracyColor}30`,
              color: "#0d2a4a",
            }}
          >
            {accuracy >= 80 && (
              <>
                <p className="font-bold mb-1" style={{ color: "#16a34a" }}>훌륭합니다!</p>
                <p style={{ color: "#2d5a3d" }}>
                  {area.title} 분야의 안전 지식을 완벽하게 숙지하셨습니다. 이 지식으로 실제 상황에서도 올바르게 대응할 수 있을 것입니다.
                </p>
              </>
            )}
            {accuracy >= 60 && accuracy < 80 && (
              <>
                <p className="font-bold mb-1" style={{ color: "#d97706" }}>잘 하셨습니다!</p>
                <p style={{ color: "#92400e" }}>
                  {area.title} 분야의 핵심 내용을 이해하셨습니다. 놓친 문항을 한 번 더 복습하면 더 완벽한 안전 대응이 가능합니다.
                </p>
              </>
            )}
            {accuracy < 60 && (
              <>
                <p className="font-bold mb-1" style={{ color: "#dc2626" }}>아직 보완이 필요합니다</p>
                <p style={{ color: "#7f1d1d" }}>
                  {area.title} 분야 안전 지식을 더 학습해 보세요. 안전 수칙을 잘 익혀 위험 상황에서 스스로를 보호할 수 있도록 노력해 주세요.
                </p>
              </>
            )}
          </div>

          {/* 버튼 */}
          <button
            onClick={proceedFromAreaComplete}
            className="w-full py-4 rounded-2xl font-black text-base text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] mb-3"
            style={{
              background: allDone
                ? "linear-gradient(135deg, #f59e0b, #ef4444)"
                : "linear-gradient(135deg, #0284c7, #0ea5e9)",
              boxShadow: allDone
                ? "0 6px 20px rgba(245,158,11,0.35)"
                : "0 6px 20px rgba(2,132,199,0.3)",
            }}
          >
            {allDone ? "🎉 최종 결과 보기" : "다음 영역 선택하기 →"}
          </button>

          <button
            onClick={resetGame}
            className="w-full py-2.5 rounded-xl text-sm transition-all duration-200 hover:bg-gray-50"
            style={{ color: "#4a7090", border: "1px solid rgba(2,132,199,0.15)" }}
          >
            처음으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
