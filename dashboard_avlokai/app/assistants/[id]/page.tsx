"use client";

import { use } from "react";
import { Badge } from "@/components/ui/Badge";
import {
    ArrowLeft,
    Send,
    Bot,
    User,
    Paperclip,
    Database,
    ThumbsUp,
    ThumbsDown
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function AssistantChatPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [input, setInput] = useState("");

    return (
        <div
            className="flex h-[calc(100vh-8rem)] flex-col rounded-xl overflow-hidden"
            style={{
                backgroundColor: "#111827",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}>
                <div className="flex items-center gap-3">
                    <Link href="/assistants" className="rounded-lg p-2" style={{ color: "#64748B", transition: "all 180ms" }}>
                        <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
                    </Link>
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: "rgba(59, 130, 246, 0.08)" }}>
                            <Bot className="h-5 w-5" style={{ color: "#3B82F6" }} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h1 className="text-[14px] font-semibold" style={{ color: "#F9FAFB" }}>Customer Support Lead</h1>
                            <div className="flex items-center gap-2 text-[11px]" style={{ color: "#64748B" }}>
                                <span className="flex items-center gap-1">
                                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22C55E", boxShadow: "0 0 6px rgba(34, 197, 94, 0.5)" }} /> Active
                                </span>
                                <span style={{ color: "#334155" }}>•</span>
                                <span>GPT-4o</span>
                            </div>
                        </div>
                    </div>
                </div>
                <Badge variant="outline">Internal Business Knowledge</Badge>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ backgroundColor: "#0F172A" }}>
                {/* User Message */}
                <div className="flex justify-end gap-3">
                    <div
                        className="max-w-[80%] rounded-2xl rounded-tr-sm px-5 py-3 text-[13px]"
                        style={{
                            backgroundColor: "#3B82F6",
                            color: "#FFFFFF",
                            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <p>How do we handle refund requests for annual plans if they are within 14 days?</p>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" style={{ backgroundColor: "rgba(255, 255, 255, 0.06)", color: "#64748B" }}>
                        <User className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Assistant Message */}
                <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}>
                        <Bot className="h-4 w-4" style={{ color: "#3B82F6" }} strokeWidth={1.5} />
                    </div>
                    <div className="max-w-[80%] space-y-3">
                        <div
                            className="rounded-2xl rounded-tl-sm px-5 py-3 text-[13px] leading-relaxed"
                            style={{
                                backgroundColor: "#111827",
                                borderWidth: "1px",
                                borderStyle: "solid",
                                borderColor: "rgba(255, 255, 255, 0.05)",
                                color: "#E5E7EB",
                                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            <p>According to our <strong style={{ color: "#F9FAFB" }}>Refund Policy SOP</strong>, customers on annual plans are eligible for a full refund if the request is made within 14 days of purchase.</p>
                            <p className="mt-2" style={{ color: "#94A3B8" }}>Steps to process:</p>
                            <ol className="mt-1 list-decimal space-y-1.5 pl-4" style={{ color: "#94A3B8" }}>
                                <li>Verify the subscription date in Stripe.</li>
                                <li>Cancel the subscription immediately (do not set to end of period).</li>
                                <li>Select "Refund full amount" and choose "Requested by customer" as reason.</li>
                                <li>Send the "Refund Confirmation" email template.</li>
                            </ol>
                        </div>

                        {/* Citations */}
                        <div className="flex gap-2">
                            {["Refund Policy SOP", "Stripe Refund Guide"].map((citation) => (
                                <button
                                    key={citation}
                                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium"
                                    style={{
                                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                                        borderWidth: "1px",
                                        borderStyle: "solid",
                                        borderColor: "rgba(255, 255, 255, 0.06)",
                                        color: "#64748B",
                                        transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                                    }}
                                >
                                    <Database className="h-3 w-3" strokeWidth={1.5} />
                                    {citation}
                                </button>
                            ))}
                        </div>

                        {/* Feedback */}
                        <div className="flex gap-1">
                            <button className="rounded-lg p-1.5" style={{ color: "#475569", transition: "color 180ms" }}><ThumbsUp className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                            <button className="rounded-lg p-1.5" style={{ color: "#475569", transition: "color 180ms" }}><ThumbsDown className="h-3.5 w-3.5" strokeWidth={1.5} /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="p-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.05)", backgroundColor: "#111827" }}>
                <div
                    className="relative flex items-center gap-2 rounded-xl px-4 py-3"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(255, 255, 255, 0.06)",
                        transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <button style={{ color: "#475569", transition: "color 180ms" }}>
                        <Paperclip className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <input
                        type="text"
                        placeholder="Ask about procedures, policies, or past tickets..."
                        className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-[#475569]"
                        style={{ color: "#E5E7EB" }}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="rounded-lg p-2"
                        style={{
                            backgroundColor: "#3B82F6",
                            color: "#FFFFFF",
                            transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </button>
                </div>
                <p className="mt-2 text-center text-[11px]" style={{ color: "#475569" }}>
                    AI can make mistakes. Verify with official documentation.
                </p>
            </div>
        </div>
    );
}
