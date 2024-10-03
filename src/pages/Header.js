import React from 'react';
import { Link } from 'react-router-dom'; // Importera Link från react-router-dom
import logo from './img/pelican_header.png'; 
import '../pages/Header.css';

function Header() {
  return (
    <header>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/leffes/ordering" className="link">Ordering</Link>
          </li>
          <li className="nav-item">
            <Link to="/leffes/history" className="link">History</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
