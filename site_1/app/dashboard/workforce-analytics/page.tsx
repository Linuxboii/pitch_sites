"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, Clock, Coffee, Zap } from "lucide-react";

export default function WorkforceAnalyticsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <h2 className="text-3xl font-bold tracking-tight">Workforce Analytics</h2>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Productivity Index */}
                <Card className="glass-panel border-white/10 md:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                            <Zap className="w-4 h-4 mr-2" /> Team Productivity Trends
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-end justify-between gap-2 px-2">
                        {[65, 78, 82, 70, 85, 90, 88, 76, 92, 95, 89, 94].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div
                                    className="w-full bg-gradient-to-t from-primary/20 to-primary/80 rounded-t-sm transition-all duration-500 group-hover:to-accent"
                                    style={{ height: `${h}%` }}
                                />
                                <span className="text-[10px] text-muted-foreground">{i + 8}:00</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Burnout Risk Heatmap */}
                <Card className="glass-panel border-white/10">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                            <Coffee className="w-4 h-4 mr-2" /> Burnout Risk Heatmap
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative aspect-square">
                            <div className="grid grid-cols-2 gap-2 h-full">
                                <div className="bg-green-500/20 rounded-lg p-4 flex flex-col justify-between border border-green-500/20">
                                    <span className="text-xs text-muted-foreground">Engineering</span>
                                    <span className="text-xl font-bold text-green-400">Low</span>
                                </div>
                                <div className="bg-yellow-500/20 rounded-lg p-4 flex flex-col justify-between border border-yellow-500/20">
                                    <span className="text-xs text-muted-foreground">Design</span>
                                    <span className="text-xl font-bold text-yellow-400">Med</span>
                                </div>
                                <div className="bg-red-500/20 rounded-lg p-4 flex flex-col justify-between border border-red-500/20">
                                    <span className="text-xs text-muted-foreground">Sales</span>
                                    <span className="text-xl font-bold text-red-400">High</span>
                                </div>
                                <div className="bg-green-500/20 rounded-lg p-4 flex flex-col justify-between border border-green-500/20">
                                    <span className="text-xs text-muted-foreground">Support</span>
                                    <span className="text-xl font-bold text-green-400">Low</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <Card className="glass-panel border-white/10">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">12h 30m</div>
                                <div className="text-xs text-muted-foreground">Avg. Meeting Time</div>
                            </div>
                            <Clock className="w-8 h-8 text-primary/50" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-panel border-white/10">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-2xl font-bold">94%</div>
                                <div className="text-xs text-muted-foreground">Task Completion</div>
                            </div>
                            <BrainCircuit className="w-8 h-8 text-accent/50" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
