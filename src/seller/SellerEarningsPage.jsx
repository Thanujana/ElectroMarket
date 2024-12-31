import React from "react";

const SellerEarningsPage = () => {
  const totalEarnings = 1500.0;
  const transactions = [
    { id: 1, date: "2023-12-31", amount: 150.0, status: "Completed" },
    { id: 2, date: "2023-12-30", amount: 90.5, status: "Pending" },
  ];

  return (
    <div>
      {/* Earnings Dashboard Section */}
      <div>
        <h1>Earnings Dashboard</h1>
        <p>Total Earnings: ${totalEarnings.toFixed(2)}</p>
        <p>Total Transactions: {transactions.length}</p>
      </div>

      {/* Transaction List Section */}
      <div>
        <h2>Transaction List</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.date}</td>
                <td>${transaction.amount.toFixed(2)}</td>
                <td>{transaction.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerEarningsPage;
