export interface Child {
  id: string;
  name: string;
  createdAt: string;
}

export interface Question {
  id: string;
  text: string;
  week: number;
  day: number;
  isCustom: boolean;
}

export interface AskedQuestion {
  id: string;
  questionId: string;
  childId: string;
  askedDate: string;
  answer?: string;
}

export interface Streak {
  childId: string;
  currentStreak: number;
  longestStreak: number;
  lastConnectionDate: string;
}

export interface Settings {
  reminderTime?: string;
  preferredChildRotation: 'rotate' | 'choose';
  theme: 'light' | 'dark';
}

export interface AppData {
  children: Child[];
  questions: Question[];
  askedQuestions: AskedQuestion[];
  streaks: Streak[];
  settings: Settings;
}

