import { Route, Routes } from "react-router-dom"
import { Navbar } from "@/components/layout/Navbar"
import { QuestBoard } from "@/pages/QuestBoard"
import { QuestDetail } from "@/pages/QuestDetail"
import { CreateQuest } from "@/pages/CreateQuest"
import { Profile } from "@/pages/Profile"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<QuestBoard />} />
          <Route path="/quests/new" element={<CreateQuest />} />
          <Route path="/quests/:questId" element={<QuestDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
