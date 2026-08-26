export interface LoginCredentials { email:string; password:string; remember?:boolean }
export interface AuthResult { user:{name:string;role:string}; token:string }
// Implementação temporária e isolada: será substituída por POST /api/v1/auth/login.
const DEMO={email:"admin@gymflow.com",password:"12345678"};
export const authService={async login(input:LoginCredentials):Promise<AuthResult>{await new Promise(r=>setTimeout(r,550));if(input.email!==DEMO.email||input.password!==DEMO.password)throw new Error("E-mail ou senha incorretos.");if(typeof window!=="undefined")localStorage.setItem("gymflow_demo_session","active");return {user:{name:"Paulo",role:"Administrador"},token:"demo-only-token"}},logout(){if(typeof window!=="undefined")localStorage.removeItem("gymflow_demo_session")}};
