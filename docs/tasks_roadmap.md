# FinGenie Project Roadmap v2.0

This document tracks all current and upcoming tasks, team assignments, priorities, and GitHub branches for the FinGenie project. Updated to reflect the v2.0 refactoring completion.

---

## ✅ **COMPLETED TASKS (v2.0 Refactoring)**

| Task ID | Task Name                               | Assigned To    | Area     | Priority  | Git Branch Name             | Status | Description                                                                         |
| ------- | --------------------------------------- | -------------- | -------- | --------- | --------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T1      | MongoDB Schema Design (Expenses)        | Vinit          | Backend  | 🔴 High   | `feature/mongo-schema`      | ✅ Done | Pydantic models with validation for Transaction and Transcript models               |
| T2      | Connect MongoDB Atlas                   | Vinit          | Backend  | 🔴 High   | `feature/mongo-connect`     | ✅ Done | Centralized database configuration with Motor async driver                          |
| T3      | POST Route: Store Parsed Expense        | Vinit          | Backend  | 🔴 High   | `feature/api-post-expense`  | ✅ Done | Consolidated transaction API with comprehensive error handling                      |
| T4      | GET Route: Fetch Expenses               | Vinit          | Backend  | 🟡 Medium | `feature/api-fetch-expense` | ✅ Done | Transaction retrieval with proper error handling and validation                     |
| T5      | Manual Entry UI Form                    | Aastha         | Frontend | 🔴 High   | `feature/manual-entry-form` | ✅ Done | Modern, responsive form with validation and professional styling                    |
| T6      | Voice Input → Preview UI Card           | Aastha         | Frontend | 🟢 Low    | `feature/voice-preview-ui`  | ✅ Done | Enhanced voice recording with loading states and error handling                     |
| T9      | Add Payment Method Dropdown             | Aastha         | Frontend | 🟡 Medium | `feature/payment-mode-ui`   | ✅ Done | Integrated payment method selection with validation                                |
| T13     | README Writeup                          | Vinit & Aastha | Docs     | 🟢 Low    | `docs/readme-final`         | ✅ Done | Comprehensive documentation with setup, usage, and troubleshooting                  |
| T14     | Code Polish & Deployment                | Vinit & Aastha | All      | 🔴 High   | `release/v2`                | ✅ Done | Complete codebase refactoring with modular architecture and documentation          |

---

## 🚀 **NEW FEATURES IMPLEMENTED (v2.0)**

| Task ID | Task Name                               | Assigned To    | Area     | Priority  | Status | Description                                                                         |
| ------- | --------------------------------------- | -------------- | -------- | --------- | ------ | ----------------------------------------------------------------------------------- |
| T15     | Smart Date Parsing                      | AI Assistant   | Backend  | 🔴 High   | ✅ Done | Multi-strategy date parsing with fallback logic for "yesterday", "today", etc.    |
| T16     | Enhanced Error Handling                 | AI Assistant   | All      | 🔴 High   | ✅ Done | Comprehensive error handling with graceful fallbacks and user feedback             |
| T17     | Modular Architecture                    | AI Assistant   | All      | 🔴 High   | ✅ Done | Clean, maintainable code structure with proper separation of concerns              |
| T18     | API Documentation                       | AI Assistant   | Backend  | 🟡 Medium | ✅ Done | Swagger/OpenAPI documentation with interactive testing interface                   |
| T19     | Modern UI/UX                            | AI Assistant   | Frontend | 🟡 Medium | ✅ Done | Professional, responsive design with Tailwind CSS and accessibility features       |
| T20     | Comprehensive Logging                   | AI Assistant   | Backend  | 🟡 Medium | ✅ Done | Detailed logging for debugging and monitoring throughout the application           |

---

## 📋 **PENDING TASKS (Future Releases)**

| Task ID | Task Name                               | Assigned To    | Area     | Priority  | Git Branch Name             | Status | Description                                                                         |
| ------- | --------------------------------------- | -------------- | -------- | --------- | --------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T7      | Expense History Table (Search + Filter) | Aastha         | Frontend | 🔴 High   | `feature/expense-table`     | To Do  | Render table with filters: date, mode, category                                     |
| T8      | Edit Expense (Frontend)                 | Aastha         | Frontend | 🟡 Medium | `feature/edit-expense-ui`   | To Do  | Edit button → open modal/form to edit existing item                                 |
| T10     | Pie Chart (Category Spend)              | Aastha         | Frontend | 🟢 Low    | `feature/pie-chart-ui`      | To Do  | Use Chart.js to render pie chart per category spend                                 |
| T11     | Bar Graph (Monthly Spend)               | Aastha         | Frontend | 🟢 Low    | `feature/bar-graph-ui`      | To Do  | Show bar chart with total per month from fetched data                               |
| T12     | CSV Export Button                       | Vinit          | Backend  | 🟢 Low    | `feature/csv-export`        | To Do  | Button triggers download of stored data as CSV                                      |
| T21     | User Authentication                     | TBD            | Backend  | 🔴 High   | `feature/auth`              | To Do  | User registration, login, and session management                                    |
| T22     | Multi-language Support                  | TBD            | All      | 🟡 Medium | `feature/i18n`              | To Do  | Hindi + English voice input and UI localization                                    |
| T23     | Advanced Analytics                      | TBD            | Frontend | 🟡 Medium | `feature/analytics`         | To Do  | Spending trends, budget tracking, and financial insights                           |
| T24     | Mobile App                              | TBD            | Mobile   | 🟢 Low    | `feature/mobile`            | To Do  | React Native or Flutter mobile application                                          |

---

## 🎯 **CURRENT FOCUS (v2.1)**

### **Immediate Priorities:**
1. **T7 - Expense History Table** - Core functionality for viewing past transactions
2. **T8 - Edit Expense Feature** - Allow users to modify existing transactions
3. **T21 - User Authentication** - Multi-user support and data security

### **Technical Debt:**
- Performance optimization for large datasets
- Enhanced testing coverage
- CI/CD pipeline setup
- Production deployment configuration

---

## 📊 **PROJECT STATUS**

### **v2.0 Completion: 100%** ✅
- ✅ Core voice-to-expense functionality
- ✅ AI-powered parsing with fallbacks
- ✅ Modern, responsive UI
- ✅ Comprehensive error handling
- ✅ Production-ready codebase
- ✅ Complete documentation

### **Next Milestone: v2.1 (Expense Management)**
- 🎯 Target: Q1 2024
- 🎯 Focus: Transaction history and editing
- 🎯 Goal: Complete expense management workflow

---

**Legend:**
- **Priority**: 🔴 High | 🟡 Medium | 🟢 Low
- **Status**: To Do | In Progress | ✅ Done

> 📝 This roadmap is actively maintained and updated with each release cycle.
