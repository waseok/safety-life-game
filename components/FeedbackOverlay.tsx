"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import ResourceBar from "./ResourceBar";
import { useSound } from "@/hooks/useSound";

export default function FeedbackOverlay() {
  const { lastChoice, proceedAfterFeedback, isGameOver } = useGameStore();
  const { playCorrect, playIncorrect } = useSound();

  const isCorrect = lastChoice?.isCorrect ?? false;

  useEffect(() => {
    if (!lastChoice) return;
    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }
  }, [lastChoice?.id]);

  if (!lastChoice) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#eef6ff" }}>
      <ResourceBar />

      <div className="flex-1 flex items-center justify-center p-4 phase-transition">
        <div
          className="max-w-2xl w-full rounded-2xl overflow-hidden shadow-lg"
          style={{
            background: "#ffffff",
            border: isCorrect
              ? "2px solid rgba(22,163,74,0.4)"
              : "2px solid rgba(220,38,38,0.35)",
            boxShadow: isCorrect
              ? "0 12px 40px rgba(22,163,74,0.12)"
              : "0 12px 40px rgba(220,38,38,0.1)",
          }}
        >
          {/* 결과 헤더 */}
          <div
            className="px-6 py-6 text-center"
            style={{
              background: isCorrect
                ? "linear-gradient(135deg, rgba(22,163,74,0.08) 0%, rgba(16,185,129,0.04) 100%)"
                : "linear-gradient(135deg, rgba(220,38,38,0.07) 0%, rgba(249,115,22,0.04) 100%)",
              borderBottom: isCorrect
                ? "1px solid rgba(22,163,74,0.15)"
                : "1px solid rgba(220,38,38,0.15)",
            }}
          >
            <div className="text-5xl mb-3">{isCorrect ? "✅" : "⚠️"}</div>
            <h3
              className="text-2xl md:text-3xl font-black"
              style={{ color: isCorrect ? "#16a34a" : "#dc2626" }}
            >
              {isCorrect ? "올바른 선택입니다!" : "아쉬운 선택이에요"}
            </h3>
          </div>

          <div className="p-6 md:p-8">
            {/* 스탯 변화 */}
            <div className="flex justify-center gap-4 mb-6">
              {lastChoice.lifeDelta !== 0 && (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
                  style={{
                    background: lastChoice.lifeDelta > 0 ? "rgba(22,163,74,0.1)" : "rgba(220,38,38,0.08)",
                    border: lastChoice.lifeDelta > 0 ? "1px solid rgba(22,163,74,0.3)" : "1px solid rgba(220,38,38,0.25)",
                    color: lastChoice.lifeDelta > 0 ? "#16a34a" : "#dc2626",
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
                    background: lastChoice.mentalDelta > 0 ? "rgba(2,132,199,0.1)" : "rgba(220,38,38,0.08)",
                    border: lastChoice.mentalDelta > 0 ? "1px solid rgba(2,132,199,0.3)" : "1px solid rgba(220,38,38,0.25)",
                    color: lastChoice.mentalDelta > 0 ? "#0284c7" : "#dc2626",
                  }}
                >
                  <span>🧠</span>
                  <span>{lastChoice.mentalDelta > 0 ? "+" : ""}{lastChoice.mentalDelta}</span>
                </div>
              )}
              {lastChoice.lifeDelta === 0 && lastChoice.mentalDelta === 0 && (
                <div className="text-sm font-medium" style={{ color: "#4a7090" }}>변화 없음</div>
              )}
            </div>

            {/* 안전 팁 */}
            <div
              className="rounded-xl p-5 border mb-6"
              style={{
                background: "rgba(2,132,199,0.04)",
                borderColor: "rgba(2,132,199,0.18)",
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: "#0284c7" }}>
                💡 안전 Tip
              </p>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "#0d2a4a" }}>
                {lastChoice.feedback}
              </p>
            </div>

            {/* 게임오버 메시지 */}
            {isGameOver && (
              <div
                className="text-center mb-4 p-4 rounded-xl"
                style={{ background: "rgba(220,38,38,0.07)", border: "1px solid rgba(220,38,38,0.22)" }}
              >
                <p className="font-bold" style={{ color: "#dc2626" }}>
                  💔 자원이 바닥났습니다... 게임 오버!
                </p>
              </div>
            )}

            {/* 다음 버튼 */}
            <button
              onClick={proceedAfterFeedback}
              className="w-full py-4 rounded-xl font-black text-lg text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: isGameOver
                  ? "linear-gradient(135deg, #dc2626, #f97316)"
                  : isCorrect
                  ? "linear-gradient(135deg, #16a34a, #0d9488)"
                  : "linear-gradient(135deg, #0284c7, #0ea5e9)",
                boxShadow: isGameOver
                  ? "0 6px 20px rgba(220,38,38,0.3)"
                  : "0 6px 20px rgba(2,132,199,0.3)",
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
