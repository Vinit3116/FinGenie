import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "./ExpenseHistory.css";
import { exportToCSV } from "../utils/exportToCSV";

const ExpenseHistoryTable = ({ onDataChange }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const API_BASE_URL = "http://localhost:8000/api";

  const CATEGORY_ICONS = {
    food: "🍽️",
    groceries: "🛒",
    rent: "🏠",
    transport: "🚗",
    shopping: "🛍️",
    entertainment: "🎬",
    healthcare: "🏥",
    travel: "✈️",
    miscellaneous: "📝",
  };

  const PAYMENT_ICONS = {
    cash: "💵",
    gpay: "📱",
    phonepe: "📱",
    paytm: "📱",
    upi: "📱",
    card: "💳",
    netbanking: "🏦",
    wallet: "👛",
  };

  // Fetch transactions and normalize payment field to `payment_mthod`
  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/transactions`);
      if (!res.ok) throw new Error("Failed to fetch transactions");

      const data = await res.json();
      const transactions = data.transactions || data || [];

      const mapping = {
        gpay: "GPay",
        "google pay": "GPay",
        googlepay: "GPay",
        phonepe: "PhonePe",
        paytm: "Paytm",
        upi: "UPI",
        card: "Card",
        debit: "Card",
        credit: "Card",
        netbanking: "NetBanking",
        "net banking": "NetBanking",
        wallet: "Wallet",
        cash: "Cash",
        bank: "NetBanking",
      };

      const normalized = transactions.map((tx) => {
        const raw =
          tx.payment_mthod ??
          tx.payment_method ??
          tx.paymentMethod ??
          tx.mode ??
          tx.method ??
          tx.payment ??
          "";

        const rawStr = String(raw || "").trim();
        const lower = rawStr.toLowerCase();

        let normalizedVal = "";
        if (rawStr) {
          for (const key of Object.keys(mapping)) {
            if (lower === key || lower.includes(key)) {
              normalizedVal = mapping[key];
              break;
            }
          }
        }
        if (!normalizedVal && rawStr) {
          normalizedVal = rawStr.charAt(0).toUpperCase() + rawStr.slice(1);
        }
        if (!normalizedVal) normalizedVal = "Cash";

        return {
          ...tx,
          payment_mthod: normalizedVal,
        };
      });

      setExpenses(normalized);
      onDataChange?.(normalized);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Unable to load expenses.");
    } finally {
      setLoading(false);
    }
  }, [onDataChange]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Filter + sort
  const processedExpenses = expenses
    .filter((exp) => {
      const matchesSearch =
        !searchTerm ||
        [exp.description, exp.category, exp.payment_mthod, exp.amount?.toString()]
          .some((f) => f?.toString().toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategory = !filterCategory || exp.category === filterCategory;
      const matchesPayment = !filterPaymentMethod || exp.payment_mthod === filterPaymentMethod;

      return matchesSearch && matchesCategory && matchesPayment;
    })
    .sort((a, b) => {
      let aVal = a[sortField],
        bVal = b[sortField];
      if (sortField === "date") {
        aVal = new Date(aVal || 0);
        bVal = new Date(bVal || 0);
      }
      if (sortField === "amount") {
        aVal = parseFloat(aVal) || 0;
        bVal = parseFloat(bVal) || 0;
      }
      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });

  const uniqueCategories = [...new Set(expenses.map((e) => e.category).filter(Boolean))];
  const uniquePayments = [...new Set(expenses.map((e) => e.payment_mthod).filter(Boolean))];

  const totalAmount = processedExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection((p) => (p === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatCurrency = (amt) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amt || 0);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" }) : "N/A";

  const getPaymentIcon = (paymentStr) => PAYMENT_ICONS[paymentStr?.toLowerCase()] || "💳";

  if (loading) return <div className="loading">⏳ Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="expense-container">
      <header className="expense-header">
        <h2>📊 Expense History ({processedExpenses.length})</h2>
      </header>

      {/* Filters & Actions */}
      <section className="filters">
        <input
          type="text"
          placeholder="🔍 Search (description, category, amount)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">📂 All Categories</option>
          {uniqueCategories.map((c) => (
            <option key={c} value={c}>
              {CATEGORY_ICONS[c?.toLowerCase()] || "📝"} {c}
            </option>
          ))}
        </select>

        <select value={filterPaymentMethod} onChange={(e) => setFilterPaymentMethod(e.target.value)}>
          <option value="">💳 All Methods</option>
          {uniquePayments.map((m) => (
            <option key={m} value={m}>
              {getPaymentIcon(m)} {m}
            </option>
          ))}
        </select>

        <button onClick={fetchExpenses}>🔄 Refresh</button>
        <button onClick={() => exportToCSV(processedExpenses)}>📤 Export CSV</button>
      </section>

      {/* Table */}
      <section className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>📝 Description</th>
              <th className="sortable" onClick={() => toggleSort("date")}>
                📅 Date {sortField === "date" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th className="sortable right" onClick={() => toggleSort("amount")}>
                💰 Amount {sortField === "amount" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th>📂 Category</th>
              <th>💳 Payment</th>
            </tr>
          </thead>

          <tbody>
            {processedExpenses.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  📭 No expenses found
                </td>
              </tr>
            ) : (
              processedExpenses.map((exp, i) => (
                <tr key={exp._id || i}>
                  <td>{exp.description || exp.category || "Expense"}</td>
                  <td>{formatDate(exp.date)}</td>
                  <td className="right">{formatCurrency(exp.amount)}</td>
                  <td>
                    {CATEGORY_ICONS[exp.category?.toLowerCase()] || "📝"} {exp.category || "—"}
                  </td>
                  <td>
                    {getPaymentIcon(exp.payment_mthod)} {exp.payment_mthod || "Cash"}
                  </td>
                </tr>
              ))
            )}
          </tbody>

          {processedExpenses.length > 0 && (
            <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td className="right total">{formatCurrency(totalAmount)}</td>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </section>
    </div>
  );
};

ExpenseHistoryTable.propTypes = {
  onDataChange: PropTypes.func,
};

export default ExpenseHistoryTable;
