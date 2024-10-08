// Modal.js
import React from 'react';
import './Modal.css'; // Ensure to import your CSS file

const Modal = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Details</h2>
        <div className="receipt">
          <p><strong>Order ID:</strong> {orderDetails.id}</p>
          <p><strong>Order Date:</strong> {orderDetails.date}</p>
          <p><strong>Purchaser:</strong> {orderDetails.name}</p>
          <p><strong>Total:</strong> {orderDetails.total}</p>
          <p><strong>Status:</strong> {orderDetails.status}</p>
          {/* Add more details as necessary */}
        </div>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
