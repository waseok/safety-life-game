// 🧭 나침반 5분 안전교육 영역별 영상 (경기도교육청)
export interface SafetyVideo {
  title: string;
  url: string;
}

export const AREA_VIDEOS: Record<string, SafetyVideo[]> = {
  "daily-safety": [
    { title: "화재안전편", url: "https://youtu.be/Y6BvFIYYRo4" },
    { title: "체육시간안전편", url: "https://youtu.be/WaXRHe6Hioc" },
    { title: "감염병 예방 수칙", url: "https://youtu.be/0gJlY7Ekh-M" },
  ],
  "traffic-safety": [
    { title: "통학버스 승하차 안전", url: "https://youtu.be/vzP1nlpiaWs" },
  ],
  "violence-safety": [
    { title: "학교폭력예방-언어편", url: "https://youtu.be/RyfXSBm4DUY" },
    { title: "안전보호선 이해하기", url: "https://youtu.be/A3dGysylfB4" },
  ],
  "drug-cyber-safety": [],
  "disaster-safety": [
    { title: "테러안전편", url: "https://youtu.be/dG9CdxM9_js" },
    { title: "대설 및 한파 행동 요령", url: "https://youtu.be/Q2r2ojKeXKo" },
  ],
  "work-safety": [
    { title: "실험실습안전편", url: "https://youtu.be/HznsS6O4hJ8" },
  ],
  "firstaid-safety": [
    { title: "응급처치편", url: "https://youtu.be/yKn0RgwS8QM" },
    { title: "심폐소생술 및 하임리히법", url: "https://youtu.be/3R8wTAI5S9c" },
  ],
};

export const AREA_BOARD_URL =
  "https://www.goe.go.kr/goe/na/ntt/selectNttList.do?mi=10924&bbsId=2477";
