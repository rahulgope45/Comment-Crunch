
import { youtube } from '../lib/youtube.js';
import { youtube_v3 } from 'googleapis';
import type { GaxiosResponse } from "gaxios";

export interface VideoMetaData {

    video_id: string
    title: string | null;
    channel_name: string | null;
    channel_id: string | null;
    view_count: number;
    like_count: number;
    comment_count: number;
    thumbnail_url: string | null;
    published_at: Date | null;
}

export interface YoutubeComment {
    commentId: string
    authorName: string | null
    authorChannelId: string | null
    authorProfileImageUrl: string | null
    textOriginal: string | null
    textDisplay: string | null
    likeCount: number
    replyCount: number
    isReply: boolean
    parentId: string | null
    publishedAt: Date | null
}


// ========= Fetch Youtube Metadata =========

export const fetchYoutubeMetaData = async (video_id: string): Promise<VideoMetaData | null> => {
    try {
        if (!youtube) {
            console.log("Error in the Youtube API connection")
            return null
        }


        const response = await youtube.videos.list({
            part: ["snippet", "statistics"],
            id: [video_id]
        });

        const items = response.data.items

        if (!items || items.length === 0) {
            return null;
        }

        const videoData = items[0]
        if (!videoData) {
            return null;
        }
        const snippet = videoData.snippet;
        const statistics = videoData.statistics

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
        }


    } catch (error) {
        console.log(error)
        return null;
    }
}

//============== Fetch Comments ===============
export const fetchYoutubeComments = async (video_id: string, max_comments: number = 500): Promise<YoutubeComment[]> => {

    try {
        if (!youtube) {
            console.log("Error in Youtube Api connection");
            return []
        }

        const comments: YoutubeComment[] = [];
        let nextPageToken: string | undefined = undefined;

        while (comments.length < max_comments) {
            const { data } = await (youtube.commentThreads.list({
                part: ["snippet"],
                videoId: video_id,
                maxResults: Math.min(100, max_comments - comments.length),
                ...(nextPageToken ? { pageToken: nextPageToken } : {}),
                order: "relevance",
            }) as Promise<{ data: youtube_v3.Schema$CommentThreadListResponse }>);

            const items: youtube_v3.Schema$CommentThread[] = data.items ?? [];
            nextPageToken = data.nextPageToken ?? undefined;

            if (!items || items.length === 0) break;

            for (const item of items) {
                const topComment = item.snippet?.topLevelComment;
                const snippet = topComment?.snippet;

                if (!topComment || !snippet) continue;

                comments.push({
                    commentId: topComment.id!,
                    authorName: snippet.authorDisplayName ?? null,
                    authorChannelId: snippet.authorChannelId?.value ?? null,
                    authorProfileImageUrl: snippet.authorProfileImageUrl ?? null,
                    textOriginal: snippet.textOriginal ?? null,
                    textDisplay: snippet.textDisplay ?? null,
                    likeCount: snippet.likeCount ?? 0,
                    replyCount: item.snippet?.totalReplyCount ?? 0,
                    isReply: false,
                    parentId: null,
                    publishedAt: snippet.publishedAt
                        ? new Date(snippet.publishedAt)
                        : null,
                });
            }

            

            if (!nextPageToken || comments.length >= max_comments) {
                break;
            }

            await new Promise((res) => setTimeout(res, 100));
        }
        return comments
    } catch (error: any) {
        const message = error?.message || "";
        if (message.includes("commentsDisabled")) {
            throw new Error("Comments are disabled for this video");
        } else if (message.includes("videoNotFound")) {
            throw new Error("Video not found");
        }

        console.error("YouTube API Error:", error);
        throw new Error("Failed to fetch comments");
    }

}