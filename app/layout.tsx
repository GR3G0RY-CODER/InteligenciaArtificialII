import type { Metadata } from "next";
import "./globals.css";
export const metadata:Metadata={title:"GymFlow — Gestão inteligente para academias",description:"Alunos, planos, pagamentos e check-ins em uma única plataforma."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
