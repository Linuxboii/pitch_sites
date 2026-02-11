"use client";

import { use } from "react";
import { Badge } from "@/components/ui/Badge";
import {
    Mail,
    Phone,
    Calendar,
    User,
    ArrowLeft,
    MessageSquare,
    Clock,
    CheckCircle2,
    FileText
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const timelineEvents = [
    {
        id: "1", type: "reply", title: "Reply Received",
        description: "Interested in the enterprise plan. Can we schedule a demo?",
        timestamp: "2 hours ago", icon: MessageSquare, color: "#3B82F6", bgColor: "rgba(59, 130, 246, 0.1)"
    },
    {
        id: "2", type: "auto-reply", title: "Auto-Reply Sent",
        description: "Thanks for your interest! Here is our pricing guide.",
        timestamp: "1 day ago", icon: Mail, color: "#A855F7", bgColor: "rgba(168, 85, 247, 0.1)"
    },
    {
        id: "3", type: "capture", title: "Lead Captured",
        description: "Source: Website Contact Form",
        timestamp: "1 day ago", icon: User, color: "#22C55E", bgColor: "rgba(34, 197, 94, 0.1)"
    }
];

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <div className="mx-auto max-w-5xl space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/leads" className="rounded-lg p-2" style={{ color: "#64748B", transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)" }}>
                    <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
                </Link>
                <div className="flex-1">
                    <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>Sarah Miller</h1>
                    <div className="flex items-center gap-2 text-[13px]" style={{ color: "#64748B" }}>
                        <span>sarah.m@techcorp.io</span>
                        <span style={{ color: "#334155" }}>•</span>
                        <span>TechCorp Inc.</span>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button
                        className="flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium"
                        style={{ backgroundColor: "transparent", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.08)", color: "#CBD5E1", transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                    >
                        <Mail className="h-4 w-4" strokeWidth={1.5} /> Email
                    </button>
                    <button
                        className="rounded-lg px-4 py-2 text-[13px] font-medium"
                        style={{ backgroundColor: "#3B82F6", color: "#FFFFFF", transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
                    >
                        Change Status
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Column: Timeline */}
                <div className="lg:col-span-2 space-y-6">
                    <div
                        className="rounded-xl p-6"
                        style={{ backgroundColor: "#111827", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.05)", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
                    >
                        <h2 className="mb-5 text-[15px] font-medium" style={{ color: "#E5E7EB" }}>Activity Timeline</h2>
                        <div className="relative ml-3 space-y-8 pl-8 py-2" style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.06)" }}>
                            {timelineEvents.map((event) => (
                                <div key={event.id} className="relative">
                                    <div
                                        className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full"
                                        style={{ backgroundColor: event.bgColor, borderWidth: "2px", borderStyle: "solid" as const, borderColor: "#111827" }}
                                    >
                                        <event.icon className="h-4 w-4" style={{ color: event.color }} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-[13px] font-semibold" style={{ color: "#E5E7EB" }}>{event.title}</h3>
                                            <span className="text-[11px]" style={{ color: "#475569" }}>{event.timestamp}</span>
                                        </div>
                                        <p className="mt-1 text-[13px]" style={{ color: "#94A3B8" }}>{event.description}</p>
                                        {event.type === "reply" && (
                                            <div
                                                className="mt-3 rounded-lg p-3 text-[13px] italic"
                                                style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.05)", color: "#64748B" }}
                                            >
                                                "Hi team, I looked at the pricing guide and I'd like to discuss the Enterprise tier features. Are you available for a call this week?"
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.04)" }}>
                            <button className="text-[13px] font-medium" style={{ color: "#3B82F6", transition: "color 180ms" }}>View all history</button>
                        </div>
                    </div>

                    {/* Notes */}
                    <div
                        className="rounded-xl p-6"
                        style={{ backgroundColor: "#111827", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.05)", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-[15px] font-medium" style={{ color: "#E5E7EB" }}>Internal Notes</h2>
                            <button className="text-[13px] font-medium" style={{ color: "#3B82F6" }}>Add Note</button>
                        </div>
                        <div
                            className="rounded-lg p-4"
                            style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.04)" }}
                        >
                            <p className="text-[13px]" style={{ color: "#94A3B8" }}>Discussed custom integration requirements. They need n8n to connect with their legacy ERP system.</p>
                            <div className="mt-3 flex items-center gap-2 text-[11px]" style={{ color: "#475569" }}>
                                <div className="h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: "rgba(59, 130, 246, 0.12)", color: "#3B82F6" }}>OP</div>
                                <span>Operator added 1 day ago</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Lead Info */}
                <div className="space-y-6">
                    <div
                        className="rounded-xl p-6"
                        style={{ backgroundColor: "#111827", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.05)", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)" }}
                    >
                        <h2 className="mb-5 text-[15px] font-medium" style={{ color: "#E5E7EB" }}>Lead Details</h2>
                        <div className="space-y-5">
                            <div>
                                <label className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#475569" }}>Status</label>
                                <div className="mt-1.5"><Badge variant="warning">Replied</Badge></div>
                            </div>
                            <div>
                                <label className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#475569" }}>Source</label>
                                <p className="mt-1 text-[13px] font-medium" style={{ color: "#E5E7EB" }}>Website Contact Form</p>
                            </div>
                            <div>
                                <label className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#475569" }}>Owner</label>
                                <div className="mt-1.5 flex items-center gap-2">
                                    <div className="h-5 w-5 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: "rgba(59, 130, 246, 0.12)", color: "#3B82F6" }}>OP</div>
                                    <p className="text-[13px] font-medium" style={{ color: "#E5E7EB" }}>Operator</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#475569" }}>Created At</label>
                                <p className="mt-1 text-[13px]" style={{ color: "#94A3B8" }}>Feb 9, 2026, 09:00 AM</p>
                            </div>
                            <div>
                                <label className="text-[11px] font-medium uppercase tracking-wide" style={{ color: "#475569" }}>Enriched Data (Clearbit)</label>
                                <div
                                    className="mt-2 space-y-2.5 rounded-lg p-3 text-[12px]"
                                    style={{ backgroundColor: "rgba(255, 255, 255, 0.02)", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.05)" }}
                                >
                                    {[
                                        { label: "Role", value: "CTO" },
                                        { label: "Company Size", value: "50-200" },
                                        { label: "Location", value: "San Francisco, CA" },
                                    ].map((item) => (
                                        <div key={item.label} className="flex justify-between">
                                            <span style={{ color: "#64748B" }}>{item.label}</span>
                                            <span className="font-medium" style={{ color: "#E5E7EB" }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
