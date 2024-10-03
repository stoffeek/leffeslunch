import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './History.css'; // Ensure you import your CSS file
import leffesLogo from './img/leffelogo.png';
import myAccount from './img/my_account.png';

const OrderHistory = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Sample order data (this could come from your database)
  const orders = [
    {
      id: 1,
      date: '2024-06-01',
      name: 'Leffes Lunchlådor AB',
      total: '350 SEK',
      status: 'Completed',
    },
    {
      id: 2,
      date: '2024-09-25',
      name: 'Leffes Lunchlådor AB',
      total: '450 SEK',
      status: 'Pending',
    },
  ];

  const handleViewDetails = (orderId) => {
    // Implement the logic to show order details in a popup/modal
    alert(`Viewing details for order ID: ${orderId}`);
  };

  const handleNewOrder = () => {
    navigate('/leffes/ordering'); // Redirect to the ordering page
  };

  return (
    <div className="OrderHistoryContainer">
      <img src={myAccount} alt="My Account" className="MyAcc" />
      <div className="HeaderRow">
    <img src={leffesLogo} alt="Leffes Lunchlådor Logo" className="LeffesLogo" />
</div>
<div className="OrderRow">
    <h2 className="OrderHistory">ORDER HISTORY</h2>
    <button className="NewOrderButton" onClick={handleNewOrder}>
        + New Order
    </button>
</div>
      <table className="OrderTable">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Purchaser/Bill-to Name</th>
            <th>Total</th>
            <th>Order Status</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.name}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
              <td>
                <button
                  className="ViewDetailsButton"
                  onClick={() => handleViewDetails(order.id)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
