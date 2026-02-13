"use server";

export type NewsItem = {
    title: string;
    url: string;
    source: string;
    time: string;
    sentiment?: string;
};

export async function getGlobalRisks(): Promise<NewsItem[]> {
    try {
        // GDELT 2.0 Doc API
        // Query: (cyberattack OR "system outage" OR "data breach") formatted as JSON
        const query = '(cyberattack OR "system outage" OR "data breach")';
        const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query)}&mode=artlist&maxrecords=10&format=json&sort=DateDesc`;

        const response = await fetch(url, { next: { revalidate: 300 } }); // Cache for 5 mins
        if (!response.ok) throw new Error("GDELT API failed");

        const data = await response.json();

        if (!data.articles) return [];

        return data.articles.map((article: any) => ({
            title: article.title,
            url: article.url,
            source: article.domain,
            time: article.seendate, // GDELT format: YYYYMMDDHHMMSS
            sentiment: "Critical" // Mocked sentiment for now, GDELT logic is complex
        }));
    } catch (error) {
        console.error("Failed to fetch GDELT data:", error);
        return [];
    }
}

export async function getTechSignals(): Promise<NewsItem[]> {
    try {
        // Hacker News API - Top Stories
        const topStoriesRes = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", { next: { revalidate: 300 } });
        const storyIds = await topStoriesRes.json();
        const top5 = storyIds.slice(0, 5);

        const stories = await Promise.all(top5.map(async (id: number) => {
            const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return storyRes.json();
        }));

        return stories.map((story: any) => ({
            title: story.title,
            url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
            source: "Hacker News",
            time: new Date(story.time * 1000).toISOString(),
            sentiment: "Trending"
        }));
    } catch (error) {
        console.error("Failed to fetch Hacker News:", error);
        return [];
    }
}
