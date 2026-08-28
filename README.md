# Side Quests EG

Side Quests EG is a web app for discovering and posting personalized "side quests" — small, real-world adventures and challenges to complete around Egypt. Browse quests by region, difficulty, and type, post your own, gather a party for group quests, and track what you've completed on your profile.

## Features

- **Browse & filter quests** — search by title or location, and filter by region, difficulty, and quest type.
- **Post a quest** — add a title, description, location, difficulty grade, and up to four photos.
- **Solo or party quests** — party quests carry a recommended party size; you can pick teammates from your friends list.
- **Progress tracking** — start, complete, or reopen quests, with your history visible on your profile.
- **Profile page** — view your completed and active quests, and party quests you've joined.
- **Light/dark themes** — a warm "Sunlit Study" theme and a cozy "Lamplit Study" theme for evening use.
- **Fully offline demo data** — quest cover art and avatars are generated procedurally from a seed, so the app never depends on external images or APIs.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) on [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) for client-side routing
- [Tailwind CSS v4](https://tailwindcss.com/) with a custom design system
- [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives) for accessible components
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications
- Local persistence via `localStorage` — no backend required to run the app

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── layout/        # App shell (navbar)
│   ├── quests/         # Quest-specific components (cards, badges, party picker)
│   └── ui/              # shadcn/ui primitives
├── lib/                 # Types, mock data, storage, and state hooks
├── pages/                # Route-level views (board, detail, create, profile)
├── App.tsx               # Route definitions
└── main.tsx               # App entry point
```

## Data & Persistence

This project ships with a self-contained mock data layer — there is no backend or database. Quests you create and progress you make (starting, completing, or reopening a quest, and building a party) are saved to `localStorage`, so your changes persist across page reloads on the same browser.

## License

MIT — see [LICENSE](./LICENSE) for details.
