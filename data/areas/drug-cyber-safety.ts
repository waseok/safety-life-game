import { Area } from "@/types/game";

export const drugCyberSafety: Area = {
  id: "drug-cyber-safety",
  title: "약물/사이버중독",
  icon: "💊",
  order: 4,
  description:
    "약물 오남용과 인터넷·스마트폰 중독 상황에서 건강한 선택을 내려보세요.",
  coverImage: "/images/situations/area4/cover.png",
  color: "#ef4444",
  subAreas: [
    { id: "drug-misuse", title: "약물오남용", description: "담배, 음주, 약물 오남용 예방" },
    { id: "cyber-addiction", title: "인터넷·스마트폰중독", description: "게임 과몰입, 사이버 사기, 디지털 디톡스" },
  ],
  situations: [
    // ────────── 약물오남용 (10개) ──────────
    {
      id: "dc-01", areaId: "drug-cyber-safety", subAreaId: "drug-misuse", order: 1,
      title: "친구의 담배 권유",
      body: "학교 뒤편에서 친구들이 담배를 피우고 있습니다. \"한 번만 피워봐, 별거 아니야\"라며 권유합니다.",
      image: "/images/situations/area4/s01.png",
      choices: [
        { id: "dc-01-a", text: "\"아니, 난 안 해\"라고 단호히 거절한다", lifeDelta: 0, mentalDelta: 10, feedback: "훌륭합니다! 단호한 거절이 가장 효과적입니다. 담배 한 개비로 니코틴 중독이 시작될 수 있고, 청소년기 흡연은 성인보다 중독 속도가 3배 빠릅니다.", isCorrect: true },
        { id: "dc-01-b", text: "한 모금만 피워보고 뱉는다", lifeDelta: -10, mentalDelta: -5, feedback: "한 모금도 위험합니다! 니코틴은 뇌에 10초 만에 도달하며, 첫 흡연에서 현기증과 구역질을 느끼면서도 중독이 시작됩니다.", isCorrect: false },
        { id: "dc-01-c", text: "거절하기 어려워서 피우는 척만 한다", lifeDelta: -5, mentalDelta: -3, feedback: "척만 해도 간접흡연 피해를 받고, 다음에 더 강한 권유를 받게 됩니다. 분명하게 거절하세요.", isCorrect: false },
      ],
    },
    {
      id: "dc-02", areaId: "drug-cyber-safety", subAreaId: "drug-misuse", order: 2,
      title: "전자담배 호기심",
      body: "편의점 앞에서 친구가 과일 맛 전자담배를 보여줍니다. \"이건 물담배 같은 거라 몸에 안 나빠\"라고 합니다.",
      image: "/images/situations/area4/s01.png",
      choices: [
        { id: "dc-02-a", text: "\"전자담배도 니코틴이 있어서 위험해\"라고 거절한다", lifeDelta: 0, mentalDelta: 10, feedback: "정확합니다! 전자담배도 니코틴이 포함되어 있고, 폐 손상과 뇌 발달 저해를 일으킵니다. 과일 맛은 청소년을 유혹하기 위한 것이에요.", isCorrect: true },
        { id: "dc-02-b", text: "맛만 궁금해서 한 번 피워본다", lifeDelta: -10, mentalDelta: -5, feedback: "전자담배 역시 니코틴 중독을 유발합니다. 청소년의 뇌는 성인보다 니코틴에 훨씬 취약합니다.", isCorrect: false },
        { id: "dc-02-c", text: "니코틴 없는 것이면 괜찮다고 생각한다", lifeDelta: -5, mentalDelta: -3, feedback: "니코틴이 없다고 해도, 유해 화학물질과 중금속이 포함되어 있습니다. 어떤 전자담배도 안전하지 않습니다.", isCorrect: false },
      ],
    },
    {
      id: "dc-03", areaId: "drug-cyber-safety", subAreaId: "drug-misuse", order: 3,
      title: "약 과다 복용",
      body: "두통이 너무 심합니다. 약국에서 산 진통제를 먹었는데 효과가 없어서, 2알을 더 먹으려 합니다. 포장에는 1회 1알이라고 되어 있습니다.",
      image: "/images/situations/area4/s02.png",
      choices: [
        { id: "dc-03-a", text: "용법을 지키고, 효과가 없으면 병원에 간다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 약은 반드시 정해진 용법·용량을 지켜야 합니다. 과다 복용은 간 손상, 위장 출혈 등 심각한 부작용을 일으킵니다.", isCorrect: true },
        { id: "dc-03-b", text: "효과가 없으니 2알을 더 먹는다", lifeDelta: -15, mentalDelta: -5, feedback: "매우 위험합니다! 진통제 과다 복용은 간부전, 신장 손상을 일으킬 수 있습니다. 절대 정해진 양을 초과하지 마세요.", isCorrect: false },
        { id: "dc-03-c", text: "다른 종류의 진통제를 같이 먹는다", lifeDelta: -10, mentalDelta: -5, feedback: "약물 중복 복용은 상호작용으로 부작용이 증폭될 수 있습니다. 반드시 의사나 약사에게 상담하세요.", isCorrect: false },
      ],
    },
    {
      id: "dc-04", areaId: "drug-cyber-safety", subAreaId: "drug-misuse", order: 4,
      title: "에너지 음료 과다",
      body: "시험 기간이라 밤새 공부해야 합니다. 에너지 음료를 이미 2캔 마셨는데 졸음이 옵니다. 3캔째를 마실까 고민됩니다.",
      image: "/images/situations/area4/s02.png",
      choices: [
        { id: "dc-04-a", text: "더 마시지 않고 잠깐이라도 잠을 잔다", lifeDelta: 0, mentalDelta: 5, feedback: "올바른 선택입니다! 에너지 음료의 과다한 카페인은 심장 두근거림, 불안, 불면증을 유발합니다. 청소년은 하루 카페인 100mg 이하를 권장해요.", isCorrect: true },
        { id: "dc-04-b", text: "시험이 중요하니까 한 캔 더 마신다", lifeDelta: -10, mentalDelta: -5, feedback: "에너지 음료 과다 섭취로 응급실에 실려가는 청소년이 매년 증가하고 있습니다. 심장에 큰 부담을 줍니다.", isCorrect: false },
        { id: "dc-04-c", text: "에너지 음료 대신 커피를 마신다", lifeDelta: -5, mentalDelta: -2, feedback: "커피도 카페인입니다. 이미 카페인을 많이 섭취한 상태에서 추가 카페인은 위험합니다.", isCorrect: false },
      ],
    },
    {
      id: "dc-05", areaId: "drug-cyber-safety", subAreaId: "drug-misuse", order: 5,
      title: "다이어트 약 유혹",
      body: "SNS에서 \"먹기만 하면 살이 빠지는 약\"이라는 광고를 봤습니다. 후기도 좋고 친구도 사용한다고 합니다.",
      image: "/images/situations/area4/s03.png",
      choices: [
        { id: "dc-05-a", text: "검증되지 않은 약은 먹지 않고, 운동과 식단으로 관리한다", lifeDelta: 0, mentalDelta: 5, feedback: "현명합니다! 인터넷에서 판매하는 다이어트 약 중 상당수가 불법 성분을 포함하고 있습니다. 간 손상, 심장 이상 등 심각한 부작용이 보고되고 있어요.", isCorrect: true },
        { id: "dc-05-b", text: "친구도 먹으니까 주문해본다", lifeDelta: -15, mentalDelta: -5, feedback: "불법 다이어트 약에는 마약 성분, 이뇨제, 각성제 등이 포함될 수 있습니다. 사망 사례도 있습니다.", isCorrect: false },
        { id: "dc-05-c", text: "소량만 먹으면 괜찮겠지", lifeDelta: -10, mentalDelta: -3, feedback: "소량이라도 검증되지 않은 약물은 위험합니다. 반드시 의사의 처방을 받은 약만 복용하세요.", isCorrect: false },
      ],
    },
    {
      id: "dc-06", areaId: "drug-cyber-safety", subAreaId: "drug-misuse", order: 6,
      title: "본드·가스 흡입",
      body: "친구 집에서 놀다가 한 친구가 본드를 내밀며 \"이거 킁킁하면 기분 좋아진다\"고 합니다.",
      image: "/images/situations/area4/s03.png",
      choices: [
        { id: "dc-06-a", text: "\"그건 마약이나 마찬가지야. 절대 안 해\"라고 거절하고 나온다", lifeDelta: 0, mentalDelta: 10, feedback: "정확합니다! 본드, 부탄가스 등 흡입제는 뇌 세포를 파괴하고, 심장 마비로 돌연사할 수 있는 매우 위험한 약물입니다. 한 번이라도 치명적일 수 있어요.", isCorrect: true },
        { id: "dc-06-b", text: "호기심에 한 번만 맡아본다", lifeDelta: -25, mentalDelta: -10, feedback: "한 번의 흡입으로도 사망할 수 있습니다! '급성 흡입 사망 증후군'은 첫 사용에서도 발생합니다.", isCorrect: false },
        { id: "dc-06-c", text: "조금만 맡으면 안전하다고 생각한다", lifeDelta: -20, mentalDelta: -5, feedback: "안전한 양은 없습니다. 흡입제는 소량으로도 심장에 영향을 미쳐 부정맥과 심정지를 일으킬 수 있습니다.", isCorrect: false },
      ],
    },
    {
      id: "dc-07", areaId: "drug-cyber-safety", subAreaId: "drug-misuse", order: 7,
      title: "처방약 공유",
      body: "친구가 수면제를 갖고 있는데 \"잠이 안 올 때 이거 하나 먹으면 바로 잠든다\"며 하나 줍니다.",
      image: "/images/situations/area4/s04.png",
      choices: [
        { id: "dc-07-a", text: "\"처방약은 나눠 먹으면 안 돼\"라고 거절한다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 처방약은 개인의 체질, 체중, 건강 상태에 맞춰 처방된 것입니다. 다른 사람의 처방약을 먹으면 부작용이나 중독이 생길 수 있어요.", isCorrect: true },
        { id: "dc-07-b", text: "한 알 정도는 괜찮겠지 하고 받는다", lifeDelta: -10, mentalDelta: -5, feedback: "수면제는 중독성이 강하고, 다른 약과의 상호작용도 위험합니다. 처방약 공유는 법적으로도 금지되어 있어요.", isCorrect: false },
        { id: "dc-07-c", text: "반만 먹어본다", lifeDelta: -5, mentalDelta: -3, feedback: "양을 줄여도 위험합니다. 의사가 처방하지 않은 약은 어떤 양이든 복용하면 안 됩니다.", isCorrect: false },
      ],
    },
    {
      id: "dc-08", areaId: "drug-cyber-safety", subAreaId: "drug-misuse", order: 8,
      title: "음주 권유",
      body: "선배 집에서 열리는 파티에 갔더니 맥주를 권합니다. \"한 잔만 마셔. 이 정도는 모두 마시잖아\"라고 합니다.",
      image: "/images/situations/area4/s04.png",
      choices: [
        { id: "dc-08-a", text: "\"미성년자라 안 마셔요\"라고 거절한다", lifeDelta: 0, mentalDelta: 10, feedback: "올바릅니다! 청소년 음주는 뇌 발달을 저해하고, 성인보다 알코올 의존 위험이 4배 높습니다. 법적으로도 19세 미만 음주는 금지예요.", isCorrect: true },
        { id: "dc-08-b", text: "분위기에 맞추어 한 잔만 마신다", lifeDelta: -10, mentalDelta: -5, feedback: "한 잔이 한 병이 됩니다. 청소년의 뇌는 아직 발달 중이어서 소량의 알코올에도 영향을 받습니다.", isCorrect: false },
        { id: "dc-08-c", text: "술 대신 다른 음료를 마신다", lifeDelta: 0, mentalDelta: 3, feedback: "음주를 피한 것은 좋지만, 음주가 이루어지는 자리 자체가 위험할 수 있습니다. 안전한 환경에서 모이세요.", isCorrect: false },
      ],
    },
    {
      id: "dc-09", areaId: "drug-cyber-safety", subAreaId: "drug-misuse", order: 9,
      title: "약물 사용 친구 발견",
      body: "친구가 화장실에서 이상한 약을 먹는 것을 목격했습니다. 눈이 풀려 있고 행동이 평소와 다릅니다. 비밀로 해달라고 합니다.",
      image: "/images/situations/area4/s05.png",
      choices: [
        { id: "dc-09-a", text: "친구의 안전을 위해 선생님이나 부모님께 알린다", lifeDelta: 0, mentalDelta: 10, feedback: "가장 중요한 선택입니다! 약물 사용을 숨겨주는 것은 친구를 돕는 것이 아닙니다. 전문 도움이 필요하며, 알리는 것이 생명을 구하는 일이에요.", isCorrect: true },
        { id: "dc-09-b", text: "약속대로 비밀을 지켜준다", lifeDelta: 0, mentalDelta: -10, feedback: "비밀을 지키면 친구의 약물 사용이 심해지고 생명이 위험해질 수 있습니다. 진정한 우정은 위험을 알리는 것입니다.", isCorrect: false },
        { id: "dc-09-c", text: "친구에게 그만두라고만 말한다", lifeDelta: 0, mentalDelta: -3, feedback: "말로만 하는 것은 부족합니다. 약물 중독은 의지만으로 끊기 어렵기 때문에 전문 도움이 필요합니다.", isCorrect: false },
      ],
    },
    {
      id: "dc-10", areaId: "drug-cyber-safety", subAreaId: "drug-misuse", order: 10,
      title: "카페인 중독 증상",
      body: "최근 커피와 에너지 음료를 많이 마셨더니, 손이 떨리고 심장이 두근거리며 잠을 잘 못 잡니다.",
      image: "/images/situations/area4/s05.png",
      choices: [
        { id: "dc-10-a", text: "카페인 음료를 줄이고, 증상이 지속되면 병원에 간다", lifeDelta: 0, mentalDelta: 5, feedback: "올바릅니다! 손 떨림, 심장 두근거림, 불면은 카페인 과다 섭취의 전형적 증상입니다. 즉시 줄이고, 물을 많이 마시세요.", isCorrect: true },
        { id: "dc-10-b", text: "피곤해서 그런 거라 더 마신다", lifeDelta: -15, mentalDelta: -10, feedback: "이미 과다 섭취 증상이 나타난 상태입니다. 더 마시면 심장 부정맥, 경련 등 심각한 상태가 될 수 있어요.", isCorrect: false },
        { id: "dc-10-c", text: "시험 끝날 때까지만 참는다", lifeDelta: -5, mentalDelta: -5, feedback: "몸이 보내는 경고 신호를 무시하면 안 됩니다. 카페인 과다 섭취는 심장 문제로 이어질 수 있어요.", isCorrect: false },
      ],
    },
    // ────────── 인터넷·스마트폰중독 (10개) ──────────
    {
      id: "dc-11", areaId: "drug-cyber-safety", subAreaId: "cyber-addiction", order: 11,
      title: "게임 과몰입",
      body: "새 게임이 너무 재밌어서 어제 밤새 했습니다. 오늘도 학교에서 게임 생각뿐이고, 또 밤새 하고 싶습니다.",
      image: "/images/situations/area4/s01.png",
      choices: [
        { id: "dc-11-a", text: "정해진 시간만 하고, 밤에는 스마트폰을 방 밖에 둔다", lifeDelta: 0, mentalDelta: 5, feedback: "좋은 자기 관리입니다! 게임 시간을 정해두고 알람을 맞추세요. 수면 부족은 집중력·기억력·성장에 직접적인 영향을 줍니다.", isCorrect: true },
        { id: "dc-11-b", text: "재밌을 때 실컷 하는 게 낫다", lifeDelta: -10, mentalDelta: -10, feedback: "게임 과몰입은 수면 부족, 학업 저하, 사회성 감소로 이어집니다. 재미와 절제 사이의 균형이 중요해요.", isCorrect: false },
        { id: "dc-11-c", text: "주말에만 많이 하면 괜찮다", lifeDelta: -5, mentalDelta: -3, feedback: "주말에 몰아서 하는 것도 수면 패턴을 깨뜨립니다. 매일 적절한 시간 제한을 두는 것이 좋습니다.", isCorrect: false },
      ],
    },
    {
      id: "dc-12", areaId: "drug-cyber-safety", subAreaId: "cyber-addiction", order: 12,
      title: "SNS 중독",
      body: "SNS를 5분마다 확인합니다. 좋아요 수가 신경 쓰이고, 다른 사람의 화려한 일상과 비교하며 기분이 우울해집니다.",
      image: "/images/situations/area4/s02.png",
      choices: [
        { id: "dc-12-a", text: "SNS 알림을 끄고 하루 사용 시간을 제한한다", lifeDelta: 0, mentalDelta: 10, feedback: "훌륭합니다! SNS의 화려한 게시물은 편집된 모습입니다. 비교는 자존감을 떨어뜨려요. 알림 끄기와 시간 제한이 효과적인 첫걸음입니다.", isCorrect: true },
        { id: "dc-12-b", text: "더 열심히 꾸며서 올린다", lifeDelta: -5, mentalDelta: -10, feedback: "SNS를 위해 더 꾸미는 것은 악순환의 시작입니다. 실제 삶의 만족도와 SNS 활동은 별개라는 것을 기억하세요.", isCorrect: false },
        { id: "dc-12-c", text: "우울하지만 계속 본다", lifeDelta: -5, mentalDelta: -10, feedback: "우울함을 느끼면서 계속 보는 것은 SNS 중독의 징후입니다. 의식적으로 사용을 줄이고 오프라인 활동을 늘리세요.", isCorrect: false },
      ],
    },
    {
      id: "dc-13", areaId: "drug-cyber-safety", subAreaId: "cyber-addiction", order: 13,
      title: "온라인 도박",
      body: "친구가 스포츠 베팅 앱을 보여주며 \"용돈을 2배로 불렸다\"고 자랑합니다. 쉬운 돈벌이인 것 같습니다.",
      image: "/images/situations/area4/s02.png",
      choices: [
        { id: "dc-13-a", text: "\"미성년자 도박은 불법이야. 하면 안 돼\"라고 거절한다", lifeDelta: 0, mentalDelta: 10, feedback: "정답입니다! 청소년 도박은 불법이며, 도박 중독은 마약 중독과 같은 뇌 변화를 일으킵니다. 초기에 딴 돈은 미끼이고, 결국 다 잃게 됩니다.", isCorrect: true },
        { id: "dc-13-b", text: "소액만 해보면 재밌겠다", lifeDelta: -10, mentalDelta: -10, feedback: "소액으로 시작해 큰돈을 잃는 것이 도박의 함정입니다. 도박 중독은 빠르게 진행되며, 청소년이 특히 취약합니다.", isCorrect: false },
        { id: "dc-13-c", text: "돈은 안 걸고 무료 게임만 해본다", lifeDelta: -5, mentalDelta: -5, feedback: "무료 게임도 도박의 흥분을 경험하게 만들어 실제 도박으로 유도합니다. 시작하지 않는 것이 최선이에요.", isCorrect: false },
      ],
    },
    {
      id: "dc-14", areaId: "drug-cyber-safety", subAreaId: "cyber-addiction", order: 14,
      title: "유해 콘텐츠",
      body: "인터넷에서 자극적이고 폭력적인 영상이 자동으로 추천됩니다. 자꾸 클릭하게 됩니다.",
      image: "/images/situations/area4/s03.png",
      choices: [
        { id: "dc-14-a", text: "관심 없음 표시를 누르고, 추천 알고리즘을 초기화한다", lifeDelta: 0, mentalDelta: 5, feedback: "좋은 대처입니다! 유해 콘텐츠는 알고리즘이 계속 추천하므로, 적극적으로 '관심없음'이나 '신고'를 눌러 차단하세요.", isCorrect: true },
        { id: "dc-14-b", text: "자극적이라 재밌으니까 계속 본다", lifeDelta: -5, mentalDelta: -10, feedback: "폭력적 콘텐츠에 반복 노출되면 공감 능력이 떨어지고 공격성이 증가합니다. 의식적으로 차단하세요.", isCorrect: false },
        { id: "dc-14-c", text: "한 번 보고 넘어간다", lifeDelta: -3, mentalDelta: -5, feedback: "한 번 보면 알고리즘이 비슷한 영상을 더 추천합니다. 적극적으로 차단해야 추천이 줄어들어요.", isCorrect: false },
      ],
    },
    {
      id: "dc-15", areaId: "drug-cyber-safety", subAreaId: "cyber-addiction", order: 15,
      title: "피싱 메시지",
      body: "\"택배가 반송되었습니다. 확인하세요\"라는 문자에 인터넷 주소(URL)가 있습니다. 최근 주문한 것이 있어서 클릭할 뻔했습니다.",
      image: "/images/situations/area4/s03.png",
      choices: [
        { id: "dc-15-a", text: "URL을 클릭하지 않고, 택배 앱에서 직접 확인한다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 문자의 URL은 피싱(사기) 사이트일 수 있습니다. 항상 공식 앱이나 사이트에서 직접 확인하세요. 의심되면 118(사이버 신고)에 문의하세요.", isCorrect: true },
        { id: "dc-15-b", text: "궁금해서 일단 클릭해본다", lifeDelta: -15, mentalDelta: -5, feedback: "피싱 URL을 클릭하면 악성 앱이 설치되어 개인정보와 금융정보가 유출됩니다. 절대 클릭하지 마세요!", isCorrect: false },
        { id: "dc-15-c", text: "무시하고 삭제한다", lifeDelta: 0, mentalDelta: 2, feedback: "삭제한 것은 좋지만, 118에 신고하면 다른 피해를 예방할 수 있습니다.", isCorrect: false },
      ],
    },
    {
      id: "dc-16", areaId: "drug-cyber-safety", subAreaId: "cyber-addiction", order: 16,
      title: "중고거래 사기",
      body: "중고 거래 앱에서 시세보다 훨씬 싸게 게임기를 판매하는 글을 발견했습니다. \"선입금하면 바로 보내겠다\"고 합니다.",
      image: "/images/situations/area4/s04.png",
      choices: [
        { id: "dc-16-a", text: "직거래를 요청하거나, 안전결제 시스템을 이용한다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 선입금 요구는 사기의 대표적인 수법입니다. 반드시 직거래나 안전결제(에스크로)를 이용하세요. 시세보다 지나치게 싸면 의심하세요.", isCorrect: true },
        { id: "dc-16-b", text: "싸니까 바로 입금한다", lifeDelta: -15, mentalDelta: -10, feedback: "선입금 사기입니다! 입금 후 연락이 두절되는 것이 전형적 패턴이에요. 되찾기도 매우 어렵습니다.", isCorrect: false },
        { id: "dc-16-c", text: "반만 먼저 보내고 나머지는 물건 받고 보낸다", lifeDelta: -5, mentalDelta: -3, feedback: "부분 선입금도 사기 피해가 됩니다. 안전결제 외에는 직거래만 안전합니다.", isCorrect: false },
      ],
    },
    {
      id: "dc-17", areaId: "drug-cyber-safety", subAreaId: "cyber-addiction", order: 17,
      title: "디지털 디톡스",
      body: "하루에 스마트폰을 8시간 이상 사용합니다. 스마트폰 없이는 불안하고, 손에 항상 들고 있습니다.",
      image: "/images/situations/area4/s04.png",
      choices: [
        { id: "dc-17-a", text: "사용 시간 제한 앱을 설치하고, 오프라인 취미를 만든다", lifeDelta: 0, mentalDelta: 10, feedback: "좋은 시작입니다! 스마트폰 과의존은 서서히 줄여야 합니다. 화면 사용 시간 설정, 식사 중 폰 내려놓기, 잠자기 30분 전 폰 끄기부터 시작하세요.", isCorrect: true },
        { id: "dc-17-b", text: "쓸 때 쓰고 안 쓸 때 안 쓰면 된다", lifeDelta: -5, mentalDelta: -5, feedback: "이미 하루 8시간 이상 사용하고 있다면 자기 조절이 어려운 상태입니다. 구체적인 방법이 필요해요.", isCorrect: false },
        { id: "dc-17-c", text: "주변 친구들도 다 비슷하니 괜찮다", lifeDelta: -5, mentalDelta: -5, feedback: "다수가 한다고 건강한 것은 아닙니다. 스마트폰 과의존은 수면 장애, 목·눈 건강 문제, 사회성 저하를 일으킵니다.", isCorrect: false },
      ],
    },
    {
      id: "dc-18", areaId: "drug-cyber-safety", subAreaId: "cyber-addiction", order: 18,
      title: "악성 댓글",
      body: "한 유튜버의 영상에서 실수를 발견했습니다. 댓글에서 많은 사람이 조롱하며 악성 댓글을 달고 있습니다.",
      image: "/images/situations/area4/s05.png",
      choices: [
        { id: "dc-18-a", text: "악성 댓글에 동조하지 않고, 필요하면 건설적 의견을 남긴다", lifeDelta: 0, mentalDelta: 5, feedback: "성숙한 태도입니다! 악성 댓글은 사이버 명예훼손이며 처벌받을 수 있습니다. 온라인에서도 상대를 존중하는 것이 중요해요.", isCorrect: true },
        { id: "dc-18-b", text: "재밌어서 함께 조롱하는 댓글을 단다", lifeDelta: -5, mentalDelta: -10, feedback: "악성 댓글은 사이버 폭력이며 법적 처벌 대상입니다. 가벼운 농담이라도 당사자에게는 큰 상처가 됩니다.", isCorrect: false },
        { id: "dc-18-c", text: "댓글은 안 달지만 좋아요를 누른다", lifeDelta: -3, mentalDelta: -3, feedback: "악성 댓글에 좋아요를 누르는 것도 가해에 동조하는 행위입니다. 방관도 폭력의 일부예요.", isCorrect: false },
      ],
    },
    {
      id: "dc-19", areaId: "drug-cyber-safety", subAreaId: "cyber-addiction", order: 19,
      title: "의심스러운 파일",
      body: "게임 무료 핵(치트) 프로그램이라는 파일을 다운로드 사이트에서 발견했습니다. 댓글에는 \"잘 된다\"라는 후기가 많습니다.",
      image: "/images/situations/area4/s05.png",
      choices: [
        { id: "dc-19-a", text: "불법 프로그램이므로 다운로드하지 않는다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 게임 핵 프로그램에는 랜섬웨어, 키로거 등 악성코드가 숨어 있는 경우가 매우 많습니다. 개인정보 유출, PC 감염의 주요 원인이에요.", isCorrect: true },
        { id: "dc-19-b", text: "백신이 있으니 다운받아 본다", lifeDelta: -15, mentalDelta: -5, feedback: "최신 악성코드는 백신 프로그램을 우회할 수 있습니다. 불법 프로그램 자체를 받지 않는 것이 최선이에요.", isCorrect: false },
        { id: "dc-19-c", text: "가상 환경에서 테스트해본다", lifeDelta: -5, mentalDelta: -2, feedback: "기술적 지식이 있어도 불법 프로그램 사용 자체가 범죄일 수 있고, 정보 유출 위험은 여전합니다.", isCorrect: false },
      ],
    },
    {
      id: "dc-20", areaId: "drug-cyber-safety", subAreaId: "cyber-addiction", order: 20,
      title: "게임 과금 유혹",
      body: "모바일 게임에서 한정판 아이템이 나왔습니다. 부모님 카드 정보가 저장되어 있어서 바로 결제할 수 있습니다.",
      image: "/images/situations/area4/s01.png",
      choices: [
        { id: "dc-20-a", text: "부모님께 먼저 상의한다", lifeDelta: 0, mentalDelta: 5, feedback: "올바릅니다! 게임 과금은 부모님과 상의해야 합니다. 한정판 이벤트는 충동 구매를 유도하는 마케팅 전략이에요. 꼭 필요한지 냉정하게 생각하세요.", isCorrect: true },
        { id: "dc-20-b", text: "한정판이니까 몰래 결제한다", lifeDelta: -10, mentalDelta: -10, feedback: "허락 없이 결제하면 금전 피해와 신뢰 훼손이 발생합니다. 게임 과금은 한 번 시작하면 점점 금액이 커지는 특성이 있어요.", isCorrect: false },
        { id: "dc-20-c", text: "소액이니까 나중에 말한다", lifeDelta: -5, mentalDelta: -5, feedback: "소액이라도 허락 없는 결제는 안 됩니다. 소액 결제가 쌓이면 큰 금액이 되며, 이것이 과금 중독의 시작입니다.", isCorrect: false },
      ],
    },
  ],
};
