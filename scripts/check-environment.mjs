const requiredProduction=["SUPABASE_URL","SUPABASE_SERVICE_ROLE_KEY","STRIPE_SECRET_KEY","STRIPE_WEBHOOK_SECRET","APP_URL"];
const demo=process.env.DEMO_MODE==="true";
const required=demo?["DEMO_SESSION_SECRET","APP_URL"]:requiredProduction;
const missing=required.filter(name=>!process.env[name]);
const exposed=Object.keys(process.env).filter(name=>name.startsWith("NEXT_PUBLIC_")&&/(SECRET|KEY|TOKEN)/.test(name));
if(demo&&process.env.NEXT_PUBLIC_DEMO_MODE!=="true")missing.push("NEXT_PUBLIC_DEMO_MODE=true");
if(process.env.DEMO_SESSION_SECRET&&process.env.DEMO_SESSION_SECRET.length<32)missing.push("DEMO_SESSION_SECRET (mínimo 32 caracteres)");
if(exposed.length){console.error("Segredos potencialmente públicos:",exposed.join(", "));process.exitCode=1}
if(missing.length){console.error("Configurações ausentes/inválidas:",missing.join(", "));process.exitCode=1}else console.log(`Ambiente ${demo?"DEMO":"PRODUÇÃO"} configurado corretamente.`);
