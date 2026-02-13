"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { getSentimentData } from "@/app/actions/news";

export function SentimentPulseWidget() {
    const [sentiment, setSentiment] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSentiment = async () => {
            try {
                const data = await getSentimentData();
                setSentiment(data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        loadSentiment();
    }, []);

    const score = sentiment?.score || 0;
    // Calculate stroke dasharray for the circle
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    const getColor = (s: number) => {
        if (s > 60) return "text-green-500";
        if (s < 40) return "text-red-500";
        return "text-yellow-500";
    };

    return (
        <Card className="glass-panel border-white/10 h-full">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-secondary" /> Market Sentiment (AI)
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pt-2">
                {loading ? (
                    <div className="h-[120px] flex items-center justify-center text-muted-foreground text-sm">Analyzing news...</div>
                ) : (
                    <>
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            {/* Background Circle */}
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r={radius}
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    className="text-white/5"
                                />
                                {/* Progress Circle */}
                                <motion.circle
                                    initial={{ strokeDashoffset: circumference }}
                                    animate={{ strokeDashoffset }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    cx="64"
                                    cy="64"
                                    r={radius}
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={circumference}
                                    className={getColor(score)}
                                    strokeLinecap="round"
                                />
                            </svg>

                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-3xl font-bold ${getColor(score)}`}>{score}</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Score</span>
                            </div>
                        </div>

                        <div className="mt-4 text-center">
                            <div className={`text-sm font-medium ${getColor(score)}`}>{sentiment.status} Outlook</div>
                            <p className="text-xs text-muted-foreground mt-1">Based on real-time news analysis</p>
                        </div>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
