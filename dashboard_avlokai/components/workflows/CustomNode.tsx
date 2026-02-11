"use client";

import { Handle, Position } from "@xyflow/react";
import { cn } from "@/lib/utils";
import {
    Webhook,
    Mail,
    Database,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    MessageSquare,
    FileText,
    Slack
} from "lucide-react";

const icons = {
    webhook: Webhook,
    email: Mail,
    database: Database,
    wait: Clock,
    slack: Slack,
    ai: MessageSquare,
    document: FileText,
};

export function CustomNode({ data, selected }: any) {
    const Icon = icons[data.icon as keyof typeof icons] || Webhook;

    return (
        <div
            className={cn(
                "w-[200px] rounded-xl transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
            )}
            style={{
                backgroundColor: "#111827",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: selected ? "rgba(59, 130, 246, 0.5)" : "rgba(255, 255, 255, 0.06)",
                boxShadow: selected
                    ? "0 0 0 2px rgba(59, 130, 246, 0.15), 0 4px 16px rgba(0, 0, 0, 0.4)"
                    : "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
        >
            <div
                className="flex items-center gap-3 p-3 rounded-t-xl"
                style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.04)" }}
            >
                <div
                    className="rounded-lg p-1.5"
                    style={{
                        backgroundColor:
                            data.status === "success" ? "rgba(34, 197, 94, 0.1)" :
                                data.status === "error" ? "rgba(239, 68, 68, 0.1)" :
                                    data.status === "waiting" ? "rgba(245, 158, 11, 0.1)" :
                                        "rgba(59, 130, 246, 0.1)",
                    }}
                >
                    <Icon
                        className="h-4 w-4"
                        strokeWidth={1.5}
                        style={{
                            color:
                                data.status === "success" ? "#22C55E" :
                                    data.status === "error" ? "#EF4444" :
                                        data.status === "waiting" ? "#F59E0B" :
                                            "#3B82F6",
                        }}
                    />
                </div>
                <div className="flex-1 overflow-hidden">
                    <p className="truncate text-[12px] font-medium" style={{ color: "#E5E7EB" }}>{data.label}</p>
                    <p className="truncate text-[10px]" style={{ color: "#475569" }}>{data.subLabel}</p>
                </div>
                {data.status === "success" && <CheckCircle2 className="h-3 w-3" style={{ color: "#22C55E" }} />}
                {data.status === "error" && <XCircle className="h-3 w-3" style={{ color: "#EF4444" }} />}
            </div>

            {/* Handles */}
            <Handle type="target" position={Position.Left} style={{ background: "#475569", width: 8, height: 8, borderWidth: "2px", borderStyle: "solid", borderColor: "#111827" }} />
            <Handle type="source" position={Position.Right} style={{ background: "#475569", width: 8, height: 8, borderWidth: "2px", borderStyle: "solid", borderColor: "#111827" }} />
        </div>
    );
}
