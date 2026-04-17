import 'dotenv/config';
import { analyzeSentiment } from "../services/sentimentService.js";
export const testSentimentAnalyzer = async () => {
    // 🔹 Add your test comments here
    const testData = ["Ilove this", "Ihate this", "I don't know"];
    console.log("Running Sentiment Analyzer Tests...\n");
    if (testData.length === 0) {
        console.warn("No test data provided. Add some text to testData array.\n");
        return;
    }
    let index = 1;
    for (const text of testData) {
        console.log(`--- Test ${index} ---`);
        console.log("Input:", text);
        try {
            const result = await analyzeSentiment(text);
            console.log("Sentiment :", result.sentiment);
            console.log("Confidence:", result.confidence);
            console.log("Label     :", result.label);
        }
        catch (err) {
            console.error(" Error:", err);
        }
        console.log("\n");
        index++;
    }
};
testSentimentAnalyzer();
//# sourceMappingURL=testSentiment.js.map