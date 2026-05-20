# book-taste-profiler

AI-powered reading taste profiling app built with Next.js App Router, React, TypeScript and Tailwind CSS.

Users add books they liked and describe what they liked about them: vibe, themes, mood, pacing, writing style, relationships, emotional tone and setting.

The app should later recommend books based on semantic taste similarity, not only genre.

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- pnpm

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

- IMPORTANT: do not add backend, database, authentication or AI integrations unless explicitly requested
- IMPORTANT: do not install new packages unless explicitly requested
- Do not create unnecessary abstractions or custom hooks too early
- Prefer simple React and TypeScript solutions
- Keep the UI modern, minimal, dark, aesthetic and premium
- Use ES modules import/export syntax
- Use TypeScript types when useful, but avoid excessive complexity
- Prefer `type` over `interface` unless declaration merging or class-style extension is needed.
- Reusable components (components/sections) should receive content and configuration via props instead of hardcoding text. Optional props should be rendered conditionally: if an optional prop is not provided, the related element should not be displayed. Components should use the shared `Container` component for consistent layout width and spacing. If a component contains buttons or button-like CTAs, use the shared `Button` component.

## Workflow

- Run lint after larger code changes
- Prefer editing existing files over creating unnecessary new ones
