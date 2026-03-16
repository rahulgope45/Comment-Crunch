import { type JSX } from "react";
import type { Video } from "../types/comment.type";

interface VideMetadataProps {
    video: Video;
}


function VideoMetadta({ video }: VideMetadataProps): JSX.Element {

    const formatNumber = (num: number): string => {
        return new Intl.NumberFormat('en-US').format(num);
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    return (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
            {/* Video Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {video.title}
            </h2>

            {/* Channel Info */}
            <div className="flex items-center gap-2 mb-4">
                <p className="text-gray-600">
                    by <span className="font-semibold text-gray-800">{video.channel_name}</span>
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Views */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Views</p>
                    <p className="text-xl font-bold text-gray-800">
                        {formatNumber(video.view_count)}
                    </p>
                </div>

                {/* Likes */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Likes</p>
                    <p className="text-xl font-bold text-gray-800">
                        {formatNumber(video.like_count)}
                    </p>
                </div>

                {/* Total Comments */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Total Comments</p>
                    <p className="text-xl font-bold text-gray-800">
                        {formatNumber(video.comment_count)}
                    </p>
                </div>

                {/* Analyzed Comments */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-500 mb-1">Analyzed</p>
                    <p className="text-xl font-bold text-blue-600">
                        {formatNumber(video.total_comments_fetched)}
                    </p>
                </div>
            </div>

            {/* Published Date */}
            <div className="mt-4 text-sm text-gray-500">
                Published: {formatDate(video.published_at)}
            </div>

            {/* Thumbnail (Optional) */}
            {video.thumbnail_url && (
                <div className="mt-4">
                    <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full max-w-md rounded-lg"
                    />
                </div>
            )}
        </div>
    )
}

export default VideoMetadta