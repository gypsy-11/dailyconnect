import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Heart } from 'lucide-react';

interface FirstTimeSetupProps {
  onAddChild: (name: string) => void;
}

export function FirstTimeSetup({ onAddChild }: FirstTimeSetupProps) {
  const [childName, setChildName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (childName.trim()) {
      onAddChild(childName.trim());
      setChildName('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-lavender/20 via-peach/20 to-mint/20">
      <Card className="max-w-lg w-full animate-scale-in">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lavender to-periwinkle flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
          </div>

          {/* Welcome Text */}
          <div className="space-y-3">
            <h1 className="text-4xl font-light text-charcoal">
              Welcome to Daily Connect
            </h1>
            <p className="text-lg text-charcoal-light leading-relaxed">
              A simple way to deepen your connection with your child through daily meaningful conversations.
            </p>
          </div>

          {/* How it Works */}
          <div className="bg-lavender/5 rounded-2xl p-6 text-left space-y-3">
            <h3 className="font-semibold text-charcoal text-center mb-4">
              How it works
            </h3>
            <div className="space-y-2 text-sm text-charcoal-light">
              <p>✨ Get a new question every day</p>
              <p>💬 Ask your child and have a meaningful conversation</p>
              <p>📝 Journal their responses to remember these moments</p>
              <p>🔥 Build your connection streak day by day</p>
            </div>
          </div>

          {/* Add First Child */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <Input
              label="Your child's name"
              placeholder="Enter name..."
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!childName.trim()}
            >
              Get Started
            </Button>
          </form>

          <p className="text-xs text-charcoal-light">
            All data is stored locally on your device. No account needed.
          </p>
        </div>
      </Card>
    </div>
  );
}
