"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Area, AreaChart } from "recharts";
import { cn } from "@/lib/utils";
import { useCursorTracker } from "@/hooks/useCursorTracker";

const fallbackData = [
    { time: "00:00", runs: 0 },
    { time: "04:00", runs: 0 },
    { time: "08:00", runs: 0 },
    { time: "12:00", runs: 0 },
    { time: "16:00", runs: 0 },
    { time: "20:00", runs: 0 },
];

interface SystemHealthChartProps {
    className?: string;
    data?: { time: string; runs: number }[];
}

export function SystemHealthChart({ className, data }: SystemHealthChartProps) {
    const { ref, cursor } = useCursorTracker<HTMLDivElement>();

    // Use real data if available, collapse to 6 time slots for readability
    const chartData = data && data.length > 0 ? collapseHourly(data) : fallbackData;
    const hasData = data && data.some(d => d.runs > 0);

    return (
        <div
            ref={ref}
            className={cn("rounded-xl p-6 cursor-card relative", className)}
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
                <div>
                    <h3 className="text-[15px] font-medium" style={{ color: "#E5E7EB" }}>
                        Automation Volume
                    </h3>
                    <p className="text-[11px] mt-0.5" style={{ color: "#475569" }}>
                        {hasData ? "Last 24 hours" : "No executions in the last 24 hours"}
                    </p>
                </div>
            </div>
            <div className="relative z-10 h-[300px] w-full min-w-0">
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={chartData}>
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
                            allowDecimals={false}
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
                            formatter={(value: number | undefined) => [`${value ?? 0} runs`, 'Executions']}
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

// Groups 24 hourly data points into 8 three-hour blocks for readability
function collapseHourly(data: { time: string; runs: number }[]): { time: string; runs: number }[] {
    const blocks: { time: string; runs: number }[] = [];
    const sortedData = [...data].sort((a, b) => a.time.localeCompare(b.time));

    for (let i = 0; i < 24; i += 3) {
        const label = `${i.toString().padStart(2, '0')}:00`;
        let sum = 0;
        for (let j = i; j < i + 3 && j < 24; j++) {
            const key = `${j.toString().padStart(2, '0')}:00`;
            const found = sortedData.find(d => d.time === key);
            if (found) sum += found.runs;
        }
        blocks.push({ time: label, runs: sum });
    }
    return blocks;
}
