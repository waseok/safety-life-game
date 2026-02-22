"use client";

import { useGameStore } from "@/store/useGameStore";

export default function TitleScreen() {
  const setPhase = useGameStore((s) => s.setPhase);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 phase-transition relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(139,92,246,0.2) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="text-center z-10 max-w-lg">
        {/* Logo / Title area */}
        <div className="mb-8">
          <div className="text-7xl md:text-8xl mb-6">🛡️</div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              안전 인생게임
            </span>
          </h1>
          <p className="text-white/50 text-base md:text-lg">
            Safety Life CYOA
          </p>
        </div>

        {/* Description */}
        <p className="text-white/40 text-sm md:text-base leading-relaxed mb-10 px-4">
          일상 속 다양한 위험 상황에서 올바른 선택을 내려보세요.
          <br />
          당신의 판단이 생명을 좌우합니다.
        </p>

        {/* 7 safety areas preview */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { icon: "🏠", name: "생활안전" },
            { icon: "🚗", name: "교통안전" },
            { icon: "🛡️", name: "신변안전" },
            { icon: "💊", name: "약물·사이버" },
            { icon: "🌊", name: "재난안전" },
            { icon: "🏗️", name: "직업안전" },
            { icon: "🏥", name: "응급처치" },
          ].map((area) => (
            <span
              key={area.name}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10
                         text-xs text-white/50 flex items-center gap-1"
            >
              {area.icon} {area.name}
            </span>
          ))}
        </div>

        {/* Start button */}
        <button
          onClick={() => setPhase("character-select")}
          className="px-12 py-4 rounded-2xl font-bold text-lg
                     bg-gradient-to-r from-blue-600 to-violet-600
                     hover:from-blue-500 hover:to-violet-500
                     transition-all duration-300 hover:scale-105 active:scale-95
                     text-white shadow-2xl shadow-blue-500/30
                     ring-1 ring-white/10"
        >
          게임 시작
        </button>

        <p className="text-white/20 text-xs mt-6">
          7대 안전영역 · 삽화 중심 선택형 게임
        </p>
      </div>
    </div>
  );
}
