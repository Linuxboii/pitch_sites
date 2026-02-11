"use client";

import { use } from "react";
import { Badge } from "@/components/ui/Badge";
import {
    ArrowLeft,
    Clock,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    RotateCcw,
    Terminal,
    ChevronDown,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const steps = [
    { id: 1, name: "Webhook Trigger", status: "success", duration: "10ms", type: "trigger" },
    { id: 2, name: "Normalize Lead", status: "success", duration: "450ms", type: "action" },
    { id: 3, name: "Score Lead (Clearbit)", status: "success", duration: "800ms", type: "action" },
    { id: 4, name: "Insert into PostgreSQL", status: "failed", duration: "2.1s", type: "action", error: "Connection timeout: 5432" },
    { id: 5, name: "Send Email", status: "skipped", duration: "-", type: "action" }
];

const logs = `[10:42:12.005] INFO  Workflow started
[10:42:12.015] INFO  Webhook payload received: { "email": "sarah.m@techcorp.io" }
[10:42:12.100] INFO  Normalizing lead data...
[10:42:12.550] INFO  Data normalized. Phone number formatted.
[10:42:12.560] INFO  Calling Clearbit Enrichment API...
[10:42:13.360] INFO  Enrichment successful. Company: TechCorp Inc.
[10:42:13.400] INFO  Inserting record into DB...
[10:42:15.500] ERROR Connection timed out after 2000ms
[10:42:15.505] FATAL Workflow execution failed at step 4`;

export default function ExecutionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [logsExpanded, setLogsExpanded] = useState(true);

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/executions"
                    className="rounded-lg p-2"
                    style={{
                        color: "#64748B",
                        transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
                </Link>
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>
                            Execution #{id.split('-')[1]}
                        </h1>
                        <Badge variant="destructive">Failed</Badge>
                    </div>
                    <p className="mt-1 text-[13px]" style={{ color: "#64748B" }}>Lead Qualification & Enrichment • Feb 9, 10:42 AM</p>
                </div>
                <button
                    className="flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium"
                    style={{
                        backgroundColor: "#3B82F6",
                        color: "#FFFFFF",
                        transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.15)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.3)"; }}
                >
                    <RotateCcw className="h-4 w-4" strokeWidth={1.5} /> Retry Execution
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                <div
                    className="rounded-xl p-5"
                    style={{
                        backgroundColor: "#111827",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(255, 255, 255, 0.05)",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <span className="text-[12px] font-medium uppercase tracking-wide" style={{ color: "#64748B" }}>Duration</span>
                    <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-[24px] font-semibold" style={{ color: "#F9FAFB", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "-0.02em" }}>3.4s</span>
                        <Clock className="h-3.5 w-3.5" style={{ color: "#475569" }} strokeWidth={1.5} />
                    </div>
                </div>
                <div
                    className="rounded-xl p-5"
                    style={{
                        backgroundColor: "#111827",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(255, 255, 255, 0.05)",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <span className="text-[12px] font-medium uppercase tracking-wide" style={{ color: "#64748B" }}>Trigger</span>
                    <div className="mt-2 text-[16px] font-semibold" style={{ color: "#F9FAFB" }}>Webhook</div>
                </div>
                <div
                    className="rounded-xl p-5"
                    style={{
                        backgroundColor: "#111827",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(239, 68, 68, 0.12)",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <span className="text-[12px] font-medium uppercase tracking-wide" style={{ color: "#EF4444" }}>Error</span>
                    <div className="mt-2 text-[16px] font-semibold" style={{ color: "#EF4444" }}>Database Timeout</div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left: Steps */}
                <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-[15px] font-medium" style={{ color: "#E5E7EB" }}>Steps</h2>
                    <div
                        className="space-y-4 rounded-xl p-5"
                        style={{
                            backgroundColor: "#111827",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgba(255, 255, 255, 0.05)",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        {steps.map((step) => (
                            <div key={step.id} className="relative flex items-start gap-3">
                                {step.id !== steps.length && (
                                    <div className="absolute left-[9px] top-6 h-[calc(100%+16px)] w-0.5 -z-10" style={{ backgroundColor: "rgba(255, 255, 255, 0.06)" }} />
                                )}
                                <div
                                    className="flex h-5 w-5 items-center justify-center rounded-full"
                                    style={{
                                        backgroundColor: "#111827",
                                        borderWidth: "1.5px",
                                        borderStyle: "solid",
                                        borderColor: step.status === "success" ? "#22C55E" :
                                            step.status === "failed" ? "#EF4444" : "#475569",
                                    }}
                                >
                                    {step.status === "success" && <CheckCircle2 className="h-3 w-3" style={{ color: "#22C55E" }} />}
                                    {step.status === "failed" && <XCircle className="h-3 w-3" style={{ color: "#EF4444" }} />}
                                    {step.status === "skipped" && <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#475569" }} />}
                                </div>
                                <div className="flex-1 pb-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] font-medium" style={{
                                            color: step.status === "failed" ? "#EF4444" : "#E5E7EB"
                                        }}>{step.name}</span>
                                        <span className="text-[11px]" style={{ color: "#64748B", fontFamily: "'JetBrains Mono', monospace" }}>{step.duration}</span>
                                    </div>
                                    {step.error && (
                                        <p
                                            className="mt-1.5 text-[12px] p-2 rounded-lg"
                                            style={{
                                                backgroundColor: "rgba(239, 68, 68, 0.06)",
                                                color: "#EF4444",
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                                borderColor: "rgba(239, 68, 68, 0.1)",
                                            }}
                                        >
                                            {step.error}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Logs */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[15px] font-medium" style={{ color: "#E5E7EB" }}>Execution Logs</h2>
                        <button
                            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "rgba(255, 255, 255, 0.06)",
                                color: "#64748B",
                            }}
                        >
                            <Terminal className="h-3 w-3" strokeWidth={1.5} /> Raw
                        </button>
                    </div>

                    <div
                        className="rounded-xl overflow-hidden"
                        style={{
                            backgroundColor: "#0A0E13",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgba(255, 255, 255, 0.05)",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "12px",
                        }}
                    >
                        <button
                            onClick={() => setLogsExpanded(!logsExpanded)}
                            className="flex w-full items-center justify-between p-3 text-[11px]"
                            style={{
                                borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                                color: "#64748B",
                                fontFamily: "'Inter', sans-serif",
                                transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        >
                            <span>stdout / stderr</span>
                            {logsExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>

                        {logsExpanded && (
                            <div className="p-4 overflow-x-auto">
                                <pre className="whitespace-pre-wrap leading-relaxed">
                                    {logs.split('\n').map((line, i) => {
                                        const isError = line.includes("ERROR") || line.includes("FATAL");
                                        const isInfo = line.includes("INFO");
                                        return (
                                            <div key={i} className="flex gap-3">
                                                <span className="select-none w-6 text-right block" style={{ color: "#334155" }}>{i + 1}</span>
                                                <span style={{
                                                    color: isError ? "#EF4444" : isInfo ? "#64748B" : "#475569"
                                                }}>{line}</span>
                                            </div>
                                        )
                                    })}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
