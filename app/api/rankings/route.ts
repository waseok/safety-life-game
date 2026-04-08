import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export interface RankingEntry {
  name: string;
  score: number;
  accuracy: number;
  date: string;
  areaId?: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "rankings.json");

async function readRankings(): Promise<RankingEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeRankings(entries: RankingEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");
}

export async function GET() {
  const rankings = await readRankings();
  const top = rankings.sort((a, b) => b.score - a.score).slice(0, 50);
  return NextResponse.json(top);
}

export async function POST(req: NextRequest) {
  try {
    const body: RankingEntry = await req.json();
    if (!body.name || typeof body.score !== "number") {
      return NextResponse.json({ error: "Invalid entry" }, { status: 400 });
    }

    const existing = await readRankings();
    const updated = [...existing, body]
      .sort((a, b) => b.score - a.score)
      .slice(0, 200);
    await writeRankings(updated);
    return NextResponse.json({ ok: true, rankings: updated.slice(0, 50) });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
