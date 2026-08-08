import { useSyncExternalStore } from "react"
import { createStore } from "@/lib/create-store"
import { SEED_PROGRESS } from "@/lib/mock-data"
import type { QuestProgress } from "@/lib/types"

type ProgressMap = Record<string, QuestProgress>

const seeded: ProgressMap = Object.fromEntries(
  SEED_PROGRESS.map((p) => [p.questId, p])
)

const store = createStore<ProgressMap>("progress", seeded)

function ensure(map: ProgressMap, questId: string): QuestProgress {
  return (
    map[questId] ?? {
      questId,
      status: "active",
      partyMemberIds: [],
      joinedAt: new Date().toISOString(),
    }
  )
}

export function useQuestProgress() {
  const progress = useSyncExternalStore(store.subscribe, store.get)

  function join(questId: string) {
    const map = store.get()
    if (map[questId]) return
    store.set({ ...map, [questId]: ensure(map, questId) })
  }

  function setPartyMembers(questId: string, memberIds: string[]) {
    const map = store.get()
    const current = ensure(map, questId)
    store.set({ ...map, [questId]: { ...current, partyMemberIds: memberIds } })
  }

  function markComplete(questId: string) {
    const map = store.get()
    const current = ensure(map, questId)
    store.set({
      ...map,
      [questId]: { ...current, status: "completed", completedAt: new Date().toISOString() },
    })
  }

  function reopen(questId: string) {
    const map = store.get()
    const current = ensure(map, questId)
    store.set({
      ...map,
      [questId]: { ...current, status: "active", completedAt: undefined },
    })
  }

  return { progress, join, setPartyMembers, markComplete, reopen }
}
