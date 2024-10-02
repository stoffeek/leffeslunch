import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import homelogo from './img/home_logo.png'; 
import slogan from './img/slogan.png'; 
import leffelogo from './img/leffelogo.png';

function Home() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/calculator');
  };

  return (
    <div>
      <img src={homelogo} alt="Homelogo" className="fade-in homelogo" />
      <img src={slogan} alt="Slogan" className="fade-in slogan" />
      <h2 className="fade-in subheader">CLIENTELE:</h2>
      <img 
        src={leffelogo} 
        alt="Leffelogo" 
        className="zoom leffelogo" 
        onClick={handleLogoClick} 
        style={{ cursor: 'pointer' }} 
      />
    </div>
  );
}

export default Home;
