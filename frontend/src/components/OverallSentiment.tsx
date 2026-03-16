import {type JSX} from 'react'
import type{ SentimentAnalysis } from '../types/comment.type';


interface OverallSentimentProps {
  sentimentAnalysis: SentimentAnalysis;
}

function OverallSentiment({ sentimentAnalysis }: OverallSentimentProps): JSX.Element {
  const { overall, score, percentages } = sentimentAnalysis;

  // Color and emoji based on overall sentiment
  const sentimentConfig = {
    positive: {
      color: 'bg-green-100 border-green-500 text-green-700',
      emoji: '😊',
      label: 'Positive',
    },
    neutral: {
      color: 'bg-gray-100 border-gray-500 text-gray-700',
      emoji: '😐',
      label: 'Neutral',
    },
    negative: {
      color: 'bg-red-100 border-red-500 text-red-700',
      emoji: '😞',
      label: 'Negative',
    },
  };

  const config = sentimentConfig[overall];

  return (
    <div className="w-full max-w-md">
      <div className={`${config.color} border-4 rounded-2xl p-8 text-center shadow-lg`}>
        {/* Emoji */}
        <div className="text-6xl mb-4">{config.emoji}</div>

        {/* Label */}
        <h3 className="text-2xl font-bold mb-2">Overall Sentiment</h3>

        {/* Sentiment */}
        <p className="text-5xl font-extrabold mb-4">{config.label}</p>

        {/* Score */}
        <div className="mb-4">
          <p className="text-sm opacity-70 mb-1">Sentiment Score</p>
          <p className="text-3xl font-bold">
            {score > 0 ? '+' : ''}{(score * 100).toFixed(0)}%
          </p>
        </div>

        {/* Breakdown */}
        <div className="mt-6 pt-6 border-t border-current border-opacity-20">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="opacity-70">Positive</p>
              <p className="font-bold text-lg">{percentages.positive.toFixed(1)}%</p>
            </div>
            <div>
              <p className="opacity-70">Neutral</p>
              <p className="font-bold text-lg">{percentages.neutral.toFixed(1)}%</p>
            </div>
            <div>
              <p className="opacity-70">Negative</p>
              <p className="font-bold text-lg">{percentages.negative.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallSentiment;