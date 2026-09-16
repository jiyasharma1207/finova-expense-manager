import React, { useEffect, useState } from "react";

function Subscriptions() {
  const defaultSubscriptions = [
    {
      id: 1,
      name: "Netflix",
      plan: "Premium Plan",
      amount: 649,
      nextDate: "Sep 20",
      icon: "▶",
    },
    {
      id: 2,
      name: "Spotify",
      plan: "Individual Plan",
      amount: 119,
      nextDate: "Sep 22",
      icon: "♫",
    },
    {
      id: 3,
      name: "Amazon Prime",
      plan: "Monthly Plan",
      amount: 299,
      nextDate: "Sep 25",
      icon: "a",
    },
    {
      id: 4,
      name: "Canva",
      plan: "Pro Plan",
      amount: 499,
      nextDate: "Sep 28",
      icon: "✦",
    },
  ];

  const [subscriptions, setSubscriptions] = useState(() => {
    const savedSubscriptions =
      localStorage.getItem("finovaSubscriptions");

    return savedSubscriptions
      ? JSON.parse(savedSubscriptions)
      : defaultSubscriptions;
  });

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    plan: "",
    amount: "",
    nextDate: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "finovaSubscriptions",
      JSON.stringify(subscriptions)
    );
  }, [subscriptions]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.plan ||
      !formData.amount ||
      !formData.nextDate
    ) {
      alert("Please fill in all subscription details.");
      return;
    }

    const newSubscription = {
      id: Date.now(),
      name: formData.name,
      plan: formData.plan,
      amount: Number(formData.amount),
      nextDate: formData.nextDate,
      icon: "✦",
    };

    setSubscriptions([
      ...subscriptions,
      newSubscription,
    ]);

    setFormData({
      name: "",
      plan: "",
      amount: "",
      nextDate: "",
    });

    setShowForm(false);
  };

  const deleteSubscription = (id) => {
    const updatedSubscriptions = subscriptions.filter(
      (subscription) => subscription.id !== id
    );

    setSubscriptions(updatedSubscriptions);
  };

  const monthlyTotal = subscriptions.reduce(
    (total, subscription) =>
      total + subscription.amount,
    0
  );

  return (
    <section className="subscriptions-section">
      <div className="section-header">
        <div>
          <h2>Upcoming Subscriptions</h2>
          <p>Keep track of your recurring payments</p>
        </div>

        <button
          className="add-subscription-btn"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "+ Add Subscription"}
        </button>
      </div>

      {showForm && (
        <form
          className="subscription-form"
          onSubmit={handleSubmit}
        >
          <div className="subscription-form-group">
            <label>Service Name</label>

            <input
              type="text"
              name="name"
              placeholder="e.g. Netflix"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="subscription-form-group">
            <label>Plan</label>

            <input
              type="text"
              name="plan"
              placeholder="e.g. Premium Plan"
              value={formData.plan}
              onChange={handleChange}
            />
          </div>

          <div className="subscription-form-group">
            <label>Monthly Amount</label>

            <input
              type="number"
              name="amount"
              placeholder="e.g. 649"
              min="1"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="subscription-form-group">
            <label>Next Payment</label>

            <input
              type="text"
              name="nextDate"
              placeholder="e.g. Sep 30"
              value={formData.nextDate}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="save-subscription-btn"
          >
            Save Subscription
          </button>
        </form>
      )}

      <div className="subscriptions-card">
        <div className="subscription-summary">
          <div>
            <span>MONTHLY SUBSCRIPTIONS</span>

            <h3>
              ₹{monthlyTotal.toLocaleString("en-IN")}
            </h3>
          </div>

          <div className="subscription-count">
            <strong>{subscriptions.length}</strong>
            <small>active</small>
          </div>
        </div>

        <div className="subscription-list">
          {subscriptions.length === 0 ? (
            <div className="empty-subscriptions">
              No subscriptions added yet.
            </div>
          ) : (
            subscriptions.map((subscription) => (
              <div
                className="subscription-item"
                key={subscription.id}
              >
                <div className="subscription-info">
                  <div className="subscription-icon">
                    {subscription.icon}
                  </div>

                  <div>
                    <strong>{subscription.name}</strong>
                    <small>{subscription.plan}</small>
                  </div>
                </div>

                <div className="subscription-date">
                  <small>Next payment</small>
                  <span>{subscription.nextDate}</span>
                </div>

                <div className="subscription-price">
                  <div className="subscription-amount">
                    <strong>
                      ₹
                      {subscription.amount.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <small>/ month</small>
                  </div>

                  <button
                    className="delete-subscription-btn"
                    onClick={() =>
                      deleteSubscription(subscription.id)
                    }
                    title="Delete subscription"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Subscriptions;