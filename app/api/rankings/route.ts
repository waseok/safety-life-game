import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export interface RankingEntry {
  name: string;
  score: number;
  accuracy: number;
  questionScore?: number;
  date: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "rankings.json");

// ── 모듈 레벨 메모리 캐시 ─────────────────────────────────────
// 같은 서버 프로세스 내에서는 페이지 새로고침과 관계없이 데이터 유지
let cache: RankingEntry[] | null = null;

async function getRankings(): Promise<RankingEntry[]> {
  if (cache !== null) return cache;
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    cache = JSON.parse(raw);
  } catch {
    cache = [];
  }
  return cache!;
}

async function saveRankings(entries: RankingEntry[]): Promise<void> {
  cache = entries; // 메모리 캐시 즉시 업데이트
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
  } catch {
    // 파일 쓰기 실패해도 메모리 캐시는 살아있음
  }
}

export async function GET() {
  const rankings = await getRankings();
  const top = [...rankings].sort((a, b) => b.score - a.score).slice(0, 50);
  return NextResponse.json(top);
}

export async function POST(req: NextRequest) {
  let body: RankingEntry;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.name || typeof body.score !== "number") {
    return NextResponse.json({ error: "Invalid entry" }, { status: 400 });
  }

  const existing = await getRankings();
  const updated = [...existing, body]
    .sort((a, b) => b.score - a.score)
    .slice(0, 200);

  await saveRankings(updated);

  return NextResponse.json({ ok: true, rankings: updated.slice(0, 50) });
}
