import React from "react";

function Budget({ transactions }) {
  const monthlyBudget = 27000;

  const expenseTransactions = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const totalSpent = expenseTransactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );

  const remaining = Math.max(monthlyBudget - totalSpent, 0);

  const overallPercentage = Math.min(
    Math.round((totalSpent / monthlyBudget) * 100),
    100
  );

  const categoryLimits = {
    "Food & Dining": 10000,
    Shopping: 8000,
    Entertainment: 5000,
    Transportation: 4000,
    Bills: 5000,
    Health: 5000,
    Other: 3000,
  };

  const categoryIcons = {
    "Food & Dining": "🍔",
    Shopping: "🛍",
    Entertainment: "🎬",
    Transportation: "🚗",
    Bills: "💡",
    Health: "❤️",
    Other: "📦",
  };

  const categorySpending = {};

  expenseTransactions.forEach((transaction) => {
    if (!categorySpending[transaction.category]) {
      categorySpending[transaction.category] = 0;
    }

    categorySpending[transaction.category] += transaction.amount;
  });

  const budgets = Object.entries(categoryLimits).map(
    ([name, limit]) => {
      const spent = categorySpending[name] || 0;

      return {
        name,
        spent,
        limit,
        icon: categoryIcons[name] || "📦",
      };
    }
  );

  return (
    <section className="budget-section">
      <div className="section-header">
        <div>
          <h2>Monthly Budget</h2>
          <p>Track your spending limits</p>
        </div>

        <button className="manage-budget-btn">
          Manage Budget
        </button>
      </div>

      <div className="budget-card">
        <div className="budget-summary">
          <div>
            <span className="budget-label">TOTAL SPENT</span>

            <h3>
              ₹{totalSpent.toLocaleString("en-IN")}
            </h3>

            <p>
              of ₹{monthlyBudget.toLocaleString("en-IN")} monthly
              budget
            </p>
          </div>

          <div className="budget-percentage">
            <strong>{overallPercentage}%</strong>
            <span>used</span>
          </div>
        </div>

        <div className="budget-progress">
          <div
            className="budget-progress-fill"
            style={{ width: `${overallPercentage}%` }}
          ></div>
        </div>

        <div className="budget-remaining">
          <span>
            ₹{remaining.toLocaleString("en-IN")} remaining
          </span>

          <span>{overallPercentage}% of budget</span>
        </div>

        <div className="budget-list">
          {budgets.map((budget) => {
            const percentage =
              budget.limit > 0
                ? Math.min(
                    Math.round(
                      (budget.spent / budget.limit) * 100
                    ),
                    100
                  )
                : 0;

            return (
              <div
                className="budget-item"
                key={budget.name}
              >
                <div className="budget-item-top">
                  <div className="budget-name">
                    <div className="budget-icon">
                      {budget.icon}
                    </div>

                    <div>
                      <strong>{budget.name}</strong>

                      <small>
                        ₹{budget.spent.toLocaleString("en-IN")} of ₹
                        {budget.limit.toLocaleString("en-IN")}
                      </small>
                    </div>
                  </div>

                  <span>{percentage}%</span>
                </div>

                <div className="category-progress">
                  <div
                    className="category-progress-fill"
                    style={{
                      width: `${percentage}%`,
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Budget;