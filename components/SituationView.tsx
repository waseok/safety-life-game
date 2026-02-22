"use client";

import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { Choice } from "@/types/game";
import IllustrationCard from "./IllustrationCard";
import ResourceBar from "./ResourceBar";

export default function SituationView() {
  const makeChoice = useGameStore((s) => s.makeChoice);
  const currentAreaIndex = useGameStore((s) => s.currentAreaIndex);
  const currentSituationIndex = useGameStore((s) => s.currentSituationIndex);
  const [isChoosing, setIsChoosing] = useState(false);

  const area = allAreas[currentAreaIndex];
  const situation = area?.situations[currentSituationIndex];

  if (!area || !situation) return null;

  const subArea = area.subAreas.find((s) => s.id === situation.subAreaId);

  const handleChoice = (choice: Choice) => {
    if (isChoosing) return;
    setIsChoosing(true);
    setTimeout(() => {
      makeChoice(situation.id, choice);
      setIsChoosing(false);
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ResourceBar />

      <div className="flex-1 flex flex-col items-center p-4 pb-8 phase-transition">
        <div className="max-w-2xl w-full">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {subArea && (
                <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/60">
                  {subArea.title}
                </span>
              )}
            </div>
            <span className="text-xs text-white/40">
              {currentSituationIndex + 1} / {area.situations.length}
            </span>
          </div>

          <div className="game-card overflow-hidden mb-6">
            <IllustrationCard
              src={situation.image}
              alt={situation.title}
              subAreaId={situation.subAreaId}
              className="aspect-[16/9]"
            />

            <div className="p-5 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {situation.title}
              </h3>
              <p className="text-white/70 text-sm md:text-base leading-relaxed whitespace-pre-line">
                {situation.body}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-white/40 mb-2">어떻게 하시겠습니까?</p>
            {situation.choices.map((choice, idx) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                disabled={isChoosing}
                className={`choice-btn flex items-start gap-3 ${
                  isChoosing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-white/10
                               flex items-center justify-center text-sm font-bold text-white/60 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{choice.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
