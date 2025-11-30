import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Question } from '@/types';

interface QuestionCardProps {
  question: Question;
  childName: string;
  onMarkAsked: () => void;
  onSkip: () => void;
}

export function QuestionCard({ question, childName, onMarkAsked, onSkip }: QuestionCardProps) {
  return (
    <Card gradient className="max-w-2xl mx-auto animate-scale-in">
      <div className="space-y-8">
        {/* Question Header */}
        <div className="text-center space-y-2">
          <p className="text-sm text-charcoal-light uppercase tracking-wide">
            Today's Question for {childName}
          </p>
          {question.week > 0 && (
            <p className="text-xs text-charcoal-light">
              Week {question.week} • Day {question.day}
            </p>
          )}
        </div>

        {/* Question Text */}
        <div className="py-8">
          <h2 className="text-3xl md:text-4xl font-light text-charcoal text-center leading-relaxed">
            {question.text}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="primary" 
            size="lg"
            onClick={onMarkAsked}
            className="flex-1 sm:flex-none"
          >
            Mark as Asked ✓
          </Button>
          <Button 
            variant="ghost" 
            size="lg"
            onClick={onSkip}
            className="flex-1 sm:flex-none"
          >
            Skip Today
          </Button>
        </div>
      </div>
    </Card>
  );
}
