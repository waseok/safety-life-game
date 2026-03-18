"use client";

import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { getQuizQuestion } from "@/data/quizQuestions";

// 레벨별 색상 (1→파랑 → 7→보라, 점점 깊어지는 사고)
const LEVEL_COLORS: Record<number, { color: string; bg: string; border: string; glow: string }> = {
  1: { color: "#0284c7", bg: "rgba(2,132,199,0.08)",   border: "rgba(2,132,199,0.35)",   glow: "rgba(2,132,199,0.18)" },
  2: { color: "#0d9488", bg: "rgba(13,148,136,0.08)",  border: "rgba(13,148,136,0.35)",  glow: "rgba(13,148,136,0.18)" },
  3: { color: "#16a34a", bg: "rgba(22,163,74,0.08)",   border: "rgba(22,163,74,0.35)",   glow: "rgba(22,163,74,0.18)" },
  4: { color: "#ca8a04", bg: "rgba(202,138,4,0.08)",   border: "rgba(202,138,4,0.35)",   glow: "rgba(202,138,4,0.18)" },
  5: { color: "#ea580c", bg: "rgba(234,88,12,0.08)",   border: "rgba(234,88,12,0.35)",   glow: "rgba(234,88,12,0.18)" },
  6: { color: "#dc2626", bg: "rgba(220,38,38,0.08)",   border: "rgba(220,38,38,0.35)",   glow: "rgba(220,38,38,0.18)" },
  7: { color: "#7c3aed", bg: "rgba(124,58,237,0.08)",  border: "rgba(124,58,237,0.35)",  glow: "rgba(124,58,237,0.18)" },
};

const MIN_CHARS = 30; // 최소 글자 수

export default function AreaQuiz() {
  const currentAreaIndex = useGameStore((s) => s.currentAreaIndex);
  const submitQuizAnswer = useGameStore((s) => s.submitQuizAnswer);

  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const area = allAreas[currentAreaIndex];
  const quiz = area ? getQuizQuestion(area.id) : undefined;

  if (!area || !quiz) return null;

  const lc = LEVEL_COLORS[quiz.level] ?? LEVEL_COLORS[1];
  const charCount = answer.length;
  const canSubmit = charCount >= MIN_CHARS;

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  const handleComplete = () => {
    submitQuizAnswer(answer);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 phase-transition"
      style={{ background: "#eef6ff" }}
    >
      <div
        className="max-w-xl w-full rounded-3xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: `2px solid ${lc.border}`,
          boxShadow: `0 20px 60px ${lc.glow}`,
        }}
      >
        {/* ── 헤더 ── */}
        <div
          className="px-6 pt-7 pb-5"
          style={{
            background: `linear-gradient(135deg, ${lc.bg}, rgba(255,255,255,0))`,
            borderBottom: `1.5px solid ${lc.border}`,
          }}
        >
          {/* 에어리어 태그 */}
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-xs font-black px-3 py-1 rounded-full"
              style={{
                background: `${area.color}18`,
                color: area.color,
                border: `1.5px solid ${area.color}40`,
              }}
            >
              {area.icon} {area.title}
            </span>

            {/* 사고 수준 뱃지 */}
            <span
              className="text-xs font-black px-3 py-1 rounded-full"
              style={{
                background: lc.bg,
                color: lc.color,
                border: `1.5px solid ${lc.border}`,
              }}
            >
              {quiz.levelLabel}
            </span>
          </div>

          {/* 타이틀 */}
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-black" style={{ color: lc.color }}>
              💭 탐구 질문 · {quiz.commandTerm}
            </p>
          </div>
          <p className="text-xs font-semibold" style={{ color: "#6b8aaa" }}>
            정답이 없는 질문입니다. 솔직하게 자신의 생각을 써보세요.
          </p>
        </div>

        {/* ── 질문 + 입력 ── */}
        <div className="p-6">
          {!submitted ? (
            <>
              {/* 질문 본문 */}
              <div
                className="p-4 rounded-2xl mb-4 leading-relaxed"
                style={{ background: lc.bg, border: `1.5px solid ${lc.border}` }}
              >
                <p className="text-base font-bold" style={{ color: "#0d2a4a", lineHeight: 1.7 }}>
                  {quiz.question}
                </p>
              </div>

              {/* 보조 질문 (힌트) */}
              <div className="mb-4">
                <button
                  onClick={() => setShowHints((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
                  style={{ color: lc.color }}
                >
                  <span>{showHints ? "▾" : "▸"}</span>
                  생각을 돕는 힌트 {showHints ? "접기" : "펼치기"}
                </button>

                {showHints && (
                  <ul className="mt-2 space-y-1.5 pl-1">
                    {quiz.subPrompts.map((prompt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#4a7090" }}>
                        <span style={{ color: lc.color, flexShrink: 0 }}>•</span>
                        {prompt}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* 텍스트 입력 */}
              <div className="mb-4">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="여기에 자유롭게 생각을 적어보세요..."
                  rows={6}
                  className="w-full rounded-xl p-4 text-sm leading-relaxed resize-none outline-none transition-all duration-200"
                  style={{
                    background: "#f8fbff",
                    border: `1.5px solid ${canSubmit ? lc.border : "rgba(2,132,199,0.15)"}`,
                    color: "#0d2a4a",
                    boxShadow: canSubmit ? `0 0 0 3px ${lc.glow}` : "none",
                  }}
                />
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs" style={{ color: "#6b8aaa" }}>
                    {charCount < MIN_CHARS
                      ? `${MIN_CHARS - charCount}자 더 쓰면 제출 가능`
                      : "제출 준비 완료 ✓"}
                  </span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: canSubmit ? lc.color : "#aaa" }}
                  >
                    {charCount}자
                  </span>
                </div>
              </div>

              {/* 제출 버튼 */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full py-4 rounded-2xl font-black text-base text-white transition-all duration-200"
                style={{
                  background: canSubmit
                    ? `linear-gradient(135deg, ${lc.color}, ${lc.color}cc)`
                    : "rgba(180,200,220,0.4)",
                  boxShadow: canSubmit ? `0 6px 20px ${lc.glow}` : "none",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  transform: canSubmit ? undefined : "none",
                }}
              >
                {canSubmit ? "생각 제출하기 →" : `${MIN_CHARS - charCount}자 더 작성해주세요`}
              </button>
            </>
          ) : (
            /* ── 제출 완료 화면 ── */
            <>
              {/* 제출 완료 헤더 */}
              <div
                className="p-4 rounded-2xl mb-5 text-center"
                style={{ background: lc.bg, border: `1.5px solid ${lc.border}` }}
              >
                <p className="text-2xl mb-1">✍️</p>
                <p className="text-base font-black" style={{ color: lc.color }}>
                  생각을 기록했어요!
                </p>
                <p className="text-xs mt-1" style={{ color: "#4a7090" }}>
                  판단력 +15 획득
                </p>
              </div>

              {/* 내 답변 미리보기 */}
              <div
                className="p-4 rounded-xl mb-4"
                style={{
                  background: "rgba(2,132,199,0.04)",
                  border: "1px solid rgba(2,132,199,0.12)",
                }}
              >
                <p className="text-xs font-black mb-2" style={{ color: "#6b8aaa" }}>
                  나의 생각
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#0d2a4a" }}>
                  {answer}
                </p>
              </div>

              {/* 핵심 관점 (reflection) */}
              <div
                className="p-4 rounded-xl mb-5"
                style={{
                  background: lc.bg,
                  border: `1.5px solid ${lc.border}`,
                }}
              >
                <p className="text-xs font-black mb-2" style={{ color: lc.color }}>
                  💡 함께 생각해볼 관점
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#0d2a4a" }}>
                  {quiz.reflection}
                </p>
              </div>

              {/* 다음으로 버튼 */}
              <button
                onClick={handleComplete}
                className="w-full py-4 rounded-2xl font-black text-base text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "linear-gradient(135deg, #0284c7, #0ea5e9)",
                  boxShadow: "0 6px 20px rgba(2,132,199,0.35)",
                }}
              >
                에어리어 완료 화면으로 →
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
