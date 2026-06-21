-- 전역 랭킹 보드 (Supabase SQL Editor에서 실행)
create table if not exists public.rankings (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 32),
  score integer not null check (score >= 0),
  accuracy integer not null default 0 check (accuracy between 0 and 100),
  question_score integer not null default 0 check (question_score >= 0),
  created_at timestamptz not null default now()
);

create index if not exists idx_rankings_score_desc on public.rankings (score desc, created_at desc);

alter table public.rankings enable row level security;

-- 클라이언트(anon) 직접 접근 차단 — Next.js API(service role)만 사용
-- service_role 키는 RLS를 우회하므로 API 경로로만 읽기/쓰기
