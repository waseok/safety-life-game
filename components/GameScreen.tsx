"use client";

import { useGameStore } from "@/store/useGameStore";
import TitleScreen from "./TitleScreen";
import CharacterSelect from "./CharacterSelect";
import IntroScreen from "./IntroScreen";
import AreaSelect from "./AreaSelect";
import AreaIntro from "./AreaIntro";
import SituationView from "./SituationView";
import FeedbackOverlay from "./FeedbackOverlay";
import EndingScreen from "./EndingScreen";

export default function GameScreen() {
  const phase = useGameStore((s) => s.phase);

  switch (phase) {
    case "title":
      return <TitleScreen />;
    case "character-select":
      return <CharacterSelect />;
    case "intro":
      return <IntroScreen />;
    case "area-select":
      return <AreaSelect />;
    case "area-intro":
      return <AreaIntro />;
    case "playing":
      return <SituationView />;
    case "feedback":
      return <FeedbackOverlay />;
    case "ending":
      return <EndingScreen />;
    default:
      return <TitleScreen />;
  }
}
