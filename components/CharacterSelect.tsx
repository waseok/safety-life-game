"use client";

import { characters } from "@/data/characters";
import { useGameStore } from "@/store/useGameStore";
import { Character } from "@/types/game";
import IllustrationCard from "./IllustrationCard";

const TRAIT_COLORS = [
  "bg-blue-500/20 text-blue-300",
  "bg-green-500/20 text-green-300",
  "bg-amber-500/20 text-amber-300",
  "bg-pink-500/20 text-pink-300",
];

export default function CharacterSelect() {
  const selectCharacter = useGameStore((s) => s.selectCharacter);

  const handleSelect = (char: Character) => {
    selectCharacter(char);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 phase-transition">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
          캐릭터 선택
        </h1>
        <p className="text-white/50 text-sm md:text-base">
          함께 안전 체험을 할 캐릭터를 선택하세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => handleSelect(char)}
            className="game-card p-0 overflow-hidden text-left group cursor-pointer
                       hover:ring-2 hover:ring-blue-400/50 focus:ring-2 focus:ring-blue-400/50
                       focus:outline-none transition-all duration-300 hover:-translate-y-1"
          >
            <IllustrationCard
              src={char.image}
              alt={char.name}
              className="aspect-[4/3]"
              overlay={false}
            />

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">{char.name}</h3>
                <span className="text-xs text-white/40">{char.age}세</span>
              </div>

              <p className="text-sm text-white/60 mb-3 leading-relaxed line-clamp-2">
                {char.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {char.traits.map((trait, i) => (
                  <span
                    key={trait}
                    className={`text-xs px-2.5 py-1 rounded-full ${TRAIT_COLORS[i % TRAIT_COLORS.length]}`}
                  >
                    {trait}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 text-xs text-white/40">
                <span>❤️ {char.initialLife}</span>
                <span>🧠 {char.initialMental}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
