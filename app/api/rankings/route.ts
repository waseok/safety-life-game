import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { tmpdir } from "os";
import { isSupabaseRankingsEnabled } from "@/lib/supabase-server";
import { fetchRankingsFromDb, insertRankingToDb } from "@/lib/rankings-db";
import type { RankingEntry } from "@/lib/rankings-types";

export const dynamic = "force-dynamic";
export type { RankingEntry } from "@/lib/rankings-types";

const TMP_FILE = path.join(tmpdir(), "safety-life-rankings.json");
const DATA_FILE = path.join(process.cwd(), "data", "rankings.json");

let fileCache: RankingEntry[] | null = null;

async function loadFromFile(): Promise<RankingEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    /* ignore */
  }
  try {
    const raw = await fs.readFile(TMP_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    /* ignore */
  }
  return [];
}

async function getFileRankings(): Promise<RankingEntry[]> {
  if (fileCache !== null) return fileCache;
  fileCache = await loadFromFile();
  return fileCache;
}

async function persistFileRankings(entries: RankingEntry[]): Promise<void> {
  fileCache = entries;
  try {
    await fs.writeFile(TMP_FILE, JSON.stringify(entries, null, 2), "utf-8");
  } catch (e) {
    console.error("[rankings] /tmp write failed:", e);
  }
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
  } catch {
    /* 권한 없으면 /tmp만 사용 */
  }
}

async function getRankings(): Promise<RankingEntry[]> {
  if (isSupabaseRankingsEnabled()) {
    const fromDb = await fetchRankingsFromDb();
    if (fromDb) return fromDb;
  }
  return getFileRankings();
}

async function addRanking(entry: RankingEntry): Promise<RankingEntry[]> {
  if (isSupabaseRankingsEnabled()) {
    const ok = await insertRankingToDb(entry);
    if (ok) {
      const fromDb = await fetchRankingsFromDb();
      if (fromDb) return fromDb;
    }
  }

  const existing = await getFileRankings();
  const updated = [...existing, entry]
    .sort((a, b) => b.score - a.score)
    .slice(0, 200);
  await persistFileRankings(updated);
  return updated.slice(0, 50);
}

export async function GET() {
  const rankings = await getRankings();
  const top = [...rankings].sort((a, b) => b.score - a.score).slice(0, 50);
  return NextResponse.json(top, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
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

  const entry: RankingEntry = {
    name: String(body.name).trim().slice(0, 32) || "익명",
    score: Math.round(body.score),
    accuracy: Math.min(100, Math.max(0, Math.round(body.accuracy ?? 0))),
    questionScore: Math.max(0, Math.round(body.questionScore ?? 0)),
    date: body.date || new Date().toLocaleDateString("ko-KR"),
  };

  const rankings = await addRanking(entry);

  return NextResponse.json({
    ok: true,
    storage: isSupabaseRankingsEnabled() ? "database" : "file",
    rankings,
  });
}
