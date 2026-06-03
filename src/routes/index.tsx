import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Bot, Activity, ListChecks, AlertTriangle, Timer, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AGENTS, LOGS, PERFORMANCE_SERIES, SYSTEM_LOAD } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · OpenClaw Agent Control Center" },
      { name: "description", content: "Real-time overview of every AI agent in your fleet." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const activeAgents = AGENTS.filter((a) => a.status === "online" || a.status === "busy").length;
  const runningTasks = 4;
  const failedTasks = 1;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Mission Control</h1>
          <p className="text-sm text-muted-foreground mt-1">Live overview of your agent fleet · updated 3s ago</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-[var(--success)] animate-pulse shadow-[0_0_8px_var(--success)]" />
          Streaming telemetry
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        <Stat icon={Bot} label="Total Agents" value="10" trend="+2" up />
        <Stat icon={Activity} label="Active" value={String(activeAgents)} trend="+1" up />
        <Stat icon={ListChecks} label="Running Tasks" value={String(runningTasks)} trend="+3" up />
        <Stat icon={AlertTriangle} label="Failed" value={String(failedTasks)} trend="-2" up={false} good />
        <Stat icon={Timer} label="Avg Response" value="312ms" trend="-18ms" up={false} good />
        <Stat icon={TrendingUp} label="Success Rate" value="97.4%" trend="+0.6%" up />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold">Agent performance</h2>
              <p className="text-xs text-muted-foreground">Successful runs vs failures · last 24h</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <Legend color="var(--primary)" label="Success" />
              <Legend color="var(--destructive)" label="Failures" />
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE_SERIES}>
                <defs>
                  <linearGradient id="gSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gFail" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--destructive)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--destructive)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="hour" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="success" stroke="var(--primary)" fill="url(#gSuccess)" strokeWidth={2} />
                <Area type="monotone" dataKey="failures" stroke="var(--destructive)" fill="url(#gFail)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-semibold">System load</h2>
          <p className="text-xs text-muted-foreground mb-3">Current resource utilization</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="30%" outerRadius="100%" data={SYSTEM_LOAD} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "var(--muted)" } as object} dataKey="value" cornerRadius={8} fill="var(--primary)" />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 12 }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {SYSTEM_LOAD.map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-md bg-muted/40 px-2 py-1.5 text-xs">
                <span className="text-muted-foreground">{s.name}</span>
                <span className="font-mono font-medium">{s.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Agent health</h2>
            <span className="text-xs text-muted-foreground">{AGENTS.length} agents</span>
          </div>
          <div className="divide-y divide-border">
            {AGENTS.slice(0, 7).map((a) => (
              <div key={a.id} className="py-3 flex items-center gap-3">
                <div className="size-9 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 grid place-items-center border border-border">
                  <Bot className="size-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{a.name}</span>
                    <span className="text-[11px] text-muted-foreground">{a.type}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${a.successRate}%` }} />
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-mono">{a.successRate}%</div>
                  <div className="text-muted-foreground">{a.responseTime}ms</div>
                </div>
                <StatusBadge value={a.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold">Recent activity</h2>
          </div>
          <div className="space-y-2 max-h-[420px] overflow-auto pr-1">
            {LOGS.slice(0, 10).map((l) => (
              <div key={l.id} className="flex items-start gap-2 p-2.5 rounded-lg border border-border/60 bg-card/60">
                <StatusBadge value={l.level} dot={false} className="!text-[10px] !py-0 shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs"><span className="font-medium">{l.agentName}</span> <span className="text-muted-foreground">· {l.ts}</span></div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{l.message}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value, trend, up, good }: { icon: typeof Bot; label: string; value: string; trend: string; up: boolean; good?: boolean }) {
  const positive = good ? !up : up;
  return (
    <Card className="p-4 relative overflow-hidden">
      <div className="absolute -top-8 -right-8 size-24 rounded-full bg-primary/5 blur-2xl" />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Icon className="size-4 text-primary/80" />
      </div>
      <div className="mt-2 flex items-end gap-2">
        <div className="text-2xl font-semibold tracking-tight font-mono">{value}</div>
        <div className={`flex items-center gap-0.5 text-[11px] mb-1 ${positive ? "text-[var(--success)]" : "text-[var(--destructive)]"}`}>
          {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {trend}
        </div>
      </div>
    </Card>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className="size-2 rounded-sm" style={{ background: color }} />
      {label}
    </span>
  );
}
