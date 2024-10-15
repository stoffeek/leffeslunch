import React from 'react';
import './Modal.css'; 
import pelilogo from './img/full_logo.png'; 
import receipt from './img/receipt_h1.png';
import lefflogo from './img/leffelogo.png';

const Modal = ({ orderDetails, onClose }) => {
    if (!orderDetails) {
        return null; 
    }

    const { id, date, receipts } = orderDetails;

    // Calculate the total price of all lunchboxes in this order
    const totalPrice = receipts.reduce((sum, receipt) => sum + (receipt.price * receipt.quantity), 0);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <div className="receipt-header">
                    <img src={pelilogo} alt="Fulllogo" className="pelilogo" />
                    <img src={lefflogo} alt="Leffes Logo" className="leffLogo" />
                </div>
                <div className="receipt-body">
                    <div className="receipt-details">
                        <img src={receipt} alt="Receipt Header" className="receipt" />
                        <p><strong>Order ID:</strong> {id}</p>
                        <p><strong>Order Date:</strong> {date}</p>
                        <p><strong>Purchaser/Bill-to Name:</strong> Leffes Lunchlådor AB</p>
                    </div>
                    <table className="receipt-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Lunchbox Title</th>
                                <th>Quantity</th>
                                <th>Price (SEK)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map((receipt, index) => (
                                <tr key={index}>
                                    <td>{id}</td>
                                    <td>{date}</td>
                                    <td>{receipt.title}</td>
                                    <td>{receipt.quantity}</td>
                                    <td>{receipt.price * receipt.quantity} SEK</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="4"><strong>Total</strong></td>
                                <td><strong>{totalPrice} SEK</strong></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Modal;
