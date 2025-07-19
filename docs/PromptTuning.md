# 🧠 Prompt Tuning Notes – FinGenie

## ✅ Current Prompt Design Strategy

> Goal: Extract structured finance data (amount, category, mode, split names) from natural speech.

### 🔸 Prompt Components:

- Reference real date with `datetime.now()`
- Clear structure + example inputs
- Explicit output format with fallback case

### 💡 Improvements Possible Later:

- Fine-tune for date expressions like "last week", "Monday", "two days ago"
- Multilingual (Hindi + English) input parsing
- Add instructions for category normalization (e.g. 'food' = 'groceries')

---

## 🤝 Used Model: `meta-llama/llama-3.1-8b-instruct:free`

From: https://openrouter.ai

OpenRouter allows using multiple free/paid models, faster than OpenAI if throttled.
