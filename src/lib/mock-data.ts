import type { Friend, Quest, QuestProgress, User } from "@/lib/types"

export const CURRENT_USER: User = {
  id: "u-you",
  username: "Khalid_R",
  title: "Relic Raider",
  bio: "Weekend explorer chasing every side quest Egypt has to offer.",
  joinedAt: "2025-11-02T00:00:00.000Z",
}

export const MOCK_FRIENDS: Friend[] = [
  { id: "f-nour", username: "Nour_the_Wanderer", status: "online" },
  { id: "f-omar", username: "Omar_Sails", status: "online" },
  { id: "f-layla", username: "Layla_Scout", status: "offline" },
  { id: "f-kareem", username: "Kareem_Digger", status: "online" },
  { id: "f-mona", username: "Mona_Mapmaker", status: "offline" },
  { id: "f-yusuf", username: "Yusuf_Falcon", status: "online" },
]

export const MOCK_QUESTS: Quest[] = [
  {
    id: "q-giza-sunrise",
    title: "Sunrise at the Giza Plateau",
    description:
      "Arrive before dawn and watch the sun crest over the pyramids of Giza. Snap a photo from the panorama point before the tour buses arrive.",
    images: [],
    location: { name: "Giza Plateau", region: "Giza" },
    difficulty: 1,
    partySize: 1,
    createdBy: "f-nour",
    createdAt: "2026-06-01T05:00:00.000Z",
  },
  {
    id: "q-khan-bazaar",
    title: "Haggle in Khan el-Khalili",
    description:
      "Navigate the maze of Khan el-Khalili bazaar and haggle a local artisan down at least 30% on a handmade souvenir. Bonus points for learning the seller's name.",
    images: [],
    location: { name: "Khan el-Khalili", region: "Cairo" },
    difficulty: 2,
    partySize: 3,
    createdBy: "f-omar",
    createdAt: "2026-06-03T14:00:00.000Z",
  },
  {
    id: "q-white-desert",
    title: "Camp Among the Chalk Formations",
    description:
      "Trek into the White Desert and spend a night camping beside the wind-carved chalk formations. Cook dinner over an open fire under a sky with zero light pollution.",
    images: [],
    location: { name: "White Desert", region: "Fayoum" },
    difficulty: 4,
    partySize: 4,
    createdBy: "f-kareem",
    createdAt: "2026-05-20T18:30:00.000Z",
  },
  {
    id: "q-nile-felucca",
    title: "Sail the Nile by Felucca",
    description:
      "Charter a traditional felucca sailboat in Aswan and drift past Elephantine Island as the sun sets. No motor, no schedule -- just wind and the river.",
    images: [],
    location: { name: "Aswan Corniche", region: "Aswan" },
    difficulty: 2,
    partySize: 2,
    createdBy: "f-mona",
    createdAt: "2026-05-28T16:00:00.000Z",
  },
  {
    id: "q-valley-of-kings",
    title: "Descend Into the Valley of the Kings",
    description:
      "Tour at least three tombs in the Valley of the Kings and sketch a hieroglyph you can't identify -- then research what it means afterward.",
    images: [],
    location: { name: "Valley of the Kings", region: "Luxor" },
    difficulty: 3,
    partySize: 1,
    createdBy: "f-yusuf",
    createdAt: "2026-06-05T09:00:00.000Z",
  },
  {
    id: "q-siwa-springs",
    title: "Float in Siwa's Salt Springs",
    description:
      "Make the long trip out to the Siwa Oasis and float, weightless, in one of its mineral-rich salt springs. Watch the stars come out from the water.",
    images: [],
    location: { name: "Cleopatra's Spring", region: "Siwa" },
    difficulty: 3,
    partySize: 1,
    createdBy: "f-nour",
    createdAt: "2026-05-15T12:00:00.000Z",
  },
  {
    id: "q-dahab-blue-hole",
    title: "Dive the Blue Hole",
    description:
      "Get certified or bring your cert card and dive Dahab's Blue Hole with a licensed guide. Log the dive with depth and marine life spotted.",
    images: [],
    location: { name: "Blue Hole", region: "Dahab" },
    difficulty: 6,
    partySize: 3,
    createdBy: "f-omar",
    createdAt: "2026-05-10T07:45:00.000Z",
  },
  {
    id: "q-alex-library",
    title: "Read a Chapter at the Bibliotheca",
    description:
      "Spend an afternoon inside the Bibliotheca Alexandrina, find a book in a language you don't speak, and read one page anyway.",
    images: [],
    location: { name: "Bibliotheca Alexandrina", region: "Alexandria" },
    difficulty: 1,
    partySize: 1,
    createdBy: "f-layla",
    createdAt: "2026-06-08T11:00:00.000Z",
  },
  {
    id: "q-abu-simbel",
    title: "Witness the Sun Festival Alignment",
    description:
      "Time your visit to Abu Simbel for the biannual solar alignment, when sunlight reaches deep into the temple to illuminate the inner sanctuary statues.",
    images: [],
    location: { name: "Abu Simbel", region: "Aswan" },
    difficulty: 7,
    partySize: 4,
    createdBy: "f-mona",
    createdAt: "2026-05-02T06:00:00.000Z",
  },
]

export function getFriendById(id: string): Friend | undefined {
  return MOCK_FRIENDS.find((f) => f.id === id)
}

export function getUsernameById(id: string): string {
  if (id === CURRENT_USER.id) return CURRENT_USER.username
  return getFriendById(id)?.username ?? "Unknown Wanderer"
}

export const SEED_PROGRESS: QuestProgress[] = [
  {
    questId: "q-alex-library",
    status: "completed",
    partyMemberIds: [],
    joinedAt: "2026-06-09T11:00:00.000Z",
    completedAt: "2026-06-09T15:00:00.000Z",
  },
  {
    questId: "q-nile-felucca",
    status: "completed",
    partyMemberIds: ["f-omar", "f-yusuf"],
    joinedAt: "2026-05-29T10:00:00.000Z",
    completedAt: "2026-05-29T19:00:00.000Z",
  },
  {
    questId: "q-khan-bazaar",
    status: "active",
    partyMemberIds: ["f-layla"],
    joinedAt: "2026-07-01T10:00:00.000Z",
  },
]
