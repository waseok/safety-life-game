"use client";

import { useGameStore } from "@/store/useGameStore";
import { backgrounds } from "@/data/backgrounds";
import IllustrationCard from "./IllustrationCard";

export default function IntroScreen() {
  const { selectedCharacter, startGame } = useGameStore();

  if (!selectedCharacter) return null;

  const bg = backgrounds[selectedCharacter.id] || backgrounds["minjun"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 phase-transition">
      <div className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-lg"
        style={{ background: "#ffffff", border: "1.5px solid rgba(2,132,199,0.2)" }}
      >
        <IllustrationCard
          src={bg.image}
          alt={bg.title}
          className="aspect-[21/9]"
        />

        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black mb-1" style={{ color: "#0d2a4a" }}>
            {bg.title}
          </h2>
          <p className="text-sm font-semibold mb-6" style={{ color: "#0284c7" }}>
            {selectedCharacter.name}의 안전 체험학습
          </p>

          <div
            className="text-base leading-relaxed whitespace-pre-line mb-8 max-h-[50vh] overflow-y-auto pr-2"
            style={{ color: "#1e4a72" }}
          >
            {bg.body}
          </div>

          <button
            onClick={startGame}
            className="w-full py-4 rounded-xl font-black text-lg text-white
                       transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
              boxShadow: "0 6px 20px rgba(2,132,199,0.35)",
            }}
          >
            체험 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
