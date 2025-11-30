# Daily Connect

A beautiful, calming web app designed to help parents reconnect with their children through daily meaningful conversations.

## 🌟 Features

- **50 Thoughtful Questions** - Carefully curated questions spanning 7 weeks of topics
- **No Login Required** - All data stored locally in your browser
- **Multi-Child Support** - Track conversations with multiple children
- **Streak Tracking** - Duolingo-style streak system to build consistent connection habits
- **Journal Feature** - Record your child's responses and create lasting memories
- **Memory Lane** - Revisit past conversations with filtering and random memory feature
- **Calming Design** - Meditation app aesthetic with soft pastel colors and smooth animations
- **Mobile Responsive** - Works beautifully on all devices

## 🎨 Design Philosophy

Inspired by meditation apps like Headspace and Calm, Daily Connect features:
- Soft pastel color palette (lavender, sage, peach, mint)
- Generous white space and breathing room
- Gentle animations and transitions
- Rounded, friendly UI elements
- Focus on one primary action per screen

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

The app will be available at http://localhost:5173/

## 📱 How to Use

1. **First Time Setup**: Add your child's name
2. **Daily Question**: Each day, you'll see a new question to ask your child
3. **Mark as Asked**: After having the conversation, mark the question as asked
4. **Journal**: Optionally record their response to remember the moment
5. **Build Streaks**: Connect daily to build your streak
6. **Review History**: Visit the History page to revisit past conversations

## 💾 Data Storage

All data is stored locally in your browser using localStorage:
- No backend required
- No data sent to servers
- Works offline
- Export/import for backup

**Important**: Clear browser cache will delete your data. Use the Export feature in Settings to backup your conversations.

## 🗂️ Project Structure

```
daily-connect-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Basic UI elements (Button, Card, Input)
│   │   ├── StreakCounter   # Streak display with animations
│   │   ├── QuestionCard    # Daily question display
│   │   ├── JournalModal    # Answer recording modal
│   │   └── ...
│   ├── pages/              # Main app pages
│   │   ├── Dashboard       # Home page with today's question
│   │   ├── History         # Past conversations
│   │   └── Settings        # App configuration
│   ├── context/            # React context for state management
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and data
│   │   ├── storage.ts      # localStorage wrapper
│   │   ├── questions.ts    # 50 questions data
│   │   └── utils.ts        # Helper functions
│   └── types/              # TypeScript type definitions
└── ...
```

## 🎯 Roadmap

### v1.1 (Planned)
- [ ] Custom questions
- [ ] Browser notifications
- [ ] Calendar view
- [ ] Dark mode

### v2.0 (Future)
- [ ] Optional cloud sync with user accounts
- [ ] Multiple device support

### v3.0 (Future)
- [ ] iOS mobile app
- [ ] Android mobile app

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State**: React Context API
- **Storage**: Browser localStorage

## 📄 License

This project is for personal use.

## 💜 Made with Love

Created to help parents build deeper, more meaningful connections with their children, one question at a time.
