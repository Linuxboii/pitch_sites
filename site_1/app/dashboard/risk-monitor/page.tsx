"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Newspaper, ShieldCheck, Siren, Globe, ExternalLink } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";
import { getGlobalRisks } from "@/app/actions/public-api";

const riskData = [
    { time: "00:00", score: 12 },
    { time: "04:00", score: 15 },
    { time: "08:00", score: 45 },
    { time: "12:00", score: 32 },
    { time: "16:00", score: 25 },
    { time: "20:00", score: 18 },
    { time: "24:00", score: 14 },
];

export default function RiskMonitorPage() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            try {
                const data = await getGlobalRisks();
                setNews(data);
            } catch (e) {
                console.error("Failed to load news", e);
            } finally {
                setLoading(false);
            }
        };
        loadNews();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Risk Monitor</h2>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 animate-pulse">
                    <Siren className="w-4 h-4" /> Global Threat Level: MODERATE
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Risk Trend */}
                <Card className="glass-panel border-white/10">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">24h Risk Sentiment Trend</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={riskData}>
                                <defs>
                                    <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(11, 15, 25, 0.9)', border: '1px solid rgba(255,255,255,0.1)' }} />
                                <Area type="monotone" dataKey="score" stroke="#ef4444" fill="url(#colorRisk)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Live News Feed */}
                <Card className="glass-panel border-white/10">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                            <Newspaper className="w-4 h-4 mr-2" /> Global Intelligence Feed (GDELT)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {loading ? (
                                <div className="text-sm text-muted-foreground flex justify-center p-4">Loading global risks...</div>
                            ) : news.length === 0 ? (
                                <div className="text-xs text-muted-foreground text-center">No recent critical events found.</div>
                            ) : (
                                news.map((item, i) => (
                                    <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer" onClick={() => window.open(item.url, '_blank')}>
                                        <div className="flex justify-between items-start mb-1 h-6">
                                            <span className="text-xs font-mono text-muted-foreground bg-black/30 px-1.5 py-0.5 rounded truncate max-w-[120px]">{item.source}</span>
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${item.sentiment === 'Critical' ? 'border-red-500 text-red-400' : 'border-yellow-500 text-yellow-400'}`}>
                                                {item.sentiment}
                                            </span>
                                        </div>
                                        <h4 className="text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">{item.title}</h4>
                                        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{new Date(item.time).toLocaleDateString()}</span>
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                )))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Active Alerts Log */}
            <Card className="glass-panel border-white/10">
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" /> System Alerts
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-red-500/10 border border-red-500/20 rounded-md">
                            <span className="text-sm text-red-200">Unauthorized API Access Attempt Blocked (IP: 192.168.x.x)</span>
                            <span className="text-xs text-red-300/70">Just now</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-md">
                            <span className="text-sm text-yellow-200">Server Load High &gt; 85%</span>
                            <span className="text-xs text-yellow-300/70">5m ago</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
