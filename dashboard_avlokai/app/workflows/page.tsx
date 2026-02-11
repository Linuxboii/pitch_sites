"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { WorkflowCardSkeleton } from "@/components/ui/Skeleton";
import {
    Play,
    Pause,
    MoreVertical,
    Clock,
    Webhook,
    Mail,
    Settings2,
    Calendar,
    Search,
    Loader2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getWorkflows, type WorkflowUI } from "@/app/actions/n8n";
import { useStaggeredEntry } from "@/hooks/useStaggeredEntry";
import { useCursorTracker, getCursorStyles } from "@/hooks/useCursorTracker";

function WorkflowCard({ workflow }: { workflow: WorkflowUI }) {
    const { ref, cursor } = useCursorTracker<HTMLDivElement>();
    const cursorStyles = getCursorStyles(cursor, {
        parallaxIntensity: 1,
        shadowIntensity: 5,
        glowIntensity: 0.05,
    });

    return (
        <div
            ref={ref}
            className="group relative flex flex-col gap-4 rounded-xl p-6 sm:flex-row sm:items-center sm:justify-between cursor-card"
            style={{
                backgroundColor: "#111827",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                ...cursorStyles,
            }}
        >
            {/* Cursor glow */}
            {cursor.isInside && (
                <div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                        background: `radial-gradient(300px circle at ${cursor.x * 100}% ${cursor.y * 100}%, rgba(59, 130, 246, 0.03), transparent 60%)`,
                    }}
                />
            )}

            <div className="relative z-10 flex flex-1 items-start gap-4">
                <div className={cn(
                    "rounded-lg p-2.5 sm:p-3",
                )} style={{
                    backgroundColor: workflow.trigger === "Webhook" ? "rgba(59, 130, 246, 0.08)" :
                        workflow.trigger === "Cron" ? "rgba(245, 158, 11, 0.08)" : "rgba(168, 85, 247, 0.08)",
                    transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}>
                    {workflow.trigger === "Webhook" && <Webhook className="h-5 w-5 sm:h-5 sm:w-5" style={{ color: "#3B82F6", transition: "transform 180ms", transform: cursor.isInside ? "scale(1.08)" : "scale(1)" }} strokeWidth={1.5} />}
                    {workflow.trigger === "Cron" && <Clock className="h-5 w-5 sm:h-5 sm:w-5" style={{ color: "#F59E0B", transition: "transform 180ms", transform: cursor.isInside ? "scale(1.08)" : "scale(1)" }} strokeWidth={1.5} />}
                    {workflow.trigger === "Event" && <Mail className="h-5 w-5 sm:h-5 sm:w-5" style={{ color: "#A855F7", transition: "transform 180ms", transform: cursor.isInside ? "scale(1.08)" : "scale(1)" }} strokeWidth={1.5} />}
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                        <h3 className="text-[14px] font-semibold" style={{ color: "#F9FAFB" }}>
                            <Link href={`https://n8n.avlokai.com/workflow/${workflow.id}`} target="_blank" className="hover:underline" style={{ transition: "color 180ms" }}>
                                {workflow.name}
                            </Link>
                        </h3>
                        <Badge variant={workflow.status === "active" ? "success" : "secondary"}>
                            {workflow.status}
                        </Badge>
                    </div>
                    <p className="text-[13px] line-clamp-1 sm:line-clamp-none" style={{ color: "#64748B" }}>
                        {workflow.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-0.5 text-[11px]" style={{ color: "#475569" }}>
                        <span className="flex items-center gap-1">
                            <Play className="h-3 w-3" strokeWidth={1.5} /> {workflow.runs} runs
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" strokeWidth={1.5} /> Last: {workflow.lastRun}
                        </span>
                        <span className={cn("flex items-center gap-1 font-medium")} style={{
                            color: workflow.successRate >= 98 ? "#22C55E" :
                                workflow.successRate < 98 && workflow.successRate > 90 ? "#F59E0B" : "#EF4444"
                        }}>
                            {workflow.successRate}% success
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex items-center justify-end gap-2 sm:flex-col sm:items-end sm:gap-1.5 md:flex-row md:items-center">
                <button
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] font-medium"
                    style={{
                        backgroundColor: "transparent",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(255, 255, 255, 0.08)",
                        color: "#CBD5E1",
                        transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    title="Run Manually"
                >
                    <Play className="h-3 w-3" strokeWidth={1.5} />
                    <span className="sm:hidden md:inline">Run</span>
                </button>

                <Link
                    href={`https://n8n.avlokai.com/workflow/${workflow.id}`}
                    target="_blank"
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] font-medium"
                    style={{
                        backgroundColor: "transparent",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(255, 255, 255, 0.08)",
                        color: "#CBD5E1",
                        transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <Settings2 className="h-3 w-3" strokeWidth={1.5} />
                    <span className="sm:hidden md:inline">Edit</span>
                </Link>

                <button
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ color: "#475569", transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                >
                    <MoreVertical className="h-4 w-4" strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
}

export default function WorkflowsPage() {
    const [workflows, setWorkflows] = useState<WorkflowUI[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTrigger, setFilterTrigger] = useState("All Triggers");
    const [filterStatus, setFilterStatus] = useState("All Statuses");
    const visible = useStaggeredEntry(20, 60, 100);

    useEffect(() => {
        async function fetchWorkflows() {
            try {
                const data = await getWorkflows();
                setWorkflows(data);
            } catch (error) {
                console.error("Failed to fetch workflows", error);
            } finally {
                setLoading(false);
            }
        }
        fetchWorkflows();
    }, []);

    const filteredWorkflows = workflows.filter(workflow => {
        const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTrigger = filterTrigger === "All Triggers" || workflow.trigger === filterTrigger;
        const matchesStatus = filterStatus === "All Statuses" ||
            (filterStatus === "Active" && workflow.status === "active") ||
            (filterStatus === "Paused" && workflow.status === "paused");

        return matchesSearch && matchesTrigger && matchesStatus;
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
                    <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>Workflows</h1>
                    <p className="mt-1 text-[13px]" style={{ color: "#64748B" }}>Manage and monitor automation workflows</p>
                </div>
                <button
                    className="rounded-lg px-4 py-2 text-[13px] font-medium"
                    style={{
                        backgroundColor: "#3B82F6",
                        color: "#FFFFFF",
                        transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.3)"; }}
                >
                    Create Workflow
                </button>
            </div>

            {/* Filters */}
            <div
                className="flex items-center gap-4 rounded-xl p-4"
                style={{
                    backgroundColor: "#111827",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255, 255, 255, 0.05)",
                    opacity: visible[1] ? 1 : 0,
                    transform: visible[1] ? "translateY(0)" : "translateY(3px)",
                    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1), border-color 180ms",
                }}
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4" style={{ color: "#475569" }} strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Search workflows..."
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
                <select
                    value={filterTrigger}
                    onChange={(e) => setFilterTrigger(e.target.value)}
                    className="h-9 rounded-lg px-3 py-1 text-[12px] font-medium outline-none"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(255, 255, 255, 0.06)",
                        color: "#94A3B8",
                    }}
                >
                    <option>All Triggers</option>
                    <option>Webhook</option>
                    <option>Cron</option>
                    <option>Event</option>
                </select>
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
                    <option>Active</option>
                    <option>Paused</option>
                </select>
            </div>

            {/* Workflow List */}
            {loading ? (
                <div className="grid grid-cols-1 gap-4">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            style={{
                                opacity: visible[i + 2] ? 1 : 0,
                                transform: visible[i + 2] ? "translateY(0)" : "translateY(4px)",
                                transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        >
                            <WorkflowCardSkeleton />
                        </div>
                    ))}
                </div>
            ) : filteredWorkflows.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center gap-2">
                    <p className="text-[13px]" style={{ color: "#64748B" }}>No workflows found.</p>
                    <p className="text-[12px]" style={{ color: "#475569" }}>Make sure N8N_API_KEY and N8N_BASE_URL are set.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {filteredWorkflows.map((workflow, i) => (
                        <div
                            key={workflow.id}
                            style={{
                                opacity: visible[i + 2] ? 1 : 0,
                                transform: visible[i + 2] ? "translateY(0)" : "translateY(4px)",
                                transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        >
                            <WorkflowCard workflow={workflow} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
