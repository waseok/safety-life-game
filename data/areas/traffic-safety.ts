import { Area } from "@/types/game";

export const trafficSafety: Area = {
  id: "traffic-safety",
  title: "교통안전",
  icon: "🚗",
  order: 2,
  description:
    "보행, 자전거, 대중교통 이용 시 발생할 수 있는 위험 상황에서 올바른 판단을 내려보세요.",
  coverImage: "/images/situations/area2/cover.png",
  color: "#f59e0b",
  subAreas: [
    { id: "pedestrian", title: "보행안전", description: "횡단보도, 야간 보행 등 보행자 안전 수칙" },
    { id: "bicycle", title: "자전거안전", description: "자전거 이용 시 헬멧, 주행 규칙 등" },
    { id: "public-transport", title: "대중교통안전", description: "버스, 지하철, 킥보드 이용 안전" },
  ],
  situations: [
    // ────────── 보행안전 (7개) ──────────
    {
      id: "ts-01", areaId: "traffic-safety", subAreaId: "pedestrian", order: 1,
      title: "깜빡이는 초록불",
      body: "횡단보도 앞에 섰는데 보행 신호가 초록불에서 깜빡이기 시작합니다. 건너편까지 거리가 꽤 있습니다. 뛰면 건널 수 있을 것 같기도 합니다.",
      image: "/images/situations/area2/s01.png",
      choices: [
        { id: "ts-01-a", text: "다음 신호를 기다린다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 깜빡이는 초록불은 곧 빨간불로 바뀐다는 뜻입니다. 무리하게 뛰어 건너다 사고를 당할 수 있어요.", isCorrect: true },
        { id: "ts-01-b", text: "뛰어서 건너간다", lifeDelta: -15, mentalDelta: -5, feedback: "위험합니다! 뛰어 건너다 넘어지거나 차량과 충돌할 수 있습니다. 깜빡이는 신호에서는 건너지 않는 것이 원칙이에요.", isCorrect: false },
        { id: "ts-01-c", text: "차가 없으면 빠르게 건너간다", lifeDelta: -10, mentalDelta: -3, feedback: "차가 없어 보여도 사각지대에서 나타날 수 있습니다. 신호를 지키는 것이 가장 안전합니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-02", areaId: "traffic-safety", subAreaId: "pedestrian", order: 2,
      title: "무단횡단의 유혹",
      body: "버스 시간이 촉박합니다. 횡단보도는 100m 앞에 있지만, 지금 차도를 건너면 바로 정류장입니다. 차가 잠시 안 보이는 것 같습니다.",
      image: "/images/situations/area2/s01.png",
      choices: [
        { id: "ts-02-a", text: "횡단보도까지 걸어가서 건넌다", lifeDelta: 0, mentalDelta: 5, feedback: "올바른 선택입니다! 무단횡단은 교통사고 사망 원인 1위입니다. 버스 한 대 놓치는 것보다 안전이 중요해요.", isCorrect: true },
        { id: "ts-02-b", text: "좌우를 살핀 뒤 빠르게 건넌다", lifeDelta: -20, mentalDelta: -5, feedback: "무단횡단 사고의 대부분은 '차가 없다고 생각했을 때' 발생합니다. 도로에서는 예상치 못한 차가 나타날 수 있어요.", isCorrect: false },
        { id: "ts-02-c", text: "다른 사람이 건너면 따라 건넌다", lifeDelta: -15, mentalDelta: -3, feedback: "다른 사람을 따라 하는 것은 안전을 보장하지 않습니다. 무단횡단은 누가 하든 위험합니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-03", areaId: "traffic-safety", subAreaId: "pedestrian", order: 3,
      title: "스마트폰 보행",
      body: "친구에게 온 메시지를 확인하며 걷고 있습니다. 재밌는 영상 링크를 보내왔는데, 지금 걸어가면서 보고 싶습니다. 앞에 교차로가 있습니다.",
      image: "/images/situations/area2/s02.png",
      choices: [
        { id: "ts-03-a", text: "멈춰서 메시지를 확인하고 다시 걷는다", lifeDelta: 0, mentalDelta: 5, feedback: "훌륭합니다! '스몸비(스마트폰+좀비)' 사고가 매년 증가하고 있습니다. 걸을 때는 전방을 주시하세요.", isCorrect: true },
        { id: "ts-03-b", text: "걸으면서 영상을 본다", lifeDelta: -15, mentalDelta: -5, feedback: "스마트폰을 보며 걸으면 시야의 95%를 잃습니다. 교차로에서 차량을 인지하지 못해 사고 위험이 매우 높아요.", isCorrect: false },
        { id: "ts-03-c", text: "이어폰을 끼고 걸으며 듣기만 한다", lifeDelta: -5, mentalDelta: -2, feedback: "화면을 안 보는 것은 낫지만, 이어폰은 차량 경적이나 주변 소리를 차단해 위험할 수 있습니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-04", areaId: "traffic-safety", subAreaId: "pedestrian", order: 4,
      title: "어두운 밤길",
      body: "학원을 마치고 집으로 돌아가는 밤 9시, 가로등이 없는 골목을 지나야 합니다. 어두운 옷을 입고 있습니다.",
      image: "/images/situations/area2/s02.png",
      choices: [
        { id: "ts-04-a", text: "스마트폰 손전등을 켜고 밝은 길로 돌아간다", lifeDelta: 0, mentalDelta: 5, feedback: "좋은 판단입니다! 야간 보행 시 밝은 옷이나 반사 소재, 손전등을 활용하고 가급적 밝은 길을 이용하세요.", isCorrect: true },
        { id: "ts-04-b", text: "빨리 뛰어서 지나간다", lifeDelta: -10, mentalDelta: -5, feedback: "어두운 곳에서 뛰면 운전자가 보행자를 인식하기 어렵고, 넘어질 위험도 있습니다.", isCorrect: false },
        { id: "ts-04-c", text: "그냥 조심히 걸어간다", lifeDelta: -5, mentalDelta: -2, feedback: "어두운 옷에 아무 조치 없이 걸으면 운전자가 보행자를 발견하지 못할 수 있습니다. 밝은 색 옷이나 반사판이 중요해요.", isCorrect: false },
      ],
    },
    {
      id: "ts-05", areaId: "traffic-safety", subAreaId: "pedestrian", order: 5,
      title: "비 오는 날 횡단보도",
      body: "비가 억수같이 내립니다. 우산을 써서 앞이 잘 보이지 않습니다. 횡단보도 신호가 초록불로 바뀌었습니다.",
      image: "/images/situations/area2/s03.png",
      choices: [
        { id: "ts-05-a", text: "우산을 높이 들어 시야를 확보하고, 좌우를 살핀 뒤 건넌다", lifeDelta: 0, mentalDelta: 5, feedback: "정확합니다! 비 올 때는 우산으로 시야가 가려지고, 차량도 제동거리가 길어집니다. 반드시 좌우 확인 후 건너세요.", isCorrect: true },
        { id: "ts-05-b", text: "초록불이니까 바로 건넌다", lifeDelta: -10, mentalDelta: -3, feedback: "초록불이라도 우회전 차량이 올 수 있습니다. 특히 빗길에서는 차량 제동거리가 1.5배 이상 늘어납니다.", isCorrect: false },
        { id: "ts-05-c", text: "뛰어서 빨리 건넌다", lifeDelta: -10, mentalDelta: -3, feedback: "빗길에서 뛰면 미끄러져 넘어질 수 있고, 운전자도 보행자를 늦게 발견할 수 있습니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-06", areaId: "traffic-safety", subAreaId: "pedestrian", order: 6,
      title: "인도 없는 골목길",
      body: "차도와 인도 구분이 없는 좁은 골목길을 걷고 있습니다. 뒤에서 자동차 소리가 들립니다.",
      image: "/images/situations/area2/s03.png",
      choices: [
        { id: "ts-06-a", text: "길 가장자리로 붙어 걷고 차가 지나갈 때 멈춰 선다", lifeDelta: 0, mentalDelta: 5, feedback: "올바릅니다! 인도가 없는 도로에서는 길 가장자리(좌측)로 걸어야 하며, 차량이 오면 멈추어 양보하세요.", isCorrect: true },
        { id: "ts-06-b", text: "길 한가운데로 걸어 차가 비켜가게 한다", lifeDelta: -15, mentalDelta: -5, feedback: "도로 가운데를 걷는 것은 매우 위험합니다. 보행자는 항상 도로 가장자리로 걸어야 합니다.", isCorrect: false },
        { id: "ts-06-c", text: "뒤를 보지 않고 계속 걷는다", lifeDelta: -10, mentalDelta: -3, feedback: "인도가 없는 도로에서는 항상 뒤에서 오는 차량에 주의해야 합니다. 귀를 기울이고 가장자리로 비켜주세요.", isCorrect: false },
      ],
    },
    {
      id: "ts-07", areaId: "traffic-safety", subAreaId: "pedestrian", order: 7,
      title: "어린이보호구역",
      body: "등교길, 학교 앞 어린이보호구역(스쿨존)을 지나고 있습니다. 주차된 차들 사이로 길을 건너면 빠른데, 횡단보도는 조금 돌아가야 합니다.",
      image: "/images/situations/area2/s04.png",
      choices: [
        { id: "ts-07-a", text: "횡단보도를 이용해 안전하게 건넌다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 주차된 차 사이에서 튀어나오면 운전자가 볼 수 없습니다. 스쿨존에서도 반드시 횡단보도를 이용하세요.", isCorrect: true },
        { id: "ts-07-b", text: "주차된 차 사이로 건넌다", lifeDelta: -20, mentalDelta: -5, feedback: "가장 위험한 행동입니다! 주차 차량 사이에서 갑자기 나타나는 보행자를 운전자가 발견하기 매우 어렵습니다. 어린이 교통사고의 주요 원인이에요.", isCorrect: false },
        { id: "ts-07-c", text: "어린이보호구역이니까 차가 천천히 올 테니 그냥 건넌다", lifeDelta: -10, mentalDelta: -3, feedback: "스쿨존이라도 모든 차가 속도를 줄이는 것은 아닙니다. 횡단보도를 이용하는 것이 가장 안전합니다.", isCorrect: false },
      ],
    },
    // ────────── 자전거안전 (7개) ──────────
    {
      id: "ts-08", areaId: "traffic-safety", subAreaId: "bicycle", order: 8,
      title: "헬멧 없는 자전거",
      body: "친구와 자전거를 타러 나왔는데 헬멧을 깜빡했습니다. 집에 다시 가려면 10분이 걸립니다. 친구는 빨리 출발하자고 합니다.",
      image: "/images/situations/area2/s04.png",
      choices: [
        { id: "ts-08-a", text: "집에 돌아가서 헬멧을 가져온다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 자전거 사고 시 머리 부상이 가장 치명적입니다. 헬멧 착용으로 사망률을 70% 이상 줄일 수 있어요.", isCorrect: true },
        { id: "ts-08-b", text: "오늘 한번은 괜찮겠지 하고 출발한다", lifeDelta: -15, mentalDelta: -5, feedback: "자전거 사고의 75%에서 머리 부상이 발생합니다. '한 번'이 돌이킬 수 없는 결과를 낳을 수 있어요.", isCorrect: false },
        { id: "ts-08-c", text: "천천히 조심해서 타면 된다고 생각한다", lifeDelta: -10, mentalDelta: -3, feedback: "아무리 조심해도 다른 차량이나 돌발 상황은 예측할 수 없습니다. 헬멧은 최후의 보호장비입니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-09", areaId: "traffic-safety", subAreaId: "bicycle", order: 9,
      title: "자전거 방향 전환",
      body: "자전거로 달리다가 왼쪽으로 꺾어야 합니다. 뒤에서 자동차가 오는 소리가 들립니다.",
      image: "/images/situations/area2/s05.png",
      choices: [
        { id: "ts-09-a", text: "왼손을 뻗어 수신호를 보내고 뒤를 확인한 뒤 천천히 방향을 바꾼다", lifeDelta: 0, mentalDelta: 5, feedback: "완벽합니다! 자전거도 차량입니다. 방향 전환 시 반드시 수신호를 보내고 후방을 확인해야 합니다.", isCorrect: true },
        { id: "ts-09-b", text: "갑자기 왼쪽으로 꺾는다", lifeDelta: -25, mentalDelta: -10, feedback: "매우 위험합니다! 뒤에서 오는 차량이 자전거의 갑작스런 방향 전환을 예측하지 못해 충돌할 수 있습니다.", isCorrect: false },
        { id: "ts-09-c", text: "일단 멈춘 뒤 내려서 걸어간다", lifeDelta: 0, mentalDelta: 2, feedback: "안전한 방법이지만, 수신호를 배워두면 내리지 않고도 안전하게 방향 전환이 가능합니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-10", areaId: "traffic-safety", subAreaId: "bicycle", order: 10,
      title: "자전거 도로 선택",
      body: "자전거를 타고 이동 중입니다. 자전거 전용 도로가 끊기고, 넓은 인도와 차도만 남았습니다.",
      image: "/images/situations/area2/s05.png",
      choices: [
        { id: "ts-10-a", text: "자전거에서 내려 인도로 끌고 간다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 자전거 도로가 없을 때 인도에서는 반드시 내려서 끌어야 합니다. 인도 위 자전거 주행은 불법이에요.", isCorrect: true },
        { id: "ts-10-b", text: "인도 위에서 천천히 탄다", lifeDelta: -10, mentalDelta: -3, feedback: "인도에서 자전거를 타는 것은 보행자에게 위험하며 법적으로도 금지되어 있습니다.", isCorrect: false },
        { id: "ts-10-c", text: "차도 가장자리로 주행한다", lifeDelta: -5, mentalDelta: 0, feedback: "차도 주행이 가능한 곳도 있지만, 자전거 전용 도로가 없으면 내려서 끌고 가는 것이 가장 안전합니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-11", areaId: "traffic-safety", subAreaId: "bicycle", order: 11,
      title: "야간 자전거",
      body: "저녁에 자전거를 타려고 합니다. 전조등과 후미등이 달려 있지만 배터리가 다 된 것 같습니다.",
      image: "/images/situations/area2/s04.png",
      choices: [
        { id: "ts-11-a", text: "라이트 배터리를 교체하거나, 야간 주행을 포기한다", lifeDelta: 0, mentalDelta: 5, feedback: "올바릅니다! 야간에 라이트 없이 자전거를 타면 차량 운전자가 발견하기 매우 어렵습니다. 법적으로도 전조등은 필수예요.", isCorrect: true },
        { id: "ts-11-b", text: "잠깐이니까 라이트 없이 탄다", lifeDelta: -15, mentalDelta: -5, feedback: "야간 자전거 사고의 대부분은 라이트 미장착이 원인입니다. 짧은 거리라도 라이트는 필수예요.", isCorrect: false },
        { id: "ts-11-c", text: "스마트폰 손전등으로 대신한다", lifeDelta: -5, mentalDelta: 0, feedback: "임시 방편이지만, 한 손으로 스마트폰을 잡고 자전거를 타는 것은 위험합니다. 전용 라이트를 사용하세요.", isCorrect: false },
      ],
    },
    {
      id: "ts-12", areaId: "traffic-safety", subAreaId: "bicycle", order: 12,
      title: "이어폰 자전거",
      body: "자전거를 타면서 좋아하는 음악을 듣고 싶습니다. 이어폰을 양쪽 귀에 꽂으면 기분 좋게 달릴 수 있을 것 같습니다.",
      image: "/images/situations/area2/s05.png",
      choices: [
        { id: "ts-12-a", text: "이어폰을 사용하지 않고 주변 소리를 들으며 탄다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 자전거 주행 중 이어폰 착용은 경적, 사이렌 등 위험 신호를 듣지 못하게 합니다. 법적으로도 금지인 지역이 많아요.", isCorrect: true },
        { id: "ts-12-b", text: "양쪽 다 끼고 탄다", lifeDelta: -15, mentalDelta: -5, feedback: "양쪽 이어폰은 외부 소리를 완전히 차단합니다. 차량 경적이나 자전거 벨 소리를 듣지 못해 큰 사고로 이어질 수 있어요.", isCorrect: false },
        { id: "ts-12-c", text: "한쪽만 끼고 탄다", lifeDelta: -5, mentalDelta: -2, feedback: "한쪽만 사용하는 것이 양쪽보다는 낫지만, 여전히 주의력이 분산됩니다. 안전을 위해 사용하지 않는 것이 좋습니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-13", areaId: "traffic-safety", subAreaId: "bicycle", order: 13,
      title: "자전거 브레이크 점검",
      body: "오랫동안 타지 않았던 자전거를 꺼냈습니다. 타이어에 바람은 넣었는데, 브레이크가 좀 느슨한 것 같습니다.",
      image: "/images/situations/area2/s04.png",
      choices: [
        { id: "ts-13-a", text: "브레이크를 조정하거나 자전거 가게에서 점검받는다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 자전거 탑승 전 브레이크, 타이어, 체인을 반드시 점검하세요. 특히 브레이크 고장은 치명적 사고로 이어집니다.", isCorrect: true },
        { id: "ts-13-b", text: "천천히 타면 괜찮겠지", lifeDelta: -15, mentalDelta: -5, feedback: "내리막길이나 긴급 상황에서 브레이크가 작동하지 않으면 큰 사고가 납니다. 반드시 점검 후 탑승하세요.", isCorrect: false },
        { id: "ts-13-c", text: "발로 바닥을 끌어 멈추면 된다", lifeDelta: -10, mentalDelta: -3, feedback: "발 브레이크는 속도가 빠를 때 전혀 효과가 없고, 넘어질 위험이 큽니다. 정상적인 브레이크가 필수입니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-14", areaId: "traffic-safety", subAreaId: "bicycle", order: 14,
      title: "자전거 2인 탑승",
      body: "친구가 자전거 뒤에 태워달라고 합니다. 짐받이가 있어서 앉을 수는 있을 것 같습니다. 거리도 멀지 않습니다.",
      image: "/images/situations/area2/s05.png",
      choices: [
        { id: "ts-14-a", text: "위험하다며 거절하고 걸어가자고 한다", lifeDelta: 0, mentalDelta: 5, feedback: "올바른 판단입니다! 자전거 2인 탑승은 균형이 무너지기 쉽고 제동 거리도 늘어납니다. 법적으로도 금지되어 있어요.", isCorrect: true },
        { id: "ts-14-b", text: "짧은 거리니까 태워준다", lifeDelta: -15, mentalDelta: -5, feedback: "거리에 상관없이 2인 탑승은 위험합니다. 무게 불균형으로 핸들 조작이 어렵고 급정거 시 둘 다 넘어집니다.", isCorrect: false },
        { id: "ts-14-c", text: "천천히 가면 괜찮다고 태워준다", lifeDelta: -10, mentalDelta: -3, feedback: "천천히 가도 균형 잡기가 어렵고, 돌발 상황 대처 능력이 크게 떨어집니다.", isCorrect: false },
      ],
    },
    // ────────── 대중교통안전 (6개) ──────────
    {
      id: "ts-15", areaId: "traffic-safety", subAreaId: "public-transport", order: 15,
      title: "버스 승하차",
      body: "버스가 정류장에 도착했습니다. 사람이 많아서 뒷문으로 빠르게 내리고 싶은데, 아직 버스가 완전히 멈추지 않았습니다.",
      image: "/images/situations/area2/s03.png",
      choices: [
        { id: "ts-15-a", text: "버스가 완전히 멈춘 후 차례대로 내린다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 버스가 완전히 정차하기 전에 일어서면 급정거 시 넘어질 수 있습니다. 안전하게 기다려주세요.", isCorrect: true },
        { id: "ts-15-b", text: "문이 열리자마자 뛰어내린다", lifeDelta: -15, mentalDelta: -5, feedback: "움직이는 버스에서 뛰어내리면 넘어지거나 다른 차량과 부딪힐 수 있습니다. 완전 정차 후 내리세요.", isCorrect: false },
        { id: "ts-15-c", text: "문 앞에 미리 서서 기다린다", lifeDelta: -5, mentalDelta: -2, feedback: "문 앞에 서 있으면 급정거 시 유리문에 부딪힐 수 있습니다. 손잡이를 잡고 기다리세요.", isCorrect: false },
      ],
    },
    {
      id: "ts-16", areaId: "traffic-safety", subAreaId: "public-transport", order: 16,
      title: "지하철 스크린도어",
      body: "지하철이 도착하고 스크린도어가 열렸습니다. 서둘러 타려는데, 가방 끈이 스크린도어에 걸린 것 같습니다. 문이 닫히려고 합니다.",
      image: "/images/situations/area2/s03.png",
      choices: [
        { id: "ts-16-a", text: "가방을 빼내고, 안 되면 비상 버튼을 누른다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 스크린도어에 물건이 끼면 무리하게 당기지 말고 비상 개폐 버튼을 누르세요. 끼인 채 열차가 출발하면 큰 사고가 됩니다.", isCorrect: true },
        { id: "ts-16-b", text: "힘으로 가방을 잡아당긴다", lifeDelta: -15, mentalDelta: -5, feedback: "무리하게 당기면 가방이 찢어지거나 몸이 끼일 수 있습니다. 비상 버튼을 사용하세요.", isCorrect: false },
        { id: "ts-16-c", text: "가방을 포기하고 빠진다", lifeDelta: -5, mentalDelta: -3, feedback: "안전을 우선한 것은 좋지만, 끼인 물건이 열차 운행에 지장을 줄 수 있으니 비상 버튼을 눌러 알리는 것이 좋습니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-17", areaId: "traffic-safety", subAreaId: "public-transport", order: 17,
      title: "지하철 비상 상황",
      body: "지하철 안에서 갑자기 연기 냄새가 납니다. 승객들이 웅성거리기 시작합니다. 다음 역까지 2분 정도 남았습니다.",
      image: "/images/situations/area2/s04.png",
      choices: [
        { id: "ts-17-a", text: "비상 인터폰으로 기관사에게 알리고, 젖은 천으로 입을 막는다", lifeDelta: 5, mentalDelta: 10, feedback: "완벽한 대처입니다! 지하철 비상시 기관사에게 알리는 것이 최우선입니다. 비상 인터폰은 각 칸에 설치되어 있어요.", isCorrect: true },
        { id: "ts-17-b", text: "비상 코크를 돌려 문을 열고 뛰어내린다", lifeDelta: -25, mentalDelta: -10, feedback: "절대 안 됩니다! 운행 중 문을 열면 전동열차에 감전되거나 추락할 수 있습니다. 반드시 정차 후 대피하세요.", isCorrect: false },
        { id: "ts-17-c", text: "다음 역까지 참고 기다린다", lifeDelta: -5, mentalDelta: -5, feedback: "기다리는 것보다 즉시 비상 인터폰으로 기관사에게 알려야 합니다. 기관사가 상황을 판단해 조치합니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-18", areaId: "traffic-safety", subAreaId: "public-transport", order: 18,
      title: "버스 안 급정거",
      body: "만원 버스를 타고 있습니다. 손잡이가 멀어서 잡지 못하고 서 있습니다. 버스가 갑자기 급정거합니다!",
      image: "/images/situations/area2/s04.png",
      choices: [
        { id: "ts-18-a", text: "항상 손잡이나 봉을 잡고 서 있는다", lifeDelta: 0, mentalDelta: 5, feedback: "이것이 사고 예방의 핵심입니다! 버스에서는 항상 손잡이, 기둥, 좌석 손잡이 등을 잡고 있어야 급정거에 대비할 수 있어요.", isCorrect: true },
        { id: "ts-18-b", text: "두 발을 넓게 벌려 균형을 잡는다", lifeDelta: -5, mentalDelta: -2, feedback: "발을 넓게 벌리는 것만으로는 급정거에 대비할 수 없습니다. 반드시 고정된 것을 잡으세요.", isCorrect: false },
        { id: "ts-18-c", text: "옆 사람 어깨를 잡는다", lifeDelta: -10, mentalDelta: -5, feedback: "다른 승객도 균형을 잃을 수 있어 오히려 같이 넘어집니다. 고정된 손잡이나 기둥을 잡으세요.", isCorrect: false },
      ],
    },
    {
      id: "ts-19", areaId: "traffic-safety", subAreaId: "public-transport", order: 19,
      title: "혼자 택시 탈 때",
      body: "늦은 밤, 혼자 택시를 타야 합니다. 택시를 잡았는데 기사님이 \"지름길로 가겠다\"며 낯선 길로 들어섭니다.",
      image: "/images/situations/area2/s05.png",
      choices: [
        { id: "ts-19-a", text: "실시간 위치를 가족에게 공유하고, 내비게이션 경로를 요청한다", lifeDelta: 0, mentalDelta: 5, feedback: "훌륭합니다! 혼자 택시 탈 때는 위치 공유 앱을 켜고, 차량 번호를 가족에게 알리세요. 불안하면 경로 변경을 요청하세요.", isCorrect: true },
        { id: "ts-19-b", text: "기사님 말을 믿고 가만히 있는다", lifeDelta: -5, mentalDelta: -10, feedback: "대부분 문제없지만, 혼자 탈 때는 항상 경로를 확인하고 위치를 공유하는 습관이 중요합니다.", isCorrect: false },
        { id: "ts-19-c", text: "무서워서 바로 내리겠다고 한다", lifeDelta: 0, mentalDelta: -5, feedback: "불안하면 내리는 것도 방법이지만, 안전한 장소에서 내리세요. 위치 공유와 경로 확인이 먼저입니다.", isCorrect: false },
      ],
    },
    {
      id: "ts-20", areaId: "traffic-safety", subAreaId: "public-transport", order: 20,
      title: "전동킥보드 이용",
      body: "친구와 공유 전동킥보드를 빌렸습니다. 헬멧이 없지만, 재밌어 보여서 바로 타고 싶습니다. 자전거 도로가 바로 옆에 있습니다.",
      image: "/images/situations/area2/s05.png",
      choices: [
        { id: "ts-20-a", text: "헬멧 없이는 타지 않고, 교통법규를 확인한다", lifeDelta: 0, mentalDelta: 5, feedback: "정답입니다! 전동킥보드도 헬멧 의무이며, 자전거 도로에서 주행해야 합니다. 인도 주행, 2인 탑승, 음주 운전 모두 불법이에요.", isCorrect: true },
        { id: "ts-20-b", text: "인도에서 천천히 탄다", lifeDelta: -15, mentalDelta: -5, feedback: "전동킥보드 인도 주행은 불법이며 보행자와 충돌 위험이 큽니다. 반드시 자전거 도로를 이용하세요.", isCorrect: false },
        { id: "ts-20-c", text: "헬멧 없이 자전거 도로에서 탄다", lifeDelta: -10, mentalDelta: -3, feedback: "자전거 도로를 이용한 것은 맞지만, 헬멧 미착용은 법 위반이며 사고 시 머리 부상 위험이 큽니다.", isCorrect: false },
      ],
    },
  ],
};
