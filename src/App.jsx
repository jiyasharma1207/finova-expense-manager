import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import Transactions from "./components/Transactions";
import Budget from "./components/Budget";
import Categories from "./components/Categories";
import Subscriptions from "./components/Subscriptions";

function App() {
  const defaultTransactions = [
    {
      id: 1,
      name: "Swiggy",
      category: "Food & Dining",
      date: "Today, 12:30 PM",
      amount: 450,
      type: "expense",
      icon: "🍔",
    },
    {
      id: 2,
      name: "Salary",
      category: "Income",
      date: "Sep 15, 9:00 AM",
      amount: 52000,
      type: "income",
      icon: "💰",
    },
    {
      id: 3,
      name: "Netflix",
      category: "Entertainment",
      date: "Sep 14, 8:15 PM",
      amount: 649,
      type: "expense",
      icon: "▶",
    },
    {
      id: 4,
      name: "Amazon",
      category: "Shopping",
      date: "Sep 13, 4:20 PM",
      amount: 2499,
      type: "expense",
      icon: "🛍",
    },
    {
      id: 5,
      name: "Freelance Payment",
      category: "Income",
      date: "Sep 12, 11:45 AM",
      amount: 8500,
      type: "income",
      icon: "💼",
    },
  ];

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions =
      localStorage.getItem("finovaTransactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : defaultTransactions;
  });

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "finovaTransactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Header
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <div className="dashboard-content">

          {/* DASHBOARD */}
          <section id="dashboard-section">
            <SummaryCards transactions={transactions} />
          </section>

          <div className="dashboard-grid">

            {/* LEFT SIDE */}
            <div className="dashboard-left">

              {/* TRANSACTIONS */}
              <div id="transactions-section">
                <Transactions
                  transactions={transactions}
                  setTransactions={setTransactions}
                  searchTerm={searchTerm}
                />
              </div>

              {/* BUDGET */}
              <div id="budget-section">
                <Budget transactions={transactions} />
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="dashboard-right">

              {/* CATEGORIES / REPORTS */}
              <div id="categories-section">
                <Categories
                  transactions={transactions}
                />
              </div>

              {/* SUBSCRIPTIONS */}
              <div id="subscriptions-section">
                <Subscriptions />
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;