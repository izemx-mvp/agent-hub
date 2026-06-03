import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Play, Square, RotateCcw, Send, Activity } from "lucide-react";
import { type Agent, LOGS, TASKS } from "@/lib/mock-data";
import { toast } from "sonner";

export function AgentDetailSheet({ agent, onOpenChange }: { agent: Agent | null; onOpenChange: (o: boolean) => void }) {
  if (!agent) return null;
  const logs = LOGS.filter((l) => l.agentName === agent.name).slice(0, 5);
  const tasks = TASKS.filter((t) => t.agentId === agent.id).slice(0, 5);

  const act = (label: string) => toast.success(`${label} sent to ${agent.name}`);

  return (
    <Sheet open={!!agent} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-0">
        <div className="p-6 border-b border-border bg-gradient-to-br from-card to-background">
          <SheetHeader className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/30 grid place-items-center text-primary border border-border">
                <Activity className="size-6" />
              </div>
              <div className="flex-1">
                <SheetTitle className="text-xl">{agent.name}</SheetTitle>
                <SheetDescription>{agent.type} agent</SheetDescription>
              </div>
              <StatusBadge value={agent.status} />
            </div>
          </SheetHeader>
          <p className="mt-4 text-sm text-muted-foreground">{agent.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => act("Start")} className="gap-1.5"><Play className="size-4" /> Start</Button>
            <Button size="sm" variant="secondary" onClick={() => act("Stop")} className="gap-1.5"><Square className="size-4" /> Stop</Button>
            <Button size="sm" variant="secondary" onClick={() => act("Restart")} className="gap-1.5"><RotateCcw className="size-4" /> Restart</Button>
            <Button size="sm" variant="outline" onClick={() => act("Assign task")} className="gap-1.5"><Send className="size-4" /> Assign Task</Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <section>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Capabilities</h3>
            <div className="flex flex-wrap gap-1.5">
              {agent.capabilities.map((c) => (
                <span key={c} className="text-xs px-2.5 py-1 rounded-md bg-muted text-foreground border border-border">{c}</span>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-3 gap-3">
            <Metric label="Response" value={`${agent.responseTime}ms`} />
            <Metric label="Success" value={`${agent.successRate}%`} />
            <Metric label="Last active" value={agent.lastActive} />
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Recent tasks</h3>
            <div className="space-y-2">
              {tasks.length === 0 && <p className="text-sm text-muted-foreground">No tasks yet.</p>}
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border bg-card">
                  <div className="min-w-0">
                    <p className="text-sm truncate">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.createdAt} · {t.type}</p>
                  </div>
                  <StatusBadge value={t.status} />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Recent logs</h3>
            <div className="space-y-1.5 font-mono text-xs">
              {logs.length === 0 && <p className="text-sm font-sans text-muted-foreground">No logs yet.</p>}
              {logs.map((l) => (
                <div key={l.id} className="flex gap-3 p-2 rounded border border-border bg-background/60">
                  <span className="text-muted-foreground">{l.ts}</span>
                  <StatusBadge value={l.level} dot={false} className="!py-0 !text-[10px]" />
                  <span className="flex-1 truncate">{l.message}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-base font-semibold mt-0.5">{value}</div>
    </div>
  );
}
