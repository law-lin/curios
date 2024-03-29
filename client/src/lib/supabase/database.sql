drop table if exists public.users cascade;
drop table if exists public.classes cascade;
drop table if exists public.users_classes cascade;
drop table if exists public.posts cascade;
drop table if exists public.answers cascade;
-- drop type if exists public.app_permission cascade;
-- drop type if exists public.app_role cascade;
drop type if exists public.user_role cascade;
drop type if exists public.user_status cascade;
drop type if exists public.post_type cascade;

drop function if exists public.authorize(app_permission, uuid) cascade;
drop function if exists public.handle_new_user() cascade;

-- Custom types
-- create type public.app_permission as enum ('classes.delete');
-- create type public.app_role as enum ('admin', 'moderator');
create type public.user_role as enum ('class_creator', 'ta', 'instructor', 'student', );
create type public.user_status as enum ('ONLINE', 'OFFLINE');
create type public.post_type as enum ('question', 'note');
create type public.answer_type as enum('instructor', 'student');

create type public.post_visibility as enum ('public', 'private')
-- USERS
create table public.users (
  id          uuid not null primary key, -- UUID from auth.users
  email       text unique,
  name        varchar(255),
  created_at  timestamp with time zone default timezone('utc'::text, now()) not null,
  status      user_status default 'OFFLINE'::public.user_status
);
comment on table public.users is 'Profile data for each user.';
comment on column public.users.id is 'References the internal Supabase Auth user.';

-- CLASSES
create table public.classes (
  id bigint generated by default as identity primary key,
  created_by uuid references public.users on delete cascade not null,
  class_name varchar(255),
  class_number varchar(255),
  class_term varchar(255),
  status boolean default 'on', -- 'on' represents active, 'off' represents inactive
  private_posts boolean default 'on',
  student_polls boolean default 'on',
  description text
);
comment on table public.classes is 'A class created by an instructor';

-- USER CLASSES
create table public.users_classes (
  user_id uuid references public.users on delete cascade not null,
  class_id bigint references public.classes on delete cascade not null,
  role user_role,  -- defines what kind of role that user has in a particular class
  unique (user_id, class_id)
);
comment on table public.users_classes is 'Role a user has for a particular class';

-- POSTS
create table public.posts (
  id bigint generated by default as identity primary key,
  created_by uuid references public.users on delete cascade not null,
  class_id bigint references public.classes on delete cascade not null,
  type post_type,
  is_anonymous boolean,
  is_private boolean,
  is_archived boolean,
  tags text[],
  upvotes bigint,
  visibility post_visibility,
  title text,
  content text
);
comment on table public.posts is 'A post for a class';

-- ANSWERS
create table public.answers (
  id serial primary key,
  created_by uuid references public.users on delete cascade not null,
  post_id bigint references public.posts(id) on delete cascade not null,
  type answer_type,
  is_anonymous boolean,
  upvotes bigint,
  content text
)

-- -- USER ROLES
-- create table public.user_roles (
--   id        bigint generated by default as identity primary key,
--   user_id   uuid references public.users on delete cascade not null,
--   role      app_role not null,
--   unique (user_id, role)
-- );
-- comment on table public.user_roles is 'Application roles for each user.';

-- -- ROLE PERMISSIONS
-- create table public.role_permissions (
--   id           bigint generated by default as identity primary key,
--   role         app_role not null,
--   permission   app_permission not null,
--   unique (role, permission)
-- );
-- comment on table public.role_permissions is 'Application permissions for each role.';

-- authorize with role-based access control (RBAC)
-- create function public.authorize(
--   requested_permission app_permission,
--   user_id uuid
-- )
-- returns boolean as $$
-- declare
--   bind_permissions int;
-- begin
--   select count(*)
--   from public.role_permissions
--   inner join public.user_roles on role_permissions.role = user_roles.role
--   where role_permissions.permission = authorize.requested_permission
--     and user_roles.user_id = authorize.user_id
--   into bind_permissions;
  
--   return bind_permissions > 0;
-- end;
-- $$ language plpgsql security definer;

-- Secure the tables
-- alter table public.users enable row level security;
alter table public.classes enable row level security;
alter table public.users_classes enable row level security;
alter table public.posts enable row level security;

create policy "Allow logged-in read access" on public.users for select using ( auth.role() = 'authenticated' );
create policy "Allow individual insert access" on public.users for insert with check ( true ); -- auth.uid() = id 
create policy "Allow individual update access" on public.users for update using ( true ); -- auth.uid() = id 

create policy "Allow logged-in read access" on public.classes for select using ( auth.role() = 'authenticated' );
create policy "Allow individual insert access" on public.classes for insert with check ( auth.uid() = created_by );
create policy "Allow individual delete access" on public.classes for delete using ( auth.uid() = created_by );
create policy "Allow authorized delete access" on public.classes for delete using ( auth.uid() = created_by );

create policy "Allow logged-in read access" on public.users_classes for select using ( auth.role() = 'authenticated' );
create policy "Allow individual insert access" on public.users_classes for insert with check ( auth.uid() = user_id );
create policy "Allow individual update access" on public.users_classes for update using ( auth.uid() = user_id );

create policy "Allow logged-in read access" on public.posts for select using ( auth.role() = 'authenticated' );
create policy "Allow individual insert access" on public.posts for insert with check ( auth.uid() = created_by );
create policy "Allow individual delete access" on public.posts for delete using ( auth.uid() = created_by );
create policy "Allow authorized delete access" on public.posts for delete using ( auth.uid() = created_by );
-- Send "previous data" on change 
alter table public.users replica identity full; 
alter table public.classes replica identity full; 

-- inserts a row into public.users and assigns roles
create function public.handle_new_user() 
returns trigger as $$
declare is_admin boolean;
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  
  -- select count(*) = 1 from auth.users into is_admin;
  
  -- if position('+supaadmin@' in new.email) > 0 then
  --   insert into public.user_roles (user_id, role) values (new.id, 'admin');
  -- elsif position('+supamod@' in new.email) > 0 then
  --   insert into public.user_roles (user_id, role) values (new.id, 'moderator');
  -- end if;
  
  return new;
end;
$$ language plpgsql security definer;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */

begin; 
  -- remove the realtime publication
  drop publication if exists supabase_realtime; 

  -- re-create the publication but don't enable it for any tables
  create publication supabase_realtime;  
commit;

-- add tables to the publication
alter publication supabase_realtime add table public.classes;
alter publication supabase_realtime add table public.users;

