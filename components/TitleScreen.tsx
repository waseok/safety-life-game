"use client";

import { useGameStore } from "@/store/useGameStore";

const AREAS = [
  { icon: "🏠", name: "생활안전", color: "#0284c7" },
  { icon: "🚗", name: "교통안전", color: "#f59e0b" },
  { icon: "🛡️", name: "신변안전", color: "#8b5cf6" },
  { icon: "💊", name: "약물·사이버", color: "#dc2626" },
  { icon: "🌊", name: "재난안전", color: "#0ea5e9" },
  { icon: "🏗️", name: "직업안전", color: "#16a34a" },
  { icon: "🏥", name: "응급처치", color: "#e11d48" },
];

export default function TitleScreen() {
  const setPhase = useGameStore((s) => s.setPhase);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 phase-transition relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-2 warning-stripe opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-2 warning-stripe opacity-50" />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full opacity-30"
          style={{ background: "radial-gradient(ellipse, rgba(2,132,199,0.18) 0%, transparent 70%)" }}
        />
      </div>

      <div className="text-center z-10 max-w-lg w-full">
        {/* 방패 로고 */}
        <div className="mb-6">
          <div className="shield-float inline-block">
            <div
              className="inline-flex items-center justify-center w-28 h-28 rounded-3xl text-6xl pulse-glow"
              style={{
                background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
                boxShadow: "0 8px 32px rgba(2,132,199,0.35)",
              }}
            >
              🛡️
            </div>
          </div>
        </div>

        {/* 타이틀 */}
        <div className="mb-4">
          <h1 className="text-5xl md:text-6xl font-black mb-2 tracking-tight"
            style={{
              background: "linear-gradient(135deg, #0d2a4a 0%, #0284c7 60%, #f59e0b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            안전 인생게임
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(to right, transparent, rgba(2,132,199,0.4))" }} />
            <p className="text-sm font-bold tracking-widest uppercase" style={{ color: "#0284c7" }}>
              Safety Life CYOA
            </p>
            <div className="h-px flex-1 max-w-[60px]" style={{ background: "linear-gradient(to left, transparent, rgba(2,132,199,0.4))" }} />
          </div>
        </div>

        {/* 설명 */}
        <p className="text-base md:text-lg leading-relaxed mb-8 px-4 font-medium" style={{ color: "#1e4a72" }}>
          일상 속 위험 상황에서 올바른 선택을 내려보세요.
          <br />
          <span className="font-black" style={{ color: "#f59e0b" }}>당신의 판단이 생명을 좌우합니다.</span>
        </p>

        {/* 7대 안전영역 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {AREAS.map((area) => (
            <span
              key={area.name}
              className="px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5"
              style={{
                background: `${area.color}15`,
                border: `1.5px solid ${area.color}50`,
                color: area.color,
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
                     transition-all duration-300 hover:scale-105 active:scale-95 text-white"
          style={{
            background: "linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)",
            boxShadow: "0 8px 32px rgba(2,132,199,0.4)",
          }}
        >
          🚨 게임 시작
        </button>

        <p className="text-sm mt-5 font-semibold" style={{ color: "#4a7090" }}>
          7대 안전영역 · 삽화 중심 선택형 게임
        </p>
      </div>
    </div>
  );
}
