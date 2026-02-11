"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Search, Filter, MoreHorizontal, Mail, Phone, Calendar } from "lucide-react";
import { useStaggeredEntry } from "@/hooks/useStaggeredEntry";

const leads = [
    {
        id: "1",
        name: "Sarah Miller",
        email: "sarah.m@techcorp.io",
        source: "Website Form",
        status: "New",
        lastContacted: "2 hours ago",
        createdAt: "Today, 09:00 AM",
        avatar: "SM"
    },
    {
        id: "2",
        name: "James Chen",
        email: "j.chen@startuplabs.com",
        source: "LinkedIn",
        status: "Auto-Replied",
        lastContacted: "1 day ago",
        createdAt: "Yesterday, 04:30 PM",
        avatar: "JC"
    },
    {
        id: "3",
        name: "Emily Davis",
        email: "emily.davis@designstudio.net",
        source: "Referral",
        status: "Follow-Up",
        lastContacted: "3 days ago",
        createdAt: "Feb 5, 2026",
        avatar: "ED"
    },
    {
        id: "4",
        name: "Michael Wilson",
        email: "m.wilson@enterprises.co",
        source: "Cold Email",
        status: "Replied",
        lastContacted: "5 days ago",
        createdAt: "Feb 3, 2026",
        avatar: "MW"
    },
    {
        id: "5",
        name: "David Brown",
        email: "david.b@global.inc",
        source: "Website Form",
        status: "Closed",
        lastContacted: "1 week ago",
        createdAt: "Jan 28, 2026",
        avatar: "DB"
    }
];

export default function LeadsPage() {
    const visible = useStaggeredEntry(leads.length + 3, 50, 80);

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
                    <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>Leads</h1>
                    <p className="mt-1 text-[13px]" style={{ color: "#64748B" }}>CRM pipeline and lead management</p>
                </div>
                <div className="flex gap-2">
                    <button
                        className="rounded-lg px-4 py-2 text-[13px] font-medium"
                        style={{
                            backgroundColor: "transparent",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgba(255, 255, 255, 0.08)",
                            color: "#CBD5E1",
                            transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        Export CSV
                    </button>
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
                        Add Lead
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div
                className="flex flex-col gap-4 rounded-xl p-4 sm:flex-row"
                style={{
                    backgroundColor: "#111827",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255, 255, 255, 0.05)",
                    opacity: visible[1] ? 1 : 0,
                    transform: visible[1] ? "translateY(0)" : "translateY(3px)",
                    transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4" style={{ color: "#475569" }} strokeWidth={1.5} />
                    <input
                        type="text"
                        placeholder="Search leads by name or email..."
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
                <div className="flex gap-2">
                    <select className="h-9 rounded-lg px-3 py-1 text-[12px] font-medium outline-none" style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.06)", color: "#94A3B8" }}>
                        <option>All Statuses</option>
                        <option>New</option>
                        <option>Auto-Replied</option>
                        <option>Follow-Up</option>
                        <option>Replied</option>
                        <option>Closed</option>
                    </select>
                    <select className="h-9 rounded-lg px-3 py-1 text-[12px] font-medium outline-none" style={{ backgroundColor: "rgba(255, 255, 255, 0.03)", borderWidth: "1px", borderStyle: "solid" as const, borderColor: "rgba(255, 255, 255, 0.06)", color: "#94A3B8" }}>
                        <option>All Sources</option>
                        <option>Website Form</option>
                        <option>LinkedIn</option>
                        <option>Referral</option>
                    </select>
                </div>
            </div>

            {/* Leads Table */}
            <div
                className="rounded-xl overflow-hidden"
                style={{
                    backgroundColor: "#111827",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                    opacity: visible[2] ? 1 : 0,
                    transform: visible[2] ? "translateY(0)" : "translateY(4px)",
                    transition: "opacity 250ms cubic-bezier(0.4, 0, 0.2, 1), transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
            >
                <table className="w-full text-left text-[13px]">
                    <thead>
                        <tr style={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Name</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Source</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Status</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Last Contacted</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>Created At</th>
                            <th className="px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-right" style={{ color: "#475569" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead, index) => (
                            <tr
                                key={lead.id}
                                role="button"
                                style={{
                                    borderTop: "1px solid rgba(255, 255, 255, 0.03)",
                                    transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 200ms, transform 200ms",
                                    opacity: visible[index + 3] ? 1 : 0,
                                    transform: visible[index + 3] ? "translateY(0)" : "translateY(3px)",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.03)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                            >
                                <td className="px-6 py-3.5">
                                    <Link href={`/leads/${lead.id}`} className="flex items-center gap-3 group">
                                        <div
                                            className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold"
                                            style={{
                                                backgroundColor: "rgba(59, 130, 246, 0.1)",
                                                color: "#3B82F6",
                                                transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1), transform 180ms",
                                            }}
                                        >
                                            {lead.avatar}
                                        </div>
                                        <div>
                                            <div className="font-medium" style={{ color: "#E5E7EB", transition: "color 180ms" }}>{lead.name}</div>
                                            <div className="text-[11px]" style={{ color: "#475569" }}>{lead.email}</div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-3.5" style={{ color: "#64748B" }}>{lead.source}</td>
                                <td className="px-6 py-3.5">
                                    <Badge variant={
                                        lead.status === "New" ? "default" :
                                            lead.status === "Closed" ? "secondary" :
                                                lead.status === "Replied" ? "success" : "outline"
                                    }>
                                        {lead.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-3.5" style={{ color: "#64748B" }}>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-3 w-3" style={{ color: "#475569" }} strokeWidth={1.5} />
                                        {lead.lastContacted}
                                    </div>
                                </td>
                                <td className="px-6 py-3.5" style={{ color: "#64748B" }}>{lead.createdAt}</td>
                                <td className="px-6 py-3.5 text-right">
                                    <button
                                        className="rounded-lg p-2 hover:bg-white/[0.04]"
                                        style={{ color: "#475569", transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)" }}
                                    >
                                        <MoreHorizontal className="h-4 w-4" strokeWidth={1.5} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
