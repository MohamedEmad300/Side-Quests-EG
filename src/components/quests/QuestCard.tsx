import { Link } from "react-router-dom"
import { MapPin, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PixelScene } from "@/components/PixelScene"
import { DifficultyBadge } from "@/components/quests/DifficultyBadge"
import { QuestTypeBadge } from "@/components/quests/QuestTypeBadge"
import type { Quest } from "@/lib/types"

interface QuestCardProps {
  quest: Quest
  completed?: boolean
}

export function QuestCard({ quest, completed = false }: QuestCardProps) {
  const cover = quest.images[0]

  return (
    <Link to={`/quests/${quest.id}`} className="block h-full">
      <Card size="sm" className="pixel-pressable group/questcard h-full cursor-pointer gap-3 py-0 transition-transform hover:-translate-y-0.5">
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b-4 border-ink">
          {cover ? (
            <img src={cover} alt="" className="size-full object-cover [image-rendering:pixelated]" />
          ) : (
            <PixelScene seed={quest.id} />
          )}
          {completed && (
            <div className="pixel-corners-sm pixel-shadow-sm absolute top-2 right-2 flex items-center gap-1 border-2 border-ink bg-scarab px-1.5 py-1 font-display text-[8px] tracking-wide text-papyrus uppercase">
              <CheckCircle2 className="size-3" />
              Done
            </div>
          )}
        </div>
        <CardHeader className="pt-3">
          <CardTitle className="line-clamp-2">{quest.title}</CardTitle>
          <div className="flex items-center gap-1 pt-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">
              {quest.location.name}, {quest.location.region}
            </span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-2 pb-3">
          <DifficultyBadge difficulty={quest.difficulty} showLabel={false} />
          <QuestTypeBadge quest={quest} />
        </CardContent>
      </Card>
    </Link>
  )
}
