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
        <div className="w-full max-w-5xl px-4 font-['EB_Garamond',_serif]">
            <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col md:flex-row items-start gap-4 md:gap-2">

                    {/* YouTube URL Input Container */}
                    <div className="flex-1 w-full">
                        <input
                            className={`w-full h-[70px] bg-transparent border-b-2 p-5 text-xl transition-all duration-300 focus:outline-none font-sans ${errors.url
                                    ? 'border-red-500 text-red-500'
                                    : 'border-black/10 focus:border-[#948181]'
                                }`}
                            type="text"
                            placeholder="Paste YouTube Video URL"
                            value={videoUrl}
                            onChange={(e) => {
                                setVideoUrl(e.target.value);
                                setErrors({ ...errors, url: undefined });
                            }}
                            disabled={isLoading}
                            
                        />
                        {errors.url && (
                            <p className="text-red-500 font-sans text-xs uppercase tracking-widest mt-2 ml-2">
                                {errors.url}
                            </p>
                        )}
                    </div>

                    {/* Max Comments Input Container */}
                    <div className="w-full md:w-[120px]">
                        <input
                            className={`w-full h-[70px] bg-transparent border-b-2 p-5 text-xl text-center transition-all duration-300 focus:outline-none font-sans ${errors.count
                                    ? 'border-red-500 text-red-500'
                                    : 'border-black/10 focus:border-[#948181]'
                                }`}
                            type="number"
                            min={10}
                            max={50}
                            placeholder="Qty"
                            value={maxComments}
                            onChange={(e) => {
                                setMaxComments(Number(e.target.value));
                                setErrors({ ...errors, count: undefined });
                            }}
                            disabled={isLoading}
                        />
                        {errors.count && (
                            <p className="text-red-500 font-sans text-xs uppercase tracking-widest mt-2 text-center">
                                {errors.count}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`h-[70px] w-full md:w-[180px] relative overflow-hidden group transition-all duration-500 ${isLoading
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-black text-white'
                            }`}
                    >
                        <span className="relative z-10 font-sans font-bold uppercase text-xs tracking-[0.2em]">
                            {isLoading ? 'Crunching...' : 'Analyze'}
                        </span>
                        {!isLoading && (
                            <div className="absolute inset-0 bg-[#948181] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        )}
                    </button>

                </div>

                {/* Minimalist Hint */}
                <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 text-center md:text-left">
                    Supports up to 500 comments for deep sentiment mapping.
                </p>
            </form>
        </div>
    )
}

export default CommentForm;