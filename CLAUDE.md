# book-taste-profiler

AI-powered reading taste profiling app built with Next.js App Router, React, TypeScript and Tailwind CSS.

Users add books they liked and describe what they liked about them: vibe, themes, mood, pacing, writing style, relationships, emotional tone and setting.

The app recommends books based on semantic taste similarity, not only genre.

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- pnpm
- Supabase (auth + database)
- OpenAI API (taste profile generation)

## Commands

- Install dependencies: `pnpm install`
- Run dev server: `pnpm dev`
- Build project: `pnpm build`
- Run lint: `pnpm lint`

## Architecture

- Use feature-based folder structure
- Use `src/components/ui` for reusable primitive UI components
- Use `src/components/layout` for layout components
- Use `src/features` for feature-specific logic and components
- Keep components small and readable
- Prefer composition over abstraction
- Avoid over-engineering

## Rules

- IMPORTANT: do not install new packages unless explicitly requested
- Do not create unnecessary abstractions or custom hooks too early
- Prefer simple React and TypeScript solutions
- Keep the UI modern, minimal, dark, aesthetic and premium
- Use ES modules import/export syntax
- Use TypeScript types when useful, but avoid excessive complexity
- Prefer `type` over `interface` unless declaration merging or class-style extension is needed
- Reusable components (components/sections) should receive content and configuration via props instead of hardcoding text. Optional props should be rendered conditionally: if an optional prop is not provided, the related element should not be displayed. Components should use the shared `Container` component for consistent layout width and spacing. If a component contains buttons or button-like CTAs, use the shared `Button` component
- All static copy and labels belong in `src/data/` — not hardcoded in components

## Persistence

Two-tier strategy based on auth state:

- **Guest users** — data lives in `localStorage`. Accessed only via SSR-safe hooks (read in `useEffect`, never during render). No component touches `localStorage` directly.
- **Logged-in users** — data persists in Supabase. Helpers in `src/lib/supabase/` and `src/lib/saved-books-db.ts`.
- **Guest Limits** — guests can save up to 3 books. At the limit, `GuestLimit` replaces `AddBookPanel` and prompts account creation.

## Auth

- Supabase email/password auth via `@supabase/ssr`
- Browser client: `src/lib/supabase/client.ts`
- Server client: `src/lib/supabase/server.ts`
- `useAuth()` hook in `src/features/auth/useAuth.ts` — exposes `user`, `signOut()`
- Login/signup page at `/login`

## External APIs

- **Open Library** — keyless book search via `searchBooks()` in `src/lib/book-search.ts`
- **OpenAI** — taste profile summary + recommendations via `/api/taste-profile` route.

## Workflow

- Run lint after larger code changes
- Prefer editing existing files over creating unnecessary new ones
- Keep all page/section copy in `src/data/` files
