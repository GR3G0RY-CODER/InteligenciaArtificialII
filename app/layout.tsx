import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
const inter=Inter({subsets:["latin"]});
export const metadata:Metadata={title:"GymFlow — Gestão inteligente para academias",description:"Alunos, planos, pagamentos e check-ins em uma única plataforma."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body className={inter.className}>{children}</body></html>}
