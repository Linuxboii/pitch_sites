"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Sparkles, User, Mail, Globe } from "lucide-react";

export default function LeadIntelligencePage() {
    const [loading, setLoading] = useState(false);
    const [enriched, setEnriched] = useState(false);

    const handleEnrich = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setEnriched(true);
        }, 2000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <h2 className="text-3xl font-bold tracking-tight">Lead Intelligence</h2>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Input Section */}
                <Card className="glass-panel border-white/10">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">Manual Lead Entry</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md py-2 pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none" placeholder="e.g. Sarah Connor" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-md py-2 pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none" placeholder="e.g. sarah@skynet.com" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs text-muted-foreground">Company Domain</label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-md py-2 pl-9 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none" placeholder="e.g. skynet.com" />
                            </div>
                        </div>

                        <Button onClick={handleEnrich} disabled={loading} className="w-full bg-primary hover:bg-primary/90 mt-4">
                            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            {loading ? "AI Processing..." : "Enrich Lead Profile"}
                        </Button>
                    </CardContent>
                </Card>

                {/* Result Section */}
                <Card className="glass-panel border-white/10 relative overflow-hidden">
                    {!enriched && !loading && (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm bg-background/50 backdrop-blur-sm z-10">
                            Submit lead details to view AI enrichment
                        </div>
                    )}

                    {loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-20 space-y-4">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse" />
                                <div className="absolute inset-0 rounded-full border-t-4 border-primary animate-spin" />
                            </div>
                            <p className="text-sm text-primary animate-pulse">Querying 14 databases...</p>
                        </div>
                    )}

                    <CardHeader>
                        <CardTitle className="text-sm font-medium text-muted-foreground">AI Enrichment Report</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold">Sarah Connor</h3>
                                <p className="text-sm text-muted-foreground">CTO @ Cyberdyne Systems</p>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-green-400">92/100</div>
                                <div className="text-xs text-muted-foreground">Lead Score</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Budget Authority</span>
                                <span className="text-white font-medium">High</span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5">
                                <div className="bg-green-500 h-1.5 rounded-full w-[90%]" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Intent Signal</span>
                                <span className="text-white font-medium">Very High</span>
                            </div>
                            <div className="w-full bg-white/5 rounded-full h-1.5">
                                <div className="bg-green-500 h-1.5 rounded-full w-[85%]" />
                            </div>
                        </div>

                        <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-sm space-y-2">
                            <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>Recently raised Series B ($50M)</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>Hiring for 12 engineering roles</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">Sync to CRM</Button>
                            <Button variant="default" size="sm" className="flex-1">Generate Email</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
