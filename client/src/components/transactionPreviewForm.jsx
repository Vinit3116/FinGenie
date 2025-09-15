// client/src/components/transactionPreviewForm.jsx

import PropTypes from "prop-types";

const TransactionPreview = ({ formData, handleChange, handleSave }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-center">🧾 Parsed Expense Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter expense description"
          />
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., food, rent, groceries"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Method
          </label>
          <input
            list="payment-methods"
            name="paymentMethod"
            value={formData.paymentMethod || ""}
            onChange={handleChange}
            placeholder="Select payment method"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <datalist id="payment-methods">
            <option value="UPI" />
            <option value="Cash" />
            <option value="GPay" />
            <option value="PhonePe" />
            <option value="Card" />
            <option value="NetBanking" />
            <option value="Wallet" />
          </datalist>
        </div>

        {/* Split With */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Split With
          </label>
          <input
            type="text"
            name="splitWith"
            value={formData.splitWith || ""}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Names separated by commas"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleSave}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          💾 Save Transaction
        </button>
      </div>
    </div>
  );
};

TransactionPreview.propTypes = {
  formData: PropTypes.shape({
    description: PropTypes.string,
    amount: PropTypes.string,
    category: PropTypes.string,
    date: PropTypes.string,
    splitWith: PropTypes.string,
    paymentMethod: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default TransactionPreview;
