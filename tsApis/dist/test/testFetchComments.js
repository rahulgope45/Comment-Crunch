import "dotenv/config";
import { fetchYoutubeComments } from "../services/youtube.service.js";
//  simple test runner
const testFetchComments = async () => {
    try {
        const testUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        // extract ID manually or use your function
        const videoId = "dQw4w9WgXcQ";
        console.log(" Testing fetchYoutubeComments...");
        console.log(" Video ID:", videoId);
        const comments = await fetchYoutubeComments(videoId, 10);
        console.log("Total comments fetched:", comments.length);
        // print first 2 comments
        console.log("\n Sample Comments:\n");
        comments.slice(0, 5).forEach((comment, index) => {
            console.log(`--- Comment ${index + 1} ---`);
            console.log("Author:", comment.authorName);
            console.log("Text:", comment.textDisplay);
            console.log("Likes:", comment.likeCount);
            console.log("Replies:", comment.replyCount);
            console.log("Published:", comment.publishedAt);
            console.log("\n");
        });
    }
    catch (error) {
        console.error(" Test failed:", error);
    }
};
// run test
testFetchComments();
//# sourceMappingURL=testFetchComments.js.map