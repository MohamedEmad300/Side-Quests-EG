import { useState } from "react"
import { UserPlus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DoodleAvatar } from "@/components/DoodleAvatar"
import { MOCK_FRIENDS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface PartyPickerProps {
  memberIds: string[]
  onSave: (memberIds: string[]) => void
}

export function PartyPicker({ memberIds, onSave }: PartyPickerProps) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(memberIds)

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    )
  }

  function handleOpenChange(next: boolean) {
    if (next) setSelected(memberIds)
    setOpen(next)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus />
          Add party members
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gather your party</DialogTitle>
          <DialogDescription>
            Pick which fellow wanderers are joining you on this quest.
          </DialogDescription>
        </DialogHeader>

        <div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
          {MOCK_FRIENDS.map((friend) => {
            const isSelected = selected.includes(friend.id)
            return (
              <button
                key={friend.id}
                type="button"
                onClick={() => toggle(friend.id)}
                className={cn(
                  "flex items-center gap-3 rounded-xl border-2 px-3 py-2 text-left transition-colors",
                  isSelected
                    ? "border-primary bg-primary/15"
                    : "border-transparent hover:bg-muted"
                )}
              >
                <div className="relative size-8 shrink-0">
                  <DoodleAvatar seed={friend.username} />
                  <span
                    className={cn(
                      "absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-card",
                      friend.status === "online" ? "bg-olive" : "bg-muted-foreground"
                    )}
                  />
                </div>
                <span className="flex-1 truncate text-lg">{friend.username}</span>
                {isSelected && <Check className="size-4 shrink-0 text-primary" />}
              </button>
            )
          })}
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              onSave(selected)
              setOpen(false)
            }}
          >
            Save party
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
