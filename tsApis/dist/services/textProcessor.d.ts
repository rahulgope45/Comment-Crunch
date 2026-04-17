export interface ValidResults {
    is_valid: boolean;
    reason: string | null;
    cleaned_text: string;
}
export declare const cleanText: (text: string) => string;
export declare const validateComment: (text: string) => ValidResults;
export declare const procesForSentiment: (text: string) => string;
//# sourceMappingURL=textProcessor.d.ts.map