import { Area } from "@/types/game";

export const disasterSafety: Area = {
  id: "disaster-safety",
  title: "재난안전",
  icon: "🌊",
  order: 5,
  description:
    "지진, 태풍, 폭우 등 자연재난과 화학물질, 미세먼지 등 사회재난 대처법을 배워보세요.",
  coverImage: "/images/situations/area5/cover.png",
  color: "#f97316",
  subAreas: [
    {
      id: "natural-disaster",
      title: "자연재난",
      description: "지진, 태풍, 폭우, 폭설, 낙뢰, 폭염, 한파 대처",
    },
    {
      id: "social-disaster",
      title: "사회재난",
      description: "화학물질 유출, 미세먼지, 정전, 군중사고 대처",
    },
  ],
  situations: [
    // ────────────── 자연재난 (10개) ──────────────
    {
      id: "dis-01",
      areaId: "disaster-safety",
      subAreaId: "natural-disaster",
      order: 1,
      title: "지진 발생 (실내)",
      body: "집에서 TV를 보다가 갑자기 바닥이 흔들리기 시작했습니다. 서랍장이 넘어지고 유리창이 흔들립니다. 지진이 발생한 것 같습니다.",
      image: "/images/situations/area5/s01.png",
      choices: [
        {
          id: "dis-01-a",
          text: "책상이나 탁자 아래로 들어가 머리와 목을 손으로 보호한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 대처입니다! 지진 시 'DROP(엎드리기)-COVER(숨기기)-HOLD ON(붙잡기)' 원칙을 따르세요. 튼튼한 가구 아래로 들어가 낙하물로부터 머리를 보호하는 것이 생존률을 높입니다.",
          isCorrect: true,
        },
        {
          id: "dis-01-b",
          text: "바로 밖으로 뛰어나간다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "위험합니다! 지진 중 건물 밖으로 나가면 유리 파편, 낙하물, 전선 등에 맞을 수 있습니다. 흔들림이 멈출 때까지 실내에서 안전한 곳에 머물러야 합니다.",
          isCorrect: false,
        },
        {
          id: "dis-01-c",
          text: "엘리베이터를 타고 1층으로 내려간다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "절대 안 됩니다! 지진 시 엘리베이터는 정전으로 갇히거나 추락할 수 있습니다. 계단을 이용하되, 흔들림이 완전히 멈춘 후에 대피하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-02",
      areaId: "disaster-safety",
      subAreaId: "natural-disaster",
      order: 2,
      title: "지진 발생 (실외)",
      body: "길을 걷다가 갑자기 땅이 흔들리기 시작했습니다. 주변 건물들이 흔들리고 사람들이 비명을 지릅니다. 지진이 발생했습니다.",
      image: "/images/situations/area5/s02.png",
      choices: [
        {
          id: "dis-02-a",
          text: "건물에서 멀리 떨어진 넓은 공터로 이동해 앉아 머리를 보호한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "완벽한 대처입니다! 실외에서는 건물, 가로등, 유리창에서 멀리 떨어진 넓은 공터로 이동하세요. 낙하물과 유리 파편을 피하는 것이 핵심입니다.",
          isCorrect: true,
        },
        {
          id: "dis-02-b",
          text: "가장 가까운 건물 안으로 들어간다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "위험합니다! 지진 중 건물 안은 낙하물과 붕괴 위험이 있습니다. 실외에 있다면 건물에서 멀리 떨어진 열린 공간이 더 안전합니다.",
          isCorrect: false,
        },
        {
          id: "dis-02-c",
          text: "차량 안으로 들어가 대기한다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "차량은 지진 시 낙하물에 쉽게 손상되고 갇힐 수 있습니다. 차에서 내려 넓은 공터로 이동하는 것이 안전합니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-03",
      areaId: "disaster-safety",
      subAreaId: "natural-disaster",
      order: 3,
      title: "태풍 대비",
      body: "태풍이 24시간 후 우리 지역을 강타할 예정입니다. 뉴스에서 비상용품을 준비하라고 합니다. 집에 비상용품이 거의 없습니다.",
      image: "/images/situations/area5/s03.png",
      choices: [
        {
          id: "dis-03-a",
          text: "비상용품(물, 통조림, 손전등, 건전지, 의약품)을 준비하고 창문을 테이프로 보강한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "훌륭한 대비입니다! 태풍 전 비상용품과 3일치 식수를 준비하고, 유리창에 테이프를 X자로 붙이면 파손 시 파편이 흩어지는 것을 줄일 수 있습니다.",
          isCorrect: true,
        },
        {
          id: "dis-03-b",
          text: "태풍은 자주 오니까 그냥 지나가길 기다린다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "태풍은 예측 가능한 재난입니다. 준비 없이 맞이하면 정전·침수 시 식수와 식량 부족으로 어려움을 겪을 수 있어요. 반드시 비상용품을 준비하세요.",
          isCorrect: false,
        },
        {
          id: "dis-03-c",
          text: "바다나 강가에 가서 태풍 전 풍경을 구경한다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "매우 위험합니다! 태풍 전 해안가와 하천은 해일과 폭우로 갑자기 침수될 수 있습니다. 반드시 안전한 실내에 머물러야 합니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-04",
      areaId: "disaster-safety",
      subAreaId: "natural-disaster",
      order: 4,
      title: "폭우/침수",
      body: "갑자기 폭우가 쏟아지고, 지하철역 계단으로 물이 쏟아져 들어오기 시작합니다. 수위가 빠르게 올라가고 있습니다.",
      image: "/images/situations/area5/s04.png",
      choices: [
        {
          id: "dis-04-a",
          text: "지하보다 높은 층이나 지상으로 대피한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 판단입니다! 침수 시 지하는 순식간에 물에 잠깁니다. 지하철·지하상가에서는 즉시 지상으로 대피해야 합니다. 엘리베이터는 사용하지 마세요.",
          isCorrect: true,
        },
        {
          id: "dis-04-b",
          text: "물이 들어오는 것을 막으려고 입구에 서 있다",
          lifeDelta: -20,
          mentalDelta: -5,
          feedback:
            "위험합니다! 침수는 매우 빠르게 진행됩니다. 막으려다가 갑자기 물에 휩쓸릴 수 있어요. 즉시 높은 곳으로 대피하세요.",
          isCorrect: false,
        },
        {
          id: "dis-04-c",
          text: "지하철이 오면 타고 다음 역으로 이동한다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "절대 안 됩니다! 침수 시 지하철은 정전되거나 터널이 물에 잠길 수 있습니다. 실제 침수 사고에서 많은 희생이 발생했습니다. 지상으로 대피하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-05",
      areaId: "disaster-safety",
      subAreaId: "natural-disaster",
      order: 5,
      title: "폭설/빙판길",
      body: "폭설이 내린 다음 날, 등하교길이 눈과 얼음으로 미끄럽습니다. 앞으로 가는 사람이 넘어지는 것을 봤습니다.",
      image: "/images/situations/area5/s05.png",
      choices: [
        {
          id: "dis-05-a",
          text: "짧은 걸음으로 천천히 걷고, 가능하면 눈이 덜 쌓인 곳을 선택한다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "안전한 보행법입니다! 빙판길에서는 걸음을 짧게 하고, 무거운 가방은 한쪽만 메지 말고 양쪽으로 나눠 메세요. 미끄러운 구간은 피해 다니는 것이 좋습니다.",
          isCorrect: true,
        },
        {
          id: "dis-05-b",
          text: "빨리 가려고 뛰어서 지나간다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "위험합니다! 빙판에서 뛰면 넘어져 골절이나 뇌진탕을 입을 수 있습니다. 특히 손을 주머니에 넣고 다니면 넘어질 때 머리를 보호할 수 없어요.",
          isCorrect: false,
        },
        {
          id: "dis-05-c",
          text: "눈이 많이 쌓인 곳을 밟으며 걸어간다",
          lifeDelta: -10,
          mentalDelta: -3,
          feedback:
            "눈이 많이 쌓인 곳은 그 아래에 빙판이 숨어 있을 수 있습니다. 눈이 제거된 포장도로나 덜 미끄러운 길을 선택하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-06",
      areaId: "disaster-safety",
      subAreaId: "natural-disaster",
      order: 6,
      title: "낙뢰",
      body: "공원에서 운동하다가 갑자기 하늘이 어두워지고 천둥소리가 들립니다. 비가 오기 시작했고, 주변에 나무와 넓은 운동장이 있습니다.",
      image: "/images/situations/area5/s01.png",
      choices: [
        {
          id: "dis-06-a",
          text: "즉시 실내나 자동차 안으로 대피한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 대처입니다! 천둥이 들리면 30초 이내에 실내나 차량 안으로 대피하세요. '천둥이 치면 실내로'가 낙뢰 생존의 핵심입니다.",
          isCorrect: true,
        },
        {
          id: "dis-06-b",
          text: "나무 아래로 들어가 비를 피한다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "매우 위험합니다! 나무는 낙뢰를 끌어당깁니다. 나무 아래는 낙뢰에 맞을 확률이 가장 높은 곳이에요. 반드시 실내로 대피하세요.",
          isCorrect: false,
        },
        {
          id: "dis-06-c",
          text: "넓은 운동장 한가운데에 서 있다",
          lifeDelta: -20,
          mentalDelta: -8,
          feedback:
            "위험합니다! 넓은 평지에서 가장 높은 사람이 낙뢰의 표적이 됩니다. 즉시 낮은 자세로 이동해 건물이나 차량으로 대피하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-07",
      areaId: "disaster-safety",
      subAreaId: "natural-disaster",
      order: 7,
      title: "폭염/열사병",
      body: "한낮에 야외 행사에 참가했습니다. 날씨가 매우 더워서 땀을 뻘뻘 흘리고 있습니다. 갑자기 어지럽고 구역질이 납니다.",
      image: "/images/situations/area5/s02.png",
      choices: [
        {
          id: "dis-07-a",
          text: "그늘로 이동해 물을 마시고, 옷을 풀어 시원하게 한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "올바른 대처입니다! 열사병 의심 시 즉시 그늘로 이동하고, 시원한 물을 마시며 옷을 느슨하게 하세요. 의식이 흐려지면 119를 부르세요.",
          isCorrect: true,
        },
        {
          id: "dis-07-b",
          text: "참고 버티며 행사를 계속한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "위험합니다! 열사병은 생명을 위협할 수 있습니다. 어지러움과 구역질은 열사병 초기 증상이에요. 즉시 그늘로 이동하고 수분을 보충하세요.",
          isCorrect: false,
        },
        {
          id: "dis-07-c",
          text: "얼음물을 한꺼번에 많이 마신다",
          lifeDelta: -5,
          mentalDelta: -3,
          feedback:
            "너무 차가운 물을 한꺼번에 마시면 위경련이 올 수 있습니다. 시원한 물을 조금씩 자주 마시는 것이 좋아요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-08",
      areaId: "disaster-safety",
      subAreaId: "natural-disaster",
      order: 8,
      title: "한파/저체온증",
      body: "겨울에 등산을 하다가 길을 잃었습니다. 날씨가 매우 추워지고, 손발이 저리고 생각이 띵해지기 시작합니다.",
      image: "/images/situations/area5/s03.png",
      choices: [
        {
          id: "dis-08-a",
          text: "바람이 없는 곳을 찾아 웅크리고, 119에 구조를 요청한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 생존법입니다! 저체온증 시 바람을 막고 체온 손실을 최소화해야 합니다. 119에 위치를 알리고 가능하면 움직이지 말고 구조를 기다리세요.",
          isCorrect: true,
        },
        {
          id: "dis-08-b",
          text: "땀을 내며 빨리 걸어 몸을 따뜻하게 한다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "위험합니다! 땀은 체온을 더 빨리 빼앗습니다. 저체온증 시 과도한 운동은 역효과예요. 웅크려 체온을 보존하는 것이 중요합니다.",
          isCorrect: false,
        },
        {
          id: "dis-08-c",
          text: "졸리니까 잠깐 눈을 붙인다",
          lifeDelta: -25,
          mentalDelta: -15,
          feedback:
            "절대 안 됩니다! 저체온증 시 졸음은 위험한 신호입니다. 잠들면 깨어나지 못할 수 있어요. 꼭 깨어 있으면서 구조를 기다리세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-09",
      areaId: "disaster-safety",
      subAreaId: "natural-disaster",
      order: 9,
      title: "해일경보",
      body: "해변에서 놀다가 스마트폰에 해일경보가 울렸습니다. '지진 해일 경보 3m 예상'이라고 합니다. 바다가 평소와 다르게 조금씩 물러나고 있습니다.",
      image: "/images/situations/area5/s04.png",
      choices: [
        {
          id: "dis-09-a",
          text: "즉시 해안에서 멀리 떨어진 높은 곳으로 대피한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 대처입니다! 해일은 매우 빠르게 밀려옵니다. 바다가 물러나는 것은 해일 전조 현상이에요. 해안에서 최소 1km 이상, 높은 곳으로 즉시 대피하세요.",
          isCorrect: true,
        },
        {
          id: "dis-09-b",
          text: "바다가 물러나는 걸 구경하러 해변으로 간다",
          lifeDelta: -25,
          mentalDelta: -15,
          feedback:
            "매우 위험합니다! 바다가 물러나는 것은 해일이 곧 밀려올 신호입니다. 2004년 인도양 쓰나미 때 많은 사람이 이 현상을 구경하다가 목숨을 잃었어요.",
          isCorrect: false,
        },
        {
          id: "dis-09-c",
          text: "차량 안으로 들어가 해안에서 대기한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "위험합니다! 해일은 차량을 쉽게 휩쓸어 갑니다. 해안에서 멀리, 높은 건물이나 고지대로 대피해야 합니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-10",
      areaId: "disaster-safety",
      subAreaId: "natural-disaster",
      order: 10,
      title: "산사태",
      body: "폭우가 계속된 뒤 산에 있는 할머니 댁으로 가는 중입니다. 산길에서 흙과 돌이 흔들리는 소리가 들리고, 바위가 굴러내리기 시작합니다.",
      image: "/images/situations/area5/s05.png",
      choices: [
        {
          id: "dis-10-a",
          text: "산에서 멀리 떨어진 안전한 곳으로 즉시 대피한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 판단입니다! 폭우 후 산사태 위험이 높습니다. 흙이 흔들리거나 바위가 굴러오면 즉시 산에서 멀리 떨어진 넓은 공터로 대피하세요.",
          isCorrect: true,
        },
        {
          id: "dis-10-b",
          text: "바로 옆 굴이나 동굴로 들어가 피한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "위험합니다! 산사태 시 굴이나 동굴은 흙에 묻힐 수 있습니다. 산에서 멀리 떨어진 열린 공간이 안전합니다.",
          isCorrect: false,
        },
        {
          id: "dis-10-c",
          text: "나무에 붙잡고 서 있다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "나무는 산사태에 뿌리째 뽑힐 수 있습니다. 산에서 멀리 이동하는 것이 유일한 안전한 대처법이에요.",
          isCorrect: false,
        },
      ],
    },

    // ────────────── 사회재난 (10개) ──────────────
    {
      id: "dis-11",
      areaId: "disaster-safety",
      subAreaId: "social-disaster",
      order: 11,
      title: "화학물질 유출",
      body: "공장 근처를 지나가는데, 갑자기 매캐한 냄새가 나고 눈과 목이 따가워집니다. '화학물질 유출' 경보가 울리고 사람들이 기침하며 뛰어갑니다.",
      image: "/images/situations/area5/s01.png",
      choices: [
        {
          id: "dis-11-a",
          text: "바람과 반대 방향으로, 가능하면 건물 안으로 대피한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 대처입니다! 화학물질은 바람을 타고 퍼집니다. 바람의 상류(유출 방향) 반대로 이동하고, 실내로 들어가 창문을 닫고 환기를 멈추세요.",
          isCorrect: true,
        },
        {
          id: "dis-11-b",
          text: "유출 현장으로 가서 상황을 확인한다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "절대 안 됩니다! 화학물질 유출 현장에 가까이 가면 흡입·화상·중독으로 위험합니다. 반드시 유출원에서 멀리 대피하세요.",
          isCorrect: false,
        },
        {
          id: "dis-11-c",
          text: "숨을 참고 그냥 걸어서 지나간다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "화학물질은 피부와 눈에도 흡수됩니다. 숨만 참는 것으로는 부족해요. 즉시 바람 반대 방향으로 대피하고 실내로 들어가세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-12",
      areaId: "disaster-safety",
      subAreaId: "social-disaster",
      order: 12,
      title: "고농도 미세먼지",
      body: "미세먼지 '매우 나쁨' 경보가 발령되었습니다. 오늘은 체육 대회가 있는 날인데, 선생님은 그대로 진행하자고 합니다.",
      image: "/images/situations/area5/s02.png",
      choices: [
        {
          id: "dis-12-a",
          text: "선생님께 실외 활동을 실내로 변경하거나 연기해달라고 건의한다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "올바른 판단입니다! 고농도 미세먼지 시 실외 운동은 호흡기·심혈관에 해로워요. KF80 이상 마스크를 착용하거나 실내 활동으로 대체하는 것이 안전합니다.",
          isCorrect: true,
        },
        {
          id: "dis-12-b",
          text: "그냥 열심히 뛰어서 대회에 참가한다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "위험합니다! 고농도 미세먼지에서 과격한 운동을 하면 기침, 천식 악화, 심장 부담이 올 수 있어요. 실외 운동을 피하세요.",
          isCorrect: false,
        },
        {
          id: "dis-12-c",
          text: "일반 일회용 마스크를 쓰고 참가한다",
          lifeDelta: -5,
          mentalDelta: -3,
          feedback:
            "일반 마스크는 미세먼지 차단 효과가 낮습니다. 미세먼지용 KF80 이상 마스크를 써야 하고, 가능하면 실내 활동이 더 안전해요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-13",
      areaId: "disaster-safety",
      subAreaId: "social-disaster",
      order: 13,
      title: "테러 의심물체",
      body: "지하철역에서 이상한 가방이 한동안 방치되어 있는 것을 발견했습니다. 주변에 주인 같은 사람이 보이지 않고, 뭔가 삐 소리가 난다고 합니다.",
      image: "/images/situations/area5/s03.png",
      choices: [
        {
          id: "dis-13-a",
          text: "즉시 112에 신고하고, 가방에서 멀리 떨어진 후 대피한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 대처입니다! 의심스러운 방치물은 절대 만지지 말고, 즉시 112에 신고하세요. 다른 사람에게 알리며 안전한 거리로 대피하는 것이 중요합니다.",
          isCorrect: true,
        },
        {
          id: "dis-13-b",
          text: "가방을 열어서 뭐가 들었는지 확인한다",
          lifeDelta: -25,
          mentalDelta: -15,
          feedback:
            "절대 안 됩니다! 의심물체를 만지거나 열면 폭발할 수 있습니다. 어떤 경우에도 직접 접촉하지 말고 112에 신고만 하세요.",
          isCorrect: false,
        },
        {
          id: "dis-13-c",
          text: "내 일이 아니니까 그냥 지나친다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "의심물체를 방치하면 많은 사람이 위험해질 수 있습니다. 112 신고는 시민의 책임이에요. 반드시 신고하고 대피하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-14",
      areaId: "disaster-safety",
      subAreaId: "social-disaster",
      order: 14,
      title: "장기 정전",
      body: "갑자기 전기가 끊겼습니다. 밤인데 한동안 복구될 기미가 없습니다. 냉장고에 음식이 있고, 휴대폰 배터리도 얼마 안 남았습니다.",
      image: "/images/situations/area5/s04.png",
      choices: [
        {
          id: "dis-14-a",
          text: "냉장고 문을 최소한으로 열고, 휴대폰은 절약해 쓰며 비상용 조명을 준비한다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "올바른 대처입니다! 정전 시 냉장고 문을 자주 열면 음식이 빨리 상합니다. 휴대폰은 긴급 연락용으로 아끼고, 손전등·양초를 비치하세요.",
          isCorrect: true,
        },
        {
          id: "dis-14-b",
          text: "냉장고를 자주 열어 음식 상태를 확인한다",
          lifeDelta: -5,
          mentalDelta: -3,
          feedback:
            "정전 시 냉장고 문을 자주 열면 내부 온도가 올라가 음식이 빨리 상합니다. 문을 최소한으로만 열고, 4시간 이상 정전이면 냉동식품은 버리세요.",
          isCorrect: false,
        },
        {
          id: "dis-14-c",
          text: "캔들 여러 개를 켜서 밝게 한다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "캔들은 화재 위험이 있습니다. 전기 없이 밝히려면 LED 손전등이나 배터리 조명이 안전해요. 캔들은 반드시 받침대 위에 두세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-15",
      areaId: "disaster-safety",
      subAreaId: "social-disaster",
      order: 15,
      title: "수도 오염",
      body: "아파트 관리사무소에서 '급수 오염 의심' 공지가 붙었습니다. 수도물을 마시지 말고, 끓여서도 사용하지 말라고 합니다.",
      image: "/images/situations/area5/s05.png",
      choices: [
        {
          id: "dis-15-a",
          text: "생수나 정수된 물을 구입해 사용하고, 요리·양치도 해당 물을 쓴다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 대처입니다! 수도 오염 시 끓여도 일부 오염물질은 제거되지 않을 수 있어요. 공식 안내에 따라 생수나 안전한 물을 사용하세요.",
          isCorrect: true,
        },
        {
          id: "dis-15-b",
          text: "끓이면 괜찮겠지 하고 끓인 물을 마신다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "끓이는 것은 세균만 제거할 수 있습니다. 화학물질·중금속 오염은 끓여도 제거되지 않아요. 공식 안내를 반드시 따르세요.",
          isCorrect: false,
        },
        {
          id: "dis-15-c",
          text: "조금만 마시면 괜찮겠지 하고 수도물을 마신다",
          lifeDelta: -20,
          mentalDelta: -8,
          feedback:
            "오염된 물은 소량이라도 위험할 수 있습니다. 특히 어린이와 노약자는 더 취약해요. 절대 오염 의심 수돗물을 사용하지 마세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-16",
      areaId: "disaster-safety",
      subAreaId: "social-disaster",
      order: 16,
      title: "엘리베이터 정전",
      body: "아파트 엘리베이터를 타고 올라가는 중, 갑자기 정전으로 엘리베이터가 멈췄습니다. 안에 혼자 있고, 조명도 꺼져 어둡습니다.",
      image: "/images/situations/area5/s01.png",
      choices: [
        {
          id: "dis-16-a",
          text: "비상벨을 누르고 119에 신고한 뒤, 문을 열지 말고 침착하게 기다린다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 대처입니다! 엘리베이터 정전 시 비상벨과 119 신고 후, 문을 억지로 열지 마세요. 문 사이에 끼이거나 추락할 수 있어요. 구조를 기다리세요.",
          isCorrect: true,
        },
        {
          id: "dis-16-b",
          text: "문을 손으로 벌려 탈출하려고 한다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "절대 안 됩니다! 엘리베이터 문을 억지로 열면 층 사이에 끼이거나 추락할 수 있습니다. 반드시 전문 구조대가 올 때까지 기다리세요.",
          isCorrect: false,
        },
        {
          id: "dis-16-c",
          text: "천장 해치를 열어 위로 기어올라 탈출한다",
          lifeDelta: -25,
          mentalDelta: -15,
          feedback:
            "매우 위험합니다! 엘리베이터 샤프트는 추락 위험이 있습니다. 해치를 열고 나가면 감전·추락으로 목숨을 잃을 수 있어요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-17",
      areaId: "disaster-safety",
      subAreaId: "social-disaster",
      order: 17,
      title: "군중 밀집/압사",
      body: "축제에 왔는데 사람이 너무 많습니다. 앞으로 갈수록 더 밀리고, 숨이 막히기 시작합니다. 주변 사람들이 비명을 지릅니다.",
      image: "/images/situations/area5/s02.png",
      choices: [
        {
          id: "dis-17-a",
          text: "팔을 가슴 앞에서 X자로 만들어 호흡 공간을 확보하고, 군중 흐름에 맞춰 비스듬히 이동한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 생존법입니다! 군중 압사 시 팔로 가슴에 공간을 만들어 호흡을 보호하세요. 군중에 역행하지 말고, 비스듬히 가장자리로 이동하는 것이 핵심입니다.",
          isCorrect: true,
        },
        {
          id: "dis-17-b",
          text: "앞으로 밀어서 빨리 나가려고 한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "위험합니다! 군중 속에서 앞으로 밀면 연쇄로 넘어지고 압사가 발생합니다. 군중에 역행하지 말고, 비스듬히 가장자리로 이동하세요.",
          isCorrect: false,
        },
        {
          id: "dis-17-c",
          text: "넘어지면 일어나려고 발버둥친다",
          lifeDelta: -25,
          mentalDelta: -15,
          feedback:
            "군중 속에서 넘어지면 일어나기 매우 어렵고, 밟힐 위험이 큽니다. 넘어지지 않도록 팔로 가슴을 보호하고, 넘어지면 몸을 구(球) 모양으로 말아 보호하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-18",
      areaId: "disaster-safety",
      subAreaId: "social-disaster",
      order: 18,
      title: "방사능 사고",
      body: "뉴스에서 '원자력 시설 비상사고' 경보가 나왔습니다. 실내에 들어가고 창문을 닫으라고 합니다. 밖에 있는데 집까지 10분 거리입니다.",
      image: "/images/situations/area5/s03.png",
      choices: [
        {
          id: "dis-18-a",
          text: "즉시 가장 가까운 건물 안으로 들어가 창문을 닫고 환기를 멈춘다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 대처입니다! 방사능 비상 시 실내로 대피하고, 창문·환기구를 닫아 외부 공기 유입을 막으세요. 가능하면 지하나 중앙부가 더 안전합니다.",
          isCorrect: true,
        },
        {
          id: "dis-18-b",
          text: "집으로 빨리 뛰어간다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "밖에 있는 시간이 길수록 피폭량이 늘어납니다. 가장 가까운 건물로 즉시 들어가세요. 10분 뛰는 것보다 1분 만에 들어가는 게 안전해요.",
          isCorrect: false,
        },
        {
          id: "dis-18-c",
          text: "마스크를 쓰고 밖에 있다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "일반 마스크는 방사성 물질 차단에 효과가 제한적입니다. 실내 대피가 가장 중요해요. 즉시 건물 안으로 들어가세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-19",
      areaId: "disaster-safety",
      subAreaId: "social-disaster",
      order: 19,
      title: "건물 붕괴",
      body: "건물 안에 있는데 갑자기 큰 '쿵' 소리와 함께 천장에서 먼지가 떨어집니다. 건물이 흔들리기 시작합니다. 붕괴가 시작된 것 같습니다.",
      image: "/images/situations/area5/s04.png",
      choices: [
        {
          id: "dis-19-a",
          text: "책상이나 튼튼한 가구 아래로 들어가 머리를 보호하고, 흔들림이 멈추면 비상구로 대피한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 생존법입니다! 붕괴 시 'DROP-COVER-HOLD ON'을 따르세요. 낙하물로부터 머리를 보호한 뒤, 흔들림이 멈추면 비상구로 신속히 대피하세요.",
          isCorrect: true,
        },
        {
          id: "dis-19-b",
          text: "엘리베이터를 타고 1층으로 내려간다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "절대 안 됩니다! 붕괴 시 엘리베이터는 정전·추락 위험이 있습니다. 계단을 이용하되, 먼저 흔들림이 멈출 때까지 안전한 곳에 숨어 있으세요.",
          isCorrect: false,
        },
        {
          id: "dis-19-c",
          text: "창문으로 뛰어내려 탈출한다",
          lifeDelta: -25,
          mentalDelta: -15,
          feedback:
            "매우 위험합니다! 2층 이상에서 뛰어내리면 중상을 입을 수 있습니다. 건물 안에서 튼튼한 가구 아래로 숨는 것이 생존률이 더 높아요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "dis-20",
      areaId: "disaster-safety",
      subAreaId: "social-disaster",
      order: 20,
      title: "가스 폭발",
      body: "아파트 복도에서 강한 가스 냄새가 납니다. 갑자기 '펑!' 하는 폭발음과 함께 불꽃이 퍼지기 시작합니다. 가스 폭발이 발생했습니다.",
      image: "/images/situations/area5/s05.png",
      choices: [
        {
          id: "dis-20-a",
          text: "젖은 수건으로 입을 막고, 낮은 자세로 비상계단을 통해 대피한다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "정확한 대처입니다! 가스 폭발 후에는 연기와 열기가 위로 올라갑니다. 낮은 자세로 이동하고, 엘리베이터는 사용하지 말고 계단으로 대피하세요.",
          isCorrect: true,
        },
        {
          id: "dis-20-b",
          text: "엘리베이터를 타고 빨리 내려간다",
          lifeDelta: -25,
          mentalDelta: -10,
          feedback:
            "절대 안 됩니다! 화재·폭발 시 엘리베이터는 정전으로 갇히거나 연기가 유입될 수 있습니다. 반드시 비상계단을 이용하세요.",
          isCorrect: false,
        },
        {
          id: "dis-20-c",
          text: "집에 들어가 문을 닫고 기다린다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "폭발 후 화재가 확산되면 복도가 막힐 수 있습니다. 대피가 가능한 초기에 비상계단으로 나가는 것이 안전해요.",
          isCorrect: false,
        },
      ],
    },
  ],
};
