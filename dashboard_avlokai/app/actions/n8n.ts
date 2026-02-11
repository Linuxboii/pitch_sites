'use server';

export interface N8nWorkflow {
    id: string;
    name: string;
    active: boolean;
    nodes: N8nNode[];
    connections: N8nConnections;
    updatedAt: string;
    tags?: { name: string }[];
}

export interface N8nNode {
    id: string;
    name: string;
    type: string;
    typeVersion: number;
    position: [number, number];
    parameters?: Record<string, any>;
}

export interface N8nConnections {
    [nodeName: string]: {
        main: Array<Array<{
            node: string;
            type: string;
            index: number;
        }>>;
    };
}

interface N8nExecution {
    id: string;
    finished: boolean;
    mode: string;
    startedAt: string;
    stoppedAt: string;
    status: string; // 'success' | 'error' | 'running'
    workflowId: string;
    workflowName?: string; // Not always populated by API, might need lookup
}

export interface WorkflowUI {
    id: string;
    name: string;
    description: string;
    trigger: string;
    status: 'active' | 'paused';
    lastRun: string;
    successRate: number;
    runs: number;
}

export interface ExecutionUI {
    id: string;
    workflowName: string;
    trigger: string;
    status: 'success' | 'failed' | 'running';
    duration: string;
    timestamp: string;
    workflowId: string;
}

const BASE_URL = process.env.N8N_BASE_URL;
const API_KEY = process.env.N8N_API_KEY;

function getHeaders() {
    return {
        'X-N8N-API-KEY': API_KEY || '',
        'Content-Type': 'application/json',
    };
}

export async function getN8nStatus(): Promise<{ connected: boolean; version?: string }> {
    if (!BASE_URL || !API_KEY) return { connected: false };
    try {
        // Try fetching workflows as a health check
        const res = await fetch(`${BASE_URL}/workflows?limit=1`, {
            headers: getHeaders(),
            next: { revalidate: 60 }
        });
        return { connected: res.ok };
    } catch (e) {
        return { connected: false };
    }
}

export async function getWorkflowDetails(id: string): Promise<N8nWorkflow | null> {
    if (!BASE_URL || !API_KEY) return null;

    try {
        const response = await fetch(`${BASE_URL}/workflows/${id}`, {
            method: 'GET',
            headers: getHeaders(),
            next: { revalidate: 30 }, // Cache for 30 seconds
        });

        if (!response.ok) {
            console.error(`Failed to fetch workflow ${id}:`, response.statusText);
            return null;
        }

        const data = await response.json();
        return data; // returns the full workflow object including nodes and connections
    } catch (error) {
        console.error(`Error fetching workflow ${id}:`, error);
        return null;
    }
}

export async function getExecutions(limit = 20, workflowId?: string): Promise<ExecutionUI[]> {
    if (!BASE_URL || !API_KEY) return [];

    try {
        // 1. Fetch Executions
        let url = `${BASE_URL}/executions?limit=${limit}&includeData=false`;
        if (workflowId) {
            url += `&workflowId=${workflowId}`;
        }

        const execRes = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
            next: { revalidate: 10 },
        });

        if (!execRes.ok) return [];

        const execData = await execRes.json();
        const executions: N8nExecution[] = execData.data;

        // 2. Fetch Workflows to map names (only if not filtering by one, or optimization)
        // If we have workflowId, we might technically know the name, but let's keep it simple
        const workflows = await getWorkflows();
        const workflowMap = new Map(workflows.map(w => [w.id, w]));

        return executions.map(exec => {
            const workflow = workflowMap.get(exec.workflowId);
            const startTime = new Date(exec.startedAt);
            const endTime = exec.stoppedAt ? new Date(exec.stoppedAt) : new Date();
            const durationMs = endTime.getTime() - startTime.getTime();

            let duration = '';
            if (durationMs < 1000) duration = `${durationMs}ms`;
            else if (durationMs < 60000) duration = `${(durationMs / 1000).toFixed(1)}s`;
            else duration = `${Math.floor(durationMs / 60000)}m ${(durationMs % 60000 / 1000).toFixed(0)}s`;

            return {
                id: exec.id,
                workflowId: exec.workflowId,
                workflowName: workflow?.name || 'Unknown Workflow',
                trigger: workflow?.trigger || 'Unknown',
                status: (exec.status === 'running' || exec.status === 'new' || exec.status === 'waiting') ? 'running' : (exec.status === 'error' || exec.status === 'crashed' ? 'failed' : 'success'),
                duration: exec.stoppedAt ? duration : '-',
                timestamp: startTime.toLocaleString(),
            };
        });
    } catch (error) {
        console.error('Error fetching executions:', error);
        return [];
    }
}

export async function getWorkflows(): Promise<WorkflowUI[]> {
    if (!BASE_URL || !API_KEY) return [];

    try {
        const response = await fetch(`${BASE_URL}/workflows?limit=250`, {
            method: 'GET',
            headers: getHeaders(),
            next: { revalidate: 60 },
        });

        if (!response.ok) return [];

        const data = await response.json();
        const n8nWorkflows: N8nWorkflow[] = data.data;

        return n8nWorkflows.map((workflow) => {
            let trigger = 'Event';
            const triggerNode = workflow.nodes.find(node =>
                node.type.includes('webhook') ||
                node.type.includes('cron') ||
                node.type.includes('trigger')
            );

            if (triggerNode) {
                if (triggerNode.type.includes('webhook')) trigger = 'Webhook';
                else if (triggerNode.type.includes('cron') || triggerNode.type.includes('schedule')) trigger = 'Cron';
            }

            // Mock stats as we can't efficiently aggregate all executions yet
            const runs = 0;
            const successRate = 0;

            return {
                id: workflow.id,
                name: workflow.name,
                description: workflow.tags?.map(t => t.name).join(', ') || 'No description',
                trigger,
                status: workflow.active ? 'active' : 'paused',
                lastRun: new Date(workflow.updatedAt).toLocaleDateString(),
                successRate,
                runs,
            };
        });
    } catch (error) {
        console.error('Error fetching workflows:', error);
        return [];
    }
}
