"use client";

import { create } from "zustand";
import { Character, Choice, ChoiceRecord, GamePhase } from "@/types/game";
import { allAreas } from "@/data/areas";
import { endings } from "@/data/endings";

export interface AreaResult {
  areaId: string;
  correctCount: number;
  totalChoices: number;
}

// 캐릭터별 정답 보너스 (생명력 보너스)
const CHARACTER_LIFE_BONUS: Record<string, number> = {
  minjun: 5,   // 활발/용감 → 체력 회복
  seoyeon: 0,  // 꼼꼼/책임감 → 판단력 위주
  hyunwoo: 5,  // 운동신경 → 체력 보너스로 균형
};
const CHARACTER_MENTAL_BONUS: Record<string, number> = {
  minjun: 0,
  seoyeon: 5,  // 꼼꼼함 → 판단력 회복
  hyunwoo: 0,
};

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
  completedAreas: string[];
  areaSessionCorrect: number;
  areaSessionTotal: number;
  areaResults: AreaResult[];
  tipRevealed: boolean;

  setPhase: (phase: GamePhase) => void;
  selectCharacter: (character: Character) => void;
  startGame: () => void;
  selectArea: (areaIndex: number) => void;
  quitToAreaSelect: () => void;
  makeChoice: (situationId: string, choice: Choice) => void;
  revealTip: () => void;
  proceedAfterFeedback: () => void;
  proceedFromAreaComplete: () => void;
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
  completedAreas: [],
  areaSessionCorrect: 0,
  areaSessionTotal: 0,
  areaResults: [],
  tipRevealed: false,

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
      phase: "area-select",
    }),

  selectArea: (areaIndex: number) =>
    set({
      currentAreaIndex: areaIndex,
      currentSituationIndex: 0,
      phase: "area-intro",
      areaSessionCorrect: 0,
      areaSessionTotal: 0,
    }),

  quitToAreaSelect: () =>
    set({
      phase: "area-select",
      currentSituationIndex: 0,
      lastChoice: null,
      areaSessionCorrect: 0,
      areaSessionTotal: 0,
    }),

  makeChoice: (situationId, choice) => {
    const state = get();
    const charId = state.selectedCharacter?.id ?? "";
    // 정답 시 캐릭터 보너스 적용
    const lifeBonus = choice.isCorrect ? (CHARACTER_LIFE_BONUS[charId] ?? 0) : 0;
    const mentalBonus = choice.isCorrect ? (CHARACTER_MENTAL_BONUS[charId] ?? 0) : 0;

    const newLife = Math.max(0, Math.min(state.maxLife, state.life + choice.lifeDelta + lifeBonus));
    const newMental = Math.max(0, Math.min(state.maxMental, state.mental + choice.mentalDelta + mentalBonus));
    const record: ChoiceRecord = {
      situationId,
      choiceId: choice.id,
      lifeDelta: choice.lifeDelta + lifeBonus,
      mentalDelta: choice.mentalDelta + mentalBonus,
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
      areaSessionCorrect: state.areaSessionCorrect + (choice.isCorrect ? 1 : 0),
      areaSessionTotal: state.areaSessionTotal + 1,
      phase: "feedback",
      isGameOver: newLife <= 0 || newMental <= 0,
      tipRevealed: false,
    });
  },

  // 안전 팁 공개 시 판단력 +5 보너스
  revealTip: () => {
    const state = get();
    if (state.tipRevealed) return;
    const bonusMental = 5;
    const newMental = Math.min(state.maxMental, state.mental + bonusMental);
    set({ tipRevealed: true, mental: newMental });
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
      const newCompleted = [...state.completedAreas];
      if (!newCompleted.includes(area.id)) {
        newCompleted.push(area.id);
      }
      const newAreaResults: AreaResult[] = [
        ...state.areaResults.filter((r) => r.areaId !== area.id),
        {
          areaId: area.id,
          correctCount: state.areaSessionCorrect,
          totalChoices: state.areaSessionTotal,
        },
      ];
      set({
        completedAreas: newCompleted,
        areaResults: newAreaResults,
        phase: "area-complete",
      });
    } else {
      set({
        currentSituationIndex: nextSitIdx,
        phase: "playing",
      });
    }
  },

  proceedFromAreaComplete: () => {
    const state = get();
    if (state.completedAreas.length >= allAreas.length) {
      set({ phase: "ending" });
    } else {
      set({ phase: "area-select" });
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
      completedAreas: [],
      areaSessionCorrect: 0,
      areaSessionTotal: 0,
      areaResults: [],
      tipRevealed: false,
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
