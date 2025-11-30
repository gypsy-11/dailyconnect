import { AskedQuestion, Question, Streak } from '@/types';

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function isToday(dateString: string): boolean {
  const today = formatDate(new Date());
  return dateString === today;
}

export function getNextQuestion(
  questions: Question[],
  childId: string,
  askedQuestions: AskedQuestion[]
): Question | null {
  // Get questions already asked for this child
  const askedQuestionIds = askedQuestions
    .filter(aq => aq.childId === childId)
    .map(aq => aq.questionId);

  // Find first unasked question
  const unaskedQuestions = questions.filter(q => !askedQuestionIds.includes(q.id));
  
  if (unaskedQuestions.length === 0) {
    // All questions have been asked, return first question to restart cycle
    return questions[0] || null;
  }

  return unaskedQuestions[0];
}

export function calculateStreak(childId: string, askedQuestions: AskedQuestion[]): Streak {
  const childConnections = askedQuestions
    .filter(aq => aq.childId === childId)
    .sort((a, b) => new Date(b.askedDate).getTime() - new Date(a.askedDate).getTime());

  if (childConnections.length === 0) {
    return {
      childId,
      currentStreak: 0,
      longestStreak: 0,
      lastConnectionDate: '',
    };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;
  
  const lastConnection = childConnections[0];
  const lastDate = new Date(lastConnection.askedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  lastDate.setHours(0, 0, 0, 0);

  // Check if streak is still active (last connection was today or yesterday)
  const diffDays = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays <= 1) {
    currentStreak = 1;
    
    // Count consecutive days backwards
    for (let i = 1; i < childConnections.length; i++) {
      const currDate = new Date(childConnections[i - 1].askedDate);
      const prevDate = new Date(childConnections[i].askedDate);
      currDate.setHours(0, 0, 0, 0);
      prevDate.setHours(0, 0, 0, 0);
      
      const dayDiff = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff === 1) {
        currentStreak++;
        tempStreak++;
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  tempStreak = 1;
  for (let i = 1; i < childConnections.length; i++) {
    const currDate = new Date(childConnections[i - 1].askedDate);
    const prevDate = new Date(childConnections[i].askedDate);
    currDate.setHours(0, 0, 0, 0);
    prevDate.setHours(0, 0, 0, 0);
    
    const dayDiff = Math.floor((currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (dayDiff === 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }
  
  longestStreak = Math.max(longestStreak, currentStreak);

  return {
    childId,
    currentStreak,
    longestStreak,
    lastConnectionDate: lastConnection.askedDate,
  };
}

export function hasConnectedToday(childId: string, askedQuestions: AskedQuestion[]): boolean {
  const today = formatDate(new Date());
  return askedQuestions.some(
    aq => aq.childId === childId && aq.askedDate === today
  );
}
