import React from 'react';
import './Home.css';
import homelogo from './img/home_logo.png'; 
import slogan from './img/slogan.png'; 


function Home() {
  return (
    <div>
      <img src={homelogo} alt="Homelogo" className="fade-in homelogo" />
      <img src={slogan} alt="Slogan" className="fade-in slogan" />
    </div>
  );
}

export default Home;
