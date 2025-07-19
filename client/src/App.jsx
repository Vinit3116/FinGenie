// client/src/App.jsx
import VoiceRecorder from './components/VoiceRecorder';

const App = () => {
  return (
    <div className="min-h-screen bg-grey-100 p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 FinGenie – Your Finance Buddy</h1>
      <VoiceRecorder />
    </div>
  );
};

export default App;
