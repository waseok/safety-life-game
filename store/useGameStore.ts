"use client";

import { create } from "zustand";
import { Character, Choice, ChoiceRecord, GamePhase, QuestionScore } from "@/types/game";
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
  questionScore: number;
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

// 캐릭터별 정답 보너스
const CHARACTER_LIFE_BONUS: Record<string, number> = {
  minjun: 8,
  seoyeon: 3,
  hyunwoo: 8,
};
const CHARACTER_MENTAL_BONUS: Record<string, number> = {
  minjun: 3,
  seoyeon: 8,
  hyunwoo: 5,
};

// 중간점 — 상황 총 개수의 절반 (20개 기준 10번째 완료 후)
const MIDPOINT_RATIO = 0.5;

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
  // 질문 만들기 관련
  questionScores: Record<string, QuestionScore>;   // key: "{areaId}-mid" | "{areaId}-final"
  midQuizDone: Record<string, boolean>;            // areaId → true if mid-quiz already shown

  setPhase: (phase: GamePhase) => void;
  setPlayerName: (name: string) => void;
  selectCharacter: (character: Character) => void;
  startGame: () => void;
  selectArea: (areaIndex: number) => void;
  quitToAreaSelect: () => void;
  makeChoice: (situationId: string, choice: Choice) => void;
  revealTip: () => void;
  proceedAfterFeedback: () => void;
  // 질문 만들기 제출 (GPT 평가 결과를 컴포넌트에서 받아서 전달)
  submitQuizQuestion: (areaId: string, question: string, score: QuestionScore, isMidpoint: boolean) => void;
  proceedFromAreaComplete: () => void;
  saveScore: () => void;
  saveAreaScore: (areaId: string) => Promise<void>;
  fetchServerRankings: () => Promise<void>;
  recordQuestionScore: (key: string, score: QuestionScore) => void;
  resetGame: () => void;
  getCurrentArea: () => (typeof allAreas)[number] | undefined;
  getCurrentSituation: () => ReturnType<GameStore["getCurrentArea"]> extends undefined
    ? undefined
    : (typeof allAreas)[number]["situations"][number] | undefined;
  getEnding: () => (typeof endings)[number];
  getProgress: () => { current: number; total: number; percent: number };
  getTotalQuestionScore: (areaId: string) => number;
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
  questionScores: {},
  midQuizDone: {},

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

  startGame: () => set({ phase: "area-select" }),

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
    const lifeBonus = choice.isCorrect ? (CHARACTER_LIFE_BONUS[charId] ?? 0) : 0;
    const mentalBonus = choice.isCorrect ? (CHARACTER_MENTAL_BONUS[charId] ?? 0) : 0;

    const newLife = Math.max(0, Math.min(state.maxLife, state.life + choice.lifeDelta + lifeBonus));
    const newMental = Math.max(0, Math.min(state.maxMental, state.mental + choice.mentalDelta + mentalBonus));
    const gameOver = newLife <= 0 || newMental <= 0;
    const currentArea = allAreas[state.currentAreaIndex];

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

  revealTip: () => {
    const state = get();
    if (state.tipRevealed) return;
    const newMental = Math.min(state.maxMental, state.mental + 5);
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
    const midPoint = Math.floor(area.situations.length * MIDPOINT_RATIO);

    if (nextSitIdx >= area.situations.length) {
      // 영역 완료 → 최종 질문 만들기
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
        phase: "area-quiz",
      });
    } else if (nextSitIdx === midPoint && !state.midQuizDone[area.id]) {
      // 중간 도달 → 중간 질문 만들기
      set({
        currentSituationIndex: nextSitIdx,
        midQuizDone: { ...state.midQuizDone, [area.id]: true },
        phase: "area-midquiz",
      });
    } else {
      set({
        currentSituationIndex: nextSitIdx,
        phase: "playing",
      });
    }
  },

  // 질문 만들기 제출 — GPT 평가 결과 포함
  submitQuizQuestion: (areaId, question, score, isMidpoint) => {
    const state = get();
    const key = `${areaId}-${isMidpoint ? "mid" : "final"}`;
    // 질문 점수에 비례한 판단력 보너스 (0-50점 → 0-20 판단력)
    const mentalBonus = Math.round((score.score / 50) * 20);
    const newMental = Math.min(state.maxMental, state.mental + mentalBonus);

    set({
      questionScores: { ...state.questionScores, [key]: score },
      quizAnswers: { ...state.quizAnswers, [key]: question },
      mental: newMental,
      phase: isMidpoint ? "playing" : "area-complete",
    });
  },

  recordQuestionScore: (key, score) => {
    set((state) => ({
      questionScores: { ...state.questionScores, [key]: score },
    }));
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
    // 전체 질문 점수 합산
    const totalQScore = Object.values(state.questionScores).reduce((sum, q) => sum + q.score, 0);
    const score = state.life + state.mental + (state.correctCount * 10) + totalQScore;
    const entry: RankingEntry = {
      name: state.playerName || "익명",
      score,
      accuracy,
      questionScore: totalQScore,
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
    const midScore = state.questionScores[`${areaId}-mid`]?.score ?? 0;
    const finalScore = state.questionScores[`${areaId}-final`]?.score ?? 0;
    const questionScore = midScore + finalScore;
    const areaScore = state.life + state.mental + ((result?.correctCount ?? 0) * 10) + questionScore;
    const entry: RankingEntry = {
      name: state.playerName || "익명",
      score: areaScore,
      accuracy,
      questionScore,
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

  getTotalQuestionScore: (areaId: string) => {
    const state = get();
    const mid = state.questionScores[`${areaId}-mid`]?.score ?? 0;
    const final = state.questionScores[`${areaId}-final`]?.score ?? 0;
    return mid + final;
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
      questionScores: {},
      midQuizDone: {},
      rankings: loadRankings(),
      // serverRankings persists
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
