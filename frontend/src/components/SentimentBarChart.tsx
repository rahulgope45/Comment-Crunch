import { type JSX } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import type { SentimentAnalysis } from '../types/comment.type';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SentimentBarChartProps {
  sentimentAnalysis: SentimentAnalysis;
}

function SentimentBarChart({ sentimentAnalysis }: SentimentBarChartProps): JSX.Element {
  const { counts, percentages } = sentimentAnalysis;

  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Number of Comments',
        data: [counts.positive, counts.neutral, counts.negative],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Green
          'rgba(156, 163, 175, 0.8)',  // Gray
          'rgba(239, 68, 68, 0.8)',    // Red
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(156, 163, 175, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            const sentiment = context.label.toLowerCase() as 'positive' | 'neutral' | 'negative';
            const percentage = percentages[sentiment].toFixed(1);
            return `${value} comments (${percentage}%)`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
      },
      x: {
        ticks: {
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Sentiment Breakdown
      </h3>
      <div className="w-full" style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default SentimentBarChart;