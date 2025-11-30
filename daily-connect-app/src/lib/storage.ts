import { AppData, Child, Question, AskedQuestion, Streak, Settings } from '@/types';
import { initializeQuestions } from './questions';

const STORAGE_KEY = 'daily-connect-data';

const defaultSettings: Settings = {
  preferredChildRotation: 'rotate',
  theme: 'light',
};

function getDefaultData(): AppData {
  return {
    children: [],
    questions: initializeQuestions(),
    askedQuestions: [],
    streaks: [],
    settings: defaultSettings,
  };
}

export function loadData(): AppData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const defaultData = getDefaultData();
      saveData(defaultData);
      return defaultData;
    }
    const data = JSON.parse(stored) as AppData;
    
    // Ensure questions are initialized if empty
    if (!data.questions || data.questions.length === 0) {
      data.questions = initializeQuestions();
    }
    
    return data;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return getDefaultData();
  }
}

export function saveData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
}

export function exportData(): string {
  const data = loadData();
  return JSON.stringify(data, null, 2);
}

export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as AppData;
    saveData(data);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}
