import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Outlet, useLocation } from "react-router-dom";
import { Bell, Search, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const routeTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/usuarios": "Usuários",
  "/admin/cuidadores": "Cuidadores",
  "/admin/clientes": "Clientes",
  "/admin/agendamentos": "Agendamentos",
  "/admin/planos": "Planos",
  "/admin/doacoes": "Doações",
  "/admin/repasses": "Repasses",
  "/admin/instituicoes": "Instituições",
  "/admin/parceiros": "Parceiros",
  "/admin/relatorios": "Relatórios",
  "/admin/configuracoes": "Configurações",
};

export function AdminLayout() {
  const { pathname } = useLocation();
  const { profile } = useAuth();
  const title = routeTitles[pathname] || "Painel";
  const initials = (profile?.full_name || "A")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[hsl(var(--section-light))]">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 border-b border-border/60 bg-background/80 backdrop-blur-md flex items-center gap-4 px-4 md:px-6 sticky top-0 z-20">
            <SidebarTrigger className="shrink-0" />

            <div className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>Cuidarei</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">{title}</span>
            </div>

            <div className="ml-auto flex items-center gap-2 md:gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar..."
                  className="pl-9 h-9 w-64 bg-muted/40 border-transparent focus-visible:bg-background"
                />
              </div>

              <Button variant="ghost" size="icon" className="relative rounded-full">
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
              </Button>

              <div className="h-9 w-px bg-border hidden md:block" />

              <div className="flex items-center gap-2.5 pr-1">
                <div className="hidden md:flex flex-col items-end leading-tight">
                  <span className="text-sm font-medium truncate max-w-[140px]">
                    {profile?.full_name || "Admin"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">Administrador</span>
                </div>
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground flex items-center justify-center text-xs font-semibold shadow-sm ring-2 ring-background">
                  {initials}
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
