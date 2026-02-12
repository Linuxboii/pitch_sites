import { Node, Edge } from '@xyflow/react';
import { N8nWorkflow, N8nNode } from "@/app/types/n8n";

export function transformToReactFlow(workflow: N8nWorkflow | null): { nodes: Node[]; edges: Edge[] } {
    if (!workflow) return { nodes: [], edges: [] };

    const nodes: Node[] = workflow.nodes.map((node: N8nNode) => ({
        id: node.name, // n8n uses names as IDs in connections
        type: 'custom',
        position: { x: node.position[0], y: node.position[1] },
        data: {
            label: node.name,
            subLabel: node.type.split('.').pop() || node.type, // Simplify type name
            icon: getNodeIcon(node.type),
            status: 'success', // Default for visualization
        },
    }));

    const edges: Edge[] = [];

    // Parse connections
    // n8n connection format: { "NodeName": { "main": [[{ "node": "TargetNode", "type": "main", "index": 0 }]] } }
    Object.entries(workflow.connections).forEach(([sourceNode, connectionData]) => {
        if (connectionData.main) {
            connectionData.main.forEach((outputConnections, outputIndex) => {
                outputConnections.forEach((conn) => {
                    edges.push({
                        id: `${sourceNode}-${conn.node}-${outputIndex}`,
                        source: sourceNode,
                        target: conn.node,
                        animated: true,
                        type: 'default',
                    });
                });
            });
        }
    });

    return { nodes, edges };
}

function getNodeIcon(type: string): string {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('webhook')) return 'webhook';
    if (lowerType.includes('cron') || lowerType.includes('schedule')) return 'clock';
    if (lowerType.includes('postgres') || lowerType.includes('sql')) return 'database';
    if (lowerType.includes('slack')) return 'slack';
    if (lowerType.includes('mail')) return 'email';
    if (lowerType.includes('if') || lowerType.includes('switch')) return 'split';
    if (lowerType.includes('code') || lowerType.includes('function')) return 'code';
    if (lowerType.includes('ai') || lowerType.includes('gpt') || lowerType.includes('llm')) return 'ai';
    if (lowerType.includes('wait') || lowerType.includes('sleep')) return 'wait';

    return 'default';
}
