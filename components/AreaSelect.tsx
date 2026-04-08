"use client";

import { useGameStore } from "@/store/useGameStore";
import { allAreas } from "@/data/areas";
import { AreaResult } from "@/store/useGameStore";
import IllustrationCard from "./IllustrationCard";

const BADGE_LEVELS = [
  { min: 90, label: "완벽 이수", icon: "🥇", color: "#b45309",  bg: "rgba(245,158,11,0.13)",  border: "rgba(245,158,11,0.5)" },
  { min: 70, label: "우수 이수", icon: "🥈", color: "#1a6fb5",  bg: "rgba(26,111,181,0.12)",    border: "rgba(26,111,181,0.45)" },
  { min: 0,  label: "이수 완료", icon: "🎖️", color: "#0d8a6a",  bg: "rgba(13,138,106,0.12)",    border: "rgba(13,138,106,0.45)" },
];

function getBadge(result?: AreaResult) {
  if (!result) return null;
  const accuracy = result.totalChoices > 0
    ? Math.round((result.correctCount / result.totalChoices) * 100) : 0;
  return BADGE_LEVELS.find((b) => accuracy >= b.min) ?? BADGE_LEVELS[2];
}

// 7개 영역을 벤토 그리드에 배치하는 레이아웃 설정
const GRID_LAYOUTS = [
  { span: "md:col-span-7", tall: true  },  // area 0 - 큰 카드
  { span: "md:col-span-5", tall: true  },  // area 1 - 사이드 큰 카드
  { span: "md:col-span-4", tall: false },  // area 2
  { span: "md:col-span-4", tall: false },  // area 3
  { span: "md:col-span-4", tall: false },  // area 4
  { span: "md:col-span-6", tall: false },  // area 5
  { span: "md:col-span-6", tall: false },  // area 6
];

export default function AreaSelect() {
  const selectArea    = useGameStore((s) => s.selectArea);
  const completedAreas = useGameStore((s) => s.completedAreas);
  const areaResults   = useGameStore((s) => s.areaResults);
  const life          = useGameStore((s) => s.life);
  const mental        = useGameStore((s) => s.mental);
  const maxLife       = useGameStore((s) => s.maxLife);
  const maxMental     = useGameStore((s) => s.maxMental);
  const setPhase      = useGameStore((s) => s.setPhase);
  const resetGame     = useGameStore((s) => s.resetGame);

  const allDone       = completedAreas.length >= allAreas.length;
  const lifePercent   = (life / maxLife) * 100;
  const mentalPercent = (mental / maxMental) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-surface pb-8">

      {/* ── 상단 헤더 ── */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
        <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">

          {/* 로고 + 포인트 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-xl shadow-sm">
              🛡️
            </div>
            <div>
              <h1 className="font-black text-secondary text-lg tracking-tighter leading-none">
                Safety Life Game
              </h1>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-primary-fixed text-xs">⭐</span>
                <span className="text-xs font-black text-on-surface">
                  {life + mental} PTS
                </span>
              </div>
            </div>
          </div>

          {/* 스탯 미니 바 */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-on-surface/50">❤️ 생명력</span>
              <div className="w-24 h-2.5 rounded-full overflow-hidden bg-surface-container-highest">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${lifePercent}%`,
                    background: lifePercent > 60 ? "#0d8a6a" : lifePercent > 30 ? "#ffa726" : "#d32f2f" }} />
              </div>
              <span className="text-xs font-black text-on-surface">{life}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-on-surface/50">🧠 판단력</span>
              <div className="w-24 h-2.5 rounded-full overflow-hidden bg-surface-container-highest">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${mentalPercent}%`,
                    background: mentalPercent > 60 ? "#1a6fb5" : mentalPercent > 30 ? "#ffa726" : "#d32f2f" }} />
              </div>
              <span className="text-xs font-black text-on-surface">{mental}</span>
            </div>
          </div>

          {/* 액션 버튼 */}
          <button
            onClick={resetGame}
            className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105"
            style={{ background: "rgba(211,47,47,0.07)", border: "1px solid rgba(211,47,47,0.2)", color: "#d32f2f" }}
          >
            🏠 처음으로
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full px-6 pt-6">

        {/* ── 타이틀 섹션 ── */}
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
              안전 맵 탐험
            </h2>
            <p className="text-secondary font-bold text-base mt-1">학습할 안전 영역을 선택하세요!</p>
          </div>

          {/* 전체 진행률 */}
          <div className="hidden md:flex flex-col items-end gap-1.5">
            <span className="text-sm font-black text-on-surface">
              {completedAreas.length} / {allAreas.length} 완료
            </span>
            <div className="w-40 h-3 rounded-full overflow-hidden bg-surface-container-highest">
              <div className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(completedAreas.length / allAreas.length) * 100}%`,
                  background: "linear-gradient(90deg, #1a6fb5, #64b5f6)",
                }} />
            </div>
            <span className="text-xs font-bold text-on-surface/50">
              {Math.round((completedAreas.length / allAreas.length) * 100)}% 달성
            </span>
          </div>
        </div>

        {/* ── 벤토 그리드 ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {allAreas.map((area, idx) => {
            const layout     = GRID_LAYOUTS[idx] ?? { span: "md:col-span-4", tall: false };
            const isCompleted = completedAreas.includes(area.id);
            const result      = areaResults.find((r) => r.areaId === area.id);
            const badge       = getBadge(result);
            const accuracy    = result && result.totalChoices > 0
              ? Math.round((result.correctCount / result.totalChoices) * 100) : 0;

            return (
              <div
                key={area.id}
                onClick={() => !isCompleted && selectArea(idx)}
                className={`area-card ${layout.span} ${layout.tall ? "md:h-80" : "h-52 md:h-60"}
                  ${isCompleted ? "opacity-90 cursor-default" : "cursor-pointer"}`}
                style={{
                  borderBottom: `6px solid ${isCompleted ? (badge?.border ?? area.color) : area.color}`,
                }}
              >
                {/* 배경 이미지 */}
                <div className="absolute inset-0">
                  <IllustrationCard
                    src={area.coverImage}
                    alt={area.title}
                    className="w-full h-full"
                  />
                  {/* 그라디언트 오버레이 */}
                  <div className="card-overlay" />
                  {isCompleted && (
                    <div className="absolute inset-0 bg-black/20" />
                  )}
                </div>

                {/* 컨텐츠 */}
                <div className="relative z-10 h-full p-5 flex flex-col justify-between">

                  {/* 상단 배지 행 */}
                  <div className="flex justify-between items-start">
                    {!isCompleted ? (
                      <span className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase text-white shadow-md"
                        style={{ background: area.color }}>
                        {idx === 0 ? "추천" : idx <= 2 ? "도전중" : "미탐험"}
                      </span>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white text-2xl"
                          style={{ background: badge?.bg ?? "rgba(255,255,255,0.2)" }}>
                          {badge?.icon ?? "🎖️"}
                        </div>
                        <span className="text-[10px] font-black text-white mt-1 drop-shadow">{accuracy}%</span>
                      </div>
                    )}

                    <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-2xl shadow-md">
                      <span className="text-sm">{area.icon}</span>
                      <span className="text-xs font-black" style={{ color: area.color }}>
                        Lv.{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* 하단 내용 */}
                  <div>
                    <h3 className="font-headline text-xl md:text-2xl font-black text-white mb-2 drop-shadow-md tracking-tight">
                      {area.title}
                    </h3>

                    {layout.tall && (
                      <p className="text-white/80 text-xs font-medium mb-3 line-clamp-2 leading-relaxed drop-shadow">
                        {area.description}
                      </p>
                    )}

                    {!isCompleted ? (
                      <button
                        className="soft-3d-secondary text-white font-black text-sm
                          px-5 py-2.5 rounded-full flex items-center gap-2"
                        style={{ background: `linear-gradient(to bottom, ${area.color}cc, ${area.color})` }}
                        onClick={(e) => { e.stopPropagation(); selectArea(idx); }}
                      >
                        시작하기 →
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black text-white bg-white/20 backdrop-blur-sm border border-white/30">
                        ✅ {badge?.label ?? "이수 완료"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── 전체 완료 버튼 ── */}
        {allDone && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setPhase("ending")}
              className="soft-3d-tertiary bg-gradient-to-b from-tertiary-fixed to-tertiary
                text-white font-black text-xl px-14 py-5 rounded-full flex items-center gap-3"
            >
              🎉 최종 결과 보기
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
