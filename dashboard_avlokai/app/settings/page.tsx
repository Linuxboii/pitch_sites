"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import {
    Settings,
    Database,
    Lock,
    Puzzle,
    Save,
    RefreshCw,
    CheckCircle2,
    Globe,
    Zap,
    ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getN8nStatus, getWorkflows, getExecutionStats } from "@/app/actions/n8n";
import { type N8nWorkflow, type ExecutionStats } from "@/app/types/n8n";

const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "integrations", label: "Integrations", icon: Puzzle },
    { id: "database", label: "Database", icon: Database },
    { id: "access", label: "Access Control", icon: Lock },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");
    const [n8nConnected, setN8nConnected] = useState(false);
    const [workflowCount, setWorkflowCount] = useState(0);
    const [stats, setStats] = useState<ExecutionStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStatus() {
            try {
                const [status, workflows, execStats] = await Promise.all([
                    getN8nStatus(),
                    getWorkflows(),
                    getExecutionStats(),
                ]);
                setN8nConnected(status.connected);
                setWorkflowCount(workflows.length);
                setStats(execStats);
            } catch (err) {
                console.error("Failed to fetch settings data", err);
            } finally {
                setLoading(false);
            }
        }
        fetchStatus();
    }, []);

    const inputStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        borderWidth: "1px",
        borderStyle: "solid" as const,
        borderColor: "rgba(255, 255, 255, 0.06)",
        color: "#E5E7EB",
        transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-[22px] font-semibold" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>Settings</h1>
                <p className="mt-1 text-[13px]" style={{ color: "#64748B" }}>Configure system preferences and integrations</p>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
                {/* Tabs Sidebar */}
                <div className="w-full lg:w-56 flex-shrink-0">
                    <div
                        className="flex flex-row overflow-x-auto lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 rounded-xl p-2"
                        style={{
                            backgroundColor: "#111827",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgba(255, 255, 255, 0.05)",
                        }}
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium whitespace-nowrap",
                                    "transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                                )}
                                style={activeTab === tab.id ? {
                                    backgroundColor: "rgba(59, 130, 246, 0.08)",
                                    color: "#E2E8F0",
                                } : {
                                    color: "#64748B",
                                }}
                            >
                                {activeTab === tab.id && (
                                    <span
                                        className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full hidden lg:block"
                                        style={{
                                            backgroundColor: "#3B82F6",
                                            boxShadow: "0 0 8px rgba(59, 130, 246, 0.4)",
                                        }}
                                    />
                                )}
                                <tab.icon className="h-4 w-4" strokeWidth={1.5} style={{
                                    color: activeTab === tab.id ? "#3B82F6" : "#475569"
                                }} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 space-y-6">
                    {/* General Tab */}
                    {activeTab === "general" && (
                        <div className="space-y-6">
                            <div
                                className="rounded-xl p-6"
                                style={{
                                    backgroundColor: "#111827",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderColor: "rgba(255, 255, 255, 0.05)",
                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <h2 className="text-[15px] font-medium mb-5" style={{ color: "#E5E7EB" }}>Instance Configuration</h2>
                                <div className="grid gap-5">
                                    <div className="grid gap-2">
                                        <label className="text-[12px] font-medium" style={{ color: "#94A3B8" }}>Instance Name</label>
                                        <input
                                            type="text"
                                            className="rounded-lg px-3 py-2.5 text-[13px] outline-none"
                                            style={inputStyle}
                                            defaultValue="AvlokAI Production"
                                            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)"; }}
                                            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)"; e.currentTarget.style.boxShadow = "none"; }}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-[12px] font-medium" style={{ color: "#94A3B8" }}>Base URL</label>
                                        <input
                                            type="text"
                                            className="rounded-lg px-3 py-2.5 text-[13px] outline-none"
                                            style={inputStyle}
                                            defaultValue="https://console.avlokai.com"
                                            onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.4)"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(59, 130, 246, 0.1)"; }}
                                            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)"; e.currentTarget.style.boxShadow = "none"; }}
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <button
                                            className="inline-flex items-center justify-center rounded-lg text-[13px] font-medium h-9 px-4 py-2"
                                            style={{
                                                backgroundColor: "#3B82F6",
                                                color: "#FFFFFF",
                                                transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                                                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 0 1px rgba(59, 130, 246, 0.3), 0 0 20px rgba(59, 130, 246, 0.15)"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 2px rgba(0, 0, 0, 0.3)"; }}
                                        >
                                            <Save className="mr-2 h-4 w-4" strokeWidth={1.5} /> Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Integrations Tab */}
                    {activeTab === "integrations" && (
                        <div className="space-y-6">
                            <div
                                className="rounded-xl p-6"
                                style={{
                                    backgroundColor: "#111827",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderColor: "rgba(255, 255, 255, 0.05)",
                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <h2 className="text-[15px] font-medium mb-5" style={{ color: "#E5E7EB" }}>Connected Services</h2>
                                <div className="space-y-3">
                                    {/* n8n Integration */}
                                    <div
                                        className="flex items-center justify-between rounded-xl p-4"
                                        style={{
                                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                                            borderWidth: "1px",
                                            borderStyle: "solid",
                                            borderColor: n8nConnected ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.12)",
                                            transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="h-10 w-10 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: n8nConnected ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)" }}
                                            >
                                                <Zap className="h-5 w-5" style={{ color: n8nConnected ? "#22C55E" : "#EF4444" }} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h3 className="text-[13px] font-medium" style={{ color: "#E5E7EB" }}>n8n Automation Engine</h3>
                                                <p className="text-[11px]" style={{ color: "#64748B" }}>
                                                    {loading ? "Checking connection…" : n8nConnected
                                                        ? `${workflowCount} workflows · ${stats?.totalExecutions ?? 0} total executions`
                                                        : "Connection failed – check API key"}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant={loading ? "secondary" : n8nConnected ? "success" : "destructive"}>
                                                {loading ? "Checking…" : n8nConnected ? "Connected" : "Disconnected"}
                                            </Badge>
                                            <a
                                                href="https://n8n.avlokai.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[12px] font-medium flex items-center gap-1"
                                                style={{ color: "#3B82F6", transition: "color 180ms" }}
                                            >
                                                <ExternalLink className="h-3 w-3" strokeWidth={1.5} />
                                                Open
                                            </a>
                                        </div>
                                    </div>

                                    {/* n8n API Details */}
                                    <div
                                        className="rounded-xl p-4"
                                        style={{
                                            backgroundColor: "rgba(255, 255, 255, 0.02)",
                                            borderWidth: "1px",
                                            borderStyle: "solid",
                                            borderColor: "rgba(255, 255, 255, 0.05)",
                                        }}
                                    >
                                        <h4 className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: "#475569" }}>
                                            API Configuration
                                        </h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-3.5 w-3.5" style={{ color: "#475569" }} strokeWidth={1.5} />
                                                <span className="text-[11px] font-medium" style={{ color: "#94A3B8" }}>Endpoint:</span>
                                                <code className="text-[11px] px-1.5 py-0.5 rounded-md" style={{
                                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                                    color: "#94A3B8",
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                }}>
                                                    https://n8n.avlokai.com/api/v1
                                                </code>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Lock className="h-3.5 w-3.5" style={{ color: "#475569" }} strokeWidth={1.5} />
                                                <span className="text-[11px] font-medium" style={{ color: "#94A3B8" }}>API Key:</span>
                                                <code className="text-[11px] px-1.5 py-0.5 rounded-md" style={{
                                                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                                                    color: "#94A3B8",
                                                    fontFamily: "'JetBrains Mono', monospace",
                                                }}>
                                                    ••••••••••••••••
                                                </code>
                                                <span className="text-[10px]" style={{ color: "#475569" }}>(server-side only)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Placeholder for future integrations */}
                                    <div
                                        className="rounded-xl p-4 flex items-center justify-center"
                                        style={{
                                            borderWidth: "1px",
                                            borderStyle: "dashed",
                                            borderColor: "rgba(255, 255, 255, 0.06)",
                                            minHeight: "64px",
                                        }}
                                    >
                                        <span className="text-[12px]" style={{ color: "#475569" }}>
                                            More integrations coming soon (Stripe, HubSpot, Slack…)
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Database Tab */}
                    {activeTab === "database" && (
                        <div className="space-y-6">
                            <div
                                className="rounded-xl p-6"
                                style={{
                                    backgroundColor: "#111827",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderColor: "rgba(255, 255, 255, 0.05)",
                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-[15px] font-medium" style={{ color: "#E5E7EB" }}>Database Connection</h2>
                                    <button
                                        className="inline-flex items-center rounded-lg text-[12px] font-medium px-3 py-1.5"
                                        style={{
                                            backgroundColor: "transparent",
                                            borderWidth: "1px",
                                            borderStyle: "solid",
                                            borderColor: "rgba(255, 255, 255, 0.08)",
                                            color: "#CBD5E1",
                                            transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                                        }}
                                    >
                                        <RefreshCw className="mr-2 h-3.5 w-3.5" strokeWidth={1.5} /> Test Connection
                                    </button>
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div
                                            className="rounded-xl p-4"
                                            style={{
                                                backgroundColor: "rgba(255, 255, 255, 0.02)",
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                                borderColor: "rgba(255, 255, 255, 0.05)",
                                            }}
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#22C55E", boxShadow: "0 0 6px rgba(34, 197, 94, 0.5)" }} />
                                                <span className="text-[12px] font-medium" style={{ color: "#22C55E" }}>Connected</span>
                                            </div>
                                            <p className="text-[13px]" style={{ color: "#94A3B8" }}>PostgreSQL 15.4 (Managed)</p>
                                            <p className="text-[11px] mt-1" style={{ color: "#475569" }}>Latency: 12ms</p>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[12px] font-medium" style={{ color: "#94A3B8" }}>Host</label>
                                            <div className="flex items-center gap-2">
                                                <Globe className="h-4 w-4" style={{ color: "#475569" }} strokeWidth={1.5} />
                                                <code className="text-[12px] px-2 py-1 rounded-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", color: "#94A3B8", fontFamily: "'JetBrains Mono', monospace" }}>
                                                    db-prod-aws-us-east-1.postgres.database.azure.com
                                                </code>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[12px] font-medium" style={{ color: "#94A3B8" }}>Port</label>
                                            <code className="text-[12px] px-2 py-1 rounded-md" style={{ backgroundColor: "rgba(255, 255, 255, 0.04)", color: "#94A3B8", fontFamily: "'JetBrains Mono', monospace" }}>
                                                5432
                                            </code>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div
                                            className="rounded-xl p-4"
                                            style={{
                                                backgroundColor: "rgba(245, 158, 11, 0.04)",
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                                borderColor: "rgba(245, 158, 11, 0.12)",
                                            }}
                                        >
                                            <div className="flex items-center gap-2 mb-2" style={{ color: "#F59E0B" }}>
                                                <Lock className="h-4 w-4" strokeWidth={1.5} />
                                                <span className="text-[12px] font-medium">Security Note</span>
                                            </div>
                                            <p className="text-[12px] leading-relaxed" style={{ color: "rgba(245, 158, 11, 0.8)" }}>
                                                Credentials are managed via environment variables and are not displayed here for security.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[12px] font-medium" style={{ color: "#94A3B8" }}>Last Heartbeat</label>
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="h-4 w-4" style={{ color: "#22C55E" }} strokeWidth={1.5} />
                                                <span className="text-[12px]" style={{ color: "#64748B" }}>Just now</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Access Control Tab */}
                    {activeTab === "access" && (
                        <div className="space-y-6">
                            <div
                                className="rounded-xl p-6"
                                style={{
                                    backgroundColor: "#111827",
                                    borderWidth: "1px",
                                    borderStyle: "solid",
                                    borderColor: "rgba(255, 255, 255, 0.05)",
                                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                                }}
                            >
                                <h2 className="text-[15px] font-medium mb-5" style={{ color: "#E5E7EB" }}>Team Members</h2>
                                <div className="space-y-3">
                                    {[
                                        { name: "Operator (You)", email: "admin@avlokai.com", role: "Admin", initial: "OP", color: "#3B82F6" },
                                        { name: "Jane Doe", email: "jane@avlokai.com", role: "Editor", initial: "JD", color: "#3B82F6" },
                                    ].map((member) => (
                                        <div
                                            key={member.email}
                                            className="flex items-center justify-between rounded-xl p-4"
                                            style={{
                                                backgroundColor: "rgba(255, 255, 255, 0.02)",
                                                borderWidth: "1px",
                                                borderStyle: "solid",
                                                borderColor: "rgba(255, 255, 255, 0.05)",
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold"
                                                    style={{ backgroundColor: `${member.color}18`, color: member.color }}
                                                >
                                                    {member.initial}
                                                </div>
                                                <div>
                                                    <p className="text-[13px] font-medium" style={{ color: "#E5E7EB" }}>{member.name}</p>
                                                    <p className="text-[11px]" style={{ color: "#475569" }}>{member.email}</p>
                                                </div>
                                            </div>
                                            <Badge variant={member.role === "Admin" ? "default" : "secondary"}>
                                                {member.role}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    className="mt-4 w-full rounded-xl py-2.5 text-[13px]"
                                    style={{
                                        borderWidth: "1px",
                                        borderStyle: "dashed",
                                        borderColor: "rgba(255, 255, 255, 0.08)",
                                        color: "#64748B",
                                        backgroundColor: "transparent",
                                        transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                                    }}
                                >
                                    + Invite Member
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
