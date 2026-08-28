import { useId, useMemo } from "react"
import { cn } from "@/lib/utils"
import { generatePostcard, WIDTH, HEIGHT, type Landmark } from "@/lib/postcard"

interface PostcardProps {
  seed: string
  className?: string
}

function LandmarkShape({ type, x, baseY, scale }: { type: Landmark; x: number; baseY: number; scale: number }) {
  switch (type) {
    case "pyramid": {
      const w = 46 * scale
      const h = 40 * scale
      return (
        <g>
          <polygon
            points={`${x - w / 2},${baseY} ${x + w / 2},${baseY} ${x},${baseY - h}`}
            fill="var(--ink)"
            opacity={0.55}
          />
          <polygon points={`${x},${baseY} ${x + w / 2},${baseY} ${x},${baseY - h}`} fill="var(--ink)" opacity={0.32} />
        </g>
      )
    }
    case "obelisk": {
      const w = 10 * scale
      const h = 60 * scale
      return (
        <g>
          <rect x={x - w / 2} y={baseY - h} width={w} height={h} fill="var(--kraft)" />
          <polygon
            points={`${x - w / 2},${baseY - h} ${x + w / 2},${baseY - h} ${x},${baseY - h - w * 1.4}`}
            fill="var(--ochre)"
          />
        </g>
      )
    }
    case "palm": {
      const trunkH = 46 * scale
      return (
        <g>
          <path
            d={`M ${x} ${baseY} Q ${x + 6 * scale} ${baseY - trunkH * 0.6} ${x} ${baseY - trunkH}`}
            stroke="var(--terracotta-dark)"
            strokeWidth={5 * scale}
            fill="none"
            strokeLinecap="round"
          />
          {[-1, -0.5, 0, 0.5, 1].map((dir, i) => (
            <path
              key={i}
              d={`M ${x} ${baseY - trunkH} Q ${x + dir * 32 * scale} ${baseY - trunkH - 10 * scale} ${x + dir * 40 * scale} ${baseY - trunkH + 12 * scale}`}
              stroke="var(--olive)"
              strokeWidth={5 * scale}
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </g>
      )
    }
    case "felucca": {
      const w = 60 * scale
      return (
        <g>
          <path
            d={`M ${x - w / 2} ${baseY} Q ${x} ${baseY + 10 * scale} ${x + w / 2} ${baseY} Z`}
            fill="var(--ink)"
            opacity={0.5}
          />
          <polygon
            points={`${x - 2},${baseY} ${x - 2},${baseY - 46 * scale} ${x + w * 0.42},${baseY}`}
            fill="var(--paper-soft)"
            opacity={0.85}
          />
          <line x1={x - 2} y1={baseY} x2={x - 2} y2={baseY - 50 * scale} stroke="var(--ink)" strokeWidth={2} opacity={0.5} />
        </g>
      )
    }
  }
}

/** Procedural flat-illustration postcard cover art, used when a quest has no uploaded photo. */
export function Postcard({ seed, className }: PostcardProps) {
  const scene = useMemo(() => generatePostcard(seed), [seed])
  const gradientId = useId()

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className={cn("block size-full", className)}
      role="img"
      aria-label="Generated postcard landscape"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={scene.sky[0]} />
          <stop offset="100%" stopColor={scene.sky[1]} />
        </linearGradient>
      </defs>

      <rect width={WIDTH} height={HEIGHT} fill={`url(#${gradientId})`} />

      <circle cx={scene.sun.x} cy={scene.sun.y} r={scene.sun.r * 1.7} fill="var(--paper-soft)" opacity={0.25} />
      <circle cx={scene.sun.x} cy={scene.sun.y} r={scene.sun.r} fill="var(--paper-soft)" opacity={0.85} />

      {scene.birds.map((b, i) => (
        <path
          key={i}
          d={`M ${b.x - 6} ${b.y} Q ${b.x - 3} ${b.y - 4} ${b.x} ${b.y} Q ${b.x + 3} ${b.y - 4} ${b.x + 6} ${b.y}`}
          stroke="var(--ink)"
          strokeWidth={1.5}
          fill="none"
          opacity={0.4}
          strokeLinecap="round"
        />
      ))}

      <path d={scene.hillBack.path} fill={scene.hillBack.color} opacity={0.75} />

      <LandmarkShape {...scene.landmark} />

      <path d={scene.hillFront.path} fill={scene.hillFront.color} />
    </svg>
  )
}
