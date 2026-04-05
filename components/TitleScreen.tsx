"use client";

import { useGameStore } from "@/store/useGameStore";

const AREAS = [
  { icon: "🏠", name: "생활안전",   color: "#3b82f6" },
  { icon: "🚗", name: "교통안전",   color: "#f59e0b" },
  { icon: "🛡️", name: "신변안전",   color: "#8b5cf6" },
  { icon: "💊", name: "약물·사이버", color: "#dc2626" },
  { icon: "🌊", name: "재난안전",   color: "#f97316" },
  { icon: "🏗️", name: "직업안전",   color: "#10b981" },
  { icon: "🏥", name: "응급처치",   color: "#e11d48" },
];

const CHARACTER_CARDS = [
  { emoji: "👦", name: "민준",  desc: "신중한 판단력",  rotate: "-rotate-3",  size: "w-36 h-48 md:w-44 md:h-60", color: "#3b82f6" },
  { emoji: "👧", name: "서연",  desc: "빠른 대처능력", rotate: "rotate-1 scale-110 z-10", size: "w-40 h-52 md:w-48 md:h-64", color: "#9b3e20" },
  { emoji: "🧑", name: "현우",  desc: "넓은 안전지식", rotate: "-rotate-2",  size: "w-36 h-48 md:w-44 md:h-60", color: "#10b981" },
];

export default function TitleScreen() {
  const setPhase = useGameStore((s) => s.setPhase);

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-hidden">

      {/* ── 상단 내비게이션 ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
        <div className="flex justify-between items-center px-6 py-3 max-w-4xl mx-auto">
          <span className="text-xl font-black text-secondary tracking-tighter">
            Safety Life Game
          </span>
          <div className="flex items-center gap-6">
            <button className="text-xs font-black tracking-widest uppercase text-primary">
              홈
            </button>
            <button className="text-xs font-black tracking-widest uppercase text-on-surface/50 hover:text-on-surface transition-colors">
              랭킹
            </button>
            <button className="text-xs font-black tracking-widest uppercase text-on-surface/50 hover:text-on-surface transition-colors">
              도움말
            </button>
          </div>
        </div>
      </nav>

      {/* ── 메인 콘텐츠 ── */}
      <main className="flex-1 flex flex-col items-center justify-center pt-20 pb-28 px-4">

        {/* 배경 장식 블러 블롭 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-30"
            style={{ background: "radial-gradient(circle, #fd8863 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #97daff 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-64 rounded-t-[6rem]"
            style={{ background: "rgba(239,241,242,0.8)" }} />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full">

          {/* 소제목 알약 */}
          <div className="pill-badge mb-4">
            🛡️ 안전 탐험을 시작하세요!
          </div>

          {/* 메인 타이틀 */}
          <h1 className="font-headline text-6xl md:text-8xl font-black text-primary bubbly-text mb-8 tracking-tighter leading-none">
            안전<br />인생게임
          </h1>

          {/* 캐릭터 카드 3장 */}
          <div className="flex justify-center -space-x-6 md:-space-x-8 mb-12">
            {CHARACTER_CARDS.map((c) => (
              <div
                key={c.name}
                className={`relative transform ${c.rotate} hover:rotate-0 hover:scale-105 transition-all duration-300 group`}
              >
                <div
                  className={`${c.size} rounded-2xl border-4 border-white shadow-2xl
                    flex flex-col items-center justify-center gap-2 overflow-hidden`}
                  style={{ background: `linear-gradient(135deg, ${c.color}20 0%, ${c.color}08 100%)`,
                    borderColor: "white" }}
                >
                  <span className="text-5xl md:text-6xl animate-float" style={{ animationDelay: `${Math.random() * 0.5}s` }}>
                    {c.emoji}
                  </span>
                  <div className="text-center px-2">
                    <p className="font-black text-sm" style={{ color: c.color }}>{c.name}</p>
                    <p className="text-[10px] text-on-surface/50 font-medium">{c.desc}</p>
                  </div>
                </div>
                {/* 체크 배지 (중앙 카드) */}
                {c.rotate.includes("z-10") && (
                  <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center shadow-lg border-2 border-white text-lg">
                    ✅
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 시작 버튼 */}
          <button
            onClick={() => setPhase("character-select")}
            className="soft-3d-primary bg-gradient-to-b from-primary-container to-primary
              text-white font-black text-2xl md:text-3xl px-14 py-5 rounded-full
              flex items-center gap-3 group mb-6"
          >
            <span className="tracking-tight">게임 시작</span>
            <span className="text-3xl group-hover:translate-x-1 transition-transform">▶</span>
          </button>

          <p className="text-on-surface/50 font-semibold text-sm max-w-xs">
            7대 안전영역에서 올바른 판단을 내려보세요!
          </p>

          {/* 안전영역 배지 */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {AREAS.map((area) => (
              <span
                key={area.name}
                className="px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5"
                style={{
                  background: `${area.color}15`,
                  border: `1.5px solid ${area.color}40`,
                  color: area.color,
                }}
              >
                {area.icon} {area.name}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* ── 바텀 내비게이션 ── */}
      <nav className="bottom-nav">
        <button className="bottom-nav-item active" aria-label="플레이">
          <span className="text-xl">🎮</span>
          <span className="text-[9px] font-black tracking-widest uppercase">Play</span>
        </button>
        <button className="bottom-nav-item" aria-label="프로필">
          <span className="text-xl">👤</span>
          <span className="text-[9px] font-black tracking-widest uppercase">Profile</span>
        </button>
        <button className="bottom-nav-item" aria-label="업적">
          <span className="text-xl">🏅</span>
          <span className="text-[9px] font-black tracking-widest uppercase">Awards</span>
        </button>
        <button className="bottom-nav-item" aria-label="설정">
          <span className="text-xl">⚙️</span>
          <span className="text-[9px] font-black tracking-widest uppercase">Settings</span>
        </button>
      </nav>
    </div>
  );
}
