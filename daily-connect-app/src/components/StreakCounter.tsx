import { Flame } from 'lucide-react';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreakCounter({ currentStreak, longestStreak }: StreakCounterProps) {
  const getMilestoneMessage = (streak: number) => {
    if (streak === 0) return "Start your streak today!";
    if (streak >= 50) return "Incredible connection! 🎉";
    if (streak >= 30) return "Amazing dedication! ✨";
    if (streak >= 14) return "Two weeks strong! 💪";
    if (streak >= 7) return "One week streak! 🌟";
    return "Keep it going! 💚";
  };

  return (
    <div className="flex flex-col items-center space-y-3 animate-fade-in">
      <div className="relative">
        <Flame 
          className={`w-16 h-16 ${currentStreak > 0 ? 'text-orange-400 animate-breathe' : 'text-gray-300'}`}
          fill={currentStreak > 0 ? 'currentColor' : 'none'}
        />
        {currentStreak > 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg drop-shadow-lg">
              {currentStreak}
            </span>
          </div>
        )}
      </div>
      
      <div className="text-center">
        <p className="text-2xl font-semibold text-charcoal">
          {currentStreak} {currentStreak === 1 ? 'day' : 'days'}
        </p>
        <p className="text-sm text-charcoal-light mt-1">
          {getMilestoneMessage(currentStreak)}
        </p>
        {longestStreak > 0 && longestStreak !== currentStreak && (
          <p className="text-xs text-charcoal-light mt-2">
            Longest streak: {longestStreak} days
          </p>
        )}
      </div>
    </div>
  );
}
