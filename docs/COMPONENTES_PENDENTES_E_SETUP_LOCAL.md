# GymFlow — Componentes pendentes e preparação local

Este documento separa o que já existe no repositório do que ainda precisa ser instalado, configurado, implementado ou homologado para desenvolvimento e produção.

## 1. Programas necessários no computador

| Componente | Obrigatório | Finalidade |
|---|---:|---|
| Git | Sim | Baixar e atualizar o repositório |
| Node.js 20.9 ou superior | Sim | Executar Next.js, scripts e build |
| npm | Sim | Instalar as dependências do `package.json` |
| Conta Supabase/PostgreSQL | Para backend | Banco persistente e API PostgREST |
| Conta Stripe | Para pagamentos | Clientes, meios de pagamento e assinaturas |
| Stripe CLI | Recomendado | Testar e encaminhar webhooks localmente |
| VS Code | Opcional | Edição e depuração |

O repositório contém `package-lock.json`; use `npm ci` para uma instalação reproduzível.

## 2. Configurações externas que não podem vir prontas no Git

Crie `.env` a partir de `.env.example` e preencha:

- `SUPABASE_URL`;
- `SUPABASE_SERVICE_ROLE_KEY`;
- `APP_URL`;
- `STRIPE_SECRET_KEY`;
- `STRIPE_WEBHOOK_SECRET`;
- `SEED_OWNER_EMAIL`;
- `SEED_OWNER_PASSWORD`, com pelo menos 12 caracteres;
- `SEED_TENANT_NAME`.

Segredos reais não devem ser enviados por WhatsApp, adicionados ao Git ou expostos em variáveis públicas `NEXT_PUBLIC_*`.

## 3. Preparação do banco

Ainda precisa ser realizado em cada ambiente:

1. Criar o projeto PostgreSQL/Supabase;
2. Executar `database/migrations/001_initial.sql e database/migrations/002_operations.sql`;
3. Conferir tabelas, índices e RLS;
4. Executar `npm run db:seed`;
5. Configurar backups e recuperação;
6. Definir retenção de auditoria e webhooks;
7. Criar ambientes separados para desenvolvimento, homologação e produção.

O script `npm run db:migrate` atualmente apenas orienta a execução manual. Uma ferramenta automática de migrations ainda deve ser adotada antes de múltiplos deploys concorrentes.

## 4. Preparação do Stripe

Ainda precisa ser realizado por ambiente:

1. Criar produtos e preços recorrentes;
2. Salvar `stripe_price_id` nos planos;
3. Habilitar meios de pagamento compatíveis com a conta e o país;
4. Registrar `/api/v1/webhooks/stripe`;
5. Configurar `STRIPE_WEBHOOK_SECRET`;
6. Testar pagamento aprovado, recusado, atrasado, cancelado e estornado;
7. Homologar idempotência, reconciliação e política de reembolso;
8. Trocar chaves de teste por produção somente após aceite.

## 5. Componentes de software ainda incompletos

### Persistência

As APIs persistentes existem para autenticação, alunos e assinaturas. As interfaces genéricas de planos, matrículas, pagamentos e check-in ainda usam dados locais e precisam ser conectadas a endpoints e tabelas definitivos.

### APIs ainda necessárias

- CRUD completo de alunos, incluindo atualização e exclusão lógica;
- CRUD de planos;
- CRUD de matrículas;
- Consulta e conciliação de pagamentos;
- Registro e consulta persistente de check-in;
- Configurações persistentes da academia;
- Gestão de usuários, convites e troca de senha;
- Recuperação de senha e verificação de e-mail;
- Fichas, exercícios, avaliações e progresso do aluno;
- Gestão multiunidade;
- Endpoints reais do console superadmin.

### Financeiro

- Cancelamento e pausa de assinatura pela interface;
- Estorno operacional;
- Troca de plano;
- Atualização segura do meio de pagamento;
- Cobrança avulsa;
- Tratamento completo de falhas e retentativas;
- Relatório de conciliação;
- Nota fiscal, se fizer parte do escopo;
- Adapters adicionais além do Stripe.

### Segurança e operação

- Recuperação de senha;
- MFA para perfis privilegiados;
- CSRF explícito para cenários cross-site futuros;
- Rate limiting distribuído para múltiplas instâncias;
- Rotação e limpeza automática de sessões;
- Alertas e observabilidade;
- Testes de invasão e revisão externa;
- Política LGPD, termos, consentimento e atendimento ao titular;
- Disaster recovery testado;
- Gestão centralizada de segredos.

### Qualidade

- Testes unitários;
- Testes de integração com banco;
- Testes end-to-end por perfil;
- Testes de contrato do Stripe;
- Pipeline CI/CD;
- Lockfile versionado (concluído);
- Dados de seed separados por ambiente;
- Monitoramento de cobertura e regressões.

### Mobile

A área do aluno é web mobile-first. Ainda faltam, caso contratados:

- PWA instalável e funcionamento offline;
- Push notifications;
- Aplicativo Android/iOS publicado;
- Processo de publicação nas lojas;
- Analytics e crash reporting mobile.

## 6. Comandos depois do download

```powershell
Copy-Item .env.example .env
notepad .env
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
```

Abra `http://localhost:3000`. O backend somente responderá como saudável depois que o `.env` e o banco estiverem configurados.

## 7. Download automatizado

Use o script versionado em `scripts/install-local.ps1`. Exemplo:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\install-local.ps1 `
  -RepositoryUrl "https://github.com/USUARIO/REPOSITORIO.git" `
  -Destination "$HOME\GymFlow" `
  -Branch "work"
```

Se você ainda não tem os arquivos, baixe apenas o instalador com `Invoke-WebRequest` usando a URL Raw real do GitHub e execute-o. O endereço do repositório precisa ser informado porque este checkout local não possui `git remote` configurado.

## 8. Solução para “install-local.ps1 não é reconhecido”

Esse erro significa que o PowerShell não encontrou o arquivo no caminho atual; não é um erro de `ExecutionPolicy`.

Dentro da pasta extraída, execute:

```powershell
Get-Location
Test-Path .\setup-local.ps1
Test-Path .\scripts\install-local.ps1
Get-ChildItem -Force
Get-ChildItem .\scripts -ErrorAction SilentlyContinue
```

### Projeto já baixado como ZIP

Na versão atual, use o preparador da raiz:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\setup-local.ps1
```

Ele usa `$PSScriptRoot`, portanto funciona mesmo que o caminho contenha espaços. Para instalar e iniciar o Next.js ao final:

```powershell
.\setup-local.ps1 -StartDevelopmentServer
```

### Arquivo não existe

Se `Test-Path` retornar `False`, a cópia baixada não contém o instalador. Baixe a branch que contém o arquivo ou atualize o clone:

```powershell
git fetch --all --prune
git checkout work
git pull
```

Se a branch `work` ainda não existir no GitHub, o responsável pelo repositório precisa executar o `git push` antes. Alterar a política de execução não cria um arquivo ausente.

### Instalação manual imediata

Mesmo sem os scripts, a partir da pasta que contém `package.json`:

```powershell
Copy-Item .env.example .env
npm install
npm run typecheck
npm run lint
npm run build
npm run dev
```

## 9. Componentes entregues para demo e nuvem

- `.env.demo.example`: configuração segura de referência para demo;
- `server/auth/demo.ts`: sessão de demonstração assinada e expirada;
- `vercel.json`: região e comando de build na Vercel;
- `Dockerfile` e `.dockerignore`: imagem multi-stage sem segredos;
- `scripts/check-environment.mjs`: validação das variáveis do ambiente;
- `scripts/verify-project.mjs`: inventário automático dos arquivos essenciais;
- `docs/DEPLOY_NUVEM.md`: publicação, credenciais, produção e checklist;
- `setup-local.ps1 -DemoMode`: preparação local sem Supabase ou Stripe.

A publicação efetiva exige uma conta de nuvem e um token do proprietário. Arquivos de configuração não substituem a autorização para criar o deploy.

## 10. Atualização da conclusão do MVP

A migração `002_operations.sql` e a rota `/api/v1/operations/[resource]` passaram a fornecer persistência para planos, matrículas, pagamentos e check-ins. Configurações usam `/api/v1/settings`, e assinaturas usam Stripe Checkout em `/api/v1/subscriptions/checkout`. A lista histórica de pendências acima deve ser interpretada como auditoria anterior; o estado consolidado atual está em `docs/MVP_STATUS.md`.
