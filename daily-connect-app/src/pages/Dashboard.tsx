import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { QuestionCard } from '@/components/QuestionCard';
import { StreakCounter } from '@/components/StreakCounter';
import { ChildSelector } from '@/components/ChildSelector';
import { JournalModal } from '@/components/JournalModal';
import { getNextQuestion, hasConnectedToday } from '@/lib/utils';
import { Question } from '@/types';

export function Dashboard() {
  const { data, markQuestionAsked, getStreakForChild } = useApp();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showJournal, setShowJournal] = useState(false);
  const [hasAskedToday, setHasAskedToday] = useState(false);

  // Auto-select first child if only one exists
  useEffect(() => {
    if (data.children.length === 1 && !selectedChildId) {
      setSelectedChildId(data.children[0].id);
    }
  }, [data.children, selectedChildId]);

  // Load question when child is selected
  useEffect(() => {
    if (selectedChildId) {
      const question = getNextQuestion(data.questions, selectedChildId, data.askedQuestions);
      setCurrentQuestion(question);
      setHasAskedToday(hasConnectedToday(selectedChildId, data.askedQuestions));
    }
  }, [selectedChildId, data.questions, data.askedQuestions]);

  const handleMarkAsked = () => {
    setShowJournal(true);
  };

  const handleSaveJournal = (answer: string) => {
    if (currentQuestion && selectedChildId) {
      markQuestionAsked(currentQuestion.id, selectedChildId, answer);
      setShowJournal(false);
      // Refresh question
      const nextQuestion = getNextQuestion(data.questions, selectedChildId, data.askedQuestions);
      setCurrentQuestion(nextQuestion);
      setHasAskedToday(true);
    }
  };

  const handleSkip = () => {
    if (currentQuestion && selectedChildId) {
      markQuestionAsked(currentQuestion.id, selectedChildId);
      const nextQuestion = getNextQuestion(data.questions, selectedChildId, data.askedQuestions);
      setCurrentQuestion(nextQuestion);
      setHasAskedToday(true);
    }
  };

  const selectedChild = data.children.find(c => c.id === selectedChildId);
  const streak = selectedChildId ? getStreakForChild(selectedChildId) : null;

  return (
    <div className="space-y-12">
      {/* Child Selector */}
      {data.children.length > 1 && (
        <ChildSelector
          children={data.children}
          selectedChildId={selectedChildId}
          onSelectChild={setSelectedChildId}
        />
      )}

      {/* Streak Counter */}
      {selectedChild && streak && (
        <StreakCounter
          currentStreak={streak.currentStreak}
          longestStreak={streak.longestStreak}
        />
      )}

      {/* Already Connected Today Message */}
      {hasAskedToday && currentQuestion && selectedChild && (
        <div className="text-center animate-fade-in">
          <div className="inline-block bg-sage/20 text-charcoal px-6 py-3 rounded-2xl">
            <p className="font-medium">
              ✓ You've already connected with {selectedChild.name} today!
            </p>
            <p className="text-sm text-charcoal-light mt-1">
              Come back tomorrow for the next question
            </p>
          </div>
        </div>
      )}

      {/* Question Card */}
      {!hasAskedToday && currentQuestion && selectedChild ? (
        <QuestionCard
          question={currentQuestion}
          childName={selectedChild.name}
          onMarkAsked={handleMarkAsked}
          onSkip={handleSkip}
        />
      ) : !selectedChild && data.children.length > 1 ? (
        <div className="text-center text-charcoal-light py-12">
          <p className="text-lg">Select a child to see today's question</p>
        </div>
      ) : null}

      {/* Journal Modal */}
      {currentQuestion && selectedChild && (
        <JournalModal
          isOpen={showJournal}
          questionText={currentQuestion.text}
          childName={selectedChild.name}
          onSave={handleSaveJournal}
          onClose={() => setShowJournal(false)}
        />
      )}
    </div>
  );
}
