import { type JSX, useState, type SyntheticEvent } from 'react'

interface CommentFormProps {
    onSubmit: (videoUrl: string, maxComments: number) => void;
    isLoading: boolean;
}

function CommentForm({ onSubmit, isLoading }: CommentFormProps): JSX.Element {

    const [videoUrl, setVideoUrl] = useState('');
    const [maxComments, setMaxComments] = useState<number>(50);
    const [errors, setErrors] = useState<{ url?: string; count?: string }>({});

    const isValidYouTubeUrl = (url: string): boolean => {
        const patterns = [
            /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
            /^(https?:\/\/)?(www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
        ];
        return patterns.some((pattern) => pattern.test(url));
    }

    const validForm = (): boolean => {

        const newErrors: { url?: string; count?: string } = {}

        // Validate YouTube URL
        if (!videoUrl.trim()) {
            newErrors.url = 'YouTube URL is required';
        } else if (!isValidYouTubeUrl(videoUrl)) {
            newErrors.url = 'Please enter a valid YouTube URL';
        }

        // Validate comment count
        if (maxComments < 10) {
            newErrors.count = 'Minimum 10 comments';
        } else if (maxComments > 500) {
            newErrors.count = 'Maximum 500 comments';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validForm()) {
            onSubmit(videoUrl, maxComments);
        }
    }

    return (
        <div className="w-full max-w-4xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex gap-5">
                    {/* YouTube URL Input */}
                    <div className="flex-1">
                        <input
                            className={`w-full h-[70px] border p-5 rounded-lg ${errors.url ? 'border-red-500' : 'border-gray-300'
                                }`}
                            type="text"
                            placeholder="Enter YouTube URL"
                            value={videoUrl}
                            onChange={(e) => {
                                setVideoUrl(e.target.value);
                                setErrors({ ...errors, url: undefined });
                            }}
                            disabled={isLoading}
                        />
                        {errors.url && (
                            <p className="text-red-500 text-sm mt-1">{errors.url}</p>
                        )}
                    </div>

                    {/* Max Comments Input */}
                    <div className="w-[150px]">
                        <input
                            className={`w-full h-[70px] border p-5 rounded-lg ${errors.count ? 'border-red-500' : 'border-gray-300'
                                }`}
                            type="number"
                            min={10}
                            max={500}
                            placeholder="Count"
                            value={maxComments}
                            onChange={(e) => {
                                setMaxComments(Number(e.target.value));
                                setErrors({ ...errors, count: undefined });
                            }}
                            disabled={isLoading}
                        />
                        {errors.count && (
                            <p className="text-red-500 text-sm mt-1">{errors.count}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`h-[70px] px-8 rounded-lg font-semibold text-white transition-colors ${isLoading
                                ? 'bg-gray-400 cursor-not-allowed rounded-2xl'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isLoading ? 'Analyzing...' : 'Analyze'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CommentForm;