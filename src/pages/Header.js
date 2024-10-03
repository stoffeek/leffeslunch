import React from 'react';
import logo from './img/pelican_header.png'; 
import '../pages/Header.css';

function Header() {
  return (
    <header>
      <nav>
        <img src={logo} alt="Logo" className="logo" />
        <ul className="nav-list">
          <li className="nav-item">
            <a href="/" className="link">Home</a>
          </li>
          <li className="nav-item">
            <a href="/about" className="link">About</a>
          </li>
          <li className="nav-item">
            <a href="/contact" className="link">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;