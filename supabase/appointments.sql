create table if not exists public.appointments (
  id bigint generated always as identity primary key,
  patient text not null,
  service text not null,
  time text not null default 'À confirmer',
  date text,
  message text,
  email text,
  phone text,
  status text not null default 'pending' check (status in ('pending', 'waiting', 'confirmed')),
  trace jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role)
  values (new.id, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid()
      and p.role = 'admin'
  );
$$;

alter table public.appointments enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "public insert appointment" on public.appointments;
drop policy if exists "admin read appointments" on public.appointments;
drop policy if exists "admin update appointments" on public.appointments;
drop policy if exists "admin delete appointments" on public.appointments;

drop policy if exists "user read own profile" on public.profiles;
drop policy if exists "user upsert own profile" on public.profiles;
drop policy if exists "admin read all profiles" on public.profiles;

create policy "public insert appointment"
on public.appointments
for insert
to anon, authenticated
with check (true);

create policy "admin read appointments"
on public.appointments
for select
to authenticated
using (public.is_admin());

create policy "admin update appointments"
on public.appointments
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admin delete appointments"
on public.appointments
for delete
to authenticated
using (public.is_admin());

create policy "user read own profile"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "user upsert own profile"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

create policy "admin read all profiles"
on public.profiles
for select
to authenticated
using (public.is_admin());
