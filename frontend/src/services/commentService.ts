import { axiosInstance } from "../lib/axios";

import type{  
    FetchCommentsRequest,
    FetchCommentsResponse,
    
} from '../types/comment.type';


/**
 * Fetch and analyze comments from a YouTube video
 */
export const fetchComments = async (
  data: FetchCommentsRequest
): Promise<FetchCommentsResponse> => {
  try {
    const response = await axiosInstance.post<FetchCommentsResponse>(
      '/comments/fetch',
      {
        video_url: data.video_url,
        max_comments: data.max_comments ?? 100,
        force_refresh: data.force_refresh ?? false,
      }
    );
    return response.data;  
  } catch (error: any) {
    // Handle API errors
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Failed to fetch comments. Please try again.');
  }
};

/**
 * Get comments for a specific video by database ID
 */
export const getVideoComments = async (
  videoId: number
): Promise<FetchCommentsResponse> => {
  try {
    const response = await axiosInstance.get<FetchCommentsResponse>(
      `/comments/${videoId}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Failed to load comments.');
  }
};

/**
 * Get sentiment statistics for a video
 */
export const getSentimentStats = async (videoId: number) => {
  try {
    const response = await axiosInstance.get(
      `/comments/${videoId}/sentiment`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.detail) {
      throw new Error(error.response.data.detail);
    }
    throw new Error('Failed to load sentiment statistics.');
  }
};

