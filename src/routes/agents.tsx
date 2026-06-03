import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AGENTS, type Agent } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { AgentDetailSheet } from "@/components/agents/AgentDetailSheet";
import { Bot, Play, Square, RotateCcw, Send, Search, Grid2x2, List } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agents")({
  head: () => ({ meta: [{ title: "Agents · OpenClaw" }, { name: "description", content: "Manage and monitor your AI agents." }] }),
  component: AgentsPage,
});

function AgentsPage() {
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "table">("grid");
  const [selected, setSelected] = useState<Agent | null>(null);

  const filtered = AGENTS.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()) || a.type.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Agents</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} agents · click to inspect</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input placeholder="Filter agents…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9 w-64" />
          </div>
          <div className="flex rounded-lg border border-border p-0.5 bg-card">
            <button onClick={() => setView("grid")} className={cn("size-8 grid place-items-center rounded-md transition", view === "grid" ? "bg-primary/15 text-primary" : "text-muted-foreground")}>
              <Grid2x2 className="size-4" />
            </button>
            <button onClick={() => setView("table")} className={cn("size-8 grid place-items-center rounded-md transition", view === "table" ? "bg-primary/15 text-primary" : "text-muted-foreground")}>
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((a) => (
            <Card key={a.id} onClick={() => setSelected(a)} className="p-5 cursor-pointer group hover:border-primary/40 transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-15px_var(--primary)]">
              <div className="flex items-start justify-between">
                <div className="size-11 rounded-xl bg-gradient-to-br from-primary/25 to-accent/25 grid place-items-center border border-border">
                  <Bot className="size-5 text-primary" />
                </div>
                <StatusBadge value={a.status} />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold tracking-tight">{a.name}</h3>
                <p className="text-xs text-muted-foreground">{a.type}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-2 min-h-[2rem]">{a.currentTask ?? "No active task"}</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {a.capabilities.slice(0, 3).map((c) => (
                  <span key={c} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground border border-border">{c}</span>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-2 text-center">
                <Metric mini label="Resp" value={`${a.responseTime}ms`} />
                <Metric mini label="Success" value={`${a.successRate}%`} />
                <Metric mini label="Active" value={a.lastActive} />
              </div>
              <div className="mt-3 flex gap-1 opacity-0 group-hover:opacity-100 transition" onClick={(e) => e.stopPropagation()}>
                <IconBtn onClick={() => toast.success(`Started ${a.name}`)}><Play className="size-3.5" /></IconBtn>
                <IconBtn onClick={() => toast.success(`Stopped ${a.name}`)}><Square className="size-3.5" /></IconBtn>
                <IconBtn onClick={() => toast.success(`Restarted ${a.name}`)}><RotateCcw className="size-3.5" /></IconBtn>
                <IconBtn onClick={() => toast.success(`Task assigned to ${a.name}`)}><Send className="size-3.5" /></IconBtn>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left font-medium px-4 py-3">Agent</th>
                <th className="text-left font-medium px-4 py-3">Status</th>
                <th className="text-left font-medium px-4 py-3">Current Task</th>
                <th className="text-right font-medium px-4 py-3">Response</th>
                <th className="text-right font-medium px-4 py-3">Success</th>
                <th className="text-left font-medium px-4 py-3">Last Active</th>
                <th className="text-right font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => setSelected(a)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-lg bg-primary/15 grid place-items-center"><Bot className="size-4 text-primary" /></div>
                      <div><div className="font-medium">{a.name}</div><div className="text-xs text-muted-foreground">{a.type}</div></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><StatusBadge value={a.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground truncate max-w-[260px]">{a.currentTask ?? "—"}</td>
                  <td className="px-4 py-3 text-right font-mono">{a.responseTime}ms</td>
                  <td className="px-4 py-3 text-right font-mono">{a.successRate}%</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.lastActive}</td>
                  <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="inline-flex gap-1">
                      <IconBtn onClick={() => toast.success(`Started ${a.name}`)}><Play className="size-3.5" /></IconBtn>
                      <IconBtn onClick={() => toast.success(`Stopped ${a.name}`)}><Square className="size-3.5" /></IconBtn>
                      <IconBtn onClick={() => toast.success(`Restarted ${a.name}`)}><RotateCcw className="size-3.5" /></IconBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      <AgentDetailSheet agent={selected} onOpenChange={(o) => !o && setSelected(null)} />
    </div>
  );
}

function Metric({ label, value, mini }: { label: string; value: string; mini?: boolean }) {
  return (
    <div>
      <div className={cn("text-muted-foreground", mini ? "text-[10px]" : "text-xs")}>{label}</div>
      <div className={cn("font-mono", mini ? "text-xs" : "text-sm")}>{value}</div>
    </div>
  );
}

function IconBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <Button variant="outline" size="icon" className="size-7" onClick={onClick}>{children}</Button>
  );
}
