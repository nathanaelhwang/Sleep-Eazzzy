-- ============================================================================
-- Sleep Eazzzy — Migration 001: users + progress tables with RLS
-- ============================================================================
-- Run this once in the Supabase SQL editor after enabling Clerk as a
-- "Third-party Authentication" provider in Authentication → Sign In / Up
-- Providers. Once that toggle is on, `auth.jwt() ->> 'sub'` returns the
-- Clerk user id, which is what every RLS policy below checks against.
--
-- These tables are intentionally tiny:
--   • users.id    — the Clerk user id (text, e.g. "user_2abc...")
--   • users.email — surfaced from Clerk for convenience
--   • progress    — one row per (user, module_id); completed boolean
-- No PII beyond email is stored. No clinical content. No sleep-diary entries.
-- ============================================================================

create table if not exists public.users (
  id          text        primary key,
  email       text        not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.progress (
  user_id     text        not null references public.users(id) on delete cascade,
  module_id   int         not null,
  completed   boolean     not null default false,
  updated_at  timestamptz not null default now(),
  primary key (user_id, module_id)
);

create index if not exists idx_progress_user on public.progress(user_id);

-- ---------------------------------------------------------------------------
-- Row-Level Security: every user can read and write only their own rows.
-- The /api/users/sync route uses the service-role key (bypasses RLS) to
-- create the initial users row on sign-in. After that, all reads/writes
-- from the browser are governed by these policies.
-- ---------------------------------------------------------------------------

alter table public.users    enable row level security;
alter table public.progress enable row level security;

drop policy if exists "users_select_own"   on public.users;
drop policy if exists "users_update_own"   on public.users;
drop policy if exists "progress_select_own" on public.progress;
drop policy if exists "progress_insert_own" on public.progress;
drop policy if exists "progress_update_own" on public.progress;
drop policy if exists "progress_delete_own" on public.progress;

create policy "users_select_own"
  on public.users for select
  using (auth.jwt() ->> 'sub' = id);

create policy "users_update_own"
  on public.users for update
  using (auth.jwt() ->> 'sub' = id);

create policy "progress_select_own"
  on public.progress for select
  using (auth.jwt() ->> 'sub' = user_id);

create policy "progress_insert_own"
  on public.progress for insert
  with check (auth.jwt() ->> 'sub' = user_id);

create policy "progress_update_own"
  on public.progress for update
  using (auth.jwt() ->> 'sub' = user_id);

create policy "progress_delete_own"
  on public.progress for delete
  using (auth.jwt() ->> 'sub' = user_id);

-- ---------------------------------------------------------------------------
-- Optional: trigger to keep users.updated_at fresh on every update.
-- ---------------------------------------------------------------------------

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_touch_updated_at on public.users;
create trigger users_touch_updated_at
  before update on public.users
  for each row execute function public.touch_updated_at();

drop trigger if exists progress_touch_updated_at on public.progress;
create trigger progress_touch_updated_at
  before update on public.progress
  for each row execute function public.touch_updated_at();
