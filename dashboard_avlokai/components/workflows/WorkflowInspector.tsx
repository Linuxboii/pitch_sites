"use client";

import { Activity, Clock, Play } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { N8nWorkflow, ExecutionUI } from "@/app/actions/n8n";

interface WorkflowInspectorProps {
    workflow: N8nWorkflow | null;
    stats: {
        totalRuns: number;
        successRate: string;
        avgDuration: string;
        lastRun: string;
    };
    recentExecutions: ExecutionUI[];
    onTrigger?: () => void;
}

export function WorkflowInspector({ workflow, stats, recentExecutions }: WorkflowInspectorProps) {
    if (!workflow) {
        return (
            <div
                className="flex h-full items-center justify-center p-4 text-[13px]"
                style={{ backgroundColor: "#111827", borderLeft: "1px solid rgba(255, 255, 255, 0.06)", color: "#64748B" }}
            >
                Select a workflow to view details
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col" style={{ backgroundColor: "#111827", borderLeft: "1px solid rgba(255, 255, 255, 0.06)" }}>
            <div className="p-5" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <h2 className="text-[15px] font-semibold" style={{ color: "#F9FAFB" }}>Workflow Inspector</h2>
                <p className="text-[13px] break-words mt-1" style={{ color: "#64748B" }}>{workflow.name}</p>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
                <div className="space-y-6">
                    {/* Status & Controls */}
                    <div className="space-y-3">
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Status</h3>
                        <div className="flex items-center justify-between">
                            <Badge variant={workflow.active ? "success" : "warning"}>
                                {workflow.active ? "Active" : "Inactive"}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "#64748B" }}>
                                <Clock className="h-3 w-3" strokeWidth={1.5} />
                                <span>{stats.lastRun}</span>
                            </div>
                        </div>
                        <button
                            disabled
                            className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-medium cursor-not-allowed opacity-40"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "rgba(255, 255, 255, 0.06)",
                                color: "#64748B",
                            }}
                        >
                            <Play className="h-4 w-4" strokeWidth={1.5} />
                            Trigger Manually
                        </button>
                    </div>

                    {/* Overview */}
                    <div className="space-y-2">
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Overview</h3>
                        <p className="text-[13px] leading-relaxed" style={{ color: "#94A3B8" }}>
                            {workflow.tags?.map(t => t.name).join(", ") || "No description available."}
                        </p>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-3">
                        <h3 className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Metrics (Last 50 runs)</h3>
                        <div className="space-y-2">
                            {[
                                { label: "Total Runs", value: stats.totalRuns, color: "#E5E7EB" },
                                { label: "Success Rate", value: stats.successRate, color: "#22C55E" },
                                { label: "Avg Duration", value: stats.avgDuration, color: "#E5E7EB" },
                            ].map((metric) => (
                                <div key={metric.label} className="flex items-center justify-between text-[13px]">
                                    <span style={{ color: "#64748B" }}>{metric.label}</span>
                                    <span className="font-medium" style={{ color: metric.color, fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>{metric.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Executions */}
                    <div
                        className="rounded-xl p-4"
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgba(255, 255, 255, 0.05)",
                        }}
                    >
                        <div className="flex items-center gap-2 text-[13px] font-medium" style={{ color: "#E5E7EB" }}>
                            <Activity className="h-4 w-4" style={{ color: "#3B82F6" }} strokeWidth={1.5} />
                            <span>Recent Executions</span>
                        </div>
                        <div className="mt-3 space-y-2 text-[12px]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            {recentExecutions.length > 0 ? (
                                recentExecutions.slice(0, 5).map((exec) => (
                                    <div key={exec.id} className="flex justify-between gap-2">
                                        <span style={{ color: exec.status === 'success' ? '#22C55E' : '#EF4444' }}>
                                            {exec.timestamp.split(',')[1]?.trim() || exec.timestamp}
                                        </span>
                                        <span className="capitalize" style={{ color: "#64748B" }}>{exec.status}</span>
                                    </div>
                                ))
                            ) : (
                                <p style={{ color: "#475569" }}>No recent executions found.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
