"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Bot, FileText, Database, MessageSquare, ArrowRight, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

const assistants = [
    {
        id: "assist-1",
        name: "Customer Support Lead",
        purpose: "Drafts replies to incoming support tickets based on SOPs.",
        sources: ["Help Center Docs", "Past Tickets"],
        status: "active",
        model: "GPT-4o",
        calls: 1240
    },
    {
        id: "assist-2",
        name: "Sales Q&A Bot",
        purpose: "Answers technical questions for sales team during calls.",
        sources: ["Technical Specs", "Pricing Guide"],
        status: "active",
        model: "Claude 3.5 Sonnet",
        calls: 85
    },
    {
        id: "assist-3",
        name: "Legal Reviewer",
        purpose: "Scans contracts for non-standard clauses.",
        sources: ["Legal Playbook", "Contract Templates"],
        status: "maintenance",
        model: "GPT-4 Turbo",
        calls: 12
    },
    {
        id: "assist-4",
        name: "Data Analyst Agent",
        purpose: "Queries SQL database and generates chart configs.",
        sources: ["PostgreSQL Schema", "Metabase Dashboards"],
        status: "active",
        model: "Claude 3 Opus",
        calls: 342
    }
];

export default function AssistantsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>AI Assistants</h1>
                    <p className="mt-1 text-[13px]" style={{ color: "#64748B" }}>Manage intelligent agents and their knowledge</p>
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
                    Create Assistant
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {assistants.map((assistant) => (
                    <div
                        key={assistant.id}
                        className="group relative flex flex-col justify-between rounded-xl p-6"
                        style={{
                            backgroundColor: "#111827",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgba(255, 255, 255, 0.05)",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                            transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                            e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.35)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.3)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                                        style={{ backgroundColor: "rgba(59, 130, 246, 0.08)" }}
                                    >
                                        <Bot className="h-5 w-5" style={{ color: "#3B82F6" }} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <h3 className="text-[14px] font-semibold" style={{ color: "#F9FAFB" }}>{assistant.name}</h3>
                                        <Badge variant={assistant.status === "active" ? "success" : "warning"} className="mt-1">
                                            {assistant.status}
                                        </Badge>
                                    </div>
                                </div>
                                <button style={{ color: "#475569", transition: "color 180ms" }}>
                                    <Settings2 className="h-4 w-4" strokeWidth={1.5} />
                                </button>
                            </div>

                            <p className="text-[13px] leading-relaxed" style={{ color: "#64748B" }}>{assistant.purpose}</p>

                            <div className="space-y-2">
                                <h4 className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Knowledge Sources</h4>
                                <div className="flex flex-wrap gap-2">
                                    {assistant.sources.map((source) => (
                                        <span
                                            key={source}
                                            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px]"
                                            style={{
                                                backgroundColor: "rgba(255, 255, 255, 0.03)",
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                                borderColor: "rgba(255, 255, 255, 0.06)",
                                                color: "#94A3B8",
                                            }}
                                        >
                                            <Database className="h-3 w-3" style={{ color: "#475569" }} strokeWidth={1.5} />
                                            {source}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between pt-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.04)" }}>
                            <div className="text-[12px]" style={{ color: "#64748B" }}>
                                <span className="font-semibold" style={{ color: "#E2E8F0", fontFamily: "'JetBrains Mono', monospace" }}>{assistant.calls}</span>
                                <span className="ml-1">invocations</span>
                            </div>
                            <Link
                                href={`/assistants/${assistant.id}`}
                                className="flex items-center gap-1.5 text-[12px] font-medium"
                                style={{ color: "#3B82F6", transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                            >
                                Open Chat <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
