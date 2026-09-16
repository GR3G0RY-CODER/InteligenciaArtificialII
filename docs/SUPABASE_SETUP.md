# Configuração do Supabase para o GymFlow

## 1. Criar o projeto

Crie um projeto no Supabase, escolha uma região próxima dos usuários e guarde a senha do banco em um gerenciador de segredos.

## 2. Executar as migrações

No painel do Supabase, abra **SQL Editor**, crie uma consulta e execute integralmente, nesta ordem:

1. `database/migrations/001_initial.sql`;
2. `database/migrations/002_operations.sql`.

Não execute a segunda antes da primeira. As migrações criam enums, tenants, usuários, sessões, alunos, planos, assinaturas, pagamentos, webhooks, auditoria, tentativas de login, matrículas, check-ins e configurações.

## 3. Verificar o schema

Execute no SQL Editor:

```sql
select table_name
from information_schema.tables
where table_schema = 'public'
order by table_name;
```

Devem existir, no mínimo:

- `audit_logs`;
- `auth_attempts`;
- `checkins`;
- `enrollments`;
- `payments`;
- `plans`;
- `sessions`;
- `students`;
- `subscriptions`;
- `tenant_settings`;
- `tenants`;
- `users`;
- `webhook_events`.

Verifique RLS:

```sql
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
order by tablename;
```

## 4. Copiar as chaves corretas

No painel do projeto, abra as configurações de API. Copie:

- URL do projeto, semelhante a `https://SEU-ID.supabase.co`;
- chave server-side `service_role` legada ou a chave secreta server-side equivalente.

Configure em `.env`:

```dotenv
DEMO_MODE=false
NEXT_PUBLIC_DEMO_MODE=false
SUPABASE_URL=https://SEU-ID.supabase.co
SUPABASE_SERVICE_ROLE_KEY=SUA_CHAVE_SERVER_SIDE
APP_URL=http://localhost:3000
```

A variável se chama `SUPABASE_SERVICE_ROLE_KEY`, mas pode receber a credencial server-side equivalente apresentada pelo painel atual. Nunca use a chave `anon`/`publishable` nesse campo e nunca exponha a chave server-side com prefixo `NEXT_PUBLIC_`.

## 5. Configurar o usuário inicial

No mesmo `.env`:

```dotenv
SEED_OWNER_EMAIL=admin@suaacademia.com
SEED_OWNER_PASSWORD=uma-senha-forte-com-12-ou-mais-caracteres
SEED_TENANT_NAME=Nome da Sua Academia
```

Depois execute:

```bash
npm run env:check
npm run db:seed
```

O seed cria o tenant `academia-performance`, proprietário, instrutor, aluno, superadmin, dois alunos, três planos e configurações iniciais. A senha configurada em `SEED_OWNER_PASSWORD` é usada nos quatro usuários iniciais.

## 6. Verificar os dados

No SQL Editor:

```sql
select id, name, slug, status from tenants;
select email, full_name, role, active from users order by role;
select full_name, email, plan_name, status from students;
select name, amount_cents, billing_cycle, active from plans;
select tenant_id, legal_name, unit_name, timezone, currency from tenant_settings;
```

Nunca consulte ou compartilhe `password_hash`, tokens de sessão ou chaves server-side.

## 7. Iniciar e testar

```bash
npm run verify
npm run env:check
npm run build
npm start
```

Teste:

- `http://localhost:3000/api/health`;
- `http://localhost:3000/login`;
- tenant: `academia-performance`;
- e-mail definido em `SEED_OWNER_EMAIL`;
- senha definida em `SEED_OWNER_PASSWORD`.

O health check deve retornar banco conectado. Se retornar 503, confirme URL, chave, migrações e se o projeto Supabase não está pausado.

## 8. Stripe

O banco funciona sem Stripe, mas assinaturas reais exigem `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` e `stripe_price_id` nos planos. Mantenha chaves de teste até concluir a homologação.
