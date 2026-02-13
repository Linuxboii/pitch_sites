import "server-only";

type RequestOptions = {
    method?: string;
    body?: any;
};

export async function n8nFetch<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const BASE_URL = process.env.N8N_BASE_URL;
    const API_KEY = process.env.N8N_API_KEY;

    if (!BASE_URL || !API_KEY) {
        console.error("N8n configuration missing. BASE_URL:", !!BASE_URL, "API_KEY:", !!API_KEY);
        throw new Error("N8n configuration missing");
    }

    const url = `${BASE_URL}${endpoint}`;
    const headers = {
        "X-N8N-API-KEY": API_KEY,
        "Content-Type": "application/json",
    };

    const config: RequestInit = {
        method: options.method || "GET",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        next: { revalidate: 30 },
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`n8n API Error [${response.status}]: ${errorText}`);
            throw new Error(`n8n API Error: ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("n8n Fetch Error:", error);
        throw error;
    }
}
