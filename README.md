# FinGenie 🧞‍♂️💰

**Your Voice-Activated Finance Buddy**

A comprehensive full-stack AI-powered personal finance assistant that transforms how you track expenses. Built with modern technologies including React, FastAPI, MongoDB, and Meta's Llama 3.1 model for intelligent expense categorization.

## 🚀 Features

### 🟢 Core Features

- **🎤 Voice Input for Expense Logging** - Convert speech into structured expense data
- **🧠 LLM Categorization** - Uses Meta-Llama/Llama-3.1-8B-Instruct model to extract amount, category, date, payment mode, and splits
- **✍️ Manual Entry Option** - Fallback UI form for traditional expense entry
- **💾 MongoDB Storage** - Secure storage with timestamps, tags, and descriptions
- **📜 Expense History Table** - Filter, sort, and search expenses by date, category, or mode
- **🖊️ Manual Edit Feature** - Click-to-edit functionality for amount, mode, participants
- **💸 Payment Mode Tracking** - Support for Cash, Card, PhonePe, GPay, Wallet, and more
- **📊 Interactive Dashboard** - Category-wise pie charts, monthly bar graphs, payment mode breakdowns

### 🤝 Split & Tracker Module

- **🤝 Equal Split Expenses** - Voice command: "Split ₹900 dinner with Rahul, Sneha"
- **📂 Split Tracker Tab** - Summary of open splits, who owes you, and outstanding debts
- **🔁 Settlements Feature** - Log repayments and shared payments

### 📦 Additional Features

- **📤 Export to CSV** - Download expense data in Excel-friendly format
- **🛍️ Budget-Based Product Suggestions** - Smart recommendations based on category budgets

## 🛠️ Tech Stack

**Frontend:**

- React.js with modern hooks
- CSS3 for responsive design
- Voice recognition APIs

**Backend:**

- FastAPI (Python) - High-performance async API
- Meta-Llama/Llama-3.1-8B-Instruct - AI model for intelligent categorization
- Pydantic for data validation

**Database:**

- MongoDB - NoSQL database for flexible expense storage

**AI Integration:**

- Meta's Llama 3.1 model for natural language processing
- Voice-to-text processing for expense extraction

## 📁 Project Structure

FinGenie/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ │ └── VoiceRecorder.jsx # Voice input component
│ │ ├── App.jsx # Main application
│ │ └── main.jsx # Entry point
│ ├── package.json
│ └── package-lock.json
├── server/ # FastAPI backend
│ ├── main.py # API server
│ └── requirements.txt # Python dependencies
├── docs/ # Project documentation
│ └── PromptTuning.md # AI prompt engineering docs
├── package.json # Root package configuration
└── README.md

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

### Navigate to client directory

`cd client`

### Install dependencies

`npm install`

### Start development server

`npm start`

The React app will run on

`http://localhost:3000`

### Step 3: Backend Setup (FastAPI)

#### Navigate to server directory (from project root)

`cd server`

#### Create virtual environment

`python -m venv venv`

#### Activate virtual environment

Windows:
`venv\Scripts\activate`

Mac/Linux:
`source venv/bin/activate`

#### Install dependencies

`pip install -r requirements.txt`

#### Start FastAPI server

`python main.py`

The API server will run on `http://localhost:8000`

### Step 4: Database Setup

1. **Install MongoDB** locally or use MongoDB Atlas (cloud)
2. **Create a database** named `fingenie`
3. **Update connection string** in `server/main.py` (if needed)

### Step 5: Environment Configuration

Create a `.env` file in the `server/` directory:

`MONGODB_URL=mongodb://localhost:27017/fingenie`

`YOUR_API_KEY=your_api_key_here`

## 🎯 Usage

### Quick Start

1. **Launch both servers** (frontend on :3000, backend on :8000)
2. **Open your browser** to `http://localhost:3000`
3. **Click the microphone icon** and say: "I spent 500 rupees on groceries"
4. **Watch the magic** - FinGenie will automatically categorize and store your expense!

### Voice Commands Examples

- "Split 900 rupees dinner with Rahul and Sneha"
- "I paid 250 for coffee using GPay"
- "Spent 2000 on shopping yesterday"
- "Movie tickets cost 800 rupees for 4 people"

## 📊 API Documentation

Once the FastAPI server is running, visit:

- **Interactive API Docs**: `http://localhost:8000/docs`
- **Alternative Docs**: `http://localhost:8000/redoc`

## 🐛 Troubleshooting

### Common Issues

**Frontend won't start:**

- Ensure Node.js is installed: `node --version`
- Delete `node_modules` and run `npm install` again

**Backend errors:**

- Check Python version: `python --version`
- Ensure virtual environment is activated
- Verify MongoDB is running: `mongod --version`

**Voice recognition not working:**

- Ensure microphone permissions are granted
- Test in Chrome/Edge (recommended browsers)
- Check console for JavaScript errors

**Database connection failed:**

- Verify MongoDB is running locally or check Atlas connection string
- Ensure database credentials are correct in `.env` file

## 🛠️ Built By

**[Vinit Patel](https://github.com/Vinit3116)** & **[Aastha Patil](https://github.com/patil78)**

**Repository**: [FinGenie](https://github.com/Vinit3116/FinGenie)

---

## _Currently in development - Built with ❤️ for smarter personal finance management_
