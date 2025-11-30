import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Textarea } from './ui/Input';

interface JournalModalProps {
  isOpen: boolean;
  questionText: string;
  childName: string;
  onSave: (answer: string) => void;
  onClose: () => void;
}

export function JournalModal({ 
  isOpen, 
  questionText, 
  childName, 
  onSave, 
  onClose 
}: JournalModalProps) {
  const [answer, setAnswer] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(answer);
    setAnswer('');
  };

  const handleSkip = () => {
    onSave('');
    setAnswer('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-charcoal">
              Journal the moment
            </h3>
            <p className="text-sm text-charcoal-light mt-1">
              Recording {childName}'s response
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-lavender/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-charcoal-light" />
          </button>
        </div>

        {/* Question Reference */}
        <div className="bg-lavender/5 rounded-2xl p-4 mb-6">
          <p className="text-sm text-charcoal-light mb-1">Question asked:</p>
          <p className="text-base text-charcoal font-medium">{questionText}</p>
        </div>

        {/* Answer Input */}
        <Textarea
          label={`What did ${childName} say?`}
          placeholder="Record their answer, thoughts, or memorable moments from this conversation..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
        />

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            className="flex-1"
          >
            Save Response
          </Button>
          <Button
            variant="ghost"
            size="lg"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  );
}
