import { createSupabaseAdmin } from "@/lib/supabase-server";
import type { RankingEntry } from "@/lib/rankings-types";

interface RankingRow {
  name: string;
  score: number;
  accuracy: number;
  question_score: number;
  created_at: string;
}

function rowToEntry(row: RankingRow): RankingEntry {
  const date = row.created_at ? new Date(row.created_at).toLocaleDateString("ko-KR") : new Date().toLocaleDateString("ko-KR");
  return {
    name: row.name,
    score: row.score,
    accuracy: row.accuracy,
    questionScore: row.question_score,
    date,
  };
}

export async function fetchRankingsFromDb(): Promise<RankingEntry[] | null> {
  const supabase = createSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("rankings")
    .select("name, score, accuracy, question_score, created_at")
    .order("score", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("[rankings] DB read failed:", error.message);
    return null;
  }

  return (data as RankingRow[]).map(rowToEntry);
}

export async function insertRankingToDb(entry: RankingEntry): Promise<boolean> {
  const supabase = createSupabaseAdmin();
  if (!supabase) return false;

  const name = entry.name.trim().slice(0, 32) || "익명";
  const { error } = await supabase.from("rankings").insert({
    name,
    score: Math.round(entry.score),
    accuracy: Math.min(100, Math.max(0, Math.round(entry.accuracy))),
    question_score: Math.max(0, Math.round(entry.questionScore ?? 0)),
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("[rankings] DB insert failed:", error.message);
    return false;
  }
  return true;
}
