import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Bot, ListChecks, Workflow, ScrollText, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const items: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/agents", label: "Agents", icon: Bot },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/workflows", label: "Workflows", icon: Workflow },
  { to: "/logs", label: "Logs", icon: ScrollText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex h-screen sticky top-0 w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
        <div className="relative">
          <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-accent grid place-items-center glow-primary">
            <Sparkles className="size-5 text-primary-foreground" />
          </div>
        </div>
        <div className="leading-tight">
          <div className="font-semibold tracking-tight">OpenClaw</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Control Center</div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((it) => {
          const active = it.exact ? path === it.to : path.startsWith(it.to);
          const Icon = it.icon;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_0_1px_0_color-mix(in_oklab,var(--primary)_30%,transparent)]"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
              )}
            >
              <Icon className={cn("size-4 transition-colors", active && "text-primary")} />
              <span className="font-medium">{it.label}</span>
              {active && <span className="ml-auto size-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 m-3 rounded-xl border border-sidebar-border bg-gradient-to-br from-card to-sidebar">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-[var(--success)] shadow-[0_0_8px_var(--success)] animate-pulse" />
          All systems operational
        </div>
        <div className="mt-2 text-[11px] text-muted-foreground/80">v2.4.1 · build a91f</div>
      </div>
    </aside>
  );
}
