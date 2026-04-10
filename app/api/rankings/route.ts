import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { tmpdir } from "os";

export const dynamic = "force-dynamic";

export interface RankingEntry {
  name: string;
  score: number;
  accuracy: number;
  questionScore?: number;
  date: string;
}

// /tmp 는 항상 쓰기 가능 (서버 재시작 전까지 유지)
const TMP_FILE = path.join(tmpdir(), "safety-life-rankings.json");
// data/ 는 권한이 있을 때 영구 보관용
const DATA_FILE = path.join(process.cwd(), "data", "rankings.json");

// ── 모듈 레벨 메모리 캐시 ─────────────────────────────────────
let cache: RankingEntry[] | null = null;

async function loadFromDisk(): Promise<RankingEntry[]> {
  // 1순위: data/rankings.json (재부팅 후에도 유지)
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {}
  // 2순위: /tmp (서버 재시작 전까지 유지)
  try {
    const raw = await fs.readFile(TMP_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {}
  return [];
}

async function getRankings(): Promise<RankingEntry[]> {
  if (cache !== null) return cache;
  cache = await loadFromDisk();
  return cache;
}

async function persistRankings(entries: RankingEntry[]): Promise<void> {
  cache = entries;
  // /tmp 쓰기 (항상 성공)
  try {
    await fs.writeFile(TMP_FILE, JSON.stringify(entries, null, 2), "utf-8");
  } catch (e) {
    console.error("[rankings] /tmp write failed:", e);
  }
  // data/ 쓰기 (권한이 있으면 영구 보관)
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
  } catch {
    // 권한 없으면 무시 (메모리 + /tmp 로 충분)
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

  await persistRankings(updated);

  return NextResponse.json({ ok: true, rankings: updated.slice(0, 50) });
}
