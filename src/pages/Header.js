import React from 'react';
import '../css/Header.css';

function Header() {
  return (
    <header>
      <nav>
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

