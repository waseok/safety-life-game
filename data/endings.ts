import { Ending } from "@/types/game";

export const endings: Ending[] = [
  {
    id: "good",
    type: "good",
    title: "안전 마스터! 🏆",
    body: `축하합니다! 당신은 거의 모든 상황에서 올바른 판단을 내렸습니다.

높은 생명력과 정신 에너지를 유지하며 모든 안전 체험을 완료했습니다.
이제 당신은 일상 속 위험을 현명하게 대처할 수 있는 '안전 마스터'입니다!

기억하세요: 안전은 선택이 아닌 습관입니다.
오늘 배운 것들을 일상에서도 꼭 실천해주세요.`,
    image: "/images/endings/good.png",
    minLife: 60,
    minMental: 60,
  },
  {
    id: "normal",
    type: "normal",
    title: "안전 수료! ✅",
    body: `수고하셨습니다! 모든 안전 체험을 완료했습니다.

몇몇 상황에서 아쉬운 선택이 있었지만, 전체적으로 괜찮은 판단력을 보여주었습니다.
틀린 부분을 복습하면 더 완벽한 안전 지식을 갖출 수 있을 거예요.

일상에서 위험한 상황을 만났을 때, 오늘 배운 것을 떠올려보세요.`,
    image: "/images/endings/normal.png",
    minLife: 30,
    minMental: 30,
  },
  {
    id: "bad",
    type: "bad",
    title: "위험 경고! ⚠️",
    body: `안전 체험을 간신히 마쳤지만, 많은 상황에서 위험한 선택을 했습니다.

생명력과 정신 에너지가 크게 떨어졌습니다.
실제 상황이었다면 큰 사고로 이어질 수 있었어요.

안전 수칙을 다시 한번 꼼꼼히 공부해주세요.
다시 도전해서 더 나은 결과를 만들어보는 건 어떨까요?`,
    image: "/images/endings/bad.png",
    minLife: 1,
    minMental: 1,
  },
  {
    id: "gameover",
    type: "gameover",
    title: "게임 오버 💔",
    body: `안타깝게도 위험한 선택의 결과로 체험을 계속할 수 없게 되었습니다.

안전 사고는 한 순간의 방심에서 시작됩니다.
실제 생활에서는 이런 상황이 생기지 않도록,
항상 안전을 최우선으로 생각해주세요.

다시 도전해서 모든 상황을 안전하게 극복해보세요!`,
    image: "/images/endings/gameover.png",
    minLife: 0,
    minMental: 0,
  },
];
