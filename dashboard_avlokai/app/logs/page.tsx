"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { Search, ChevronDown, ChevronRight, Loader2, Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { getExecutionLogs } from "@/app/actions/n8n";
import { type ExecutionLogEntry } from "@/app/types/n8n";
import { useStaggeredEntry } from "@/hooks/useStaggeredEntry";

export default function LogsPage() {
    const [logs, setLogs] = useState<ExecutionLogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedLog, setExpandedLog] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLevel, setFilterLevel] = useState("All Levels");
    const [filterWorkflow, setFilterWorkflow] = useState("All Workflows");
    const visible = useStaggeredEntry(20, 40, 100);

    useEffect(() => {
        async function fetchLogs() {
            try {
                const data = await getExecutionLogs(100);
                setLogs(data);
            } catch (error) {
                console.error("Failed to fetch logs", error);
            } finally {
                setLoading(false);
            }
        }
        fetchLogs();
    }, []);

    const toggleLog = (id: string) => {
        setExpandedLog(expandedLog === id ? null : id);
    };

    // Get unique workflow names for filter
    const workflowNames = [...new Set(logs.map(l => l.workflow))];

    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.workflow.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = filterLevel === "All Levels" || log.level === filterLevel;
        const matchesWorkflow = filterWorkflow === "All Workflows" || log.workflow === filterWorkflow;
        return matchesSearch && matchesLevel && matchesWorkflow;
    });

    function formatLogTimestamp(ts: string): string {
        const d = new Date(ts);
        return d.toLocaleString('en-US', {
            month: 'short', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false,
        });
    }

    return (
        <div className="space-y-8">
            <div
                className="flex items-center justify-between"
                style={{
                    opacity: visible[0] ? 1 : 0,
                    transform: visible[0] ? "translateY(0)" : "translateY(3px)",
                    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div>
                    <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>Logs & Errors</h1>
                    <p className="mt-1 text-[13px]" style={{ color: "#64748B" }}>
                        {loading ? "Loading execution logs…" : `${filteredLogs.length} execution log entries`}
                    </p>
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
                    opacity: visible[1] ? 1 : 0,
                    transform: visible[1] ? "translateY(0)" : "translateY(3px)",
                    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4" style={{ color: "#475569" }} strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Search logs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                    <select
                        value={filterLevel}
                        onChange={(e) => setFilterLevel(e.target.value)}
                        className="h-9 rounded-lg px-3 py-1 text-[12px] font-medium outline-none"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.06)", color: "#94A3B8" }}
                    >
                        <option>All Levels</option>
                        <option>INFO</option>
                        <option>WARN</option>
                        <option>ERROR</option>
                        <option>FATAL</option>
                    </select>
                    <select
                        value={filterWorkflow}
                        onChange={(e) => setFilterWorkflow(e.target.value)}
                        className="h-9 rounded-lg px-3 py-1 text-[12px] font-medium outline-none"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.06)", color: "#94A3B8" }}
                    >
                        <option>All Workflows</option>
                        {workflowNames.map(name => (
                            <option key={name}>{name}</option>
                        ))}
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
                    opacity: visible[2] ? 1 : 0,
                    transform: visible[2] ? "translateY(0)" : "translateY(4px)",
                    transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {loading ? (
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin" style={{ color: "#3B82F6" }} />
                        <span className="ml-2 text-[13px]" style={{ color: "#64748B" }}>Loading execution logs…</span>
                    </div>
                ) : filteredLogs.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-2">
                        <AlertCircle className="h-8 w-8" style={{ color: "#475569" }} strokeWidth={1.5} />
                        <p className="text-[13px]" style={{ color: "#64748B" }}>No log entries found.</p>
                        <p className="text-[12px]" style={{ color: "#475569" }}>
                            {searchTerm || filterLevel !== "All Levels" || filterWorkflow !== "All Workflows"
                                ? "Try adjusting your filters."
                                : "Ensure n8n workflows have been executed."}
                        </p>
                    </div>
                ) : (
                    <div className="w-full text-left" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                        <div className="flex" style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}>
                            <div className="px-4 py-3 w-48 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>Timestamp</div>
                            <div className="px-4 py-3 w-24 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>Level</div>
                            <div className="px-4 py-3 w-48 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>Workflow</div>
                            <div className="px-4 py-3 flex-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569", fontFamily: "'Inter', sans-serif" }}>Message</div>
                        </div>
                        <div>
                            {filteredLogs.map((log, index) => (
                                <div
                                    key={log.id}
                                    className="group flex cursor-pointer"
                                    style={{
                                        backgroundColor: log.level === "ERROR" || log.level === "FATAL" ? "rgba(239, 68, 68, 0.03)" : "transparent",
                                        borderTop: "1px solid rgba(255, 255, 255, 0.03)",
                                        transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms, transform 200ms",
                                        opacity: visible[index + 3] !== false ? 1 : 0,
                                        transform: visible[index + 3] !== false ? "translateY(0)" : "translateY(3px)",
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
                                    <div className="px-4 py-3 whitespace-nowrap w-48" style={{ color: "#475569" }}>
                                        {formatLogTimestamp(log.timestamp)}
                                    </div>
                                    <div className="px-4 py-3 w-24">
                                        <span className="font-bold" style={{
                                            color: log.level === "INFO" ? "#3B82F6" :
                                                log.level === "WARN" ? "#F59E0B" :
                                                    log.level === "ERROR" ? "#EF4444" : "#DC2626"
                                        }}>
                                            {log.level}
                                        </span>
                                    </div>
                                    <div className="px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis w-48" style={{ color: "#94A3B8" }}>
                                        {log.workflow}
                                    </div>
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
                )}
            </div>
        </div>
    );
}
