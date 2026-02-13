"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Play, History, Save, Loader2 } from "lucide-react";
import { NodeCanvas } from "@/components/dashboard/automation/node-canvas";
import { NodeConfigPanel } from "@/components/dashboard/automation/node-config-panel";
import { WorkflowSelector } from "@/components/dashboard/automation/workflow-selector";
import { NodeType } from "@/types";
import { getWorkflows, type Workflow } from "@/app/actions/n8n";
import { mapN8nNodeToVisual } from "@/lib/n8n-mapper";

export default function AutomationCenterPage() {
    const [selectedNode, setSelectedNode] = useState<NodeType | null>(null);
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>("");
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadWorkflows = async () => {
            try {
                const data = await getWorkflows();
                setWorkflows(data);
                if (data.length > 0) {
                    setSelectedWorkflowId(data[0].id);
                }
            } catch (error) {
                console.error("Failed to load workflows", error);
            } finally {
                setLoading(false);
            }
        };
        loadWorkflows();
    }, []);

    useEffect(() => {
        if (!selectedWorkflowId) return;

        const workflow = workflows.find(w => w.id === selectedWorkflowId);
        if (workflow && workflow.nodes) {
            const mappedNodes = workflow.nodes.map(mapN8nNodeToVisual);
            setNodes(mappedNodes);
        }
    }, [selectedWorkflowId, workflows]);

    // Find full workflow object to pass connections
    const activeWorkflow = workflows.find(w => w.id === selectedWorkflowId);

    return (
        <div className="h-[calc(100vh-100px)] flex flex-col space-y-4 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Automation Center</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-muted-foreground text-sm">Workflow:</span>
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                            ) : (
                                <WorkflowSelector
                                    workflows={workflows}
                                    selectedId={selectedWorkflowId}
                                    onSelect={setSelectedWorkflowId}
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="hidden border-dashed border-white/20 hover:border-white/40">
                        <History className="mr-2 h-4 w-4" /> History
                    </Button>
                    <Button variant="outline" size="sm" className="border-accent/50 text-accent hover:bg-accent/10">
                        <Save className="mr-2 h-4 w-4" /> Save Workflow
                    </Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <Play className="mr-2 h-4 w-4 fill-current" /> Activate Live
                    </Button>
                </div>
            </div>

            <div className="flex-1 relative rounded-xl overflow-hidden border border-white/10 bg-[#0B0F19]">
                {/* Toolbar */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    <Button size="icon" variant="secondary" className="rounded-lg shadow-lg" title="Add Node">
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                <div className="w-full h-full relative">
                    <NodeCanvas
                        onNodeClick={setSelectedNode}
                        nodes={nodes}
                        connections={activeWorkflow?.connections}
                    />

                    {/* Config Panel Overlay */}
                    {selectedNode && (
                        <NodeConfigPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
                    )}
                </div>
            </div>
        </div>
    );
}
