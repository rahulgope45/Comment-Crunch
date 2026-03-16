import { type JSX } from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
      
      {/* Message */}
      <p className="text-gray-600 text-lg font-medium">{message}</p>
    </div>
  );
}

export default LoadingSpinner;