import { youtube } from '../lib/youtube.js';
export const fetchYoutubeMetaData = async (video_id) => {
    try {
        if (!youtube) {
            console.log("Error in the Youtube API connection");
            return null;
        }
        const response = await youtube.videos.list({
            part: ["snippet", "statistics"],
            id: [video_id]
        });
        const items = response.data.items;
        if (!items || items.length === 0) {
            return null;
        }
        const videoData = items[0];
        if (!videoData) {
            return null;
        }
        const snippet = videoData.snippet;
        const statistics = videoData.statistics;
        return {
            video_id: video_id,
            title: snippet?.title ?? null,
            channel_name: snippet?.channelTitle ?? null,
            channel_id: snippet?.channelId ?? null,
            view_count: Number(statistics?.viewCount ?? 0),
            like_count: Number(statistics?.likeCount ?? 0),
            comment_count: Number(statistics?.commentCount ?? 0),
            thumbnail_url: snippet?.thumbnails?.high?.url ?? null,
            published_at: snippet?.publishedAt
                ? new Date(snippet.publishedAt)
                : null,
        };
    }
    catch (error) {
        return null;
    }
};
//# sourceMappingURL=youtube.service.js.map