import { useRef, useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { ImagePlus, Triangle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useQuests } from "@/lib/use-quests"
import { cn, slugify } from "@/lib/utils"
import { CURRENT_USER } from "@/lib/mock-data"
import {
  DIFFICULTY_LEVELS,
  EGYPT_REGIONS,
  type Difficulty,
  type EgyptRegion,
  type QuestType,
} from "@/lib/types"

const MAX_IMAGES = 4

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function CreateQuest() {
  const navigate = useNavigate()
  const { addQuest } = useQuests()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [locationName, setLocationName] = useState("")
  const [region, setRegion] = useState<EgyptRegion | "">("")
  const [difficulty, setDifficulty] = useState<Difficulty>(1)
  const [type, setType] = useState<QuestType>("solo")
  const [recommendedPartySize, setRecommendedPartySize] = useState(2)
  const [images, setImages] = useState<string[]>([])

  const canSubmit =
    title.trim().length > 0 && description.trim().length > 0 && locationName.trim().length > 0 && region

  async function handleFiles(fileList: FileList | null) {
    if (!fileList) return
    const remaining = MAX_IMAGES - images.length
    if (remaining <= 0) {
      toast.error(`You can attach up to ${MAX_IMAGES} pictures.`)
      return
    }
    const files = Array.from(fileList).slice(0, remaining)
    const dataUrls = await Promise.all(files.map(readAsDataUrl))
    setImages((prev) => [...prev, ...dataUrls])
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit || !region) return

    const id = `${slugify(title)}-${Date.now().toString(36)}`

    addQuest({
      id,
      title: title.trim(),
      description: description.trim(),
      images,
      location: { name: locationName.trim(), region },
      difficulty,
      type,
      recommendedPartySize: type === "party" ? recommendedPartySize : undefined,
      createdBy: CURRENT_USER.id,
      createdAt: new Date().toISOString(),
    })

    toast.success("Quest posted!", {
      description: `"${title.trim()}" is now live on the board.`,
    })
    navigate(`/quests/${id}`)
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <div>
        <h1 className="font-display text-4xl leading-tight text-terracotta sm:text-5xl">
          Post a New Quest
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Describe the adventure, mark it on the map, and set its difficulty.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="paper-panel flex flex-col gap-6 p-5 sm:p-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">Quest title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sunrise at the Giza Plateau"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's the adventure? What should they bring back as proof?"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location name</Label>
            <Input
              id="location"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Khan el-Khalili"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="region">Region</Label>
            <Select value={region} onValueChange={(v) => setRegion(v as EgyptRegion)}>
              <SelectTrigger id="region" className="w-full">
                <SelectValue placeholder="Choose a region" />
              </SelectTrigger>
              <SelectContent>
                {EGYPT_REGIONS.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Difficulty grade</Label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {([1, 2, 3, 4, 5] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  aria-label={`Difficulty ${d}`}
                  className="p-1"
                >
                  <Triangle
                    className="size-5"
                    style={{
                      fill: d <= difficulty ? DIFFICULTY_LEVELS[difficulty].color : "transparent",
                      color: d <= difficulty ? DIFFICULTY_LEVELS[difficulty].color : "var(--muted-foreground)",
                      opacity: d <= difficulty ? 1 : 0.5,
                    }}
                  />
                </button>
              ))}
            </div>
            <span
              className="font-heading text-sm font-semibold"
              style={{ color: DIFFICULTY_LEVELS[difficulty].color }}
            >
              {DIFFICULTY_LEVELS[difficulty].label}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Quest type</Label>
          <ToggleGroup
            type="single"
            value={type}
            onValueChange={(v) => v && setType(v as QuestType)}
          >
            <ToggleGroupItem value="solo">Solo</ToggleGroupItem>
            <ToggleGroupItem value="party">Party</ToggleGroupItem>
          </ToggleGroup>
        </div>

        {type === "party" && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="party-size">Recommended party size</Label>
            <Input
              id="party-size"
              type="number"
              min={2}
              max={8}
              value={recommendedPartySize}
              onChange={(e) => setRecommendedPartySize(Number(e.target.value) || 2)}
              className="w-28"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label>Pictures (optional)</Label>
          <div className="flex flex-wrap gap-3">
            {images.map((src, i) => (
              <div key={i} className="relative size-20 overflow-hidden rounded-xl border border-border">
                <img src={src} alt="" className="size-full object-cover" />
                <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute -top-2 -right-2 flex size-5 items-center justify-center rounded-full border-2 border-card bg-destructive text-primary-foreground"
                  aria-label="Remove image"
                >
                  <X className="size-3" />
                </button>
              </div>
            ))}
            {images.length < MAX_IMAGES && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "flex size-20 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-ring hover:text-foreground"
                )}
              >
                <ImagePlus className="size-5" />
                <span className="text-xs">Add</span>
              </button>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              void handleFiles(e.target.files)
              e.target.value = ""
            }}
          />
          <p className="text-sm text-muted-foreground">
            Up to {MAX_IMAGES} pictures. No photo? We'll generate postcard cover art instead.
          </p>
        </div>

        <Button type="submit" size="lg" disabled={!canSubmit} className="self-start">
          Post quest
        </Button>
      </form>
    </div>
  )
}
