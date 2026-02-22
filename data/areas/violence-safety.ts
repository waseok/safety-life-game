import { Area } from "@/types/game";

export const violenceSafety: Area = {
  id: "violence-safety",
  title: "폭력/신변안전",
  icon: "🛡️",
  order: 3,
  description:
    "학교폭력, 성폭력 예방, 유괴·미아 방지 등 나와 주변 사람의 신변을 지키는 방법을 배워보세요.",
  coverImage: "/images/situations/area3/cover.png",
  color: "#8b5cf6",
  subAreas: [
    { id: "school-violence", title: "학교폭력", description: "언어·신체·사이버 폭력과 따돌림 대처법" },
    { id: "sexual-violence", title: "성폭력예방", description: "원치 않는 접촉, 디지털 성범죄 예방" },
    { id: "kidnap-prevention", title: "유괴·미아방지", description: "낯선 사람 대처, 미아 시 행동 요령" },
  ],
  situations: [
    // ────────── 학교폭력 (7개) ──────────
    {
      id: "vs-01", areaId: "violence-safety", subAreaId: "school-violence", order: 1,
      title: "언어폭력",
      body: "같은 반 친구들이 모여서 한 친구에게 외모를 비하하는 별명을 부르며 놀리고 있습니다. 놀림을 당하는 친구가 울먹이고 있습니다.",
      image: "/images/situations/area3/s01.png",
      choices: [
        { id: "vs-01-a", text: "\"그건 언어폭력이야, 그만해.\"라고 말하고 선생님께 알린다", lifeDelta: 0, mentalDelta: 10, feedback: "훌륭합니다! 외모 비하, 욕설, 모욕적 별명은 모두 언어폭력입니다. 목격자가 용기 내어 말리는 것이 매우 중요해요.", isCorrect: true },
        { id: "vs-01-b", text: "분위기에 맞춰 같이 웃는다", lifeDelta: -5, mentalDelta: -10, feedback: "방관도 폭력의 일부입니다. 같이 웃는 행동은 피해자에게 큰 상처를 주고, 가해에 동조하는 것이 됩니다.", isCorrect: false },
        { id: "vs-01-c", text: "관여하지 않고 자리를 피한다", lifeDelta: 0, mentalDelta: -5, feedback: "위험한 상황에서 떠나는 것은 이해하지만, 선생님이나 어른에게 알리는 것은 할 수 있습니다. 방관은 폭력을 지속시켜요.", isCorrect: false },
      ],
    },
    {
      id: "vs-02", areaId: "violence-safety", subAreaId: "school-violence", order: 2,
      title: "단체 채팅방 따돌림",
      body: "반 단체 채팅방에서 특정 친구를 빼고 새 채팅방을 만들자는 메시지가 왔습니다. \"걔 싫지 않아? 우리끼리 놀자\"라고 합니다.",
      image: "/images/situations/area3/s01.png",
      choices: [
        { id: "vs-02-a", text: "\"그건 따돌림이야. 나는 참여 안 해.\"라고 분명히 거절한다", lifeDelta: 0, mentalDelta: 10, feedback: "용기 있는 선택입니다! 특정인을 배제하는 단체 채팅방은 사이버 따돌림에 해당합니다. 거절 의사를 분명히 하세요.", isCorrect: true },
        { id: "vs-02-b", text: "초대를 수락하지만 대화에는 참여하지 않는다", lifeDelta: 0, mentalDelta: -5, feedback: "들어가기만 해도 따돌림에 동의한 것으로 보일 수 있습니다. 분명하게 거절하는 것이 중요합니다.", isCorrect: false },
        { id: "vs-02-c", text: "새 채팅방에 들어간다", lifeDelta: -5, mentalDelta: -10, feedback: "특정인을 배제한 채팅방에 참여하는 것은 집단 따돌림의 가해자가 되는 것입니다. 학교폭력으로 처벌받을 수 있어요.", isCorrect: false },
      ],
    },
    {
      id: "vs-03", areaId: "violence-safety", subAreaId: "school-violence", order: 3,
      title: "금품 갈취",
      body: "학교 화장실에서 선배들이 \"용돈 좀 빌려줘\"라며 돈을 요구합니다. 주지 않으면 불이익을 주겠다고 은근히 위협합니다.",
      image: "/images/situations/area3/s02.png",
      choices: [
        { id: "vs-03-a", text: "그 자리를 벗어나 선생님이나 부모님께 바로 알린다", lifeDelta: 0, mentalDelta: 10, feedback: "정확한 대처입니다! 금품 갈취는 명백한 범죄입니다. 혼자 해결하려 하지 말고 반드시 어른에게 도움을 요청하세요. 117(학교폭력 신고)도 이용할 수 있어요.", isCorrect: true },
        { id: "vs-03-b", text: "한 번만 주고 다음에 안 주면 된다고 생각한다", lifeDelta: -10, mentalDelta: -10, feedback: "한 번 주면 계속 요구하게 됩니다. 금품 갈취는 반복되는 특성이 있으므로 초기에 신고하는 것이 중요합니다.", isCorrect: false },
        { id: "vs-03-c", text: "\"돈이 없어\"라고 거짓말한다", lifeDelta: -5, mentalDelta: -5, feedback: "임시 방편일 뿐, 근본적인 해결이 아닙니다. 다음에 또 요구하거나 더 큰 위협을 할 수 있어요. 반드시 신고하세요.", isCorrect: false },
      ],
    },
    {
      id: "vs-04", areaId: "violence-safety", subAreaId: "school-violence", order: 4,
      title: "폭력 목격",
      body: "방과 후 학교 뒷편에서 같은 학년 학생이 다른 학생을 때리고 있는 것을 목격했습니다. 피해 학생이 울며 맞고 있습니다.",
      image: "/images/situations/area3/s02.png",
      choices: [
        { id: "vs-04-a", text: "안전한 거리에서 증거를 확보하고 즉시 선생님/경찰에 신고한다", lifeDelta: 0, mentalDelta: 10, feedback: "최선의 대처입니다! 직접 개입하면 위험할 수 있으니, 안전한 곳에서 증거(사진/영상)를 확보하고 즉시 신고하세요. 117, 112 모두 가능합니다.", isCorrect: true },
        { id: "vs-04-b", text: "직접 가서 말린다", lifeDelta: -10, mentalDelta: 5, feedback: "용기 있는 행동이지만, 혼자 개입하면 본인도 다칠 수 있습니다. 여러 명이 함께 말리거나, 어른에게 알리는 것이 더 안전합니다.", isCorrect: false },
        { id: "vs-04-c", text: "보복이 두려워 못 본 척한다", lifeDelta: 0, mentalDelta: -10, feedback: "두려운 마음은 이해하지만, 익명 신고(117)도 가능합니다. 방관하면 폭력은 더 심해지고 피해자는 더 고통받습니다.", isCorrect: false },
      ],
    },
    {
      id: "vs-05", areaId: "violence-safety", subAreaId: "school-violence", order: 5,
      title: "집단 따돌림",
      body: "반 친구들이 특정 학생과 말을 안 하고, 모둠 활동에서도 같이 안 하려 합니다. 당신은 이 학생과 평소 사이가 나쁘지 않았습니다.",
      image: "/images/situations/area3/s03.png",
      choices: [
        { id: "vs-05-a", text: "따돌림당하는 친구에게 먼저 말 걸고, 선생님께도 상황을 알린다", lifeDelta: 0, mentalDelta: 10, feedback: "가장 용기 있고 올바른 행동입니다! 따돌림 피해자에게 한 명의 친구라도 있으면 심리적 피해가 크게 줄어듭니다.", isCorrect: true },
        { id: "vs-05-b", text: "나도 따돌림당할까 봐 거리를 둔다", lifeDelta: 0, mentalDelta: -10, feedback: "불안한 마음은 이해하지만, 방관은 따돌림을 강화시킵니다. 익명 상담(1388)이나 선생님께 말씀드리는 것도 방법이에요.", isCorrect: false },
        { id: "vs-05-c", text: "분위기에 맞춰 그 친구를 피한다", lifeDelta: -5, mentalDelta: -10, feedback: "따돌림에 동참하는 것은 가해 행위입니다. 학교폭력 가해자로 처벌받을 수 있고, 피해자에게 깊은 상처를 줍니다.", isCorrect: false },
      ],
    },
    {
      id: "vs-06", areaId: "violence-safety", subAreaId: "school-violence", order: 6,
      title: "신체 폭력 피해",
      body: "아무 이유 없이 다른 학생에게 맞았습니다. 아프고 억울하지만, \"맞은 것 얘기하면 더 맞는다\"라고 위협합니다.",
      image: "/images/situations/area3/s03.png",
      choices: [
        { id: "vs-06-a", text: "부모님, 선생님, 또는 117에 즉시 알린다", lifeDelta: 0, mentalDelta: 10, feedback: "반드시 알려야 합니다! \"더 맞는다\"는 위협은 가해자의 전형적인 수법입니다. 혼자 감당하면 폭력이 반복됩니다. 117(학교폭력 신고), 112 모두 가능해요.", isCorrect: true },
        { id: "vs-06-b", text: "보복이 두려워 참는다", lifeDelta: -10, mentalDelta: -15, feedback: "참으면 폭력은 더 심해집니다. 신고하면 학교에서 보호 조치를 받을 수 있어요. 용기를 내세요.", isCorrect: false },
        { id: "vs-06-c", text: "친구들과 함께 되갚아준다", lifeDelta: -15, mentalDelta: -10, feedback: "보복은 자신도 가해자가 되어 처벌받게 됩니다. 정당한 방법(신고)으로 해결해야 합니다.", isCorrect: false },
      ],
    },
    {
      id: "vs-07", areaId: "violence-safety", subAreaId: "school-violence", order: 7,
      title: "SNS 비밀 유포 협박",
      body: "한 친구가 \"네 비밀을 SNS에 올리겠다\"며 원하는 대로 하지 않으면 유포하겠다고 협박합니다.",
      image: "/images/situations/area3/s04.png",
      choices: [
        { id: "vs-07-a", text: "협박 메시지를 캡처해 증거를 남기고, 부모님/선생님께 알린다", lifeDelta: 0, mentalDelta: 10, feedback: "정확한 대처입니다! 협박 내용은 반드시 캡처해서 증거로 보관하세요. 비밀 유포 협박은 범죄이며, 신고하면 법적 보호를 받을 수 있습니다.", isCorrect: true },
        { id: "vs-07-b", text: "시키는 대로 한다", lifeDelta: -10, mentalDelta: -15, feedback: "협박에 굴복하면 요구가 점점 커집니다. 절대 따르지 말고 즉시 어른에게 도움을 요청하세요.", isCorrect: false },
        { id: "vs-07-c", text: "나도 그 친구의 비밀을 폭로하겠다고 맞대응한다", lifeDelta: -5, mentalDelta: -10, feedback: "맞대응은 상황을 악화시키고, 본인도 가해자가 될 수 있습니다. 증거를 확보하고 정당한 방법으로 해결하세요.", isCorrect: false },
      ],
    },
    // ────────── 성폭력예방 (7개) ──────────
    {
      id: "vs-08", areaId: "violence-safety", subAreaId: "sexual-violence", order: 8,
      title: "원치 않는 신체 접촉",
      body: "학원 버스에서 옆에 앉은 어른이 자꾸 어깨나 허벅지를 건드립니다. 실수인지 고의인지 모르겠지만 불쾌합니다.",
      image: "/images/situations/area3/s04.png",
      choices: [
        { id: "vs-08-a", text: "\"만지지 마세요\"라고 크게 말하고 자리를 옮긴다", lifeDelta: 0, mentalDelta: 10, feedback: "올바릅니다! 원치 않는 신체 접촉에는 분명하게 거부 의사를 표현하세요. \"싫어요\", \"하지 마세요\"를 크게 말하는 것이 중요합니다.", isCorrect: true },
        { id: "vs-08-b", text: "실수겠지 하고 참는다", lifeDelta: 0, mentalDelta: -10, feedback: "불쾌한 접촉이 반복되면 실수가 아닐 가능성이 높습니다. 참지 말고 분명히 거절하세요. 내 몸에 대한 결정권은 나에게 있습니다.", isCorrect: false },
        { id: "vs-08-c", text: "조용히 자리를 옮기기만 한다", lifeDelta: 0, mentalDelta: -3, feedback: "자리를 옮긴 것은 좋지만, 말로 거부 의사를 밝히는 것이 더 중요합니다. 가해자에게 분명한 경고가 됩니다.", isCorrect: false },
      ],
    },
    {
      id: "vs-09", areaId: "violence-safety", subAreaId: "sexual-violence", order: 9,
      title: "디지털 성범죄",
      body: "온라인 친구가 \"나만 보여줄 테니 너도 보여줘\"라며 사적인 사진을 요구합니다. 거절하면 그동안의 대화를 유포하겠다고 합니다.",
      image: "/images/situations/area3/s05.png",
      choices: [
        { id: "vs-09-a", text: "즉시 대화를 중단하고, 캡처해서 부모님/경찰에 신고한다", lifeDelta: 0, mentalDelta: 10, feedback: "정확합니다! 사적인 사진 요구는 디지털 성범죄입니다. 절대 보내지 말고, 대화 내용을 캡처해서 증거로 보관한 뒤 경찰(112)이나 디지털성범죄피해자지원센터(02-735-8994)에 신고하세요.", isCorrect: true },
        { id: "vs-09-b", text: "얼굴이 안 나오게 해서 보내준다", lifeDelta: -15, mentalDelta: -15, feedback: "얼굴이 없어도 디지털 성범죄에 악용될 수 있습니다. 한 번 전송된 이미지는 완전히 삭제할 수 없어요. 절대 보내지 마세요.", isCorrect: false },
        { id: "vs-09-c", text: "차단만 하고 넘어간다", lifeDelta: 0, mentalDelta: -5, feedback: "차단은 좋은 조치이지만, 신고하지 않으면 다른 피해자가 생길 수 있습니다. 대화 캡처 후 신고하세요.", isCorrect: false },
      ],
    },
    {
      id: "vs-10", areaId: "violence-safety", subAreaId: "sexual-violence", order: 10,
      title: "온라인 그루밍",
      body: "SNS에서 만난 사람이 매우 친절하게 대해줍니다. 선물도 보내주고 고민도 들어줍니다. 최근 \"직접 만나자\"며 위치를 알려달라고 합니다.",
      image: "/images/situations/area3/s05.png",
      choices: [
        { id: "vs-10-a", text: "온라인에서 만난 사람과 만남을 거절하고 부모님께 알린다", lifeDelta: 0, mentalDelta: 10, feedback: "올바릅니다! 이것은 '온라인 그루밍(길들이기)'의 전형적인 패턴입니다. 친절 → 신뢰 → 만남 유도 → 범죄로 이어집니다. 온라인 친구와 직접 만나는 것은 매우 위험해요.", isCorrect: true },
        { id: "vs-10-b", text: "좋은 사람 같으니 만나본다", lifeDelta: -20, mentalDelta: -15, feedback: "매우 위험합니다! 온라인 그루밍 범죄자들은 처음에 매우 친절하게 접근합니다. 실제 만남은 유괴, 성범죄 등으로 이어질 수 있어요.", isCorrect: false },
        { id: "vs-10-c", text: "공공장소에서 만나면 괜찮을 것 같다", lifeDelta: -10, mentalDelta: -5, feedback: "공공장소라도 온라인에서만 알고 있는 사람과 만나는 것은 위험합니다. 상대의 실제 의도를 알 수 없어요.", isCorrect: false },
      ],
    },
    {
      id: "vs-11", areaId: "violence-safety", subAreaId: "sexual-violence", order: 11,
      title: "불쾌한 성적 농담",
      body: "교실에서 몇몇 친구들이 특정 학생의 신체에 대해 성적인 농담을 합니다. 당사자가 웃으며 넘기지만 표정이 굳어 있습니다.",
      image: "/images/situations/area3/s04.png",
      choices: [
        { id: "vs-11-a", text: "\"그런 말은 성희롱이야. 그만해.\"라고 분명히 말한다", lifeDelta: 0, mentalDelta: 10, feedback: "용기 있는 행동입니다! 웃으며 넘기는 것은 동의가 아닙니다. 상대가 불쾌한 성적 발언은 성희롱에 해당하며, 이를 제지하는 것은 중요합니다.", isCorrect: true },
        { id: "vs-11-b", text: "분위기 깨지 않으려고 같이 웃는다", lifeDelta: -5, mentalDelta: -10, feedback: "함께 웃으면 가해를 지지하는 것이 됩니다. 불쾌한 성적 농담은 분위기나 친밀감과 무관하게 성희롱입니다.", isCorrect: false },
        { id: "vs-11-c", text: "당사자가 웃고 있으니 괜찮다고 생각한다", lifeDelta: 0, mentalDelta: -5, feedback: "웃는 것이 동의는 아닙니다. 많은 피해자가 분위기에 맞추기 위해 웃지만 실제로는 깊은 상처를 받습니다.", isCorrect: false },
      ],
    },
    {
      id: "vs-12", areaId: "violence-safety", subAreaId: "sexual-violence", order: 12,
      title: "몰래카메라 의심",
      body: "공중화장실 칸에 들어갔는데, 벽 구멍이나 선반 위에 렌즈처럼 보이는 것이 있습니다.",
      image: "/images/situations/area3/s05.png",
      choices: [
        { id: "vs-12-a", text: "즉시 나와서 관리자에게 알리고, 필요 시 경찰에 신고한다", lifeDelta: 0, mentalDelta: 10, feedback: "정확합니다! 의심스러운 구멍이나 장치를 발견하면 만지지 말고 즉시 나와서 신고하세요. 경찰(112) 또는 여성긴급전화(1366)에 신고할 수 있습니다.", isCorrect: true },
        { id: "vs-12-b", text: "직접 확인해보려고 만져본다", lifeDelta: -5, mentalDelta: -5, feedback: "증거가 훼손될 수 있습니다. 만지지 말고 즉시 나와서 신고하세요. 경찰이 전문 장비로 확인합니다.", isCorrect: false },
        { id: "vs-12-c", text: "너무 예민한 것 같아서 그냥 쓴다", lifeDelta: -10, mentalDelta: -10, feedback: "예민한 것이 아닙니다. 불법 촬영은 실제로 빈번하게 발생합니다. 의심되면 반드시 신고하세요.", isCorrect: false },
      ],
    },
    {
      id: "vs-13", areaId: "violence-safety", subAreaId: "sexual-violence", order: 13,
      title: "데이트 폭력 징후",
      body: "친구의 연인이 친구의 핸드폰을 수시로 검사하고, 다른 친구를 만나지 못하게 합니다. 친구는 \"사랑이니까 그런 거\"라고 합니다.",
      image: "/images/situations/area3/s04.png",
      choices: [
        { id: "vs-13-a", text: "친구에게 \"그건 통제야, 건강한 관계가 아니야\"라고 진지하게 말한다", lifeDelta: 0, mentalDelta: 10, feedback: "올바른 조언입니다! 핸드폰 검사, 교우관계 통제, 행동 제한은 데이트 폭력의 대표적인 징후입니다. '사랑'이 아니라 '지배'입니다.", isCorrect: true },
        { id: "vs-13-b", text: "커플 일이니까 관여하지 않는다", lifeDelta: 0, mentalDelta: -5, feedback: "데이트 폭력은 커플 사이의 문제가 아니라 명백한 폭력입니다. 친구가 위험할 수 있으니 관심을 기울여주세요.", isCorrect: false },
        { id: "vs-13-c", text: "그 정도는 흔한 일이라고 친구를 안심시킨다", lifeDelta: -5, mentalDelta: -10, feedback: "통제적 행동을 정상화하면 안 됩니다. 데이트 폭력은 점점 심해지는 특성이 있어 초기에 인지하는 것이 중요합니다.", isCorrect: false },
      ],
    },
    {
      id: "vs-14", areaId: "violence-safety", subAreaId: "sexual-violence", order: 14,
      title: "성폭력 피해 후 대처",
      body: "친한 친구가 성폭력 피해를 당했다고 울면서 고백했습니다. 아무에게도 말하지 말라고 합니다.",
      image: "/images/situations/area3/s05.png",
      choices: [
        { id: "vs-14-a", text: "친구의 말을 경청하고, 전문 상담기관 연결을 도와준다", lifeDelta: 0, mentalDelta: 10, feedback: "가장 올바른 대처입니다. 비난하지 말고 \"네 잘못이 아니야\"라고 말해주세요. 여성긴급전화(1366), 해바라기센터에 함께 연락하는 것을 권유하세요.", isCorrect: true },
        { id: "vs-14-b", text: "약속대로 아무에게도 말하지 않는다", lifeDelta: 0, mentalDelta: -10, feedback: "친구의 마음은 이해하지만, 전문 도움 없이는 회복이 어렵습니다. 비밀 유지보다 친구의 안전과 치유가 우선입니다.", isCorrect: false },
        { id: "vs-14-c", text: "\"왜 그때 도망 안 갔어?\"라고 묻는다", lifeDelta: -10, mentalDelta: -15, feedback: "절대 하면 안 되는 말입니다. 피해자에게 책임을 돌리는 것은 2차 가해입니다. 피해자는 잘못이 없습니다.", isCorrect: false },
      ],
    },
    // ────────── 유괴·미아방지 (6개) ──────────
    {
      id: "vs-15", areaId: "violence-safety", subAreaId: "kidnap-prevention", order: 15,
      title: "낯선 어른의 도움 요청",
      body: "학교 앞에서 낯선 어른이 \"강아지를 잃어버렸는데 같이 찾아줄 수 있니?\"라고 합니다. 친절해 보이지만 처음 보는 사람입니다.",
      image: "/images/situations/area3/s03.png",
      choices: [
        { id: "vs-15-a", text: "\"어른에게 도움을 요청하세요\"라고 말하고 자리를 피한다", lifeDelta: 0, mentalDelta: 10, feedback: "정답입니다! 어른이 아이에게 도움을 요청하는 것은 비정상적입니다. 이것은 유괴범의 대표적인 수법이에요. 거절하고 바로 자리를 피하세요.", isCorrect: true },
        { id: "vs-15-b", text: "불쌍해서 함께 찾아준다", lifeDelta: -25, mentalDelta: -10, feedback: "매우 위험합니다! '강아지 찾기', '길 안내', '부모님이 부른다' 등은 유괴범의 전형적인 수법입니다. 절대 따라가지 마세요.", isCorrect: false },
        { id: "vs-15-c", text: "주변을 둘러보고 사람이 많으면 도와준다", lifeDelta: -10, mentalDelta: -5, feedback: "사람이 많아도 안심할 수 없습니다. 낯선 어른의 도움 요청에는 항상 \"어른에게 도움을 요청하세요\"라고 말하세요.", isCorrect: false },
      ],
    },
    {
      id: "vs-16", areaId: "violence-safety", subAreaId: "kidnap-prevention", order: 16,
      title: "귀가길 안전",
      body: "학원이 늦게 끝나서 어두운 길을 혼자 걸어야 합니다. 뒤에서 누군가 계속 따라오는 느낌이 듭니다.",
      image: "/images/situations/area3/s03.png",
      choices: [
        { id: "vs-16-a", text: "가장 가까운 편의점이나 가게에 들어가 도움을 요청한다", lifeDelta: 0, mentalDelta: 10, feedback: "최선의 대처입니다! '아이지킴이집'(노란 스티커 부착 가게)이나 편의점에 들어가세요. 112에 신고하거나 부모님께 전화하세요.", isCorrect: true },
        { id: "vs-16-b", text: "뛰어서 집까지 간다", lifeDelta: -5, mentalDelta: -5, feedback: "뛰면 오히려 상대를 자극할 수 있고, 넘어질 위험도 있습니다. 가까운 안전한 장소로 피하세요.", isCorrect: false },
        { id: "vs-16-c", text: "뒤를 돌아보며 확인한다", lifeDelta: -5, mentalDelta: -3, feedback: "확인만으로는 안전하지 않습니다. 밝고 사람 많은 곳으로 이동하면서 112에 신고하세요.", isCorrect: false },
      ],
    },
    {
      id: "vs-17", areaId: "violence-safety", subAreaId: "kidnap-prevention", order: 17,
      title: "SNS 위치 정보",
      body: "맛집에서 찍은 사진을 인스타그램에 올리려 합니다. 위치 태그를 달면 좋아요가 더 많이 오는데, 위치 정보가 노출됩니다.",
      image: "/images/situations/area3/s04.png",
      choices: [
        { id: "vs-17-a", text: "위치 태그 없이 올리거나, 나중에 그 장소를 떠난 후 올린다", lifeDelta: 0, mentalDelta: 5, feedback: "훌륭합니다! 실시간 위치 노출은 범죄자에게 정보를 제공하는 것입니다. 집, 학교 근처 사진은 특히 위치를 제거하세요.", isCorrect: true },
        { id: "vs-17-b", text: "위치 태그를 달고 바로 올린다", lifeDelta: -5, mentalDelta: -5, feedback: "실시간 위치 공유는 스토킹, 유괴 등의 범죄에 악용될 수 있습니다. 특히 일상 패턴이 드러나는 장소는 주의하세요.", isCorrect: false },
        { id: "vs-17-c", text: "친한 친구만 볼 수 있게 공개 범위를 제한한다", lifeDelta: 0, mentalDelta: 2, feedback: "공개 범위 제한은 좋은 습관이지만, 친구의 친구까지 볼 수 있는 경우가 많습니다. 위치 정보 자체를 제거하는 것이 더 안전해요.", isCorrect: false },
      ],
    },
    {
      id: "vs-18", areaId: "violence-safety", subAreaId: "kidnap-prevention", order: 18,
      title: "길을 잃었을 때",
      body: "낯선 도시에서 가족과 떨어져 길을 잃었습니다. 스마트폰 배터리가 거의 없습니다.",
      image: "/images/situations/area3/s05.png",
      choices: [
        { id: "vs-18-a", text: "가까운 가게나 경찰 초소에 들어가 도움을 요청한다", lifeDelta: 0, mentalDelta: 10, feedback: "정답입니다! 제자리에서 기다리거나, 가까운 경찰서/편의점/공공기관에 도움을 요청하세요. 어린이의 경우 182(경찰 실종신고)로 연락합니다.", isCorrect: true },
        { id: "vs-18-b", text: "길에서 아무 어른에게나 도움을 요청한다", lifeDelta: -5, mentalDelta: -3, feedback: "도움을 요청하는 것은 좋지만, 제복을 입은 사람(경찰, 경비원)이나 가게 직원에게 요청하는 것이 더 안전합니다.", isCorrect: false },
        { id: "vs-18-c", text: "혼자 가족을 찾아 돌아다닌다", lifeDelta: -10, mentalDelta: -10, feedback: "더 멀리 떨어질 수 있습니다. 가능하면 마지막으로 함께 있던 장소 근처에서 기다리세요.", isCorrect: false },
      ],
    },
    {
      id: "vs-19", areaId: "violence-safety", subAreaId: "kidnap-prevention", order: 19,
      title: "수상한 차량 접근",
      body: "하교길에 차 한 대가 옆에 멈추더니 \"집까지 태워줄까?\"라고 합니다. 전혀 모르는 사람입니다.",
      image: "/images/situations/area3/s03.png",
      choices: [
        { id: "vs-19-a", text: "\"괜찮아요\"라고 거절하고 차와 반대 방향으로 빠르게 걸어간다", lifeDelta: 0, mentalDelta: 10, feedback: "완벽한 대처입니다! 낯선 사람의 차에 절대 타면 안 됩니다. 차와 반대 방향으로 가면 차가 따라올 수 없어요. 즉시 112에 신고하세요.", isCorrect: true },
        { id: "vs-19-b", text: "차 번호를 외우고 타지 않는다", lifeDelta: 0, mentalDelta: 3, feedback: "차 번호를 기억하는 것은 좋은 대처이지만, 빠르게 안전한 장소로 이동하는 것이 우선입니다.", isCorrect: false },
        { id: "vs-19-c", text: "비가 오니까 잠깐 태워달라고 한다", lifeDelta: -25, mentalDelta: -10, feedback: "매우 위험합니다! 어떤 상황이든 모르는 사람의 차에 타면 안 됩니다. 이것은 유괴의 시작이 될 수 있어요.", isCorrect: false },
      ],
    },
    {
      id: "vs-20", areaId: "violence-safety", subAreaId: "kidnap-prevention", order: 20,
      title: "비상 연락 체계",
      body: "새 스마트폰으로 바꿨습니다. 부모님 전화번호와 비상 연락처를 저장해야 하는데, 나중에 하려고 합니다.",
      image: "/images/situations/area3/s05.png",
      choices: [
        { id: "vs-20-a", text: "즉시 부모님 번호, 112, 119를 저장하고 비상 연락처도 등록한다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 비상 연락처는 즉시 저장하세요. 부모님 연락처는 암기해두는 것이 좋고, 잠금 화면에서도 볼 수 있게 설정하세요.", isCorrect: true },
        { id: "vs-20-b", text: "나중에 시간 될 때 저장한다", lifeDelta: -5, mentalDelta: -5, feedback: "위급 상황은 예고 없이 옵니다. 새 폰을 받으면 가장 먼저 비상 연락처를 저장하는 습관을 들이세요.", isCorrect: false },
        { id: "vs-20-c", text: "부모님 번호는 기억하니까 괜찮다", lifeDelta: 0, mentalDelta: -2, feedback: "기억하는 것은 좋지만, 긴급 상황에서는 당황해 번호가 생각나지 않을 수 있습니다. 반드시 저장하세요.", isCorrect: false },
      ],
    },
  ],
};
