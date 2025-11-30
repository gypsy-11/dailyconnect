import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppData, Child, Question, AskedQuestion, Streak, Settings } from '@/types';
import { loadData, saveData } from '@/lib/storage';
import { generateId, formatDate, calculateStreak } from '@/lib/utils';

interface AppContextType {
  data: AppData;
  addChild: (name: string) => void;
  removeChild: (childId: string) => void;
  markQuestionAsked: (questionId: string, childId: string, answer?: string) => void;
  addCustomQuestion: (text: string) => void;
  getStreakForChild: (childId: string) => Streak;
  updateSettings: (settings: Partial<Settings>) => void;
  exportAllData: () => string;
  importAllData: (jsonString: string) => boolean;
  clearAll: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AppData>(loadData());

  // Save to localStorage whenever data changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const addChild = (name: string) => {
    const newChild: Child = {
      id: generateId(),
      name,
      createdAt: new Date().toISOString(),
    };
    setData(prev => ({
      ...prev,
      children: [...prev.children, newChild],
    }));
  };

  const removeChild = (childId: string) => {
    setData(prev => ({
      ...prev,
      children: prev.children.filter(c => c.id !== childId),
      askedQuestions: prev.askedQuestions.filter(aq => aq.childId !== childId),
      streaks: prev.streaks.filter(s => s.childId !== childId),
    }));
  };

  const markQuestionAsked = (questionId: string, childId: string, answer?: string) => {
    const newAskedQuestion: AskedQuestion = {
      id: generateId(),
      questionId,
      childId,
      askedDate: formatDate(new Date()),
      answer,
    };
    setData(prev => ({
      ...prev,
      askedQuestions: [...prev.askedQuestions, newAskedQuestion],
    }));
  };

  const addCustomQuestion = (text: string) => {
    const newQuestion: Question = {
      id: generateId(),
      text,
      week: 0,
      day: 0,
      isCustom: true,
    };
    setData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const getStreakForChild = (childId: string): Streak => {
    return calculateStreak(childId, data.askedQuestions);
  };

  const updateSettings = (settings: Partial<Settings>) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, ...settings },
    }));
  };

  const exportAllData = () => {
    return JSON.stringify(data, null, 2);
  };

  const importAllData = (jsonString: string): boolean => {
    try {
      const importedData = JSON.parse(jsonString) as AppData;
      setData(importedData);
      return true;
    } catch {
      return false;
    }
  };

  const clearAll = () => {
    const freshData = loadData();
    setData({
      ...freshData,
      children: [],
      askedQuestions: [],
      streaks: [],
    });
  };

  return (
    <AppContext.Provider
      value={{
        data,
        addChild,
        removeChild,
        markQuestionAsked,
        addCustomQuestion,
        getStreakForChild,
        updateSettings,
        exportAllData,
        importAllData,
        clearAll,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
