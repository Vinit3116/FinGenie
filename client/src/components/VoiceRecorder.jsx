// client/src/components/VoiceRecorder.jsx
import { useState, useEffect, useRef } from 'react';

const VoiceRecorder = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports the Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support Speech Recognition. Use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-IN';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const handleStartListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  return (
    <div className="voice-recorder" style={{ padding: '1rem' }}>
      <h2>🎙️ Voice Input</h2>
      <button onClick={handleStartListening} disabled={isListening}>
        {isListening ? 'Listening...' : 'Start Recording'}
      </button>
      <p><strong>Transcript:</strong> {transcript || 'Say something like "I spent ₹250 on groceries yesterday"'}</p>
    </div>
  );
};

export default VoiceRecorder;
