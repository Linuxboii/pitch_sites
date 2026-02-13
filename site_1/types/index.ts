import { LucideIcon } from "lucide-react";

export type NodeType = {
    id: string;
    type: string;
    label: string;
    icon: LucideIcon;
    x: number;
    y: number;
    status: "success" | "running" | "idle" | "error";
    color: string;
};
