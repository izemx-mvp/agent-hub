export type AgentStatus = "online" | "offline" | "busy" | "idle" | "error";
export type TaskStatus = "pending" | "running" | "completed" | "failed";
export type Priority = "low" | "medium" | "high" | "critical";
export type LogLevel = "info" | "warning" | "error" | "success";

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: AgentStatus;
  description: string;
  capabilities: string[];
  currentTask: string | null;
  responseTime: number; // ms
  successRate: number; // 0-100
  lastActive: string;
}

export interface Task {
  id: string;
  title: string;
  agentId: string;
  agentName: string;
  priority: Priority;
  status: TaskStatus;
  createdAt: string;
  durationSec: number;
  output: string;
  type: string;
}

export interface LogEntry {
  id: string;
  ts: string;
  agentName: string;
  level: LogLevel;
  message: string;
}

export const AGENTS: Agent[] = [
  { id: "a1", name: "OpenClaw", type: "Orchestrator", status: "online", description: "Primary orchestrator coordinating all sub-agents and routing requests.", capabilities: ["Routing", "Planning", "Delegation", "Memory"], currentTask: "Coordinating workflow #482", responseTime: 142, successRate: 98.7, lastActive: "just now" },
  { id: "a2", name: "ResearchAgent", type: "Research", status: "busy", description: "Performs deep web research and synthesizes findings.", capabilities: ["Web Search", "Summarization", "Citations"], currentTask: "Analyzing 24 sources on Q4 market trends", responseTime: 980, successRate: 94.2, lastActive: "12s ago" },
  { id: "a3", name: "CodeAgent", type: "Engineering", status: "error", description: "Writes, edits and executes code across multiple languages.", capabilities: ["TS/JS", "Python", "Refactor", "Tests"], currentTask: null, responseTime: 420, successRate: 91.0, lastActive: "2m ago" },
  { id: "a4", name: "BrowserAgent", type: "Automation", status: "idle", description: "Drives a headless browser for scraping and form automation.", capabilities: ["Navigation", "Scraping", "DOM Eval"], currentTask: null, responseTime: 310, successRate: 96.4, lastActive: "5m ago" },
  { id: "a5", name: "DataCleaner", type: "Data", status: "online", description: "Cleans, normalizes and validates structured datasets.", capabilities: ["CSV", "JSON", "Dedup", "Validation"], currentTask: "Normalizing customer export", responseTime: 220, successRate: 99.1, lastActive: "just now" },
  { id: "a6", name: "EmailAgent", type: "Communication", status: "idle", description: "Drafts and triages email threads.", capabilities: ["Drafting", "Summarize", "Reply"], currentTask: null, responseTime: 180, successRate: 97.3, lastActive: "8m ago" },
  { id: "a7", name: "CalendarAgent", type: "Productivity", status: "online", description: "Schedules meetings and resolves conflicts.", capabilities: ["Scheduling", "Reminders", "Timezone"], currentTask: "Booking Q1 planning sync", responseTime: 150, successRate: 98.0, lastActive: "1m ago" },
  { id: "a8", name: "FileAgent", type: "Storage", status: "offline", description: "Reads and writes across the workspace filesystem.", capabilities: ["Read", "Write", "Search"], currentTask: null, responseTime: 95, successRate: 99.6, lastActive: "1h ago" },
  { id: "a9", name: "WorkflowPlanner", type: "Planner", status: "busy", description: "Decomposes goals into multi-agent workflows.", capabilities: ["Planning", "DAGs", "Routing"], currentTask: "Building workflow for onboarding", responseTime: 510, successRate: 95.8, lastActive: "just now" },
  { id: "a10", name: "QAAgent", type: "Quality", status: "online", description: "Validates outputs and runs test suites.", capabilities: ["Validation", "Testing", "Linting"], currentTask: "Validating CodeAgent output", responseTime: 260, successRate: 97.9, lastActive: "30s ago" },
];

export const TASKS: Task[] = [
  { id: "t1", title: "Summarize Q4 competitor landscape", agentId: "a2", agentName: "ResearchAgent", priority: "high", status: "running", createdAt: "2m ago", durationSec: 132, output: "Collected 24/30 sources, drafting summary…", type: "Research" },
  { id: "t2", title: "Refactor billing module", agentId: "a3", agentName: "CodeAgent", priority: "critical", status: "failed", createdAt: "14m ago", durationSec: 412, output: "Error: Type 'Invoice' is missing property 'lineItems'.", type: "Coding" },
  { id: "t3", title: "Clean Salesforce export", agentId: "a5", agentName: "DataCleaner", priority: "medium", status: "running", createdAt: "5m ago", durationSec: 78, output: "Removed 1,204 duplicate rows.", type: "Data Processing" },
  { id: "t4", title: "Draft launch announcement", agentId: "a6", agentName: "EmailAgent", priority: "low", status: "pending", createdAt: "1m ago", durationSec: 0, output: "Queued.", type: "Email" },
  { id: "t5", title: "Validate onboarding workflow", agentId: "a10", agentName: "QAAgent", priority: "high", status: "completed", createdAt: "1h ago", durationSec: 220, output: "All 18 assertions passed.", type: "General" },
  { id: "t6", title: "Book Q1 planning sync", agentId: "a7", agentName: "CalendarAgent", priority: "medium", status: "completed", createdAt: "20m ago", durationSec: 18, output: "Meeting created for Jan 14, 10:00.", type: "Calendar" },
  { id: "t7", title: "Scrape pricing pages", agentId: "a4", agentName: "BrowserAgent", priority: "medium", status: "pending", createdAt: "30s ago", durationSec: 0, output: "Awaiting agent slot.", type: "Browsing" },
  { id: "t8", title: "Plan customer onboarding flow", agentId: "a9", agentName: "WorkflowPlanner", priority: "high", status: "running", createdAt: "3m ago", durationSec: 95, output: "Generated 4-node workflow draft.", type: "General" },
];

export const LOGS: LogEntry[] = [
  { id: "l1", ts: "14:02:11", agentName: "OpenClaw", level: "success", message: "Completed task #482 in 1.2s" },
  { id: "l2", ts: "14:02:04", agentName: "CodeAgent", level: "error", message: "Failed to execute script: TypeError on line 84" },
  { id: "l3", ts: "14:01:57", agentName: "ResearchAgent", level: "info", message: "Started web analysis across 24 sources" },
  { id: "l4", ts: "14:01:30", agentName: "QAAgent", level: "success", message: "Validated output of CodeAgent (18/18 passed)" },
  { id: "l5", ts: "14:01:15", agentName: "BrowserAgent", level: "info", message: "Agent is idle, awaiting assignment" },
  { id: "l6", ts: "14:00:58", agentName: "DataCleaner", level: "warning", message: "Found 12 ambiguous rows during normalization" },
  { id: "l7", ts: "14:00:42", agentName: "WorkflowPlanner", level: "info", message: "Decomposed goal into 4 sub-tasks" },
  { id: "l8", ts: "14:00:11", agentName: "EmailAgent", level: "success", message: "Drafted 3 replies for review" },
  { id: "l9", ts: "13:59:50", agentName: "FileAgent", level: "warning", message: "Disk usage at 78% on workspace volume" },
  { id: "l10", ts: "13:59:22", agentName: "CalendarAgent", level: "success", message: "Created meeting: Q1 Planning Sync" },
  { id: "l11", ts: "13:58:40", agentName: "OpenClaw", level: "info", message: "Routing request to ResearchAgent" },
  { id: "l12", ts: "13:58:11", agentName: "CodeAgent", level: "error", message: "Connection to runtime sandbox timed out" },
];

export const PERFORMANCE_SERIES = Array.from({ length: 24 }).map((_, i) => ({
  hour: `${String(i).padStart(2, "0")}:00`,
  success: 60 + Math.round(30 * Math.sin(i / 3) + Math.random() * 10),
  failures: Math.max(0, Math.round(8 + 6 * Math.cos(i / 2) + Math.random() * 4)),
  latency: 120 + Math.round(80 * Math.sin(i / 4) + Math.random() * 40),
}));

export const SYSTEM_LOAD = [
  { name: "CPU", value: 62 },
  { name: "Memory", value: 48 },
  { name: "GPU", value: 81 },
  { name: "Network", value: 34 },
];
