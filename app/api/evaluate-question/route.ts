import { NextRequest, NextResponse } from "next/server";

export interface EvaluateRequest {
  question: string;
  areaTitle: string;
  areaIcon: string;
  isMidpoint: boolean;
  situationTitles?: string[];
}

export interface EvaluateResponse {
  score: number;
  relevance: number;
  depth: number;
  originality: number;
  feedback: string;
  safetyExplanation: string;
  level: string;
  isLocalFallback?: boolean; // true = GPT 미사용, 로컬 채점
}

const LEVEL_LABELS = [
  { min: 45, label: "탁월한 탐구자 🌟" },
  { min: 35, label: "우수한 질문자 ⭐" },
  { min: 25, label: "성장하는 탐구자 📈" },
  { min: 10, label: "탐구 시작 중 🌱" },
  { min: 0,  label: "더 발전해보세요 💪" },
];

function getLevel(score: number) {
  return LEVEL_LABELS.find((l) => score >= l.min) ?? LEVEL_LABELS[4];
}

// ── 영역별 핵심 키워드 ─────────────────────────────────────────
const AREA_KEYWORDS: Record<string, string[]> = {
  "생활안전":    ["시설", "화재", "전기", "가스", "안전", "위험", "사고", "예방"],
  "교통안전":    ["교통", "도로", "자전거", "신호", "횡단보도", "차량", "보행"],
  "신변안전":    ["폭력", "학교", "따돌림", "사이버", "개인정보", "보호"],
  "약물·사이버": ["약물", "사이버", "인터넷", "스마트폰", "중독", "사기"],
  "재난안전":    ["재난", "지진", "홍수", "태풍", "대피", "화재", "재해"],
  "직업안전":    ["직업", "직장", "작업", "장비", "보호구", "산업", "근로"],
  "응급처치":    ["응급", "처치", "심폐소생술", "구급", "119", "부상", "출혈"],
};

// 탐구적 질문 단어 (깊이 있는 질문일수록 포함 가능성 높음)
const INQUIRY_WORDS = [
  "왜", "어떻게", "어디서", "언제", "누가", "무엇",
  "차이", "비교", "만약", "결과", "영향", "원인", "방법",
  "이유", "필요", "중요", "위험", "예방", "해결", "개선",
];

// ── 로컬 폴백 채점 ────────────────────────────────────────────
function localEvaluate(
  question: string,
  areaTitle: string,
): EvaluateResponse {
  const q = question.trim();
  const words = q.split(/\s+/).length;
  const chars = q.length;

  // 1. 안전 관련성 (0–20)
  const areaKws = AREA_KEYWORDS[areaTitle] ?? [];
  const generalSafetyKws = ["안전", "위험", "사고", "예방", "보호", "규칙", "수칙"];
  const allKws = [...new Set([...areaKws, ...generalSafetyKws])];
  const kwHits = allKws.filter((k) => q.includes(k)).length;
  const relevance = Math.min(20, 6 + Math.min(kwHits * 3, 10) + (chars >= 20 ? 2 : 0) + (chars >= 30 ? 2 : 0));

  // 2. 탐구 깊이 (0–20)
  const inquiryHits = INQUIRY_WORDS.filter((w) => q.includes(w)).length;
  const isQuestion = /[?？]$/.test(q) || /[까나요]$/.test(q);
  const lengthBonus = words >= 10 ? 4 : words >= 7 ? 2 : words >= 4 ? 1 : 0;
  const depth = Math.min(20, 4 + Math.min(inquiryHits * 3, 12) + lengthBonus + (isQuestion ? 2 : 0));

  // 3. 독창성 (0–10)
  const originality = Math.min(10, 3 + (words >= 6 ? 2 : 0) + (words >= 10 ? 2 : 0) + (inquiryHits >= 2 ? 2 : 0) + (isQuestion ? 1 : 0));

  const score = relevance + depth + originality;
  const levelEntry = getLevel(score);

  // 피드백: 점수대별 메시지
  let feedback = "";
  if (score >= 40) {
    feedback = `훌륭한 탐구 질문입니다! ${areaTitle} 안전과 직결된 핵심 내용을 깊이 있게 파고들었어요. 이처럼 '왜', '어떻게'를 활용한 질문은 안전에 대한 비판적 사고를 키워줍니다.`;
  } else if (score >= 30) {
    feedback = `좋은 질문을 만들었어요! ${areaTitle}와 관련된 탐구 의지가 느껴집니다. 질문을 조금 더 구체적으로 다듬거나 '왜', '어떻게'와 같은 탐구 단어를 추가하면 더욱 깊이 있는 질문이 됩니다.`;
  } else if (score >= 20) {
    feedback = `${areaTitle}에 대한 질문을 만들어보려는 노력이 좋아요! 질문이 더 구체적일수록, 그리고 탐구 단어(왜, 어떻게, 어디서 등)를 포함할수록 더 심층적인 학습이 가능합니다.`;
  } else {
    feedback = `질문을 만들어준 것 자체가 훌륭해요! 앞으로 '왜 이런 위험이 발생할까?', '어떻게 하면 예방할 수 있을까?' 처럼 탐구적인 질문을 만들어보세요.`;
  }

  // 안전 지식 설명: 영역별
  const safetyMap: Record<string, string> = {
    "생활안전":    "생활 주변의 안전 위험은 예고 없이 발생합니다. 시설물 점검, 화재 예방, 전기·가스 안전 수칙을 미리 익혀두면 사고를 크게 줄일 수 있습니다. 이상한 점을 발견했을 때 즉시 보고하는 습관이 중요합니다.",
    "교통안전":    "우리나라 어린이 사고 중 교통사고 비율이 높습니다. 횡단보도에서 좌우를 확인하고, 자전거 탑승 시 헬멧을 착용하는 등 기본 수칙만 지켜도 사고를 70% 이상 예방할 수 있습니다.",
    "신변안전":    "신변 안전은 자신을 지키는 것뿐 아니라 주변 사람을 배려하는 것도 포함합니다. 학교폭력, 사이버 괴롭힘 등은 초기에 알리는 것이 가장 효과적인 대처법입니다.",
    "약물·사이버": "약물 오남용과 사이버 중독은 뇌 발달에 심각한 영향을 미칩니다. 건강한 디지털 습관을 위해 하루 사용 시간을 정하고, 낯선 사람의 요청에는 개인정보를 절대 공유하지 않아야 합니다.",
    "재난안전":    "재난은 예측하기 어렵지만 대비는 충분히 가능합니다. 대피로 확인, 비상용품 준비, 대피 신호 인지 등 평소 훈련이 실제 상황에서 생명을 구합니다.",
    "직업안전":    "직업 현장에서 발생하는 사고의 80%는 안전 수칙 미준수로 인한 것입니다. 보호 장구 착용과 작업 전 안전 점검만으로도 대부분의 사고를 예방할 수 있습니다.",
    "응급처치":    "응급 상황에서 골든타임(4분)이 생존율을 결정합니다. 심폐소생술(CPR) 방법을 알아두면 주변 사람의 생명을 구할 수 있습니다. 119에 신고하는 것이 최우선입니다.",
  };
  const safetyExplanation = safetyMap[areaTitle]
    ?? `${areaTitle}에 관한 안전 지식을 쌓는 것은 실제 위험 상황에서 올바른 판단을 내리는 데 큰 도움이 됩니다. 탐구 질문을 통해 더 깊이 생각해보세요.`;

  return {
    score,
    relevance,
    depth,
    originality,
    feedback,
    safetyExplanation,
    level: levelEntry.label,
    isLocalFallback: true,
  };
}

// ── GPT 호출 ──────────────────────────────────────────────────
async function callGPT(
  question: string,
  areaTitle: string,
  isMidpoint: boolean,
  situationTitles: string[],
  apiKey: string,
): Promise<EvaluateResponse> {
  const situationContext = situationTitles.length > 0
    ? `\n학생이 경험한 상황들: ${situationTitles.join(", ")}`
    : "";

  const pointDescription = isMidpoint
    ? "학생이 절반쯤 학습한 시점에서 만든 중간 탐구 질문입니다."
    : "학생이 전체 학습을 마친 후 만든 최종 탐구 질문입니다.";

  const systemPrompt = `당신은 안전 교육 전문가이자 IB(국제바칼로레아) 탐구 학습 평가자입니다.
${pointDescription}
학습 영역: "${areaTitle}"${situationContext}

【평가 기준】
1. 안전 관련성 (0-20점): "${areaTitle}" 주제와 얼마나 관련 있는가?
2. 탐구 깊이 (0-20점): 단순 사실 확인을 넘어 비판적·분석적 사고를 요구하는가?
3. 독창성 (0-10점): 학생 자신의 관점이나 경험이 반영되어 있는가?

【응답 형식】반드시 아래 JSON만 출력:
{"score":<0-50>,"relevance":<0-20>,"depth":<0-20>,"originality":<0-10>,"feedback":"<질문 피드백 2-3문장>","safetyExplanation":"<관련 안전 지식 2-3문장>"}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `학생이 만든 질문: "${question}"` },
      ],
      temperature: 0.4,
      max_tokens: 400,
    }),
    signal: AbortSignal.timeout(10000), // 10초 타임아웃
  });

  if (!response.ok) throw new Error(`OpenAI ${response.status}`);

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content ?? "{}";

  let parsed: Partial<EvaluateResponse>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    parsed = match ? JSON.parse(match[0]) : {};
  }

  const score = Math.min(50, Math.max(0, Number(parsed.score ?? 25)));
  return {
    score,
    relevance:         Math.min(20, Math.max(0, Number(parsed.relevance ?? 10))),
    depth:             Math.min(20, Math.max(0, Number(parsed.depth ?? 10))),
    originality:       Math.min(10, Math.max(0, Number(parsed.originality ?? 5))),
    feedback:          typeof parsed.feedback === "string" ? parsed.feedback : "잘 만들었어요!",
    safetyExplanation: typeof parsed.safetyExplanation === "string" ? parsed.safetyExplanation : "",
    level:             getLevel(score).label,
    isLocalFallback:   false,
  };
}

// ── Route Handler ─────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: EvaluateRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { question, areaTitle, isMidpoint = false, situationTitles = [] } = body;
  if (!question?.trim() || !areaTitle) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // GPT 시도 → 실패 시 로컬 폴백
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    try {
      const result = await callGPT(question.trim(), areaTitle, isMidpoint, situationTitles, apiKey);
      return NextResponse.json(result);
    } catch (err) {
      console.warn("GPT unavailable, using local fallback:", err instanceof Error ? err.message : err);
    }
  }

  // 로컬 폴백 채점
  const fallback = localEvaluate(question.trim(), areaTitle);
  return NextResponse.json(fallback);
}
