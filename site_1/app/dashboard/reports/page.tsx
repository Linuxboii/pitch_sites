"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReportsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Export All
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="glass-panel border-white/10 hover:bg-white/5 transition-colors cursor-pointer group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Generated Report</CardTitle>
                            <FileText className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold">Monthly Automation Summary</div>
                            <p className="text-xs text-muted-foreground mt-1">Generated: 2 days ago</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
