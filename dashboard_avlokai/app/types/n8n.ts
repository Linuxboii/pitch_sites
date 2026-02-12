export interface N8nWorkflow {
    id: string;
    name: string;
    active: boolean;
    nodes: N8nNode[];
    connections: N8nConnections;
    updatedAt: string;
    createdAt?: string;
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

export interface WorkflowUI {
    id: string;
    name: string;
    description: string;
    trigger: string;
    status: 'active' | 'paused';
    lastRun: string;
    lastRunTimestamp: string | null;
    successRate: number;
    runs: number;
    nodeCount: number;
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

export interface ExecutionLogEntry {
    id: string;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
    message: string;
    workflow: string;
    workflowId: string;
    executionId: string;
    duration?: string;
}

export interface ExecutionStats {
    totalExecutions: number;
    todayRuns: number;
    successCount: number;
    failedCount: number;
    runningCount: number;
    successRate: number;
    perWorkflow: Map<string, {
        runs: number;
        successCount: number;
        failedCount: number;
        successRate: number;
        lastRunAt: string | null;
    }>;
}

export interface DashboardData {
    totalWorkflows: number;
    activeWorkflows: number;
    n8nConnected: boolean;
    todayRuns: number;
    successRate: number;
    totalExecutions: number;
    recentExecutions: ExecutionUI[];
    hourlyVolume: { time: string; runs: number }[];
}
