const base=(process.env.APP_URL||"http://localhost:3000").replace(/\/$/,"");
const failures=[];let checks=0;
async function check(name,fn){try{await fn();checks++;console.log(`✓ ${name}`)}catch(error){failures.push(`${name}: ${error.message}`);console.error(`✗ ${name}: ${error.message}`)}}
async function expectStatus(path,status,init){const response=await fetch(`${base}${path}`,init);if(response.status!==status)throw new Error(`HTTP ${response.status}, esperado ${status}`);return response}
await check("health",async()=>{const r=await expectStatus("/api/health",200);const x=await r.json();if(x.status!=="ok")throw new Error(JSON.stringify(x))});
await check("credencial inválida rejeitada",()=>expectStatus("/api/v1/auth/login",401,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:"admin@gymflow.demo",password:"senha-errada"})}));
const accounts=[['admin','owner','/dashboard'],['superadmin','superadmin','/superadmin'],['instrutor','instructor','/instrutor'],['aluno','student','/aluno']];
for(const [email,role,page] of accounts)await check(`login ${role}`,async()=>{const login=await expectStatus("/api/v1/auth/login",200,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:`${email}@gymflow.demo`,password:"Demo@12345"})});const cookie=login.headers.get("set-cookie")?.split(";",1)[0];if(!cookie)throw new Error("cookie ausente");const me=await expectStatus("/api/v1/auth/me",200,{headers:{Cookie:cookie}});const body=await me.json();if(body.user.role!==role)throw new Error(`perfil ${body.user.role}`);await expectStatus(page,200,{headers:{Cookie:cookie}});await expectStatus("/api/v1/auth/logout",204,{method:"POST",headers:{Cookie:cookie}})});
for(const page of ["/","/login","/dashboard","/alunos","/planos","/matriculas","/pagamentos","/checkin","/assinaturas","/configuracoes","/instrutor","/aluno","/superadmin"])await check(`tela ${page}`,()=>expectStatus(page,200));
if(failures.length){console.error(`\n${failures.length} falha(s):\n${failures.join("\n")}`);process.exit(1)}
console.log(`\nSmoke test aprovado: ${checks} verificações em ${base}.`);
