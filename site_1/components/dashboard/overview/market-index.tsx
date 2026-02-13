"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { getMarketIndex } from "@/app/actions/finance";

const mockChartData = [
    { time: "9:30", value: 4120 },
    { time: "10:00", value: 4135 },
    { time: "10:30", value: 4128 },
    { time: "11:00", value: 4142 },
    { time: "11:30", value: 4150 },
    { time: "12:00", value: 4158 },
    { time: "12:30", value: 4155 },
];

export function MarketIndexWidget() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMarket = async () => {
            try {
                const indexData = await getMarketIndex();
                // Fallback for demo if API limit reached or error
                setData(indexData || { price: 4155.23, change: 12.45, changePercent: 0.32, symbol: "S&P 500 (Demo)" });
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadMarket();
    }, []);

    const isPositive = data ? data.change >= 0 : true;

    return (
        <Card className="glass-panel border-white/10 h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Activity className="w-24 h-24 text-primary" />
            </div>

            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" /> Global Market Index
                </CardTitle>
            </CardHeader>

            <CardContent>
                {loading ? (
                    <div className="h-[100px] flex items-center justify-center text-muted-foreground text-sm">Loading market data...</div>
                ) : (
                    <>
                        <div className="flex items-baseline space-x-3">
                            <span className="text-4xl font-bold tracking-tighter text-white">
                                {data.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                            </span>
                            <span className={`flex items-center text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                                {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                                {data.change > 0 ? '+' : ''}{data.change} ({data.changePercent}%)
                            </span>
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">{data.symbol} • Real-time</div>

                        {/* Mini Chart */}
                        <div className="h-[60px] mt-4 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={mockChartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={isPositive ? "#4ade80" : "#f87171"} stopOpacity={0.3} />
                                            <stop offset="95%" stopColor={isPositive ? "#4ade80" : "#f87171"} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Tooltip contentStyle={{ display: 'none' }} cursor={{ stroke: 'rgba(255,255,255,0.1)' }} />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={isPositive ? "#4ade80" : "#f87171"}
                                        fill="url(#colorValue)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
