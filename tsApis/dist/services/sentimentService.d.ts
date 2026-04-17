export interface SentimentResults {
    sentiment: "positive" | "negative" | "neutral";
    confidence: number;
    label: string;
}
export declare const analyzeSentiment: (text: string, maxRetries?: number) => Promise<SentimentResults>;
//# sourceMappingURL=sentimentService.d.ts.map