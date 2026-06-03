import { cn } from "@/lib/utils";
import type { AgentStatus, TaskStatus, Priority, LogLevel } from "@/lib/mock-data";

const styles: Record<string, string> = {
  online: "bg-[color-mix(in_oklab,var(--success)_18%,transparent)] text-[var(--success)] ring-1 ring-[color-mix(in_oklab,var(--success)_35%,transparent)]",
  busy: "bg-[color-mix(in_oklab,var(--info)_18%,transparent)] text-[var(--info)] ring-1 ring-[color-mix(in_oklab,var(--info)_35%,transparent)]",
  idle: "bg-muted text-muted-foreground ring-1 ring-border",
  offline: "bg-muted/60 text-muted-foreground ring-1 ring-border",
  error: "bg-[color-mix(in_oklab,var(--destructive)_18%,transparent)] text-[var(--destructive)] ring-1 ring-[color-mix(in_oklab,var(--destructive)_35%,transparent)]",

  pending: "bg-muted text-muted-foreground ring-1 ring-border",
  running: "bg-[color-mix(in_oklab,var(--info)_18%,transparent)] text-[var(--info)] ring-1 ring-[color-mix(in_oklab,var(--info)_35%,transparent)]",
  completed: "bg-[color-mix(in_oklab,var(--success)_18%,transparent)] text-[var(--success)] ring-1 ring-[color-mix(in_oklab,var(--success)_35%,transparent)]",
  failed: "bg-[color-mix(in_oklab,var(--destructive)_18%,transparent)] text-[var(--destructive)] ring-1 ring-[color-mix(in_oklab,var(--destructive)_35%,transparent)]",

  low: "bg-muted text-muted-foreground ring-1 ring-border",
  medium: "bg-[color-mix(in_oklab,var(--info)_15%,transparent)] text-[var(--info)] ring-1 ring-[color-mix(in_oklab,var(--info)_30%,transparent)]",
  high: "bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] text-[var(--warning)] ring-1 ring-[color-mix(in_oklab,var(--warning)_35%,transparent)]",
  critical: "bg-[color-mix(in_oklab,var(--destructive)_18%,transparent)] text-[var(--destructive)] ring-1 ring-[color-mix(in_oklab,var(--destructive)_35%,transparent)]",

  info: "bg-[color-mix(in_oklab,var(--info)_15%,transparent)] text-[var(--info)] ring-1 ring-[color-mix(in_oklab,var(--info)_30%,transparent)]",
  warning: "bg-[color-mix(in_oklab,var(--warning)_18%,transparent)] text-[var(--warning)] ring-1 ring-[color-mix(in_oklab,var(--warning)_35%,transparent)]",
  success: "bg-[color-mix(in_oklab,var(--success)_18%,transparent)] text-[var(--success)] ring-1 ring-[color-mix(in_oklab,var(--success)_35%,transparent)]",
  error_log: "bg-[color-mix(in_oklab,var(--destructive)_18%,transparent)] text-[var(--destructive)] ring-1 ring-[color-mix(in_oklab,var(--destructive)_35%,transparent)]",
};

type StatusKind = AgentStatus | TaskStatus | Priority | LogLevel;

export function StatusBadge({ value, dot = true, className }: { value: StatusKind; dot?: boolean; className?: string }) {
  const key = value === "error" && Object.prototype.hasOwnProperty.call(styles, "error_log") ? "error" : value;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize", styles[key], className)}>
      {dot && <span className="size-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />}
      {value}
    </span>
  );
}
