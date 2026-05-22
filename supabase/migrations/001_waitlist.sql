-- Waitlist table for Sozu Capital landing page signups
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'pending',
  source text not null default 'website',
  metadata jsonb not null default '{}'::jsonb,
  constraint waitlist_email_unique unique (email),
  constraint waitlist_email_lowercase check (email = lower(email))
);

create index if not exists waitlist_created_at_idx
  on public.waitlist (created_at desc);

create or replace function public.set_waitlist_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists waitlist_set_updated_at on public.waitlist;

create trigger waitlist_set_updated_at
  before update on public.waitlist
  for each row
  execute function public.set_waitlist_updated_at();

alter table public.waitlist enable row level security;

drop policy if exists "Allow anonymous waitlist inserts" on public.waitlist;

create policy "Allow anonymous waitlist inserts"
  on public.waitlist
  for insert
  to anon, authenticated
  with check (true);

-- Note: do not add anon SELECT on this table. Server inserts should not use
-- `.select()` after insert, because RETURNING requires a SELECT policy.
