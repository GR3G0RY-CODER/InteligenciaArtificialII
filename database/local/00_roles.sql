do $$ begin
  if not exists(select 1 from pg_roles where rolname='anon') then create role anon nologin; end if;
  if not exists(select 1 from pg_roles where rolname='service_role') then create role service_role nologin bypassrls; end if;
  if not exists(select 1 from pg_roles where rolname='authenticator') then create role authenticator login password 'gymflow_authenticator_local'; end if;
end $$;
grant anon, service_role to authenticator;
