import { useMemo, type ReactNode } from "react"
import { Trophy, Compass, Users, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PixelAvatar } from "@/components/PixelAvatar"
import { QuestCard } from "@/components/quests/QuestCard"
import { useQuests } from "@/lib/use-quests"
import { useQuestProgress } from "@/lib/use-quest-progress"
import { CURRENT_USER } from "@/lib/mock-data"

export function Profile() {
  const { quests } = useQuests()
  const { progress } = useQuestProgress()

  const { completedQuests, activeQuests, partyQuestsJoined } = useMemo(() => {
    const entries = Object.values(progress)
    const completed = entries.filter((p) => p.status === "completed")
    const active = entries.filter((p) => p.status === "active")
    const withParty = entries.filter((p) => p.partyMemberIds.length > 0)

    return {
      completedQuests: completed
        .map((p) => quests.find((q) => q.id === p.questId))
        .filter((q): q is NonNullable<typeof q> => Boolean(q)),
      activeQuests: active
        .map((p) => quests.find((q) => q.id === p.questId))
        .filter((q): q is NonNullable<typeof q> => Boolean(q)),
      partyQuestsJoined: withParty.length,
    }
  }, [quests, progress])

  const joinedDate = new Date(CURRENT_USER.joinedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="pixel-border pixel-corners pixel-shadow flex flex-col gap-6 bg-card p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="pixel-corners size-24 shrink-0 self-center border-4 border-ink sm:self-auto">
          <PixelAvatar seed={CURRENT_USER.username} />
        </div>
        <div className="flex flex-1 flex-col gap-2 text-center sm:text-left">
          <h1 className="font-display text-base tracking-wide sm:text-lg">
            {CURRENT_USER.username}
          </h1>
          <span className="font-display text-[10px] tracking-wide text-gold uppercase">
            {CURRENT_USER.title}
          </span>
          <p className="text-lg text-muted-foreground">{CURRENT_USER.bio}</p>
          <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
            <Calendar className="size-3.5" />
            Wandering since {joinedDate}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile
          icon={<Trophy className="size-5 text-gold" />}
          label="Quests completed"
          value={completedQuests.length}
        />
        <StatTile
          icon={<Compass className="size-5 text-lapis" />}
          label="Active quests"
          value={activeQuests.length}
        />
        <StatTile
          icon={<Users className="size-5 text-turquoise" />}
          label="Party quests joined"
          value={partyQuestsJoined}
        />
      </div>

      <Tabs defaultValue="completed">
        <TabsList>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
        </TabsList>

        <TabsContent value="completed" className="mt-4">
          {completedQuests.length === 0 ? (
            <EmptyState message="No completed quests yet. Go make some history." />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {completedQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} completed />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="mt-4">
          {activeQuests.length === 0 ? (
            <EmptyState message="No active quests. Head to the board and start one." />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeQuests.map((quest) => (
                <QuestCard key={quest.id} quest={quest} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function StatTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: number
}) {
  return (
    <div className="pixel-border pixel-corners flex items-center gap-3 bg-card p-4">
      {icon}
      <div className="flex flex-col">
        <span className="font-display text-lg leading-none">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="pixel-border pixel-corners flex flex-col items-center gap-2 bg-card py-16 text-center">
      <p className="text-lg text-muted-foreground">{message}</p>
    </div>
  )
}
