// client/src/components/Dashboard.jsx

import { useState, useEffect } from "react";
import ExpenseHistoryTable from "./ExpenseHistoryTable";
import VoiceRecorder from "./VoiceRecorder";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("voice");
    const [expenseStats, setExpenseStats] = useState({
        totalExpenses: 0,
        totalAmount: 0,
        categoryBreakdown: {},
        recentExpenses: []
    });

    // Fetch expense statistics
    const fetchExpenseStats = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/transactions');
            if (response.ok) {
                const expenses = await response.json();

                const totalAmount = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);
                const categoryBreakdown = expenses.reduce((acc, expense) => {
                    const category = expense.category || 'Other';
                    acc[category] = (acc[category] || 0) + (expense.amount || 0);
                    return acc;
                }, {});

                setExpenseStats({
                    totalExpenses: expenses.length,
                    totalAmount,
                    categoryBreakdown,
                    recentExpenses: expenses.slice(0, 5)
                });
            }
        } catch (error) {
            console.error("Error fetching expense stats:", error);
        }
    };

    useEffect(() => {
        fetchExpenseStats();
    }, []);

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(amount);
    };

    // Get category icon
    const getCategoryIcon = (category) => {
        const icons = {
            food: "🍽️",
            groceries: "🛒",
            rent: "🏠",
            travel: "✈️",
            shopping: "🛍️",
            entertainment: "🎬",
            health: "🏥",
            transport: "🚗",
            other: "📝"
        };
        return icons[category?.toLowerCase()] || "📝";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                🧠 FinGenie Dashboard
                            </h1>
                            <p className="text-gray-600 mt-1">Your AI-powered expense tracker</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Total Expenses</div>
                                <div className="text-2xl font-bold text-green-600">
                                    {formatCurrency(expenseStats.totalAmount)}
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-500">Transactions</div>
                                <div className="text-2xl font-bold text-blue-600">
                                    {expenseStats.totalExpenses}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Total Amount Card */}
                    <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">Total Spent</p>
                                <p className="text-3xl font-bold">{formatCurrency(expenseStats.totalAmount)}</p>
                            </div>
                            <div className="text-4xl opacity-80">💰</div>
                        </div>
                    </div>

                    {/* Total Transactions Card */}
                    <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">Total Transactions</p>
                                <p className="text-3xl font-bold">{expenseStats.totalExpenses}</p>
                            </div>
                            <div className="text-4xl opacity-80">📊</div>
                        </div>
                    </div>

                    {/* Average Transaction Card */}
                    <div className="bg-gradient-to-r from-purple-400 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">Average Transaction</p>
                                <p className="text-3xl font-bold">
                                    {formatCurrency(expenseStats.totalExpenses > 0 ? expenseStats.totalAmount / expenseStats.totalExpenses : 0)}
                                </p>
                            </div>
                            <div className="text-4xl opacity-80">📈</div>
                        </div>
                    </div>

                    {/* Categories Card */}
                    <div className="bg-gradient-to-r from-orange-400 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-orange-100 text-sm font-medium">Categories</p>
                                <p className="text-3xl font-bold">{Object.keys(expenseStats.categoryBreakdown).length}</p>
                            </div>
                            <div className="text-4xl opacity-80">🏷️</div>
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                {Object.keys(expenseStats.categoryBreakdown).length > 0 && (
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            📊 Category Breakdown
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(expenseStats.categoryBreakdown)
                                .sort(([, a], [, b]) => b - a)
                                .map(([category, amount]) => (
                                    <div key={category} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <span className="text-2xl mr-3">{getCategoryIcon(category)}</span>
                                            <span className="font-medium text-gray-900">{category}</span>
                                        </div>
                                        <span className="font-bold text-green-600">
                                            {formatCurrency(amount)}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="bg-white rounded-xl shadow-lg mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab("voice")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "voice"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                🎤 Voice Input
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === "history"
                                    ? "border-blue-500 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                    }`}
                            >
                                📊 Expense History
                            </button>
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === "voice" && (
                            <div>
                                <VoiceRecorder onExpenseAdded={fetchExpenseStats} />
                            </div>
                        )}
                        {activeTab === "history" && (
                            <div>
                                <ExpenseHistoryTable onDataChange={fetchExpenseStats} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
