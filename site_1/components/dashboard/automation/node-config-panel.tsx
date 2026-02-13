"use client";

import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import { NodeType } from "@/types";

export function NodeConfigPanel({ node, onClose }: { node: NodeType; onClose: () => void }) {
    if (!node) return null;

    return (
        <div className="w-80 border-l border-white/5 bg-[#0B0F19]/95 backdrop-blur-xl h-full absolute right-0 top-0 bottom-0 z-20 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="h-14 flex items-center justify-between px-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${node.color}`}>
                        <node.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium text-sm">{node.label}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="space-y-2">
                    <label className="text-xs text-muted-foreground uppercase font-semibold">Parameters</label>
                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Model</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-md py-1.5 px-3 text-sm focus:ring-1 focus:ring-primary outline-none">
                                <option>GPT-4o (Reasoning)</option>
                                <option>Claude 3.5 Sonnet</option>
                                <option>Gemini 1.5 Pro</option>
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Temperature</label>
                            <div className="flex items-center gap-2">
                                <input type="range" className="flex-1 accent-primary h-1 bg-white/10 rounded-full appearance-auto" />
                                <span className="text-xs tabular-nums">0.7</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">System Prompt</label>
                            <textarea className="w-full bg-white/5 border border-white/10 rounded-md py-2 px-3 text-sm h-24 focus:ring-1 focus:ring-primary outline-none resize-none" defaultValue="You are an expert sales analyst..." />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-muted-foreground uppercase font-semibold">Output Preview</label>
                    <div className="bg-black/30 rounded-md border border-white/5 p-3 font-mono text-xs text-green-400 overflow-x-auto">
                        {`{
  "score": 92,
  "confidence": "high",
  "reasoning": [
    "Recent funding",
    "Hiring growth"
  ]
}`}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-white/5">
                <Button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90">
                    <Play className="w-4 h-4 fill-current" /> Run Node
                </Button>
            </div>
        </div>
    );
}
