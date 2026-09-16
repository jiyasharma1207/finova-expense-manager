import React from "react";

function SummaryCards({ transactions }) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => {
      return total + transaction.amount;
    }, 0);

  const totalBalance = totalIncome - totalExpenses;

  const totalSavings = totalIncome - totalExpenses;

  const cards = [
    {
      title: "Total Balance",
      amount: totalBalance,
      icon: "₹",
      type: "balance",
      description: "Current available balance",
    },
    {
      title: "Monthly Income",
      amount: totalIncome,
      icon: "↗",
      type: "income",
      description: "Total money received",
    },
    {
      title: "Monthly Expenses",
      amount: totalExpenses,
      icon: "↘",
      type: "expense",
      description: "Total money spent",
    },
    {
      title: "Monthly Savings",
      amount: totalSavings,
      icon: "◈",
      type: "saving",
      description: "Income minus expenses",
    },
  ];

  return (
    <section className="summary-cards">
      {cards.map((card) => (
        <div
          className={`summary-card ${card.type}`}
          key={card.title}
        >
          <div className="card-top">
            <div className="card-icon">
              {card.icon}
            </div>

            <span className="card-change">
              {card.type === "expense" ? "Spending" : "Updated"}
            </span>
          </div>

          <p className="card-title">
            {card.title}
          </p>

          <h2 className="card-amount">
            ₹{card.amount.toLocaleString("en-IN")}
          </h2>

          <p className="card-description">
            {card.description}
          </p>
        </div>
      ))}
    </section>
  );
}

export default SummaryCards;