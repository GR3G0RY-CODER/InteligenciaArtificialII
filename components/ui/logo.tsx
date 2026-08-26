import Link from "next/link";
import { Dumbbell } from "lucide-react";
export function Logo({light=false}:{light?:boolean}){return <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"><span className="grid size-9 place-items-center rounded-xl bg-brand-600 text-white"><Dumbbell size={18}/></span><span className={`text-xl font-bold tracking-tight ${light?"text-white":"text-slate-950"}`}>Gym<span className="text-brand-500">Flow</span></span></Link>}
