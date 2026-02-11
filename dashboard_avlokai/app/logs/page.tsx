"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Search, Filter, AlertTriangle, AlertCircle, Info, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
    { id: 1, timestamp: "2026-02-09 10:42:15.505", level: "FATAL", message: "Workflow execution failed at step 4: Database Timeout", workflow: "Lead Qualification" },
    { id: 2, timestamp: "2026-02-09 10:42:15.500", level: "ERROR", message: "Connection timed out after 2000ms", workflow: "Lead Qualification" },
    { id: 3, timestamp: "2026-02-09 10:42:13.400", level: "INFO", message: "Inserting record into DB...", workflow: "Lead Qualification" },
    { id: 4, timestamp: "2026-02-09 10:42:13.360", level: "INFO", message: "Enrichment successful. Company: TechCorp Inc.", workflow: "Lead Qualification" },
    { id: 5, timestamp: "2026-02-09 08:30:22.100", level: "WARN", message: "High latency detected in Webhook trigger (450ms)", workflow: "System Monitor" },
    { id: 6, timestamp: "2026-02-09 08:00:15.200", level: "ERROR", message: "Failed to generate PDF invoice: Template not found", workflow: "Monthly Invoice Generation" },
    { id: 7, timestamp: "2026-02-09 08:00:01.000", level: "INFO", message: "Cron trigger fired: Monthly Invoice Generation", workflow: "Monthly Invoice Generation" },
    { id: 8, timestamp: "2026-02-08 23:30:00.000", level: "INFO", message: "Database backup completed successfully", workflow: "System Maintenance" },
    { id: 9, timestamp: "2026-02-08 23:00:00.000", level: "INFO", message: "Starting database backup...", workflow: "System Maintenance" }
];

export default function LogsPage() {
    const [expandedLog, setExpandedLog] = useState<number | null>(null);

    const toggleLog = (id: number) => {
        setExpandedLog(expandedLog === id ? null : id);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>Logs & Errors</h1>
                    <p className="mt-1 text-[13px]" style={{ color: "#64748B" }}>System event log and error tracking</p>
                </div>
                <div className="flex gap-2">
                    <button
                        className="rounded-lg px-4 py-2 text-[13px] font-medium"
                        style={{
                            backgroundColor: "transparent",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgba(255, 255, 255, 0.08)",
                            color: "#CBD5E1",
                            transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        Download Logs
                    </button>
                    <button
                        className="rounded-lg px-4 py-2 text-[13px] font-medium"
                        style={{
                            backgroundColor: "transparent",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgba(239, 68, 68, 0.2)",
                            color: "#EF4444",
                            transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        Clear Logs
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div
                className="flex flex-col gap-4 rounded-xl p-4 sm:flex-row"
                style={{
                    backgroundColor: "#111827",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255, 255, 255, 0.05)",
                }}
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4" style={{ color: "#475569" }} strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Search logs..."
                        className="w-full rounded-lg py-2 pl-9 pr-4 text-[13px] outline-none"
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgba(255, 255, 255, 0.06)",
                            color: "#E5E7EB",
                            transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                </div>
                <div className="flex gap-2">
                    <select className="h-9 rounded-lg px-3 py-1 text-[12px] font-medium outline-none" style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.06)", color: "#94A3B8" }}>
                        <option>All Levels</option>
                        <option>INFO</option>
                        <option>WARN</option>
                        <option>ERROR</option>
                        <option>FATAL</option>
                    </select>
                    <select className="h-9 rounded-lg px-3 py-1 text-[12px] font-medium outline-none" style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.06)", color: "#94A3B8" }}>
                        <option>All Workflows</option>
                        <option>Lead Qualification</option>
                        <option>System Monitor</option>
                    </select>
                </div>
            </div>

            {/* Logs Table */}
            <div
                className="rounded-xl overflow-hidden"
                style={{
                    backgroundColor: "#111827",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                }}
            >
                <div className="w-full text-left" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                    <div className="flex" style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                        <div className="px-4 py-3 w-48 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>Timestamp</div>
                        <div className="px-4 py-3 w-24 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>Level</div>
                        <div className="px-4 py-3 w-48 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>Workflow</div>
                        <div className="px-4 py-3 flex-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>Message</div>
                    </div>
                    <div>
                        {logs.map((log) => (
                            <div
                                key={log.id}
                                className="group flex cursor-pointer"
                                style={{
                                    backgroundColor: (log.level === "ERROR" || log.level === "FATAL") ? "rgba(239, 68, 68, 0.03)" : "transparent",
                                    borderTop: "1px solid rgba(255, 255, 255, 0.03)",
                                    transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                                onClick={() => toggleLog(log.id)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        (log.level === "ERROR" || log.level === "FATAL") ? "rgba(239, 68, 68, 0.06)" : "rgba(255, 255, 255, 0.03)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor =
                                        (log.level === "ERROR" || log.level === "FATAL") ? "rgba(239, 68, 68, 0.03)" : "transparent";
                                }}
                            >
                                <div className="px-4 py-3 whitespace-nowrap w-48" style={{ color: "#475569" }}>{log.timestamp}</div>
                                <div className="px-4 py-3 w-24">
                                    <span className="font-bold" style={{
                                        color: log.level === "INFO" ? "#3B82F6" :
                                            log.level === "WARN" ? "#F59E0B" :
                                                log.level === "ERROR" ? "#EF4444" : "#DC2626"
                                    }}>
                                        {log.level}
                                    </span>
                                </div>
                                <div className="px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis w-48" style={{ color: "#94A3B8" }}>{log.workflow}</div>
                                <div className="px-4 py-3 flex-1 flex items-center gap-2" style={{ color: "#CBD5E1" }}>
                                    {log.message}
                                    {expandedLog === log.id && (
                                        <div className="ml-auto">
                                            <ChevronDown className="h-3 w-3" style={{ color: "#475569" }} />
                                        </div>
                                    )}
                                    {expandedLog !== log.id && (
                                        <div className="ml-auto opacity-0 group-hover:opacity-100" style={{ transition: "opacity 180ms" }}>
                                            <ChevronRight className="h-3 w-3" style={{ color: "#475569" }} />
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
