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

export interface RankingEntry {
  name: string;
  score: number;
  accuracy: number;
  date: string;
}

function loadRankings(): RankingEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("safety-life-rankings");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRankings(rankings: RankingEntry[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("safety-life-rankings", JSON.stringify(rankings));
}

// 캐릭터별 정답 보너스 - 균형적 스탯 회복
const CHARACTER_LIFE_BONUS: Record<string, number> = {
  minjun: 8,    // 활발/용감 → 체력 우선 회복
  seoyeon: 3,   // 꼼꼼함 → 약간의 체력도 회복
  hyunwoo: 8,   // 운동신경 → 체력 강한 회복
};
const CHARACTER_MENTAL_BONUS: Record<string, number> = {
  minjun: 3,    // 호기심 → 약간의 판단력도 회복
  seoyeon: 8,   // 책임감 → 판단력 우선 회복
  hyunwoo: 5,   // 사교성 → 균형 있게 판단력도 회복
};

interface GameStore {
  phase: GamePhase;
  playerName: string;
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
  gameOverAreaId: string | null;
  quizAnswers: Record<string, string>;
  rankings: RankingEntry[];
  serverRankings: RankingEntry[];

  setPhase: (phase: GamePhase) => void;
  setPlayerName: (name: string) => void;
  selectCharacter: (character: Character) => void;
  startGame: () => void;
  selectArea: (areaIndex: number) => void;
  quitToAreaSelect: () => void;
  makeChoice: (situationId: string, choice: Choice) => void;
  revealTip: () => void;
  proceedAfterFeedback: () => void;
  submitQuizAnswer: (answer: string) => void;
  proceedFromAreaComplete: () => void;
  saveScore: () => void;
  saveAreaScore: (areaId: string) => Promise<void>;
  fetchServerRankings: () => Promise<void>;
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
  playerName: "",
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
  gameOverAreaId: null,
  quizAnswers: {},
  rankings: loadRankings(),
  serverRankings: [],

  setPhase: (phase) => set({ phase }),
  setPlayerName: (name) => set({ playerName: name }),

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
    const gameOver = newLife <= 0 || newMental <= 0;
    const currentArea = allAreas[state.currentAreaIndex];

    // 보너스가 반영된 델타를 lastChoice에 저장 → FeedbackOverlay 표시에 보너스가 나타남
    const effectiveChoice: Choice = {
      ...choice,
      lifeDelta: choice.lifeDelta + lifeBonus,
      mentalDelta: choice.mentalDelta + mentalBonus,
    };
    const record: ChoiceRecord = {
      situationId,
      choiceId: choice.id,
      lifeDelta: effectiveChoice.lifeDelta,
      mentalDelta: effectiveChoice.mentalDelta,
      isCorrect: choice.isCorrect,
    };

    set({
      life: newLife,
      mental: newMental,
      lastChoice: effectiveChoice,
      completedSituations: [...state.completedSituations, situationId],
      choiceHistory: [...state.choiceHistory, record],
      correctCount: state.correctCount + (choice.isCorrect ? 1 : 0),
      totalChoices: state.totalChoices + 1,
      areaSessionCorrect: state.areaSessionCorrect + (choice.isCorrect ? 1 : 0),
      areaSessionTotal: state.areaSessionTotal + 1,
      phase: "feedback",
      isGameOver: gameOver,
      tipRevealed: false,
      gameOverAreaId: gameOver ? (currentArea?.id ?? null) : state.gameOverAreaId,
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
        phase: "area-quiz",   // ← 에어리어 완료 후 IB 탐구 질문으로
      });
    } else {
      set({
        currentSituationIndex: nextSitIdx,
        phase: "playing",
      });
    }
  },

  // IB 탐구 질문 제출 — 답변 저장 + 판단력 보너스 + area-complete로 전환
  submitQuizAnswer: (answer: string) => {
    const state = get();
    const area = allAreas[state.currentAreaIndex];
    const bonusMental = 15;
    const newMental = Math.min(state.maxMental, state.mental + bonusMental);
    set({
      quizAnswers: { ...state.quizAnswers, [area?.id ?? ""]: answer },
      mental: newMental,
      phase: "area-complete",
    });
  },

  proceedFromAreaComplete: () => {
    const state = get();
    if (state.completedAreas.length >= allAreas.length) {
      set({ phase: "ending" });
    } else {
      set({ phase: "area-select" });
    }
  },

  saveScore: () => {
    const state = get();
    const accuracy = state.totalChoices > 0
      ? Math.round((state.correctCount / state.totalChoices) * 100) : 0;
    const score = state.life + state.mental + (state.correctCount * 10);
    const entry: RankingEntry = {
      name: state.playerName || "익명",
      score,
      accuracy,
      date: new Date().toLocaleDateString("ko-KR"),
    };
    const updated = [...loadRankings(), entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 20);
    saveRankings(updated);
    set({ rankings: updated });
  },

  saveAreaScore: async (areaId: string) => {
    const state = get();
    const result = state.areaResults.find((r) => r.areaId === areaId);
    const accuracy = result && result.totalChoices > 0
      ? Math.round((result.correctCount / result.totalChoices) * 100) : 0;
    const areaScore = state.life + state.mental + ((result?.correctCount ?? 0) * 10);
    const entry: RankingEntry = {
      name: state.playerName || "익명",
      score: areaScore,
      accuracy,
      date: new Date().toLocaleDateString("ko-KR"),
    };
    try {
      const res = await fetch("/api/rankings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (res.ok) {
        const data = await res.json();
        set({ serverRankings: data.rankings ?? [] });
      }
    } catch {
      // Silently fail if server unavailable
    }
  },

  fetchServerRankings: async () => {
    try {
      const res = await fetch("/api/rankings");
      if (res.ok) {
        const data: RankingEntry[] = await res.json();
        set({ serverRankings: data });
      }
    } catch {
      // Silently fail
    }
  },

  resetGame: () =>
    set({
      phase: "title",
      playerName: "",
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
      gameOverAreaId: null,
      quizAnswers: {},
      rankings: loadRankings(),
      // serverRankings persists across resets
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
