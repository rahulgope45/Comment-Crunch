import { type JSX } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import type { SentimentAnalysis } from '../types/comment.type';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface SentimentPieChartProps {
  sentimentAnalysis: SentimentAnalysis;
}

function SentimentPieChart({ sentimentAnalysis }: SentimentPieChartProps): JSX.Element {
  const { counts } = sentimentAnalysis;

  const data = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Comments',
        data: [counts.positive, counts.neutral, counts.negative],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',   // Green for positive
          'rgba(156, 163, 175, 0.8)',  // Gray for neutral
          'rgba(239, 68, 68, 0.8)',    // Red for negative
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(156, 163, 175, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Sentiment Distribution
      </h3>
      <div className="w-full aspect-square">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default SentimentPieChart;