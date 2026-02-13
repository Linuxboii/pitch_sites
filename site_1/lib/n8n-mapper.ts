import { LucideIcon, Zap, Database, Bot, ArrowRight, MessageSquare, Mail, Globe, Code, Clock, MousePointer, Shield } from "lucide-react";
import { NodeType } from "@/types";

type NodeVisual = {
    icon: LucideIcon;
    color: string;
};

const DEFAULT_VISUAL: NodeVisual = { icon: Code, color: "bg-slate-500" };

const NODE_MAP: Record<string, NodeVisual> = {
    "n8n-nodes-base.webhook": { icon: Zap, color: "bg-yellow-500" },
    "n8n-nodes-base.httpRequest": { icon: Globe, color: "bg-blue-500" },
    "n8n-nodes-base.postgres": { icon: Database, color: "bg-blue-600" },
    "n8n-nodes-base.openAi": { icon: Bot, color: "bg-green-600" },
    "n8n-nodes-base.if": { icon: ArrowRight, color: "bg-orange-500" },
    "n8n-nodes-base.slack": { icon: MessageSquare, color: "bg-purple-500" },
    "n8n-nodes-base.gmail": { icon: Mail, color: "bg-red-500" },
    "n8n-nodes-base.emailReadImap": { icon: Mail, color: "bg-blue-400" },
    "n8n-nodes-base.cron": { icon: Clock, color: "bg-emerald-500" },
    "n8n-nodes-base.scheduleTrigger": { icon: Clock, color: "bg-emerald-500" },
};

export function mapN8nNodeToVisual(n8nNode: any): NodeType {
    const visual = NODE_MAP[n8nNode.type] || DEFAULT_VISUAL;

    // N8n positions are [x, y]
    const x = n8nNode.position ? n8nNode.position[0] : 0;
    const y = n8nNode.position ? n8nNode.position[1] : 0;

    return {
        id: n8nNode.id || n8nNode.name, // Fallback to name if id missing
        type: n8nNode.type,
        label: n8nNode.name,
        icon: visual.icon,
        x: x,
        y: y,
        status: "idle", // Default status
        color: visual.color,
    };
}
