import { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { FirstTimeSetup } from './components/FirstTimeSetup';
import { Dashboard } from './pages/Dashboard';
import { History } from './pages/History';
import { Settings } from './pages/Settings';
import { Home, BookOpen, Settings as SettingsIcon } from 'lucide-react';

type Page = 'dashboard' | 'history' | 'settings';

function AppContent() {
  const { data, addChild } = useApp();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  // Show first-time setup if no children
  if (data.children.length === 0) {
    return <FirstTimeSetup onAddChild={addChild} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender/20 via-peach/20 to-mint/20">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <h1 className="text-2xl font-light text-charcoal">
              Daily Connect
            </h1>

            {/* Nav Links */}
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  currentPage === 'dashboard'
                    ? 'bg-lavender text-white'
                    : 'text-charcoal hover:bg-lavender/10'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => setCurrentPage('history')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  currentPage === 'history'
                    ? 'bg-lavender text-white'
                    : 'text-charcoal hover:bg-lavender/10'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="hidden sm:inline">History</span>
              </button>
              <button
                onClick={() => setCurrentPage('settings')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  currentPage === 'settings'
                    ? 'bg-lavender text-white'
                    : 'text-charcoal hover:bg-lavender/10'
                }`}
              >
                <SettingsIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'history' && <History />}
        {currentPage === 'settings' && <Settings />}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-charcoal-light">
        <p>Made with 💜 for meaningful parent-child connections</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
