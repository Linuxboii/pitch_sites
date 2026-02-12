"use client";

import { Bot, ExternalLink, Workflow } from "lucide-react";
import { useStaggeredEntry } from "@/hooks/useStaggeredEntry";

export default function AssistantsPage() {
    const visible = useStaggeredEntry(4, 50, 80);

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
                    <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>AI Assistants</h1>
                    <p className="mt-1 text-[13px]" style={{ color: "#64748B" }}>Manage intelligent agents and their knowledge</p>
                </div>
            </div>

            {/* Empty State */}
            <div
                className="rounded-xl p-12 flex flex-col items-center justify-center text-center"
                style={{
                    backgroundColor: "#111827",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    minHeight: "400px",
                    opacity: visible[1] ? 1 : 0,
                    transform: visible[1] ? "translateY(0)" : "translateY(4px)",
                    transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl mb-6"
                    style={{ backgroundColor: "rgba(168, 85, 247, 0.08)" }}
                >
                    <Bot className="h-8 w-8" style={{ color: "#A855F7" }} strokeWidth={1.5} />
                </div>
                <h2 className="text-[16px] font-semibold mb-2" style={{ color: "#E5E7EB" }}>
                    No AI Assistants Configured
                </h2>
                <p className="text-[13px] max-w-md mb-6 leading-relaxed" style={{ color: "#64748B" }}>
                    AI assistants are powered by n8n workflows using AI/LLM nodes.
                    Set up workflows with OpenAI, Claude, or other AI integrations in n8n, and they&apos;ll appear here for management.
                </p>
                <div className="flex gap-3">
                    <a
                        href="https://n8n.avlokai.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium"
                        style={{
                            backgroundColor: "#A855F7",
                            color: "#FFFFFF",
                            transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                        Open n8n Editor
                    </a>
                </div>

                {/* Suggestion cards */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 w-full max-w-lg"
                    style={{
                        opacity: visible[2] ? 1 : 0,
                        transform: visible[2] ? "translateY(0)" : "translateY(4px)",
                        transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1) 100ms, transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 100ms",
                    }}
                >
                    {[
                        { label: "Chat Agent", desc: "Build conversational AI" },
                        { label: "Data Analyst", desc: "Query databases with AI" },
                        { label: "Support Bot", desc: "Auto-reply to tickets" },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="rounded-lg p-3 text-center"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.02)",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "rgba(255, 255, 255, 0.05)",
                            }}
                        >
                            <div className="text-[12px] font-medium mb-0.5" style={{ color: "#94A3B8" }}>{item.label}</div>
                            <div className="text-[11px]" style={{ color: "#475569" }}>{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
