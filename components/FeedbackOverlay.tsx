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
        <div className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "linear-gradient(145deg, #0e1a2e 0%, #080f1e 100%)",
            border: isCorrect ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(239,68,68,0.3)",
            boxShadow: isCorrect
              ? "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(34,197,94,0.08)"
              : "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(239,68,68,0.08)",
          }}
        >
          {/* 결과 헤더 */}
          <div
            className="px-6 py-6 text-center"
            style={{
              background: isCorrect
                ? "linear-gradient(135deg, rgba(34,197,94,0.15) 0%, rgba(16,185,129,0.08) 100%)"
                : "linear-gradient(135deg, rgba(239,68,68,0.15) 0%, rgba(249,115,22,0.08) 100%)",
              borderBottom: isCorrect
                ? "1px solid rgba(34,197,94,0.15)"
                : "1px solid rgba(239,68,68,0.15)",
            }}
          >
            <div className="text-5xl mb-3">{isCorrect ? "✅" : "⚠️"}</div>
            <h3
              className="text-2xl md:text-3xl font-black"
              style={{ color: isCorrect ? "#4ade80" : "#fca5a5" }}
            >
              {isCorrect ? "올바른 선택입니다!" : "아쉬운 선택이에요"}
            </h3>
          </div>

          <div className="p-6 md:p-8">
            {/* 스탯 변화 */}
            <div className="flex justify-center gap-5 mb-6">
              {lastChoice.lifeDelta !== 0 && (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                  style={{
                    background: lastChoice.lifeDelta > 0 ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
                    border: lastChoice.lifeDelta > 0 ? "1px solid rgba(34,197,94,0.3)" : "1px solid rgba(239,68,68,0.3)",
                    color: lastChoice.lifeDelta > 0 ? "#4ade80" : "#f87171",
                  }}
                >
                  <span>❤️</span>
                  <span>{lastChoice.lifeDelta > 0 ? "+" : ""}{lastChoice.lifeDelta}</span>
                </div>
              )}
              {lastChoice.mentalDelta !== 0 && (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                  style={{
                    background: lastChoice.mentalDelta > 0 ? "rgba(139,92,246,0.12)" : "rgba(239,68,68,0.12)",
                    border: lastChoice.mentalDelta > 0 ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(239,68,68,0.3)",
                    color: lastChoice.mentalDelta > 0 ? "#c084fc" : "#f87171",
                  }}
                >
                  <span>🧠</span>
                  <span>{lastChoice.mentalDelta > 0 ? "+" : ""}{lastChoice.mentalDelta}</span>
                </div>
              )}
              {lastChoice.lifeDelta === 0 && lastChoice.mentalDelta === 0 && (
                <div className="text-sm" style={{ color: "rgba(240,244,255,0.4)" }}>변화 없음</div>
              )}
            </div>

            {/* 안전 팁 */}
            <div className="safety-tip-box mb-6">
              <p className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: "rgba(249,115,22,0.7)" }}>
                💡 안전 Tip
              </p>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(240,244,255,0.8)" }}>
                {lastChoice.feedback}
              </p>
            </div>

            {/* 게임오버 메시지 */}
            {isGameOver && (
              <div
                className="text-center mb-4 p-4 rounded-xl"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)" }}
              >
                <p className="font-bold" style={{ color: "#f87171" }}>
                  💀 자원이 바닥났습니다... 게임 오버!
                </p>
              </div>
            )}

            {/* 다음 버튼 */}
            <button
              onClick={proceedAfterFeedback}
              className="w-full py-4 rounded-xl font-black text-lg text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: isGameOver
                  ? "linear-gradient(135deg, #ef4444, #f97316)"
                  : "linear-gradient(135deg, #f97316, #fbbf24)",
                boxShadow: isGameOver
                  ? "0 8px 24px rgba(239,68,68,0.3)"
                  : "0 8px 24px rgba(249,115,22,0.3)",
              }}
            >
              {isGameOver ? "💀 결과 보기" : "다음으로 →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
