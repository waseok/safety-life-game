"use client";

import { characters } from "@/data/characters";
import { useGameStore } from "@/store/useGameStore";
import { Character } from "@/types/game";
import IllustrationCard from "./IllustrationCard";

const TRAIT_COLORS = [
  { bg: "rgba(2,132,199,0.1)", text: "#0369a1", border: "rgba(2,132,199,0.3)" },
  { bg: "rgba(22,163,74,0.1)", text: "#15803d", border: "rgba(22,163,74,0.3)" },
  { bg: "rgba(245,158,11,0.1)", text: "#b45309", border: "rgba(245,158,11,0.3)" },
  { bg: "rgba(139,92,246,0.1)", text: "#7c3aed", border: "rgba(139,92,246,0.3)" },
];

export default function CharacterSelect() {
  const selectCharacter = useGameStore((s) => s.selectCharacter);

  const handleSelect = (char: Character) => {
    selectCharacter(char);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 phase-transition">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black mb-2" style={{ color: "#0d2a4a" }}>
          캐릭터 선택
        </h1>
        <p className="text-base font-medium" style={{ color: "#4a7090" }}>
          함께 안전 체험을 할 캐릭터를 선택하세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {characters.map((char) => (
          <button
            key={char.id}
            onClick={() => handleSelect(char)}
            className="game-card p-0 overflow-hidden text-left group cursor-pointer
                       transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
            style={{ background: "#ffffff" }}
          >
            <IllustrationCard
              src={char.image}
              alt={char.name}
              className="aspect-[4/3]"
              overlay={false}
            />

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-black" style={{ color: "#0d2a4a" }}>{char.name}</h3>
                <span className="text-sm font-semibold" style={{ color: "#4a7090" }}>{char.age}세</span>
              </div>

              <p className="text-sm leading-relaxed mb-3 line-clamp-2" style={{ color: "#2a5070" }}>
                {char.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {char.traits.map((trait, i) => {
                  const col = TRAIT_COLORS[i % TRAIT_COLORS.length];
                  return (
                    <span
                      key={trait}
                      className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: col.bg, color: col.text, border: `1px solid ${col.border}` }}
                    >
                      {trait}
                    </span>
                  );
                })}
              </div>

              <div className="flex gap-4 text-sm font-bold">
                <span style={{ color: "#16a34a" }}>❤️ {char.initialLife}</span>
                <span style={{ color: "#0284c7" }}>🧠 {char.initialMental}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
