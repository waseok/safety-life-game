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
      <div className="max-w-2xl w-full game-card overflow-hidden">
        <IllustrationCard
          src={bg.image}
          alt={bg.title}
          className="aspect-[21/9]"
        />

        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 text-white">
            {bg.title}
          </h2>
          <p className="text-sm text-white/40 mb-6">
            {selectedCharacter.name}의 안전 체험학습
          </p>

          <div className="text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line mb-8 max-h-[50vh] overflow-y-auto pr-2">
            {bg.body}
          </div>

          <button
            onClick={startGame}
            className="w-full py-4 rounded-xl font-bold text-lg
                       bg-gradient-to-r from-blue-600 to-violet-600
                       hover:from-blue-500 hover:to-violet-500
                       transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                       text-white shadow-lg shadow-blue-500/20"
          >
            체험 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
