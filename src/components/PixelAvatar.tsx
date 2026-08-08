import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { generatePixelAvatar } from "@/lib/pixel-avatar"

interface PixelAvatarProps {
  seed: string
  className?: string
}

/** Renders a deterministic, seed-based pixel-art identicon -- no network image required. */
export function PixelAvatar({ seed, className }: PixelAvatarProps) {
  const { grid, colorVar, size } = useMemo(() => generatePixelAvatar(seed), [seed])

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      shapeRendering="crispEdges"
      className={cn("block size-full", className)}
      role="img"
      aria-label={`${seed} avatar`}
    >
      <rect width={size} height={size} fill="var(--muted)" />
      {grid.map((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={`var(${colorVar})`}
            />
          ) : null
        )
      )}
    </svg>
  )
}
