"use client";

import { motion } from "framer-motion";
import { Activity, ArrowUpRight, BarChart3, Globe, Shield, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function HeroDashboardPreview() {
    return (
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center perspective-1000">
            <motion.div
                initial={{ rotateX: 20, rotateY: -20, opacity: 0, scale: 0.9 }}
                animate={{ rotateX: 10, rotateY: -10, opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative z-10 w-[90%] max-w-[800px] bg-background/80 backdrop-blur-xl rounded-xl border border-white/10 shadow-2xl overflow-hidden transform-style-3d group hover:rotate-0 transition-transform duration-700 ease-out"
                style={{ transformStyle: "preserve-3d", transform: "perspective(1000px) rotateX(5deg) rotateY(-5deg)" }}
            >
                {/* Fake Browser Chrome */}
                <div className="h-8 bg-black/20 border-b border-white/5 flex items-center px-4 space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>

                {/* Dashboard Content Mockup */}
                <div className="p-6 grid grid-cols-3 gap-4">
                    {/* Sidebar Mock */}
                    <div className="hidden md:flex flex-col space-y-4 col-span-1 border-r border-white/5 pr-4">
                        <div className="h-8 w-32 bg-primary/20 rounded animate-pulse" />
                        <div className="space-y-2 pt-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-center space-x-2">
                                    <div className="w-4 h-4 rounded-full bg-white/10" />
                                    <div className="h-4 w-24 bg-white/5 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Area Mock */}
                    <div className="col-span-3 md:col-span-2 space-y-4">
                        {/* Top Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="p-4 bg-white/5 border-white/10">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-primary/20 rounded-lg"><Activity className="w-4 h-4 text-primary" /></div>
                                    <span className="text-xs text-green-400 flex items-center">+12.5% <ArrowUpRight className="w-3 h-3 ml-1" /></span>
                                </div>
                                <div className="mt-2">
                                    <div className="text-xs text-muted-foreground">Active Workflows</div>
                                    <div className="text-2xl font-bold">1,284</div>
                                </div>
                            </Card>
                            <Card className="p-4 bg-white/5 border-white/10">
                                <div className="flex justify-between items-start">
                                    <div className="p-2 bg-secondary/20 rounded-lg"><Zap className="w-4 h-4 text-secondary" /></div>
                                    <span className="text-xs text-green-400 flex items-center">+8.2% <ArrowUpRight className="w-3 h-3 ml-1" /></span>
                                </div>
                                <div className="mt-2">
                                    <div className="text-xs text-muted-foreground">Automation Saved</div>
                                    <div className="text-2xl font-bold">842h</div>
                                </div>
                            </Card>
                        </div>

                        {/* Main Chart Mock */}
                        <Card className="h-40 p-4 bg-white/5 border-white/10 flex items-end space-x-2">
                            {[40, 60, 45, 70, 55, 80, 65, 90, 75, 60, 50, 65, 85].map((h, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${h}%` }}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
                                    className="flex-1 bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-sm"
                                />
                            ))}
                        </Card>

                        {/* Live Feed Row */}
                        <div className="flex space-x-3">
                            <Card className="flex-1 p-3 bg-white/5 border-white/10 flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"><Globe className="w-4 h-4 text-blue-400" /></div>
                                <div className="space-y-1">
                                    <div className="h-2 w-16 bg-white/10 rounded" />
                                    <div className="h-1.5 w-10 bg-white/5 rounded" />
                                </div>
                            </Card>
                            <Card className="flex-1 p-3 bg-white/5 border-white/10 flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"><Shield className="w-4 h-4 text-purple-400" /></div>
                                <div className="space-y-1">
                                    <div className="h-2 w-16 bg-white/10 rounded" />
                                    <div className="h-1.5 w-10 bg-white/5 rounded" />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Glow Effects */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 blur-2xl -z-10 opacity-40 animate-pulse-glow" />
            </motion.div>
        </div>
    );
}
