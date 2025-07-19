// client/src/components/VoiceRecorder.jsx
import { useState, useRef } from "react";
import axios from "axios";

const VoiceRecorder = () => {
  const [transcript, setTranscript] = useState("");
  const [parsedData, setParsedData] = useState(null);
  const [error, setError] = useState("");
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN"; // Indian accent support
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      callLLMParser(speechResult);
    };

    recognition.onerror = (event) => {
      setError("Speech Recognition Error: " + event.error);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const callLLMParser = async (speech) => {
    try {
      const res = await axios.post("http://localhost:8000/parse-expense", {
        transcript: speech
      });
      setParsedData(res.data.parsed);
      setError("");
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to parse expense. Please try again.");
    }
  };

  return (
    <div className="p-4 rounded-xl shadow bg-white max-w-md mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-2">🎤 Speak your expense</h2>
      <button onClick={startListening} className="bg-blue-600 text-white px-4 py-2 rounded">
        Start Recording
      </button>

      {transcript && (
        <div className="mt-3">
          <p className="font-medium">You said:</p>
          <p className="text-gray-700 italic">“{transcript}”</p>
        </div>
      )}

      {parsedData && (
        <div className="mt-4 bg-gray-100 p-3 rounded border border-gray-300">
          <p><strong>Amount:</strong> ₹{parsedData.amount}</p>
          <p><strong>Category:</strong> {parsedData.category}</p>
          <p><strong>Mode:</strong> {parsedData.mode}</p>
          <p><strong>Date:</strong> {parsedData.date}</p>
          <p><strong>Split With:</strong> {parsedData.split_with?.join(", ") || "—"}</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default VoiceRecorder;