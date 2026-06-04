import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { LOGS, AGENTS, type LogLevel } from "@/lib/mock-data";
import { Search, Terminal } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/logs")({
  head: () => ({ meta: [{ title: "Logs · OpenClaw" }, { name: "description", content: "Live log stream across every agent." }] }),
  component: LogsPage,
});

function LogsPage() {
  const [agent, setAgent] = useState("all");
  const [level, setLevel] = useState("all");
  const [range, setRange] = useState("1h");
  const [q, setQ] = useState("");

  const filtered = LOGS.filter((l) =>
    (agent === "all" || l.agentName === agent) &&
    (level === "all" || l.level === level) &&
    (q === "" || l.message.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Logs</h1>
          <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
            <span className="size-2 rounded-full bg-[var(--success)] animate-pulse shadow-[0_0_8px_var(--success)]" />
            Streaming · {filtered.length} entries
          </p>
        </div>
      </div>

      <Card className="p-3 flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search logs…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <Select value={level} onValueChange={setLevel}>
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            {(["info","warning","error","success"] as LogLevel[]).map((l) => <SelectItem key={l} value={l} className="capitalize">{l}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={agent} onValueChange={setAgent}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All agents</SelectItem>
            {AGENTS.map((a) => <SelectItem key={a.id} value={a.name}>{a.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="15m">Last 15 min</SelectItem>
            <SelectItem value="1h">Last hour</SelectItem>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30 text-xs text-muted-foreground">
          <Terminal className="size-3.5" />
          <span className="font-mono">/var/log/openclaw/stream.log</span>
        </div>
        <div className="font-mono text-xs divide-y divide-border max-h-[calc(100vh-22rem)] overflow-auto">
          {filtered.length === 0 && <div className="p-12 text-center text-muted-foreground font-sans">No log entries match your filters.</div>}
          {filtered.map((l) => (
            <div key={l.id} className="grid grid-cols-[80px_120px_80px_1fr] gap-3 px-4 py-2.5 hover:bg-muted/20">
              <span className="text-muted-foreground">{l.ts}</span>
              <span className="text-foreground">{l.agentName}</span>
              <StatusBadge value={l.level} dot={false} className="!text-[10px] !py-0 justify-self-start" />
              <span className="text-muted-foreground">{l.message}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
