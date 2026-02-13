"use server";

import { n8nFetch } from "@/lib/n8n";

export type Workflow = {
    id: string;
    name: string;
    active: boolean;
    nodes: any[];
    connections: any; // n8n connection structure
    createdAt: string;
    updatedAt: string;
};

export type Execution = {
    id: string;
    finished: boolean;
    mode: string;
    retryOf: string | null;
    retrySuccessId: string | null;
    startedAt: string;
    stoppedAt: string;
    workflowId: string;
    waitTill: string | null;
};

export async function getWorkflows(): Promise<Workflow[]> {
    try {
        const response = await n8nFetch<{ data: Workflow[] }>("/workflows");
        return response.data || [];
    } catch (error) {
        console.error("Failed to fetch workflows:", error);
        return [];
    }
}

export async function getExecutions(limit = 10): Promise<Execution[]> {
    try {
        const response = await n8nFetch<{ data: Execution[] }>(`/executions?limit=${limit}`);
        return response.data || [];
    } catch (error) {
        console.error("Failed to fetch executions:", error);
        return [];
    }
}

export async function getWorkflow(id: string): Promise<Workflow | null> {
    try {
        return await n8nFetch<Workflow>(`/workflows/${id}`);
    } catch (error) {
        console.error(`Failed to fetch workflow ${id}:`, error);
        return null;
    }
}
