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
      <div className="max-w-2xl w-full mb-4">
        <button
          onClick={quitToAreaSelect}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-colors hover:scale-105"
          style={{
            background: "rgba(2,132,199,0.08)",
            border: "1px solid rgba(2,132,199,0.22)",
            color: "#0284c7",
          }}
        >
          ← 영역 선택으로
        </button>
      </div>

      <div
        className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-lg"
        style={{
          background: "#ffffff",
          border: `2px solid ${area.color}35`,
          boxShadow: `0 8px 32px ${area.color}15`,
        }}
      >
        <IllustrationCard
          src={area.coverImage}
          alt={area.title}
          className="aspect-[16/9]"
        />

        <div className="p-6 md:p-8 text-center">
          <div className="text-5xl mb-3">{area.icon}</div>
          <h2 className="text-2xl md:text-3xl font-black mb-2" style={{ color: "#0d2a4a" }}>
            {area.title}
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: "#2a5070" }}>
            {area.description}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {area.subAreas.map((sub) => (
              <span
                key={sub.id}
                className="px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: `${area.color}12`,
                  border: `1.5px solid ${area.color}35`,
                  color: area.color,
                }}
              >
                {sub.title}
              </span>
            ))}
          </div>

          <p className="text-sm font-semibold mb-5" style={{ color: "#4a7090" }}>
            총 {area.situations.length}개의 상황이 준비되어 있습니다
          </p>

          <button
            onClick={() => setPhase("playing")}
            className="w-full py-4 rounded-xl font-black text-lg text-white
                       transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${area.color}, ${area.color}cc)`,
              boxShadow: `0 6px 20px ${area.color}40`,
            }}
          >
            시작하기 →
          </button>
        </div>
      </div>
    </div>
  );
}
