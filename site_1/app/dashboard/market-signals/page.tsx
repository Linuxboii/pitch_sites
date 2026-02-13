"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, TrendingUp, Zap, ArrowUpRight } from "lucide-react";
import { getTechSignals } from "@/app/actions/public-api";

const sectors = [
    { name: "SaaS", change: "+12.4%", color: "bg-green-500/20 text-green-400" },
    { name: "Fintech", change: "+8.2%", color: "bg-green-500/10 text-green-500" },
    { name: "HealthTech", change: "-2.1%", color: "bg-red-500/20 text-red-400" },
    { name: "E-comm", change: "+4.5%", color: "bg-green-500/10 text-green-500" },
    { name: "AI Infra", change: "+18.9%", color: "bg-green-500/30 text-green-300" },
    { name: "CyberSec", change: "+6.7%", color: "bg-green-500/10 text-green-500" },
    { name: "EdTech", change: "-0.5%", color: "bg-red-500/10 text-red-500" },
    { name: "Logistics", change: "+3.2%", color: "bg-green-500/10 text-green-500" },
    { name: "Energy", change: "+1.1%", color: "bg-green-500/10 text-green-500" },
];

export default function MarketSignalsPage() {
    const [signals, setSignals] = useState<any[]>([]);

    useEffect(() => {
        const loadSignals = async () => {
            try {
                const data = await getTechSignals();
                setSignals(data);
            } catch (error) {
                console.error("Failed to load signals", error);
            }
        };
        loadSignals();
    }, []);

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Market Signals</h2>
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                    <Zap className="mr-2 h-4 w-4" /> Connect Signal to Workflow
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Heatmap Section */}
                <Card className="glass-panel border-white/10">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                            <TrendingUp className="mr-2 h-4 w-4" /> Live Sector Heatmap
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                            {sectors.map((sector) => (
                                <div
                                    key={sector.name}
                                    className={`h-24 rounded-lg flex flex-col items-center justify-center p-2 transition-all hover:scale-105 cursor-pointer ${sector.color} border border-white/5 hover:border-white/20`}
                                >
                                    <span className="font-bold text-lg">{sector.name}</span>
                                    <span className="text-sm">{sector.change}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Funding Alerts */}
                <Card className="glass-panel border-white/10">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                            <Bell className="mr-2 h-4 w-4" /> Venture Funding Feed (Hacker News)
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {signals.length === 0 ? <p className="text-sm text-muted-foreground p-4 text-center">Loading signals...</p> : signals.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-accent/30 transition-all cursor-pointer group" onClick={() => window.open(item.url, '_blank')}>
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="w-8 h-8 rounded bg-accent/20 flex items-center justify-center font-bold text-accent text-xs shrink-0">HN</div>
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-medium text-white truncate group-hover:text-accent transition-colors">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground">{item.source} • {new Date(item.time).toLocaleTimeString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right pl-2">
                                        <ArrowUpRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Mock Government Tenders */}
            <Card className="glass-panel border-white/10">
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Government Tender Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-2 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <div className="space-y-1">
                                    <div className="text-sm font-medium">Digital Infrastructure Upgrade - Phase {i}</div>
                                    <div className="text-xs text-muted-foreground">Dept of Technology • ID: #GOV-{2024000 + i}</div>
                                </div>
                                <Button size="sm" variant="ghost" className="text-xs">
                                    Analyze PDF
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
