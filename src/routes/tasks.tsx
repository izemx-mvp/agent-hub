import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { TASKS, AGENTS, type Task, type TaskStatus, type Priority } from "@/lib/mock-data";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, RotateCw, X, Eye } from "lucide-react";
import { NewTaskDialog } from "@/components/tasks/NewTaskDialog";
import { toast } from "sonner";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "Tasks · OpenClaw" }, { name: "description", content: "Task queue and history across all agents." }] }),
  component: TasksPage,
});

function TasksPage() {
  const [status, setStatus] = useState<string>("all");
  const [agent, setAgent] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = TASKS.filter((t) =>
    (status === "all" || t.status === status) &&
    (agent === "all" || t.agentId === agent) &&
    (priority === "all" || t.priority === priority) &&
    (q === "" || t.title.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground mt-1">{filtered.length} tasks in view</p>
        </div>
        <Button onClick={() => setOpen(true)} className="gap-1.5 bg-gradient-to-r from-primary to-accent text-primary-foreground border-0"><Plus className="size-4" /> New Task</Button>
      </div>

      <Card className="p-3 flex flex-wrap gap-2 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input placeholder="Search tasks…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <FilterSelect value={status} onChange={setStatus} placeholder="Status" options={[["all","All status"],...(["pending","running","completed","failed"] as TaskStatus[]).map((s) => [s, s] as [string,string])]} />
        <FilterSelect value={priority} onChange={setPriority} placeholder="Priority" options={[["all","All priority"],...(["low","medium","high","critical"] as Priority[]).map((s) => [s, s] as [string,string])]} />
        <FilterSelect value={agent} onChange={setAgent} placeholder="Agent" options={[["all","All agents"], ...AGENTS.map((a) => [a.id, a.name] as [string,string])]} />
      </Card>

      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wider">
            <tr>
              <th className="text-left font-medium px-4 py-3">Task</th>
              <th className="text-left font-medium px-4 py-3">Agent</th>
              <th className="text-left font-medium px-4 py-3">Priority</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="text-left font-medium px-4 py-3">Created</th>
              <th className="text-right font-medium px-4 py-3">Duration</th>
              <th className="text-right font-medium px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-16 text-center text-muted-foreground">No tasks match your filters.</td></tr>
            )}
            {filtered.map((t) => <TaskRow key={t.id} task={t} />)}
          </tbody>
        </table>
      </Card>

      <NewTaskDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

function TaskRow({ task }: { task: Task }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr className="hover:bg-muted/30">
        <td className="px-4 py-3">
          <div className="font-medium">{task.title}</div>
          <div className="text-xs text-muted-foreground">{task.type}</div>
        </td>
        <td className="px-4 py-3 text-muted-foreground">{task.agentName}</td>
        <td className="px-4 py-3"><StatusBadge value={task.priority} dot={false} /></td>
        <td className="px-4 py-3"><StatusBadge value={task.status} /></td>
        <td className="px-4 py-3 text-muted-foreground">{task.createdAt}</td>
        <td className="px-4 py-3 text-right font-mono">{task.durationSec}s</td>
        <td className="px-4 py-3 text-right">
          <div className="inline-flex gap-1">
            <Button variant="outline" size="icon" className="size-7" onClick={() => setExpanded((v) => !v)}><Eye className="size-3.5" /></Button>
            <Button variant="outline" size="icon" className="size-7" onClick={() => toast.success(`Retrying ${task.title}`)}><RotateCw className="size-3.5" /></Button>
            <Button variant="outline" size="icon" className="size-7" onClick={() => toast(`Cancelled ${task.title}`)}><X className="size-3.5" /></Button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className="bg-muted/20">
          <td colSpan={7} className="px-4 py-3">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Output preview</div>
            <pre className="font-mono text-xs whitespace-pre-wrap p-3 rounded-lg bg-background border border-border">{task.output}</pre>
          </td>
        </tr>
      )}
    </>
  );
}

function FilterSelect({ value, onChange, placeholder, options }: { value: string; onChange: (v: string) => void; placeholder: string; options: [string,string][] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]"><SelectValue placeholder={placeholder} /></SelectTrigger>
      <SelectContent>{options.map(([v,l]) => <SelectItem key={v} value={v} className="capitalize">{l}</SelectItem>)}</SelectContent>
    </Select>
  );
}
