"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Workflow,
    Users,
    Play,
    Bot,
    ScrollText,
    Settings,
    ChevronDown,
    LogOut,
    Server
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Workflows", href: "/workflows", icon: Workflow },
    { name: "Leads / CRM", href: "/leads", icon: Users },
    { name: "Executions", href: "/executions", icon: Play },
    { name: "AI Assistants", href: "/assistants", icon: Bot },
    { name: "Logs & Errors", href: "/logs", icon: ScrollText },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [env, setEnv] = useState("Production");
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <div
            className="flex h-screen w-64 flex-col border-r"
            style={{
                backgroundColor: "#0A0E13",
                borderColor: "rgba(255, 255, 255, 0.06)",
            }}
        >
            {/* Brand */}
            <div
                className="flex h-16 flex-col justify-center px-6"
                style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.06)" }}
            >
                <h1 className="text-lg font-semibold tracking-tight" style={{ color: "#F9FAFB", letterSpacing: "-0.02em" }}>
                    AvlokAI
                </h1>
                <p className="text-[11px]" style={{ color: "#64748B", letterSpacing: "0.02em" }}>
                    Automation Systems Console
                </p>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto py-5">
                <nav className="space-y-0.5 px-3">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                        const isHovered = hoveredItem === item.name;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium",
                                    "transition-all duration-[180ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                                    isActive
                                        ? "text-white"
                                        : "text-[#64748B] hover:text-[#CBD5E1]"
                                )}
                                style={{
                                    ...(isActive ? {
                                        backgroundColor: "rgba(59, 130, 246, 0.08)",
                                        color: "#E2E8F0",
                                    } : {}),
                                    ...(isHovered && !isActive ? {
                                        backgroundColor: "rgba(255, 255, 255, 0.03)",
                                    } : {}),
                                }}
                                onMouseEnter={() => setHoveredItem(item.name)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {/* Active indicator bar */}
                                {isActive && (
                                    <span
                                        className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full sidebar-indicator"
                                        style={{
                                            backgroundColor: "#3B82F6",
                                            boxShadow: "0 0 8px rgba(59, 130, 246, 0.4)",
                                        }}
                                    />
                                )}
                                <item.icon
                                    className={cn(
                                        "h-4 w-4 shrink-0",
                                        isActive ? "text-[#3B82F6]" : "text-[#475569] group-hover:text-[#94A3B8]"
                                    )}
                                    strokeWidth={1.5}
                                    style={{
                                        transition: "transform 180ms cubic-bezier(0.4, 0, 0.2, 1), color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                                        transform: isHovered && !isActive ? "scale(1.1)" : "scale(1)",
                                    }}
                                />
                                <span style={{
                                    transition: "transform 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                                    transform: isHovered && !isActive ? "translateX(1px)" : "translateX(0)",
                                    display: "inline-block",
                                }}>
                                    {item.name}
                                </span>

                                {/* Hover glow for non-active items */}
                                {isHovered && !isActive && (
                                    <div
                                        className="pointer-events-none absolute inset-0 rounded-lg"
                                        style={{
                                            background: "radial-gradient(100px circle at 20% 50%, rgba(59, 130, 246, 0.03), transparent 70%)",
                                        }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Environment Selector */}
            <div className="p-4" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                <div className="mb-4">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#475569" }}>
                        Environment
                    </p>
                    <button
                        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px]"
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.03)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "rgba(255, 255, 255, 0.06)",
                            color: "#E2E8F0",
                            transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <span className={cn(
                                "h-2 w-2 rounded-full",
                                env === "Production" ? "bg-[#22C55E]" : "bg-[#F59E0B]"
                            )} style={{
                                boxShadow: env === "Production" ? "0 0 6px rgba(34, 197, 94, 0.4)" : "0 0 6px rgba(245, 158, 11, 0.4)",
                                transition: "box-shadow 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                            }} />
                            <span className="font-medium">{env}</span>
                        </div>
                        <ChevronDown className="h-3.5 w-3.5 opacity-40" style={{
                            transition: "transform 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                        }} />
                    </button>
                </div>

                {/* User Panel */}
                <div
                    className="flex items-center justify-between rounded-lg p-3"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.025)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(255, 255, 255, 0.04)",
                        transition: "border-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="h-8 w-8 rounded-full flex items-center justify-center text-[11px] font-semibold"
                            style={{
                                backgroundColor: "rgba(59, 130, 246, 0.12)",
                                color: "#3B82F6",
                                transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                            }}
                        >
                            OP
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[13px] font-medium" style={{ color: "#E2E8F0" }}>Operator</span>
                            <span className="text-[11px]" style={{ color: "#64748B" }}>Admin</span>
                        </div>
                    </div>
                    <button className="text-[#475569] hover:text-[#94A3B8] transition-colors duration-[180ms] p-1.5 rounded-md hover:bg-white/[0.04]">
                        <LogOut className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
