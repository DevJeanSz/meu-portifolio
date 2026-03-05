export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export const projects: Project[] = [
  {
    title: "JenFlow Sistemas",
    description:
      `O JenFlow é uma solução completa em nuvem (SaaS Multi-Tenant) desenvolvida para revolucionar a forma como restaurantes, pizzarias, hamburguerias e deliveries gerenciam suas operações. Mais do que um simples cardápio digital, o sistema entrega uma infraestrutura ponta-a-ponta que unifica: Frente de Caixa (PDV), gestão automatizada de pedidos via WhatsApp, controle financeiro seguro e engajamento avançado com clientes (Cashback e Cupons).

O foco principal foi resolver três grandes dores do mercado gastronômico:

A evasão de taxas de marketplaces (iFood, UberEats).
A perda de tempo no atendimento manual pelo WhatsApp.
A falta de controle unificado entre o motoboy, a cozinha e o caixa.`,
    tech: ["Node", "Postgres", "React", "Evolution API", "Supabase", "TypeScript"],
    link: "https://jenflowsystem.up.railway.app",
  },
  {
    title: "Sistema de Permissões",
    description:
      "Sistema administrativo com controle granular de permissões, ações em lote e processamento otimizado com feedback inteligente.",
    tech: ["Angular", "TypeScript"],
  },
  {
    title: "Gerador de Agenda .ICS",
    description:
      "Serviço backend em Python que gera arquivos de calendário dinâmicos para assinatura via link em dispositivos móveis.",
    tech: ["Python", "API REST"],
  },
  {
    title: "Plataforma Academia React",
    description:
      "Sistema completo com painel admin, CRUD, integração com Supabase e gerenciamento de vídeos dinâmicos.",
    tech: ["React", "Supabase", "Node.js"],
  }
];