"use client";

import { useGameStore } from "@/store/useGameStore";
import ResourceBar from "./ResourceBar";

export default function FeedbackOverlay() {
  const { lastChoice, proceedAfterFeedback, isGameOver } = useGameStore();

  if (!lastChoice) return null;

  const isCorrect = lastChoice.isCorrect;

  return (
    <div className="min-h-screen flex flex-col">
      <ResourceBar />

      <div className="flex-1 flex items-center justify-center p-4 phase-transition">
        <div className="max-w-2xl w-full game-card overflow-hidden">
          {/* Header */}
          <div
            className={`px-6 py-5 text-center ${
              isCorrect
                ? "bg-gradient-to-r from-green-600/30 to-emerald-600/30"
                : "bg-gradient-to-r from-red-600/30 to-orange-600/30"
            }`}
          >
            <div className="text-4xl mb-2">{isCorrect ? "✅" : "⚠️"}</div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              {isCorrect ? "올바른 선택입니다!" : "아쉬운 선택이에요"}
            </h3>
          </div>

          <div className="p-6 md:p-8">
            {/* Delta display */}
            <div className="flex justify-center gap-6 mb-6">
              {lastChoice.lifeDelta !== 0 && (
                <div
                  className={`flex items-center gap-1.5 text-sm font-bold ${
                    lastChoice.lifeDelta > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <span>❤️</span>
                  <span>
                    {lastChoice.lifeDelta > 0 ? "+" : ""}
                    {lastChoice.lifeDelta}
                  </span>
                </div>
              )}
              {lastChoice.mentalDelta !== 0 && (
                <div
                  className={`flex items-center gap-1.5 text-sm font-bold ${
                    lastChoice.mentalDelta > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  <span>🧠</span>
                  <span>
                    {lastChoice.mentalDelta > 0 ? "+" : ""}
                    {lastChoice.mentalDelta}
                  </span>
                </div>
              )}
              {lastChoice.lifeDelta === 0 && lastChoice.mentalDelta === 0 && (
                <div className="text-sm text-white/50">변화 없음</div>
              )}
            </div>

            {/* Feedback text */}
            <div className="bg-white/5 rounded-xl p-5 mb-6 border border-white/5">
              <p className="text-sm text-white/40 mb-2 font-medium">💡 안전 Tip</p>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {lastChoice.feedback}
              </p>
            </div>

            {isGameOver && (
              <div className="text-center mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-red-300 font-medium">
                  자원이 바닥났습니다... 게임 오버!
                </p>
              </div>
            )}

            <button
              onClick={proceedAfterFeedback}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-200
                         hover:scale-[1.02] active:scale-[0.98] text-white shadow-lg
                         bg-gradient-to-r from-blue-600 to-violet-600
                         hover:from-blue-500 hover:to-violet-500 shadow-blue-500/20"
            >
              {isGameOver ? "결과 보기" : "다음으로"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
