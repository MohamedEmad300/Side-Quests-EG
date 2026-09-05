import { User, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Quest } from "@/lib/types"

interface QuestTypeBadgeProps {
  quest: Pick<Quest, "partySize">
}

export function QuestTypeBadge({ quest }: QuestTypeBadgeProps) {
  if (quest.partySize <= 1) {
    return (
      <Badge variant="outline" className="border-teal text-teal">
        <User className="size-3" />
        Solo
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="border-terracotta text-terracotta">
      <Users className="size-3" />
      Party of {quest.partySize}
    </Badge>
  )
}
