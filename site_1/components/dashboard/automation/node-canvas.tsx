"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { cn } from "@/lib/utils";
import { NodeType } from "@/types";

// Helper to generate SVG path for connection
const generatePath = (start: { x: number; y: number }, end: { x: number; y: number }) => {
    const deltaX = end.x - start.x;
    // Curvature based on distance
    const controlPointOffset = Math.max(deltaX * 0.5, 50);

    return `M ${start.x} ${start.y} C ${start.x + controlPointOffset} ${start.y}, ${end.x - controlPointOffset} ${end.y}, ${end.x} ${end.y}`;
};

export function NodeCanvas({
    onNodeClick,
    nodes: externalNodes,
    connections = {}
}: {
    onNodeClick: (node: NodeType) => void;
    nodes?: NodeType[];
    connections?: any;
}) {
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (externalNodes) {
            setNodes(externalNodes);
        }
    }, [externalNodes]);

    // Handle node drag update to rerender lines
    const updateNodePosition = (id: string, x: number, y: number) => {
        setNodes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n));
    };

    // Calculate canvas bounds for centering
    const minX = nodes.length > 0 ? Math.min(...nodes.map(n => n.x)) : 0;
    const minY = nodes.length > 0 ? Math.min(...nodes.map(n => n.y)) : 0;

    // Prepare connections for rendering
    const edges: { start: { x: number; y: number }; end: { x: number; y: number }; key: string }[] = [];

    if (nodes.length > 0 && connections) {
        // Map n8n connection structure to edges
        // Structure: { "NodeName": { "main": [ [ { "node": "NextNode", "type": "main", "index": 0 } ] ] } }
        Object.keys(connections).forEach(sourceName => {
            const sourceNode = nodes.find(n => n.label === sourceName || n.id === sourceName); // n8n uses names for connections usually
            if (!sourceNode) return;

            const outputs = connections[sourceName]?.main || [];
            outputs.forEach((output: any[]) => {
                output.forEach((connection: any) => {
                    const targetNode = nodes.find(n => n.label === connection.node || n.id === connection.node);
                    if (targetNode) {
                        // Adjust coordinates to be relative to the node centers/connection points
                        // Assuming node width ~140, height ~60. 
                        // Output: Right side (x + 140, y + 30)
                        // Input: Left side (x, y + 30)
                        edges.push({
                            start: { x: sourceNode.x + 140, y: sourceNode.y + 30 },
                            end: { x: targetNode.x, y: targetNode.y + 30 },
                            key: `${sourceNode.id}-${targetNode.id}`
                        });
                    }
                });
            });
        });
    }

    return (
        <div ref={containerRef} className="relative w-full h-full bg-[#0F121B] rounded-xl border border-white/10 overflow-hidden shadow-inner group cursor-grab active:cursor-grabbing">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] pointer-events-none" />

            {/* Scrollable/Zoomable Container Wrapper */}
            <div className="absolute inset-0 transform transition-transform duration-500 ease-out"
                style={{ transform: `translate(${-minX + 100}px, ${-minY + 100}px)` }}>

                {/* Connecting Lines Layer */}
                <svg className="absolute top-0 left-0 w-[5000px] h-[5000px] pointer-events-none overflow-visible z-0">
                    {edges.map(edge => (
                        <path
                            key={edge.key}
                            d={generatePath(edge.start, edge.end)}
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeOpacity="0.4"
                            className="transition-all duration-300"
                        />
                    ))}
                </svg>

                {/* Nodes Layer */}
                {nodes.map((node) => {
                    const Icon = node.icon;
                    return (
                        <motion.div
                            key={node.id}
                            drag
                            dragMomentum={false}
                            onDrag={(e, info) => {
                                // Update internal position for line rendering
                                // We need to account for the initial offset if we rely on precise coordinates,
                                // but for visual lines, relative movement in `nodes` state is enough if we sync it.
                                // However, Framer Motion handles visual drag. To sync lines, we need actual state updates.
                                // For performance, we might debounced update or use visual tracking.
                                // For this demo, lines might lag slightly or we use onDragEnd to snap.
                                // To make it real-time smooth, we'd need to lift `x,y` to MotionValues or state.
                                // Using simplistic state update for now (might be heavy if too many nodes).
                                // Actually, let's update state onDrag:
                                // Note: info.point is absolute, info.delta is relative. 
                                // Frame motion modifies the transform, not the underlying x/y prop in DOM flow usually.
                                // To keep it simple for this demo without complex canvas logic:
                                // We will rely on Framer Motion for the Drag, and update React state onDragEnd to refresh lines.
                                // For real-time lines, we need to bind x/y to state.
                            }}
                            onDragEnd={(e, info) => {
                                // Approximate new position based on drag delta (simplified for demo)
                                // In a real app, we'd calculate canvas offset.
                                updateNodePosition(node.id, node.x + info.offset.x, node.y + info.offset.y);
                            }}
                            initial={{ opacity: 0, scale: 0.8, x: node.x, y: node.y }} // Use x/y as initial visual position
                            animate={{ opacity: 1, scale: 1, x: node.x, y: node.y }} // Ensure state updates move it
                            transition={{ duration: 0.2 }}
                            className="absolute cursor-pointer z-10"
                            // style={{ left: node.x, top: node.y }} // Removed absolute positioning via style, utilizing motion x/y
                            onClick={(e) => { e.stopPropagation(); onNodeClick(node); }}
                            whileHover={{ scale: 1.05, zIndex: 20 }}
                            whileTap={{ scale: 0.95, cursor: "grabbing" }}
                        >
                            <div className={cn(
                                "w-[140px] h-[60px] rounded-lg border border-white/10 bg-[#1A1F2E] flex items-center p-3 shadow-lg relative group/node gap-3 hover:border-primary/50 transition-colors select-none",
                                node.status === "running" && "ring-2 ring-primary ring-offset-2 ring-offset-[#0F121B] animate-pulse"
                            )}>
                                {/* Connection Points */}
                                <div className="absolute left-0 top-1/2 -translate-x-[5px] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-600 border border-[#1A1F2E]" />
                                <div className="absolute right-0 top-1/2 translate-x-[5px] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-600 border border-[#1A1F2E]" />

                                <div className={cn("p-2 rounded-md shadow-md shrink-0", node.color)}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium truncate text-slate-200">{node.label}</div>
                                    <div className="text-[10px] text-muted-foreground truncate opacity-70 capitalize">{node.type.split('.').pop()?.replace(/([A-Z])/g, ' $1').trim()}</div>
                                </div>

                                {/* Status Indicator */}
                                {node.status === "success" && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border border-black shadow-[0_0_5px_theme(colors.green.500)]" />
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Empty State */}
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm pointer-events-none">
                    <p>Select a workflow to view nodes</p>
                </div>
            )}

            {/* Floating Controls */}
            <div className="absolute bottom-4 left-4 flex gap-2">
                <div className="p-2 rounded-md bg-white/5 border border-white/10 text-xs text-muted-foreground backdrop-blur-sm">
                    {nodes.length} Nodes • {edges.length} Connections
                </div>
            </div>
        </div>
    );
}
