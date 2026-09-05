import { useParams, Link } from "react-router-dom"
import { toast } from "sonner"
import { MapPin, ArrowLeft, Flag, CheckCircle2, RotateCcw, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Postcard } from "@/components/Postcard"
import { DoodleAvatar } from "@/components/DoodleAvatar"
import { DifficultyBadge } from "@/components/quests/DifficultyBadge"
import { QuestTypeBadge } from "@/components/quests/QuestTypeBadge"
import { PartyPicker } from "@/components/quests/PartyPicker"
import { useQuest } from "@/lib/use-quests"
import { useQuestProgress } from "@/lib/use-quest-progress"
import { CURRENT_USER, getUsernameById } from "@/lib/mock-data"

export function QuestDetail() {
  const { questId } = useParams<{ questId: string }>()
  const quest = useQuest(questId)
  const { progress, join, setPartyMembers, markComplete, reopen } = useQuestProgress()

  if (!quest) {
    return (
      <div className="paper-panel flex flex-col items-center gap-3 py-16 text-center">
        <p className="font-heading text-lg font-semibold">Quest not found</p>
        <Button asChild variant="outline" size="sm">
          <Link to="/">
            <ArrowLeft />
            Back to the board
          </Link>
        </Button>
      </div>
    )
  }

  const { id: questIdSafe, title } = quest
  const questProgress = progress[questIdSafe]
  const status = questProgress?.status
  const partyMemberIds = questProgress?.partyMemberIds ?? []
  const recommended = quest.partySize
  const currentPartySize = 1 + partyMemberIds.length

  function handleStart() {
    join(questIdSafe)
    toast.success("Quest accepted!", {
      description: `"${title}" was added to your active quests.`,
    })
  }

  function handleComplete() {
    markComplete(questIdSafe)
    toast.success("Quest complete!", {
      description: `You conquered "${title}". Well done, wanderer.`,
    })
  }

  function handleReopen() {
    reopen(questIdSafe)
    toast("Quest reopened", { description: "Back on your active list." })
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        to="/"
        className="flex w-fit items-center gap-1.5 font-heading text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Quest board
      </Link>

      <div className="paper-panel overflow-hidden">
        <div className="relative aspect-[21/9] w-full">
          {quest.images[0] ? (
            <img src={quest.images[0]} alt="" className="size-full object-cover" />
          ) : (
            <Postcard seed={quest.id} />
          )}
        </div>

        <div className="flex flex-col gap-6 p-5 sm:p-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <QuestTypeBadge quest={quest} />
              {status === "completed" && (
                <span className="flex items-center gap-1 rounded-full bg-olive px-2.5 py-1 font-heading text-xs font-semibold text-primary-foreground">
                  <CheckCircle2 className="size-3.5" />
                  Completed
                </span>
              )}
            </div>
            <h1 className="font-display text-4xl leading-tight sm:text-5xl">{quest.title}</h1>
            <div className="flex items-center gap-1.5 text-lg text-muted-foreground">
              <MapPin className="size-4 shrink-0" />
              {quest.location.name}, {quest.location.region}
            </div>
            <DifficultyBadge difficulty={quest.difficulty} />
          </div>

          <Separator />

          <p className="max-w-prose text-xl leading-relaxed">{quest.description}</p>

          <p className="text-sm text-muted-foreground">
            Posted by{" "}
            <span className="font-heading text-sm font-semibold text-foreground">
              {getUsernameById(quest.createdBy)}
            </span>
          </p>

          {quest.partySize > 1 && status && (
            <>
              <Separator />
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="flex items-center gap-2 font-heading text-base font-semibold">
                    <Users className="size-4 text-teal" />
                    Your party
                  </h2>
                  <span
                    className={
                      currentPartySize >= recommended
                        ? "font-heading text-sm font-semibold text-olive"
                        : "font-heading text-sm font-semibold text-muted-foreground"
                    }
                  >
                    {currentPartySize} / {recommended} recommended
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className="size-11">
                      <DoodleAvatar seed={CURRENT_USER.username} />
                    </div>
                    <span className="text-xs text-muted-foreground">You</span>
                  </div>
                  {partyMemberIds.map((id) => (
                    <div key={id} className="flex flex-col items-center gap-1">
                      <div className="size-11">
                        <DoodleAvatar seed={getUsernameById(id)} />
                      </div>
                      <span className="max-w-14 truncate text-xs text-muted-foreground">
                        {getUsernameById(id)}
                      </span>
                    </div>
                  ))}
                </div>

                {status !== "completed" && (
                  <div>
                    <PartyPicker
                      memberIds={partyMemberIds}
                      onSave={(ids) => setPartyMembers(quest.id, ids)}
                    />
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          <div className="flex flex-wrap gap-3">
            {!status && (
              <Button onClick={handleStart}>
                <Flag />
                Start quest
              </Button>
            )}
            {status === "active" && (
              <Button onClick={handleComplete}>
                <CheckCircle2 />
                Mark complete
              </Button>
            )}
            {status === "completed" && (
              <Button variant="outline" onClick={handleReopen}>
                <RotateCcw />
                Reopen quest
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
