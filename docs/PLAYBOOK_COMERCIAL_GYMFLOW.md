# GymFlow — Playbook Comercial do SaaS

**Material de vendas, demonstração e qualificação**  
Versão 1.0 — Agosto de 2026

---

## 1. Como usar este playbook

Este documento prepara o time comercial para apresentar o GymFlow com clareza, diagnosticar a operação da academia, demonstrar valor e conduzir o próximo passo. Ele não substitui proposta, contrato, política de privacidade ou homologação técnica.

### Regra de ouro

Venda o resultado, demonstre o fluxo e confirme o escopo. Nunca prometa integração, aplicativo publicado, prazo, preço ou processamento financeiro sem validação técnica e comercial.

### Legenda de maturidade

- **Disponível no MVP:** tela e fluxo já existentes no produto.
- **Backend disponível:** endpoint, banco ou mecanismo server-side implementado; requer infraestrutura configurada.
- **Requer homologação:** depende de conta, credencial, contrato ou validação de terceiro.
- **Evolução contratável:** possibilidade de customização, não funcionalidade pronta.

---

## 2. Posicionamento

### Frase principal

> O GymFlow centraliza a gestão da academia, a rotina do instrutor e a experiência do aluno em uma plataforma preparada para crescer com o negócio.

### Pitch de 15 segundos

“O GymFlow reúne alunos, planos, matrículas, pagamentos, assinaturas, check-ins, indicadores e treinos em um único ambiente. O gestor ganha visão da operação, o instrutor acompanha seus alunos e o aluno acessa o treino pelo celular.”

### Pitch de 45 segundos

“Muitas academias ainda dependem de planilhas, mensagens e sistemas separados. Isso aumenta retrabalho, dificulta a cobrança e deixa o gestor sem uma visão confiável. O GymFlow organiza o ciclo completo: cadastro, matrícula, plano, assinatura, pagamento, check-in e acompanhamento. A plataforma separa os acessos do proprietário, equipe, instrutor, aluno e administração do SaaS. O objetivo é reduzir tarefas manuais, melhorar o acompanhamento e criar uma experiência mais profissional para o aluno.”

### Problemas que atacamos

- Cadastros espalhados entre papel, planilha e WhatsApp;
- Falta de visão sobre alunos ativos, receita e inadimplência;
- Cobrança manual e pouca previsibilidade de receita;
- Dificuldade para acompanhar vencimentos e renovações;
- Treinos sem padronização ou acesso fácil pelo aluno;
- Pouca visibilidade sobre frequência e adesão;
- Sistemas diferentes para gestão, cobrança e treino;
- Falta de separação segura entre perfis e unidades.

### Resultados esperados

- Operação centralizada;
- Menos retrabalho administrativo;
- Melhor acompanhamento das assinaturas;
- Mais clareza sobre a jornada do aluno;
- Treinos acessíveis no celular;
- Decisões apoiadas por indicadores;
- Base tecnológica preparada para integrações e escala.

---

## 3. Para quem vender

### Academia independente

**Dores:** equipe pequena, cobrança manual, dependência do dono e falta de processo.  
**Mensagem:** “Tenha controle sem aumentar a complexidade da operação.”

### Academia em crescimento

**Dores:** mais alunos, mais inadimplência, dificuldade de delegar e acompanhar.  
**Mensagem:** “Crie processos e indicadores antes que o crescimento vire desorganização.”

### Rede ou franquia

**Dores:** unidades com padrões diferentes, falta de visão consolidada e permissões frágeis.  
**Mensagem:** “Padronize a gestão e prepare uma visão multiunidade.”  
**Atenção:** integrações e consolidação específicas devem ser validadas como escopo.

### Studio, box ou centro de treinamento

**Dores:** relacionamento próximo, agenda operacional, prescrição e evolução.  
**Mensagem:** “Organize alunos e treinos preservando um atendimento personalizado.”

### Quem participa da compra

- Proprietário: retorno, controle, receita e crescimento;
- Gerente: rotina, equipe e indicadores;
- Financeiro: cobrança, conciliação e inadimplência;
- Instrutor: prescrição e acompanhamento;
- TI/consultoria: segurança, integração e implantação.

---

## 4. Mapa completo do produto

## 4.1 Site e entrada

### Landing page — Disponível no MVP

- Apresentação da proposta de valor;
- Benefícios e recursos;
- Comparação entre processos desconectados e operação centralizada;
- Indicadores demonstrativos;
- Chamadas para acesso e demonstração.

**Como vender:** “A marca já nasce com uma apresentação profissional e uma jornada clara até o acesso.”

### Login e perfis — Backend disponível

- E-mail e senha;
- Identificador da academia para isolamento do tenant;
- Sessão server-side;
- Redirecionamento conforme perfil;
- Logout e revogação de sessão;
- Perfis de proprietário, administrador, superadmin, instrutor e aluno.

**Como vender:** “Cada pessoa acessa o que precisa, sem misturar a experiência do gestor com a do aluno.”

---

## 4.2 Portal do proprietário e administrador

### Dashboard — Disponível no MVP

- Visão geral da academia;
- Alunos ativos;
- Receita mensal;
- Check-ins do dia;
- Pagamentos pendentes;
- Gráfico de receita;
- Gráfico de novos alunos;
- Check-ins recentes;
- Pagamentos recentes;
- Ações rápidas.

**Demonstração:** comece pelo dashboard e pergunte qual indicador o gestor demora mais para descobrir hoje.

### Alunos — MVP + API de backend

- Lista de alunos;
- Pesquisa;
- Status;
- Plano;
- Contato;
- Cadastro;
- Dados físicos e objetivo no modelo persistente;
- Isolamento por academia;
- Auditoria da criação.

**Como vender:** “O aluno deixa de ser apenas um nome em uma planilha e passa a ter uma jornada organizada.”

### Planos — Disponível no MVP; persistência completa deve ser homologada

- Nome do plano;
- Valor;
- Recorrência mensal, trimestral ou anual;
- Quantidade de alunos;
- Status;
- Estrutura no banco para preço, moeda, ciclo e preço do provedor.

**Como vender:** “Planos padronizados facilitam matrícula, cobrança e análise da carteira.”

### Matrículas — Disponível no MVP; persistência completa deve ser homologada

- Vínculo entre aluno e plano;
- Data de início;
- Vencimento;
- Status vigente, pendente ou encerrado;
- Busca e cadastro visual.

**Como vender:** “O time visualiza rapidamente quem está vigente, próximo do vencimento ou precisa de ação.”

### Pagamentos — Disponível no MVP; integração financeira requer homologação

- Aluno;
- Valor;
- Método;
- Data;
- Status pago, pendente ou cancelado;
- Estrutura persistente de pagamentos no banco.

**Como vender:** “A equipe encontra a situação financeira sem consultar várias fontes.”

### Assinaturas e cobrança — MVP + backend Stripe

- Receita recorrente;
- Assinaturas ativas;
- Indicador de adimplência;
- Plano e valor;
- Meio de pagamento;
- Próxima cobrança;
- Status da assinatura;
- Criação server-side de cliente e assinatura;
- Webhooks para atualizar eventos;
- Idempotência para reduzir cobranças duplicadas;
- Registro persistente de pagamentos.

**Requer homologação:** conta Stripe, preços, meios habilitados, webhook, regras de cancelamento, estorno e ambiente de produção.

**Como vender:** “A recorrência transforma cobrança em processo e dá mais previsibilidade ao gestor.”

### Check-in — Disponível no MVP; persistência completa deve ser homologada

- Registro de entrada;
- Aluno e plano;
- Data e horário;
- Status liberado ou bloqueado;
- Histórico visual.

**Como vender:** “O acesso passa a fazer parte do histórico do aluno e dos indicadores da operação.”

### Configurações — Disponível no MVP

- Dados da academia;
- Unidade;
- CNPJ e telefone;
- Fuso horário;
- Moeda;
- Preferência de lembretes.

---

## 4.3 Portal do instrutor — Disponível no MVP

- Carteira de alunos;
- Busca por aluno;
- Objetivo;
- Frequência semanal;
- Treino atribuído;
- Avaliações da semana;
- Adesão aos treinos;
- Acesso à ficha.

**Como vender:** “O instrutor encontra rapidamente quem acompanha, qual o objetivo e qual treino está ativo.”

**Pergunta de valor:** “Quanto tempo sua equipe perde procurando ou reconstruindo fichas?”

---

## 4.4 Experiência mobile-first do aluno — Disponível no MVP

- Treino do dia;
- Progresso mensal;
- Sequência atual;
- Meta semanal;
- Frequência planejada;
- Objetivo e intensidade;
- Peso e altura;
- IMC de referência;
- Exercícios e aparelhos;
- Séries, repetições e tempo;
- Referência demonstrativa de carga;
- Orientações de postura;
- Links de referência no YouTube;
- Navegação inferior para celular;
- Avisos explícitos de segurança.

**Como vender:** “O aluno leva o treino no bolso, entende a sequência e encontra orientações em uma interface simples.”

**Não prometer:** prescrição médica, diagnóstico, prevenção garantida de lesões ou carga automaticamente segura. A confirmação profissional continua obrigatória.

---

## 4.5 Console do superadmin — Disponível no MVP

- Visão de academias clientes;
- Usuários ativos;
- Disponibilidade e latência demonstrativas;
- Planos do SaaS;
- Identidade visual por tokens controlados;
- Cor principal e nome do produto;
- Representação de feature flags;
- Ambientes;
- Webhooks;
- Auditoria;
- Base multi-tenant.

**Como vender para investidor ou parceiro:** “O produto foi pensado como plataforma, não apenas como painel de uma única academia.”

**Não prometer:** edição arbitrária de código pelo navegador. A personalização deve ocorrer por configurações e componentes aprovados.

---

## 4.6 Segurança e arquitetura — Backend disponível

- PostgreSQL/Supabase;
- Multi-tenancy;
- RBAC;
- Senhas com scrypt e salt;
- Sessões revogáveis;
- Cookie HttpOnly, Secure em produção e SameSite;
- Token armazenado como hash;
- Limitação de tentativas de login;
- Validação de entrada;
- Auditoria;
- Row Level Security habilitado;
- Health check;
- Headers de segurança;
- Segredos exclusivamente server-side;
- Migração SQL versionada;
- Seed com senha forte.

**Como vender:** “A segurança não é apenas visual: a base prevê isolamento, sessão no servidor, auditoria e segredos fora do navegador.”

**Não prometer:** certificação, compliance ou invulnerabilidade sem auditoria externa e operação homologada.

---

## 5. Roteiro de reunião comercial — 45 minutos

### 0–5 min: abertura

“Obrigado pelo tempo. Antes de mostrar o GymFlow, quero entender como vocês administram alunos, cobranças, acesso e treinos hoje. Assim eu foco no que realmente pode gerar resultado.”

### 5–15 min: diagnóstico

1. Quantos alunos ativos e quantas unidades vocês têm?
2. Quais ferramentas usam para cadastro, matrícula e cobrança?
3. Como descobrem a inadimplência?
4. Quanto tempo a equipe gasta com cobrança manual?
5. Como o aluno recebe e acompanha o treino?
6. Como o instrutor atualiza fichas?
7. Como é registrado o check-in?
8. Quais indicadores o proprietário acompanha semanalmente?
9. Existem integrações obrigatórias?
10. Quem decide e quem participa da implantação?
11. Existe orçamento e prazo desejado?
12. Qual seria o resultado mínimo para justificar a troca?

### 15–30 min: demonstração guiada

1. Landing e proposta de valor — 2 min;
2. Login e separação de perfis — 2 min;
3. Dashboard do gestor — 4 min;
4. Aluno, plano e matrícula — 3 min;
5. Assinatura e pagamento — 4 min;
6. Check-in — 2 min;
7. Portal do instrutor — 3 min;
8. Área mobile do aluno — 4 min;
9. Superadmin e arquitetura — apenas quando relevante.

### 30–37 min: conexão com a dor

“Pelo que você comentou, os maiores ganhos estariam em [dor 1], [dor 2] e [dor 3]. O GymFlow organiza esses pontos em uma jornada única. Faz sentido priorizarmos esses três processos na implantação?”

### 37–42 min: proposta de próximo passo

- Definir número de alunos, usuários e unidades;
- Registrar integrações obrigatórias;
- Confirmar migração de dados;
- Definir plano e implantação;
- Agendar validação técnica, quando necessária.

### 42–45 min: fechamento

“Se enviarmos uma proposta com esse escopo, quem precisa aprovar? Há algum ponto técnico ou comercial que impediria o avanço?”

---

## 6. Demonstração de 10 minutos

1. **Problema:** “Planilhas e sistemas separados tiram visibilidade.”
2. **Dashboard:** apresente os quatro indicadores.
3. **Aluno:** mostre busca e cadastro.
4. **Assinatura:** mostre recorrência e status.
5. **Instrutor:** mostre carteira e objetivos.
6. **Aluno mobile:** mostre treino, postura e progresso.
7. **Fechamento:** “Gestão, equipe e aluno conectados em uma única jornada.”

---

## 7. Objeções e respostas

### “Já uso planilha e funciona.”

“Planilha pode funcionar com pouco volume, mas depende de atualização manual e normalmente não conecta cobrança, acesso e treino. O ponto não é eliminar uma planilha por estética; é reduzir dependência de tarefas manuais e criar uma visão operacional.”

### “Já tenho outro sistema.”

“Ótimo, então devemos comparar processos, não apenas telas. Quais tarefas ainda acontecem fora do sistema atual? Se não houver ganho mensurável, não faz sentido trocar.”

### “É caro.”

“Vamos comparar com o custo do retrabalho, da inadimplência não acompanhada e do tempo do gestor. Também podemos implantar por etapas, começando pelos processos de maior retorno.”

### “Meus funcionários não vão usar.”

“A implantação deve incluir responsáveis, treinamento e um fluxo simples por perfil. O instrutor e o aluno não recebem o mesmo painel administrativo; cada um vê uma experiência adequada à rotina.”

### “O pagamento é seguro?”

“As credenciais ficam no backend e o provedor recebe os dados financeiros por fluxo seguro. A entrada em produção depende de homologação da conta, webhook, política de estorno e meios habilitados. Não armazenamos dados brutos de cartão no navegador.”

### “Tem aplicativo?”

“Hoje existe uma experiência web mobile-first para o aluno. PWA ou aplicativo publicado em loja deve constar como evolução ou escopo contratado; não apresentamos a versão atual como aplicativo nativo.”

### “Integra com meu banco/catraca/ERP?”

“A arquitetura prevê adapters e APIs, mas precisamos validar o fornecedor, a documentação e o fluxo. Só confirmamos uma integração depois da análise técnica.”

### “Os treinos substituem o instrutor?”

“Não. A plataforma organiza e entrega a prescrição. Cargas, postura e vídeos são referências e precisam da supervisão do profissional responsável.”

### “Está pronto para produção?”

“A base de backend, banco, autenticação e assinatura está implementada. A ativação produtiva exige provisionamento, migração, credenciais, homologação financeira, backups e observabilidade. A proposta deve registrar quais módulos serão homologados na implantação.”

---

## 8. Qualificação comercial

### Lead com alta aderência

- Mais de 150 alunos;
- Cobrança manual;
- Equipe usando múltiplas ferramentas;
- Proprietário sem indicadores confiáveis;
- Interesse em melhorar experiência do aluno;
- Responsável e prazo definidos;
- Disposição para implantação.

### Sinais de risco

- Exige todas as integrações sem orçamento;
- Quer processamento real sem homologação;
- Não possui responsável pela implantação;
- Espera migração ilimitada gratuita;
- Solicita prescrição automática sem profissional;
- Confunde MVP com sistema já certificado;
- Não aceita contrato ou política de dados.

### Critério de avanço

O lead deve ter ao menos: dor clara, responsável, escopo inicial, volume aproximado e próximo passo com data.

---

## 9. Estrutura comercial sugerida

Os valores são referências e devem ser aprovados pela direção.

### Start — sugestão de R$ 299/mês

- Uma unidade;
- Até 150 alunos;
- Gestão essencial;
- Usuários administrativos limitados;
- Suporte padrão.

### Growth — sugestão de R$ 599/mês

- Até 500 alunos;
- Assinaturas;
- Portal do instrutor;
- Área mobile do aluno;
- Relatórios e suporte prioritário.

### Scale — sugestão de R$ 999 a R$ 1.499/mês

- Maior volume;
- Mais unidades e usuários;
- Integrações contratadas;
- Permissões e indicadores avançados;
- Condições de suporte definidas em contrato.

### Implantação

- Pequena: R$ 1.500 a R$ 3.000;
- Média: R$ 3.000 a R$ 7.000;
- Rede, migração ou integração: orçamento técnico.

### Nunca conceder sem aprovação

- Integração gratuita;
- Customização ilimitada;
- Migração sem limite de registros;
- SLA não contratado;
- Isenção permanente;
- Exclusividade;
- Transferência de propriedade intelectual.

---

## 10. Mensagens prontas

### WhatsApp — primeiro contato

“Olá, [nome]. Sou [vendedor] do GymFlow. Ajudamos academias a centralizar alunos, matrículas, cobranças, check-ins e treinos em uma única plataforma. Gostaria de entender como vocês organizam esses processos hoje e mostrar uma demonstração rápida. Podemos conversar por 20 minutos em [opção 1] ou [opção 2]?”

### WhatsApp — após demonstração

“Obrigado pela conversa, [nome]. Pelo diagnóstico, os principais ganhos para vocês seriam [ganho 1], [ganho 2] e [ganho 3]. Vou preparar o escopo considerando [alunos/unidades/integrações]. Nosso próximo passo ficou para [data e ação].”

### E-mail — convite

**Assunto:** Gestão, cobrança e treino em uma única plataforma

“Olá, [nome]. O GymFlow foi criado para centralizar a operação da academia e conectar proprietário, equipe, instrutor e aluno. Em uma demonstração curta, mostramos o dashboard, a jornada de matrícula, assinaturas, check-in e treino mobile. Posso reservar [data/hora] para entender o cenário de vocês?”

### E-mail — proposta

**Assunto:** Proposta GymFlow — [academia]

“Conforme nosso diagnóstico, a proposta prioriza [processos]. O escopo considera [volume], [unidades], [usuários], [migração] e [integrações]. Resultados esperados: [resultado 1], [resultado 2] e [resultado 3]. Pontos que dependem de homologação estão identificados separadamente. Próximo passo sugerido: validação e aceite até [data].”

### Reativação de lead

“Olá, [nome]. Na nossa última conversa, [dor] era uma prioridade. Isso continua relevante? O GymFlow evoluiu a base de autenticação, banco e assinaturas. Se fizer sentido, revisamos o cenário em 15 minutos e definimos se vale avançar.”

---

## 11. Estrutura da proposta

1. Contexto do cliente;
2. Problemas identificados;
3. Objetivos;
4. Módulos incluídos;
5. Usuários, unidades e volume;
6. Migração de dados;
7. Integrações;
8. Responsabilidades do fornecedor;
9. Responsabilidades do cliente;
10. Implantação e treinamento;
11. Critérios de aceite;
12. Mensalidade e custos adicionais;
13. Prazo;
14. Suporte e SLA;
15. Segurança e tratamento de dados;
16. Itens fora do escopo;
17. Validade da proposta;
18. Assinaturas.

---

## 12. Checklist antes da proposta

- [ ] Quantidade de alunos;
- [ ] Quantidade de unidades;
- [ ] Perfis e usuários;
- [ ] Dados para migração;
- [ ] Provedor de pagamentos;
- [ ] Catraca ou controle de acesso;
- [ ] ERP, contabilidade ou emissão fiscal;
- [ ] WhatsApp, SMS e e-mail;
- [ ] Identidade visual;
- [ ] Aplicativo web, PWA ou nativo;
- [ ] Treinamento;
- [ ] SLA;
- [ ] Responsável técnico;
- [ ] Responsável comercial;
- [ ] Prazo e orçamento;
- [ ] Itens sujeitos a homologação.

---

## 13. O que o vendedor pode e não pode afirmar

### Pode afirmar

- Existe interface para os perfis apresentados;
- Existe base multi-tenant e RBAC;
- Existe banco e migração versionada;
- Existe autenticação server-side;
- Existe API para alunos e assinaturas;
- Existe integração Stripe no backend;
- Existe validação de webhook e idempotência;
- Existe experiência mobile-first do aluno;
- O produto pode receber evoluções mediante escopo.

### Não pode afirmar sem validação

- “Integra com qualquer banco”;
- “Aceita qualquer catraca”;
- “Está publicado nas lojas”;
- “É certificado”;
- “É impossível de invadir”;
- “Elimina inadimplência”;
- “Evita lesões”;
- “A carga é automaticamente segura”;
- “A implantação é imediata”;
- “Tudo está incluso”;
- “Processa pagamentos sem configuração.”

---

## 14. Fechamentos recomendados

### Fechamento por próximo passo

“Faz sentido avançarmos para a validação técnica e uma proposta com esses três processos prioritários?”

### Fechamento por escolha

“Para o cenário de vocês, prefere começar pela gestão e depois ativar cobrança, ou implantar gestão e assinatura na mesma etapa?”

### Fechamento por compromisso

“Se confirmarmos [integração], [prazo] e [valor], existe outro impedimento para o aceite?”

### Fechamento de piloto

“Podemos selecionar uma unidade e um grupo controlado de usuários, medir adoção e validar os critérios antes da expansão.”

---

## 15. Indicadores para o time comercial

- Leads qualificados por mês;
- Demonstrações agendadas e realizadas;
- Conversão por etapa;
- Ticket médio;
- Receita recorrente contratada;
- Custo de aquisição;
- Ciclo médio de venda;
- Motivos de perda;
- Tempo de implantação;
- Adoção após 30 dias;
- Cancelamentos e expansão.

---

## 16. Encerramento

> GymFlow conecta gestão, equipe e aluno. A venda começa com um diagnóstico honesto, avança com uma demonstração focada em resultado e termina com um escopo claro, homologável e sustentável.

**Contato comercial:** preencher antes de distribuir  
**Site:** preencher antes de distribuir  
**Validade deste material:** revisar a cada versão do produto
