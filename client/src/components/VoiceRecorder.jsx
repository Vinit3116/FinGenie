// client/src/components/VoiceRecorder.jsx

import { useState } from 'react';
import TransactionPreviewForm from './transactionPreviewForm';

const VoiceInputComponent = () => {
  const [parsedData, setParsedData] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);

    recognition.onresult = async (event) => {
      const voiceText = event.results[0][0].transcript;
      setTranscript(voiceText);
      setIsListening(false);

      try {
        const res = await fetch('http://localhost:8000/voice-expense', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript: voiceText }),
        });

        if (!res.ok) throw new Error('Failed to parse transaction');

        const result = await res.json();

        // Format result defensively
        const formatted = {
          amount: result.amount || '',
          category: result.category || '',
          mode: result.mode || '',
          date: result.date || '',
          split_with: Array.isArray(result.split_with) ? result.split_with : [],
          note: result.note || '',
        };

        setParsedData(formatted);
      } catch (err) {
        console.error('Parsing error:', err);
        alert('Failed to process voice input. Please try again.');
      }
    };

    recognition.onerror = (err) => {
      console.error('Speech recognition error:', err);
      setIsListening(false);
      alert('Voice input failed. Please try again.');
    };
  };

  const saveTransaction = async (data) => {
    try {
      const res = await fetch('http://localhost:8000/save-expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert('Transaction saved!');
        setParsedData(null);
        setTranscript('');
      } else {
        const error = await res.json();
        alert(`Failed to save: ${error.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Saving error:', err);
      alert('Error saving transaction.');
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={startListening}
        disabled={isListening}
        className={`px-4 py-2 rounded text-white ${isListening ? 'bg-gray-400' : 'bg-blue-600'}`}
      >
        🎙️ {isListening ? 'Listening...' : 'Speak Transaction'}
      </button>

      {transcript && (
        <p className="mt-2 italic text-gray-600">You said: &#39;{transcript}&#39;</p>
      )}

      {parsedData && (
        <TransactionPreviewForm parsedData={parsedData} onSave={saveTransaction} />
      )}
    </div>
  );
};

export default VoiceInputComponent;
