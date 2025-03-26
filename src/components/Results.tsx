import React from 'react';

interface ResultsProps {
  score: number;
  onTryAgain: () => void;
}

export const Results: React.FC<ResultsProps> = ({ score, onTryAgain }) => {
  return (
    <div className="text-center my-12 bg-gray-50 p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Test Complete!</h2>
      <div className="text-2xl text-gray-700 mb-6">
        Your Score: {' '}
        <span className="font-bold text-blue-600">{score}</span>
        {' '} / 100
      </div>
      <button 
        className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-md transition-colors shadow-md"
        onClick={onTryAgain}
      >
        Try Again
      </button>
    </div>
  );
};