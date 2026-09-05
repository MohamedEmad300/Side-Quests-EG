import { Triangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { DIFFICULTY_LEVELS, type Difficulty } from "@/lib/types"

interface DifficultyBadgeProps {
  difficulty: Difficulty
  showLabel?: boolean
  className?: string
}

export function DifficultyBadge({ difficulty, showLabel = true, className }: DifficultyBadgeProps) {
  const { label, rank, color } = DIFFICULTY_LEVELS[difficulty]

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5" title={`${rank}-Rank -- ${label}`}>
        {([1, 2, 3, 4, 5, 6, 7] as Difficulty[]).map((pip) => (
          <Triangle
            key={pip}
            className="size-2.5"
            style={{
              fill: pip <= difficulty ? color : "transparent",
              color: pip <= difficulty ? color : "var(--muted-foreground)",
              opacity: pip <= difficulty ? 1 : 0.4,
            }}
          />
        ))}
      </div>
      {showLabel && (
        <span className="font-heading text-sm font-semibold" style={{ color }}>
          {rank}-Rank &middot; {label}
        </span>
      )}
    </div>
  )
}
