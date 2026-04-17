export interface VideoMetaData {
    video_id: string;
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
    commentId: string;
    authorName: string | null;
    authorChannelId: string | null;
    authorProfileImageUrl: string | null;
    textOriginal: string | null;
    textDisplay: string | null;
    likeCount: number;
    replyCount: number;
    isReply: boolean;
    parentId: string | null;
    publishedAt: Date | null;
}
export declare const fetchYoutubeMetaData: (video_id: string) => Promise<VideoMetaData | null>;
export declare const fetchYoutubeComments: (video_id: string, max_comments?: number) => Promise<YoutubeComment[]>;
export declare const checkVideoExist: () => void;
//# sourceMappingURL=youtube.service.d.ts.map