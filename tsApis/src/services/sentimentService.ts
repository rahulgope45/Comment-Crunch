import fetch from 'node-fetch';

const MODELS = [
    "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
]

const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

let workingModel: string | null = null;

export interface SentimentResults {
    sentiment: "positive" | "negative" | "neutral";
    confidence: number;
    label: string;
};

const getApiUrl = (model: string): string => {
    return model;
};

//============= test model connection ===================
const testModel = async (model: string): Promise<boolean> => {
    try {
        const res = await fetch(getApiUrl(model), {
            method: "POST",
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: "test" }),
        });

        if (res.status === 200 || res.status === 503) {
            console.log(`Model working: ${model}`)
            return true;
        };

        console.warn(`Model failed: ${res.status}`);
        return false;
    } catch (error) {
        console.warn(`Model test failed`);
        return false;
    }
}

//============ Find Working model =========================

const findWorkingModel = async (): Promise<string | null> => {
    if (workingModel) return workingModel;

    console.log("Searching for model")

    for (const model of MODELS) {
        const ok = await testModel(model);
        if (ok) {
            workingModel = model;
            console.log(`using model: ${model}`);
            return model;
        }
    }
    console.error("No model found");
    return null;
};

//================ Analyze Sentiment=======================

export const analyzeSentiment = async (text: string, maxRetries: number = 2): Promise<SentimentResults> => {
    if (!text || text.trim().length === 0) {
        return {
            sentiment: "neutral",
            confidence: 0.0,
            label: "neutral"
        }
    }

    if (!API_TOKEN) {
        console.error("Missing HF API")
        return {
            sentiment: "neutral",
            confidence: 0.0,
            label: "error"
        }
    }

    const model = await findWorkingModel();

    if (!model) {
        console.error("Error in loading Model")
        return {
            sentiment: "neutral",
            confidence: 0.0,
            label: "neutral"
        }
    }

    const apiUrl = getApiUrl(model);
    for (let attempt = 0; attempt < maxRetries; maxRetries++) {
        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: text.slice(0, 512) }),
            });

            // 🔹 Model loading
            if (res.status === 503) {
                if (attempt < maxRetries - 1) {
                    const wait = 1000 * (attempt + 1) * 5;
                    console.warn(`⏳ Model loading... waiting ${wait}ms`);
                    await new Promise((r) => setTimeout(r, wait));
                    continue;
                }

                return { sentiment: "neutral", confidence: 0, label: "loading" };
            }

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            const result = await res.json();

            // 🔹 Parse response
            if (Array.isArray(result) && result.length > 0) {
                const top =
                    Array.isArray(result[0]) ? result[0][0] : result[0];

                const label = top.label.toLowerCase();
                const score = top.score;

                let sentiment: "positive" | "negative" | "neutral" = "neutral";

                if (label.includes("positive") || label === "pos") {
                    sentiment = "positive";
                } else if (label.includes("negative") || label === "neg") {
                    sentiment = "negative";
                }

                return {
                    sentiment,
                    confidence: Number(score.toFixed(4)),
                    label: top.label,
                };
            }

            console.error("Unexpected response:", result);
            return { sentiment: "neutral", confidence: 0, label: "error" };
        } catch (err) {
            console.error(`Attempt ${attempt + 1} failed:`, err);

            if (attempt < maxRetries - 1) {
                await new Promise((r) => setTimeout(r, 2000));
            } else {
                return { sentiment: "neutral", confidence: 0, label: "error" };
            }
        }
    }

    return { sentiment: "neutral", confidence: 0, label: "error" };




}