// components/TransactionPreviewForm.jsx

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TransactionPreviewForm = ({ parsedData, onSave }) => {
  const [formData, setFormData] = useState(parsedData);

  useEffect(() => {
    setFormData(parsedData);
  }, [parsedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'split_with') {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(',').map((s) => s.trim()).filter(Boolean),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount),
      split_with: Array.isArray(formData.split_with) ? formData.split_with : [],
    };

    onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow space-y-4 bg-white mt-4">
      <h2 className="text-lg font-bold">🧾 Review & Edit Transaction</h2>

      <div>
        <label>Amount:</label>
        <input
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label>Category:</label>
        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label>Payment Mode:</label>
        <input
          name="mode"
          value={formData.mode}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label>Split With (comma-separated):</label>
        <input
          name="split_with"
          value={formData.split_with.join(', ')}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label>Date:</label>
        <input
          name="date"
          type="date"
          value={formData.date?.slice(0, 10)}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <div>
        <label>Note (optional):</label>
        <input
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="input w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ✅ Save Transaction
      </button>
    </form>
  );
};

TransactionPreviewForm.propTypes = {
  parsedData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default TransactionPreviewForm;
