import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MyAccount.css'; 
import leffesLogo from './img/leffelogo.png';
import myAccount from './img/my_account.png';

const MyAccount = () => {
  const navigate = useNavigate(); 

  const handleHistory = () => {
    navigate('/leffes/history');
  };

  const handleNewOrder = () => {
    navigate('/leffes/ordering');
  };

  const handleOverview = () => {
    navigate('/leffes/overview');
  };

  const handleSales = () => {
    navigate('/leffes/sales');
  };

  return (
    <div className="MyAccountContainer">
      <img src={myAccount} alt="My Account" className="MyAccount" />
      <div className="HeaderRow">
        <img src={leffesLogo} alt="Leffes Lunchlådor Logo" className="LeffesLogo" />
      </div>

      {/* Buttons Section */}
      <div className="ButtonContainer">
        <button className="ActionButton" onClick={handleNewOrder}>
          Place New Order
        </button>
        <button className="ActionButton" onClick={handleHistory}>
          View Order History
        </button>
        <button className="ActionButton" onClick={handleOverview}>
          Overview
        </button>
        <button className="ActionButton" onClick={handleSales}>
          Sales
        </button>
      </div>
    </div>
  );
};

export default MyAccount;
