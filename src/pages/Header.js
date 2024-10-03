import React from 'react';
import logo from './img/pelican_header.png'; 
import '../pages/Header.css';

function Header() {
  return (
    <header>
      <nav>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="link">HOME</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="link">ABOUT</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="link">CONTACT</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
