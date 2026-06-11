-- Book Taste Profiler — Supabase schema
-- Run this in the Supabase SQL editor: https://supabase.com/dashboard/project/_/sql

SET LOCAL transaction_read_only = off;

-- Tables

create table saved_books (
  id uuid primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  source_id text,
  title text not null,
  author text,
  year int,
  cover_url text,
  notes text,
  tags text[] default '{}',
  created_at timestamptz default now()
);

create table taste_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  summary text not null,
  recommendations jsonb not null,
  fingerprint text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row Level Security

alter table saved_books enable row level security;
alter table taste_profiles enable row level security;

create policy "Users can manage their own books"
on saved_books for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can manage their own taste profile"
on taste_profiles for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Permissions

grant select, insert, update, delete on public.saved_books to authenticated;
grant select, insert, update, delete on public.taste_profiles to authenticated;
