import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './History.css'; 
import leffesLogo from './img/leffelogo.png';
import orderHi from './img/order_history.png';
import Modal from './Modal'; 

const OrderHistory = () => {
    const navigate = useNavigate(); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null); 

    const orders = [
      {
        id: 1,
        date: '2024-05-06',
        name: 'Leffes Lunchlådor AB',
        total: '16208 SEK',
        status: 'Completed',
        receipts: [
          { title: "Kyckling Tikka Masala", quantity: 8, price: 256 },
          { title: "Köttbullar med kokt potatis, gräddsås och lingonsylt", quantity: 6, price: 660 },
          { title: "Lax i ugn med citron och dillsås med kokt potatis", quantity: 3, price: 100 },
          { title: "Spaghetti Carbonara", quantity: 10, price: 130 },
          { title: "Fläskfilé med gräddsås och potatisgratäng", quantity: 5, price: 700 },
          { title: "Biff med rödvinssås och rostad potatis", quantity: 10, price: 430 }, 
          { title: "Kyckling med couscous och fetaost", quantity: 5, price: 160 },
        ],
      },
      {
        id: 2,
        date: '2024-06-05',
        name: 'Leffes Lunchlådor AB',
        total: '14927 SEK',
        status: 'Completed',
        receipts: [
          { title: "Kyckling med couscous och fetaost", quantity: 10, price: 320 },
          { title: "Fläskfilé med gräddsås och potatisgratäng", quantity: 5, price: 700 },
          { title: "Köttbullar med kokt potatis, gräddsås och lingonsylt", quantity: 8, price: 880 },
          { title: "Biff med rödvinssås och rostad potatis", quantity: 3, price: 129 },
          { title: "Lax i ugn med citron och dillsås med kokt potatis", quantity: 4, price: 200 },
        ],
      },

      {
        id: 3,
        date: '2024-07-04',
        name: 'Leffes Lunchlådor AB',
        total: '14209 SEK',
        status: 'Completed',
        receipts: [
          { title: "Kyckling med couscous och fetaost", quantity: 8, price: 288 },
          { title: "Biff med rödvinssås och rostad potatis", quantity: 5, price: 215 },
          { title: "Fläskfilé med gräddsås och potatisgratäng", quantity: 4, price: 560 },
          { title: "Kyckling Tikka Masala", quantity: 10, price: 320 },
          { title: "Köttbullar med kokt potatis, gräddsås och lingonsylt", quantity: 7, price: 770 }, 
        ],
      },
      {
        id: 4,
        date: '2024-08-03',
        name: 'Leffes Lunchlådor AB',
        total: '12825 SEK',
        status: 'Completed',
        receipts: [
          { title: "Kyckling Tikka Masala", quantity: 12, price: 384 },
          { title: "Köttbullar med kokt potatis, gräddsås och lingonsylt", quantity: 6, price: 660 },
          { title: "Lax i ugn med citron och dillsås med kokt potatis", quantity: 5, price: 125 },
          { title: "Spaghetti Carbonara", quantity: 8, price: 104 },
          { title: "Fläskfilé med gräddsås och potatisgratäng", quantity: 4, price: 700 },
        ],
      },
      {
        id: 5,
        date: '2024-09-02',
        name: 'Leffes Lunchlådor AB',
        total: '12410 SEK',
        status: 'Completed',
        receipts: [
          { title: "Kyckling med couscous och fetaost", quantity: 10, price: 320 },
          { title: "Biff med rödvinssås och rostad potatis", quantity: 5, price: 215 },
          { title: "Fläskfilé med gräddsås och potatisgratäng", quantity: 7, price: 980 },
          { title: "Lax i ugn med citron och dillsås med kokt potatis", quantity: 4, price: 75 },
          { title: "Spaghetti Carbonara", quantity: 10, price: 130 },
          { title: "Leftovers - 50% - Return", quantity: 5, price: -65 },
        ],
      },
      {
        id: 6,
        date: '2024-10-01',
        name: 'Leffes Lunchlådor AB',
        total: '10827 SEK',
        status: 'Completed',
        receipts: [
          { title: "Kyckling Tikka Masala", quantity: 10, price: 320 },
          { title: "Fläskfilé med gräddsås och potatisgratäng", quantity: 6, price: 840 },
          { title: "Köttbullar med kokt potatis, gräddsås och lingonsylt", quantity: 5, price: 110 },
          { title: "Lax i ugn med citron och dillsås med kokt potatis", quantity: 8, price: 200 },
          { title: "Spaghetti Carbonara", quantity: 7, price: 91 },
          { title: "Leftovers - 50% / Return", quantity: 4, price: -50 },
        ],
      },
    ];  
  

    const handleViewDetails = (order) => {
        setSelectedOrder(order); 
        setIsModalOpen(true); 
    };

    const handleNewOrder = () => {
        navigate('/leffes/ordering'); 
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrder(null); 
    };

    return (
        <div className="OrderHistoryContainer">
            <img src={orderHi} alt="Order History" className="OrderHi" />
            <div className="HeaderRow">
                <img src={leffesLogo} alt="Leffes Lunchlådor Logo" className="LeffesLogo" />
            </div>
            <div className="OrderRow">
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
                                    onClick={() => handleViewDetails(order)} 
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
