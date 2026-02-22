import { Area } from "@/types/game";
import { dailySafety } from "./daily-safety";
import { trafficSafety } from "./traffic-safety";
import { violenceSafety } from "./violence-safety";
import { drugCyberSafety } from "./drug-cyber-safety";
import { disasterSafety } from "./disaster-safety";
import { workSafety } from "./work-safety";
import { firstaidSafety } from "./firstaid-safety";

export const allAreas: Area[] = [
  dailySafety,
  trafficSafety,
  violenceSafety,
  drugCyberSafety,
  disasterSafety,
  workSafety,
  firstaidSafety,
];

export const areaMap = new Map(allAreas.map((a) => [a.id, a]));

export function getArea(areaId: string): Area | undefined {
  return areaMap.get(areaId);
}

export function getAreaByIndex(index: number): Area | undefined {
  return allAreas[index];
}
