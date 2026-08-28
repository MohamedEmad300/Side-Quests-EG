import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { generateDoodleAvatar } from "@/lib/doodle-avatar"

interface DoodleAvatarProps {
  seed: string
  className?: string
}

/** Renders a deterministic, seed-based "blob sticker" avatar -- no network image required. */
export function DoodleAvatar({ seed, className }: DoodleAvatarProps) {
  const { path, colorVar, size, initial } = useMemo(() => generateDoodleAvatar(seed), [seed])

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={cn("block size-full", className)}
      role="img"
      aria-label={`${seed} avatar`}
    >
      <path d={path} fill={`var(${colorVar})`} />
      <text
        x="50%"
        y="53%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#fdf6e9"
        fontFamily="'Zilla Slab', ui-serif, serif"
        fontWeight={700}
        fontSize={size * 0.4}
      >
        {initial}
      </text>
    </svg>
  )
}
