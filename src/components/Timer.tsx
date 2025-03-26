import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  time: number;
}

export const Timer: React.FC<TimerProps> = ({ time }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
      <TimerIcon className="w-5 h-5 text-gray-600" />
      <span className="font-mono text-xl text-gray-800">{formatTime(time)}</span>
    </div>
  );
};