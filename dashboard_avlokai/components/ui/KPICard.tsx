"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCursorTracker, getCursorStyles } from "@/hooks/useCursorTracker";

interface KPICardProps {
    label: string;
    value: string | number;
    subtext: string;
    trend?: "up" | "down" | "neutral";
    icon?: LucideIcon;
    className?: string;
}

export function KPICard({ label, value, subtext, trend, icon: Icon, className }: KPICardProps) {
    const { ref, cursor } = useCursorTracker<HTMLDivElement>();
    const cursorStyles = getCursorStyles(cursor, {
        parallaxIntensity: 1.5,
        shadowIntensity: 6,
        glowIntensity: 0.08,
    });

    return (
        <div
            ref={ref}
            className={cn(
                "group relative rounded-xl p-6 cursor-card",
                "active:scale-[0.97]",
                className
            )}
            style={{
                backgroundColor: "#111827",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                ...cursorStyles,
            }}
        >
            {/* Cursor-following highlight glow */}
            {cursor.isInside && (
                <div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                        opacity: 0.5,
                        background: `radial-gradient(300px circle at ${cursor.x * 100}% ${cursor.y * 100}%, rgba(59, 130, 246, 0.04), transparent 60%)`,
                        transition: "opacity 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                />
            )}

            <div className="relative z-10 flex items-center justify-between">
                <p className="text-[12px] font-medium tracking-wide uppercase" style={{ color: "#64748B" }}>
                    {label}
                </p>
                {Icon && (
                    <div
                        className="flex items-center justify-center h-8 w-8 rounded-lg"
                        style={{
                            backgroundColor: "rgba(59, 130, 246, 0.08)",
                            transition: "background-color 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                            ...(cursor.isInside ? { backgroundColor: "rgba(59, 130, 246, 0.12)" } : {}),
                        }}
                    >
                        <Icon
                            className="h-4 w-4"
                            style={{
                                color: "#3B82F6",
                                transition: "transform 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                                transform: cursor.isInside ? "scale(1.08)" : "scale(1)",
                            }}
                            strokeWidth={1.5}
                        />
                    </div>
                )}
            </div>
            <div className="relative z-10 mt-3 flex items-baseline gap-2">
                <span
                    className="text-[28px] font-semibold tracking-tight"
                    style={{ color: "#F9FAFB", fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
                >
                    {value}
                </span>
            </div>
            <p className={cn(
                "relative z-10 mt-1.5 text-[12px] font-medium",
                trend === "up" ? "text-[#22C55E]" :
                    trend === "down" ? "text-[#EF4444]" : ""
            )} style={trend === "neutral" || !trend ? { color: "#64748B" } : {}}>
                {subtext}
            </p>
        </div>
    );
}
