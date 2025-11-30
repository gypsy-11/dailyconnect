import { Question } from '@/types';

// 50-Day Teen Connection Questions from daily-connect.md
export const defaultQuestions: Omit<Question, 'id' | 'isCustom'>[] = [
  // Week 1 — Favourites Week
  { text: "What's your favourite colour right now?", week: 1, day: 1 },
  { text: "What's your favourite meal if time/money didn't matter?", week: 1, day: 2 },
  { text: "What's your favourite comfort snack?", week: 1, day: 3 },
  { text: "What's your favourite song at the moment?", week: 1, day: 4 },
  { text: "What's your favourite movie or series ever?", week: 1, day: 5 },
  { text: "What's your favourite season and why?", week: 1, day: 6 },
  { text: "What's your favourite place we've ever travelled together?", week: 1, day: 7 },

  // Week 2 — Personality & Interests
  { text: "If you had a free day with zero responsibilities, how would you spend it?", week: 2, day: 8 },
  { text: "What's something you could talk about for hours?", week: 2, day: 9 },
  { text: "If you had to teach a class on one thing, what would you teach?", week: 2, day: 10 },
  { text: "If money didn't matter, what hobby would you try?", week: 2, day: 11 },
  { text: "Are you more introverted, extroverted, or in-between?", week: 2, day: 12 },
  { text: "What gives you more energy: being alone or being with people?", week: 2, day: 13 },
  { text: "What's the funniest thing that always makes you laugh?", week: 2, day: 14 },

  // Week 3 — Dreams & Aspirations
  { text: "If you could live in any country for a year, where would you choose?", week: 3, day: 15 },
  { text: "If you could design your dream bedroom, what would it look like?", week: 3, day: 16 },
  { text: "If money didn't exist, what would you spend your life doing?", week: 3, day: 17 },
  { text: "What's one dream you're a little shy to say out loud?", week: 3, day: 18 },
  { text: "If you could try any job for one week, what would it be?", week: 3, day: 19 },
  { text: "If you could meet your future self at age 30, what would you ask them?", week: 3, day: 20 },
  { text: "What's a skill you want to learn in the next few years?", week: 3, day: 21 },

  // Week 4 — Imagination & Creativity
  { text: "If you wrote a book about your life so far, what would the title be?", week: 4, day: 22 },
  { text: "If you could invent a new school subject, what would it be?", week: 4, day: 23 },
  { text: "If you could have one superpower, what would you choose?", week: 4, day: 24 },
  { text: "If you could live inside any movie or series universe, which one?", week: 4, day: 25 },
  { text: "If you could instantly master one sport or activity, what would it be?", week: 4, day: 26 },
  { text: "If you could design a family tradition, what would it be?", week: 4, day: 27 },
  { text: "If you could relive one day from your life so far, which day?", week: 4, day: 28 },

  // Week 5 — Feelings, Values & Inner World
  { text: "When do you feel the most like yourself?", week: 5, day: 29 },
  { text: "What kind of people do you feel safest with?", week: 5, day: 30 },
  { text: "What's something you wish adults understood about teenagers?", week: 5, day: 31 },
  { text: "What's one small thing that stresses you out?", week: 5, day: 32 },
  { text: "When you're having a bad day, what actually helps?", week: 5, day: 33 },
  { text: "What's one quality you really like about yourself?", week: 5, day: 34 },
  { text: "What kind of person do you hope people remember you as?", week: 5, day: 35 },

  // Week 6 — Family Connection
  { text: "What's one thing you'd change in our family if you could?", week: 6, day: 36 },
  { text: "What's your favourite memory of us together?", week: 6, day: 37 },
  { text: "What do you think we should do more of as a family?", week: 6, day: 38 },
  { text: "What's a place you'd love us to travel to together?", week: 6, day: 39 },
  { text: "What's something you want me to understand about you better?", week: 6, day: 40 },
  { text: "What do you value most in our relationship?", week: 6, day: 41 },
  { text: "What's something you want us to start doing weekly?", week: 6, day: 42 },

  // Week 7 — Fun, Silly, Playful
  { text: "Would you rather never do homework again or never clean your room again?", week: 7, day: 43 },
  { text: "If you could teleport anywhere right now, where would you go?", week: 7, day: 44 },
  { text: "If you had to eat one meal for 30 days, what would it be?", week: 7, day: 45 },
  { text: "Which animal do you think would be your best friend if animals could talk?", week: 7, day: 46 },
  { text: "House by the ocean or house in the mountains — which do you choose?", week: 7, day: 47 },
  { text: "If you could press a button and master one school subject instantly, which one?", week: 7, day: 48 },
  { text: "If you could switch lives with any fictional character for a day, who?", week: 7, day: 49 },
  { text: "If we could spend a dream Sunday together—no budget—what would we do?", week: 7, day: 50 },
];

export function initializeQuestions(): Question[] {
  return defaultQuestions.map((q, index) => ({
    ...q,
    id: `q-${index + 1}`,
    isCustom: false,
  }));
}
