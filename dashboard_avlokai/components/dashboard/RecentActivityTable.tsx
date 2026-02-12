"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, Calendar, Loader2 } from "lucide-react";
import { getExecutions } from "@/app/actions/n8n";
import { type ExecutionUI } from "@/app/types/n8n";
import { TableRowSkeleton } from "@/components/ui/Skeleton";
import { useStaggeredEntry } from "@/hooks/useStaggeredEntry";

export function RecentActivityTable() {
    const [activities, setActivities] = useState<ExecutionUI[]>([]);
    const [loading, setLoading] = useState(true);
    const visible = useStaggeredEntry(activities.length, 50, 100);

    useEffect(() => {
        async function fetchActivities() {
            try {
                const data = await getExecutions(5);
                setActivities(data);
            } catch (error) {
                console.error("Failed to fetch recent activity", error);
            } finally {
                setLoading(false);
            }
        }
        fetchActivities();
    }, []);

    if (loading) {
        return (
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
                <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    <div className="h-4 w-32 skeleton-pulse rounded-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.04)" }} />
                </div>
                <table className="w-full text-left text-[13px]">
                    <thead>
                        <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Workflow</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Trigger</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Status</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Duration</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRowSkeleton key={i} columns={5} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (activities.length === 0) {
        return (
            <div
                className="rounded-xl h-64 flex flex-col items-center justify-center gap-2"
                style={{
                    backgroundColor: "#111827",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                }}
            >
                <p className="text-[13px]" style={{ color: "#64748B" }}>No recent activity found.</p>
                <p className="text-[11px]" style={{ color: "#475569" }}>Ensure N8N_API_KEY is set.</p>
            </div>
        );
    }

    return (
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
            <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <h3 className="text-[15px] font-medium" style={{ color: "#E5E7EB" }}>
                    Recent Activity
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px]">
                    <thead>
                        <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Workflow</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Trigger</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Status</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Duration</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map((activity, index) => (
                            <tr
                                key={activity.id}
                                className="cursor-pointer"
                                style={{
                                    borderTop: "1px solid rgba(255, 255, 255, 0.03)",
                                    transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                                    opacity: visible[index] ? 1 : 0,
                                    transform: visible[index] ? "translateY(0)" : "translateY(3px)",
                                    transitionProperty: "background-color, opacity, transform",
                                    transitionDuration: "180ms, 200ms, 200ms",
                                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                                <td className="px-6 py-3.5 font-medium" style={{ color: "#E5E7EB" }}>{activity.workflowName}</td>
                                <td className="px-6 py-3.5" style={{ color: "#64748B" }}>{activity.trigger}</td>
                                <td className="px-6 py-3.5">
                                    <div className="flex items-center gap-2">
                                        {activity.status === "success" && <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "#22C55E" }} />}
                                        {activity.status === "failed" && <XCircle className="h-3.5 w-3.5" style={{ color: "#EF4444" }} />}
                                        {activity.status === "running" && <Clock className="h-3.5 w-3.5 animate-spin" style={{ color: "#3B82F6" }} />}
                                        <span className="capitalize text-[12px] font-medium" style={{
                                            color: activity.status === "success" ? "#22C55E" :
                                                activity.status === "failed" ? "#EF4444" : "#3B82F6"
                                        }}>
                                            {activity.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-3.5" style={{ color: "#64748B", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}>
                                    {activity.duration}
                                </td>
                                <td className="px-6 py-3.5 flex items-center gap-2" style={{ color: "#64748B" }}>
                                    <Calendar className="h-3 w-3" style={{ color: "#475569" }} />
                                    <span className="text-[12px]">{activity.timestamp}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
