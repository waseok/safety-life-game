import { Area } from "@/types/game";

export const workSafety: Area = {
  id: "work-safety",
  title: "직업안전",
  icon: "🏗️",
  order: 6,
  description:
    "공사현장, 실험실 등 작업 환경에서의 안전 수칙과 보호장비 사용법을 배워보세요.",
  coverImage: "/images/situations/area6/cover.png",
  color: "#10b981",
  subAreas: [
    {
      id: "industrial",
      title: "산업안전",
      description: "건설현장, 공장, 작업장에서의 안전 수칙",
    },
    {
      id: "laboratory",
      title: "실험실안전",
      description: "과학 실험실에서의 시약, 기구, 화재 안전",
    },
  ],
  situations: [
    // ────────────── 산업안전 (10개) ──────────────
    {
      id: "ws-01",
      areaId: "work-safety",
      subAreaId: "industrial",
      order: 1,
      title: "안전모 착용",
      body: "건설현장에 첫 출근한 날입니다. 현장 입구에 '안전모 착용 필수' 표지판이 보입니다. 선배가 \"빨리 와, 오늘 일 많아.\"라며 재촉합니다. 안전모가 조금 불편하게 느껴집니다.",
      image: "/images/situations/area6/s01.png",
      choices: [
        {
          id: "ws-01-a",
          text: "안전모를 제대로 착용하고 턱끈까지 조절한 뒤 현장에 들어간다",
          lifeDelta: 0,
          mentalDelta: 8,
          feedback:
            "정확합니다! 건설현장에서는 낙하물에 의한 두부 손상이 많습니다. 안전모와 턱끈을 꼭 착용해야 생명을 지킬 수 있어요.",
          isCorrect: true,
        },
        {
          id: "ws-01-b",
          text: "선배 눈치 보느라 안전모를 들고만 있다가 입구에서 쓴다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "안전모를 제대로 착용하지 않으면 낙하 시 벗겨져 보호 효과가 없습니다. 턱끈을 꼭 매고 현장 전체에서 착용하세요.",
          isCorrect: false,
        },
        {
          id: "ws-01-c",
          text: "불편하니까 머리에 얹어두기만 하고 들어간다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "안전모를 제대로 착용하지 않으면 낙하물에 맞았을 때 머리에서 떨어져 부상을 입습니다. 반드시 턱끈을 매세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-02",
      areaId: "work-safety",
      subAreaId: "industrial",
      order: 2,
      title: "고소작업 안전벨트",
      body: "2층 높이의 비계 위에서 철근 작업을 하고 있습니다. 안전벨트를 착용했지만, 이동할 때마다 연결고리가 걸리면서 불편합니다. \"이 정도 높이면 괜찮지 않을까?\"라는 생각이 듭니다.",
      image: "/images/situations/area6/s02.png",
      choices: [
        {
          id: "ws-02-a",
          text: "안전벨트를 항상 연결고리에 걸고, 이동 시에도 한 손은 반드시 잡고 이동한다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 2m 이상 고소작업에서는 100% 연결이 원칙입니다. 한 순간의 방심이 추락 사고로 이어질 수 있어요.",
          isCorrect: true,
        },
        {
          id: "ws-02-b",
          text: "불편하니까 작업할 때만 연결하고 이동 시에는 벗는다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "매우 위험합니다! 이동 중 미끄러지거나 비계가 흔들리면 추락합니다. 고소작업에서는 항상 연결 상태를 유지해야 해요.",
          isCorrect: false,
        },
        {
          id: "ws-02-c",
          text: "안전벨트는 착용했지만 연결고리는 가까운 곳에만 걸어둔다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "안전선로나 연결고리가 작업 반경을 벗어나면 연결이 끊어질 수 있습니다. 작업 위치에 맞는 연결고리를 사용하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-03",
      areaId: "work-safety",
      subAreaId: "industrial",
      order: 3,
      title: "회전기계 주의",
      body: "공장에서 드릴 작업을 하고 있습니다. 드릴 비트를 교체해야 하는데, 기계가 방금 꺼졌습니다. 비트가 아직 천천히 돌고 있는 것 같습니다. 조금 기다리면 될 것 같은데 일정이 촉박합니다.",
      image: "/images/situations/area6/s03.png",
      choices: [
        {
          id: "ws-03-a",
          text: "기계가 완전히 멈출 때까지 기다린 후 비트를 교체한다",
          lifeDelta: 0,
          mentalDelta: 8,
          feedback:
            "정확합니다! 회전기계는 완전 정지 후에만 접촉해야 합니다. 관성으로 돌아가는 기계에 손이 감기면 심각한 부상을 입어요.",
          isCorrect: true,
        },
        {
          id: "ws-03-b",
          text: "거의 멈췄으니 빨리 비트만 교체한다",
          lifeDelta: -25,
          mentalDelta: -12,
          feedback:
            "절대 위험합니다! 회전 중인 기계에 손을 대면 끌려 들어가 절단·절단 사고가 발생합니다. 반드시 완전 정지를 확인하세요.",
          isCorrect: false,
        },
        {
          id: "ws-03-c",
          text: "글로브를 끼고 빨리 교체한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "글로브는 회전기계에서 오히려 위험합니다! 끌려 들어갈 수 있어요. 기계 완전 정지 후 맨손으로 작업하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-04",
      areaId: "work-safety",
      subAreaId: "industrial",
      order: 4,
      title: "화학물질 취급",
      body: "공장에서 세척용 산성 시약을 옮기고 있습니다. 용기 라벨에 '부식성', '피부 접촉 금지'라고 적혀 있습니다. 장갑이 없는데, \"한 번만 옮기면 되지\"라는 생각이 듭니다.",
      image: "/images/situations/area6/s04.png",
      choices: [
        {
          id: "ws-04-a",
          text: "부식 방지 장갑과 보안경을 착용한 후 MSDS를 확인하고 옮긴다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 화학물질 취급 시 보호장비 착용과 MSDS(물질안전보건자료) 확인이 필수입니다. 피부·눈 접촉 시 화상을 입을 수 있어요.",
          isCorrect: true,
        },
        {
          id: "ws-04-b",
          text: "조심해서 빨리 옮긴다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "화학물질은 한 방울만 튀어도 피부나 눈에 심각한 화상을 입힙니다. 반드시 적합한 보호장비를 착용하세요.",
          isCorrect: false,
        },
        {
          id: "ws-04-c",
          text: "다른 사람에게 시키고 본인은 다른 일을 한다",
          lifeDelta: 0,
          mentalDelta: -5,
          feedback:
            "화학물질 취급은 교육받은 사람이 보호장비를 갖춘 상태에서 해야 합니다. 본인도 취급 시 안전 수칙을 알아두세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-05",
      areaId: "work-safety",
      subAreaId: "industrial",
      order: 5,
      title: "밀폐공간",
      body: "저장탱크 내부 청소 작업을 해야 합니다. 탱크 입구가 좁고 안이 어둡습니다. 선임이 \"빨리 들어가서 닦고 나와.\"라고 합니다. 환기 팬이 돌아가고 있지만 냄새가 좀 납니다.",
      image: "/images/situations/area6/s05.png",
      choices: [
        {
          id: "ws-05-a",
          text: "산소 농도·유해가스 측정 후, 감시자를 배치하고 보호장비를 착용한 뒤 입장한다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "정확합니다! 밀폐공간은 산소 부족·유해가스로 질식 사고가 많습니다. 측정·감시·비상구조 준비가 필수예요.",
          isCorrect: true,
        },
        {
          id: "ws-05-b",
          text: "환기 팬이 돌아가니까 들어가서 빨리 청소한다",
          lifeDelta: -25,
          mentalDelta: -12,
          feedback:
            "매우 위험합니다! 밀폐공간 내부는 환기만으로 부족할 수 있고, 유해가스가 바닥에 쌓일 수 있어요. 반드시 측정 후 입장하세요.",
          isCorrect: false,
        },
        {
          id: "ws-05-c",
          text: "선임에게 들어가라고 하면 들어간다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "밀폐공간 작업은 허가·측정·감시 등 안전 절차 없이 절대 들어가면 안 됩니다. 본인도 안전 수칙을 지켜야 해요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-06",
      areaId: "work-safety",
      subAreaId: "industrial",
      order: 6,
      title: "소음 환경/청력",
      body: "공장에서 프레스 기계 옆에서 8시간 근무합니다. 기계 소리가 매우 시끄럽습니다. 귀마개가 지급됐는데, 대화하기 불편해서 자주 빼고 있습니다. \"몇 년은 괜찮겠지\"라고 생각합니다.",
      image: "/images/situations/area6/s01.png",
      choices: [
        {
          id: "ws-06-a",
          text: "귀마개를 항상 올바르게 착용하고, 정기적으로 청력 검사를 받는다",
          lifeDelta: 5,
          mentalDelta: 8,
          feedback:
            "훌륭합니다! 85dB 이상 소음 환경에서는 귀마개 착용이 필수입니다. 청력 손실은 되돌릴 수 없어 예방이 중요해요.",
          isCorrect: true,
        },
        {
          id: "ws-06-b",
          text: "대화할 때만 빼고 나머지 시간엔 착용한다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "소음에 노출되는 순간마다 청력이 손상됩니다. 귀마개를 자주 빼면 보호 효과가 크게 떨어져요. 항상 착용하세요.",
          isCorrect: false,
        },
        {
          id: "ws-06-c",
          text: "귀마개 없이 일한다",
          lifeDelta: -15,
          mentalDelta: -10,
          feedback:
            "소음성 난청은 서서히 진행되어 알아채기 어렵습니다. 한번 손상된 청력은 회복되지 않아요. 반드시 귀마개를 착용하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-07",
      areaId: "work-safety",
      subAreaId: "industrial",
      order: 7,
      title: "중량물 운반",
      body: "창고에서 25kg짜리 박스를 여러 개 옮겨야 합니다. 무릎을 구부리지 않고 허리만 숙여 들려고 하니 등이 뻐근합니다. \"한 번에 두 개씩 들면 빨리 끝나겠지\"라고 생각합니다.",
      image: "/images/situations/area6/s02.png",
      choices: [
        {
          id: "ws-07-a",
          text: "무릎을 구부려 허리 곧게 펴고, 한 개씩 안정적으로 들어 올린다",
          lifeDelta: 0,
          mentalDelta: 8,
          feedback:
            "정확합니다! 허리만 숙이면 디스크 손상·요통이 올 수 있어요. 무릎을 굽히고 허리를 곧게 유지하며 들어올리세요.",
          isCorrect: true,
        },
        {
          id: "ws-07-b",
          text: "빨리 하려고 한 번에 두 개씩 들어 옮긴다",
          lifeDelta: -20,
          mentalDelta: -8,
          feedback:
            "과부하는 허리·어깨 부상을 유발합니다. 20kg 이상은 혼자 들지 말고 지게나 장비를 사용하세요.",
          isCorrect: false,
        },
        {
          id: "ws-07-c",
          text: "허리만 숙여서 빨리 들어 올린다",
          lifeDelta: -15,
          mentalDelta: -5,
          feedback:
            "허리만 구부려 들면 요추 디스크 탈출(허리 디스크) 위험이 큽니다. 반드시 무릎을 굽히고 들어올리세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-08",
      areaId: "work-safety",
      subAreaId: "industrial",
      order: 8,
      title: "전기작업 차단기",
      body: "전기 패널의 회로를 점검해야 합니다. 차단기를 내리면 해당 구역이 정전되어 다른 작업이 멈춥니다. \"잠깐만 확인하는 거니까\"라고 생각하며 차단기 없이 작업하려 합니다.",
      image: "/images/situations/area6/s03.png",
      choices: [
        {
          id: "ws-08-a",
          text: "반드시 차단기를 내리고, 잠금·표지 후 전압이 없는지 확인하고 작업한다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 전기 작업 시 LOTO(잠금·표지) 절차가 필수입니다. 감전 사고는 한 순간에 생명을 앗아갈 수 있어요.",
          isCorrect: true,
        },
        {
          id: "ws-08-b",
          text: "빨리 확인만 하면 되니까 차단 없이 조심해서 작업한다",
          lifeDelta: -25,
          mentalDelta: -12,
          feedback:
            "절대 위험합니다! 전기 작업은 반드시 차단 후 진행해야 합니다. 감전 시 심정지·화상으로 사망할 수 있어요.",
          isCorrect: false,
        },
        {
          id: "ws-08-c",
          text: "고무 장갑을 끼고 작업한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "고무 장갑만으로는 감전을 막을 수 없습니다. 전기 작업은 반드시 차단기 차단 후 진행하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-09",
      areaId: "work-safety",
      subAreaId: "industrial",
      order: 9,
      title: "용접 보호장비",
      body: "금속 용접 작업을 하고 있습니다. 용접면(헬멧)이 무겁고 불편합니다. \"잠깐만 용접하는 거니까\" 보안경만 쓰고 작업하려 합니다. 주변에 다른 작업자도 있습니다.",
      image: "/images/situations/area6/s04.png",
      choices: [
        {
          id: "ws-09-a",
          text: "용접면과 가죽 장갑, 방염복을 착용하고, 주변에 가림막을 설치한 후 작업한다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "정확합니다! 용접 아크의 자외선은 눈·피부에 심각한 손상을 줍니다. 용접면·보호복·가림막이 필수예요.",
          isCorrect: true,
        },
        {
          id: "ws-09-b",
          text: "보안경만 쓰고 빨리 용접한다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "일반 보안경은 용접 아크를 막지 못합니다! 용접 눈깔짐(각막염)과 피부 화상을 입을 수 있어요. 용접면을 착용하세요.",
          isCorrect: false,
        },
        {
          id: "ws-09-c",
          text: "눈만 감고 잠깐 용접한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "눈을 감아도 자외선은 눈꺼풀을 통과합니다. 용접 아크를 직접 보지 말고, 반드시 용접면을 착용하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-10",
      areaId: "work-safety",
      subAreaId: "industrial",
      order: 10,
      title: "분진작업 마스크",
      body: "목재를 절단하는 작업을 하고 있습니다. 톱밥과 먼지가 많이 날립니다. 방진 마스크가 지급됐는데, 숨쉬기가 답답해서 턱에 걸쳐두기만 하고 있습니다.",
      image: "/images/situations/area6/s05.png",
      choices: [
        {
          id: "ws-10-a",
          text: "방진 마스크(KF80 이상)를 코와 입을 완전히 덮도록 착용하고, 환기를 시킨다",
          lifeDelta: 0,
          mentalDelta: 8,
          feedback:
            "훌륭합니다! 목재·시멘트 분진은 폐에 쌓여 진폐증을 유발합니다. 방진 마스크를 올바르게 착용하고 환기하세요.",
          isCorrect: true,
        },
        {
          id: "ws-10-b",
          text: "턱에 걸쳐두고 작업한다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "마스크를 제대로 착용하지 않으면 분진이 그대로 흡입됩니다. 진폐증은 한번 걸리면 회복이 어려워요.",
          isCorrect: false,
        },
        {
          id: "ws-10-c",
          text: "마스크 없이 참고 작업한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "목재·시멘트 분진은 폐암·진폐증 위험이 있습니다. 반드시 방진 마스크를 착용하고 작업장 환기를 하세요.",
          isCorrect: false,
        },
      ],
    },

    // ────────────── 실험실안전 (10개) ──────────────
    {
      id: "ws-11",
      areaId: "work-safety",
      subAreaId: "laboratory",
      order: 11,
      title: "실험복/보안경 착용",
      body: "과학 실험실에서 산과 염기의 중화 반응 실험을 합니다. 실험복과 보안경이 비치되어 있는데, 날씨가 더워서 반팔에 보안경 없이 실험하려 합니다.",
      image: "/images/situations/area6/s01.png",
      choices: [
        {
          id: "ws-11-a",
          text: "실험복을 입고 보안경을 착용한 후 실험을 진행한다",
          lifeDelta: 0,
          mentalDelta: 8,
          feedback:
            "정확합니다! 실험실에서는 시약이 튀거나 유리기구가 깨질 수 있어요. 실험복과 보안경은 필수 보호장비입니다.",
          isCorrect: true,
        },
        {
          id: "ws-11-b",
          text: "반팔에 보안경 없이 조심해서 실험한다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "산·염기가 피부나 눈에 튀면 화상을 입습니다. 한 방울도 위험해요. 반드시 실험복과 보안경을 착용하세요.",
          isCorrect: false,
        },
        {
          id: "ws-11-c",
          text: "선생님이 안 보일 때만 빼고, 보이면 착용한다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "사고는 예측할 수 없는 순간에 발생합니다. 실험실에 있는 동안은 항상 보호장비를 착용하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-12",
      areaId: "work-safety",
      subAreaId: "laboratory",
      order: 12,
      title: "산/염기 시약 취급",
      body: "염산을 비커에 옮기는 실험입니다. 염산 병이 무겁고, \"조금만 옮기면 되니까\" 직접 붓고 싶습니다. 옆에 있는 친구가 실험 노트를 적고 있습니다.",
      image: "/images/situations/area6/s02.png",
      choices: [
        {
          id: "ws-12-a",
          text: "보안경·장갑을 착용하고, 눈높이보다 낮게, 천천히 부어 넣는다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 산·염기는 눈높이보다 낮게 부어야 튐을 방지합니다. 보호장비 착용과 천천히 부으세요.",
          isCorrect: true,
        },
        {
          id: "ws-12-b",
          text: "빨리 부어서 옮긴다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "산·염기가 튀면 피부·눈에 심각한 화상을 입힙니다. 반드시 보호장비를 착용하고 천천히, 낮은 높이에서 부으세요.",
          isCorrect: false,
        },
        {
          id: "ws-12-c",
          text: "친구에게 부탁해서 옮긴다",
          lifeDelta: 0,
          mentalDelta: -3,
          feedback:
            "화학 시약 취급은 본인이 직접 안전 수칙을 지키며 해야 합니다. 올바른 방법을 익혀두세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-13",
      areaId: "work-safety",
      subAreaId: "laboratory",
      order: 13,
      title: "유리기구 파손",
      body: "실험 중 비커를 떨어뜨려 바닥에 유리 조각이 사방에 흩어져 있습니다. 수업이 끝나고 정리 시간입니다. \"빨리 치우고 가야지\" 맨손으로 유리 조각을 주우려 합니다.",
      image: "/images/situations/area6/s03.png",
      choices: [
        {
          id: "ws-13-a",
          text: "빗자루와 쓰레받기를 사용해 모은 후, 유리 전용 쓰레기통에 버린다",
          lifeDelta: 0,
          mentalDelta: 8,
          feedback:
            "정확합니다! 유리 조각은 맨손으로 주우면 베일 수 있어요. 빗자루와 쓰레받기, 유리 전용 폐기함을 사용하세요.",
          isCorrect: true,
        },
        {
          id: "ws-13-b",
          text: "맨손으로 빨리 주워서 일반 쓰레기통에 버린다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "유리 조각에 손이 베이거나, 일반 쓰레기와 섞이면 관리자가 다칠 수 있어요. 도구를 사용하고 유리 전용 통에 버리세요.",
          isCorrect: false,
        },
        {
          id: "ws-13-c",
          text: "작은 조각은 그냥 두고 간다",
          lifeDelta: -5,
          mentalDelta: -5,
          feedback:
            "남은 유리 조각은 다음에 실험하는 사람이 다칠 수 있어요. 반드시 모두 수거해서 처리하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-14",
      areaId: "work-safety",
      subAreaId: "laboratory",
      order: 14,
      title: "알코올램프 가열",
      body: "알코올램프로 시험관을 가열하는 실험입니다. 시험관을 직접 불꽃 위에 올려놓고 가열하려 합니다. \"빨리 하면 되지\"라는 생각이 듭니다.",
      image: "/images/situations/area6/s04.png",
      choices: [
        {
          id: "ws-14-a",
          text: "시험관 집게로 시험관을 잡고, 불꽃의 바깥쪽(외염)에서 천천히 움직이며 가열한다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 시험관을 직접 잡으면 화상을 입고, 시약이 튀어 위험해요. 시험관 집게 사용과 외염 가열이 안전한 방법입니다.",
          isCorrect: true,
        },
        {
          id: "ws-14-b",
          text: "손으로 시험관을 잡고 빨리 가열한다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "손으로 시험관을 잡으면 화상을 입고, 시약이 튀어 위험합니다. 반드시 시험관 집게를 사용하세요.",
          isCorrect: false,
        },
        {
          id: "ws-14-c",
          text: "시험관을 고정대에 세워놓고 가열한다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "시험관을 세워 가열하면 내용물이 끓어 넘칠 수 있어요. 시험관 집게로 잡고 기울여 가열하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-15",
      areaId: "work-safety",
      subAreaId: "laboratory",
      order: 15,
      title: "전기실험 감전",
      body: "전기 회로 실험을 하고 있습니다. 전원이 켜진 상태에서 전선을 연결하려다가 실수로 두 전선이 닿을 뻔했습니다. \"다행히 안 닿았지\"라고 생각하며 계속 작업하려 합니다.",
      image: "/images/situations/area6/s05.png",
      choices: [
        {
          id: "ws-15-a",
          text: "전원을 끄고, 회로를 확인한 후 다시 전원을 켠다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "정확합니다! 전기 회로는 반드시 전원을 끈 상태에서 연결·분리해야 합니다. 감전과 단락 사고를 예방해요.",
          isCorrect: true,
        },
        {
          id: "ws-15-b",
          text: "조심해서 전원 켠 상태로 전선을 연결한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "전원이 켜진 상태에서 회로를 만지면 감전되거나 단락으로 화재가 날 수 있어요. 반드시 전원을 끄고 작업하세요.",
          isCorrect: false,
        },
        {
          id: "ws-15-c",
          text: "고무 장갑을 끼고 작업한다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "실험실 고무 장갑은 감전 방지용이 아닐 수 있어요. 전기 작업은 전원을 끄고 진행하는 것이 가장 안전합니다.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-16",
      areaId: "work-safety",
      subAreaId: "laboratory",
      order: 16,
      title: "환기/유해가스",
      body: "염소 가스를 발생시키는 실험을 합니다. 실험실 창문이 닫혀 있고, 환기팬이 꺼져 있습니다. \"창문 열기 귀찮은데\"라는 생각이 듭니다.",
      image: "/images/situations/area6/s01.png",
      choices: [
        {
          id: "ws-16-a",
          text: "실험 전 창문을 열고 환기팬을 켠 후, 후드 안에서 실험을 진행한다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 유해가스 실험은 반드시 환기 후드나 충분한 환기 상태에서 해야 합니다. 흡입 시 호흡기 손상을 입어요.",
          isCorrect: true,
        },
        {
          id: "ws-16-b",
          text: "창문 닫은 채로 빨리 실험한다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "유해가스가 실험실에 쌓이면 호흡곤란·질식·호흡기 손상을 일으킵니다. 반드시 환기 후 실험하세요.",
          isCorrect: false,
        },
        {
          id: "ws-16-c",
          text: "실험 후에 창문을 연다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "가스가 이미 흡입된 후에는 늦습니다. 실험 전에 환기를 확보하고, 후드가 있다면 반드시 사용하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-17",
      areaId: "work-safety",
      subAreaId: "laboratory",
      order: 17,
      title: "폐액 처리",
      body: "실험이 끝나고 사용한 산성 폐액이 비커에 남아 있습니다. \"그냥 세면대에 버려도 되지\"라는 생각이 듭니다. 물로 씻어내면 될 것 같습니다.",
      image: "/images/situations/area6/s02.png",
      choices: [
        {
          id: "ws-17-a",
          text: "폐액 전용 용기에 담아 선생님께 전달하고, 라벨에 내용물을 기재한다",
          lifeDelta: 0,
          mentalDelta: 8,
          feedback:
            "정확합니다! 화학 폐액은 중화·희석 후 전용 폐기함에 버려야 합니다. 세면대에 직접 버리면 배관 손상과 환경 오염이 됩니다.",
          isCorrect: true,
        },
        {
          id: "ws-17-b",
          text: "물로 희석해서 세면대에 버린다",
          lifeDelta: -10,
          mentalDelta: -5,
          feedback:
            "화학 폐액을 세면대에 버리면 배관이 손상되고, 하수도 오염이 됩니다. 폐액 전용 처리 방법을 따르세요.",
          isCorrect: false,
        },
        {
          id: "ws-17-c",
          text: "다음 실험하는 사람이 처리할 거라고 생각하고 둔다",
          lifeDelta: -5,
          mentalDelta: -5,
          feedback:
            "폐액은 실험한 사람이 직접 처리해야 합니다. 넘겨주는 것은 위험을 전가하는 것이에요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-18",
      areaId: "work-safety",
      subAreaId: "laboratory",
      order: 18,
      title: "실험실 화재",
      body: "실험 중 알코올이 쏟아져 버너 불꽃에 불이 붙었습니다! 불이 실험대 위로 번지고 있습니다. 옆에 소화기가 있습니다.",
      image: "/images/situations/area6/s03.png",
      choices: [
        {
          id: "ws-18-a",
          text: "즉시 '불이야!'라고 외치고, 소화기로 불을 진압하거나 선생님께 알린다",
          lifeDelta: 5,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 알코올 화재는 소화기로 진압 가능합니다. 주변에 알리고, 초기에 진압하는 것이 중요해요.",
          isCorrect: true,
        },
        {
          id: "ws-18-b",
          text: "물을 붓려고 한다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "알코올 등 유기용매 화재에 물을 부으면 오히려 불이 번질 수 있어요! 소화기나 소화전을 사용하세요.",
          isCorrect: false,
        },
        {
          id: "ws-18-c",
          text: "당황해서 도망간다",
          lifeDelta: -5,
          mentalDelta: -12,
          feedback:
            "대피는 중요하지만, 먼저 '불이야!'를 외쳐 다른 사람을 알리고, 가능하면 초기 진압을 시도하세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-19",
      areaId: "work-safety",
      subAreaId: "laboratory",
      order: 19,
      title: "눈에 약품 들어감",
      body: "시약을 옮기다가 염산이 튀어 눈에 들어갔습니다! 따가움과 통증이 느껴집니다. 당황스럽습니다.",
      image: "/images/situations/area6/s04.png",
      choices: [
        {
          id: "ws-19-a",
          text: "즉시 세안기로 15분 이상 흐르는 물로 씻고, 선생님께 알린 후 병원에 간다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "정확합니다! 화학물질이 눈에 들어가면 즉시 세안기에서 15분 이상 흐르는 물로 씻어야 합니다. 병원 치료도 받으세요.",
          isCorrect: true,
        },
        {
          id: "ws-19-b",
          text: "손으로 눈을 비비며 닦는다",
          lifeDelta: -20,
          mentalDelta: -10,
          feedback:
            "눈을 비비면 각막이 손상됩니다! 절대 비비지 말고, 세안기에서 흐르는 물로 충분히 씻으세요.",
          isCorrect: false,
        },
        {
          id: "ws-19-c",
          text: "휴지로 눈물을 닦고 괜찮은지 기다린다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "화학물질은 눈에 남아있으면 계속 손상을 줍니다. 즉시 세안기에서 15분 이상 씻고 병원에 가세요.",
          isCorrect: false,
        },
      ],
    },
    {
      id: "ws-20",
      areaId: "work-safety",
      subAreaId: "laboratory",
      order: 20,
      title: "실험 후 안전 정리",
      body: "실험이 끝났습니다. 다음 수업이 곧 시작되어 실험실을 빨리 비워야 합니다. 버너 불이 아직 켜져 있고, 시약 병 뚜껑이 열려 있습니다.",
      image: "/images/situations/area6/s05.png",
      choices: [
        {
          id: "ws-20-a",
          text: "버너를 끄고, 시약 뚜껑을 닫고, 기구를 정리한 후 손을 씻고 나간다",
          lifeDelta: 0,
          mentalDelta: 10,
          feedback:
            "완벽합니다! 실험 후 정리는 화재·오염·사고 예방에 필수입니다. 버너 소등, 시약 밀폐, 기구 정리, 손 씻기를 꼭 하세요.",
          isCorrect: true,
        },
        {
          id: "ws-20-b",
          text: "빨리 나가야 하니까 그냥 나간다",
          lifeDelta: -15,
          mentalDelta: -8,
          feedback:
            "버너를 켜둔 채 나가면 화재 위험이 있고, 시약이 열려 있으면 증발·오염이 됩니다. 반드시 정리 후 퇴실하세요.",
          isCorrect: false,
        },
        {
          id: "ws-20-c",
          text: "버너만 끄고 나간다",
          lifeDelta: -5,
          mentalDelta: -5,
          feedback:
            "시약 뚜껑을 닫지 않으면 증발·오염이 되고, 기구를 정리하지 않으면 다음 실험자가 다칠 수 있어요. 완전히 정리하세요.",
          isCorrect: false,
        },
      ],
    },
  ],
};
