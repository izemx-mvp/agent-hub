import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AGENTS } from "@/lib/mock-data";
import { toast } from "sonner";
import { useState } from "react";

export function NewTaskDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [title, setTitle] = useState("");

  const submit = () => {
    toast.success("Task created successfully", { description: title || "New task queued to the agent pool." });
    setTitle("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create new task</DialogTitle>
          <DialogDescription>Dispatch a task to one of your agents.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="task-title">Task name</Label>
            <Input id="task-title" placeholder="e.g. Summarize this week's support tickets" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="task-desc">Description</Label>
            <Textarea id="task-desc" placeholder="Give the agent enough context to succeed…" rows={3} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label>Agent</Label>
              <Select defaultValue="a1">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {AGENTS.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Priority</Label>
              <Select defaultValue="medium">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Task type</Label>
            <Select defaultValue="General">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Research", "Coding", "Browsing", "Email", "Calendar", "Data Processing", "General"].map((t) =>
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={submit} className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0">Dispatch task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
