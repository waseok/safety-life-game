import { NextResponse } from "next/server";
import { isSupabaseRankingsEnabled } from "@/lib/supabase-server";
import { fetchRankingsFromDb } from "@/lib/rankings-db";

export const dynamic = "force-dynamic";

/**
 * Supabase 무료 플랜: 1주일 API/DB 활동 없으면 프로젝트 pause
 * Vercel Cron 또는 GitHub Actions가 주기적으로 호출해 inactivity 타이머를 리셋
 */
export async function GET() {
  const checks: Record<string, string> = { app: "ok" };

  if (isSupabaseRankingsEnabled()) {
    try {
      const rows = await fetchRankingsFromDb();
      checks.db = rows !== null ? "ok" : "error";
    } catch {
      checks.db = "error";
    }
  } else {
    checks.db = "skipped";
  }

  const healthy = checks.db !== "error";

  return NextResponse.json(
    {
      ok: healthy,
      checks,
      ts: new Date().toISOString(),
    },
    {
      status: healthy ? 200 : 503,
      headers: { "Cache-Control": "no-store" },
    }
  );
}
