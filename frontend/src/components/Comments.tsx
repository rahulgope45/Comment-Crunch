import { type JSX, useState, useMemo } from 'react';
import type { Comment } from '../types/comment.type';

interface CommentListProps {
  comments: Comment[];
}

type SortOption = 'recent' | 'likes' | 'sentiment';
type FilterOption = 'all' | 'positive' | 'neutral' | 'negative';

function CommentList({ comments }: CommentListProps): JSX.Element {
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set());
  const [showCount, setShowCount] = useState(20);

  // Toggle expanded state for long comments
  const toggleExpanded = (commentId: number) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  };

  // Filter and sort comments
  const processedComments = useMemo(() => {
    let filtered = [...comments];

    // Filter by sentiment
    if (filterBy !== 'all') {
      filtered = filtered.filter((comment) => comment.sentiment === filterBy);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'likes':
          return b.like_count - a.like_count;
        case 'sentiment':
          const sentimentOrder = { positive: 0, neutral: 1, negative: 2 };
          return (
            sentimentOrder[a.sentiment || 'neutral'] -
            sentimentOrder[b.sentiment || 'neutral']
          );
        case 'recent':
        default:
          return (
            new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
          );
      }
    });

    return filtered;
  }, [comments, sortBy, filterBy]);

  const displayedComments = processedComments.slice(0, showCount);
  const hasMore = showCount < processedComments.length;

  const getSentimentBadge = (sentiment: string | null) => {
    const config = {
      positive: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        label: 'Positive',
        emoji: '😊',
      },
      neutral: {
        bg: 'bg-gray-100',
        text: 'text-gray-800',
        label: 'Neutral',
        emoji: '😐',
      },
      negative: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        label: 'Negative',
        emoji: '😞',
      },
    };

    const settings = config[sentiment as keyof typeof config] || config.neutral;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${settings.bg} ${settings.text}`}
      >
        <span className="mr-1">{settings.emoji}</span>
        {settings.label}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">
          Comments ({processedComments.length})
        </h3>

        {/* Controls */}
        <div className="flex flex-wrap gap-3">
          {/* Filter */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Sort:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="likes">Most Liked</option>
              <option value="sentiment">Sentiment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {displayedComments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No comments match the selected filter.
          </div>
        ) : (
          displayedComments.map((comment) => {
            const isExpanded = expandedComments.has(comment.id);
            const isLong = comment.text_display.length > 150;

            return (
              <div
                key={comment.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {/* Author Avatar */}
                    {comment.author_profile_image_url ? (
                      <img
                        src={comment.author_profile_image_url}
                        alt={comment.author_name}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 font-semibold">
                          {comment.author_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* Author Info */}
                    <div>
                      <p className="font-semibold text-gray-900">
                        {comment.author_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(comment.published_at)}
                      </p>
                    </div>
                  </div>

                  {/* Sentiment Badge */}
                  {getSentimentBadge(comment.sentiment)}
                </div>

                {/* Comment Text */}
                <div className="mb-3">
                  <p className="text-gray-800 whitespace-pre-wrap">
                    {isExpanded || !isLong
                      ? comment.text_display
                      : truncateText(comment.text_display)}
                  </p>
                  {isLong && (
                    <button
                      onClick={() => toggleExpanded(comment.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-1"
                    >
                      {isExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  {/* Likes */}
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                    <span>{comment.like_count}</span>
                  </div>

                  {/* Replies */}
                  {comment.reply_count > 0 && (
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{comment.reply_count} replies</span>
                    </div>
                  )}

                  {/* Sentiment Score */}
                  {comment.sentiment_score && (
                    <div className="ml-auto text-xs">
                      Confidence: {(comment.sentiment_score * 100).toFixed(0)}%
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowCount((prev) => prev + 20)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Load More ({processedComments.length - showCount} remaining)
          </button>
        </div>
      )}

      {/* Show All Button (if many comments) */}
      {hasMore && processedComments.length > 100 && (
        <button
          onClick={() => setShowCount(processedComments.length)}
          className="mt-3 w-full px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
        >
          Show All ({processedComments.length})
        </button>
      )}
    </div>
  );
}

export default CommentList;