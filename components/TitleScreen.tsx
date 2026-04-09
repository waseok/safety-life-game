"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useGameStore } from "@/store/useGameStore";

const AREAS = [
  { icon: "🏠", name: "생활안전",    color: "#1e88e5", desc: "일상 속 안전 수칙" },
  { icon: "🚗", name: "교통안전",    color: "#ffa726", desc: "도로 위의 안전 규칙" },
  { icon: "🛡️", name: "신변안전",    color: "#7e57c2", desc: "나를 지키는 방법" },
  { icon: "💊", name: "약물·사이버", color: "#ef5350", desc: "디지털 시대 안전" },
  { icon: "🌊", name: "재난안전",    color: "#ff7043", desc: "자연재해 대비법" },
  { icon: "🏗️", name: "직업안전",    color: "#26a69a", desc: "일터에서의 안전" },
  { icon: "🏥", name: "응급처치",    color: "#ef5350", desc: "위급 시 대처 요령" },
];

export default function TitleScreen() {
  const setPhase = useGameStore((s) => s.setPhase);
  const setPlayerName = useGameStore((s) => s.setPlayerName);
  const serverRankings = useGameStore((s) => s.serverRankings);
  const fetchServerRankings = useGameStore((s) => s.fetchServerRankings);
  const rankings = useGameStore((s) => s.rankings);
  const [name, setName] = useState("");
  const [showRanking, setShowRanking] = useState(false);

  useEffect(() => {
    fetchServerRankings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Show server rankings if available, fall back to local rankings
  const displayRankings = serverRankings.length > 0 ? serverRankings : rankings;

  const handleStart = () => {
    if (!name.trim()) return;
    setPlayerName(name.trim());
    setPhase("character-select");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleStart();
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-hidden">

      {/* 상단 내비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛡️</span>
            <span className="text-lg font-black text-primary tracking-tighter">
              Safety Life Game
            </span>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-full bg-surface-container-low border border-outline-variant/30">
            <button
              onClick={() => setShowRanking(false)}
              className={`px-5 py-2 rounded-full text-sm font-black transition-all duration-200 ${
                !showRanking
                  ? "bg-primary text-white shadow-md"
                  : "text-on-surface/60 hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              홈
            </button>
            <button
              onClick={() => setShowRanking(true)}
              className={`px-5 py-2 rounded-full text-sm font-black transition-all duration-200 ${
                showRanking
                  ? "bg-primary text-white shadow-md"
                  : "text-on-surface/60 hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              🏆 랭킹
            </button>
          </div>
        </div>
      </nav>

      {showRanking ? (
        <main className="flex-1 flex flex-col items-center pt-24 pb-12 px-6">
          <div className="max-w-3xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-black text-primary">
                🏆 랭킹 보드
              </h2>
              {serverRankings.length > 0 && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  🌐 전체 유저
                </span>
              )}
            </div>
            {displayRankings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-6xl mb-4">📊</p>
                <p className="text-lg font-bold text-on-surface/50">아직 기록이 없습니다</p>
                <p className="text-sm text-on-surface/40 mt-1">영역을 완료하면 랭킹에 등록됩니다!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayRankings.map((r, i) => (
                  <div
                    key={`${r.name}-${r.date}-${i}`}
                    className="flex items-center gap-4 p-5 rounded-2xl bg-white border transition-all hover:shadow-md"
                    style={{
                      borderColor: i === 0 ? "#ffd700" : i === 1 ? "#c0c0c0" : i === 2 ? "#cd7f32" : "rgba(26,111,181,0.12)",
                      borderWidth: i < 3 ? "2px" : "1px",
                    }}
                  >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl"
                      style={{
                        background: i === 0 ? "#fff8e1" : i === 1 ? "#f5f5f5" : i === 2 ? "#fbe9e7" : "#e3f2fd",
                        color: i === 0 ? "#f57f17" : i === 1 ? "#616161" : i === 2 ? "#bf360c" : "#1565c0",
                      }}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-on-surface text-lg">{r.name}</p>
                      <p className="text-xs text-on-surface/50">{r.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-primary text-xl">{r.score}점</p>
                      <p className="text-xs text-on-surface/50">정답률 {r.accuracy}%</p>
                      {(r as any).questionScore > 0 && (
                        <p className="text-xs font-bold" style={{ color: "#7c3aed" }}>
                          ✏️ 질문 {(r as any).questionScore}점
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      ) : (
        <main className="flex-1 flex flex-col items-center pt-20 pb-8 px-6">
          {/* 배경 장식 */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full blur-3xl opacity-15"
              style={{ background: "radial-gradient(circle, #64b5f6 0%, transparent 70%)" }} />
            <div className="absolute bottom-1/4 right-1/6 w-[30rem] h-[30rem] rounded-full blur-3xl opacity-10"
              style={{ background: "radial-gradient(circle, #42a5f5 0%, transparent 70%)" }} />
          </div>

          <div className="relative z-10 flex min-h-[calc(100dvh-6rem)] flex-col items-center justify-between text-center w-full max-w-6xl">
            <div className="flex flex-col items-center">
              {/* 방패 로고 */}
              <div className="animate-float mb-6 mt-6 md:mb-8">
                <Image
                  src="/images/shield-logo.png"
                  alt="SAFE 프로젝트 - 안전문해력 향상"
                  width={340}
                  height={340}
                  className="drop-shadow-2xl w-[220px] md:w-[300px] xl:w-[340px] h-auto"
                  priority
                />
              </div>

              {/* 소제목 뱃지 */}
              <div className="pill-badge mb-4">
                🛡️ 안전 탐험을 시작하세요!
              </div>

              {/* 메인 타이틀 - 한 줄, 그림자 없음 */}
              <h1 className="font-headline text-5xl md:text-7xl font-black text-primary mb-3 tracking-tighter leading-none">
                안전 인생게임
              </h1>

              <p className="text-on-surface/60 font-semibold text-base md:text-lg mb-8 max-w-lg">
                7대 안전영역에서 올바른 판단을 내리고 안전문해력을 키워보세요!
              </p>

              {/* 이름 입력 + 시작 버튼 */}
              <div className="w-full max-w-md mb-12 md:mb-16">
                <div className="relative mb-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="이름을 입력하세요"
                    maxLength={12}
                    className="w-full px-6 py-5 rounded-2xl text-center text-lg font-bold
                      bg-white border-2 border-blue-200 focus:border-primary focus:ring-4 focus:ring-primary/15
                      outline-none transition-all placeholder:text-on-surface/30 shadow-sm"
                    style={{ color: "#1a2c3d" }}
                  />
                </div>

                <button
                  onClick={handleStart}
                  disabled={!name.trim()}
                  className="soft-3d-primary w-full bg-gradient-to-b from-primary-fixed to-primary
                    text-white font-black text-xl md:text-2xl px-14 py-5 rounded-full
                    flex items-center justify-center gap-3 group
                    disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none
                    transition-all"
                >
                  <span className="tracking-tight">게임 시작</span>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">▶</span>
                </button>
              </div>
            </div>

            {/* 7대 안전영역 카드 */}
            <div className="w-full pb-2">
              <h3 className="text-sm font-black text-primary uppercase tracking-widest mb-5">
                7대 안전 영역
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {AREAS.map((area) => (
                  <div
                    key={area.name}
                    className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-blue-100
                      hover:shadow-lg hover:-translate-y-1 transition-all cursor-default"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                      style={{ background: `${area.color}15` }}
                    >
                      {area.icon}
                    </div>
                    <p className="font-black text-sm text-on-surface">{area.name}</p>
                    <p className="text-[11px] text-on-surface/50 font-medium leading-tight text-center">{area.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      )}
    </div>
  );
}
