import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { QuestCard } from "@/components/quests/QuestCard"
import { useQuests } from "@/lib/use-quests"
import { useQuestProgress } from "@/lib/use-quest-progress"
import { EGYPT_REGIONS, type Difficulty } from "@/lib/types"

const DIFFICULTY_OPTIONS: Difficulty[] = [1, 2, 3, 4, 5, 6, 7]
const TYPE_OPTIONS = ["solo", "party"] as const
type TypeFilter = (typeof TYPE_OPTIONS)[number]

export function QuestBoard() {
  const { quests } = useQuests()
  const { progress } = useQuestProgress()

  const [search, setSearch] = useState("")
  const [region, setRegion] = useState<string>("all")
  const [difficulties, setDifficulties] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  const filtered = useMemo(() => {
    return quests.filter((quest) => {
      const matchesSearch =
        search.trim().length === 0 ||
        quest.title.toLowerCase().includes(search.toLowerCase()) ||
        quest.location.name.toLowerCase().includes(search.toLowerCase())
      const matchesRegion = region === "all" || quest.location.region === region
      const matchesDifficulty =
        difficulties.length === 0 || difficulties.includes(String(quest.difficulty))
      const questType: TypeFilter = quest.partySize <= 1 ? "solo" : "party"
      const matchesType = types.length === 0 || types.includes(questType)
      return matchesSearch && matchesRegion && matchesDifficulty && matchesType
    })
  }, [quests, search, region, difficulties, types])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-display text-4xl leading-tight text-terracotta sm:text-5xl">
          The Quest Board
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Every side quest posted by the caravan. Pick one, gather your party, and go.
        </p>
      </div>

      <div className="paper-panel p-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search quests or places..."
                className="pl-10"
              />
            </div>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All regions</SelectItem>
                {EGYPT_REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="font-heading text-sm font-semibold text-muted-foreground">
                Difficulty
              </span>
              <ToggleGroup
                type="multiple"
                value={difficulties}
                onValueChange={setDifficulties}
              >
                {DIFFICULTY_OPTIONS.map((d) => (
                  <ToggleGroupItem key={d} value={String(d)} size="sm">
                    {d}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-heading text-sm font-semibold text-muted-foreground">
                Type
              </span>
              <ToggleGroup type="multiple" value={types} onValueChange={setTypes}>
                {TYPE_OPTIONS.map((t) => (
                  <ToggleGroupItem key={t} value={t} size="sm" className="capitalize">
                    {t}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="paper-panel flex flex-col items-center gap-2 py-16 text-center">
          <p className="font-heading text-base font-semibold text-muted-foreground">No quests found</p>
          <p className="text-lg text-muted-foreground">Try loosening your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((quest) => (
            <QuestCard
              key={quest.id}
              quest={quest}
              completed={progress[quest.id]?.status === "completed"}
            />
          ))}
        </div>
      )}
    </div>
  )
}
