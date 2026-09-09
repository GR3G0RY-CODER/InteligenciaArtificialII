# GymFlow

MVP visual de um SaaS de gestão para academias, construído com Next.js, TypeScript e Tailwind CSS.

## Executar localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`. As credenciais são criadas pelo seed seguro descrito na seção de backend; nenhuma senha padrão é distribuída no código.

## Módulos disponíveis

Além da landing page e do dashboard, o projeto inclui módulos de alunos, planos, matrículas, pagamentos, assinaturas, check-in e configurações. Autenticação, alunos e assinaturas possuem APIs server-side; as telas operacionais legadas ainda preservam dados locais até sua migração completa para os endpoints persistentes.

## Qualidade

```bash
npm run typecheck
npm run lint
npm run build
```

> A base de backend está implementada, mas a liberação produtiva exige provisionar o PostgreSQL, aplicar a migração, configurar segredos e homologar o provedor financeiro.

## Perfis de acesso

O RBAC suporta proprietário, administrador, superadmin do SaaS, instrutor e aluno. Cada usuário acessa somente o tenant e as ações permitidas por sua função.

## Integrações financeiras

O contrato `PaymentProvider` isola cobranças, assinaturas, estornos e webhooks dos fornecedores. Integrações com bancos, Open Finance e gateways devem ser implementadas em adapters exclusivamente no backend, com segredos em cofre e validação de assinatura dos webhooks. O adapter Stripe processa assinaturas no backend quando as credenciais e os preços homologados estão configurados.

## Backend de produção

O backend usa PostgreSQL/Supabase, sessões server-side em cookie `HttpOnly`, hash de senha com `scrypt`, isolamento por tenant, RBAC, auditoria, limitação de login, Stripe e webhooks idempotentes.

1. Copie `.env.example` para `.env` e preencha as chaves server-side.
2. Execute `database/migrations/001_initial.sql` no SQL Editor do projeto Supabase.
3. Defina uma senha forte em `SEED_OWNER_PASSWORD` e execute `npm run db:seed`.
4. Cadastre o endpoint `/api/v1/webhooks/stripe` no Stripe e configure `STRIPE_WEBHOOK_SECRET`.
5. Execute `npm run build` e valide `/api/health` antes do deploy.

Nunca use `SUPABASE_SERVICE_ROLE_KEY` ou `STRIPE_SECRET_KEY` no cliente. Antes de movimentar dinheiro, homologue webhooks, meios de pagamento, políticas de estorno, backups, LGPD e observabilidade no ambiente escolhido.

## Instalação no Windows

A relação de componentes locais, pendências de produção e instruções de preparação está em [`docs/COMPONENTES_PENDENTES_E_SETUP_LOCAL.md`](docs/COMPONENTES_PENDENTES_E_SETUP_LOCAL.md). Para baixar e preparar o projeto automaticamente no PowerShell, use `scripts/install-local.ps1` informando a URL real do repositório, a pasta de destino e a branch.
