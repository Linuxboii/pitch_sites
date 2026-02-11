"use client";

import { use, useEffect, useState } from "react";
import { WorkflowCanvas } from "@/components/workflows/WorkflowCanvas";
import { WorkflowInspector } from "@/components/workflows/WorkflowInspector";
import { getWorkflowDetails, getExecutions, N8nWorkflow, ExecutionUI } from "@/app/actions/n8n";
import { transformToReactFlow } from "@/lib/workflow-transformer";
import { Node, Edge } from "@xyflow/react";
import { Loader2 } from "lucide-react";

export default function WorkflowDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [workflow, setWorkflow] = useState<N8nWorkflow | null>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [loading, setLoading] = useState(true);
    const [executions, setExecutions] = useState<ExecutionUI[]>([]);
    const [stats, setStats] = useState({
        totalRuns: 0,
        successRate: "-",
        avgDuration: "-",
        lastRun: "Never"
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const wfData = await getWorkflowDetails(id);
                setWorkflow(wfData);
                if (wfData) {
                    const { nodes: flowNodes, edges: flowEdges } = transformToReactFlow(wfData);
                    setNodes(flowNodes);
                    setEdges(flowEdges);
                }

                const execs = await getExecutions(50, id);
                setExecutions(execs);

                if (execs.length > 0) {
                    const successCount = execs.filter(e => e.status === 'success').length;
                    const successRate = ((successCount / execs.length) * 100).toFixed(1) + "%";
                    setStats({
                        totalRuns: execs.length,
                        successRate,
                        avgDuration: execs[0]?.duration || "-",
                        lastRun: execs[0]?.timestamp || "-"
                    });
                }

            } catch (error) {
                console.error("Failed to fetch workflow details", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div
                className="flex h-[calc(100vh-8rem)] items-center justify-center rounded-xl"
                style={{
                    backgroundColor: "#111827",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
                }}
            >
                <Loader2 className="h-8 w-8 animate-spin" style={{ color: "#475569" }} />
            </div>
        );
    }

    return (
        <div
            className="flex h-[calc(100vh-8rem)] overflow-hidden rounded-xl"
            style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
            }}
        >
            <div className="flex-1 relative" style={{ backgroundColor: "#0F172A" }}>
                <WorkflowCanvas initialNodes={nodes} initialEdges={edges} />
            </div>
            <div className="w-[350px] overflow-y-auto" style={{ backgroundColor: "#111827" }}>
                <WorkflowInspector
                    workflow={workflow}
                    stats={stats}
                    recentExecutions={executions}
                />
            </div>
        </div>
    );
}
