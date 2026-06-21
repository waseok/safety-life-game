# SAFE 인생게임 (7대 안전교육 CYOA)

초등학생 안전교육을 위한 선택형 시뮬레이션 게임입니다. 7대 안전영역 중 하나를 선택한 뒤, 선택에 따라 HP/SP가 변동되는 서바이벌 방식으로 진행됩니다.

## 기술 스택

- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **Animation:** Framer Motion
- **State:** Zustand
- **Backend:** Supabase (PostgreSQL)

## 실행 방법

1. 의존성 설치  
   `npm install`

2. 환경 변수 설정  
   `.env.local.example`을 참고해 `.env.local`을 만듭니다.  
   - `NEXT_PUBLIC_SUPABASE_URL`  
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`  
   - `SUPABASE_SERVICE_ROLE_KEY` (서버 API에서 랭킹 저장·조회용, **브라우저에 노출 금지**)  
   Vercel 등에 배포할 때도 위 변수를 Production 환경에 동일하게 등록하세요.

3. Supabase 테이블 생성  
   Supabase 대시보드 → **SQL Editor**에서 아래 파일 내용을 실행합니다.  
   - **전역 랭킹 (필수, 계속 보이게 하려면):** `supabase/migrations/002_rankings.sql`  
   - (선택) 시나리오 DB: `supabase/migrations/001_game_scenarios.sql`  

   `SUPABASE_SERVICE_ROLE_KEY`가 없으면 랭킹은 임시 파일 저장으로만 동작하며, **재배포 시 사라질 수 있습니다.**

4. 개발 서버 실행  
   `npm run dev`  
   브라우저에서 http://localhost:3000 으로 접속합니다.

## 프로젝트 구조

- `app/page.tsx` — 7영역 선택 메인
- `app/game/[areaId]/page.tsx` — 영역별 게임 페이지
- `components/` — StatusHeader, GameScene, ActionButtons, AreaCard, GameOverModal, EndingModal
- `store/useGameStore.ts` — Zustand 게임 상태
- `lib/supabase-server.ts` — 서버 API용 Supabase (service role)
- `app/api/rankings/route.ts` — 전역 랭킹 GET/POST (DB 우선, 미설정 시 파일 폴백)
- `supabase/migrations/002_rankings.sql` — 랭킹 테이블

## 플레이 가능 영역

- **과학실 안전 (lab_science):** Supabase에 시나리오 데이터를 넣으면 바로 플레이 가능합니다.
- 나머지 6개 영역: DB에 해당 `category` 시나리오를 추가하면 동일하게 플레이할 수 있습니다.
