import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { generatePixelScene } from "@/lib/pixel-scene"

interface PixelSceneProps {
  seed: string
  className?: string
}

/** Procedural desert-landscape cover art, used when a quest has no uploaded photo. */
export function PixelScene({ seed, className }: PixelSceneProps) {
  const { grid, width, height } = useMemo(() => generatePixelScene(seed), [seed])

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      shapeRendering="crispEdges"
      preserveAspectRatio="none"
      className={cn("block size-full", className)}
      role="img"
      aria-label="Generated quest landscape"
    >
      {grid.map((row, y) =>
        row.map((color, x) => (
          <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />
        ))
      )}
    </svg>
  )
}
