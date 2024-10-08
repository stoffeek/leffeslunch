import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom';
import './History.css'; 
import leffesLogo from './img/leffelogo.png';
import myAccount from './img/my_account.png';
import Modal from './Modal'; // Import the Modal component

const OrderHistory = () => {
  const navigate = useNavigate(); 
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold selected order details

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

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set selected order details
    setIsModalOpen(true); // Open the modal
  };

  const handleNewOrder = () => {
    navigate('/leffes/ordering'); 
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedOrder(null); // Reset selected order
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
                  onClick={() => handleViewDetails(order)} // Pass the whole order object
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        orderDetails={selectedOrder} 
      />
    </div>
  );
};

export default OrderHistory;
