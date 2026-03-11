"use client";

import { useState } from "react";
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
  const setPhase = useGameStore((s) => s.setPhase);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSelect = (char: Character) => {
    selectCharacter(char);
  };

  const toggleExpand = (e: React.MouseEvent | React.TouchEvent, charId: string) => {
    e.stopPropagation();
    setExpandedId((prev) => (prev === charId ? null : charId));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 phase-transition">
      {/* 뒤로 가기 */}
      <div className="w-full max-w-4xl mb-4">
        <button
          onClick={() => setPhase("title")}
          className="px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105"
          style={{
            background: "rgba(2,132,199,0.08)",
            border: "1px solid rgba(2,132,199,0.22)",
            color: "#0284c7",
          }}
        >
          ← 처음으로
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-black mb-2" style={{ color: "#0d2a4a" }}>
          캐릭터 선택
        </h1>
        <p className="text-base font-medium" style={{ color: "#4a7090" }}>
          함께 안전 체험을 할 캐릭터를 선택하세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {characters.map((char) => {
          const isExpanded = expandedId === char.id;
          return (
            <div
              key={char.id}
              className="game-card p-0 overflow-hidden text-left group cursor-pointer
                         transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
              style={{ background: "#ffffff" }}
              onClick={() => handleSelect(char)}
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

                {/* 설명: 기본 2줄, 버튼으로 전체 토글 */}
                <div className="mb-3">
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "#2a5070",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: isExpanded ? "unset" : 2,
                      overflow: isExpanded ? "visible" : "hidden",
                    } as React.CSSProperties}
                  >
                    {char.description}
                  </p>
                  <button
                    onClick={(e) => toggleExpand(e, char.id)}
                    onTouchEnd={(e) => toggleExpand(e, char.id)}
                    className="mt-1 text-xs font-bold transition-colors hover:underline"
                    style={{ color: "#0284c7" }}
                  >
                    {isExpanded ? "▲ 접기" : "▼ 더 보기"}
                  </button>
                </div>

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
                  <span style={{ color: "#0284c7" }}>🧪 {char.initialMental}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
