'use server';

import {
    N8nWorkflow,
    N8nNode,
    ExecutionUI,
    ExecutionLogEntry,
    ExecutionStats,
    DashboardData,
    WorkflowUI
} from "@/app/types/n8n";

interface N8nExecution {
    id: string;
    finished: boolean;
    mode: string;
    startedAt: string;
    stoppedAt: string;
    status: string;
    workflowId: string;
    workflowName?: string;
}

const BASE_URL = process.env.N8N_BASE_URL;
const API_KEY = process.env.N8N_API_KEY;

function getHeaders() {
    return {
        'X-N8N-API-KEY': API_KEY || '',
        'Content-Type': 'application/json',
    };
}

import { timeAgo, formatDuration, formatTimestamp, isToday, normalizeStatus } from "@/lib/formatters";

function detectTrigger(nodes: N8nNode[]): string {
    const triggerNode = nodes.find(node =>
        node.type.includes('webhook') ||
        node.type.includes('cron') ||
        node.type.includes('trigger') ||
        node.type.includes('schedule')
    );
    if (!triggerNode) return 'Manual';
    const t = triggerNode.type.toLowerCase();
    if (t.includes('webhook')) return 'Webhook';
    if (t.includes('cron') || t.includes('schedule')) return 'Schedule';
    if (t.includes('whatsapp')) return 'WhatsApp';
    if (t.includes('email') || t.includes('imap')) return 'Email';
    return 'Trigger';
}

// ── Raw API Calls ──────────────────────────────────────────────────

async function fetchAllExecutions(limit = 250): Promise<N8nExecution[]> {
    if (!BASE_URL || !API_KEY) return [];
    try {
        const res = await fetch(`${BASE_URL}/executions?limit=${limit}&includeData=false`, {
            method: 'GET',
            headers: getHeaders(),
            next: { revalidate: 10 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
    } catch {
        return [];
    }
}

async function fetchAllWorkflows(): Promise<N8nWorkflow[]> {
    if (!BASE_URL || !API_KEY) return [];
    try {
        const res = await fetch(`${BASE_URL}/workflows?limit=250`, {
            method: 'GET',
            headers: getHeaders(),
            next: { revalidate: 60 },
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
    } catch {
        return [];
    }
}

// ── Public API ─────────────────────────────────────────────────────

export async function getN8nStatus(): Promise<{ connected: boolean }> {
    if (!BASE_URL || !API_KEY) return { connected: false };
    try {
        const res = await fetch(`${BASE_URL}/workflows?limit=1`, {
            headers: getHeaders(),
            next: { revalidate: 60 },
        });
        return { connected: res.ok };
    } catch {
        return { connected: false };
    }
}

export async function getWorkflowDetails(id: string): Promise<N8nWorkflow | null> {
    if (!BASE_URL || !API_KEY) return null;
    try {
        const response = await fetch(`${BASE_URL}/workflows/${id}`, {
            method: 'GET',
            headers: getHeaders(),
            next: { revalidate: 30 },
        });
        if (!response.ok) return null;
        return await response.json();
    } catch {
        return null;
    }
}

export async function getExecutionStats(): Promise<ExecutionStats> {
    const executions = await fetchAllExecutions(250);

    const perWorkflow = new Map<string, {
        runs: number;
        successCount: number;
        failedCount: number;
        successRate: number;
        lastRunAt: string | null;
    }>();

    let successCount = 0;
    let failedCount = 0;
    let runningCount = 0;
    let todayRuns = 0;

    for (const exec of executions) {
        const status = normalizeStatus(exec.status);
        if (status === 'success') successCount++;
        else if (status === 'failed') failedCount++;
        else runningCount++;

        if (isToday(exec.startedAt)) todayRuns++;

        // Per-workflow stats
        const wfStats = perWorkflow.get(exec.workflowId) || {
            runs: 0, successCount: 0, failedCount: 0, successRate: 0, lastRunAt: null,
        };
        wfStats.runs++;
        if (status === 'success') wfStats.successCount++;
        if (status === 'failed') wfStats.failedCount++;
        if (!wfStats.lastRunAt || new Date(exec.startedAt) > new Date(wfStats.lastRunAt)) {
            wfStats.lastRunAt = exec.startedAt;
        }
        perWorkflow.set(exec.workflowId, wfStats);
    }

    // Calculate per-workflow success rates
    for (const [, stats] of perWorkflow) {
        stats.successRate = stats.runs > 0
            ? Math.round((stats.successCount / stats.runs) * 100)
            : 0;
    }

    const total = executions.length;
    return {
        totalExecutions: total,
        todayRuns,
        successCount,
        failedCount,
        runningCount,
        successRate: total > 0 ? Math.round((successCount / total) * 100) : 0,
        perWorkflow,
    };
}

export async function getWorkflows(): Promise<WorkflowUI[]> {
    const [workflows, stats] = await Promise.all([
        fetchAllWorkflows(),
        getExecutionStats(),
    ]);

    return workflows.map((workflow) => {
        const trigger = detectTrigger(workflow.nodes);
        const wfStats = stats.perWorkflow.get(workflow.id);

        return {
            id: workflow.id,
            name: workflow.name,
            description: workflow.tags?.map(t => t.name).join(', ') || summarizeWorkflow(workflow),
            trigger,
            status: workflow.active ? 'active' as const : 'paused' as const,
            lastRun: wfStats?.lastRunAt ? timeAgo(wfStats.lastRunAt) : 'Never run',
            lastRunTimestamp: wfStats?.lastRunAt || null,
            successRate: wfStats?.successRate ?? 0,
            runs: wfStats?.runs ?? 0,
            nodeCount: workflow.nodes.length,
        };
    });
}

function summarizeWorkflow(workflow: N8nWorkflow): string {
    const nodeTypes = workflow.nodes.map(n => {
        const simple = n.type.split('.').pop() || n.type;
        return simple.replace(/([A-Z])/g, ' $1').trim();
    });
    const unique = [...new Set(nodeTypes)].slice(0, 3);
    return `${workflow.nodes.length} nodes · ${unique.join(', ')}`;
}

export async function getExecutions(limit = 20, workflowId?: string): Promise<ExecutionUI[]> {
    if (!BASE_URL || !API_KEY) return [];

    try {
        let url = `${BASE_URL}/executions?limit=${limit}&includeData=false`;
        if (workflowId) url += `&workflowId=${workflowId}`;

        const execRes = await fetch(url, {
            method: 'GET',
            headers: getHeaders(),
            next: { revalidate: 10 },
        });
        if (!execRes.ok) return [];

        const execData = await execRes.json();
        const executions: N8nExecution[] = execData.data;

        const workflows = await fetchAllWorkflows();
        const workflowMap = new Map(workflows.map(w => [w.id, w]));

        return executions.map(exec => {
            const workflow = workflowMap.get(exec.workflowId);
            const trigger = workflow ? detectTrigger(workflow.nodes) : 'Unknown';

            return {
                id: exec.id,
                workflowId: exec.workflowId,
                workflowName: workflow?.name || `Workflow ${exec.workflowId.slice(0, 6)}…`,
                trigger,
                status: normalizeStatus(exec.status),
                duration: exec.stoppedAt ? formatDuration(exec.startedAt, exec.stoppedAt) : '–',
                timestamp: formatTimestamp(exec.startedAt),
            };
        });
    } catch (error) {
        console.error('Error fetching executions:', error);
        return [];
    }
}

export async function getExecutionLogs(limit = 50): Promise<ExecutionLogEntry[]> {
    if (!BASE_URL || !API_KEY) return [];

    try {
        const [executions, workflows] = await Promise.all([
            fetchAllExecutions(limit),
            fetchAllWorkflows(),
        ]);

        const workflowMap = new Map(workflows.map(w => [w.id, w]));

        return executions.map(exec => {
            const workflow = workflowMap.get(exec.workflowId);
            const status = normalizeStatus(exec.status);
            const wfName = workflow?.name || `Workflow ${exec.workflowId.slice(0, 6)}…`;
            const duration = exec.stoppedAt ? formatDuration(exec.startedAt, exec.stoppedAt) : null;

            let level: 'INFO' | 'WARN' | 'ERROR' | 'FATAL';
            let message: string;

            switch (status) {
                case 'success':
                    level = 'INFO';
                    message = `Workflow "${wfName}" completed successfully${duration ? ` in ${duration}` : ''}`;
                    break;
                case 'failed':
                    level = 'ERROR';
                    message = `Workflow "${wfName}" execution failed${duration ? ` after ${duration}` : ''}`;
                    break;
                case 'running':
                    level = 'INFO';
                    message = `Workflow "${wfName}" is currently running`;
                    break;
                default:
                    level = 'WARN';
                    message = `Workflow "${wfName}" ended with status: ${exec.status}`;
            }

            return {
                id: `log-${exec.id}`,
                timestamp: exec.startedAt,
                level,
                message,
                workflow: wfName,
                workflowId: exec.workflowId,
                executionId: exec.id,
                duration: duration || undefined,
            };
        });
    } catch (error) {
        console.error('Error fetching execution logs:', error);
        return [];
    }
}

export async function getDashboardData(): Promise<DashboardData> {
    const [workflows, status, stats, recentExecutions, allExecutions] = await Promise.all([
        fetchAllWorkflows(),
        getN8nStatus(),
        getExecutionStats(),
        getExecutions(5),
        fetchAllExecutions(250),
    ]);

    // Build hourly volume from executions (last 24 hours)
    const now = new Date();
    const hourlyMap = new Map<string, number>();

    // Initialize all 24 hours
    for (let i = 0; i < 24; i++) {
        const hr = i.toString().padStart(2, '0') + ':00';
        hourlyMap.set(hr, 0);
    }

    for (const exec of allExecutions) {
        const execDate = new Date(exec.startedAt);
        const hoursDiff = (now.getTime() - execDate.getTime()) / (1000 * 60 * 60);
        if (hoursDiff <= 24) {
            const hr = execDate.getHours().toString().padStart(2, '0') + ':00';
            hourlyMap.set(hr, (hourlyMap.get(hr) || 0) + 1);
        }
    }

    const hourlyVolume = Array.from(hourlyMap.entries())
        .map(([time, runs]) => ({ time, runs }))
        .sort((a, b) => a.time.localeCompare(b.time));

    return {
        totalWorkflows: workflows.length,
        activeWorkflows: workflows.filter(w => w.active).length,
        n8nConnected: status.connected,
        todayRuns: stats.todayRuns,
        successRate: stats.successRate,
        totalExecutions: stats.totalExecutions,
        recentExecutions,
        hourlyVolume,
    };
}
