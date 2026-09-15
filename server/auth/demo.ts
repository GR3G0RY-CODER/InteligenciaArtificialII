import "server-only";
import {createHmac,timingSafeEqual} from "node:crypto";
import {cookies} from "next/headers";
import type {SessionUser} from "./session";

const COOKIE="gymflow_session";
const TTL_SECONDS=60*60*8;
const accounts:Record<string,{password:string;user:SessionUser}>={
 "admin@gymflow.demo":{password:"Demo@12345",user:{id:"00000000-0000-4000-8000-000000000001",tenant_id:"00000000-0000-4000-8000-000000000001",email:"admin@gymflow.demo",full_name:"Paulo",role:"owner",active:true}},
 "superadmin@gymflow.demo":{password:"Demo@12345",user:{id:"00000000-0000-4000-8000-000000000002",tenant_id:null,email:"superadmin@gymflow.demo",full_name:"Marina",role:"superadmin",active:true}},
 "instrutor@gymflow.demo":{password:"Demo@12345",user:{id:"00000000-0000-4000-8000-000000000003",tenant_id:"00000000-0000-4000-8000-000000000001",email:"instrutor@gymflow.demo",full_name:"Rafael",role:"instructor",active:true}},
 "aluno@gymflow.demo":{password:"Demo@12345",user:{id:"00000000-0000-4000-8000-000000000004",tenant_id:"00000000-0000-4000-8000-000000000001",email:"aluno@gymflow.demo",full_name:"Mariana",role:"student",active:true}}
};
function secret(){const value=process.env.DEMO_SESSION_SECRET;if(!value||value.length<32)throw new Error("DEMO_SESSION_SECRET deve ter pelo menos 32 caracteres");return value}
function signature(payload:string){return createHmac("sha256",secret()).update(payload).digest("base64url")}
export function isDemoMode(){return process.env.DEMO_MODE==="true"}
export function authenticateDemo(email:string,password:string){if(!isDemoMode())return null;const account=accounts[email.toLowerCase()];return account&&account.password===password?account.user:null}
export async function createDemoSession(user:SessionUser){const expiresAt=Math.floor(Date.now()/1000)+TTL_SECONDS;const payload=Buffer.from(JSON.stringify({user,expiresAt})).toString("base64url");(await cookies()).set(COOKIE,`${payload}.${signature(payload)}`,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:TTL_SECONDS});return new Date(expiresAt*1000)}
export async function readDemoSession(){if(!isDemoMode())return null;const token=(await cookies()).get(COOKIE)?.value;const [payload,sig]=token?.split(".")??[];if(!payload||!sig)return null;const expected=Buffer.from(signature(payload));const actual=Buffer.from(sig);if(expected.length!==actual.length||!timingSafeEqual(expected,actual))return null;try{const parsed=JSON.parse(Buffer.from(payload,"base64url").toString()) as {user:SessionUser;expiresAt:number};return parsed.expiresAt>Date.now()/1000?parsed.user:null}catch{return null}}
