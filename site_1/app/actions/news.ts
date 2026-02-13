"use server";

const API_KEY = process.env.NEWS_API_KEY;

export async function getSentimentData() {
    if (!API_KEY) {
        console.warn("NewsAPI Key missing");
        return { score: 75, status: "Positive", trend: "stable" }; // Fallback
    }

    try {
        // Fetch business headlines
        const url = `https://newsapi.org/v2/top-headlines?category=business&language=en&pageSize=10&apiKey=${API_KEY}`;
        const response = await fetch(url, { next: { revalidate: 300 } }); // Cache for 5 mins
        const data = await response.json();

        if (data.status !== "ok") throw new Error(data.message);

        // Naive sentiment analysis based on keywords (since NewsAPI doesn't provide sentiment)
        const articles = data.articles || [];
        let positive = 0;
        let negative = 0;

        const negKeywords = ["crisis", "crash", "plunge", "down", "loss", "risk", "warning"];
        const posKeywords = ["growth", "surge", "up", "profit", "gain", "record", "success"];

        articles.forEach((a: any) => {
            const text = (a.title + " " + (a.description || "")).toLowerCase();
            if (negKeywords.some(k => text.includes(k))) negative++;
            if (posKeywords.some(k => text.includes(k))) positive++;
        });

        const total = positive + negative || 1;
        const score = Math.round(50 + ((positive - negative) / total) * 30); // Base 50, +/- 30 variance

        return {
            score: Math.max(0, Math.min(100, score)),
            status: score > 60 ? "Bullish" : score < 40 ? "Bearish" : "Neutral",
            trend: positive > negative ? "up" : negative > positive ? "down" : "stable"
        };

    } catch (error) {
        console.error("NewsAPI Error:", error);
        return { score: 65, status: "Neutral", trend: "stable" }; // Error fallback with mock data
    }
}
