# GymFlow — Deploy da demonstração na nuvem

## Estado desta entrega

O projeto está preparado para deploy em Vercel ou em uma plataforma de containers. Este ambiente de desenvolvimento não possui remoto Git, token Vercel, conta Supabase ou credenciais Stripe; por isso, não é possível publicar uma URL real daqui sem acesso à conta do proprietário.

## Opção 1 — Vercel em modo demonstração

1. Envie a branch ao GitHub;
2. Importe o repositório na Vercel;
3. Configure as variáveis:

```dotenv
DEMO_MODE=true
NEXT_PUBLIC_DEMO_MODE=true
DEMO_SESSION_SECRET=<segredo aleatório com pelo menos 32 caracteres>
APP_URL=https://SEU-PROJETO.vercel.app
```

4. Faça o deploy;
5. Abra `/login` e valide os quatro perfis.

O `DEMO_SESSION_SECRET` pode ser criado no PowerShell:

```powershell
$bytes = New-Object byte[] 48
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes)
```

### Credenciais exclusivas da demo

A senha é `Demo@12345` para os quatro perfis:

- `admin@gymflow.demo` — proprietário;
- `superadmin@gymflow.demo` — superadmin;
- `instrutor@gymflow.demo` — instrutor;
- `aluno@gymflow.demo` — aluno.

O modo demo usa cookie assinado com validade de oito horas. Ele não chama Supabase ou Stripe, não armazena dados financeiros e nunca deve ser habilitado no domínio de produção.

## Opção 2 — Vercel com backend real

Configure:

```dotenv
DEMO_MODE=false
NEXT_PUBLIC_DEMO_MODE=false
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role somente no servidor>
STRIPE_SECRET_KEY=<chave server-side>
STRIPE_WEBHOOK_SECRET=<segredo do endpoint>
APP_URL=https://SEU-DOMINIO
```

Depois:

1. Execute a migração SQL;
2. Execute o seed com senha forte;
3. Configure preços Stripe;
4. Cadastre o webhook `https://SEU-DOMINIO/api/v1/webhooks/stripe`;
5. Teste `/api/health`;
6. Homologue os fluxos financeiros antes de usar chaves live.

## Opção 3 — Container

O `Dockerfile` realiza build multi-stage, executa a aplicação como usuário sem privilégios e expõe a porta 3000.

```powershell
docker build -t gymflow:latest .
docker run --rm -p 3000:3000 --env-file .env gymflow:latest
```

## Checklist pós-deploy

- [ ] `/` responde com HTTP 200;
- [ ] `/login` mostra os perfis quando a demo está habilitada;
- [ ] Login dos quatro perfis funciona;
- [ ] Cookie é `HttpOnly`, `Secure` e `SameSite=Lax` na nuvem;
- [ ] `/api/health` está coerente com o modo utilizado;
- [ ] Nenhum segredo possui prefixo `NEXT_PUBLIC_`;
- [ ] Logs não exibem credenciais;
- [ ] Demo e produção utilizam projetos e domínios separados;
- [ ] Headers de segurança estão presentes;
- [ ] Alertas e monitoramento estão ativos em produção.
