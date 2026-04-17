import fetch from 'node-fetch';
const MODELS = [
    "https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
];
const API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;
let workingModel = null;
;
const getApiUrl = (model) => {
    return model;
};
//test model connection
const testModel = async (model) => {
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
            console.log(`Model working: ${model}`);
            return true;
        }
        ;
        console.warn(`Model failed: ${res.status}`);
        return false;
    }
    catch (error) {
        console.warn(`Model test failed`);
        return false;
    }
};
//# sourceMappingURL=sentimentService.js.map