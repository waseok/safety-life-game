import { Character } from "@/types/game";

export const characters: Character[] = [
  {
    id: "minjun",
    name: "김민준",
    age: 16,
    description:
      "활발하고 호기심이 넘치는 고등학교 1학년. 새로운 경험을 좋아하지만 가끔 조심성이 부족할 때가 있습니다.",
    image: "/images/characters/minjun.png",
    traits: ["활발함", "호기심", "용감함"],
    initialLife: 100,
    initialMental: 100,
  },
  {
    id: "seoyeon",
    name: "이서연",
    age: 17,
    description:
      "꼼꼼하고 책임감이 강한 고등학교 2학년. 친구들 사이에서 반장으로 신뢰를 받지만 걱정이 많은 편입니다.",
    image: "/images/characters/seoyeon.png",
    traits: ["꼼꼼함", "책임감", "배려심"],
    initialLife: 90,
    initialMental: 110,
  },
  {
    id: "hyunwoo",
    name: "박현우",
    age: 15,
    description:
      "장난기 많고 에너지가 넘치는 중학교 3학년. 운동을 좋아하며 친구들과 어울리기를 즐깁니다.",
    image: "/images/characters/hyunwoo.png",
    traits: ["장난기", "운동신경", "사교성"],
    initialLife: 110,
    initialMental: 90,
  },
];
