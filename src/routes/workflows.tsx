import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Play, Save, Bot, ArrowRight, Workflow as WorkflowIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/workflows")({
  head: () => ({ meta: [{ title: "Workflows · OpenClaw" }, { name: "description", content: "Visually compose multi-agent workflows." }] }),
  component: WorkflowsPage,
});

const nodes = [
  { name: "User Request", color: "var(--muted-foreground)" },
  { name: "ResearchAgent", color: "var(--info)" },
  { name: "CodeAgent", color: "var(--accent)" },
  { name: "QAAgent", color: "var(--success)" },
  { name: "OpenClaw", color: "var(--primary)" },
];

const savedWorkflows = [
  { id: "w1", name: "Customer Onboarding", agents: 5, runs: 142, status: "Active" },
  { id: "w2", name: "Code Review Pipeline", agents: 3, runs: 87, status: "Active" },
  { id: "w3", name: "Weekly Research Digest", agents: 4, runs: 26, status: "Paused" },
  { id: "w4", name: "Support Triage", agents: 6, runs: 318, status: "Active" },
];

function WorkflowsPage() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Workflows</h1>
          <p className="text-sm text-muted-foreground mt-1">Compose how your agents collaborate</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.success("Workflow saved")} className="gap-1.5"><Save className="size-4" /> Save</Button>
          <Button variant="outline" onClick={() => toast.success("Workflow started")} className="gap-1.5"><Play className="size-4" /> Run</Button>
          <Button onClick={() => toast("New workflow created")} className="gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground border-0"><Plus className="size-4" /> New Workflow</Button>
        </div>
      </div>

      <Card className="p-6 relative overflow-hidden" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--border) 80%, transparent) 1px, transparent 0)",
        backgroundSize: "24px 24px",
      }}>
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="size-4 text-primary" />
          <span className="text-sm font-medium">Active workflow: Research → Code → Validate</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-4">
          {nodes.map((n, i) => (
            <div key={n.name} className="flex items-center gap-2 shrink-0">
              <div className="rounded-xl border border-border bg-card/80 backdrop-blur p-4 min-w-[180px] hover:border-primary/50 transition cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-8 rounded-lg grid place-items-center" style={{ backgroundColor: `color-mix(in oklab, ${n.color} 20%, transparent)`, color: n.color }}>
                    <Bot className="size-4" />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Node {i + 1}</span>
                </div>
                <div className="font-semibold text-sm">{n.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{i === 0 ? "Trigger" : "Agent"}</div>
              </div>
              {i < nodes.length - 1 && (
                <ArrowRight className="size-5 text-muted-foreground/60 shrink-0" />
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-4 italic">Drag nodes onto the canvas to compose new flows. Click a node to configure its behavior.</p>
      </Card>

      <div>
        <h2 className="font-semibold mb-3">Saved workflows</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {savedWorkflows.map((w) => (
            <Card key={w.id} className="p-5 hover:border-primary/40 transition cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="size-10 rounded-lg bg-primary/15 grid place-items-center text-primary"><WorkflowIcon className="size-5" /></div>
                <span className={`text-[11px] px-2 py-0.5 rounded-full ${w.status === "Active" ? "bg-[color-mix(in_oklab,var(--success)_18%,transparent)] text-[var(--success)]" : "bg-muted text-muted-foreground"}`}>{w.status}</span>
              </div>
              <h3 className="font-semibold mt-3">{w.name}</h3>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{w.agents} agents</span>
                <span className="font-mono">{w.runs} runs</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
