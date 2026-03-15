export interface Video {
    id: number;
    video_id: string;
    title: string;
    channel_name: string;
    channel_id: string;
    view_count: number;
    like_count: number;
    comment_count: number;
    thumbnail_url: string;
    published_at: string;
    fetched_at: string;
    fetched_by: number;
    total_comments_fetched: number;
    status: 'pending' | 'completed' | 'failed';
    error_message: string | null;
    created_at: string;
    updated_at: string;
}

export interface Comment {
    id: number;
    video_id: number;
    comment_id: string;
    author_name: string;
    author_channel_id: string | null;
    author_profile_image_url: string | null;
    text_original: string;
    text_display: string;
    like_count: number;
    reply_count: number;
    is_reply: boolean;
    parent_id: string | null;
    published_at: string;
    updated_at: string;
    sentiment: 'positive' | 'neutral' | 'negative' | null;
    sentiment_score: number | null;
    is_noise: boolean;
    created_at: string;
}

export interface SentimentCounts {
  positive: number;
  neutral: number;
  negative: number;
}

export interface SentimentPercentages {
  positive: number;
  neutral: number;
  negative: number;
}

export interface SentimentAnalysis {
  counts: SentimentCounts;
  percentages: SentimentPercentages;
  overall: 'positive' | 'neutral' | 'negative';
  score: number;
}

export interface Summary {
  total_fetched: number;
  valid_comments: number;
  rejected_comments: number;
  fetch_time_seconds: number;
  cached: boolean;
}

export interface FetchCommentsResponse {
  status: 'success' | 'error';
  source: 'youtube_api' | 'cache';
  video: Video;
  comments: Comment[];
  summary: Summary;
  sentiment_analysis: SentimentAnalysis;
}

// Request Types
export interface FetchCommentsRequest {
  video_url: string;
  max_comments?: number;
  force_refresh?: boolean;
}

// Error Response
export interface ApiError {
  detail: string;
  status_code?: number;
}