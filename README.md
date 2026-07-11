# If Sangeeta Were... 🎂

A playful, animated birthday web app built for **Dr. Sangeeta Talekar**. Friends and family answer a whimsical prompt — *"If Sangeeta were a [song/color/season/...], what would she be?"* — and their answers are collected into a beautiful animated collage as a collective birthday gift.

## How it works

The app has two pages:

- **`/`** — The landing page. Shows the prompt with a randomly chosen concept (e.g. "a song", "a color", "an animal"), a form to submit an answer, an optional note, an optional image upload, and the sender's name. A "shuffle" button swaps in a new concept without repeating the last one. On submit, the entry is added to the collage.
- **`/wishes`** — A collage view of everyone's submitted answers, rendered as animated, staggered cards (see [WishesCollage.tsx](src/components/WishesCollage.tsx) / [WishCard.tsx](src/components/WishCard.tsx)).

The person being celebrated is hardcoded in [src/config/person.ts](src/config/person.ts) (name + pronouns), and the list of possible concepts/prompts lives in [src/data/concepts.ts](src/data/concepts.ts).

### Backend

There's no database. Submissions go through a Next.js API route ([src/app/api/wishes/route.ts](src/app/api/wishes/route.ts)) which proxies to an external key-value style API (`API_BASE_URL` + `API_BEARER_TOKEN`), reading/writing a single JSON blob of all wishes.

When `DEBUG=true`, the API route instead returns a set of fake/sample wishes and doesn't require any external service — this is the easiest way to run the app locally.

## Tech stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- React 19
- Tailwind CSS v4
- [Motion](https://motion.dev) for animations
- `react-hook-form` + `zod` for form handling/validation

## Getting started

### Prerequisites

- Node.js (18+ recommended)
- npm

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file in the project root (or edit the existing one):

```bash
API_BASE_URL=https://coffeecoders.cc
API_BEARER_TOKEN=your-bearer-token-here
DEBUG=true
```

- Set `DEBUG=true` to run entirely against mock/sample data — no external API needed. This is the simplest way to develop locally.
- Set `DEBUG=false` (and provide a real `API_BASE_URL` / `API_BEARER_TOKEN`) to hit the live backend and persist real submissions.

### Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page, and [http://localhost:3000/wishes](http://localhost:3000/wishes) to see the collage.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the project
```

## Project structure

```
src/
  app/
    page.tsx             # Landing page ("/")
    wishes/page.tsx       # Collage page ("/wishes")
    api/wishes/route.ts   # GET/POST API route (proxies external store or serves mock data)
  components/              # Form, cards, collage, shared UI
  config/person.ts         # Hardcoded name + pronouns of the birthday person
  data/concepts.ts         # Curated list of prompt concepts
  lib/                      # Client-side API helpers, concept-picking logic, utils
  types/wish.ts             # Shared Wish/CreateWishInput types
```

## Note on Next.js version

This project pins a Next.js version (`16.2.9`) that may differ from what you're used to — check `node_modules/next/dist/docs/` for docs specific to this version before assuming standard App Router behavior, per [AGENTS.md](AGENTS.md).
