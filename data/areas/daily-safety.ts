import { Area } from "@/types/game";

export const dailySafety: Area = {
  id: "daily-safety",
  title: "생활안전",
  icon: "🏠",
  order: 1,
  description:
    "일상 속 시설물, 화재, 전기·가스 안전 상황에서 올바른 판단을 내려보세요.",
  coverImage: "/images/situations/area1/cover.png",
  color: "#3b82f6",
  subAreas: [
    {
      id: "facility",
      title: "시설안전",
      description: "놀이공원, 학교, 건물 등 시설물 이용 시 안전 수칙",
    },
    {
      id: "fire",
      title: "화재안전",
      description: "화재 예방과 발생 시 대처 방법",
    },
    {
      id: "electric-gas",
      title: "전기·가스안전",
      description: "전기 감전 예방과 가스 누출 대처법",
    },
  ],
  situations: [
    // ────────────── 시설안전 (7개) ──────────────
    {
      id: "ds-01",
      areaId: "daily-safety",
      subAreaId: "facility",
      order: 1,
      title: "놀이공원 롤러코스터",
      body: "친구들과 놀이공원에 왔습니다. 기대하던 롤러코스터에 탑승했는데, 안전바를 내렸을 때 뭔가 헐거운 느낌이 듭니다. 옆 친구는 \"빨리 출발해!\"라며 신나 있습니다.",
      image: "/images/situations/area1/s01.png",
      choices: [
        {
          id: "ds-01-a",
          text: "직원에게 손을 들어 안전바를 다시 확인해달라고 요청한다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "정확한 판단입니다! 놀이기구 탑승 전 안전장치가 제대로 작동하는지 반드시 확인해야 합니다. 조금 기다리더라도 안전이 최우선이에요.",
          isCorrect: true,
        },
        {
          id: "ds-01-b",
          text: "별거 아니겠지, 그냥 탄다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "위험한 선택이에요! 안전바가 헐거운 상태로 탑승하면 급커브나 급하강 구간에서 몸이 튕겨나갈 수 있습니다. 반드시 직원에게 확인을 요청하세요.",
          isCorrect: false,
        },
        {
          id: "ds-01-c",
          text: "무섭기도 하니 이 놀이기구는 포기하고 다른 것을 탄다",
          lifeDelta: 0,
          mentalDelta: 0,
          feedback:
            "안전한 선택이지만, 직원에게 알려야 다음 탑승자도 안전합니다. 이상을 발견하면 반드시 보고하는 습관을 기르세요!",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-02",
      areaId: "daily-safety",
      subAreaId: "facility",
      order: 2,
      title: "쇼핑몰 에스컬레이터",
      body: "쇼핑몰에서 에스컬레이터를 타고 올라가는 중입니다. 갑자기 친구가 에스컬레이터 위에서 뛰어다니며 장난을 칩니다. 주변 사람들이 불안한 표정을 짓고 있습니다.",
      image: "/images/situations/area1/s02.png",
      choices: [
        {
          id: "ds-02-a",
          text: "\"위험해! 손잡이 잡고 가만히 서 있어.\"라고 친구를 말린다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "훌륭합니다! 에스컬레이터에서는 손잡이를 잡고 가만히 서 있어야 합니다. 뛰어다니면 넘어지거나 옷·신발이 끼일 수 있어요.",
          isCorrect: true,
        },
        {
          id: "ds-02-b",
          text: "같이 장난치며 올라간다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "에스컬레이터에서 뛰면 옷이나 신발끈이 틈새에 끼이거나 넘어져 큰 부상을 입을 수 있습니다. 특히 많은 사람이 타고 있을 때 연쇄 사고 위험이 있어요.",
          isCorrect: false,
        },
        {
          id: "ds-02-c",
          text: "무시하고 혼자 조심히 올라간다",
          lifeDelta: 0,
          mentalDelta: -3,
          feedback:
            "본인은 안전하지만, 친구가 다칠 수 있어요. 위험한 행동을 하는 친구를 말려주는 것도 중요한 안전 행동입니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-03",
      areaId: "daily-safety",
      subAreaId: "facility",
      order: 3,
      title: "학교 체육관 낡은 농구대",
      body: "체육 시간에 농구를 하고 있습니다. 슛을 넣으려는 순간, 농구대 기둥이 녹슬어 흔들리는 것이 눈에 들어옵니다. 당장은 괜찮아 보이지만 걱정이 됩니다.",
      image: "/images/situations/area1/s01.png",
      choices: [
        {
          id: "ds-03-a",
          text: "즉시 운동을 멈추고 선생님께 보고한다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "최선의 판단입니다! 노후 시설물은 언제 무너질지 모릅니다. 발견 즉시 어른이나 관리자에게 알려야 사고를 예방할 수 있어요.",
          isCorrect: true,
        },
        {
          id: "ds-03-b",
          text: "괜찮겠지 하고 계속 운동한다",
          lifeDelta: -10,
          mentalDelta: 0,
          feedback:
            "위험합니다! 녹슨 농구대는 충격에 의해 갑자기 쓰러질 수 있습니다. 실제로 노후 체육시설 사고가 매년 발생하고 있어요.",
          isCorrect: false,
        },
        {
          id: "ds-03-c",
          text: "친구들에게만 조심하라고 말한다",
          lifeDelta: 0,
          mentalDelta: 2,
          feedback:
            "친구들에게 알린 것은 좋지만, 선생님이나 관리자에게 정식으로 보고해야 근본적인 조치가 이루어집니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-04",
      areaId: "daily-safety",
      subAreaId: "facility",
      order: 4,
      title: "건물 옥상 출입금지",
      body: "점심시간, 학교 옥상으로 올라가는 문이 열려 있습니다. 친구가 \"야, 올라가서 경치 보면서 밥 먹자!\"라고 합니다. 옥상에는 '출입금지' 팻말이 붙어 있습니다.",
      image: "/images/situations/area1/s02.png",
      choices: [
        {
          id: "ds-04-a",
          text: "\"출입금지야. 위험하니까 안 돼.\"라며 거절한다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "올바른 판단입니다! 출입금지 구역은 안전이 확보되지 않은 장소입니다. 옥상은 추락 위험이 있어 절대 허가 없이 올라가면 안 됩니다.",
          isCorrect: true,
        },
        {
          id: "ds-04-b",
          text: "잠깐만 올라갔다 오자고 따라간다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "매우 위험한 선택입니다! 학교 옥상 추락 사고는 실제로 빈번하게 발생합니다. 출입금지 표시를 무시하면 안 됩니다.",
          isCorrect: false,
        },
        {
          id: "ds-04-c",
          text: "선생님께 옥상 문이 열려 있다고 알린다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "훌륭합니다! 출입금지 구역의 문이 열려 있으면 관리자에게 알려야 합니다. 다른 학생들의 안전까지 생각하는 훌륭한 판단이에요.",
          isCorrect: true,
        },
      ],
    },
    {
      id: "ds-05",
      areaId: "daily-safety",
      subAreaId: "facility",
      order: 5,
      title: "워터파크 수영장",
      body: "무더운 여름, 친구들과 워터파크에 왔습니다. 모두 빨리 물에 들어가고 싶어 안달이 나 있습니다. 점심을 먹은 지 20분밖에 안 됐습니다.",
      image: "/images/situations/area1/s03.png",
      choices: [
        {
          id: "ds-05-a",
          text: "준비운동을 먼저 충분히 하고, 음식 소화 후 물에 들어간다",
          lifeDelta: 5,
          mentalDelta: 5,
          feedback:
            "완벽한 선택입니다! 수영 전 준비운동은 근육경련을 예방하고, 식후 30분~1시간 후에 입수해야 소화불량과 구토를 방지할 수 있습니다.",
          isCorrect: true,
        },
        {
          id: "ds-05-b",
          text: "바로 풀장에 뛰어든다",
          lifeDelta: -15,
          mentalDelta: 0,
          feedback:
            "위험합니다! 준비운동 없이 갑자기 물에 들어가면 근육경련(쥐)이 올 수 있고, 식후 바로 수영하면 구토와 의식 저하 위험이 있습니다.",
          isCorrect: false,
        },
        {
          id: "ds-05-c",
          text: "발만 담그고 천천히 들어간다",
          lifeDelta: 0,
          mentalDelta: 2,
          feedback:
            "나쁘지 않지만, 식후 충분한 시간을 두고 준비운동까지 한 뒤 입수하는 것이 가장 안전합니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-06",
      areaId: "daily-safety",
      subAreaId: "facility",
      order: 6,
      title: "엘리베이터 고장",
      body: "아파트 엘리베이터를 타고 15층으로 올라가는 중, 갑자기 '쿵' 소리와 함께 엘리베이터가 멈췄습니다. 전등이 깜빡이고, 혼자 갇힌 상황입니다.",
      image: "/images/situations/area1/s03.png",
      choices: [
        {
          id: "ds-06-a",
          text: "비상벨을 누르고, 119에 전화해서 침착하게 구조를 기다린다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "정확한 대처입니다! 엘리베이터에 갇히면 비상벨을 누르고 119에 신고한 뒤, 문을 억지로 열지 말고 침착하게 구조를 기다려야 합니다.",
          isCorrect: true,
        },
        {
          id: "ds-06-b",
          text: "문을 억지로 열어보려고 시도한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "절대 하면 안 됩니다! 엘리베이터 문을 억지로 열면 추락하거나 끼일 위험이 큽니다. 전문 구조대가 올 때까지 기다려야 해요.",
          isCorrect: false,
        },
        {
          id: "ds-06-c",
          text: "패닉에 빠져 소리를 지르며 뛴다",
          lifeDelta: 0,
          mentalDelta: -15,
          feedback:
            "엘리베이터 안에서 뛰면 흔들림이 커져 더 위험해질 수 있습니다. 심호흡을 하고 침착하게 비상벨과 119 신고를 하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-07",
      areaId: "daily-safety",
      subAreaId: "facility",
      order: 7,
      title: "공사현장 근처",
      body: "등하교길, 큰 건물 공사현장이 있습니다. 가림막 펜스에 구멍이 뚫려 있어서 통과하면 5분이나 지름길입니다. 이미 몇몇 사람이 그 길을 이용하고 있습니다.",
      image: "/images/situations/area1/s04.png",
      choices: [
        {
          id: "ds-07-a",
          text: "시간이 좀 더 걸리더라도 안전한 우회도로로 간다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "현명한 선택입니다! 공사현장에는 낙하물, 중장비, 구덩이 등 수많은 위험이 있습니다. 5분의 시간 절약이 큰 사고로 이어질 수 있어요.",
          isCorrect: true,
        },
        {
          id: "ds-07-b",
          text: "다른 사람도 다니니까 펜스 구멍으로 지름길을 이용한다",
          lifeDelta: -20,
          mentalDelta: -5,
          feedback:
            "매우 위험합니다! 공사현장은 안전모 없이 출입이 금지된 곳입니다. 낙하물에 맞거나 구멍에 빠질 수 있어 절대 들어가면 안 됩니다.",
          isCorrect: false,
        },
        {
          id: "ds-07-c",
          text: "공사현장 사무실에 펜스가 파손되었다고 알린다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "최고의 선택입니다! 우회도로를 이용하면서 관리자에게도 알리면 다른 보행자의 안전까지 지킬 수 있습니다.",
          isCorrect: true,
        },
      ],
    },

    // ────────────── 화재안전 (7개) ──────────────
    {
      id: "ds-08",
      areaId: "daily-safety",
      subAreaId: "fire",
      order: 8,
      title: "화재경보기 배터리",
      body: "밤중에 집 거실 화재경보기에서 '삐... 삐...' 소리가 납니다. 30초마다 한 번씩 울리는 것을 보니 배터리 부족 신호인 것 같습니다. 잠이 올 수가 없습니다.",
      image: "/images/situations/area1/s04.png",
      choices: [
        {
          id: "ds-08-a",
          text: "부모님께 말씀드리고 다음 날 바로 배터리를 교체한다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "좋은 판단입니다! 화재경보기는 생명을 지키는 장비입니다. 배터리 경고음이 울리면 가능한 빨리 교체해야 합니다.",
          isCorrect: true,
        },
        {
          id: "ds-08-b",
          text: "시끄러워서 경보기를 떼어버린다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "위험합니다! 화재경보기를 제거하면 실제 화재 시 경고를 받지 못해 대피 시간을 놓칠 수 있습니다. 경보기는 절대 떼면 안 됩니다.",
          isCorrect: false,
        },
        {
          id: "ds-08-c",
          text: "나중에 하면 되지 하고 무시한다",
          lifeDelta: -5,
          mentalDelta: -3,
          feedback:
            "배터리가 완전히 방전되면 경보기가 작동하지 않습니다. '나중에'가 너무 늦을 수 있어요. 빠른 교체가 중요합니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-09",
      areaId: "daily-safety",
      subAreaId: "fire",
      order: 9,
      title: "기름 화재 발생!",
      body: "집에서 혼자 라면을 끓이던 중, 옆에 놓아둔 프라이팬의 기름에서 갑자기 불이 붙었습니다! 불꽃이 높이 올라오고 있습니다. 어떻게 해야 할까요?",
      image: "/images/situations/area1/s05.png",
      choices: [
        {
          id: "ds-09-a",
          text: "침착하게 프라이팬 뚜껑을 덮어 산소를 차단한다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 기름 화재는 물을 절대 부으면 안 됩니다. 뚜껑이나 젖은 행주로 덮어 산소를 차단하는 것이 정답입니다.",
          isCorrect: true,
        },
        {
          id: "ds-09-b",
          text: "물을 끼얹어서 불을 끈다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "절대 금물! 기름 화재에 물을 부으면 기름이 튀면서 폭발적으로 불이 커집니다. 이것은 매우 위험한 대처 방법이에요.",
          isCorrect: false,
        },
        {
          id: "ds-09-c",
          text: "당황해서 부엌에서 도망간다",
          lifeDelta: -5,
          mentalDelta: -15,
          feedback:
            "대피는 중요하지만, 초기에 불을 잡을 수 있는 상황이었습니다. 뚜껑을 덮는 간단한 조치로 큰 화재를 막을 수 있어요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-10",
      areaId: "daily-safety",
      subAreaId: "fire",
      order: 10,
      title: "학교 화재 대피",
      body: "수업 중 갑자기 화재 경보가 울렸습니다. 창밖을 보니 1층 과학실 쪽에서 연기가 피어오르고 있습니다. 복도에도 서서히 연기가 차오르기 시작합니다.",
      image: "/images/situations/area1/s05.png",
      choices: [
        {
          id: "ds-10-a",
          text: "젖은 수건으로 코와 입을 막고, 낮은 자세로 비상구를 통해 대피한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "최고의 대처입니다! 연기는 위로 올라가므로 낮은 자세가 안전합니다. 젖은 수건으로 호흡기를 보호하며 비상구로 대피하세요.",
          isCorrect: true,
        },
        {
          id: "ds-10-b",
          text: "빨리 내려가야 하니 엘리베이터를 탄다",
          lifeDelta: -25,
          mentalDelta: -5,
          feedback:
            "화재 시 엘리베이터는 절대 사용하면 안 됩니다! 정전으로 갇히거나 엘리베이터 통로로 연기가 유입돼 질식할 수 있습니다.",
          isCorrect: false,
        },
        {
          id: "ds-10-c",
          text: "교실에 남아서 창문을 열고 구조를 기다린다",
          lifeDelta: -5,
          mentalDelta: 0,
          feedback:
            "대피가 가능한 상황이라면 즉시 대피하는 것이 우선입니다. 대피로가 막힌 경우에만 창문으로 구조를 요청하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-11",
      areaId: "daily-safety",
      subAreaId: "fire",
      order: 11,
      title: "소화기 사용",
      body: "복도의 쓰레기통에서 작은 불이 났습니다. 아직 초기 단계이고, 바로 옆 벽에 소화기가 비치되어 있습니다. 이 불을 직접 진화할 수 있을 것 같습니다.",
      image: "/images/situations/area1/s04.png",
      choices: [
        {
          id: "ds-11-a",
          text: "안전핀을 뽑고, 호스를 불 쪽으로 향한 뒤 손잡이를 눌러 분사한다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "정확합니다! 소화기 사용법 '당·뽑·잡·쏴'를 기억하세요: 당기고(안전핀), 뽑고(호스), 잡고(손잡이), 쏴!(분사). 바람을 등지고 사용하세요.",
          isCorrect: true,
        },
        {
          id: "ds-11-b",
          text: "소화기 사용법을 모르니 그냥 도망간다",
          lifeDelta: -5,
          mentalDelta: -10,
          feedback:
            "대피는 중요하지만, 소화기 사용법을 미리 알아두면 초기 화재를 진압할 수 있습니다. '당·뽑·잡·쏴'를 꼭 기억하세요!",
          isCorrect: false,
        },
        {
          id: "ds-11-c",
          text: "발로 밟아서 끄려고 한다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "불에 직접 접촉하면 화상을 입을 수 있습니다. 소화기를 사용하거나 모래·물(기름 화재 제외)로 진화해야 합니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-12",
      areaId: "daily-safety",
      subAreaId: "fire",
      order: 12,
      title: "영화관 비상구",
      body: "친구와 영화를 보러 대형 멀티플렉스에 왔습니다. 상영관 안이 어둡고, 자리가 중앙 쪽이라 출구가 멀어 보입니다. 영화 시작 전 5분이 남았습니다.",
      image: "/images/situations/area1/s03.png",
      choices: [
        {
          id: "ds-12-a",
          text: "영화 시작 전 비상구 위치와 방향을 확인해둔다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "훌륭합니다! 다중이용시설에 들어가면 먼저 비상구 위치를 확인하는 습관이 중요합니다. 비상 시 어둠 속에서도 대피할 수 있어요.",
          isCorrect: true,
        },
        {
          id: "ds-12-b",
          text: "폰만 보다가 영화가 시작되면 본다",
          lifeDelta: 0,
          mentalDelta: -2,
          feedback:
            "비상구 확인은 입장 시 반드시 해야 하는 습관입니다. 긴급 상황 시 대피 경로를 모르면 패닉에 빠질 수 있어요.",
          isCorrect: false,
        },
        {
          id: "ds-12-c",
          text: "출입구 근처로 자리를 옮긴다",
          lifeDelta: 0,
          mentalDelta: 3,
          feedback:
            "나쁘지 않은 선택이지만, 어디에 앉든 비상구 위치를 아는 것이 가장 중요합니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-13",
      areaId: "daily-safety",
      subAreaId: "fire",
      order: 13,
      title: "전열기구 관리",
      body: "급하게 외출해야 합니다. 현관에서 신발을 신는데, 방에 전기히터를 켜놓은 것이 갑자기 떠올랐습니다. 약속 시간에 이미 늦고 있습니다.",
      image: "/images/situations/area1/s04.png",
      choices: [
        {
          id: "ds-13-a",
          text: "다시 들어가서 히터를 끄고 콘센트까지 뽑는다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "올바른 판단입니다! 전열기구는 외출 시 반드시 끄고 콘센트를 빼야 합니다. 전기히터로 인한 화재는 매년 수백 건 발생합니다.",
          isCorrect: true,
        },
        {
          id: "ds-13-b",
          text: "금방 올 거니까 그냥 나간다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "매우 위험합니다! 전기히터 근처에 커튼이나 옷이 있으면 화재로 이어질 수 있습니다. '금방'이 화재를 막아주지 않아요.",
          isCorrect: false,
        },
        {
          id: "ds-13-c",
          text: "히터는 끄지만 콘센트는 꽂아둔다",
          lifeDelta: 0,
          mentalDelta: 2,
          feedback:
            "히터를 끈 것은 좋지만, 대기전력에 의한 발열 위험이 있으니 콘센트까지 빼는 것이 완벽한 안전 조치입니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-14",
      areaId: "daily-safety",
      subAreaId: "fire",
      order: 14,
      title: "연기 속 대피",
      body: "한밤중에 잠에서 깼습니다. 복도에서 매캐한 연기 냄새가 납니다. 문 아래로 연기가 스며들어오고 있습니다. 아래층에서 불이 난 것 같습니다.",
      image: "/images/situations/area1/s05.png",
      choices: [
        {
          id: "ds-14-a",
          text: "문손잡이 온도를 확인하고, 젖은 천으로 입을 막은 뒤 낮은 자세로 대피한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "완벽한 대처입니다! 문손잡이가 뜨겁지 않으면 밖으로 대피, 뜨거우면 문을 열지 말고 창문으로 구조요청하세요. 낮은 자세와 젖은 천은 필수입니다.",
          isCorrect: true,
        },
        {
          id: "ds-14-b",
          text: "바로 문을 열고 빨리 뛰어나간다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "문 반대편이 화염일 수 있습니다! 반드시 문손잡이 온도를 먼저 확인하세요. 그냥 열면 백드래프트(역류화염)가 발생할 수 있습니다.",
          isCorrect: false,
        },
        {
          id: "ds-14-c",
          text: "이불을 뒤집어쓰고 뛰어나간다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "마른 이불은 불에 쉽게 옮겨붙습니다. 젖은 수건이나 천으로 호흡기를 보호하고, 낮은 자세로 대피하는 것이 정답입니다.",
          isCorrect: false,
        },
      ],
    },

    // ────────────── 전기·가스안전 (6개) ──────────────
    {
      id: "ds-15",
      areaId: "daily-safety",
      subAreaId: "electric-gas",
      order: 15,
      title: "문어발 콘센트",
      body: "방에 충전할 기기가 너무 많습니다. 스마트폰, 태블릿, 노트북, 게임기, 선풍기... 멀티탭에 또 멀티탭을 연결하면 모두 충전할 수 있을 것 같습니다.",
      image: "/images/situations/area1/s03.png",
      choices: [
        {
          id: "ds-15-a",
          text: "과부하 위험이 있으니 다른 벽면 콘센트를 찾아 분산시킨다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "정확합니다! 멀티탭에 멀티탭을 연결(문어발 배선)하면 과전류로 화재가 발생할 수 있습니다. 콘센트를 분산 사용하세요.",
          isCorrect: true,
        },
        {
          id: "ds-15-b",
          text: "급하니까 일단 모두 꽂아서 쓴다",
          lifeDelta: -15,
          mentalDelta: -3,
          feedback:
            "문어발 배선은 전기 화재의 주요 원인입니다! 멀티탭의 정격 용량을 초과하면 과열로 인해 화재가 발생할 수 있어요.",
          isCorrect: false,
        },
        {
          id: "ds-15-c",
          text: "사용하지 않는 기기의 충전기를 먼저 빼고 정리한다",
          lifeDelta: 0,
          mentalDelta: 3,
          feedback:
            "좋은 접근입니다! 사용하지 않는 충전기를 빼는 것은 과부하 방지와 대기전력 절감에 도움이 됩니다.",
          isCorrect: true,
        },
      ],
    },
    {
      id: "ds-16",
      areaId: "daily-safety",
      subAreaId: "electric-gas",
      order: 16,
      title: "젖은 손과 전기기구",
      body: "목욕을 마치고 나왔습니다. 머리를 빨리 말려야 하는데, 손이 아직 물기로 젖어 있습니다. 드라이어 콘센트가 바로 앞에 있습니다.",
      image: "/images/situations/area1/s04.png",
      choices: [
        {
          id: "ds-16-a",
          text: "손을 수건으로 완전히 말린 후 드라이어를 사용한다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "정답입니다! 물은 전기를 잘 전도합니다. 젖은 손으로 전기기구나 콘센트를 만지면 감전 위험이 매우 높아요.",
          isCorrect: true,
        },
        {
          id: "ds-16-b",
          text: "빨리 말려야 하니 바로 콘센트에 꽂고 사용한다",
          lifeDelta: -20,
          mentalDelta: -5,
          feedback:
            "매우 위험합니다! 젖은 손으로 콘센트를 만지면 감전될 수 있습니다. 실제로 욕실 감전 사고가 많이 발생합니다.",
          isCorrect: false,
        },
        {
          id: "ds-16-c",
          text: "수건으로 대충 닦고 사용한다",
          lifeDelta: -5,
          mentalDelta: 0,
          feedback:
            "조금이라도 물기가 남아있으면 감전 위험이 있습니다. 손을 '완전히' 말리는 것이 중요합니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-17",
      areaId: "daily-safety",
      subAreaId: "electric-gas",
      order: 17,
      title: "집에서 가스 냄새!",
      body: "학원을 마치고 집에 돌아왔습니다. 현관문을 열자 가스 냄새가 확 밀려옵니다. 부엌 쪽에서 냄새가 나는 것 같습니다. 집 안이 어둡습니다.",
      image: "/images/situations/area1/s05.png",
      choices: [
        {
          id: "ds-17-a",
          text: "전등은 켜지 말고, 창문을 열어 환기한 뒤 밖에서 119에 신고한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "완벽한 대처입니다! 가스 누출 시 전등 스위치, 콘센트 등 전기기구를 절대 만지면 안 됩니다. 스파크로 폭발할 수 있어요. 환기 후 밖에서 신고하세요.",
          isCorrect: true,
        },
        {
          id: "ds-17-b",
          text: "어두우니까 전등을 먼저 켜서 상황을 확인한다",
          lifeDelta: -30,
          mentalDelta: -10,
          feedback:
            "절대 안 됩니다! 가스가 충만한 상태에서 전등 스위치를 올리면 스파크가 발생해 폭발할 수 있습니다. 이것은 가장 위험한 행동이에요.",
          isCorrect: false,
        },
        {
          id: "ds-17-c",
          text: "가스 밸브를 잠그고 창문을 열어 환기한다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "밸브를 잠그고 환기하는 것은 좋지만, 119 신고도 꼭 해야 합니다. 그리고 전기 스위치를 만지지 않도록 주의하세요!",
          isCorrect: true,
        },
      ],
    },
    {
      id: "ds-18",
      areaId: "daily-safety",
      subAreaId: "electric-gas",
      order: 18,
      title: "손상된 충전기 케이블",
      body: "스마트폰 충전기 케이블의 피복이 벗겨져서 내부 구리선이 보입니다. 아직 충전은 되긴 하는데... 새 케이블을 사기엔 귀찮습니다.",
      image: "/images/situations/area1/s03.png",
      choices: [
        {
          id: "ds-18-a",
          text: "바로 사용을 중단하고 새 충전기를 구입한다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "정확합니다! 피복이 벗겨진 전선은 감전과 합선(단락) 화재의 원인이 됩니다. 즉시 교체하세요.",
          isCorrect: true,
        },
        {
          id: "ds-18-b",
          text: "테이프를 감아서 계속 사용한다",
          lifeDelta: -10,
          mentalDelta: -3,
          feedback:
            "일반 테이프는 절연 효과가 부족하고 열에 의해 녹을 수 있습니다. 임시방편은 위험해요. 새 케이블로 교체하세요.",
          isCorrect: false,
        },
        {
          id: "ds-18-c",
          text: "조심해서 사용하면 괜찮겠지",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "\"조심해서\"는 안전을 보장하지 않습니다. 수면 중 충전하다 합선 화재가 발생하면 조심할 수도 없어요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-19",
      areaId: "daily-safety",
      subAreaId: "electric-gas",
      order: 19,
      title: "가스레인지 사용 후",
      body: "야식으로 볶음밥을 만들어 먹었습니다. 맛있게 먹고 설거지도 했습니다. 이제 방에 들어가 쉬려고 합니다. 그런데 뭔가 빠뜨린 것 같은 느낌이 듭니다.",
      image: "/images/situations/area1/s04.png",
      choices: [
        {
          id: "ds-19-a",
          text: "부엌으로 돌아가 가스레인지 밸브와 중간밸브를 확인하고 잠근다",
          lifeDelta: 0,
          mentalDelta: 5,
          feedback:
            "훌륭합니다! 가스 사용 후에는 점화 밸브뿐 아니라 중간밸브까지 확실히 잠가야 합니다. 이 습관 하나가 가스 사고를 예방합니다.",
          isCorrect: true,
        },
        {
          id: "ds-19-b",
          text: "불만 끈 것 같으니 괜찮겠지 하고 방에 간다",
          lifeDelta: -10,
          mentalDelta: -3,
          feedback:
            "점화 밸브만 끄면 미세하게 가스가 새어 나올 수 있습니다. 중간밸브까지 잠그는 것이 안전한 사용법입니다.",
          isCorrect: false,
        },
        {
          id: "ds-19-c",
          text: "피곤해서 그냥 잔다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "가스 밸브를 확인하지 않고 취침하면 수면 중 가스 누출로 질식이나 폭발 사고가 발생할 수 있습니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ds-20",
      areaId: "daily-safety",
      subAreaId: "electric-gas",
      order: 20,
      title: "친구가 감전되었다!",
      body: "과학 실험실에서 실습 중, 옆자리 친구가 전기 장비를 만지다 감전되어 쓰러졌습니다! 친구의 손이 아직 장비에 닿아 있고, 몸이 경직되어 있습니다.",
      image: "/images/situations/area1/s05.png",
      choices: [
        {
          id: "ds-20-a",
          text: "전원 스위치를 먼저 내려 전기를 차단한 후, 119에 신고한다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "정확한 대처입니다! 감전자를 구하려면 먼저 전원을 차단해야 합니다. 전원을 끄지 않고 만지면 구조자도 감전됩니다.",
          isCorrect: true,
        },
        {
          id: "ds-20-b",
          text: "바로 친구를 손으로 잡아 떼어낸다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "절대 안 됩니다! 감전 상태인 사람을 맨손으로 만지면 전류가 몸을 통해 흘러 본인도 감전됩니다. 반드시 전원 차단이 먼저입니다.",
          isCorrect: false,
        },
        {
          id: "ds-20-c",
          text: "당황해서 아무것도 못한다",
          lifeDelta: -5,
          mentalDelta: -15,
          feedback:
            "패닉 상태에서도 '전원 차단 → 119 신고'만 기억하세요. 평소에 응급 대처법을 반복 학습하면 실제 상황에서 몸이 먼저 움직입니다.",
          isCorrect: false,
        },
      ],
    },
  ],
};
