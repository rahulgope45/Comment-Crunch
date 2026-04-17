import { validateComment, cleanText } from "../services/textProcessor.js";
export const testTextProcessor = () => {
    const test_comments = [
        "Great video! Really helped me understand the concept.",
        "CHECK OUT MY CHANNEL!!!!! SUBSCRIBE NOW!!!!",
        "🔥🔥🔥🔥🔥",
        "This is terrible content",
        "a", // Too short
        "Visit http://spam.com for more info!!!",
        "spammmmmmmmmmmmmm",
        "Normal comment with a link http://example.com that should be removed",
        "",
        "I loved it"
    ];
    console.log("🧪 Running TextProcessor Tests...\n");
    test_comments.forEach((comment, index) => {
        const result = validateComment(comment);
        console.log(`--- Test ${index + 1} ---`);
        console.log("Original:", comment);
        console.log("Cleaned :", cleanText(comment));
        console.log("Valid   :", result.is_valid);
        console.log("Reason  :", result.reason);
        console.log("Final   :", result.cleaned_text);
        console.log("\n");
    });
};
testTextProcessor();
//# sourceMappingURL=textProcessor.js.map