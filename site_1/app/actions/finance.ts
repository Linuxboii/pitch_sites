"use server";

const API_KEY = process.env.ALPHA_VANTAGE_KEY;

export async function getMarketIndex() {
    if (!API_KEY) {
        console.warn("Alpha Vantage API Key missing");
        return null;
    }

    try {
        // Fetch SPY (S&P 500 ETF) as a proxy for the market index
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=${API_KEY}`;
        const response = await fetch(url, { next: { revalidate: 60 } }); // Cache for 1 min
        const data = await response.json();

        const quote = data["Global Quote"];
        if (!quote) return null;

        return {
            symbol: "S&P 500",
            price: parseFloat(quote["05. price"]),
            change: parseFloat(quote["09. change"]),
            changePercent: quote["10. change percent"].replace("%", ""),
        };
    } catch (error) {
        console.error("Alpha Vantage API Error:", error);
        return null;
    }
}
