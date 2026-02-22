import { Area } from "@/types/game";

export const firstaidSafety: Area = {
  id: "firstaid-safety",
  title: "응급처치",
  icon: "🏥",
  order: 7,
  description:
    "심폐소생술, 자동심장충격기 사용법, 다양한 응급상황 대처법을 배워보세요.",
  coverImage: "/images/situations/area7/cover.png",
  color: "#dc2626",
  subAreas: [
    {
      id: "cpr",
      title: "심폐소생술",
      description: "의식 확인, 가슴 압박, 인공호흡 방법",
    },
    {
      id: "emergency",
      title: "응급상황대처",
      description: "출혈, 골절, 화상, 중독 등 응급처치",
    },
    {
      id: "aed",
      title: "자동심장충격기",
      description: "AED 사용법과 심장 응급 상황 대처",
    },
  ],
  situations: [
    // ────────── 심폐소생술 (7개) ──────────
    {
      id: "fa-01",
      areaId: "firstaid-safety",
      subAreaId: "cpr",
      order: 1,
      title: "쓰러진 사람 발견",
      body: "길을 걷다가 누군가가 바닥에 쓰러져 있는 것을 발견했습니다. 주변에 다른 사람은 없습니다. 어떻게 해야 할까요?",
      image: "/images/situations/area7/s01.png",
      choices: [
        {
          id: "fa-01-a",
          text: "어깨를 터치하며 \"괜찮으세요?\"라고 크게 부르고 의식을 확인한다",
          lifeDelta: 0,
          mentalDelta: 8,
          feedback:
            "정답입니다! CPR 전 반드시 의식을 확인해야 합니다. 어깨를 가볍게 터치하고 크게 부르며 반응이 있는지 확인하세요. 반응이 없으면 119 신고와 CPR을 시작합니다.",
          isCorrect: true,
        },
        {
          id: "fa-01-b",
          text: "바로 가슴을 두드려 깨운다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "위험합니다! 의식 확인 없이 가슴을 두드리면 심장이 멈춘 사람에게는 효과가 없고, 의식이 있는 사람에게는 오히려 부상을 줄 수 있어요. 먼저 어깨를 터치하며 크게 불러보세요.",
          isCorrect: false,
        },
        {
          id: "fa-01-c",
          text: "겁이 나서 그냥 지나친다",
          lifeDelta: -25,
          mentalDelta: -15,
          feedback:
            "쓰러진 사람을 발견했을 때 신고하지 않으면 생명을 잃을 수 있습니다. 최소한 119에 신고하고, 가능하다면 주변 사람을 불러 도움을 요청하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-02",
      areaId: "firstaid-safety",
      subAreaId: "cpr",
      order: 2,
      title: "119 신고 요령",
      body: "쓰러진 사람에게 반응이 없습니다. 119에 신고하려고 합니다. 신고할 때 어떤 정보를 전달해야 할까요?",
      image: "/images/situations/area7/s02.png",
      choices: [
        {
          id: "fa-02-a",
          text: "정확한 위치, 상황(의식 없음), 환자 수, 전화번호를 차분히 전달한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 119 신고 시 '어디서(주소 또는 랜드마크)', '무슨 일인지(의식 없음, 심정지 등)', '몇 명인지', '연락처'를 명확히 전달하세요. 통화를 끊지 말고 지시에 따르세요.",
          isCorrect: true,
        },
        {
          id: "fa-02-b",
          text: "급해서 \"빨리 와주세요!\"만 외친다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "위치를 알려주지 않으면 구급대가 찾아올 수 없습니다. 최대한 차분하게 정확한 위치를 먼저 말하고, 상황을 설명하세요.",
          isCorrect: false,
        },
        {
          id: "fa-02-c",
          text: "다른 사람에게 신고를 맡기고 CPR만 한다",
          lifeDelta: -5,
          mentalDelta: -3,
          feedback:
            "혼자라면 119 신고와 CPR을 동시에 해야 합니다. 스마트폰을 손-free로 두고 통화하면서 CPR을 하거나, 주변인을 불러 신고를 부탁하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-03",
      areaId: "firstaid-safety",
      subAreaId: "cpr",
      order: 3,
      title: "가슴 압박 위치와 깊이",
      body: "의식이 없고 호흡도 없습니다. 가슴 압박(심장 마사지)을 시작하려고 합니다. 어디를, 얼마나 세게 눌러야 할까요?",
      image: "/images/situations/area7/s03.png",
      choices: [
        {
          id: "fa-03-a",
          text: "가슴뼈(흉골) 중앙, 가슴 두께의 1/3(약 5~6cm) 깊이로 분당 100~120회 압박한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확합니다! 가슴뼈 중앙에 두 손을 포갠 뒤, 깊이 5~6cm, 분당 100~120회로 압박합니다. '엎드려 자세' 노래 박자와 비슷해요. 압박 후 가슴이 완전히 돌아올 때까지 기다리세요.",
          isCorrect: true,
        },
        {
          id: "fa-03-b",
          text: "심장이 있는 왼쪽 가슴을 세게 눌러준다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "틀렸습니다! 왼쪽이 아니라 가슴뼈(흉골) 정중앙을 눌러야 합니다. 왼쪽만 누르면 갈비뼈가 부러질 위험이 크고, 효과적인 압박이 되지 않아요.",
          isCorrect: false,
        },
        {
          id: "fa-03-c",
          text: "가볍게 여러 번 두드려준다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "가볍게 두드리는 것은 효과가 없습니다. 심정지 시에는 가슴 두께의 1/3 정도 깊이로 강하게 눌러야 심장에 피를 보낼 수 있어요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-04",
      areaId: "firstaid-safety",
      subAreaId: "cpr",
      order: 4,
      title: "인공호흡과 기도 확보",
      body: "가슴 압박을 30회 한 뒤 인공호흡을 하려고 합니다. 기도를 확보하는 올바른 방법은 무엇인가요?",
      image: "/images/situations/area7/s04.png",
      choices: [
        {
          id: "fa-04-a",
          text: "머리를 뒤로 젖히고 턱을 들어 올려 기도를 펴고, 코를 막고 입으로 1초간 숨을 불어넣는다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "정답입니다! '머리 뒤로, 턱 들어'가 기도 확보의 핵심입니다. 코를 막고 입을 벌려 1초에 걸쳐 숨을 불어넣고, 가슴이 올라가는지 확인하세요. 인공호흡이 어렵다면 가슴 압박만이라도 계속하세요.",
          isCorrect: true,
        },
        {
          id: "fa-04-b",
          text: "턱을 당겨서 기도를 막고 숨을 불어넣는다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "턱을 당기면 기도가 막혀 숨이 들어가지 않습니다. 턱을 '들어 올리는' 것이 맞아요. 머리를 뒤로 젖히고 턱끝을 위로 올려 기도를 펴세요.",
          isCorrect: false,
        },
        {
          id: "fa-04-c",
          text: "인공호흡은 위험하니까 가슴 압박만 한다",
          lifeDelta: 0,
          mentalDelta: 3,
          feedback:
            "인공호흡이 어렵거나 부담스럽다면 가슴 압박만이라도 계속하는 것이 좋습니다. 하지만 가능하다면 30:2(압박 30회:인공호흡 2회) 비율이 더 효과적이에요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-05",
      areaId: "firstaid-safety",
      subAreaId: "cpr",
      order: 5,
      title: "AED와 CPR 연계",
      body: "AED(자동심장충격기)를 가져왔습니다. AED를 사용할 때 CPR과 어떻게 연계해야 할까요?",
      image: "/images/situations/area7/s05.png",
      choices: [
        {
          id: "fa-05-a",
          text: "AED가 도착하면 즉시 전원을 켜고 패드를 부착한 뒤, AED가 충격을 권할 때까지 CPR을 계속한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "완벽합니다! AED 도착 후 전원 켜기 → 패드 부착 → 음성 지시 따르기. 충격 전후로 모두 CPR을 계속합니다. AED가 '심장 분석 중'일 때만 압박을 멈추세요.",
          isCorrect: true,
        },
        {
          id: "fa-05-b",
          text: "AED가 오면 CPR을 멈추고 AED만 사용한다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "AED 사용 중에도 CPR이 필요합니다. 충격 후 즉시 CPR을 재개해야 합니다. CPR 없이 AED만 사용하면 생존율이 크게 떨어져요.",
          isCorrect: false,
        },
        {
          id: "fa-05-c",
          text: "AED 사용법을 모르니까 CPR만 계속한다",
          lifeDelta: -5,
          mentalDelta: -5,
          feedback:
            "AED는 사용법이 음성으로 안내됩니다. 전원만 켜면 패드 부착 위치, 충격 시점 등을 모두 알려줘요. CPR과 AED를 함께 사용하면 생존율이 2배 이상 높아집니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-06",
      areaId: "firstaid-safety",
      subAreaId: "cpr",
      order: 6,
      title: "영아 질식 대처",
      body: "갑자기 아기가 음식을 먹다가 목이 막혀 숨을 쉬지 못합니다. 얼굴이 파래지고 있습니다. 어떻게 해야 할까요?",
      image: "/images/situations/area7/s01.png",
      choices: [
        {
          id: "fa-06-a",
          text: "아기를 엎드려 무릎 위에 올리고, 등 중앙을 손바닥으로 5회 세게 두드린다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정답입니다! 영아(1세 미만) 질식 시에는 '등 두드리기 5회'와 '가슴 압박 5회'를 번갈아 합니다. 아기를 머리가 아래로 가도록 무릎에 엎드려 올리고 등 중앙을 두드리세요.",
          isCorrect: true,
        },
        {
          id: "fa-06-b",
          text: "성인처럼 배를 세게 눌러 헤임리히법을 한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "위험합니다! 영아에게 성인용 헤임리히법(배 누르기)을 하면 내장이 손상될 수 있어요. 영아는 등 두드리기와 가슴 압박만 사용하세요.",
          isCorrect: false,
        },
        {
          id: "fa-06-c",
          text: "손가락으로 입 안을 긁어 이물질을 꺼낸다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "손가락으로 긁으면 이물질이 더 깊이 들어갈 수 있습니다. 보이지 않는 이물질은 건드리지 말고, 등 두드리기와 가슴 압박을 먼저 시도하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-07",
      areaId: "firstaid-safety",
      subAreaId: "cpr",
      order: 7,
      title: "회복 자세",
      body: "쓰러진 사람이 의식이 돌아왔고 호흡도 정상입니다. 구급차가 오기 전까지 어떤 자세로 두어야 할까요?",
      image: "/images/situations/area7/s02.png",
      choices: [
        {
          id: "fa-07-a",
          text: "옆으로 눕히고 아래 팔을 머리 밑에, 위쪽 무릎을 구부려 몸이 뒤로 넘어지지 않게 한다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "정확합니다! 이 자세를 '회복 자세' 또는 '측와위'라고 합니다. 구토 시 기도가 막히는 것을 방지하고, 혀가 뒤로 넘어가는 것을 막아요. 구급대가 올 때까지 이 자세를 유지하세요.",
          isCorrect: true,
        },
        {
          id: "fa-07-b",
          text: "바로 눕혀서 다리를 높게 올린다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "의식이 있는 사람을 바로 눕히고 다리를 올리는 것은 심장 문제가 있을 때만 해당합니다. 의식 회복 후에는 구토 시 기도 폐쇄를 막기 위해 회복 자세가 더 안전해요.",
          isCorrect: false,
        },
        {
          id: "fa-07-c",
          text: "앉은 자세로 기대어 있게 한다",
          lifeDelta: -5,
          mentalDelta: -3,
          feedback:
            "앉은 자세는 의식이 흐려질 때 넘어질 위험이 있습니다. 회복 자세(옆으로 눕히기)가 구토나 의식 저하 시 가장 안전한 자세예요.",
          isCorrect: false,
        },
      ],
    },
    // ────────── 응급상황대처 (7개) ──────────
    {
      id: "fa-08",
      areaId: "firstaid-safety",
      subAreaId: "emergency",
      order: 8,
      title: "출혈과 지혈법",
      body: "친구가 넘어지면서 팔을 베었습니다. 피가 많이 나고 있습니다. 어떻게 지혈해야 할까요?",
      image: "/images/situations/area7/s03.png",
      choices: [
        {
          id: "fa-08-a",
          text: "깨끗한 천이나 거즈로 상처를 직접 압박하고, 가능하면 상처 부위를 심장보다 높게 든다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "정답입니다! '직접 압박'이 가장 기본적인 지혈법입니다. 깨끗한 천으로 상처를 10분 이상 꾹 눌러주고, 상처를 심장보다 높이 들면 출혈이 줄어들어요. 119에 신고하세요.",
          isCorrect: true,
        },
        {
          id: "fa-08-b",
          text: "지혈대를 팔 위쪽에 단단히 조인다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "일반적인 출혈에는 지혈대를 사용하지 않습니다. 지혈대는 사지 절단 등 심한 출혈에서만 사용하며, 잘못 사용하면 조직 괴사로 이어질 수 있어요. 먼저 직접 압박을 시도하세요.",
          isCorrect: false,
        },
        {
          id: "fa-08-c",
          text: "상처에 소독약을 뿌리고 붕대를 감는다",
          lifeDelta: -5,
          mentalDelta: -3,
          feedback:
            "출혈이 심할 때는 먼저 지혈이 우선입니다. 직접 압박으로 피를 멈춘 뒤에 소독과 붕대를 하세요. 소독약은 상처를 자극할 수 있어요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-09",
      areaId: "firstaid-safety",
      subAreaId: "emergency",
      order: 9,
      title: "골절과 부목",
      body: "친구가 계단에서 굴러 다리가 부러진 것 같습니다. 다리가 부자연스럽게 휘어져 있고 움직이지 못합니다. 구급차를 부른 상태입니다.",
      image: "/images/situations/area7/s04.png",
      choices: [
        {
          id: "fa-09-a",
          text: "다리를 움직이지 않게 하고, 부목(나무 막대, 신문지 등)으로 고정한 뒤 부상 부위를 냉찜질한다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "정답입니다! 골절 시 움직이면 신경·혈관 손상이 악화됩니다. 부목으로 상하 관절을 포함해 고정하고, 부기를 줄이기 위해 냉찜질하세요. 부목이 없으면 다리 사이에 쿠션을 넣어 고정해도 됩니다.",
          isCorrect: true,
        },
        {
          id: "fa-09-b",
          text: "다리를 바로 세우려고 당겨서 맞춘다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "절대 하면 안 됩니다! 골절 부위를 당기거나 맞추려 하면 신경·혈관이 손상되고 통증이 심해집니다. 발견한 그대로 고정만 하세요.",
          isCorrect: false,
        },
        {
          id: "fa-09-c",
          text: "붕대로 꽉 조여서 지혈한다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "골절 부위를 꽉 조이면 혈액 순환이 막혀 조직 괴사가 될 수 있습니다. 부목으로 고정할 때는 너무 조이지 않게 하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-10",
      areaId: "firstaid-safety",
      subAreaId: "emergency",
      order: 10,
      title: "화상 응급처치",
      body: "친구가 뜨거운 물에 손을 데었습니다. 손바닥이 빨갛게 되었고 통증을 호소합니다. 어떻게 해야 할까요?",
      image: "/images/situations/area7/s05.png",
      choices: [
        {
          id: "fa-10-a",
          text: "흐르는 찬물에 15~20분 이상 식히고, 깨끗한 거즈로 덮어 감싼다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "정답입니다! 화상 1차 처치는 '찬물에 식히기'입니다. 최소 15~20분, 흐르는 물에 식혀 열기를 빼세요. 물집이 생기면 터뜨리지 말고 깨끗하게 덮어두세요.",
          isCorrect: true,
        },
        {
          id: "fa-10-b",
          text: "얼음으로 직접 찜질한다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "얼음을 직접 대면 동상으로 피부가 추가 손상됩니다. 찬 '물'로 식혀야 해요. 얼음은 사용하지 마세요.",
          isCorrect: false,
        },
        {
          id: "fa-10-c",
          text: "치약이나 된장을 바른다",
          lifeDelta: -20,
          mentalDelta: -8,
          feedback:
            "민간요법은 화상 악화와 감염을 유발합니다. 치약, 된장, 밀가루 등은 절대 바르지 마세요. 찬물로 식히는 것만이 올바른 1차 처치예요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-11",
      areaId: "firstaid-safety",
      subAreaId: "emergency",
      order: 11,
      title: "열사병 대처",
      body: "더운 날 운동을 하다가 친구가 갑자기 쓰러졌습니다. 피부가 뜨겁고 건조하며, 의식이 혼미합니다. 열사병으로 보입니다.",
      image: "/images/situations/area7/s01.png",
      choices: [
        {
          id: "fa-11-a",
          text: "그늘로 옮기고 옷을 벗기며, 젖은 수건으로 몸을 식히고 119에 신고한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정답입니다! 열사병은 응급 상황입니다. 즉시 시원한 곳으로 옮기고, 옷을 벗기고 물에 적신 수건으로 식히세요. 의식이 있으면 시원한 물을 마시게 하고, 119 신고가 필수입니다.",
          isCorrect: true,
        },
        {
          id: "fa-11-b",
          text: "따뜻한 물을 마시게 한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "열사병 시 뜨거운 물은 상태를 악화시킵니다. 시원한 물을 마시게 하고, 몸을 식히는 것이 우선이에요.",
          isCorrect: false,
        },
        {
          id: "fa-11-c",
          text: "바로 병원에 데려간다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "열사병은 생명이 위험할 수 있어 119 구급차를 부르는 것이 좋습니다. 이동 전에 먼저 그늘로 옮기고 몸을 식히는 1차 처치를 하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-12",
      areaId: "firstaid-safety",
      subAreaId: "emergency",
      order: 12,
      title: "저체온증 대처",
      body: "겨울에 친구가 물에 빠졌다가 구조되었습니다.전신이 떨리고 말이 어눌합니다. 저체온증으로 보입니다.",
      image: "/images/situations/area7/s02.png",
      choices: [
        {
          id: "fa-12-a",
          text: "젖은 옷을 벗기고 담요로 감싸며, 따뜻한 음료(알코올 없음)를 마시게 하고 119에 신고한다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "정답입니다! 저체온증 시 젖은 옷을 벗기고 건조하게 감싸세요. 따뜻한 음료를 주되 알코올은 금지(혈관 확장으로 체온 추가 하강). 심한 저체온증은 119 신고가 필요해요.",
          isCorrect: true,
        },
        {
          id: "fa-12-b",
          text: "뜨거운 물로 목욕시킨다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "위험합니다! 갑작스런 고온은 심장에 부담을 주고 위험할 수 있어요. 서서히 따뜻하게 해야 합니다. 담요와 따뜻한 음료로 천천히 체온을 올리세요.",
          isCorrect: false,
        },
        {
          id: "fa-12-c",
          text: "몸을 마사지해서 혈액순환을 돕는다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "저체온증 시 마사지는 위험합니다. 차가운 말단 혈액이 심장으로 돌아가 '재온도 하강'을 일으킬 수 있어요. 몸 중심부를 따뜻하게 하는 데 집중하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-13",
      areaId: "firstaid-safety",
      subAreaId: "emergency",
      order: 13,
      title: "독극물 섭취",
      body: "어린 동생이 세제를 마신 것 같습니다. 입 주변에 거품이 있고 울고 있습니다. 어떻게 해야 할까요?",
      image: "/images/situations/area7/s03.png",
      choices: [
        {
          id: "fa-13-a",
          text: "즉시 119에 신고하고, 무엇을 얼마나 먹었는지, 용기나 포장지를 가져가며 병원으로 간다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정답입니다! 독극물 섭취 시 구토를 유도하면 식도 화상을 악화할 수 있어요. 절대 구토 유도하지 말고, 119 신고 후 독극물 용기와 함께 병원으로 가세요. 무엇을 먹었는지가 치료에 중요합니다.",
          isCorrect: true,
        },
        {
          id: "fa-13-b",
          text: "소금물을 마시게 해서 토하게 한다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "절대 하면 안 됩니다! 구토 유도는 독극물이 식도와 입을 다시 지나가며 2차 화상을 일으킵니다. 세제·산·알칼리성 물질은 특히 위험해요.",
          isCorrect: false,
        },
        {
          id: "fa-13-c",
          text: "우유를 마시게 해서 희석한다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "일부 독극물은 우유와 반응해 악화될 수 있습니다. 구토 유도도 하지 말고, 119 신고 후 의사 지시에 따르세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-14",
      areaId: "firstaid-safety",
      subAreaId: "emergency",
      order: 14,
      title: "동물 물림과 뱀 물림",
      body: "등산 중에 친구가 뱀에 물렸습니다. 다리에 뱀 이빨 자국이 두 개 보입니다. 어떻게 해야 할까요?",
      image: "/images/situations/area7/s04.png",
      choices: [
        {
          id: "fa-14-a",
          text: "119에 신고하고, 물린 부위를 움직이지 않게 하고, 부위를 심장보다 낮게 두며 병원으로 간다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정답입니다! 뱀 물림 시 절대 지혈대를 사용하지 않습니다. 물린 부위를 움직이지 않게 하고 심장보다 낮게 두세요. 뱀을 찍어두면 좋지만, 사람 안전이 우선입니다. 119 신고가 필수예요.",
          isCorrect: true,
        },
        {
          id: "fa-14-b",
          text: "상처를 빨아서 독을 뽑아낸다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "입으로 빨면 독이 뽑히지 않고, 구강 상처가 있으면 구한 사람도 중독될 수 있어요. 흡입기는 효과가 없습니다. 119 신고가 최선입니다.",
          isCorrect: false,
        },
        {
          id: "fa-14-c",
          text: "물린 부위 위에 지혈대를 조인다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "뱀 독은 지혈대로 막을 수 없고, 오히려 국소 부위에 독이 집중되어 조직 괴사를 일으킬 수 있어요. 지혈대 사용은 금지입니다.",
          isCorrect: false,
        },
      ],
    },
    // ────────── 자동심장충격기 (6개) ──────────
    {
      id: "fa-15",
      areaId: "firstaid-safety",
      subAreaId: "aed",
      order: 15,
      title: "AED 위치 확인 습관",
      body: "학교, 공공장소, 지하철역 등에서 AED가 어디에 있는지 평소에 알고 있나요? AED 위치를 아는 것이 왜 중요한가요?",
      image: "/images/situations/area7/s05.png",
      choices: [
        {
          id: "fa-15-a",
          text: "심정지 시 1분마다 생존율이 7~10%씩 떨어지므로, AED 위치를 미리 알아두면 빠르게 가져올 수 있다",
          lifeDelta: 0,
          mentalDelta: 8,
          feedback:
            "정답입니다! 심정지 발생 후 AED 사용이 1분 늦어질수록 생존율이 7~10% 감소합니다. 119 신고와 CPR을 시작하면서 동시에 주변 사람에게 AED를 가져오라고 요청하세요. 평소 위치를 알아두면 좋아요.",
          isCorrect: true,
        },
        {
          id: "fa-15-b",
          text: "119가 오면 AED를 가지고 오니까 굳이 알 필요 없다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "구급차 도착까지 평균 7~8분 걸립니다. 그동안 심장은 피를 뿜지 못하고, 뇌는 산소 부족으로 손상됩니다. 주변 AED를 즉시 사용하는 것이 생명을 구하는 핵심이에요.",
          isCorrect: false,
        },
        {
          id: "fa-15-c",
          text: "AED는 의료인만 사용할 수 있다",
          lifeDelta: -5,
          mentalDelta: -3,
          feedback:
            "AED는 일반인도 사용할 수 있습니다! 음성 안내가 따라가기만 하면 됩니다. 사용법을 몰라도 전원을 켜면 단계별로 안내해요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-16",
      areaId: "firstaid-safety",
      subAreaId: "aed",
      order: 16,
      title: "AED 패드 부착 위치",
      body: "AED 패드를 부착할 때 올바른 위치는 어디인가요?",
      image: "/images/situations/area7/s01.png",
      choices: [
        {
          id: "fa-16-a",
          text: "한 패드는 오른쪽 쇄골 아래, 다른 패드는 왼쪽 겨드랑이 아래 왼쪽 가슴에 부착한다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "정확합니다! 한 패드는 오른쪽 쇄골 아래 흉골 옆, 다른 패드는 왼쪽 겨드랑이 아래(심장 위)에 부착합니다. 패드 그림이 그려져 있어 위치를 따라 부착하면 됩니다. 심장을 사이에 두도록 해요.",
          isCorrect: true,
        },
        {
          id: "fa-16-b",
          text: "두 패드를 모두 심장 위 가슴에 붙인다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "두 패드를 가까이 붙이면 전류가 심장 전체를 지나가지 못합니다. 한 패드는 오른쪽 위, 다른 패드는 왼쪽 아래로 심장을 사이에 두어야 해요.",
          isCorrect: false,
        },
        {
          id: "fa-16-c",
          text: "등과 가슴에 붙인다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "AED 패드는 가슴 앞쪽에 부착합니다. 패드 그림과 설명을 따라 오른쪽 쇄골 아래, 왼쪽 겨드랑이 아래에 붙이세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-17",
      areaId: "firstaid-safety",
      subAreaId: "aed",
      order: 17,
      title: "AED 음성 지시 따르기",
      body: "AED 전원을 켰고 패드를 부착했습니다. AED가 \"심장 분석 중\"이라고 말합니다. 이때 무엇을 해야 할까요?",
      image: "/images/situations/area7/s02.png",
      choices: [
        {
          id: "fa-17-a",
          text: "환자에게 손대지 말고, 주변 사람도 환자에서 떨어지게 한 뒤 분석이 끝날 때까지 기다린다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정답입니다! AED가 심장을 분석할 때는 전류가 흐르지 않도록 환자와 접촉하면 안 됩니다. \"손대지 마세요\"라고 주변에 알리고, 충격 후에는 즉시 CPR을 재개하세요.",
          isCorrect: true,
        },
        {
          id: "fa-17-b",
          text: "분석 중에도 CPR을 계속한다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "AED 분석 중에는 환자에게 손대면 안 됩니다! 전류가 잘못 통할 수 있고, 분석이 부정확해질 수 있어요. \"손대지 마세요\"라고 할 때까지 기다리세요.",
          isCorrect: false,
        },
        {
          id: "fa-17-c",
          text: "충격이 필요 없다고 하면 AED를 끄고 CPR만 한다",
          lifeDelta: -5,
          mentalDelta: -3,
          feedback:
            "충격이 필요 없다고 하면 CPR을 즉시 재개하세요. AED는 끄지 말고 그대로 두세요. 2분마다 AED가 다시 분석하고, 필요 시 충격을 권할 수 있어요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-18",
      areaId: "firstaid-safety",
      subAreaId: "aed",
      order: 18,
      title: "전기 충격 시 주의사항",
      body: "AED가 \"충격을 가합니다. 손대지 마세요\"라고 말합니다. 충격 전후로 무엇을 주의해야 할까요?",
      image: "/images/situations/area7/s03.png",
      choices: [
        {
          id: "fa-18-a",
          text: "충격 전 모든 사람이 환자에서 손을 뗀 뒤, 충격 후 즉시 CPR을 재개한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 충격 시 환자에 닿으면 구급자도 감전될 수 있어요. \"손대지 마세요\" 확인 후 충격 후에는 즉시 가슴 압박 30회부터 CPR을 재개하세요.",
          isCorrect: true,
        },
        {
          id: "fa-18-b",
          text: "환자에게 손을 대고 있으면 효과가 좋아진다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "절대 안 됩니다! 충격 시 환자에 닿으면 구급자도 감전됩니다. 반드시 모든 사람이 환자에서 떨어져 있어야 해요.",
          isCorrect: false,
        },
        {
          id: "fa-18-c",
          text: "충격 후 잠시 기다렸다가 의식이 돌아오는지 확인한다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "충격 후 잠깐 기다리지 말고 즉시 CPR을 재개해야 합니다. CPR을 멈추는 동안 뇌에 산소가 공급되지 않아요. 30회 압박 후 인공호흡 2회를 반복하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-19",
      areaId: "firstaid-safety",
      subAreaId: "aed",
      order: 19,
      title: "AED 특수 상황: 물과 금속",
      body: "비가 오는 날, 물웅덩이 옆에 쓰러진 사람이 있습니다. 가슴이 젖어 있습니다. AED를 사용할 수 있을까요?",
      image: "/images/situations/area7/s04.png",
      choices: [
        {
          id: "fa-19-a",
          text: "환자를 마른 곳으로 옮기고, 가슴을 수건으로 닦아 말린 뒤 패드를 부착한다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "정답입니다! 물이나 땀에 젖어 있으면 전류가 제대로 전달되지 않거나 옆으로 새어갈 수 있어요. 가슴을 닦아 말리고, 금속 악세서리(목걸이, 브라 등)도 제거한 뒤 패드를 부착하세요.",
          isCorrect: true,
        },
        {
          id: "fa-19-b",
          text: "젖은 채로 그대로 패드를 부착한다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "젖은 가슴에 패드를 부착하면 전류가 잘못 통할 수 있고, AED 효과가 떨어질 수 있어요. 반드시 가슴을 닦아 말린 뒤 부착하세요.",
          isCorrect: false,
        },
        {
          id: "fa-19-c",
          text: "물이 있으면 AED를 사용할 수 없어서 CPR만 한다",
          lifeDelta: -5,
          mentalDelta: -3,
          feedback:
            "가슴을 말리면 AED 사용이 가능합니다! 1~2분 정도면 닦을 수 있어요. AED는 심정지 시 가장 효과적인 도구이므로, 가능하면 반드시 사용하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "fa-20",
      areaId: "firstaid-safety",
      subAreaId: "aed",
      order: 20,
      title: "구급대 도착까지 CPR 지속",
      body: "CPR과 AED를 사용하고 있습니다. 119 구급대가 아직 도착하지 않았습니다. 어떻게 해야 할까요?",
      image: "/images/situations/area7/s05.png",
      choices: [
        {
          id: "fa-20-a",
          text: "구급대가 도착할 때까지 CPR과 AED를 계속하고, 지치면 주변 사람과 교대한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정답입니다! 구급대 도착까지 CPR을 멈추지 마세요. 2분마다 AED가 재분석하고, 필요 시 충격을 권합니다. 지치면 '가슴 압박 해주실 분!'이라고 불러 교대하세요. CPR 중단 시간이 생존율에 큰 영향을 줍니다.",
          isCorrect: true,
        },
        {
          id: "fa-20-b",
          text: "5분 정도 CPR 했으면 충분하다고 생각하고 멈춘다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "CPR은 구급대가 도착할 때까지, 또는 환자가 움직이거나 정상 호흡을 할 때까지 계속해야 합니다. 5분으로는 부족해요. 5분 이상 CPR으로 생존한 사례가 많습니다.",
          isCorrect: false,
        },
        {
          id: "fa-20-c",
          text: "AED 사용 후 CPR은 필요 없다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "AED 충격 후에도 CPR이 필수입니다! 충격은 심장을 다시 뛰게 하려는 시도일 뿐, 실제로는 CPR이 심장에 피를 보내는 핵심이에요. 충격 후 즉시 CPR을 재개하세요.",
          isCorrect: false,
        },
      ],
    },
  ],
};
