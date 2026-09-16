import {existsSync,readFileSync} from "node:fs";
const required=["package.json","package-lock.json","next.config.ts",".env.example",".env.demo.example","database/migrations/001_initial.sql","database/migrations/002_operations.sql","app/api/v1/auth/login/route.ts","app/api/v1/auth/me/route.ts","app/api/v1/students/route.ts","app/api/v1/subscriptions/route.ts","app/api/v1/subscriptions/checkout/route.ts","app/api/v1/settings/route.ts","app/api/v1/operations/[resource]/route.ts","app/api/v1/webhooks/stripe/route.ts","server/auth/session.ts","server/auth/demo.ts","server/db/client.ts","server/payments/stripe.ts","setup-local.ps1","scripts/install-local.ps1","Dockerfile","compose.yaml","vercel.json","scripts/smoke-test.mjs","scripts/db-local-up.ps1","scripts/db-local-up.sh"];
const missing=required.filter(file=>!existsSync(file));
const nodeMajor=Number(process.versions.node.split(".")[0]);
const problems=[];
if(nodeMajor<20)problems.push(`Node.js ${process.versions.node}: necessário 20+`);
if(missing.length)problems.push(`Arquivos ausentes: ${missing.join(", ")}`);
const pkg=JSON.parse(readFileSync("package.json","utf8"));
for(const script of ["dev","build","start","lint","typecheck","env:check","verify","smoke"])if(!pkg.scripts?.[script])problems.push(`Script npm ausente: ${script}`);
if(problems.length){console.error(problems.join("\n"));process.exit(1)}
console.log(`GymFlow verificado: Node ${process.versions.node}, ${required.length} componentes essenciais presentes.`);
