"use client";

import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { AreaResult } from "@/store/useGameStore";

const BADGE_LEVELS = [
  { min: 90, label: "완벽 이수", icon: "🥇", color: "#d97706", bg: "rgba(245,158,11,0.13)", border: "rgba(245,158,11,0.5)" },
  { min: 70, label: "우수 이수", icon: "🥈", color: "#0284c7", bg: "rgba(2,132,199,0.12)", border: "rgba(2,132,199,0.45)" },
  { min: 0,  label: "이수 완료", icon: "🎖️", color: "#16a34a", bg: "rgba(22,163,74,0.12)", border: "rgba(22,163,74,0.45)" },
];

function getBadge(result?: AreaResult) {
  if (!result) return null;
  const accuracy = result.totalChoices > 0
    ? Math.round((result.correctCount / result.totalChoices) * 100)
    : 0;
  return BADGE_LEVELS.find((b) => accuracy >= b.min) ?? BADGE_LEVELS[2];
}

export default function AreaSelect() {
  const selectArea = useGameStore((s) => s.selectArea);
  const completedAreas = useGameStore((s) => s.completedAreas);
  const areaResults = useGameStore((s) => s.areaResults);
  const life = useGameStore((s) => s.life);
  const mental = useGameStore((s) => s.mental);
  const maxLife = useGameStore((s) => s.maxLife);
  const maxMental = useGameStore((s) => s.maxMental);
  const setPhase = useGameStore((s) => s.setPhase);
  const resetGame = useGameStore((s) => s.resetGame);

  const allDone = completedAreas.length >= allAreas.length;
  const lifePercent = (life / maxLife) * 100;
  const mentalPercent = (mental / maxMental) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 phase-transition">
      {/* 헤더 */}
      <div className="w-full max-w-4xl mb-6 mt-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-black mb-1" style={{ color: "#0d2a4a" }}>
              🛡️ 안전영역 선택
            </h1>
            <p className="text-sm" style={{ color: "#4a7090" }}>
              학습할 안전영역을 선택하세요
            </p>
          </div>

          <div className="flex flex-col items-end gap-2">
            {/* 미니 스탯 */}
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-20 rounded-full overflow-hidden" style={{ background: "rgba(22,163,74,0.12)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${lifePercent}%`, background: "#16a34a" }}
                />
              </div>
              <span className="text-sm font-bold" style={{ color: "#16a34a" }}>❤️ {life}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-20 rounded-full overflow-hidden" style={{ background: "rgba(2,132,199,0.12)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${mentalPercent}%`, background: "#0284c7" }}
                />
              </div>
              <span className="text-sm font-bold" style={{ color: "#0284c7" }}>🧠 {mental}</span>
            </div>
            {/* 홈 버튼 */}
            <button
              onClick={resetGame}
              className="mt-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(220,38,38,0.07)",
                border: "1px solid rgba(220,38,38,0.2)",
                color: "#dc2626",
              }}
            >
              🏠 처음으로
            </button>
          </div>
        </div>

        {/* 전체 진행률 */}
        <div
          className="p-4 rounded-2xl"
          style={{
            background: "rgba(2,132,199,0.05)",
            border: "1.5px solid rgba(2,132,199,0.18)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-base font-black" style={{ color: "#0d2a4a" }}>
              전체 진행률
            </span>
            <span className="text-base font-black" style={{ color: "#0284c7" }}>
              {completedAreas.length} / {allAreas.length} 영역
            </span>
          </div>
          <div className="h-4 rounded-full overflow-hidden" style={{ background: "rgba(2,132,199,0.12)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(completedAreas.length / allAreas.length) * 100}%`,
                background: "linear-gradient(90deg, #0284c7, #38bdf8)",
                boxShadow: "0 0 8px rgba(2,132,199,0.4)",
              }}
            />
          </div>
          <p className="text-xs mt-1 text-right font-semibold" style={{ color: "#4a7090" }}>
            {Math.round((completedAreas.length / allAreas.length) * 100)}% 완료
          </p>
        </div>
      </div>

      {/* 영역 그리드 - 3열 */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {allAreas.map((area, idx) => {
          const isCompleted = completedAreas.includes(area.id);
          const result = areaResults.find((r) => r.areaId === area.id);
          const badge = getBadge(result);

          return (
            <button
              key={area.id}
              onClick={() => !isCompleted && selectArea(idx)}
              disabled={isCompleted}
              className={`relative group text-left rounded-2xl overflow-hidden transition-all duration-300 ${
                isCompleted
                  ? "cursor-default"
                  : "hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              }`}
              style={{
                background: isCompleted
                  ? `linear-gradient(135deg, ${badge?.bg ?? "rgba(22,163,74,0.08)"}, rgba(255,255,255,0.9))`
                  : "#ffffff",
                border: isCompleted
                  ? `2px solid ${badge?.border ?? "rgba(22,163,74,0.4)"}`
                  : `1.5px solid ${area.color}30`,
                boxShadow: isCompleted
                  ? `0 4px 16px ${badge?.bg ?? "rgba(22,163,74,0.1)"}, 0 0 0 3px ${badge?.bg ?? "rgba(22,163,74,0.06)"}`
                  : "0 4px 16px rgba(0,0,0,0.06)",
              }}
            >
              {/* 상단 컬러 바 */}
              <div
                className="h-1.5 w-full"
                style={{
                  background: isCompleted
                    ? `linear-gradient(90deg, ${badge?.color ?? "#16a34a"}, ${badge?.color ?? "#16a34a"}88)`
                    : `linear-gradient(90deg, ${area.color}, ${area.color}88)`,
                }}
              />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{area.icon}</span>
                  {isCompleted && badge ? (
                    /* 이수 뱃지 - 크고 강조 */
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="flex flex-col items-center justify-center w-16 h-16 rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${badge.bg} 0%, rgba(255,255,255,0.6) 100%)`,
                          border: `3px solid ${badge.border}`,
                          boxShadow: `0 0 0 4px ${badge.bg}, 0 4px 12px ${badge.bg}`,
                        }}
                      >
                        <span className="text-2xl">{badge.icon}</span>
                      </div>
                      <span className="text-xs font-black" style={{ color: badge.color }}>
                        {badge.label}
                      </span>
                      {result && (
                        <span className="text-xs font-bold" style={{ color: badge.color }}>
                          {Math.round((result.correctCount / result.totalChoices) * 100)}%
                        </span>
                      )}
                    </div>
                  ) : (
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `${area.color}15`,
                        color: area.color,
                        border: `1px solid ${area.color}35`,
                      }}
                    >
                      시작 →
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black mb-1" style={{ color: "#0d2a4a" }}>
                  {area.title}
                </h3>

                <p
                  className="text-xs leading-relaxed mb-3 line-clamp-2"
                  style={{ color: "#4a7090" }}
                >
                  {area.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {area.subAreas.map((sub) => (
                    <span
                      key={sub.id}
                      className="px-2 py-0.5 rounded-full text-[10px]"
                      style={{
                        background: `${area.color}12`,
                        color: `${area.color}cc`,
                        border: `1px solid ${area.color}25`,
                      }}
                    >
                      {sub.title}
                    </span>
                  ))}
                </div>

                <div className="text-xs font-semibold" style={{ color: `${area.color}99` }}>
                  📋 {area.situations.length}개 상황
                </div>
              </div>

              {/* 호버 오버레이 */}
              {!isCompleted && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at center, ${area.color}08 0%, transparent 70%)` }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 전체 완료 버튼 */}
      {allDone && (
        <button
          onClick={() => setPhase("ending")}
          className="px-12 py-4 rounded-2xl font-black text-xl text-white mb-8 transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #16a34a, #0d9488)",
            boxShadow: "0 8px 32px rgba(22,163,74,0.4)",
          }}
        >
          🎉 최종 결과 보기
        </button>
      )}
    </div>
  );
}
