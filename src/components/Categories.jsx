import React from "react";

function Categories({ transactions }) {
  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalSpending = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const categoryIcons = {
    "Food & Dining": "🍔",
    Shopping: "🛍",
    Transportation: "🚗",
    Entertainment: "🎬",
    Bills: "💡",
    Health: "❤️",
    Other: "📦",
  };

  const categoryTotals = {};

  expenseTransactions.forEach((transaction) => {
    if (!categoryTotals[transaction.category]) {
      categoryTotals[transaction.category] = 0;
    }

    categoryTotals[transaction.category] += transaction.amount;
  });

  const categories = Object.entries(categoryTotals)
    .map(([name, amount]) => ({
      name,
      amount,
      percentage:
        totalSpending > 0
          ? Math.round((amount / totalSpending) * 100)
          : 0,
      icon: categoryIcons[name] || "📦",
    }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <section className="categories-section">
      <div className="section-header">
        <div>
          <h2>Spending by Category</h2>
          <p>See where your money is going</p>
        </div>

        <select className="category-filter">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      <div className="categories-card">
        <div className="category-total">
          <div>
            <span>Total Spending</span>
            <h3>₹{totalSpending.toLocaleString("en-IN")}</h3>
          </div>

          <div className="category-chart">
            <div className="chart-inner">
              <strong>100%</strong>
              <span>Total</span>
            </div>
          </div>
        </div>

        <div className="category-list">
          {categories.length === 0 ? (
            <p className="empty-categories">
              No expense data available.
            </p>
          ) : (
            categories.map((category) => (
              <div
                className="category-item"
                key={category.name}
              >
                <div className="category-item-left">
                  <div className="category-item-icon">
                    {category.icon}
                  </div>

                  <div>
                    <strong>{category.name}</strong>
                    <small>
                      {category.percentage}% of spending
                    </small>
                  </div>
                </div>

                <span className="category-amount">
                  ₹{category.amount.toLocaleString("en-IN")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Categories;