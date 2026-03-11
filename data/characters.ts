import { Character } from "@/types/game";

export const characters: Character[] = [
  {
    id: "minjun",
    name: "김민준",
    age: 11,
    description:
      "활발하고 호기심이 넘치는 초등학교 5학년. 새로운 경험을 좋아하지만 가끔 조심성이 부족할 때가 있어요. 위험한 순간에도 용감하게 뛰어드는 민준이가 현명한 선택을 할 수 있도록 함께 결정해 주세요!",
    image: "/images/characters/minjun.png",
    traits: ["활발함", "호기심", "용감함"],
    initialLife: 100,
    initialMental: 100,
  },
  {
    id: "seoyeon",
    name: "이서연",
    age: 12,
    description:
      "꼼꼼하고 책임감이 강한 초등학교 6학년. 친구들 사이에서 반장으로 신뢰를 받지만 걱정이 많은 편이에요. 서연이가 최선의 판단을 내릴 수 있도록 여러분의 선택으로 함께 안전을 지켜주세요!",
    image: "/images/characters/seoyeon.png",
    traits: ["꼼꼼함", "책임감", "배려심"],
    initialLife: 90,
    initialMental: 110,
  },
  {
    id: "hyunwoo",
    name: "박현우",
    age: 10,
    description:
      "장난기 많고 에너지가 넘치는 초등학교 4학년. 운동을 좋아하고 친구들과 어울리기를 좋아하지만 위험 앞에서는 아직 경험이 부족해요. 현우가 올바른 선택을 할 수 있도록 여러분이 함께 안전을 결정해 주세요!",
    image: "/images/characters/hyunwoo.png",
    traits: ["장난기", "운동신경", "사교성"],
    initialLife: 110,
    initialMental: 90,
  },
];
