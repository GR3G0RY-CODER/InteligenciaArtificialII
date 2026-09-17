# GymFlow — Execução completa em qualquer máquina

## Requisitos comuns

- Git;
- Node.js 20.9 ou superior;
- npm;
- 2 GB livres para dependências e build.

Para banco PostgreSQL local, instale Docker Desktop (Windows/macOS) ou Docker Engine + Compose v2 (Linux).

## Opção A — Demo sem banco externo

### Windows

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\setup-local.ps1 -DemoMode -StartDevelopmentServer
```

### Linux/macOS

```bash
cp .env.demo.example .env
python3 -c "import pathlib,secrets;p=pathlib.Path('.env');p.write_text(p.read_text().replace('replace-with-at-least-32-random-characters',secrets.token_urlsafe(48)))"
npm ci
npm run verify
npm run env:check
npm run dev
```

Abra `http://localhost:3000/login`. Use os botões dos quatro perfis e a senha `Demo@12345`.

## Opção B — PostgreSQL real local

A arquitetura utiliza PostgREST; por isso, `compose.yaml` inicia PostgreSQL e PostgREST juntos.

### Windows

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\db-local-up.ps1 -Reset
npm run dev
```

### Linux/macOS

```bash
./scripts/db-local-up.sh --reset
npm run dev
```

O processo:

1. Inicia PostgreSQL 16 em `localhost:54322`;
2. Cria roles `anon`, `service_role` e `authenticator`;
3. Executa as migrações `001` e `002` na primeira criação do volume;
4. Inicia PostgREST em `http://localhost:3001`;
5. Copia `.env.local-postgres.example` para `.env`;
6. Executa o seed;
7. Libera a aplicação em `http://localhost:3000` após `npm run dev`.

Credenciais iniciais locais:

- tenant: `academia-performance`;
- proprietário: `admin@gymflow.local`;
- instrutor: `instrutor@gymflow.com`;
- aluno: `aluno@gymflow.com`;
- superadmin: `superadmin@gymflow.com`;
- senha inicial: `GymFlowLocal@2026`.

As credenciais de Docker e JWT fornecidas são exclusivamente locais. Nunca reutilize em nuvem ou produção.

### Comandos úteis

```bash
docker compose ps
docker compose logs -f
docker compose stop
docker compose down
docker compose down -v   # apaga todos os dados locais
```

Alterações nas migrações de inicialização exigem recriar o volume com `down -v`.

## Opção C — Supabase na nuvem

1. Crie o projeto;
2. Execute `001_initial.sql` e `002_operations.sql` no SQL Editor;
3. Copie `.env.example` para `.env`;
4. Configure `SUPABASE_URL` e chave server-side;
5. Configure o seed;
6. Execute `npm run db:seed`;
7. Confira `/api/health`.

Consulte `docs/SUPABASE_SETUP.md` para consultas de verificação e segurança.

## Stripe

1. Use chave `sk_test_` durante homologação;
2. Crie produtos e preços recorrentes;
3. Preencha `stripe_price_id` dos planos;
4. Configure `/api/v1/webhooks/stripe`;
5. Defina `STRIPE_WEBHOOK_SECRET`;
6. Teste checkout, pagamento, falha, atraso e cancelamento;
7. Somente então use chaves live.

## Nuvem

### Vercel

- Importe o repositório;
- Cadastre as variáveis do ambiente;
- Use `vercel.json`;
- Configure o domínio e o webhook Stripe.

### Container

```bash
docker build -t gymflow:latest .
docker run --rm -p 3000:3000 --env-file .env gymflow:latest
```

No container, `SUPABASE_URL` precisa apontar para um host acessível pelo container, não necessariamente `localhost`.

## Verificação completa

```bash
npm run verify
npm run env:check
npm run typecheck
npm run lint
npm run build
npm start
```

Em outro terminal:

```bash
npm run smoke
```

O smoke test verifica health, rejeição de senha inválida, sessão, login/logout dos quatro perfis e todas as rotas visuais.

## Portas

| Serviço | Porta |
|---|---:|
| GymFlow | 3000 |
| PostgREST local | 3001 |
| PostgreSQL local | 54322 |

## Diagnóstico

- Porta ocupada: pare o serviço conflitante ou altere o mapeamento em `compose.yaml`;
- Health 503: confira PostgREST/Supabase e chaves;
- Login 401: confira tenant, seed e senha;
- Tabela ausente: recrie o banco local ou aplique ambas as migrações no Supabase;
- Checkout falha: confira chave Stripe e `stripe_price_id`;
- Webhook 400: confira o segredo de assinatura do endpoint correto.
