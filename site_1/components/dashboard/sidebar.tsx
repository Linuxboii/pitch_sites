"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    BarChart3,
    Globe,
    LayoutDashboard,
    LineChart,
    Settings,
    ShieldAlert,
    Users,
    Workflow
} from "lucide-react";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: Globe, label: "Market Signals", href: "/dashboard/market-signals" },
    { icon: Users, label: "Lead Intelligence", href: "/dashboard/lead-intelligence" },
    { icon: ShieldAlert, label: "Risk Monitor", href: "/dashboard/risk-monitor" },
    { icon: BarChart3, label: "Workforce Analytics", href: "/dashboard/workforce-analytics" },
    { icon: Workflow, label: "Automation Center", href: "/dashboard/automation" },
    { icon: LineChart, label: "Reports", href: "/dashboard/reports" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 border-r border-white/5 bg-background/50 backdrop-blur-xl flex flex-col z-50">
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <div className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    NEXUS AI
                </div>
            </div>

            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-white bg-primary/10"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                            )}
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                            )}

                            <Icon className={cn("w-5 h-5 mr-3 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-white")} />
                            <span className="relative z-10">{item.label}</span>

                            {isActive && (
                                <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <div className="rounded-lg bg-white/5 p-4 border border-white/5">
                    <div className="text-xs font-semibold text-muted-foreground mb-2">SYSTEM STATUS</div>
                    <div className="flex items-center gap-2 text-sm text-green-400">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        Operational
                    </div>
                </div>
            </div>
        </aside>
    );
}
