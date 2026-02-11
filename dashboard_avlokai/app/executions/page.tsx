"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Play, CheckCircle2, XCircle, Clock, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getExecutions, type ExecutionUI } from "@/app/actions/n8n";
import { TableRowSkeleton } from "@/components/ui/Skeleton";
import { useStaggeredEntry } from "@/hooks/useStaggeredEntry";

export default function ExecutionsPage() {
    const [executions, setExecutions] = useState<ExecutionUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("All Statuses");
    const visible = useStaggeredEntry(100, 40, 100);

    useEffect(() => {
        async function fetchExecutions() {
            try {
                const data = await getExecutions(100);
                setExecutions(data);
            } catch (error) {
                console.error("Failed to fetch executions", error);
            } finally {
                setLoading(false);
            }
        }
        fetchExecutions();
    }, []);

    const filteredExecutions = executions.filter(exec => {
        if (filterStatus === "All Statuses") return true;
        if (filterStatus === "Success") return exec.status === "success";
        if (filterStatus === "Failed") return exec.status === "failed";
        return true;
    });

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
                    <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>Executions</h1>
                    <p className="mt-1 text-[13px]" style={{ color: "#64748B" }}>Workflow execution history and results</p>
                </div>
                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="h-9 rounded-lg px-3 py-1 text-[12px] font-medium outline-none"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(255, 255, 255, 0.06)",
                        color: "#94A3B8",
                    }}
                >
                    <option>All Statuses</option>
                    <option>Success</option>
                    <option>Failed</option>
                </select>
            </div>

            <div
                className="rounded-xl overflow-hidden min-h-[300px]"
                style={{
                    backgroundColor: "#111827",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    opacity: visible[1] ? 1 : 0,
                    transform: visible[1] ? "translateY(0)" : "translateY(4px)",
                    transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                {loading ? (
                    <table className="w-full text-left text-[13px]">
                        <thead>
                            <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Status</th>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Workflow</th>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Trigger</th>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Start Time</th>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Duration</th>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-right" style={{ color: "#475569" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: 8 }).map((_, i) => (
                                <TableRowSkeleton key={i} columns={6} />
                            ))}
                        </tbody>
                    </table>
                ) : filteredExecutions.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-2">
                        <p className="text-[13px]" style={{ color: "#64748B" }}>No executions found.</p>
                        <p className="text-[12px]" style={{ color: "#475569" }}>Ensure N8N_API_KEY is set and workflows have executed.</p>
                    </div>
                ) : (
                    <table className="w-full text-left text-[13px]">
                        <thead>
                            <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Status</th>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Workflow</th>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Trigger</th>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Start Time</th>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Duration</th>
                                <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-right" style={{ color: "#475569" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExecutions.map((exec, index) => (
                                <tr
                                    key={exec.id}
                                    style={{
                                        borderTop: "1px solid rgba(255, 255, 255, 0.03)",
                                        transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms, transform 200ms",
                                        opacity: visible[index + 2] ? 1 : 0,
                                        transform: visible[index + 2] ? "translateY(0)" : "translateY(3px)",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                >
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-2">
                                            {exec.status === "success" && <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "#22C55E" }} />}
                                            {exec.status === "failed" && <XCircle className="h-3.5 w-3.5" style={{ color: "#EF4444" }} />}
                                            {exec.status === "running" && <Clock className="h-3.5 w-3.5 animate-spin" style={{ color: "#3B82F6" }} />}
                                            <span className="capitalize text-[12px] font-medium" style={{
                                                color: exec.status === "success" ? "#22C55E" :
                                                    exec.status === "failed" ? "#EF4444" : "#3B82F6"
                                            }}>{exec.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 font-medium" style={{ color: "#E5E7EB" }}>
                                        <Link href={`/workflows/${exec.workflowId}`} className="hover:underline" style={{ color: "#E5E7EB", transition: "color 180ms" }}>
                                            {exec.workflowName}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-3.5" style={{ color: "#64748B" }}>{exec.trigger}</td>
                                    <td className="px-6 py-3.5" style={{ color: "#64748B" }}>{exec.timestamp}</td>
                                    <td className="px-6 py-3.5" style={{ color: "#64748B", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>{exec.duration}</td>
                                    <td className="px-6 py-3.5 text-right">
                                        <button disabled className="text-[12px] font-medium cursor-not-allowed" style={{ color: "#475569" }}>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
