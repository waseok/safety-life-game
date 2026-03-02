"use client";

import { useGameStore } from "@/store/useGameStore";

const AREAS = [
  { icon: "🏠", name: "생활안전", color: "#3b82f6" },
  { icon: "🚗", name: "교통안전", color: "#f59e0b" },
  { icon: "🛡️", name: "신변안전", color: "#8b5cf6" },
  { icon: "💊", name: "약물·사이버", color: "#ef4444" },
  { icon: "🌊", name: "재난안전", color: "#f97316" },
  { icon: "🏗️", name: "직업안전", color: "#10b981" },
  { icon: "🏥", name: "응급처치", color: "#dc2626" },
];

export default function TitleScreen() {
  const setPhase = useGameStore((s) => s.setPhase);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 phase-transition relative overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 메인 글로우 */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] opacity-30"
          style={{
            background: "radial-gradient(ellipse at center, rgba(249,115,22,0.3) 0%, rgba(251,191,36,0.1) 40%, transparent 70%)",
          }}
        />
        {/* 하단 글로우 */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20"
          style={{
            background: "radial-gradient(ellipse at center, rgba(59,130,246,0.4) 0%, transparent 70%)",
          }}
        />
        {/* 경고 패턴 상단 */}
        <div className="absolute top-0 left-0 right-0 h-2 warning-stripe opacity-60" />
        {/* 경고 패턴 하단 */}
        <div className="absolute bottom-0 left-0 right-0 h-2 warning-stripe opacity-60" />
      </div>

      <div className="text-center z-10 max-w-lg w-full">
        {/* 방패 로고 */}
        <div className="mb-6 relative">
          <div className="shield-float inline-block">
            <div
              className="inline-flex items-center justify-center w-28 h-28 rounded-2xl text-6xl pulse-glow"
              style={{
                background: "linear-gradient(135deg, rgba(249,115,22,0.2) 0%, rgba(251,191,36,0.1) 100%)",
                border: "2px solid rgba(249,115,22,0.4)",
              }}
            >
              🛡️
            </div>
          </div>
          {/* 주변 링 */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* 타이틀 */}
        <div className="mb-3">
          <h1 className="text-5xl md:text-6xl font-black mb-2 tracking-tight">
            <span
              style={{
                background: "linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ef4444 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              안전 인생게임
            </span>
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(to right, transparent, rgba(249,115,22,0.5))" }} />
            <p className="text-orange-400/70 text-sm font-semibold tracking-widest uppercase">
              Safety Life CYOA
            </p>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(to left, transparent, rgba(249,115,22,0.5))" }} />
          </div>
        </div>

        {/* 설명 */}
        <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 px-4">
          일상 속 위험 상황에서 올바른 선택을 내려보세요.
          <br />
          <span className="text-orange-400/70 font-medium">당신의 판단이 생명을 좌우합니다.</span>
        </p>

        {/* 7대 안전영역 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {AREAS.map((area) => (
            <span
              key={area.name}
              className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200"
              style={{
                background: `${area.color}15`,
                border: `1px solid ${area.color}35`,
                color: `${area.color}`,
              }}
            >
              {area.icon} {area.name}
            </span>
          ))}
        </div>

        {/* 시작 버튼 */}
        <button
          onClick={() => setPhase("character-select")}
          className="relative px-14 py-5 rounded-2xl font-black text-xl
                     transition-all duration-300 hover:scale-105 active:scale-95
                     text-white overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #fbbf24 100%)",
            boxShadow: "0 8px 32px rgba(249,115,22,0.4), 0 0 0 1px rgba(251,191,36,0.2)",
          }}
        >
          <span className="relative z-10">🚨 게임 시작</span>
          <div className="absolute inset-0 bg-white/0 hover:bg-white/10 transition-colors" />
        </button>

        <p className="text-white/20 text-xs mt-5">
          7대 안전영역 · 삽화 중심 선택형 게임
        </p>
      </div>
    </div>
  );
}
