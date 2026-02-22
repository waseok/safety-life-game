"use client";

import { create } from "zustand";
import { Character, Choice, ChoiceRecord, GamePhase } from "@/types/game";
import { allAreas } from "@/data/areas";
import { endings } from "@/data/endings";

interface GameStore {
  phase: GamePhase;
  selectedCharacter: Character | null;
  currentAreaIndex: number;
  currentSituationIndex: number;
  life: number;
  mental: number;
  maxLife: number;
  maxMental: number;
  completedSituations: string[];
  choiceHistory: ChoiceRecord[];
  lastChoice: Choice | null;
  isGameOver: boolean;
  correctCount: number;
  totalChoices: number;

  setPhase: (phase: GamePhase) => void;
  selectCharacter: (character: Character) => void;
  startGame: () => void;
  makeChoice: (situationId: string, choice: Choice) => void;
  proceedAfterFeedback: () => void;
  resetGame: () => void;
  getCurrentArea: () => (typeof allAreas)[number] | undefined;
  getCurrentSituation: () => ReturnType<GameStore["getCurrentArea"]> extends undefined
    ? undefined
    : (typeof allAreas)[number]["situations"][number] | undefined;
  getEnding: () => (typeof endings)[number];
  getProgress: () => { current: number; total: number; percent: number };
}

export const useGameStore = create<GameStore>((set, get) => ({
  phase: "title",
  selectedCharacter: null,
  currentAreaIndex: 0,
  currentSituationIndex: 0,
  life: 100,
  mental: 100,
  maxLife: 100,
  maxMental: 100,
  completedSituations: [],
  choiceHistory: [],
  lastChoice: null,
  isGameOver: false,
  correctCount: 0,
  totalChoices: 0,

  setPhase: (phase) => set({ phase }),

  selectCharacter: (character) =>
    set({
      selectedCharacter: character,
      life: character.initialLife,
      mental: character.initialMental,
      maxLife: character.initialLife,
      maxMental: character.initialMental,
      phase: "intro",
    }),

  startGame: () =>
    set({
      phase: "area-intro",
      currentAreaIndex: 0,
      currentSituationIndex: 0,
    }),

  makeChoice: (situationId, choice) => {
    const state = get();
    const newLife = Math.max(0, Math.min(state.maxLife, state.life + choice.lifeDelta));
    const newMental = Math.max(0, Math.min(state.maxMental, state.mental + choice.mentalDelta));
    const record: ChoiceRecord = {
      situationId,
      choiceId: choice.id,
      lifeDelta: choice.lifeDelta,
      mentalDelta: choice.mentalDelta,
      isCorrect: choice.isCorrect,
    };

    set({
      life: newLife,
      mental: newMental,
      lastChoice: choice,
      completedSituations: [...state.completedSituations, situationId],
      choiceHistory: [...state.choiceHistory, record],
      correctCount: state.correctCount + (choice.isCorrect ? 1 : 0),
      totalChoices: state.totalChoices + 1,
      phase: "feedback",
      isGameOver: newLife <= 0 || newMental <= 0,
    });
  },

  proceedAfterFeedback: () => {
    const state = get();

    if (state.isGameOver) {
      set({ phase: "ending" });
      return;
    }

    const area = allAreas[state.currentAreaIndex];
    if (!area) {
      set({ phase: "ending" });
      return;
    }

    const nextSitIdx = state.currentSituationIndex + 1;

    if (nextSitIdx >= area.situations.length) {
      const nextAreaIdx = state.currentAreaIndex + 1;
      if (nextAreaIdx >= allAreas.length) {
        set({ phase: "ending" });
      } else {
        set({
          currentAreaIndex: nextAreaIdx,
          currentSituationIndex: 0,
          phase: "area-intro",
        });
      }
    } else {
      set({
        currentSituationIndex: nextSitIdx,
        phase: "playing",
      });
    }
  },

  resetGame: () =>
    set({
      phase: "title",
      selectedCharacter: null,
      currentAreaIndex: 0,
      currentSituationIndex: 0,
      life: 100,
      mental: 100,
      maxLife: 100,
      maxMental: 100,
      completedSituations: [],
      choiceHistory: [],
      lastChoice: null,
      isGameOver: false,
      correctCount: 0,
      totalChoices: 0,
    }),

  getCurrentArea: () => allAreas[get().currentAreaIndex],

  getCurrentSituation: () => {
    const area = allAreas[get().currentAreaIndex];
    if (!area) return undefined;
    return area.situations[get().currentSituationIndex];
  },

  getEnding: () => {
    const { life, mental, isGameOver } = get();
    if (isGameOver) return endings.find((e) => e.type === "gameover")!;
    if (life >= 60 && mental >= 60) return endings.find((e) => e.type === "good")!;
    if (life >= 30 && mental >= 30) return endings.find((e) => e.type === "normal")!;
    return endings.find((e) => e.type === "bad")!;
  },

  getProgress: () => {
    const { currentAreaIndex, currentSituationIndex } = get();
    let completed = 0;
    let total = 0;
    for (let i = 0; i < allAreas.length; i++) {
      const area = allAreas[i];
      total += area.situations.length;
      if (i < currentAreaIndex) {
        completed += area.situations.length;
      } else if (i === currentAreaIndex) {
        completed += currentSituationIndex;
      }
    }
    return { current: completed, total, percent: total > 0 ? (completed / total) * 100 : 0 };
  },
}));
