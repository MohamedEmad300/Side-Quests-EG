export type Difficulty = 1 | 2 | 3 | 4 | 5 | 6 | 7

export interface QuestLocation {
  name: string
  region: EgyptRegion
}

export const EGYPT_REGIONS = [
  "Cairo",
  "Giza",
  "Alexandria",
  "Luxor",
  "Aswan",
  "Siwa",
  "Dahab",
  "Sharm El-Sheikh",
  "Fayoum",
  "Sinai",
] as const

export type EgyptRegion = (typeof EGYPT_REGIONS)[number]

export interface Quest {
  id: string
  title: string
  description: string
  images: string[]
  location: QuestLocation
  difficulty: Difficulty
  /** Recommended party size, 1-100. A size of 1 means the quest is solo. */
  partySize: number
  createdBy: string
  createdAt: string
}

export interface User {
  id: string
  username: string
  title: string
  bio: string
  joinedAt: string
}

export interface Friend {
  id: string
  username: string
  status: "online" | "offline"
}

export type QuestStatus = "active" | "completed"

export interface QuestProgress {
  questId: string
  status: QuestStatus
  partyMemberIds: string[]
  joinedAt: string
  completedAt?: string
}

export const DIFFICULTY_LEVELS: Record<
  Difficulty,
  { label: string; rank: string; color: string }
> = {
  1: { label: "First Steps", rank: "F", color: "var(--difficulty-1)" },
  2: { label: "Wanderer", rank: "E", color: "var(--difficulty-2)" },
  3: { label: "Explorer", rank: "D", color: "var(--difficulty-3)" },
  4: { label: "Adventurer", rank: "C", color: "var(--difficulty-4)" },
  5: { label: "Relic Raider", rank: "B", color: "var(--difficulty-5)" },
  6: { label: "Trailblazer", rank: "A", color: "var(--difficulty-6)" },
  7: { label: "Pharaoh's Trial", rank: "S", color: "var(--difficulty-7)" },
}
