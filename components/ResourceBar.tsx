"use client";

import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";

export default function ResourceBar() {
  const life                  = useGameStore((s) => s.life);
  const mental                = useGameStore((s) => s.mental);
  const maxLife               = useGameStore((s) => s.maxLife);
  const maxMental             = useGameStore((s) => s.maxMental);
  const currentAreaIndex      = useGameStore((s) => s.currentAreaIndex);
  const currentSituationIndex = useGameStore((s) => s.currentSituationIndex);

  const area              = allAreas[currentAreaIndex];
  const situationsInArea  = area?.situations.length ?? 0;
  const areaPercent       = situationsInArea > 0
    ? ((currentSituationIndex + 1) / situationsInArea) * 100 : 0;

  const lifePercent   = Math.max(0, (life / maxLife) * 100);
  const mentalPercent = Math.max(0, (mental / maxMental) * 100);

  const lifeColor   = lifePercent > 60 ? "#0d8a6a" : lifePercent > 30 ? "#ffa726" : "#d32f2f";
  const mentalColor = mentalPercent > 60 ? "#1a6fb5" : mentalPercent > 30 ? "#ffa726" : "#d32f2f";

  return (
    <div className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-outline-variant/30 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3">

        {/* ── 영역명 + 진행률 ── */}
        <div className="flex items-center justify-between mb-2">
          <span className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold"
            style={{ background: `${area?.color ?? "#1a6fb5"}15`,
              border: `1px solid ${area?.color ?? "#1a6fb5"}30`,
              color: area?.color ?? "#1a6fb5" }}>
            {area?.icon} {area?.title ?? "진행 중"}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-primary">{currentSituationIndex + 1}</span>
            <span className="text-sm font-bold text-on-surface/50">/ {situationsInArea}</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-black bg-primary/10 text-primary border border-primary/20">
              {Math.round(areaPercent)}%
            </span>
          </div>
        </div>

        {/* ── 영역 진행 바 ── */}
        <div className="h-2.5 rounded-full overflow-hidden mb-3 bg-surface-container">
          <div className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${areaPercent}%`,
              background: "linear-gradient(90deg, #1a6fb5, #64b5f6)",
              boxShadow: "0 0 6px rgba(26,111,181,0.4)",
            }} />
        </div>

        {/* ── 스탯 카드 2개 ── */}
        <div className="grid grid-cols-2 gap-3">

          {/* 생명력 */}
          <div className="hud-card">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold" style={{ color: lifeColor }}>❤️ 생명력</span>
              <span className="text-sm font-black" style={{ color: lifeColor }}>
                {life}
                <span className="text-xs font-normal text-on-surface/30">/{maxLife}</span>
              </span>
            </div>
            <div className="energy-bar-track">
              <div className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${lifePercent}%`,
                  background: `linear-gradient(90deg, ${lifeColor}aa, ${lifeColor})`,
                  boxShadow: `0 0 6px ${lifeColor}50`,
                }} />
            </div>
          </div>

          {/* 판단력 */}
          <div className="hud-card">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-bold" style={{ color: mentalColor }}>🧠 판단력</span>
              <span className="text-sm font-black" style={{ color: mentalColor }}>
                {mental}
                <span className="text-xs font-normal text-on-surface/30">/{maxMental}</span>
              </span>
            </div>
            <div className="energy-bar-track">
              <div className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${mentalPercent}%`,
                  background: `linear-gradient(90deg, ${mentalColor}aa, ${mentalColor})`,
                  boxShadow: `0 0 6px ${mentalColor}50`,
                }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
