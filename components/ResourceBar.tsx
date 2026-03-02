"use client";

import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";

export default function ResourceBar() {
  const life = useGameStore((s) => s.life);
  const mental = useGameStore((s) => s.mental);
  const maxLife = useGameStore((s) => s.maxLife);
  const maxMental = useGameStore((s) => s.maxMental);
  const currentAreaIndex = useGameStore((s) => s.currentAreaIndex);
  const currentSituationIndex = useGameStore((s) => s.currentSituationIndex);

  const area = allAreas[currentAreaIndex];
  const situationsInArea = area?.situations.length ?? 0;
  const areaPercent = situationsInArea > 0
    ? ((currentSituationIndex + 1) / situationsInArea) * 100
    : 0;

  const lifePercent = Math.max(0, (life / maxLife) * 100);
  const mentalPercent = Math.max(0, (mental / maxMental) * 100);

  const lifeColor = lifePercent > 60 ? "#16a34a" : lifePercent > 30 ? "#f59e0b" : "#dc2626";
  const mentalColor = mentalPercent > 60 ? "#0284c7" : mentalPercent > 30 ? "#f59e0b" : "#dc2626";

  return (
    <div
      className="w-full sticky top-0 z-50 px-4 py-3"
      style={{
        background: "rgba(255,255,255,0.97)",
        borderBottom: "2px solid rgba(2,132,199,0.2)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 2px 16px rgba(2,132,199,0.1)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* 진행 현황 헤더 */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="px-3 py-1 rounded-full text-sm font-bold"
            style={{
              background: "rgba(2,132,199,0.1)",
              border: "1px solid rgba(2,132,199,0.25)",
              color: "#0284c7",
            }}
          >
            {area ? `${area.icon} ${area.title}` : "진행 중"}
          </span>
          {/* 진행률 숫자 - 크고 선명하게 */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-black" style={{ color: "#0284c7" }}>
              {currentSituationIndex + 1}
            </span>
            <span className="text-base font-bold" style={{ color: "#4a7090" }}>
              / {situationsInArea}
            </span>
            <span
              className="text-sm font-black px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(2,132,199,0.12)",
                color: "#0284c7",
                border: "1px solid rgba(2,132,199,0.25)",
              }}
            >
              {Math.round(areaPercent)}%
            </span>
          </div>
        </div>

        {/* 영역 진행 바 - 두껍고 선명하게 */}
        <div
          className="h-3 rounded-full overflow-hidden mb-3"
          style={{ background: "rgba(2,132,199,0.12)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${areaPercent}%`,
              background: "linear-gradient(90deg, #0284c7, #38bdf8)",
              boxShadow: "0 0 6px rgba(2,132,199,0.45)",
            }}
          />
        </div>

        {/* 스탯 바 */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold" style={{ color: lifeColor }}>❤️ 생명력</span>
              <span className="text-sm font-black" style={{ color: lifeColor }}>
                {life}<span className="text-xs font-normal" style={{ color: "#9ab4c8" }}>/{maxLife}</span>
              </span>
            </div>
            <div className="h-3.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.07)" }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${lifePercent}%`,
                  background: `linear-gradient(90deg, ${lifeColor}bb, ${lifeColor})`,
                  boxShadow: `0 0 6px ${lifeColor}60`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-bold" style={{ color: mentalColor }}>🧠 정신 에너지</span>
              <span className="text-sm font-black" style={{ color: mentalColor }}>
                {mental}<span className="text-xs font-normal" style={{ color: "#9ab4c8" }}>/{maxMental}</span>
              </span>
            </div>
            <div className="h-3.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.07)" }}>
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${mentalPercent}%`,
                  background: `linear-gradient(90deg, ${mentalColor}bb, ${mentalColor})`,
                  boxShadow: `0 0 6px ${mentalColor}60`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
