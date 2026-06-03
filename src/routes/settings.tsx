import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · OpenClaw" }, { name: "description", content: "Configure your control center." }] }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Tune the look, feel and behavior of the control center.</p>
      </div>

      <Tabs defaultValue="appearance">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="danger">Danger zone</TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card className="p-5 space-y-4">
            <SettingRow label="Dark mode" description="Use a dark UI everywhere. Recommended for low-light operations.">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Reduced motion" description="Minimize animations across the dashboard.">
              <Switch />
            </SettingRow>
            <SettingRow label="High-density tables" description="Show more rows per screen.">
              <Switch defaultChecked />
            </SettingRow>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card className="p-5 space-y-4">
            <SettingRow label="Task failures" description="Notify me whenever an agent task fails.">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Agent goes offline" description="Push a desktop notification.">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Workflow completed" description="Confirm long-running workflows.">
              <Switch />
            </SettingRow>
            <SettingRow label="Weekly digest email" description="Summary of performance every Monday.">
              <Switch />
            </SettingRow>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4 mt-4">
          <Card className="p-5 space-y-4">
            <SettingRow label="Auto-restart failed agents" description="Attempt up to 3 restarts before alerting.">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Show idle agents in dashboard" description="Hide to declutter the main view.">
              <Switch defaultChecked />
            </SettingRow>
            <SettingRow label="Default agent" description="The agent that handles unrouted tasks.">
              <Input defaultValue="OpenClaw" className="w-48" />
            </SettingRow>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4 mt-4">
          <Card className="p-5 space-y-4">
            <div className="grid gap-2">
              <Label>API Endpoint</Label>
              <Input defaultValue="https://api.openclaw.local/v2" />
            </div>
            <div className="grid gap-2">
              <Label>API Key</Label>
              <Input type="password" defaultValue="sk_live_••••••••••••••••" />
            </div>
            <div className="grid gap-2">
              <Label>Request timeout (ms)</Label>
              <Input type="number" defaultValue={5000} />
            </div>
            <div>
              <Button onClick={() => toast.success("Settings saved")} className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0">Save changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="danger" className="space-y-4 mt-4">
          <Card className="p-5 border-[var(--destructive)]/40 space-y-4">
            <div>
              <h3 className="font-semibold text-[var(--destructive)]">Reset all agent state</h3>
              <p className="text-sm text-muted-foreground">Clears memory, caches and pending tasks for every agent.</p>
              <Button variant="destructive" disabled className="mt-3">Reset state</Button>
            </div>
            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold text-[var(--destructive)]">Delete workspace</h3>
              <p className="text-sm text-muted-foreground">This action is permanent and cannot be undone.</p>
              <Button variant="destructive" disabled className="mt-3">Delete workspace</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SettingRow({ label, description, children }: { label: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <div className="font-medium text-sm">{label}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
