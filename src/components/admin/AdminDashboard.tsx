import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Users, Calendar, BarChart3, TrendingUp, Activity, Heart, Send, Clock, Wallet,
  Building2, Filter, ArrowUpRight, Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Repasse = { institution_id: string; amount: number; status: string };
type Institution = { id: string; name: string; active: boolean };

const fmtBRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

function StatCard({
  title, value, hint, icon: Icon, accent = "primary",
}: {
  title: string; value: string; hint: string; icon: any;
  accent?: "primary" | "success" | "warning" | "info";
}) {
  const accentMap = {
    primary: "from-primary/15 to-primary/0 text-primary",
    success: "from-[hsl(var(--success))]/15 to-[hsl(var(--success))]/0 text-[hsl(var(--success))]",
    warning: "from-[hsl(var(--warning))]/20 to-[hsl(var(--warning))]/0 text-[hsl(var(--warning))]",
    info: "from-sky-500/15 to-sky-500/0 text-sky-600",
  } as const;
  return (
    <Card className="relative overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
      <div className={cn("absolute inset-x-0 top-0 h-24 bg-gradient-to-b pointer-events-none", accentMap[accent])} />
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 relative">
        <div>
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </CardTitle>
        </div>
        <div className={cn(
          "h-9 w-9 rounded-lg flex items-center justify-center bg-background border border-border/60 shadow-sm",
          accentMap[accent].split(" ").slice(-1)[0]
        )}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{hint}</p>
      </CardContent>
    </Card>
  );
}

export function AdminDashboard() {
  const [instFilter, setInstFilter] = useState("all");

  const { data: profilesCount = 0 } = useQuery({
    queryKey: ["admin-profiles-count"],
    queryFn: async () => {
      const { count, error } = await supabase.from("profiles").select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: appointmentsToday = 0 } = useQuery({
    queryKey: ["admin-appointments-today"],
    queryFn: async () => {
      const today = new Date().toISOString().split("T")[0];
      const { count, error } = await supabase
        .from("appointments").select("*", { count: "exact", head: true })
        .eq("scheduled_date", today);
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: caregiversCount = 0 } = useQuery({
    queryKey: ["admin-caregivers-count"],
    queryFn: async () => {
      const { count, error } = await supabase.from("caregivers")
        .select("*", { count: "exact", head: true }).eq("active", true);
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: avgRating = "—" } = useQuery({
    queryKey: ["admin-avg-rating"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("rating");
      if (error) throw error;
      if (!data || data.length === 0) return "—";
      const avg = data.reduce((s, r) => s + r.rating, 0) / data.length;
      return avg.toFixed(1);
    },
  });

  const { data: donations = [] } = useQuery({
    queryKey: ["admin-donations-raw"],
    queryFn: async () => {
      const { data, error } = await supabase.from("donations").select("amount, status");
      if (error) throw error;
      return data || [];
    },
  });

  const { data: repasses = [] } = useQuery({
    queryKey: ["admin-repasses-raw"],
    queryFn: async () => {
      const { data, error } = await supabase.from("repasses").select("institution_id, amount, status");
      if (error) throw error;
      return (data || []) as Repasse[];
    },
  });

  const { data: institutions = [] } = useQuery({
    queryKey: ["institutions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("institutions").select("id, name, active").order("name");
      if (error) throw error;
      return (data || []) as Institution[];
    },
  });

  const { data: recentActivities = [] } = useQuery({
    queryKey: ["admin-recent-activities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_activities")
        .select("*, profiles(full_name)")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
  });

  const filteredRepasses = instFilter === "all"
    ? repasses
    : repasses.filter((r) => r.institution_id === instFilter);

  const totalDonated = donations.reduce((s, d) => (d.status === "paid" ? s + Number(d.amount) : s), 0);
  const totalRepassed = filteredRepasses.reduce((s, r) => (r.status === "paid" ? s + Number(r.amount) : s), 0);
  const pendingRepasses = filteredRepasses.reduce((s, r) => (r.status === "pending" ? s + Number(r.amount) : s), 0);
  const balance = totalDonated - repasses.reduce((s, r) => (r.status === "paid" ? s + Number(r.amount) : s), 0);
  const repassedPct = totalDonated > 0 ? Math.min(100, (totalRepassed / totalDonated) * 100) : 0;
  const selectedInst = institutions.find((i) => i.id === instFilter);

  const stats = [
    { title: "Total de Usuários", value: String(profilesCount), hint: "cadastrados", icon: Users, accent: "primary" as const },
    { title: "Cuidadores Ativos", value: String(caregiversCount), hint: "com perfil ativo", icon: TrendingUp, accent: "success" as const },
    { title: "Atendimentos Hoje", value: String(appointmentsToday), hint: "agendados", icon: Calendar, accent: "info" as const },
    { title: "Satisfação", value: String(avgRating), hint: "média geral", icon: BarChart3, accent: "warning" as const },
  ];

  return (
    <div className="space-y-8 max-w-[1400px] mx-auto">
      {/* Page hero */}
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary via-primary to-[hsl(var(--primary-dark))] text-primary-foreground p-6 md:p-8 shadow-lg">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-40 w-40 rounded-full bg-white/5 blur-2xl" />
        <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium bg-white/15 backdrop-blur px-2.5 py-1 rounded-full mb-3">
              <Sparkles className="h-3 w-3" />
              Painel Administrativo
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Bem-vindo de volta 👋
            </h2>
            <p className="text-primary-foreground/80 mt-1 max-w-xl">
              Acompanhe em tempo real a operação, o impacto social e a saúde do sistema Cuidarei.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-primary-foreground/90">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--success))] ring-2 ring-[hsl(var(--success))]/30 animate-pulse" />
            Sistema operando normalmente
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} {...s} />
        ))}
      </div>

      {/* Donations & Repasses */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2 tracking-tight">
              <span className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Heart className="h-4 w-4" />
              </span>
              Doações & Repasses
              {instFilter !== "all" && selectedInst && (
                <Badge variant="secondary" className="ml-1 font-normal">
                  <Building2 className="h-3 w-3 mr-1" />{selectedInst.name}
                </Badge>
              )}
            </h3>
            <p className="text-sm text-muted-foreground ml-10">Fluxo financeiro do impacto social</p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={instFilter} onValueChange={setInstFilter}>
              <SelectTrigger className="w-[240px] bg-background border-border/60">
                <SelectValue placeholder="Filtrar por instituição" />
              </SelectTrigger>
              <SelectContent className="bg-background z-50">
                <SelectItem value="all">Todas as instituições</SelectItem>
                {institutions.map((i) => (
                  <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Arrecadado" value={fmtBRL(totalDonated)} hint="Doações confirmadas" icon={Heart} accent="primary" />
          <StatCard
            title={instFilter === "all" ? "Total Repassado" : "Repassado"}
            value={fmtBRL(totalRepassed)}
            hint={instFilter === "all" ? "Transferências pagas" : `Pago a ${selectedInst?.name ?? ""}`}
            icon={Send} accent="success"
          />
          <StatCard
            title="Pendentes"
            value={fmtBRL(pendingRepasses)}
            hint="Aguardando confirmação"
            icon={Clock} accent="warning"
          />
          <StatCard
            title="Saldo Disponível"
            value={fmtBRL(balance)}
            hint="Arrecadado − repassado"
            icon={Wallet} accent="info"
          />
        </div>

        {totalDonated > 0 && (
          <Card className="mt-4 border-border/60 shadow-sm">
            <CardContent className="pt-5 pb-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold">
                    {instFilter === "all"
                      ? "Progresso de repasse — todas as instituições"
                      : `Progresso de repasse — ${selectedInst?.name}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Percentual do arrecadado já transferido
                  </p>
                </div>
                <span className="text-2xl font-bold text-primary tabular-nums">{repassedPct.toFixed(1)}%</span>
              </div>
              <Progress value={repassedPct} className="h-2.5" />
              <div className="flex justify-between mt-2.5 text-xs">
                <span className="text-muted-foreground">Repassado: <span className="text-foreground font-medium">{fmtBRL(totalRepassed)}</span></span>
                <span className="text-muted-foreground">Arrecadado: <span className="text-foreground font-medium">{fmtBRL(totalDonated)}</span></span>
              </div>
            </CardContent>
          </Card>
        )}

        {instFilter === "all" && institutions.length > 0 && repasses.length > 0 && (
          <Card className="mt-4 border-border/60 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                Repasses por Instituição
              </CardTitle>
              <CardDescription>Ordenado pelo total pago</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {institutions
                .map((inst) => {
                  const instR = repasses.filter((r) => r.institution_id === inst.id);
                  const paid = instR.filter((r) => r.status === "paid").reduce((s, r) => s + Number(r.amount), 0);
                  const pending = instR.filter((r) => r.status === "pending").reduce((s, r) => s + Number(r.amount), 0);
                  return { inst, paid, pending, total: instR.length };
                })
                .filter((row) => row.total > 0)
                .sort((a, b) => b.paid - a.paid)
                .map(({ inst, paid, pending }) => {
                  const pct = totalDonated > 0 ? Math.min(100, (paid / totalDonated) * 100) : 0;
                  return (
                    <div key={inst.id} className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium truncate">{inst.name}</p>
                          <span className="text-sm font-bold text-primary tabular-nums shrink-0">{fmtBRL(paid)}</span>
                        </div>
                        <div className="mt-1.5 flex items-center gap-3">
                          <Progress value={pct} className="h-1.5 flex-1" />
                          {pending > 0 && (
                            <span className="text-[11px] text-muted-foreground shrink-0">
                              + {fmtBRL(pending)} pendente
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Activity + Quick actions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-border/60 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="w-4 h-4 text-primary" /> Atividade Recente
              </CardTitle>
              <CardDescription>Últimas ações no sistema</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {recentActivities.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">Nenhuma atividade registrada ainda.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {recentActivities.map((item: any) => (
                  <div key={item.id} className="flex items-start justify-between gap-3 py-3 border-b border-border/50 last:border-0">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-[11px] font-semibold">
                        {(item.profiles?.full_name || "S").split(" ").map((s: string) => s[0]).slice(0,2).join("").toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{item.action}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.profiles?.full_name || "Sistema"}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {new Date(item.created_at).toLocaleString("pt-BR", {
                        day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Ações Rápidas</CardTitle>
            <CardDescription>Acesse funções comuns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { title: "Aprovar Cuidadores", hint: "Gerenciar perfis" },
              { title: "Ver Agendamentos", hint: "Todos os atendimentos" },
              { title: "Relatórios", hint: "Métricas e análises" },
            ].map((q) => (
              <button
                key={q.title}
                className="group w-full flex items-center justify-between p-3 rounded-lg border border-border/60 bg-background hover:bg-primary/5 hover:border-primary/40 transition-all text-left"
              >
                <div>
                  <p className="text-sm font-medium">{q.title}</p>
                  <p className="text-xs text-muted-foreground">{q.hint}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
