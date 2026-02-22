"use client";

import { useState } from "react";

const GRADIENT_PALETTES = [
  ["#1e3a5f", "#2d6a9f", "#4a90d9"],
  ["#2d1b4e", "#5b3a8c", "#8b5cf6"],
  ["#1a3c34", "#2d7a5f", "#4ade80"],
  ["#3b1f1f", "#8b3a3a", "#ef4444"],
  ["#3b2f1f", "#8b6a3a", "#f59e0b"],
  ["#1f2d3b", "#3a5f8b", "#38bdf8"],
  ["#2d1f3b", "#5f3a8b", "#a78bfa"],
  ["#1f3b2d", "#3a8b5f", "#34d399"],
];

const AREA_ICONS: Record<string, string> = {
  facility: "🏢",
  fire: "🔥",
  "electric-gas": "⚡",
  traffic: "🚗",
  violence: "🛡️",
  drug: "💊",
  disaster: "🌊",
  work: "🏗️",
  firstaid: "🏥",
};

interface Props {
  src: string;
  alt: string;
  subAreaId?: string;
  className?: string;
  overlay?: boolean;
}

export default function IllustrationCard({
  src,
  alt,
  subAreaId,
  className = "",
  overlay = true,
}: Props) {
  const [imgError, setImgError] = useState(true);

  const hash = src.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const palette = GRADIENT_PALETTES[hash % GRADIENT_PALETTES.length];
  const icon = subAreaId ? AREA_ICONS[subAreaId] || "🎯" : "🎯";

  return (
    <div className={`illustration-frame ${className}`}>
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center relative"
          style={{
            background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 50%, ${palette[2]} 100%)`,
          }}
        >
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 40%)`,
              }}
            />
          </div>

          <div className="text-center z-10">
            <div className="text-6xl md:text-7xl mb-3 drop-shadow-lg">{icon}</div>
            <p className="text-white/70 text-sm md:text-base font-medium px-4 max-w-xs">
              {alt}
            </p>
          </div>
        </div>
      )}

      {overlay && (
        <div className="gradient-overlay pointer-events-none" />
      )}
    </div>
  );
}
