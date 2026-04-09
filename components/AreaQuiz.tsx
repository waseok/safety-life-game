"use client";

import { useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { QuestionScore } from "@/types/game";
import { EvaluateResponse } from "@/app/api/evaluate-question/route";

const MIN_CHARS = 15;
type EvalState = "idle" | "loading" | "done" | "error";

// ── Gemini 레벨 라벨 ───────────────────────────────────────────
const LEVEL_LABELS = [
  { min: 45, label: "탁월한 탐구자 🌟" },
  { min: 35, label: "우수한 질문자 ⭐" },
  { min: 25, label: "성장하는 탐구자 📈" },
  { min: 10, label: "탐구 시작 중 🌱" },
  { min: 0,  label: "더 발전해보세요 💪" },
];

function getLevel(score: number) {
  return LEVEL_LABELS.find((l) => score >= l.min) ?? LEVEL_LABELS[4];
}

// ── 브라우저 → Gemini 직접 호출 ────────────────────────────────
async function callGemini(
  question: string,
  areaTitle: string,
  isMidpoint: boolean,
  situationTitles: string[],
): Promise<EvaluateResponse> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) throw new Error("No Gemini key");

  const situationContext = situationTitles.length > 0
    ? `\n학생이 경험한 상황들: ${situationTitles.join(", ")}`
    : "";

  const prompt = `당신은 안전 교육 전문가이자 IB 탐구 학습 평가자입니다.
${isMidpoint ? "중간 탐구 질문" : "최종 탐구 질문"}입니다.
학습 영역: "${areaTitle}"${situationContext}

【평가 기준】
1. 안전 관련성 (0-20점): "${areaTitle}" 주제와 관련성
2. 탐구 깊이 (0-20점): 비판적·분석적 사고 요구 수준
3. 독창성 (0-10점): 학생 관점의 독창성

반드시 아래 JSON만 출력 (다른 텍스트 없이):
{"score":<0-50>,"relevance":<0-20>,"depth":<0-20>,"originality":<0-10>,"feedback":"<2-3문장 한국어 피드백>","safetyExplanation":"<2-3문장 안전 지식 설명>"}

학생 질문: "${question}"`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
      }),
      signal: AbortSignal.timeout(15000),
    },
  );

  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);

  const data = await res.json();
  const text: string = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

  let parsed: Partial<EvaluateResponse>;
  try {
    parsed = JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    parsed = match ? JSON.parse(match[0]) : {};
  }

  const score = Math.min(50, Math.max(0, Number(parsed.score ?? 25)));
  return {
    score,
    relevance:         Math.min(20, Math.max(0, Number(parsed.relevance ?? 10))),
    depth:             Math.min(20, Math.max(0, Number(parsed.depth ?? 10))),
    originality:       Math.min(10, Math.max(0, Number(parsed.originality ?? 5))),
    feedback:          typeof parsed.feedback === "string" ? parsed.feedback : "잘 만들었어요!",
    safetyExplanation: typeof parsed.safetyExplanation === "string" ? parsed.safetyExplanation : "",
    level:             getLevel(score).label,
    isLocalFallback:   false,
  };
}

interface Props {
  isMidpoint?: boolean;
}

// ── 육하원칙 정의 ──────────────────────────────────────────────
const SIX_W = [
  {
    key: "who",
    label: "누가",
    english: "Who",
    emoji: "🧑",
    color: "#0284c7",
    bg: "rgba(2,132,199,0.08)",
    border: "rgba(2,132,199,0.3)",
    desc: "관련된 사람은 누구인가요?",
    template: (area: string) => `${area} 상황에서 누가 가장 위험에 노출되기 쉬울까?`,
  },
  {
    key: "what",
    label: "무엇을",
    english: "What",
    emoji: "📦",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    border: "rgba(124,58,237,0.3)",
    desc: "어떤 위험이나 문제인가요?",
    template: (area: string) => `${area}에서 무엇이 가장 큰 위험 요소일까?`,
  },
  {
    key: "when",
    label: "언제",
    english: "When",
    emoji: "🕐",
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
    border: "rgba(217,119,6,0.3)",
    desc: "어떤 상황·시점에서 발생하나요?",
    template: (area: string) => `언제 ${area} 사고가 가장 많이 발생하는가?`,
  },
  {
    key: "where",
    label: "어디서",
    english: "Where",
    emoji: "📍",
    color: "#16a34a",
    bg: "rgba(22,163,74,0.08)",
    border: "rgba(22,163,74,0.3)",
    desc: "어디서 주로 일어나나요?",
    template: (area: string) => `어디서 ${area} 위험이 가장 자주 발생할까?`,
  },
  {
    key: "why",
    label: "왜",
    english: "Why",
    emoji: "🤔",
    color: "#dc2626",
    bg: "rgba(220,38,38,0.08)",
    border: "rgba(220,38,38,0.3)",
    desc: "왜 위험하거나 중요한가요?",
    template: (area: string) => `왜 ${area} 안전 수칙을 지키지 않으면 심각한 결과가 생기는가?`,
  },
  {
    key: "how",
    label: "어떻게",
    english: "How",
    emoji: "⚙️",
    color: "#0d8a6a",
    bg: "rgba(13,138,106,0.08)",
    border: "rgba(13,138,106,0.3)",
    desc: "어떻게 예방·대처할 수 있나요?",
    template: (area: string) => `어떻게 하면 ${area} 사고를 더 효과적으로 예방할 수 있을까?`,
  },
];

export default function AreaQuiz({ isMidpoint = false }: Props) {
  const currentAreaIndex  = useGameStore((s) => s.currentAreaIndex);
  const submitQuizQuestion = useGameStore((s) => s.submitQuizQuestion);
  const life              = useGameStore((s) => s.life);
  const mental            = useGameStore((s) => s.mental);
  const maxLife           = useGameStore((s) => s.maxLife);
  const maxMental         = useGameStore((s) => s.maxMental);
  const correctCount      = useGameStore((s) => s.correctCount);
  const questionScores    = useGameStore((s) => s.questionScores);
  const areaSessionCorrect = useGameStore((s) => s.areaSessionCorrect);
  const areaSessionTotal   = useGameStore((s) => s.areaSessionTotal);

  const [question, setQuestion]       = useState("");
  const [evalState, setEvalState]     = useState<EvalState>("idle");
  const [result, setResult]           = useState<EvaluateResponse | null>(null);
  const [activeW, setActiveW]         = useState<string | null>(null);
  const [showScore, setShowScore]     = useState(false);
  const area = allAreas[currentAreaIndex];
  if (!area) return null;

  // ── 커버된 상황 키워드 ─────────────────────────────────────
  const midPoint = Math.floor(area.situations.length / 2);
  const coveredSituations = isMidpoint
    ? area.situations.slice(0, midPoint)
    : area.situations.slice(midPoint);
  const keywords = coveredSituations.map((s) => s.title);

  // ── 상황 제목을 API에 전달할 리스트 ───────────────────────
  const situationTitles = coveredSituations.map((s) => s.title);

  // ── 종합 점수 계산 ──────────────────────────────────────
  const prevQuestionScore = Object.values(questionScores).reduce((s, q) => s + q.score, 0);
  const runningScore = life + mental + (correctCount * 10) + prevQuestionScore;

  const charCount    = question.trim().length;
  const hasEnoughChars = charCount >= MIN_CHARS;
  const canSubmit    = hasEnoughChars && evalState === "idle";

  // ── 평가 호출: Gemini(브라우저) → 서버 폴백 ───────────────
  const handleEvaluate = async () => {
    if (!canSubmit) return;
    setEvalState("loading");

    // 1순위: 브라우저에서 Gemini 직접 호출
    try {
      const data = await callGemini(question.trim(), area.title, isMidpoint, situationTitles);
      setResult(data);
      setEvalState("done");
      return;
    } catch (err) {
      console.warn("Gemini 직접 호출 실패, 서버 폴백 시도:", err);
    }

    // 2순위: 서버 API 라우트 (로컬 폴백 채점)
    try {
      const res = await fetch("/api/evaluate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.trim(),
          areaTitle: area.title,
          areaIcon: area.icon,
          isMidpoint,
          situationTitles,
        }),
      });
      if (!res.ok) throw new Error("Server error");
      const data: EvaluateResponse = await res.json();
      setResult(data);
      setEvalState("done");
    } catch {
      setEvalState("error");
    }
  };

  // ── 완료 처리 ──────────────────────────────────────────
  const handleComplete = () => {
    if (!result) return;
    const score: QuestionScore = {
      score:             result.score,
      relevance:         result.relevance,
      depth:             result.depth,
      originality:       result.originality,
      feedback:          result.feedback,
      safetyExplanation: result.safetyExplanation,
      level:             result.level,
      question:          question.trim(),
    };
    submitQuizQuestion(area.id, question.trim(), score, isMidpoint);
  };

  const scoreColor = (s: number, max: number) => {
    const pct = s / max;
    if (pct >= 0.8) return "#16a34a";
    if (pct >= 0.6) return "#d97706";
    return "#dc2626";
  };

  const totalColor  = result ? scoreColor(result.score, 50) : "#0284c7";
  const mentalBonus = result ? Math.round((result.score / 50) * 20) : 0;

  // ── 육하원칙 버튼 클릭 (토글만, 자동 적용 없음) ───────────
  const handleWClick = (w: typeof SIX_W[0]) => {
    setActiveW((prev) => (prev === w.key ? null : w.key));
  };

  // ─────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-4 py-8 phase-transition overflow-y-auto"
      style={{ background: "#eef6ff" }}
    >
      <div
        className="max-w-2xl w-full rounded-3xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: "2px solid rgba(2,132,199,0.25)",
          boxShadow: "0 20px 60px rgba(2,132,199,0.1)",
        }}
      >

        {/* ══ 헤더 ══════════════════════════════════════════ */}
        <div
          className="px-6 pt-6 pb-5"
          style={{
            background: "linear-gradient(135deg, rgba(2,132,199,0.07), rgba(255,255,255,0))",
            borderBottom: "1.5px solid rgba(2,132,199,0.15)",
          }}
        >
          {/* 뱃지 행 */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs font-black px-3 py-1 rounded-full"
              style={{ background: `${area.color}18`, color: area.color, border: `1.5px solid ${area.color}40` }}
            >
              {area.icon} {area.title}
            </span>
            <span
              className="text-xs font-black px-3 py-1 rounded-full"
              style={{
                background: isMidpoint ? "rgba(245,158,11,0.1)" : "rgba(124,58,237,0.1)",
                color:      isMidpoint ? "#b45309"              : "#7c3aed",
                border:     isMidpoint ? "1.5px solid rgba(245,158,11,0.4)" : "1.5px solid rgba(124,58,237,0.4)",
              }}
            >
              {isMidpoint ? "✏️ 중간 질문 만들기" : "🎓 최종 질문 만들기"}
            </span>
          </div>

          <h2 className="text-xl font-black mb-1" style={{ color: "#0d2a4a" }}>
            {isMidpoint
              ? "절반 완료! 나만의 탐구 질문을 만들어보세요 🔍"
              : "영역 완료! 배운 내용으로 질문을 만들어보세요 🎯"}
          </h2>
          <p className="text-sm font-semibold mb-4" style={{ color: "#6b8aaa" }}>
            {area.title} 상황 {areaSessionTotal}개를 경험했어요.
            {!isMidpoint && " 두 번째 질문을 만들 차례입니다."}
          </p>

          {/* ── 종합 점수 패널 (토글) ── */}
          <button
            onClick={() => setShowScore((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all"
            style={{ background: "rgba(26,111,181,0.06)", border: "1px solid rgba(26,111,181,0.15)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-black" style={{ color: "#1a6fb5" }}>📊 현재 종합 점수</span>
              <span className="text-lg font-black" style={{ color: "#1a6fb5" }}>{runningScore}점</span>
            </div>
            <span className="text-xs font-bold" style={{ color: "#6b8aaa" }}>
              {showScore ? "▲ 접기" : "▼ 상세 보기"}
            </span>
          </button>

          {showScore && (
            <div className="mt-2 grid grid-cols-2 gap-2 px-1">
              {[
                { label: "❤️ 생명력", val: life, max: maxLife, color: "#dc2626" },
                { label: "🧠 판단력", val: mental, max: maxMental, color: "#0284c7" },
                { label: "✅ 정답 보너스", val: correctCount * 10, max: null, color: "#16a34a" },
                { label: "✏️ 질문 점수", val: prevQuestionScore, max: null, color: "#7c3aed" },
              ].map(({ label, val, max, color }) => (
                <div
                  key={label}
                  className="flex items-center justify-between px-3 py-1.5 rounded-lg"
                  style={{ background: `${color}08`, border: `1px solid ${color}20` }}
                >
                  <span className="text-xs font-bold" style={{ color }}>{label}</span>
                  <span className="text-sm font-black" style={{ color }}>
                    {val}{max ? <span className="text-xs font-normal text-on-surface/30">/{max}</span> : "점"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ══ 질문 입력 / 결과 ══════════════════════════════ */}
        <div className="p-6">

          {/* ── [ 질문 작성 화면 ] ── */}
          {evalState !== "done" && (
            <>

              {/* 1. 경험한 상황 키워드 */}
              <div className="mb-5">
                <p className="text-xs font-black mb-2" style={{ color: "#6b8aaa" }}>
                  📚 방금 경험한 상황들 ({coveredSituations.length}개)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${area.color}12`,
                        color: area.color,
                        border: `1px solid ${area.color}30`,
                      }}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
                <p className="text-xs mt-2 font-semibold" style={{ color: "#9ab0c8" }}>
                  위 상황들을 떠올리며 질문을 만들어보세요!
                </p>
              </div>

              {/* 2. 육하원칙 가이드 */}
              <div
                className="mb-5 p-4 rounded-2xl"
                style={{ background: "rgba(2,132,199,0.04)", border: "1.5px solid rgba(2,132,199,0.14)" }}
              >
                <p className="text-sm font-black mb-3" style={{ color: "#0d2a4a" }}>
                  🗝️ 육하원칙으로 질문 만들기
                </p>

                {/* 6W 버튼 그리드 */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {SIX_W.map((w) => (
                    <button
                      key={w.key}
                      onClick={() => handleWClick(w)}
                      className="flex flex-col items-center gap-1 p-2.5 rounded-xl transition-all duration-150 hover:scale-[1.03] active:scale-[0.97]"
                      style={{
                        background: activeW === w.key ? w.bg : "rgba(255,255,255,0.8)",
                        border: `1.5px solid ${activeW === w.key ? w.border : "rgba(180,200,220,0.4)"}`,
                        boxShadow: activeW === w.key ? `0 2px 8px ${w.bg}` : "none",
                      }}
                    >
                      <span className="text-xl">{w.emoji}</span>
                      <span className="text-xs font-black" style={{ color: activeW === w.key ? w.color : "#4a7090" }}>
                        {w.label}
                      </span>
                      <span className="text-[10px] font-semibold" style={{ color: "#9ab0c8" }}>
                        {w.english}
                      </span>
                    </button>
                  ))}
                </div>

                {/* 선택된 W의 설명 + 템플릿 */}
                {activeW && (() => {
                  const w = SIX_W.find((x) => x.key === activeW)!;
                  return (
                    <div
                      className="p-3 rounded-xl"
                      style={{ background: w.bg, border: `1.5px solid ${w.border}` }}
                    >
                      <p className="text-xs font-bold mb-2" style={{ color: w.color }}>
                        {w.emoji} {w.label}({w.english}): {w.desc}
                      </p>
                      <p className="text-xs mb-2 font-semibold" style={{ color: "#4a7090" }}>
                        예시 질문:
                      </p>
                      <div
                        className="w-full text-xs px-3 py-2.5 rounded-lg font-semibold"
                        style={{
                          background: "rgba(255,255,255,0.85)",
                          border: `1px solid ${w.border}`,
                          color: "#0d2a4a",
                        }}
                      >
                        💬 &ldquo;{w.template(area.title)}&rdquo;
                      </div>
                      <p className="text-[10px] mt-1.5 font-semibold text-center" style={{ color: "#9ab0c8" }}>
                        참고만 하고, 직접 나만의 질문을 만들어보세요! ✍️
                      </p>
                    </div>
                  );
                })()}

                {!activeW && (
                  <p className="text-xs text-center font-semibold" style={{ color: "#9ab0c8" }}>
                    위 항목을 클릭하면 예시 질문을 볼 수 있어요 👆
                  </p>
                )}
              </div>

              {/* 3. 질문 직접 입력 */}
              <div className="mb-4">
                <p className="text-sm font-black mb-2" style={{ color: "#0d2a4a" }}>
                  ✏️ 나의 탐구 질문
                </p>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={`${area.title}에 대해 더 알고 싶은 점이나 탐구하고 싶은 질문을 직접 만들어보세요...`}
                  rows={4}
                  disabled={evalState === "loading"}
                  className="w-full rounded-xl p-4 text-sm leading-relaxed resize-none outline-none transition-all duration-200"
                  style={{
                    background: "#f8fbff",
                    border: `1.5px solid ${hasEnoughChars ? "rgba(2,132,199,0.45)" : "rgba(2,132,199,0.15)"}`,
                    color: "#0d2a4a",
                    boxShadow: hasEnoughChars ? "0 0 0 3px rgba(2,132,199,0.07)" : "none",
                  }}
                />
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs" style={{ color: "#6b8aaa" }}>
                    {!hasEnoughChars
                      ? `${MIN_CHARS - charCount}자 더 입력하면 제출 가능`
                      : "✓ AI 평가 준비 완료"}
                  </span>
                  <span className="text-xs font-semibold" style={{ color: hasEnoughChars ? "#0284c7" : "#aaa" }}>
                    {charCount}자
                  </span>
                </div>
              </div>

              {/* 4. 제출 버튼 */}
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
                    <span className="inline-block animate-spin">⚙️</span>
                    <span>AI가 질문을 평가 중이에요...</span>
                  </>
                ) : hasEnoughChars ? (
                  <>
                    <span>🤖</span>
                    <span>AI 평가받기 →</span>
                  </>
                ) : (
                  `${MIN_CHARS - charCount}자 더 입력해주세요`
                )}
              </button>

              {evalState === "error" && (
                <p className="text-center text-xs mt-3 text-red-500">
                  평가 중 오류가 발생했어요.{" "}
                  <button onClick={() => setEvalState("idle")} className="underline font-bold">
                    다시 시도
                  </button>
                </p>
              )}
            </>
          )}

          {/* ── [ 평가 결과 화면 ] ── */}
          {evalState === "done" && result && (
            <>
              {/* A. 점수 헤더 */}
              <div
                className="p-5 rounded-2xl mb-4 text-center"
                style={{ background: `${totalColor}10`, border: `2px solid ${totalColor}25` }}
              >
                <p className="text-5xl font-black mb-1" style={{ color: totalColor }}>
                  {result.score}
                  <span className="text-xl font-semibold text-on-surface/30"> / 50</span>
                </p>
                <p className="text-base font-black mb-1" style={{ color: totalColor }}>
                  {result.level}
                </p>
                <p className="text-xs font-semibold" style={{ color: "#6b8aaa" }}>
                  🧠 판단력 +{mentalBonus} 보너스 획득!
                </p>
                {result.isLocalFallback && (
                  <p className="text-[10px] mt-1.5 font-semibold" style={{ color: "#9ab0c8" }}>
                    ※ 오프라인 채점 (AI 서버 미연결)
                  </p>
                )}
              </div>

              {/* B. 세부 점수 */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "안전 관련성", val: result.relevance, max: 20, icon: "🛡️" },
                  { label: "탐구 깊이",   val: result.depth,     max: 20, icon: "🔬" },
                  { label: "독창성",      val: result.originality, max: 10, icon: "💡" },
                ].map(({ label, val, max, icon }) => {
                  const c = scoreColor(val, max);
                  return (
                    <div
                      key={label}
                      className="p-3 rounded-xl text-center"
                      style={{ background: `${c}09`, border: `1.5px solid ${c}25` }}
                    >
                      <p className="text-base mb-0.5">{icon}</p>
                      <p className="text-xl font-black leading-none" style={{ color: c }}>
                        {val}
                        <span className="text-xs font-normal text-on-surface/25">/{max}</span>
                      </p>
                      <p className="text-[11px] font-bold mt-1" style={{ color: "#4a7090" }}>
                        {label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* C. 나의 질문 */}
              <div
                className="p-4 rounded-xl mb-4"
                style={{ background: "rgba(2,132,199,0.04)", border: "1px solid rgba(2,132,199,0.12)" }}
              >
                <p className="text-xs font-black mb-1.5" style={{ color: "#6b8aaa" }}>나의 질문</p>
                <p className="text-sm font-semibold leading-relaxed" style={{ color: "#0d2a4a" }}>
                  &ldquo;{question.trim()}&rdquo;
                </p>
              </div>

              {/* D. AI 질문 피드백 */}
              <div
                className="p-4 rounded-xl mb-4"
                style={{ background: "rgba(2,132,199,0.06)", border: "1.5px solid rgba(2,132,199,0.2)" }}
              >
                <p className="text-xs font-black mb-2" style={{ color: "#0284c7" }}>
                  🤖 질문에 대한 AI 평가
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "#0d2a4a" }}>
                  {result.feedback}
                </p>
              </div>

              {/* E. 안전 지식 설명 */}
              {result.safetyExplanation && (
                <div
                  className="p-4 rounded-xl mb-5"
                  style={{ background: "rgba(13,138,106,0.06)", border: "1.5px solid rgba(13,138,106,0.22)" }}
                >
                  <p className="text-xs font-black mb-2" style={{ color: "#0d8a6a" }}>
                    📖 관련 안전 지식
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "#0d2a4a" }}>
                    {result.safetyExplanation}
                  </p>
                </div>
              )}

              {/* F. 종합 점수 미리보기 */}
              <div
                className="flex items-center justify-between px-4 py-3 rounded-xl mb-5"
                style={{ background: "rgba(26,111,181,0.06)", border: "1px solid rgba(26,111,181,0.15)" }}
              >
                <span className="text-sm font-black" style={{ color: "#1a6fb5" }}>
                  이 질문 포함 누적 점수
                </span>
                <span className="text-xl font-black" style={{ color: "#1a6fb5" }}>
                  {runningScore + mentalBonus}점
                </span>
              </div>

              {/* G. 다음 버튼 */}
              <button
                onClick={handleComplete}
                className="w-full py-4 rounded-2xl font-black text-base transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
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
                {isMidpoint ? "🚀 계속 탐험하기" : "🏁 영역 완료 화면으로 →"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
