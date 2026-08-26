import { Activity, CircleDollarSign, UserRoundCheck, Users } from "lucide-react";

export const dashboardMetrics = [
  { title: "Alunos ativos", value: "428", change: "+12 este mês", icon: Users, tone: "indigo" },
  { title: "Receita mensal", value: "R$ 48.920", change: "+8,4%", icon: CircleDollarSign, tone: "green" },
  { title: "Check-ins hoje", value: "156", change: "+18 comparado a ontem", icon: UserRoundCheck, tone: "blue" },
  { title: "Pagamentos pendentes", value: "R$ 4.380", change: "32 pagamentos", icon: Activity, tone: "amber" },
];
export const revenueData = [{month:"Mar",value:34200},{month:"Abr",value:37800},{month:"Mai",value:36500},{month:"Jun",value:42200},{month:"Jul",value:45100},{month:"Ago",value:48920}];
export const studentsData = [{month:"Mar",value:24},{month:"Abr",value:31},{month:"Mai",value:27},{month:"Jun",value:38},{month:"Jul",value:35},{month:"Ago",value:46}];
export const checkins = [
  {name:"Mariana Silva",initials:"MS",plan:"Premium",time:"18:42"},{name:"Lucas Santos",initials:"LS",plan:"Mensal",time:"18:39"},{name:"Camila Oliveira",initials:"CO",plan:"Anual",time:"18:35"},{name:"Rafael Costa",initials:"RC",plan:"Premium",time:"18:28"},
];
export const payments = [
  {name:"Ana Beatriz",value:"R$ 149,90",method:"Pix",status:"Pago"},{name:"Felipe Martins",value:"R$ 119,90",method:"Cartão",status:"Pago"},{name:"Bruna Lima",value:"R$ 189,90",method:"Boleto",status:"Pendente"},
];
export const landingMetrics = ["+428 alunos ativos","R$ 48.920 receita mensal","156 check-ins hoje","96% pagamentos em dia"];
