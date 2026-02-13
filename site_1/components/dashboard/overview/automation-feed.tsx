"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, PlayCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { getExecutions, type Execution } from "@/app/actions/n8n";

export function AutomationFeedWidget() {
    const [executions, setExecutions] = useState<Execution[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExecutions = async () => {
            try {
                const data = await getExecutions(5);
                setExecutions(data);
            } catch (error) {
                console.error("Failed to load executions", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExecutions();
        const interval = setInterval(fetchExecutions, 5000); // Poll every 5s
        return () => clearInterval(interval);
    }, []);

    const getIcon = (execution: Execution) => {
        if (!execution.finished) return <PlayCircle className="w-4 h-4 text-blue-400 animate-pulse" />;
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
    };

    const getStatusText = (execution: Execution) => {
        if (!execution.finished) return "Running Workflow...";
        return `Workflow Execution ${execution.id.substring(0, 6)}`;
    };

    const getTimeAgo = (dateString: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / 1000);
        if (seconds < 60) return "Just now";
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    };

    return (
        <Card className="glass-panel border-white/10 h-full">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Automation Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {loading && executions.length === 0 ? (
                        <div className="flex justify-center p-4">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <AnimatePresence initial={false}>
                            {executions.map((execution) => (
                                <motion.div
                                    key={execution.id}
                                    initial={{ opacity: 0, height: 0, x: -20 }}
                                    animate={{ opacity: 1, height: 'auto', x: 0 }}
                                    exit={{ opacity: 0, height: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-start space-x-3 pb-3 border-b border-white/5 last:border-0"
                                >
                                    <div className={`mt-0.5 p-1 rounded-full bg-white/5`}>
                                        {getIcon(execution)}
                                    </div>
                                    <div className="flex-1 space-y-0.5">
                                        <p className="text-sm font-medium leading-none">{getStatusText(execution)}</p>
                                        <p className="text-xs text-muted-foreground">{getTimeAgo(execution.startedAt)}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                    {executions.length === 0 && !loading && (
                        <div className="text-center text-xs text-muted-foreground py-4">
                            No recent activity locally.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
