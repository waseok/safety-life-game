export interface Character {
  id: string;
  name: string;
  age: number;
  description: string;
  image: string;
  traits: string[];
  initialLife: number;
  initialMental: number;
}

export interface Background {
  characterId: string;
  title: string;
  body: string;
  image: string;
}

export interface Choice {
  id: string;
  text: string;
  lifeDelta: number;
  mentalDelta: number;
  feedback: string;
  isCorrect: boolean;
}

export interface Situation {
  id: string;
  areaId: string;
  subAreaId: string;
  order: number;
  title: string;
  body: string;
  image: string;
  choices: Choice[];
}

export interface SubArea {
  id: string;
  title: string;
  description: string;
}

export interface Area {
  id: string;
  title: string;
  icon: string;
  order: number;
  description: string;
  coverImage: string;
  color: string;
  subAreas: SubArea[];
  situations: Situation[];
}

export interface Ending {
  id: string;
  type: "good" | "normal" | "bad" | "gameover";
  title: string;
  body: string;
  image: string;
  minLife: number;
  minMental: number;
}

export type GamePhase =
  | "title"
  | "character-select"
  | "intro"
  | "area-select"
  | "area-intro"
  | "playing"
  | "feedback"
  | "ending";

export interface ChoiceRecord {
  situationId: string;
  choiceId: string;
  lifeDelta: number;
  mentalDelta: number;
  isCorrect: boolean;
}

export interface GameState {
  phase: GamePhase;
  selectedCharacter: Character | null;
  currentAreaIndex: number;
  currentSituationIndex: number;
  life: number;
  mental: number;
  maxLife: number;
  maxMental: number;
  completedSituations: string[];
  choiceHistory: ChoiceRecord[];
  lastChoice: Choice | null;
  isGameOver: boolean;
}
