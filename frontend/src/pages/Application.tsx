import { useEffect, useState, type JSX } from 'react'
import VideoMetadta from './VideoMetadta';
import OverallSentiment from '../components/OverallSentiment';
import SentimentPieChart from '../components/SentimentPieChart';
import SentimentBarChart from '../components/SentimentBarChart';
import CommentForm from './CommentForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { FetchCommentsResponse } from '../types/comment.type';
import { fetchComments } from '../services/commentService';
import CommentList from '../components/Comments';

function Application(): JSX.Element {

    const navigate = useNavigate();
    const { isAuthenticated, isLoading: authLoading } = useAuth();

    const [results, setResults] = useState<FetchCommentsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, authLoading, navigate]);

    const handleSubmit = async (videoUrl: string, maxComments: number) => {
        setIsLoading(true);
        setError(null);
        setResults(null); // Clear previous results

        try {
            const data = await fetchComments({
                video_url: videoUrl,
                max_comments: maxComments
            });
            setResults(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch comments. Please try again.');
            console.error('Error fetching comments:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <LoadingSpinner message="Loading..." />
            </div>
        );
    }

    // Don't render if not authenticated (will redirect)
    if (!isAuthenticated) {
        navigate("/login");
    }


    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4 font-garamond">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-700 mb-3">
                        Happy Analyzing
                    </h1>
                    {/* <p className="text-gray-600 text-lg">
                        Analyze YouTube comments and discover sentiment insights
                    </p> */}
                </div>

                {/* Input Form */}
                <div className="flex justify-center mb-12">
                    <CommentForm onSubmit={handleSubmit} isLoading={isLoading} />
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center">
                        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                            <LoadingSpinner message="Fetching and analyzing comments..." />
                            <p className="text-center text-sm text-gray-500 mt-4">
                                This may take 30-60 seconds for large videos
                            </p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-6 w-6 text-red-500"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-lg font-medium text-red-800">Error</h3>
                                    <p className="text-red-700 mt-1">{error}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Section */}
                {results && !isLoading && (
                    <div className="space-y-8">
                        {/* Results Header */}
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Results</h2>
                            <p className="text-gray-600">
                                Analyzed {results.summary.valid_comments} comments in{' '}
                                {results.summary.fetch_time_seconds.toFixed(1)} seconds
                                {results.summary.cached && (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        Cached
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* Video Metadata */}
                        <div className="flex justify-center">
                            <VideoMetadta video={results.video} />
                        </div>

                        {/* Overall Sentiment - Centered */}
                        <div className="flex justify-center">
                            <OverallSentiment sentimentAnalysis={results.sentiment_analysis} />
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            <div className="flex justify-center">
                                <SentimentPieChart sentimentAnalysis={results.sentiment_analysis} />
                            </div>
                            <div className="flex justify-center">
                                <SentimentBarChart sentimentAnalysis={results.sentiment_analysis} />
                            </div>
                        </div>

                        {/* Summary Stats */}
                        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Summary</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-1">Total Fetched</p>
                                    <p className="text-2xl font-bold text-gray-800">
                                        {results.summary.total_fetched}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-1">Valid Comments</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {results.summary.valid_comments}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-1">Rejected (Spam)</p>
                                    <p className="text-2xl font-bold text-red-600">
                                        {results.summary.rejected_comments}
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm text-gray-500 mb-1">Processing Time</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        {results.summary.fetch_time_seconds.toFixed(1)}s
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder for Comment List (will add next) */}
                        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
                            {results.comments.length > 0 && (
                                <div className="max-w-6xl mx-auto">
                                    <CommentList comments={results.comments} />
                                </div>
                            )}

                        </div>
                    </div>
                )}

                {/* Empty State - Show when no results and no loading/error */}
                {!results && !isLoading && !error && (
                    <div className="max-w-2xl mx-auto text-center py-12">
                        <div className="bg-white rounded-lg shadow-md p-12">
                            <svg
                                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No Analysis Yet
                            </h3>
                            <p className="text-gray-600">
                                Enter a YouTube video URL above to get started with sentiment analysis
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Application