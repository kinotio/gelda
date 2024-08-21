-- Drop tables if exists
drop table if exists public.users cascade;
drop table if exists public.user_roles cascade;

drop table if exists public.tickets cascade;
drop table if exists public.ticket_statuses cascade;
drop table if exists public.ticket_resolutions cascade;
drop table if exists public.ticket_priorities cascade;

drop table if exists public.discussion_messages cascade;

drop table if exists public.ai_configurations cascade;
drop table if exists public.ai_tokens cascade;

drop table if exists public.role_permissions cascade;

drop table if exists public.direct_messages cascade;

drop table if exists public.inboxes cascade;

-- Drop types if already exists
drop type if exists public.app_permission cascade;
drop type if exists public.app_role cascade;
drop type if exists public.user_status cascade;

-- Drop functions if already exists
drop function if exists public.handle_new_user() cascade;
drop function if exists public.authorize() cascade;

----------------------------------------------------------------------------------------------
-- TYPES --
----------------------------------------------------------------------------------------------
create type public.app_permission as enum ('discussion_messages.delete', 'direct_messages.delete', 'inboxes.delete');
create type public.app_role as enum ('client', 'admin');
create type public.user_status as enum ('ONLINE', 'OFFLINE');
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- USERS TABLES --
----------------------------------------------------------------------------------------------
create table public.users (
  id          uuid not null primary key, -- UUID from auth.users
  email       text not null unique,
  status      user_status default 'OFFLINE'::public.user_status,
  username    text not null unique,
  name        text not null,
  created_at  timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.user_roles (
  id        bigint generated by default as identity primary key,
  user_id   uuid references public.users on delete cascade not null,
  role      app_role not null,
  unique    (user_id, role)
);
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- ROLE PERMISSIONS --
----------------------------------------------------------------------------------------------
create table public.role_permissions (
  id           bigint generated by default as identity primary key,
  role         app_role not null,
  permission   app_permission not null,
  unique       (role, permission)
);
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- TICKETS TABLES --
----------------------------------------------------------------------------------------------
create table public.ticket_statuses (
  id            bigint generated by default as identity primary key,
  name          text not null unique,
  slug          text not null unique,
  created_at    timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at    timestamp with time zone
);

create table public.ticket_resolutions (
  id            bigint generated by default as identity primary key,
  name          text not null unique,
  slug          text not null unique,
  created_at    timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at    timestamp with time zone
);

create table public.ticket_priorities (
  id            bigint generated by default as identity primary key,
  name          text not null unique,
  slug          text not null unique,
  created_at    timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at    timestamp with time zone
);

create table public.tickets (
  id              bigint generated by default as identity primary key,
  title           text not null,
  description     text,
  status_id       bigint references public.ticket_statuses not null,
  priority_id     bigint references public.ticket_priorities not null,
  resolution_id   bigint references public.ticket_resolutions,
  creator_id      uuid references public.users not null,
  responsible_id  uuid references public.users,
  slug            text not null unique,
  created_at      timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at      timestamp with time zone
);
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- AI CONFIGURATIONS AND TOKENS TABLES --
----------------------------------------------------------------------------------------------
create table public.ai_configurations (
  id            bigint generated by default as identity primary key,
  provider      text not null,
  model         text not null,
  ai_token_id   text not null,
  is_global     boolean,
  creator_id    uuid references public.users not null,
  created_at    timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at    timestamp with time zone
);

create table public.ai_tokens (
  id            bigint generated by default as identity primary key,
  hashed_key    text not null,
  created_at    timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at    timestamp with time zone
);
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- MESSAGES TABLES --
----------------------------------------------------------------------------------------------
create table public.discussion_messages (
  id            bigint generated by default as identity primary key,
  message       text not null unique,
  sender_id     uuid references public.users not null, -- config with ai
  receiver_id   uuid references public.users not null, -- config with ai
  created_at    timestamp with time zone default timezone('utc'::text, now()) not null
);

create table public.direct_messages (
  id            bigint generated by default as identity primary key,
  message       text not null unique,
  sender_id     uuid references public.users not null,
  receiver_id   uuid references public.users not null,
  created_at    timestamp with time zone default timezone('utc'::text, now()) not null
);
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- INBOXES TABLES --
----------------------------------------------------------------------------------------------
create table public.inboxes (
  id            bigint generated by default as identity primary key,
  message       text not null unique,
  user_id       uuid references public.users not null,
  created_at    timestamp with time zone default timezone('utc'::text, now()) not null
);
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- AUTHORIZE WITH RBAC --
----------------------------------------------------------------------------------------------
-- authorize with role-based access control (RBAC)
create function public.authorize(
  requested_permission app_permission,
  user_id uuid
)
returns boolean as $$
declare
  bind_permissions int;
begin
  select count(*)
  from public.role_permissions
  inner join public.user_roles on role_permissions.role = user_roles.role
  where role_permissions.permission = authorize.requested_permission
    and user_roles.user_id = authorize.user_id
  into bind_permissions;

  return bind_permissions > 0;
end;
$$ language plpgsql security definer;
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- ENABLE ROW LEVEL SECURITY --
----------------------------------------------------------------------------------------------
alter table public.users enable row level security;
alter table public.user_roles enable row level security;
alter table public.role_permissions enable row level security;
alter table public.tickets enable row level security;
alter table public.ticket_statuses enable row level security;
alter table public.ticket_resolutions enable row level security;
alter table public.ticket_priorities enable row level security;
alter table public.ai_configurations enable row level security;
alter table public.ai_tokens enable row level security;
alter table public.discussion_messages enable row level security;
alter table public.direct_messages enable row level security;
alter table public.inboxes enable row level security;
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- CREATE POLICIES --
----------------------------------------------------------------------------------------------
create policy "Allow logged-in read access" on public.users for select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.users for insert with check (auth.uid() = id);
create policy "Allow individual update access" on public.users for update using (auth.uid() = id);

create policy "Allow individual read access" on public.user_roles for select using (auth.uid() = user_id);

create policy "Allow logged-in read access" on public.tickets for select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.tickets for insert with check (auth.uid() = creator_id);
create policy "Allow individual delete access" on public.tickets for delete using (auth.uid() = creator_id);

create policy "Allow logged-in read access" on public.ticket_statuses for select using (auth.role() = 'authenticated');

create policy "Allow logged-in read access" on public.ticket_resolutions for select using (auth.role() = 'authenticated');

create policy "Allow logged-in read access" on public.ticket_priorities for select using (auth.role() = 'authenticated');

create policy "Allow logged-in read access" on public.ai_configurations for select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.ai_configurations for insert with check (auth.uid() = creator_id);
create policy "Allow individual delete access" on public.ai_configurations for delete using (auth.uid() = creator_id);

create policy "Allow logged-in read access" on public.ai_tokens for select using (auth.role() = 'authenticated');

create policy "Allow logged-in read access" on public.discussion_messages for select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.discussion_messages for insert with check (auth.uid() = sender_id);
create policy "Allow individual delete access" on public.discussion_messages for delete using (auth.uid() = sender_id);
create policy "Allow authorized delete access" on public.discussion_messages for delete using (authorize('discussion_messages.delete', auth.uid()));

create policy "Allow logged-in read access" on public.direct_messages for select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.direct_messages for insert with check (auth.uid() = sender_id);
create policy "Allow individual delete access" on public.direct_messages for delete using (auth.uid() = sender_id);
create policy "Allow authorized delete access" on public.direct_messages for delete using (authorize('direct_messages.delete', auth.uid()));

create policy "Allow logged-in read access" on public.inboxes for select using (auth.role() = 'authenticated');
create policy "Allow individual insert access" on public.inboxes for insert with check (auth.uid() = user_id);
create policy "Allow individual delete access" on public.inboxes for delete using (auth.uid() = user_id);
create policy "Allow authorized delete access" on public.inboxes for delete using (authorize('inboxes.delete', auth.uid()));
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- REPLICA IDENTITY --
----------------------------------------------------------------------------------------------
alter table public.users replica identity full;
alter table public.tickets replica identity full;
alter table public.ticket_statuses replica identity full;
alter table public.ticket_resolutions replica identity full;
alter table public.ticket_priorities replica identity full;
alter table public.ai_configurations replica identity full;
alter table public.ai_tokens replica identity full;
alter table public.discussion_messages replica identity full;
alter table public.direct_messages replica identity full;
alter table public.inboxes replica identity full;
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- HANDLE NEW USER --
----------------------------------------------------------------------------------------------
-- inserts a row into public.users and assigns roles
create function public.handle_new_user()
returns trigger as $$
declare is_admin boolean;
begin
  insert into public.users (id, email, username, name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'username', new.raw_user_meta_data ->> 'name');

  select count(*) = 1 from auth.users into is_admin;

  if position('+geldaadmin@' in new.email) > 0 then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  else
    insert into public.user_roles (user_id, role) values (new.id, 'client');
  end if;

  return new;
end;
$$ language plpgsql security definer;
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- TRIGGERS --
----------------------------------------------------------------------------------------------
-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- SUPABASE REALTIME --
----------------------------------------------------------------------------------------------
begin;
  -- remove the realtime publication
  drop publication if exists supabase_realtime;
  -- re-create the publication but don't enable it for any tables
  create publication supabase_realtime;
commit;


alter publication supabase_realtime add table public.users;
alter publication supabase_realtime add table public.tickets;
alter publication supabase_realtime add table public.discussion_messages;
alter publication supabase_realtime add table public.direct_messages;
alter publication supabase_realtime add table public.inboxes;
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
-- SEEDS --
----------------------------------------------------------------------------------------------
insert into public.ticket_statuses (name, slug)
values
    ('open', 'open'),
    ('in progress', 'in_progress'),
    ('closed', 'closed');

insert into public.ticket_priorities (name, slug)
values
    ('low', 'low'),
    ('medium', 'medium'),
    ('high', 'high');

insert into public.ticket_resolutions (name, slug)
values
    ('resolved', 'resolved'),
    ('unresolved',  'unresolved');

insert into public.role_permissions (role, permission)
values
    ('client', 'discussion_messages.delete'),
    ('client', 'direct_messages.delete'),
    ('client', 'inboxes.delete');
----------------------------------------------------------------------------------------------