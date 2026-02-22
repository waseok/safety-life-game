"use client";

import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import IllustrationCard from "./IllustrationCard";

export default function AreaIntro() {
  const setPhase = useGameStore((s) => s.setPhase);
  const quitToAreaSelect = useGameStore((s) => s.quitToAreaSelect);
  const currentAreaIndex = useGameStore((s) => s.currentAreaIndex);

  const area = allAreas[currentAreaIndex];
  if (!area) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 phase-transition">
      <div className="max-w-2xl w-full">
        <button
          onClick={quitToAreaSelect}
          className="mb-4 px-4 py-2 rounded-full bg-white/5 border border-white/10
                     text-sm text-white/40 hover:text-white/70 hover:bg-white/10 transition-colors"
        >
          ← 영역 선택으로
        </button>
      </div>
      <div className="max-w-2xl w-full game-card overflow-hidden">
        <IllustrationCard
          src={area.coverImage}
          alt={area.title}
          className="aspect-[16/9]"
        />

        <div className="p-6 md:p-8 text-center">
          <div className="text-5xl mb-4">{area.icon}</div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            {area.title}
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-6 leading-relaxed">
            {area.description}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {area.subAreas.map((sub) => (
              <span
                key={sub.id}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10
                           text-sm text-white/70"
              >
                {sub.title}
              </span>
            ))}
          </div>

          <p className="text-xs text-white/40 mb-4">
            총 {area.situations.length}개의 상황이 준비되어 있습니다
          </p>

          <button
            onClick={() => setPhase("playing")}
            className="w-full py-4 rounded-xl font-bold text-lg
                       bg-gradient-to-r from-blue-600 to-violet-600
                       hover:from-blue-500 hover:to-violet-500
                       transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                       text-white shadow-lg shadow-blue-500/20"
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
