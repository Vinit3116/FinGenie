import { useState } from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import ExpenseHistoryTable from './components/ExpenseHistoryTable';
import "./App.css";

/**
 * Main App Component
 * 
 * FinGenie - AI-powered voice finance tracker
 * Provides voice-to-text expense tracking with intelligent parsing
 */
const App = () => {
  const [activeView, setActiveView] = useState('voice'); // 'voice' or 'history'

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🧠 FinGenie – Your Finance Buddy</h1>
        <p>AI-powered voice expense tracker</p>
        
        {/* Navigation Tabs */}
        <div className="tab-navigation">
          <button 
            className={`tab-btn ${activeView === 'voice' ? 'active' : ''}`}
            onClick={() => setActiveView('voice')}
          >
            🎙️ Add Expense
          </button>
          <button 
            className={`tab-btn ${activeView === 'history' ? 'active' : ''}`}
            onClick={() => setActiveView('history')}
          >
            📊 View History
          </button>
        </div>
      </header>

      <main className="app-main">
        {activeView === 'voice' ? (
          <VoiceRecorder />
        ) : (
          <ExpenseHistoryTable />
        )}
      </main>

      <footer className="app-footer">
        <p>Powered by AI • Built with React & FastAPI</p>
      </footer>
    </div>
  );
};

export default App;
