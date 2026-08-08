import { useSyncExternalStore } from "react"
import { createStore } from "@/lib/create-store"
import { MOCK_QUESTS } from "@/lib/mock-data"
import type { Quest } from "@/lib/types"

const store = createStore<Quest[]>("quests", MOCK_QUESTS)

export function useQuests() {
  const quests = useSyncExternalStore(store.subscribe, store.get)

  function addQuest(quest: Quest) {
    store.set([quest, ...store.get()])
  }

  return { quests, addQuest }
}

export function useQuest(id: string | undefined) {
  const quests = useSyncExternalStore(store.subscribe, store.get)
  return quests.find((q) => q.id === id)
}
