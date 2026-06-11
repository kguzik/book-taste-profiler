# Book Taste Profiler

AI-powered reading taste profiling app. Add books you loved, describe what resonated, and get a personalised taste profile with book recommendations based on vibe and emotional similarity — not just genre.

**[Live demo →](https://book-taste-profiler.vercel.app)**

## Tech stack

- Next.js App Router, React, TypeScript
- Tailwind CSS v4
- Supabase (auth + database)
- OpenAI API

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create a `.env.local` file in the root:

```env
# Required — for AI taste profile generation
OPENAI_API_KEY=your_openai_api_key

# Optional — for auth and full book persistence
# Without these the app runs in guest mode (localStorage only, up to 3 books)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase setup (optional)

Create a free project at [supabase.com](https://supabase.com) and run [`supabase/schema.sql`](./supabase/schema.sql) in the SQL editor.
When creating your Supabase project, use these security settings:

- **Enable Data API** — on
- **Automatically expose new tables** — off
- **Enable automatic RLS** — on

You can find your credentials in the Supabase dashboard:

- `NEXT_PUBLIC_SUPABASE_URL` → **Settings → API Keys** → API URL  
  (use the base URL only, without `/rest/v1/`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → **Settings → API Keys** → `anon public` key
