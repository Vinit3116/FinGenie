# FinGenie Project Roadmap

This document tracks all current and upcoming tasks, team assignments, priorities, and GitHub branches for the FinGenie project. It will be actively maintained throughout the project lifecycle.

---

| Task ID | Task Name                               | Assigned To    | Area     | Priority  | Git Branch Name             | Status | Description                                                                         |
| ------- | --------------------------------------- | -------------- | -------- | --------- | --------------------------- | ------ | ----------------------------------------------------------------------------------- |
| T1      | MongoDB Schema Design (Expenses)        | Vinit          | Backend  | 🔴 High   | `feature/mongo-schema`      | To Do  | Design Mongoose schema for storing expense fields like amount, category, mode, etc. |
| T2      | Connect MongoDB Atlas                   | Vinit          | Backend  | 🔴 High   | `feature/mongo-connect`     | To Do  | Set up secure Atlas connection and integrate with FastAPI                           |
| T3      | POST Route: Store Parsed Expense        | Vinit          | Backend  | 🔴 High   | `feature/api-post-expense`  | To Do  | Create FastAPI route to save expense from LLM                                       |
| T4      | GET Route: Fetch Expenses               | Vinit          | Backend  | 🟡 Medium | `feature/api-fetch-expense` | To Do  | Fetch all expenses for frontend display                                             |
| T5      | Manual Entry UI Form                    | Aastha         | Frontend | 🔴 High   | `feature/manual-entry-form` | To Do  | Create React form with input fields for amount, mode, category                      |
| T6      | Voice Input → Preview UI Card           | Aastha         | Frontend | 🟢 Low    | `feature/voice-preview-ui`  | To Do  | Show preview of parsed expense from voice (already initiated)                       |
| T7      | Expense History Table (Search + Filter) | Aastha         | Frontend | 🔴 High   | `feature/expense-table`     | To Do  | Render table with filters: date, mode, category                                     |
| T8      | Edit Expense (Frontend)                 | Aastha         | Frontend | 🟡 Medium | `feature/edit-expense-ui`   | To Do  | Edit button → open modal/form to edit existing item                                 |
| T9      | Add Payment Mode Dropdown               | Aastha         | Frontend | 🟡 Medium | `feature/payment-mode-ui`   | To Do  | Add select box (Cash, UPI, etc.) in manual and voice flows                          |
| T10     | Pie Chart (Category Spend)              | Aastha         | Frontend | 🟢 Low    | `feature/pie-chart-ui`      | To Do  | Use Chart.js to render pie chart per category spend                                 |
| T11     | Bar Graph (Monthly Spend)               | Aastha         | Frontend | 🟢 Low    | `feature/bar-graph-ui`      | To Do  | Show bar chart with total per month from fetched data                               |
| T12     | CSV Export Button                       | Vinit          | Backend  | 🟢 Low    | `feature/csv-export`        | To Do  | Button triggers download of stored data as CSV                                      |
| T13     | README Writeup                          | Vinit & Aastha | Docs     | 🟢 Low    | `docs/readme-final`         | To Do  | Finalize README with stack, features, setup steps                                   |
| T14     | Code Polish & Deployment                | Vinit & Aastha | All      | 🔴 High   | `release/v1`                | To Do  | Final polish + deploy frontend (Vercel), backend (Render)                           |

---

**Legend:**

- **Priority**: 🔴 High | 🟡 Medium | 🟢 Low
- **Status**: To Do | In Progress | Done

> 📝 Update this doc as tasks progress or branches are merged.
