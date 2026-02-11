"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts";
import { cn } from "@/lib/utils";
import { useCursorTracker } from "@/hooks/useCursorTracker";

const data = [
    { time: "00:00", runs: 120 },
    { time: "04:00", runs: 85 },
    { time: "08:00", runs: 450 },
    { time: "12:00", runs: 980 },
    { time: "16:00", runs: 850 },
    { time: "20:00", runs: 340 },
    { time: "23:59", runs: 180 },
];

export function SystemHealthChart({ className }: { className?: string }) {
    const { ref, cursor } = useCursorTracker<HTMLDivElement>();

    return (
        <div
            ref={ref}
            className={cn("rounded-xl p-6 cursor-card", className)}
            style={{
                backgroundColor: "#111827",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: cursor.isInside ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0.05)",
                boxShadow: cursor.isInside
                    ? "0 1px 2px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.35)"
                    : "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
        >
            {/* Subtle cursor glow overlay */}
            {cursor.isInside && (
                <div
                    className="pointer-events-none absolute inset-0 rounded-xl"
                    style={{
                        background: `radial-gradient(400px circle at ${cursor.x * 100}% ${cursor.y * 100}%, rgba(59, 130, 246, 0.02), transparent 60%)`,
                    }}
                />
            )}

            <div className="relative z-10 mb-6 flex items-center justify-between">
                <h3 className="text-[15px] font-medium" style={{ color: "#E5E7EB" }}>
                    Automation Volume
                </h3>
                <select
                    className="rounded-lg px-3 py-1.5 text-[12px] font-medium outline-none"
                    style={{
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: "rgba(255, 255, 255, 0.06)",
                        color: "#94A3B8",
                        transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <option>Last 24 Hours</option>
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                </select>
            </div>
            <div className="relative z-10 h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="runGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="rgba(255, 255, 255, 0.04)"
                            vertical={false}
                        />
                        <XAxis
                            dataKey="time"
                            stroke="#475569"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                            fontFamily="'Inter', sans-serif"
                        />
                        <YAxis
                            stroke="#475569"
                            fontSize={11}
                            tickLine={false}
                            axisLine={false}
                            dx={-10}
                            fontFamily="'Inter', sans-serif"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "#1E293B",
                                borderColor: "rgba(255, 255, 255, 0.08)",
                                borderRadius: "10px",
                                color: "#E5E7EB",
                                fontSize: "12px",
                                fontFamily: "'Inter', sans-serif",
                                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                                padding: "8px 12px",
                            }}
                            itemStyle={{ color: "#3B82F6" }}
                            cursor={{ stroke: "rgba(59, 130, 246, 0.2)", strokeWidth: 1 }}
                            animationDuration={150}
                        />
                        <Area
                            type="monotone"
                            dataKey="runs"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            fill="url(#runGradient)"
                            dot={false}
                            activeDot={{
                                r: 4,
                                strokeWidth: 2,
                                stroke: "#3B82F6",
                                fill: "#111827",
                            }}
                            animationDuration={600}
                            animationEasing="ease-out"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
