import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo1.png';
import { SearchContext } from '../../contexts/SearchContext';
import { Search, Mail } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { query, setQuery } = useContext(SearchContext || { query: '', setQuery: () => {} });

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <ul className="nav-side left desktop-only">
        <li><Link to="#about" className="nav-link">Style Buzz</Link></li>
        <li><Link to="#about" className="nav-link">New Arrivals</Link></li>
        <li><Link to="/blouses/all" className="nav-link">Shop All</Link></li>

      </ul>

      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Murugan Tex" />
        </Link>
      </div>

      <ul className="nav-side right desktop-only">
        {/* Search in navbar */}
        <li className="nav-link">
      <div className="navbar-search-wrap">
  <Search/>
  <input
    className="navbar-search"
    type="search"
    placeholder="Search blouses..."
    value={query || ''}
    onChange={(e) => setQuery(e.target.value)}
    aria-label="Search site"
  />
</div>
</li>
        <li><Link to="/#contact" className="nav-link"><Mail/><span>Contact Us</span></Link></li>
      </ul>

      <div className="hamburger" onClick={toggleMenu} role="button" aria-label="Toggle menu">
        <div className="bar" />
        <div className="bar" />
        <div className="bar" />
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/#about" onClick={toggleMenu}>About Us</Link>
          <Link to="/#collections" onClick={toggleMenu}>Collections</Link>
          <Link to="/#contact" onClick={toggleMenu}>Contact Us</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
