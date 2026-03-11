"use client";

import { useEffect } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { AREA_VIDEOS, AREA_BOARD_URL } from "@/data/safetyVideos";
import ResourceBar from "./ResourceBar";
import { useSound } from "@/hooks/useSound";

export default function FeedbackOverlay() {
  const { lastChoice, proceedAfterFeedback, isGameOver, tipRevealed, revealTip, gameOverAreaId } = useGameStore();
  const currentAreaIndex = useGameStore((s) => s.currentAreaIndex);
  const { playCorrect, playIncorrect } = useSound();

  const isCorrect = lastChoice?.isCorrect ?? false;

  useEffect(() => {
    if (!lastChoice) return;
    if (isCorrect) playCorrect();
    else playIncorrect();
  }, [lastChoice?.id]);

  if (!lastChoice) return null;

  // 게임오버 시: gameOverAreaId 우선, 없으면 currentAreaIndex 기반
  const resolvedAreaId = isGameOver
    ? (gameOverAreaId ?? allAreas[currentAreaIndex]?.id ?? null)
    : (allAreas[currentAreaIndex]?.id ?? null);

  const resolvedArea = allAreas.find((a) => a.id === resolvedAreaId);
  const videos = resolvedAreaId ? (AREA_VIDEOS[resolvedAreaId] ?? []) : [];

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
                ? "linear-gradient(135deg, rgba(22,163,74,0.08), rgba(16,185,129,0.04))"
                : "linear-gradient(135deg, rgba(220,38,38,0.07), rgba(249,115,22,0.04))",
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
                  <span>🧪</span>
                  <span>{lastChoice.mentalDelta > 0 ? "+" : ""}{lastChoice.mentalDelta}</span>
                </div>
              )}
              {lastChoice.lifeDelta === 0 && lastChoice.mentalDelta === 0 && (
                <div className="text-sm font-medium" style={{ color: "#4a7090" }}>변화 없음</div>
              )}
            </div>

            {/* ★ 안전 팁 - 숨겨져 있고 읽으면 판단력 +5 ★ */}
            {!tipRevealed ? (
              <button
                onClick={revealTip}
                className="w-full rounded-xl p-4 mb-6 text-center transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                style={{
                  background: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(2,132,199,0.06))",
                  border: "2px dashed rgba(245,158,11,0.5)",
                  cursor: "pointer",
                }}
              >
                <p className="text-base font-black mb-1" style={{ color: "#b45309" }}>
                  🔒 안전 팁이 숨겨져 있어요!
                </p>
                <p className="text-sm font-semibold mb-2" style={{ color: "#4a7090" }}>
                  팁을 확인하면
                </p>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-black"
                  style={{
                    background: "rgba(2,132,199,0.12)",
                    border: "1.5px solid rgba(2,132,199,0.35)",
                    color: "#0284c7",
                  }}
                >
                  🧪 판단력 +5 보너스!
                </span>
                <p className="text-xs mt-2 font-semibold" style={{ color: "#f59e0b" }}>
                  👆 탭하여 안전 팁 보기
                </p>
              </button>
            ) : (
              <div
                className="rounded-xl p-5 border mb-6"
                style={{
                  background: "rgba(2,132,199,0.04)",
                  borderColor: "rgba(2,132,199,0.18)",
                }}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <p className="text-xs font-black uppercase tracking-widest" style={{ color: "#0284c7" }}>
                    💡 안전 Tip
                  </p>
                  <span
                    className="text-xs font-black px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(2,132,199,0.12)", color: "#0284c7", border: "1px solid rgba(2,132,199,0.25)" }}
                  >
                    🧪 +5 판단력 획득!
                  </span>
                </div>
                <p className="text-sm md:text-base leading-relaxed" style={{ color: "#0d2a4a" }}>
                  {lastChoice.feedback}
                </p>
              </div>
            )}

            {/* 게임오버 - 영역별 영상 링크 */}
            {isGameOver && (
              <div
                className="mb-5 p-4 rounded-xl"
                style={{ background: "rgba(220,38,38,0.06)", border: "1.5px solid rgba(220,38,38,0.22)" }}
              >
                <p className="font-black text-base mb-2" style={{ color: "#dc2626" }}>
                  💔 자원이 바닥났습니다... 게임 오버!
                </p>

                {/* 영역명 뱃지 - 어느 영역 영상인지 명시 */}
                {resolvedArea && (
                  <div className="mb-3">
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-black"
                      style={{
                        background: `${resolvedArea.color}15`,
                        border: `1.5px solid ${resolvedArea.color}40`,
                        color: resolvedArea.color,
                      }}
                    >
                      {resolvedArea.icon} {resolvedArea.title} 안전교육 영상
                    </span>
                  </div>
                )}

                {videos.length > 0 ? (
                  <>
                    <p className="text-sm font-bold mb-2" style={{ color: "#1e4a72" }}>
                      📺 영상으로 학습하고 다시 도전해보세요!
                    </p>
                    <div className="flex flex-col gap-2 mb-2">
                      {videos.map((v) => (
                        <a
                          key={v.url}
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-[1.01]"
                          style={{
                            background: "rgba(220,38,38,0.08)",
                            border: "1px solid rgba(220,38,38,0.25)",
                            color: "#b91c1c",
                          }}
                        >
                          ▶ {v.title}
                        </a>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-sm font-bold mb-2" style={{ color: "#1e4a72" }}>
                    📺 전체 안전교육 영상을 통해 학습하고 다시 도전해보세요!
                  </p>
                )}
                <a
                  href={AREA_BOARD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold underline"
                  style={{ color: "#4a7090" }}
                >
                  🔗 경기도교육청 나침반 5분 안전교육 전체 보기 →
                </a>
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
