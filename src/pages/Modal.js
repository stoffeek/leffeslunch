import React from 'react';
import './Modal.css'; 
import pelilogo from './img/full_logo.png'; 
import receipt from './img/receipt_h1.png';
import lefflogo from './img/leffelogo.png';

const Modal = ({ orderDetails, onClose }) => {
    
    if (!orderDetails) {
        return null; 
    }

    const { id, date, name, items = [], total } = orderDetails;

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
                    <img src={receipt} alt="receipt h1" className="receipt" />
                        <p><strong>Order ID:</strong> {id}</p>
                        <p><strong>Order Date:</strong> {date}</p>
                        <p><strong>Purchaser:</strong> {name}</p>
                    </div>
                    <table className="receipt-table">
                        <thead>
                            <tr>
                                <th>Listed items</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price} SEK</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">No items found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <div className="total">
                        <strong>Total:</strong> {total} SEK
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
