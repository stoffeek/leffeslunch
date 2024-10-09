import React from 'react';
import logo from './img/pelican_header.png'; 
import '../pages/Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
          </Link>
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="link">HOME</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="link">ABOUT</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="link">CONTACT</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
