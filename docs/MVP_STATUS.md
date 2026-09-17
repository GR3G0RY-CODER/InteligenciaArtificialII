# GymFlow — Estado final do MVP

## Etapa 1 — Identidade e aquisição

- Landing page responsiva;
- Proposta de valor e chamadas para ação;
- Login separado por academia;
- Modo demo com quatro perfis.

## Etapa 2 — Gestão da academia

- Dashboard e indicadores;
- Alunos;
- Planos;
- Matrículas;
- Pagamentos manuais e registros recebidos do Stripe;
- Check-ins;
- Configurações da academia;
- Busca, filtros, criação, exclusão permitida e auditoria;
- Persistência PostgreSQL em produção e persistência local isolada na demo.

## Etapa 3 — Perfis

- Proprietário/administrador;
- Superadmin SaaS;
- Instrutor;
- Aluno em interface mobile-first;
- RBAC server-side para APIs persistentes.

## Etapa 4 — Financeiro

- Planos recorrentes;
- Stripe Checkout hospedado;
- Webhook assinado e idempotente;
- Criação e atualização de assinatura;
- Registro de pagamento confirmado;
- Separação entre demo e produção;
- Nenhum dado bruto de cartão coletado pelo GymFlow.

## Etapa 5 — Banco e operação

Aplique, nesta ordem:

1. `database/migrations/001_initial.sql`;
2. `database/migrations/002_operations.sql`;
3. `npm run db:seed`.

O seed é repetível para tenant e usuários existentes e cria dados iniciais de alunos, planos e configurações quando as tabelas estão vazias.

## Etapa 6 — Verificação

```bash
npm run verify
npm run env:check
npm run typecheck
npm run lint
npm run build
npm start
```

## Limites externos antes de produção live

O código do MVP está concluído, mas a ativação comercial depende de recursos que não pertencem ao repositório:

- Projeto Supabase/PostgreSQL provisionado;
- Migrações aplicadas;
- Backups e alertas configurados;
- Produtos e `stripe_price_id` configurados;
- Conta Stripe homologada;
- Webhook público cadastrado;
- Domínio, HTTPS e deploy;
- Políticas LGPD, termos e suporte aprovados;
- Teste financeiro com valores controlados antes das chaves live.

Não habilite `DEMO_MODE` no domínio produtivo.
