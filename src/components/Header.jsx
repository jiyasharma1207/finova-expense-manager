import React, { useState } from "react";

function Header({ searchTerm, setSearchTerm }) {
  const [showNotifications, setShowNotifications] =
    useState(false);

  return (
    <header className="header">
      <div className="header-left">
        <h1>Good morning, Jiya 👋</h1>
        <p>
          Here's what's happening with your finances today.
        </p>
      </div>

      <div className="header-right">
        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="notification-wrapper">
          <button
            className="notification-btn"
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
          >
            ♧
            <span className="notification-dot"></span>
          </button>

          {showNotifications && (
            <div className="notification-menu">
              <div className="notification-header">
                <strong>Notifications</strong>

                <button
                  onClick={() =>
                    setShowNotifications(false)
                  }
                >
                  ×
                </button>
              </div>

              <div className="notification-item">
                <div className="notification-icon">₹</div>

                <div>
                  <strong>Budget reminder</strong>
                  <p>
                    Keep an eye on your monthly spending.
                  </p>
                </div>
              </div>

              <div className="notification-item">
                <div className="notification-icon">✓</div>

                <div>
                  <strong>Finova is ready</strong>
                  <p>
                    Your finance dashboard is up to date.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;