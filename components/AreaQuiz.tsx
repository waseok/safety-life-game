"use client";

import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { QuestionScore } from "@/types/game";
import { EvaluateResponse } from "@/app/api/evaluate-question/route";

const MIN_CHARS = 15; // 최소 질문 길이

type EvalState = "idle" | "loading" | "done" | "error";

interface Props {
  isMidpoint?: boolean;
}

// 질문 만들기 예시 힌트
const QUESTION_STARTERS = [
  "만약 ~한다면 어떻게 될까?",
  "왜 ~는 중요할까?",
  "~와 ~의 차이는 무엇일까?",
  "어떻게 하면 ~를 더 안전하게 할 수 있을까?",
  "~가 없다면 어떤 문제가 생길까?",
];

export default function AreaQuiz({ isMidpoint = false }: Props) {
  const currentAreaIndex = useGameStore((s) => s.currentAreaIndex);
  const submitQuizQuestion = useGameStore((s) => s.submitQuizQuestion);
  const life = useGameStore((s) => s.life);
  const mental = useGameStore((s) => s.mental);
  const areaSessionCorrect = useGameStore((s) => s.areaSessionCorrect);
  const areaSessionTotal = useGameStore((s) => s.areaSessionTotal);

  const [question, setQuestion] = useState("");
  const [evalState, setEvalState] = useState<EvalState>("idle");
  const [result, setResult] = useState<EvaluateResponse | null>(null);
  const [showHints, setShowHints] = useState(false);

  const area = allAreas[currentAreaIndex];
  if (!area) return null;

  const charCount = question.trim().length;
  const hasEnoughChars = charCount >= MIN_CHARS;
  const canSubmit = hasEnoughChars && evalState === "idle";

  const handleEvaluate = async () => {
    if (!canSubmit) return;
    setEvalState("loading");
    try {
      const res = await fetch("/api/evaluate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          areaTitle: area.title,
          areaIcon: area.icon,
          isMidpoint,
        }),
      });
      if (!res.ok) throw new Error("API error");
      const data: EvaluateResponse = await res.json();
      setResult(data);
      setEvalState("done");
    } catch {
      setEvalState("error");
    }
  };

  const handleComplete = () => {
    if (!result) return;
    const score: QuestionScore = {
      score: result.score,
      relevance: result.relevance,
      depth: result.depth,
      originality: result.originality,
      feedback: result.feedback,
      level: result.level,
      question: question.trim(),
    };
    submitQuizQuestion(area.id, question.trim(), score, isMidpoint);
  };

  const scoreColor = (s: number, max: number) => {
    const pct = s / max;
    if (pct >= 0.8) return "#16a34a";
    if (pct >= 0.6) return "#d97706";
    return "#dc2626";
  };

  const totalColor = result ? scoreColor(result.score, 50) : "#0284c7";
  const mentalBonus = result ? Math.round((result.score / 50) * 20) : 0;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 phase-transition"
      style={{ background: "#eef6ff" }}
    >
      <div
        className="max-w-2xl w-full rounded-3xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: "2px solid rgba(2,132,199,0.3)",
          boxShadow: "0 20px 60px rgba(2,132,199,0.12)",
        }}
      >
        {/* ── 헤더 ── */}
        <div
          className="px-6 pt-7 pb-5"
          style={{
            background: "linear-gradient(135deg, rgba(2,132,199,0.08), rgba(255,255,255,0))",
            borderBottom: "1.5px solid rgba(2,132,199,0.18)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
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
            <span
              className="text-xs font-black px-3 py-1 rounded-full"
              style={{
                background: isMidpoint ? "rgba(245,158,11,0.1)" : "rgba(124,58,237,0.1)",
                color: isMidpoint ? "#b45309" : "#7c3aed",
                border: isMidpoint ? "1.5px solid rgba(245,158,11,0.4)" : "1.5px solid rgba(124,58,237,0.4)",
              }}
            >
              {isMidpoint ? "✏️ 중간 질문 만들기" : "🎓 최종 질문 만들기"}
            </span>
          </div>

          <h2 className="text-xl font-black mb-1" style={{ color: "#0d2a4a" }}>
            {isMidpoint
              ? "절반을 왔어요! 탐구 질문을 만들어보세요 🔍"
              : "영역 완료! 나만의 탐구 질문을 만들어보세요 🎯"}
          </h2>
          <p className="text-sm font-semibold" style={{ color: "#6b8aaa" }}>
            {isMidpoint
              ? `${area.title} 상황 ${areaSessionTotal}개를 경험했어요. 더 알고 싶은 것이 있나요?`
              : `${area.title} 전체 ${areaSessionTotal}문항 완료! 배운 내용에서 탐구하고 싶은 질문을 만들어보세요.`}
          </p>

          {/* 현재 스탯 미니 표시 */}
          <div className="flex gap-3 mt-3">
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-red-50 text-red-600">
              ❤️ {life}
            </span>
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-600">
              🧠 {mental}
            </span>
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-green-50 text-green-600">
              ✅ {areaSessionCorrect}/{areaSessionTotal} 정답
            </span>
          </div>
        </div>

        <div className="p-6">
          {evalState !== "done" ? (
            <>
              {/* 질문 만들기 안내 */}
              <div
                className="p-4 rounded-2xl mb-4"
                style={{ background: "rgba(2,132,199,0.05)", border: "1.5px solid rgba(2,132,199,0.15)" }}
              >
                <p className="text-sm font-bold mb-2" style={{ color: "#0d2a4a" }}>
                  💡 좋은 탐구 질문이란?
                </p>
                <ul className="space-y-1">
                  {[
                    `"${area.title}"와 관련이 있어요`,
                    "단순한 사실 확인보다 깊이 생각하게 해요",
                    "여러 관점에서 살펴볼 수 있어요",
                  ].map((tip, i) => (
                    <li key={i} className="text-xs flex gap-2" style={{ color: "#4a7090" }}>
                      <span style={{ color: "#0284c7" }}>•</span>{tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 질문 시작 힌트 */}
              <div className="mb-4">
                <button
                  onClick={() => setShowHints((v) => !v)}
                  className="flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-70"
                  style={{ color: "#0284c7" }}
                >
                  <span>{showHints ? "▾" : "▸"}</span>
                  질문 시작 문구 예시 {showHints ? "접기" : "보기"}
                </button>
                {showHints && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {QUESTION_STARTERS.map((s, i) => (
                      <button
                        key={i}
                        onClick={() => setQuestion((prev) => prev ? prev : s.replace("~", ""))}
                        className="text-xs px-3 py-1.5 rounded-full border transition-all hover:scale-[1.02]"
                        style={{
                          background: "rgba(2,132,199,0.07)",
                          border: "1px solid rgba(2,132,199,0.25)",
                          color: "#0369a1",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 질문 입력 */}
              <div className="mb-4">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={`${area.title}에 대해 탐구하고 싶은 질문을 직접 만들어보세요...`}
                  rows={4}
                  disabled={evalState === "loading"}
                  className="w-full rounded-xl p-4 text-sm leading-relaxed resize-none outline-none transition-all duration-200"
                  style={{
                    background: "#f8fbff",
                    border: `1.5px solid ${charCount >= MIN_CHARS ? "rgba(2,132,199,0.4)" : "rgba(2,132,199,0.15)"}`,
                    color: "#0d2a4a",
                    boxShadow: charCount >= MIN_CHARS ? "0 0 0 3px rgba(2,132,199,0.08)" : "none",
                  }}
                />
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs" style={{ color: "#6b8aaa" }}>
                    {charCount < MIN_CHARS
                      ? `${MIN_CHARS - charCount}자 더 입력하면 제출 가능`
                      : "✓ 제출 준비 완료"}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: charCount >= MIN_CHARS ? "#0284c7" : "#aaa" }}>
                    {charCount}자
                  </span>
                </div>
              </div>

              {/* 평가 버튼 */}
              <button
                onClick={handleEvaluate}
                disabled={!canSubmit}
                className="w-full py-4 rounded-2xl font-black text-base text-white transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  background: hasEnoughChars
                    ? "linear-gradient(135deg, #0284c7, #0ea5e9)"
                    : "rgba(180,200,220,0.4)",
                  boxShadow: hasEnoughChars ? "0 6px 20px rgba(2,132,199,0.3)" : "none",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                }}
              >
                {evalState === "loading" ? (
                  <>
                    <span className="animate-spin">⚙️</span>
                    <span>AI가 질문을 평가 중이에요...</span>
                  </>
                ) : hasEnoughChars ? (
                  <>
                    <span>🤖</span>
                    <span>AI에게 질문 평가받기 →</span>
                  </>
                ) : (
                  `${MIN_CHARS - charCount}자 더 입력해주세요`
                )}
              </button>

              {evalState === "error" && (
                <p className="text-center text-xs mt-3 text-red-500">
                  평가 중 오류가 발생했어요.{" "}
                  <button
                    onClick={() => setEvalState("idle")}
                    className="underline font-bold"
                  >
                    다시 시도
                  </button>
                </p>
              )}
            </>
          ) : (
            /* ── 평가 결과 화면 ── */
            result && (
              <>
                {/* 점수 헤더 */}
                <div
                  className="p-5 rounded-2xl mb-5 text-center"
                  style={{
                    background: `${totalColor}10`,
                    border: `2px solid ${totalColor}30`,
                  }}
                >
                  <p className="text-4xl font-black mb-1" style={{ color: totalColor }}>
                    {result.score}
                    <span className="text-lg font-semibold text-on-surface/40"> / 50</span>
                  </p>
                  <p className="text-base font-black mb-0.5" style={{ color: totalColor }}>
                    {result.level}
                  </p>
                  <p className="text-xs" style={{ color: "#6b8aaa" }}>
                    🧠 판단력 +{mentalBonus} 보너스 획득!
                  </p>
                </div>

                {/* 세부 점수 */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: "안전 관련성", val: result.relevance, max: 20 },
                    { label: "탐구 깊이", val: result.depth, max: 20 },
                    { label: "독창성", val: result.originality, max: 10 },
                  ].map(({ label, val, max }) => {
                    const c = scoreColor(val, max);
                    return (
                      <div
                        key={label}
                        className="p-3 rounded-xl text-center"
                        style={{ background: `${c}10`, border: `1px solid ${c}30` }}
                      >
                        <p className="text-xl font-black" style={{ color: c }}>
                          {val}
                          <span className="text-xs font-normal text-on-surface/30">/{max}</span>
                        </p>
                        <p className="text-xs font-bold mt-0.5" style={{ color: "#4a7090" }}>
                          {label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* 내 질문 */}
                <div
                  className="p-4 rounded-xl mb-4"
                  style={{ background: "rgba(2,132,199,0.04)", border: "1px solid rgba(2,132,199,0.12)" }}
                >
                  <p className="text-xs font-black mb-2" style={{ color: "#6b8aaa" }}>나의 질문</p>
                  <p className="text-sm font-semibold leading-relaxed" style={{ color: "#0d2a4a" }}>
                    &ldquo;{question.trim()}&rdquo;
                  </p>
                </div>

                {/* AI 피드백 */}
                <div
                  className="p-4 rounded-xl mb-5"
                  style={{ background: "rgba(2,132,199,0.06)", border: "1.5px solid rgba(2,132,199,0.2)" }}
                >
                  <p className="text-xs font-black mb-2" style={{ color: "#0284c7" }}>
                    🤖 AI 피드백
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#0d2a4a" }}>
                    {result.feedback}
                  </p>
                </div>

                {/* 다음 버튼 */}
                <button
                  onClick={handleComplete}
                  className="w-full py-4 rounded-2xl font-black text-base text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: isMidpoint
                      ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
                      : "linear-gradient(135deg, #0284c7, #0ea5e9)",
                    boxShadow: isMidpoint
                      ? "0 6px 20px rgba(245,158,11,0.3)"
                      : "0 6px 20px rgba(2,132,199,0.35)",
                    color: isMidpoint ? "#451a03" : "#ffffff",
                  }}
                >
                  {isMidpoint ? "계속 탐험하기 🚀" : "영역 완료 화면으로 →"}
                </button>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}
