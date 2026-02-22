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

  return (
    <div className="min-h-screen flex flex-col items-center p-4 phase-transition">
      {/* Header with stats */}
      <div className="w-full max-w-3xl mb-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            🛡️ 안전영역 선택
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <span>❤️</span>
              <span className="text-white/70">{life}/{maxLife}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span>🧠</span>
              <span className="text-white/70">{mental}/{maxMental}</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-white/50">
          <span>완료: {completedAreas.length} / {allAreas.length}</span>
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedAreas.length / allAreas.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Area grid */}
      <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {allAreas.map((area, idx) => {
          const isCompleted = completedAreas.includes(area.id);
          return (
            <button
              key={area.id}
              onClick={() => !isCompleted && selectArea(idx)}
              disabled={isCompleted}
              className={`relative group text-left rounded-2xl border overflow-hidden transition-all duration-300
                ${isCompleted
                  ? "border-white/5 opacity-60 cursor-default"
                  : "border-white/10 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                }`}
            >
              {/* Color accent bar */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: area.color }}
              />

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{area.icon}</span>
                  {isCompleted && (
                    <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                      ✓ 완료
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {area.title}
                </h3>

                <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">
                  {area.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {area.subAreas.map((sub) => (
                    <span
                      key={sub.id}
                      className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-white/40"
                    >
                      {sub.title}
                    </span>
                  ))}
                </div>

                <div className="mt-3 text-xs text-white/30">
                  {area.situations.length}개 상황
                </div>
              </div>

              {/* Hover overlay for non-completed */}
              {!isCompleted && (
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Show ending button when all done */}
      {allDone && (
        <button
          onClick={() => setPhase("ending")}
          className="px-10 py-4 rounded-2xl font-bold text-lg
                     bg-gradient-to-r from-green-600 to-emerald-600
                     hover:from-green-500 hover:to-emerald-500
                     transition-all duration-300 hover:scale-105 active:scale-95
                     text-white shadow-2xl shadow-green-500/30 mb-8"
        >
          🎉 최종 결과 보기
        </button>
      )}
    </div>
  );
}
