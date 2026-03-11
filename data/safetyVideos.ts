// 🧭 나침반 5분 안전교육 영역별 영상 (경기도교육청)
export interface SafetyVideo {
  title: string;
  url: string;
}

export const AREA_VIDEOS: Record<string, SafetyVideo[]> = {
  "daily-safety": [
    { title: "화재 대피 요령", url: "https://youtu.be/Y6BvFIYYRo4" },
    { title: "감염병 예방 수칙", url: "https://youtu.be/0gJlY7Ekh-M" },
  ],
  "traffic-safety": [
    { title: "통학버스 승하차 안전", url: "https://youtu.be/vzP1nlpiaWs" },
  ],
  "violence-safety": [
    { title: "안전보호선 이해하기", url: "https://youtu.be/A3dGysylfB4" },
  ],
  "drug-cyber-safety": [
    { title: "화학물질 사고 대처", url: "https://youtu.be/9dvmMvbIzsA" },
  ],
  "disaster-safety": [
    { title: "대설 및 한파 행동 요령", url: "https://youtu.be/Q2r2ojKeXKo" },
  ],
  "work-safety": [
    { title: "과학 실험실 및 화재 안전", url: "https://youtu.be/Y6BvFIYYRo4" },
  ],
  "firstaid-safety": [
    { title: "심폐소생술 및 하임리히법", url: "https://youtu.be/3R8wTAI5S9c" },
  ],
};

export const AREA_BOARD_URL =
  "https://www.goe.go.kr/goe/na/ntt/selectNttList.do?mi=10924&bbsId=2477";
