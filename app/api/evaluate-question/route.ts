import { NextRequest, NextResponse } from "next/server";

export interface EvaluateRequest {
  question: string;
  areaTitle: string;
  areaIcon: string;
  isMidpoint: boolean;
  situationTitles?: string[]; // 학생이 경험한 상황 제목들 (컨텍스트)
}

export interface EvaluateResponse {
  score: number;       // 0–50
  relevance: number;   // 0–20
  depth: number;       // 0–20
  originality: number; // 0–10
  feedback: string;    // 질문 자체에 대한 피드백 (2–3문장, 한국어)
  safetyExplanation: string; // 질문과 연관된 안전 지식 설명 (2–3문장, 한국어)
  level: string;       // 질문 수준 라벨
}

const LEVEL_LABELS = [
  { min: 45, label: "탁월한 탐구자 🌟" },
  { min: 35, label: "우수한 질문자 ⭐" },
  { min: 25, label: "성장하는 탐구자 📈" },
  { min: 10, label: "탐구 시작 중 🌱" },
  { min: 0,  label: "더 발전해보세요 💪" },
];

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  let body: EvaluateRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { question, areaTitle, isMidpoint, situationTitles = [] } = body;
  if (!question?.trim() || !areaTitle) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const situationContext = situationTitles.length > 0
    ? `\n학생이 경험한 상황들: ${situationTitles.join(", ")}`
    : "";

  const pointDescription = isMidpoint
    ? "학생이 절반쯤 학습한 시점에서 만든 중간 탐구 질문입니다."
    : "학생이 전체 학습을 마친 후 만든 최종 탐구 질문입니다.";

  const systemPrompt = `당신은 안전 교육 전문가이자 IB(국제바칼로레아) 탐구 학습 평가자입니다.
${pointDescription}
학습 영역: "${areaTitle}"${situationContext}

학생이 만든 질문을 평가하고, 해당 질문과 연관된 안전 지식도 설명해주세요.

【평가 기준】
1. **안전 관련성** (0-20점): "${areaTitle}" 주제와 얼마나 관련 있는가?
   - 0-5: 전혀 관련 없음 / 6-12: 약간 관련 / 13-18: 관련 있음 / 19-20: 매우 직접적

2. **탐구 깊이** (0-20점): 단순 사실 확인을 넘어 비판적·분석적 사고를 요구하는가?
   - 0-5: 단순 사실 확인 / 6-12: 이해·설명 수준 / 13-18: 분석·평가 수준 / 19-20: 종합·창의 수준

3. **독창성** (0-10점): 학생 자신의 관점이나 경험이 반영되어 있는가?
   - 0-3: 교과서적 / 4-6: 약간 개인적 / 7-10: 독창적 시각

【응답 형식】 반드시 아래 JSON만 출력 (다른 텍스트 없이):
{
  "score": <합계 0-50>,
  "relevance": <0-20>,
  "depth": <0-20>,
  "originality": <0-10>,
  "feedback": "<질문 자체에 대한 격려와 개선 방향 2-3문장, 한국어>",
  "safetyExplanation": "<이 질문과 관련된 안전 지식이나 실제 사례 설명 2-3문장, 한국어, 교육적으로 유익하게>"
}`;

  try {
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
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI error:", errText);
      return NextResponse.json({ error: "GPT API error" }, { status: 502 });
    }

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
    const levelEntry = LEVEL_LABELS.find((l) => score >= l.min) ?? LEVEL_LABELS[4];

    const result: EvaluateResponse = {
      score,
      relevance:          Math.min(20, Math.max(0, Number(parsed.relevance ?? 10))),
      depth:              Math.min(20, Math.max(0, Number(parsed.depth ?? 10))),
      originality:        Math.min(10, Math.max(0, Number(parsed.originality ?? 5))),
      feedback:           typeof parsed.feedback === "string" ? parsed.feedback : "잘 만들었어요!",
      safetyExplanation:  typeof parsed.safetyExplanation === "string" ? parsed.safetyExplanation : "",
      level:              levelEntry.label,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error("evaluate-question error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
