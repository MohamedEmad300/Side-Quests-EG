import { User, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Quest } from "@/lib/types"

interface QuestTypeBadgeProps {
  quest: Pick<Quest, "type" | "recommendedPartySize">
}

export function QuestTypeBadge({ quest }: QuestTypeBadgeProps) {
  if (quest.type === "solo") {
    return (
      <Badge variant="outline" className="border-lapis text-lapis">
        <User className="size-3" />
        Solo
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="border-turquoise text-turquoise">
      <Users className="size-3" />
      Party of {quest.recommendedPartySize ?? 2}
    </Badge>
  )
}
