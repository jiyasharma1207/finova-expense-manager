import React, { useState } from "react";

function Transactions({
  transactions,
  setTransactions,
  searchTerm,
}) {
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    category: "Food & Dining",
    type: "expense",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.amount) {
      alert("Please enter transaction name and amount.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      date: "Just now",
      amount: Number(formData.amount),
      type: formData.type,
      icon: formData.type === "income" ? "💰" : "💳",
    };

    setTransactions([newTransaction, ...transactions]);

    setFormData({
      name: "",
      amount: "",
      category: "Food & Dining",
      type: "expense",
    });

    setShowForm(false);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(updatedTransactions);
  };

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const search = searchTerm.toLowerCase();

      return (
        transaction.name.toLowerCase().includes(search) ||
        transaction.category.toLowerCase().includes(search) ||
        transaction.type.toLowerCase().includes(search)
      );
    }
  );

  return (
    <section className="transactions-section">
      <div className="section-header">
        <div>
          <h2>Recent Transactions</h2>

          <p>
            {searchTerm
              ? `Showing results for "${searchTerm}"`
              : "Your latest income and expenses"}
          </p>
        </div>

        <button
          className="add-transaction-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "+ Add Transaction"}
        </button>
      </div>

      {showForm && (
        <form
          className="transaction-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label>Transaction Name</label>

            <input
              type="text"
              name="name"
              placeholder="e.g. Grocery Shopping"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Amount</label>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              min="1"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Type</label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Food & Dining</option>
              <option>Shopping</option>
              <option>Entertainment</option>
              <option>Transportation</option>
              <option>Bills</option>
              <option>Health</option>
              <option>Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="save-transaction-btn"
          >
            Save Transaction
          </button>
        </form>
      )}

      <div className="transactions-card">
        <div className="transaction-heading">
          <span>TRANSACTION</span>
          <span>CATEGORY</span>
          <span>DATE</span>
          <span>AMOUNT</span>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="empty-transactions">
            {searchTerm
              ? "No transactions found."
              : "No transactions yet."}
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div
              className="transaction-row"
              key={transaction.id}
            >
              <div className="transaction-name">
                <div className="transaction-icon">
                  {transaction.icon}
                </div>

                <div>
                  <strong>{transaction.name}</strong>
                  <small>{transaction.category}</small>
                </div>
              </div>

              <span className="transaction-category">
                {transaction.category}
              </span>

              <span className="transaction-date">
                {transaction.date}
              </span>

              <div className="transaction-actions">
                <span
                  className={`transaction-amount ${transaction.type}`}
                >
                  {transaction.type === "income" ? "+" : "-"}₹
                  {transaction.amount.toLocaleString("en-IN")}
                </span>

                <button
                  className="delete-transaction-btn"
                  onClick={() =>
                    deleteTransaction(transaction.id)
                  }
                  title="Delete transaction"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Transactions;