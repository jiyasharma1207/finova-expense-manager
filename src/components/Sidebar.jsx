import React from "react";

function Sidebar() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">F</div>
        <span>Finova</span>
      </div>

      <nav className="sidebar-nav">
        <p className="nav-title">MAIN MENU</p>

        <button
          className="nav-item active"
          onClick={() => scrollToSection("dashboard-section")}
        >
          <span>▦</span>
          Dashboard
        </button>

        <button
          className="nav-item"
          onClick={() => scrollToSection("transactions-section")}
        >
          <span>↔</span>
          Transactions
        </button>

        <button
          className="nav-item"
          onClick={() => scrollToSection("budget-section")}
        >
          <span>◉</span>
          Budget
        </button>

        <button
          className="nav-item"
          onClick={() => scrollToSection("subscriptions-section")}
        >
          <span>◌</span>
          Subscriptions
        </button>

        <button
          className="nav-item"
          onClick={() => scrollToSection("categories-section")}
        >
          <span>▤</span>
          Reports
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <div className="upgrade-icon">✦</div>

          <h4>Smart Finance</h4>

          <p>Take control of your spending.</p>
        </div>

        <div className="user-profile">
          <div className="avatar">JS</div>

          <div>
            <strong>Jiya Sharma</strong>
            <small>Personal Account</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;