alter table students add column if not exists plan_name text;
alter table payments add column if not exists payer_name text;
create table if not exists enrollments(
 id uuid primary key default gen_random_uuid(),tenant_id uuid not null references tenants(id) on delete cascade,student_name text not null,plan_name text not null,start_date date not null,end_date date not null,status text not null default 'Vigente',created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create index if not exists enrollments_tenant_idx on enrollments(tenant_id,created_at desc);
create table if not exists checkins(
 id uuid primary key default gen_random_uuid(),tenant_id uuid not null references tenants(id) on delete cascade,student_name text not null,plan_name text not null,checkin_date date not null,checkin_time time not null,status text not null default 'Liberado',created_at timestamptz not null default now());
create index if not exists checkins_tenant_idx on checkins(tenant_id,checkin_date desc,checkin_time desc);
create table if not exists tenant_settings(
 tenant_id uuid primary key references tenants(id) on delete cascade,legal_name text,document text,phone text,unit_name text not null default 'Unidade Centro',timezone text not null default 'America/Sao_Paulo',currency char(3) not null default 'BRL',payment_reminders boolean not null default true,updated_at timestamptz not null default now());
alter table enrollments enable row level security;alter table checkins enable row level security;alter table tenant_settings enable row level security;
