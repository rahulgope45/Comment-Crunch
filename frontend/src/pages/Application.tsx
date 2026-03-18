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
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="min-h-screen bg-white py-16 px-4 font-['EB_Garamond',_serif] text-black overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-[#948181] uppercase tracking-[0.3em] text-[10px] font-sans font-bold">
                        Intelligence Engine
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic leading-none mt-2">
                        Happy Analyzing
                    </h1>
                </motion.div>

                {/* Input Form Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mb-20"
                >
                    <CommentForm onSubmit={handleSubmit} isLoading={isLoading} />
                </motion.div>

                <AnimatePresence mode="wait">
                    {/* Loading State */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex justify-center"
                        >
                            <div className="bg-white border border-black/5 p-12 max-w-md w-full text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl">
                                <LoadingSpinner message="Crunching Community Sentiment..." />
                                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#948181] mt-6 font-bold">
                                    Processing neural mapping • 30-60s
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Error State */}
                    {error && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-red-50/50 border border-red-100 p-8 rounded-3xl flex items-center gap-4">
                                <div className="h-10 w-10 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-sans font-bold uppercase text-xs tracking-widest text-red-900">Analysis Error</h3>
                                    <p className="text-red-700 font-garamond text-lg">{error}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Results Section */}
                    {results && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="space-y-16"
                        >
                            {/* Results Header */}
                            <div className="text-center">
                                <h2 className="text-4xl font-bold uppercase tracking-tighter italic">Results</h2>
                                <div className="flex items-center justify-center gap-4 mt-2 font-sans text-[10px] font-bold uppercase tracking-widest opacity-50">
                                    <span>{results.summary.valid_comments} Samples</span>
                                    <span className="h-1 w-1 bg-black rounded-full"></span>
                                    <span>{results.summary.fetch_time_seconds.toFixed(1)}s Speed</span>
                                    {results.summary.cached && (
                                        <span className="bg-[#948181] text-white px-2 py-0.5 rounded-sm">Cached</span>
                                    )}
                                </div>
                            </div>

                            {/* Core Insights Grid */}
                            <div className="grid grid-cols-1 gap-12">
                                <div className="flex justify-center"><VideoMetadta video={results.video} /></div>
                                <div className="flex justify-center"><OverallSentiment sentimentAnalysis={results.sentiment_analysis} /></div>
                            </div>

                            {/* Charts Section - Clean Backgrounds */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
                                <div className="p-8 bg-white border border-black/5 rounded-[40px] shadow-sm flex justify-center">
                                    <SentimentPieChart sentimentAnalysis={results.sentiment_analysis} />
                                </div>
                                <div className="p-8 bg-white border border-black/5 rounded-[40px] shadow-sm flex justify-center">
                                    <SentimentBarChart sentimentAnalysis={results.sentiment_analysis} />
                                </div>
                            </div>

                            {/* Summary Stats Cards */}
                            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-black/5">
                                {[
                                    { label: "Total Fetched", val: results.summary.total_fetched, color: "text-black" },
                                    { label: "Valid", val: results.summary.valid_comments, color: "text-green-600" },
                                    { label: "Spam/Filtered", val: results.summary.rejected_comments, color: "text-red-600" },
                                    { label: "Neural Time", val: `${results.summary.fetch_time_seconds.toFixed(1)}s`, color: "text-[#948181]" }
                                ].map((stat, i) => (
                                    <div key={i} className="text-center">
                                        <p className="font-sans text-[10px] uppercase tracking-widest font-bold opacity-40 mb-2">{stat.label}</p>
                                        <p className={`text-3xl font-bold italic ${stat.color}`}>{stat.val}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Comment List Section */}
                            <div className="max-w-6xl mx-auto">
                                <CommentList comments={results.comments} />
                            </div>
                        </motion.div>
                    )}

                    {/* Empty State */}
                    {!results && !isLoading && !error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-2xl mx-auto text-center py-20"
                        >
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-[#948181]/10 blur-3xl rounded-full"></div>
                                <svg className="relative mx-auto h-20 w-20 text-black/10 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold uppercase italic tracking-tight">System Idle</h3>
                            <p className="font-sans text-[11px] uppercase tracking-[0.2em] opacity-40 mt-2 font-bold">
                                Awaiting YouTube Data Stream
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default Application