import { LayoutDashboard, Users, Settings, Calendar, BarChart3, LogOut, HeartHandshake, UserCheck, Star, Heart, Send, Building2, Briefcase } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/BrandLogo";

const menuSections: { label: string; items: { title: string; url: string; icon: any }[] }[] = [
  {
    label: "Visão Geral",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
      { title: "Relatórios", url: "/admin/relatorios", icon: BarChart3 },
    ],
  },
  {
    label: "Pessoas",
    items: [
      { title: "Usuários", url: "/admin/usuarios", icon: Users },
      { title: "Cuidadores", url: "/admin/cuidadores", icon: HeartHandshake },
      { title: "Clientes", url: "/admin/clientes", icon: UserCheck },
    ],
  },
  {
    label: "Operação",
    items: [
      { title: "Agendamentos", url: "/admin/agendamentos", icon: Calendar },
      { title: "Planos", url: "/admin/planos", icon: Star },
    ],
  },
  {
    label: "Impacto Social",
    items: [
      { title: "Doações", url: "/admin/doacoes", icon: Heart },
      { title: "Repasses", url: "/admin/repasses", icon: Send },
      { title: "Instituições", url: "/admin/instituicoes", icon: Building2 },
      { title: "Parceiros", url: "/admin/parceiros", icon: Briefcase },
    ],
  },
  {
    label: "Sistema",
    items: [
      { title: "Configurações", url: "/admin/configuracoes", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { signOut, profile } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/60">
      <SidebarHeader className="border-b border-border/60 p-4">
        <div className={cn("flex items-center gap-2.5", collapsed && "justify-center")}>
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/40 to-[hsl(var(--primary-dark))]/40 blur-md opacity-60" />
            <div className="relative"><BrandMark /></div>
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                Cuidarei
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.14em] font-medium">
                Admin Panel
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {menuSections.map((section) => (
          <SidebarGroup key={section.label}>
            {!collapsed && (
              <SidebarGroupLabel className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70 font-semibold px-2">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.url}
                        end={item.url === "/admin"}
                        className={({ isActive }) =>
                          cn(
                            "group relative flex items-center gap-2.5 w-full rounded-md transition-all",
                            isActive
                              ? "bg-gradient-to-r from-primary/12 to-primary/0 text-primary font-medium"
                              : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                          )
                        }
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && (
                              <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full bg-primary" />
                            )}
                            <item.icon
                              className={cn(
                                "h-4 w-4 shrink-0 transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                              )}
                            />
                            <span className="truncate">{item.title}</span>
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 p-3">
        {!collapsed && (
          <div className="flex items-center gap-2.5 mb-2 px-2 py-2 rounded-lg bg-muted/40">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--primary-dark))] text-primary-foreground flex items-center justify-center text-[11px] font-semibold shrink-0">
              {(profile?.full_name || "A").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase()}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">{profile?.full_name || "Admin"}</span>
              <span className="text-[11px] text-muted-foreground">Administrador</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className={cn(
            "w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10",
            collapsed && "justify-center"
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Sair</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AdminSidebar;
