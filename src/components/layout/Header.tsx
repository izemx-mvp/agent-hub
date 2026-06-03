import { Bell, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NewTaskDialog } from "@/components/tasks/NewTaskDialog";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="h-full px-4 md:px-6 flex items-center gap-3">
        <div className="hidden lg:block">
          <h1 className="text-sm font-semibold tracking-tight">OpenClaw Agent Control Center</h1>
          <p className="text-[11px] text-muted-foreground">Orchestrating 10 agents across 3 workspaces</p>
        </div>

        <div className="flex-1 max-w-xl mx-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search agents, tasks, workflows…"
            className="w-full h-10 rounded-lg bg-card/60 border border-border pl-9 pr-3 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" className="gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 border-0" onClick={() => setOpen(true)}>
            <Plus className="size-4" /> New Task
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-[var(--destructive)] shadow-[0_0_6px_var(--destructive)]" />
          </Button>
          <Avatar className="size-9 ring-1 ring-border">
            <AvatarFallback className="bg-gradient-to-br from-primary/30 to-accent/30 text-foreground text-xs font-semibold">AK</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <NewTaskDialog open={open} onOpenChange={setOpen} />
    </header>
  );
}
