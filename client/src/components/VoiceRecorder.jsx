// client/src/components/VoiceRecorder.jsx

import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

// API Configuration
import { API_BASE_URL } from '../config/api';
const VOICE_EXPENSE_ENDPOINT = `${API_BASE_URL}/voice-expense`;
const TRANSACTIONS_ENDPOINT = `${API_BASE_URL}/transactions`;

// Speech Recognition Configuration
const SPEECH_CONFIG = {
  continuous: false,
  language: "en-IN",
  interimResults: false
};

const VoiceRecorder = ({ onExpenseAdded }) => {
  // State management
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Speech recognition reference
  const recognitionRef = useRef(null);

  /**
   * Initialize speech recognition on component mount
   */
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    // Configure speech recognition
    recognitionRef.current = new SpeechRecognition();
    Object.assign(recognitionRef.current, SPEECH_CONFIG);

    // Set up event handlers
    recognitionRef.current.onresult = handleSpeechResult;
    recognitionRef.current.onerror = handleSpeechError;
    recognitionRef.current.onend = handleSpeechEnd;

  }, []);

  /**
   * Handle successful speech recognition result
   */
  const handleSpeechResult = async (event) => {
    const transcript = event.results[0][0].transcript;
    console.log("🎤 Transcript:", transcript);
    setTranscript(transcript);
    setIsLoading(true);

    try {
      // Call backend API to parse transcript
      const response = await fetch(VOICE_EXPENSE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("✅ Parsed data:", data);

      // Map backend response to frontend format
      const mappedData = mapBackendToFrontend(data.parsed);
      setFormData(mappedData);

    } catch (error) {
      console.error("❌ Error parsing transcript:", error);
      alert(`❌ Failed to parse transcript: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle speech recognition errors
   */
  const handleSpeechError = (event) => {
    console.error("❌ Speech recognition error:", event.error);
    setListening(false);
    setIsLoading(false);

    if (event.error === "not-allowed") {
      alert("❌ Microphone access denied. Please allow microphone access and try again.");
    } else {
      alert(`❌ Speech recognition error: ${event.error}`);
    }
  };

  /**
   * Handle speech recognition end
   */
  const handleSpeechEnd = () => {
    console.log("🔚 Speech recognition ended");
    setListening(false);
  };

  /**
   * Map backend response to frontend format
   */
  const mapBackendToFrontend = (backendData) => {
    return {
      description: backendData.description || "",
      amount: backendData.amount || "",
      category: backendData.category || "",
      paymentMethod: backendData.mode ? backendData.mode.toLowerCase() : "",
      date: backendData.date || new Date().toISOString().slice(0, 10),
      splitWith: backendData.split_with ? backendData.split_with.join(", ") : ""
    };
  };

  /**
   * Map frontend format to backend format
   */
  const mapFrontendToBackend = (frontendData) => {
    return {
      description: frontendData.description,
      amount: parseFloat(frontendData.amount) || 0,
      category: frontendData.category,
       mode: frontendData.paymentMethod 
        ? frontendData.paymentMethod.charAt(0).toUpperCase() + frontendData.paymentMethod.slice(1).toLowerCase()
       : "",
      date: frontendData.date,
      split_with: frontendData.splitWith ? frontendData.splitWith.split(",").map(s => s.trim()).filter(s => s) : []
    };
  };

  /**
   * Start voice recording
   */
  const startRecording = () => {
    if (!recognitionRef.current) {
      alert("❌ Speech recognition not available");
      return;
    }

    try {
      setListening(true);
      setTranscript("");
      setFormData(null);
      recognitionRef.current.start();
      console.log("🎤 Started recording...");
    } catch (error) {
      console.error("❌ Error starting recording:", error);
      setListening(false);
      alert("❌ Failed to start recording. Please try again.");
    }
  };

  /**
   * Stop voice recording
   */
  const stopRecording = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      console.log("🛑 Stopped recording");
    }
  };

  /**
   * Handle form data changes
   */
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Save transaction to backend
   */
  const handleSave = async () => {
    if (!formData) {
      alert("❌ No data to save");
      return;
    }

    try {
      setIsLoading(true);
      const backendData = mapFrontendToBackend(formData);

      console.log("💾 Saving transaction:", backendData);

      const response = await fetch(TRANSACTIONS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(backendData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Transaction saved:", result);

      alert("✅ Transaction saved successfully!");
      clearForm();

      // Notify parent component to refresh data
      if (onExpenseAdded) {
        onExpenseAdded();
      }

    } catch (error) {
      console.error("❌ Error saving transaction:", error);
      alert(`❌ Failed to save transaction: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear form data
   */
  const clearForm = () => {
    setFormData(null);
    setTranscript("");
  };

  return (
    <div className="voice-recorder">
      <h2>🎤 Voice Expense Tracker</h2>

      {/* Recording Section */}
      <div className="recording-section">
        <button
          className={`record-button ${listening ? 'recording' : ''}`}
          onClick={listening ? stopRecording : startRecording}
          disabled={isLoading}
        >
          {listening ? "🛑 Stop Recording" : "🎤 Start Recording"}
        </button>

        {/* Status Messages */}
        {listening && (
          <div className="status recording">
            🎤 Listening... Speak your expense details
          </div>
        )}

        {isLoading && (
          <div className="status processing">
            <span className="loading-spinner"></span>
            Processing your speech...
          </div>
        )}

        {transcript && !isLoading && (
          <div className="status success">
            ✅ Heard: &quot;{transcript}&quot;
          </div>
        )}
      </div>

      {/* Form Section */}
      {formData && (
        <div className="expense-form">
          <h3>📝 Expense Details</h3>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              value={formData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              placeholder="What did you spend on?"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="amount">Amount (₹)</label>
              <input
                type="number"
                id="amount"
                value={formData.amount}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => handleFormChange('category', e.target.value)}
              >
                <option value="">Select category</option>
                <option value="food">🍽️ Food</option>
                <option value="groceries">🛒 Groceries</option>
                <option value="rent">🏠 Rent</option>
                <option value="travel">✈️ Travel</option>
                <option value="shopping">🛍️ Shopping</option>
                <option value="entertainment">🎬 Entertainment</option>
                <option value="health">🏥 Health</option>
                <option value="transport">🚗 Transport</option>
                <option value="other">📝 Other</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method</label>
              <select
                id="paymentMethod"
                value={formData.paymentMethod}
                onChange={(e) => handleFormChange('paymentMethod', e.target.value)}
              >
                <option value="">Select payment method</option>
                <option value="cash">💵 Cash</option>
                <option value="upi">📱 UPI</option>
                <option value="gpay">📱 Google Pay</option>
                <option value="phonepe">📱 PhonePe</option>
                <option value="card">💳 Card</option>
                <option value="netbanking">🏦 Net Banking</option>
                <option value="wallet">👛 Wallet</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => handleFormChange('date', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="splitWith">Split With </label>
            <input
              type="text"
              id="splitWith"
              value={formData.splitWith}
              onChange={(e) => handleFormChange('splitWith', e.target.value)}
              placeholder="John, Jane, Bob"
            />
          </div>

          <button
            className="save-button"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Saving...
              </>
            ) : (
              "💾 Save Transaction"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

VoiceRecorder.propTypes = {
  onExpenseAdded: PropTypes.func,
};

export default VoiceRecorder;