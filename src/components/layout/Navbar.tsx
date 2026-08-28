import { NavLink } from "react-router-dom"
import { useTheme } from "next-themes"
import { Compass, Plus, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DoodleAvatar } from "@/components/DoodleAvatar"
import { CURRENT_USER } from "@/lib/mock-data"

const NAV_LINKS = [
  { to: "/", label: "Quest Board", end: true },
  { to: "/quests/new", label: "New Quest", end: false },
]

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <header className="paper-border sticky top-0 z-40 border-x-0 border-t-0 bg-card/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <NavLink to="/" className="flex shrink-0 items-center gap-2">
          <Compass className="size-7 text-terracotta" />
          <span className="font-display text-2xl leading-none text-foreground sm:text-3xl">
            Side Quests <span className="text-terracotta">EG</span>
          </span>
        </NavLink>

        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                cn(
                  "hidden rounded-lg font-heading text-sm font-semibold transition-colors sm:inline-flex sm:items-center sm:gap-1.5 sm:px-3 sm:py-2",
                  isActive ? "text-terracotta" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {link.label === "New Quest" && <Plus className="size-3.5" />}
              {link.label}
            </NavLink>
          ))}

          <Button asChild size="icon-sm" className="sm:hidden">
            <NavLink to="/quests/new" aria-label="New quest">
              <Plus />
            </NavLink>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {resolvedTheme === "dark" ? <Sun /> : <Moon />}
          </Button>

          <NavLink to="/profile" aria-label="Your profile" className="ml-1 size-9 shrink-0">
            <DoodleAvatar seed={CURRENT_USER.username} />
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
