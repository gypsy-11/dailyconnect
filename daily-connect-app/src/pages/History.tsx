import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function History() {
  const { data } = useApp();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [showRandomMemory, setShowRandomMemory] = useState(false);

  const filteredQuestions = selectedChildId
    ? data.askedQuestions.filter(aq => aq.childId === selectedChildId)
    : data.askedQuestions;

  const sortedQuestions = [...filteredQuestions].sort(
    (a, b) => new Date(b.askedDate).getTime() - new Date(a.askedDate).getTime()
  );

  const getChildName = (childId: string) => {
    return data.children.find(c => c.id === childId)?.name || 'Unknown';
  };

  const getQuestionText = (questionId: string) => {
    return data.questions.find(q => q.id === questionId)?.text || 'Question not found';
  };

  const getRandomMemory = () => {
    const memoriesWithAnswers = sortedQuestions.filter(q => q.answer && q.answer.trim());
    if (memoriesWithAnswers.length === 0) return null;
    return memoriesWithAnswers[Math.floor(Math.random() * memoriesWithAnswers.length)];
  };

  const randomMemory = showRandomMemory ? getRandomMemory() : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <BookOpen className="w-12 h-12 text-lavender" />
        </div>
        <h1 className="text-4xl font-light text-charcoal">Memory Lane</h1>
        <p className="text-charcoal-light max-w-2xl mx-auto">
          Revisit your meaningful conversations and cherished moments
        </p>
      </div>

      {/* Random Memory Button */}
      {sortedQuestions.some(q => q.answer && q.answer.trim()) && (
        <div className="flex justify-center">
          <Button
            variant="secondary"
            onClick={() => setShowRandomMemory(!showRandomMemory)}
            className="gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Show Random Memory
          </Button>
        </div>
      )}

      {/* Random Memory Card */}
      {randomMemory && (
        <Card gradient className="max-w-2xl mx-auto animate-scale-in">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-charcoal-light">
              <Sparkles className="w-4 h-4" />
              <span>A memory with {getChildName(randomMemory.childId)}</span>
              <span>•</span>
              <span>{new Date(randomMemory.askedDate).toLocaleDateString()}</span>
            </div>
            <p className="text-lg text-charcoal font-medium">
              {getQuestionText(randomMemory.questionId)}
            </p>
            {randomMemory.answer && (
              <p className="text-charcoal-light italic border-l-4 border-lavender pl-4">
                "{randomMemory.answer}"
              </p>
            )}
          </div>
        </Card>
      )}

      {/* Filter by Child */}
      {data.children.length > 1 && (
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setSelectedChildId(null)}
            className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
              selectedChildId === null
                ? 'bg-lavender text-white'
                : 'bg-white text-charcoal border border-lavender/20'
            }`}
          >
            All Children
          </button>
          {data.children.map(child => (
            <button
              key={child.id}
              onClick={() => setSelectedChildId(child.id)}
              className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all ${
                selectedChildId === child.id
                  ? 'bg-lavender text-white'
                  : 'bg-white text-charcoal border border-lavender/20'
              }`}
            >
              {child.name}
            </button>
          ))}
        </div>
      )}

      {/* History List */}
      {sortedQuestions.length === 0 ? (
        <Card className="max-w-2xl mx-auto text-center py-12">
          <p className="text-charcoal-light text-lg">
            No conversations yet. Start your first connection today!
          </p>
        </Card>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {sortedQuestions.map(aq => (
            <Card key={aq.id} className="animate-fade-in">
              <div className="space-y-3">
                {/* Meta Info */}
                <div className="flex items-center gap-2 text-sm text-charcoal-light">
                  <span className="font-medium">{getChildName(aq.childId)}</span>
                  <span>•</span>
                  <span>{new Date(aq.askedDate).toLocaleDateString()}</span>
                </div>

                {/* Question */}
                <p className="text-lg text-charcoal font-medium">
                  {getQuestionText(aq.questionId)}
                </p>

                {/* Answer */}
                {aq.answer && aq.answer.trim() && (
                  <div className="bg-lavender/5 rounded-2xl p-4">
                    <p className="text-charcoal-light italic">
                      {aq.answer}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
