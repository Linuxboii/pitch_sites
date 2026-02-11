"use client";

import { useCallback, useEffect } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CustomNode } from "./CustomNode";

const nodeTypes = {
    custom: CustomNode,
};

interface WorkflowCanvasProps {
    initialNodes?: Node[];
    initialEdges?: Edge[];
}

export function WorkflowCanvas({ initialNodes = [], initialEdges = [] }: WorkflowCanvasProps) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Update state when props change (e.g., when data loads)
    useEffect(() => {
        setNodes(initialNodes);
        setEdges(initialEdges);
    }, [initialNodes, initialEdges, setNodes, setEdges]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <div className="h-full w-full" style={{ backgroundColor: "#0B0F14" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                fitView
                style={{ backgroundColor: "#0F172A" }}
            >
                <Background color="rgba(255, 255, 255, 0.03)" gap={16} size={1} />
                <Controls
                    style={{
                        backgroundColor: "#111827",
                        borderColor: "rgba(255, 255, 255, 0.06)",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                />
                <MiniMap
                    nodeColor="#3B82F6"
                    maskColor="rgba(11, 15, 20, 0.85)"
                    style={{
                        backgroundColor: "#111827",
                        borderColor: "rgba(255, 255, 255, 0.06)",
                        borderRadius: "10px",
                    }}
                />
            </ReactFlow>
        </div>
    );
}
