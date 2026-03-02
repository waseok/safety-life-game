"use client";

import { useCallback } from "react";

let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioCtx;
}

function playTone(
  frequencies: number[],
  durations: number[],
  type: OscillatorType = "sine",
  volumeScale = 0.3
) {
  const ctx = getAudioCtx();
  if (!ctx) return;

  let startTime = ctx.currentTime;
  frequencies.forEach((freq, i) => {
    const dur = durations[i] ?? 0.1;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volumeScale, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + dur);

    startTime += dur * 0.9;
  });
}

export function useSound() {
  const playClick = useCallback(() => {
    playTone([600], [0.08], "sine", 0.15);
  }, []);

  const playCorrect = useCallback(() => {
    // C5 → E5 → G5 상승 음계
    playTone([523, 659, 784], [0.12, 0.12, 0.22], "sine", 0.3);
  }, []);

  const playIncorrect = useCallback(() => {
    // Buzzer 느낌 - 낮은 하강음
    playTone([300, 220], [0.18, 0.28], "sawtooth", 0.18);
  }, []);

  const playAreaComplete = useCallback(() => {
    // 팡파르 - 상승 화음
    playTone([523, 659, 784, 1047], [0.1, 0.1, 0.1, 0.35], "sine", 0.3);
    setTimeout(() => {
      playTone([784, 1047], [0.15, 0.45], "sine", 0.25);
    }, 400);
  }, []);

  return { playClick, playCorrect, playIncorrect, playAreaComplete };
}
