export type Difficulty = 1 | 2 | 3 | 4 | 5

export type QuestType = "solo" | "party"

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
  type: QuestType
  recommendedPartySize?: number
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
  { label: string; color: string }
> = {
  1: { label: "Papyrus Novice", color: "var(--difficulty-1)" },
  2: { label: "Desert Wanderer", color: "var(--difficulty-2)" },
  3: { label: "Tomb Explorer", color: "var(--difficulty-3)" },
  4: { label: "Relic Raider", color: "var(--difficulty-4)" },
  5: { label: "Pharaoh's Trial", color: "var(--difficulty-5)" },
}
