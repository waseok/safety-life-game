"use client";

import { useMemo } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";

export default function ResourceBar() {
  const life = useGameStore((s) => s.life);
  const mental = useGameStore((s) => s.mental);
  const maxLife = useGameStore((s) => s.maxLife);
  const maxMental = useGameStore((s) => s.maxMental);
  const currentAreaIndex = useGameStore((s) => s.currentAreaIndex);
  const currentSituationIndex = useGameStore((s) => s.currentSituationIndex);

  const progress = useMemo(() => {
    let completed = 0;
    let total = 0;
    for (let i = 0; i < allAreas.length; i++) {
      total += allAreas[i].situations.length;
      if (i < currentAreaIndex) {
        completed += allAreas[i].situations.length;
      } else if (i === currentAreaIndex) {
        completed += currentSituationIndex;
      }
    }
    return { current: completed, total, percent: total > 0 ? (completed / total) * 100 : 0 };
  }, [currentAreaIndex, currentSituationIndex]);

  const lifePercent = Math.max(0, (life / maxLife) * 100);
  const mentalPercent = Math.max(0, (mental / maxMental) * 100);

  const lifeColor =
    lifePercent > 60 ? "bg-green-500" : lifePercent > 30 ? "bg-yellow-500" : "bg-red-500";
  const mentalColor =
    mentalPercent > 60 ? "bg-violet-500" : mentalPercent > 30 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="w-full bg-black/40 backdrop-blur-md border-b border-white/10 px-4 py-3 sticky top-0 z-50">
      <div className="max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-between text-xs text-white/50 mb-1">
          <span>진행률</span>
          <span>
            {progress.current} / {progress.total}
          </span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-blue-500/70 rounded-full transition-all duration-700"
            style={{ width: `${progress.percent}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-red-300 flex items-center gap-1">
                ❤️ 생명력
              </span>
              <span className="text-xs font-bold text-white/80">
                {life}/{maxLife}
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${lifeColor}`}
                style={{ width: `${lifePercent}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-violet-300 flex items-center gap-1">
                🧠 정신 에너지
              </span>
              <span className="text-xs font-bold text-white/80">
                {mental}/{maxMental}
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${mentalColor}`}
                style={{ width: `${mentalPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
