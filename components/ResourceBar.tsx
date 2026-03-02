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
    ? (currentSituationIndex / situationsInArea) * 100
    : 0;

  const lifePercent = Math.max(0, (life / maxLife) * 100);
  const mentalPercent = Math.max(0, (mental / maxMental) * 100);

  const lifeColor =
    lifePercent > 60 ? "#22c55e" : lifePercent > 30 ? "#fbbf24" : "#ef4444";
  const mentalColor =
    mentalPercent > 60 ? "#8b5cf6" : mentalPercent > 30 ? "#fbbf24" : "#ef4444";

  return (
    <div
      className="w-full sticky top-0 z-50 px-4 py-3"
      style={{
        background: "rgba(8, 15, 30, 0.97)",
        borderBottom: "1px solid rgba(249, 115, 22, 0.25)",
        backdropFilter: "blur(16px)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
      }}
    >
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(249,115,22,0.15)",
                border: "1px solid rgba(249,115,22,0.3)",
                color: "#fb923c",
              }}
            >
              {area ? `${area.icon} ${area.title}` : "진행 중"}
            </span>
          </div>
          <span className="text-xs font-mono" style={{ color: "rgba(249,115,22,0.6)" }}>
            {currentSituationIndex + 1} / {situationsInArea}
          </span>
        </div>

        {/* 영역 진행 바 */}
        <div
          className="h-1.5 rounded-full overflow-hidden mb-3"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${areaPercent}%`,
              background: "linear-gradient(90deg, #f97316, #fbbf24)",
            }}
          />
        </div>

        {/* 스탯 바 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 생명력 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold flex items-center gap-1" style={{ color: lifeColor }}>
                ❤️ 생명력
              </span>
              <span className="text-xs font-mono font-bold" style={{ color: "rgba(240,244,255,0.7)" }}>
                {life}<span style={{ color: "rgba(240,244,255,0.3)" }}>/{maxLife}</span>
              </span>
            </div>
            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${lifePercent}%`,
                  background: `linear-gradient(90deg, ${lifeColor}aa, ${lifeColor})`,
                  boxShadow: `0 0 8px ${lifeColor}60`,
                }}
              />
            </div>
          </div>

          {/* 정신 에너지 */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold flex items-center gap-1" style={{ color: mentalColor }}>
                🧠 정신 에너지
              </span>
              <span className="text-xs font-mono font-bold" style={{ color: "rgba(240,244,255,0.7)" }}>
                {mental}<span style={{ color: "rgba(240,244,255,0.3)" }}>/{maxMental}</span>
              </span>
            </div>
            <div
              className="h-3 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${mentalPercent}%`,
                  background: `linear-gradient(90deg, ${mentalColor}aa, ${mentalColor})`,
                  boxShadow: `0 0 8px ${mentalColor}60`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
