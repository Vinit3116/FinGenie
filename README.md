# FinGenie 🧠💰

**Your AI-Powered Voice Finance Buddy**

A modern, full-stack AI-powered personal finance assistant that transforms how you track expenses through voice commands. Built with cutting-edge technologies including React, FastAPI, MongoDB, and Meta's Llama 3.1 model for intelligent expense parsing and categorization.

## ✨ What's New in v2.0

- **🎯 Refactored Architecture**: Clean, modular, production-ready codebase
- **📚 Comprehensive Documentation**: Self-documenting code with detailed comments
- **🛡️ Enhanced Error Handling**: Graceful fallbacks and user-friendly error messages
- **🎨 Modern UI/UX**: Responsive design with professional styling
- **⚡ Improved Performance**: Optimized API calls and better state management
- **🔧 Easy Maintenance**: Well-organized code structure for easy debugging and extension

## 🚀 Features

### 🟢 Core Features

- **🎤 Voice Input for Expense Logging** - Convert speech into structured expense data with intelligent parsing
- **🧠 AI-Powered Categorization** - Uses Meta-Llama/Llama-3.1-8B-Instruct model to extract amount, category, date, payment mode, and splits
- **📝 Smart Date Parsing** - Handles relative dates like "yesterday", "today", "tomorrow" with fallback logic
- **✍️ Manual Entry Option** - Clean, responsive UI form for traditional expense entry
- **💾 MongoDB Storage** - Secure, validated storage with comprehensive error handling
- **🔄 Real-time Processing** - Live voice-to-text with immediate AI parsing
- **💸 Payment Mode Tracking** - Support for UPI, Cash, GPay, PhonePe, Card, NetBanking, Wallet
- **🎯 Intelligent Fallbacks** - Graceful degradation when AI parsing fails

### 🤝 Split & Tracker Module

- **🤝 Equal Split Expenses** - Voice command: "Split ₹900 dinner with Rahul, Sneha"
- **📂 Split Tracking** - Automatic extraction of split participants from voice input
- **🔁 Settlement Support** - Built-in support for expense splitting and settlements

### 🛠️ Technical Features

- **📚 Self-Documenting Code** - Comprehensive comments and documentation
- **🛡️ Robust Error Handling** - Graceful fallbacks and user-friendly error messages
- **⚡ Optimized Performance** - Efficient API calls and state management
- **🎨 Modern UI/UX** - Responsive design with professional styling
- **🔧 Easy Maintenance** - Modular architecture for easy debugging and extension

## 🛠️ Tech Stack

**Frontend:**
- **React.js 18** - Modern functional components with hooks
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Web Speech API** - Native browser voice recognition
- **PropTypes** - Runtime type checking for components

**Backend:**
- **FastAPI** - High-performance async Python web framework
- **Pydantic v2** - Data validation and serialization with enhanced features
- **Motor** - Async MongoDB driver for Python
- **httpx** - Modern async HTTP client for LLM API calls
- **dateparser** - Intelligent date parsing with fallback logic

**AI Integration:**
- **Meta-Llama/Llama-3.1-8B-Instruct** - Advanced language model via OpenRouter
- **OpenRouter API** - Unified interface for multiple LLM providers
- **Custom Prompt Engineering** - Optimized prompts for expense extraction

**Database:**
- **MongoDB** - NoSQL database for flexible expense storage
- **Motor Async Driver** - High-performance async database operations

**Development:**
- **ESLint** - Code linting and quality assurance
- **Type Hints** - Python type annotations for better code clarity
- **Comprehensive Logging** - Detailed logging for debugging and monitoring

## 📁 Project Structure

```text
FinGenie/
├── client/                      # React Frontend
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── VoiceRecorder.jsx      # Main voice recording component
│   │   │   └── transactionPreviewForm.jsx  # Transaction form component
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── App.jsx              # Main app component
│   │   ├── App.css              # Global styles
│   │   ├── index.css            # Base styles
│   │   └── main.jsx             # React entry point
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
├── server/                      # FastAPI Backend
│   ├── models/
│   │   ├── transaction_model.py # Pydantic models with validation
│   │   └── transcript_model.py  # Input validation models
│   ├── routes/
│   │   ├── transactions.py      # Transaction CRUD operations
│   │   └── voice_expense.py     # Voice parsing endpoint
│   ├── utils/
│   │   └── llm_parser.py        # AI parsing logic with fallbacks
│   ├── main.py                  # FastAPI app & route registration
│   └── requirements.txt
├── config/
│   └── db.py                    # Database configuration & connection
├── docs/                        # Project documentation
│   ├── PromptTuning.md          # AI prompt engineering notes
│   └── tasks_roadmap.md         # Development roadmap
├── venv/                        # Python virtual environment
├── .env                         # Environment variables (create this)
├── .gitignore
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download here](https://python.org/)
- **MongoDB** - [Installation Guide](https://docs.mongodb.com/manual/installation/)
- **Git** - [Download here](https://git-scm.com/)

### Step 1: Clone the Repository

`git clone https://github.com/Vinit3116/FinGenie.git`

`cd FinGenie`

### Step 2: Frontend Setup (React)

Navigate to client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm run dev
```

The React app will run on `http://localhost:5173` (Vite default port)

### Step 3: Backend Setup (FastAPI)

Navigate to server directory (from project root):
```bash
cd server
```

Create virtual environment:
```bash
python -m venv venv
```

Activate virtual environment:

**Windows:**
```bash
venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Start FastAPI server:
```bash
python main.py
```

The API server will run on `http://localhost:8000`

### Step 4: Database Setup

1. **Install MongoDB** locally or use MongoDB Atlas (cloud)
2. **Create a database** named `fingenie`
3. **Update connection string** in `config/db.py` (if needed)

### Step 5: Environment Configuration

Create a `.env` file in the project root directory:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=fingenie

# OpenRouter API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**Get your OpenRouter API key:**
1. Visit [OpenRouter.ai](https://openrouter.ai)
2. Sign up and get your API key
3. Add it to your `.env` file

## 🎯 Usage

### Quick Start

1. **Launch both servers** (frontend on :5173, backend on :8000)
2. **Open your browser** to `http://localhost:5173`
3. **Click the microphone icon** and say: "I spent 500 rupees on groceries"
4. **Watch the magic** - FinGenie will automatically categorize and store your expense!

### API Endpoints

- **Voice Parsing**: `POST /api/voice-expense`
- **Save Transaction**: `POST /api/transactions`
- **Get Transactions**: `GET /api/transactions`
- **API Documentation**: `http://localhost:8000/docs`

### Voice Commands Examples

- **Basic Expense**: "I spent 500 rupees on groceries"
- **With Payment Method**: "I paid 250 for coffee using GPay"
- **With Date**: "Spent 2000 on shopping yesterday"
- **Split Expenses**: "Split 900 rupees dinner with Rahul and Sneha"
- **Complex**: "Yesterday I spent 1200 on rent in cash"

### Smart Date Parsing

FinGenie intelligently handles various date expressions:
- **Relative dates**: "yesterday", "today", "tomorrow"
- **Specific dates**: "January 15th", "last Monday"
- **Fallback**: Defaults to today if parsing fails

## 📊 API Documentation

Once the FastAPI server is running, visit:

- **Interactive API Docs**: `http://localhost:8000/docs`
- **Alternative Docs**: `http://localhost:8000/redoc`
- **Health Check**: `http://localhost:8000/health`

## 🐛 Troubleshooting

### Common Issues

**Frontend won't start:**
- Ensure Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

**Backend errors:**
- Check Python version: `python --version` (requires 3.8+)
- Ensure virtual environment is activated
- Verify MongoDB is running: `mongod --version`
- Check if port 8000 is available

**Voice recognition not working:**
- Ensure microphone permissions are granted
- Test in Chrome/Edge (recommended browsers)
- Check browser console for JavaScript errors
- Verify HTTPS is not required (localhost should work)

**AI parsing not working:**
- Verify OpenRouter API key is set in `.env` file
- Check API key has sufficient credits
- Review server logs for LLM API errors
- Fallback parsing should work if AI fails

**Database connection failed:**
- Verify MongoDB is running locally or check Atlas connection string
- Ensure database credentials are correct in `.env` file
- Check MongoDB connection string format

## 🛠️ Built By

**[Vinit Patel](https://github.com/Vinit3116)** & **[Aastha Patil](https://github.com/patil78)**

**Repository**: [FinGenie](https://github.com/Vinit3116/FinGenie)

---

## _Currently in development - Built with ❤️ for smarter personal finance management_
