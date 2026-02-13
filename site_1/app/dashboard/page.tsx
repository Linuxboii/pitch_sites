"use client";

import { MarketIndexWidget } from "@/components/dashboard/overview/market-index";
import { SentimentPulseWidget } from "@/components/dashboard/overview/sentiment-pulse";
import { LeadVelocityWidget } from "@/components/dashboard/overview/lead-velocity";
import { AutomationFeedWidget } from "@/components/dashboard/overview/automation-feed";

export default function DashboardPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
                <div className="text-sm text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    Live Intelligence Feed • Updated: <span className="text-green-400 font-mono">Just now</span>
                </div>
            </div>

            {/* Top Stats Configuration */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <MarketIndexWidget />
                <SentimentPulseWidget />

                {/* Simple count widget 1 */}
                <div className="glass-panel border-white/10 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-sm font-medium text-muted-foreground z-10">Active Workflows</div>
                    <div className="text-4xl font-bold text-white z-10">1,284</div>
                    <div className="w-full bg-white/5 rounded-full h-1 mt-4 z-10">
                        <div className="bg-primary h-1 rounded-full w-[70%]" />
                    </div>
                </div>

                {/* Simple count widget 2 */}
                <div className="glass-panel border-white/10 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-sm font-medium text-muted-foreground z-10">Total Events Processed</div>
                    <div className="text-4xl font-bold text-white z-10">4.8M</div>
                    <div className="flex gap-1 mt-4 z-10">
                        {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className="h-4 w-1 flex-1 bg-white/10 rounded-sm hover:bg-accent transition-colors" />)}
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 h-[400px]">
                <div className="col-span-4 h-full">
                    <LeadVelocityWidget />
                </div>
                <div className="col-span-3 h-full">
                    <AutomationFeedWidget />
                </div>
            </div>
        </div>
    );
}
