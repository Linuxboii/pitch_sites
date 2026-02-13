"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-700 max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>

            <Card className="glass-panel border-white/10">
                <CardHeader>
                    <CardTitle>General Configuration</CardTitle>
                    <CardDescription>Manage your workspace settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="font-medium">Dark Mode</div>
                            <div className="text-xs text-muted-foreground">Always active for enterprise builds.</div>
                        </div>
                        <Switch checked disabled />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div className="font-medium">Real-time Data Streaming</div>
                            <div className="text-xs text-muted-foreground">Enable WebSocket connections for live updates.</div>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card className="glass-panel border-white/10">
                <CardHeader>
                    <CardTitle>API Integrations</CardTitle>
                    <CardDescription>Manage connections to external services.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-white/10 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center font-bold">n8n</div>
                            <div>
                                <div className="font-medium">n8n Instance</div>
                                <div className="text-xs text-muted-foreground">Connected • v1.4.0</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
