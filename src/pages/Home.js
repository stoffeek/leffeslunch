import React from 'react';
import './Home.css';
import homelogo from './img/home_logo.png'; 
import slogan from './img/slogan.png'; 


function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>
      <img src={homelogo} alt="Homelogo" className="homelogo" />
      <img src={slogan} alt="Slogan" className="fade-in slogan" />
    </div>
  );
}

export default Home;
