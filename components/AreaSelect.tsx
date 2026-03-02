"use client";

import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";

export default function AreaSelect() {
  const selectArea = useGameStore((s) => s.selectArea);
  const completedAreas = useGameStore((s) => s.completedAreas);
  const life = useGameStore((s) => s.life);
  const mental = useGameStore((s) => s.mental);
  const maxLife = useGameStore((s) => s.maxLife);
  const maxMental = useGameStore((s) => s.maxMental);
  const setPhase = useGameStore((s) => s.setPhase);

  const allDone = completedAreas.length >= allAreas.length;
  const lifePercent = (life / maxLife) * 100;
  const mentalPercent = (mental / maxMental) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 phase-transition">
      {/* 헤더 */}
      <div className="w-full max-w-3xl mb-6 mt-4">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
              🛡️ 안전영역 선택
            </h1>
            <p className="text-xs" style={{ color: "rgba(249,115,22,0.6)" }}>
              학습할 안전영역을 선택하세요
            </p>
          </div>

          {/* 미니 스탯 */}
          <div className="flex flex-col gap-2 text-right">
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-20 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${lifePercent}%`, background: "#22c55e" }}
                />
              </div>
              <span className="text-xs font-bold" style={{ color: "rgba(34,197,94,0.8)" }}>
                ❤️ {life}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-2 w-20 rounded-full overflow-hidden"
                style={{ background: "rgba(255,255,255,0.08)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${mentalPercent}%`, background: "#8b5cf6" }}
                />
              </div>
              <span className="text-xs font-bold" style={{ color: "rgba(139,92,246,0.8)" }}>
                🧠 {mental}
              </span>
            </div>
          </div>
        </div>

        {/* 전체 진행률 */}
        <div
          className="p-3 rounded-xl"
          style={{
            background: "rgba(249,115,22,0.06)",
            border: "1px solid rgba(249,115,22,0.15)",
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold" style={{ color: "rgba(251,191,36,0.8)" }}>
              전체 진행률
            </span>
            <span className="text-xs font-mono font-bold" style={{ color: "rgba(249,115,22,0.8)" }}>
              {completedAreas.length} / {allAreas.length} 영역
            </span>
          </div>
          <div
            className="h-2.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(completedAreas.length / allAreas.length) * 100}%`,
                background: "linear-gradient(90deg, #f97316, #fbbf24)",
              }}
            />
          </div>
        </div>
      </div>

      {/* 영역 그리드 */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {allAreas.map((area, idx) => {
          const isCompleted = completedAreas.includes(area.id);
          return (
            <button
              key={area.id}
              onClick={() => !isCompleted && selectArea(idx)}
              disabled={isCompleted}
              className={`relative group text-left rounded-2xl overflow-hidden transition-all duration-300 ${
                isCompleted
                  ? "opacity-50 cursor-default"
                  : "hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              }`}
              style={{
                background: "linear-gradient(145deg, #0e1a2e 0%, #080f1e 100%)",
                border: isCompleted
                  ? `1px solid ${area.color}20`
                  : `1px solid ${area.color}30`,
                boxShadow: isCompleted ? "none" : `0 8px 24px rgba(0,0,0,0.4)`,
              }}
            >
              {/* 상단 컬러 바 */}
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${area.color}, ${area.color}88)` }}
              />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{area.icon}</span>
                  {isCompleted ? (
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.3)" }}
                    >
                      ✓ 완료
                    </span>
                  ) : (
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `${area.color}20`, color: area.color, border: `1px solid ${area.color}40` }}
                    >
                      시작 →
                    </span>
                  )}
                </div>

                <h3 className="text-base font-black text-white mb-1">
                  {area.title}
                </h3>

                <p className="text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: "rgba(240,244,255,0.45)" }}>
                  {area.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {area.subAreas.map((sub) => (
                    <span
                      key={sub.id}
                      className="px-2 py-0.5 rounded-full text-[10px]"
                      style={{
                        background: `${area.color}10`,
                        color: `${area.color}80`,
                        border: `1px solid ${area.color}20`,
                      }}
                    >
                      {sub.title}
                    </span>
                  ))}
                </div>

                <div className="text-xs" style={{ color: `${area.color}60` }}>
                  📋 {area.situations.length}개 상황
                </div>
              </div>

              {/* 호버 오버레이 */}
              {!isCompleted && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
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
            background: "linear-gradient(135deg, #22c55e, #10b981)",
            boxShadow: "0 8px 32px rgba(34,197,94,0.4)",
          }}
        >
          🎉 최종 결과 보기
        </button>
      )}
    </div>
  );
}
