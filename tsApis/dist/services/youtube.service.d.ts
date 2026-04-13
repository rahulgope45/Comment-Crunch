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
export declare const fetchYoutubeMetaData: (video_id: string) => Promise<VideoMetaData | null>;
//# sourceMappingURL=youtube.service.d.ts.map