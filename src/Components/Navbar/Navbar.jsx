import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo1.png';
import { SearchContext } from '../../contexts/SearchContext';
import { Search, Mail } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { query, setQuery } = useContext(SearchContext || { query: '', setQuery: () => { } });

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <ul className="nav-side left desktop-only">
        <li><a href="#collections" className="nav-link">Style Buzz</a></li>
        <li><a href="#new-arrivals" className="nav-link">New Arrivals</a></li>
        <li><Link to="/blouses/all" className="nav-link">Shop All</Link></li>

      </ul>

        <div className="hamburger" onClick={toggleMenu} role="button" aria-label="Toggle menu">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>

      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Murugan Tex" />
        </Link>
      </div>

      <div className="mobile-search"><Search /></div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <li><a href="#collections" className="nav-link" onClick={toggleMenu}>Style Buzz</a></li>
          <li><a href="/#new-arrivals" className="nav-link" onClick={toggleMenu}>New Arrivals</a></li>
          <li><Link to="/blouses/all" className="nav-link" onClick={toggleMenu}>Shop All</Link></li>
          <li><a href="/#contact-us" className="nav-link" onClick={toggleMenu}><Mail />Contact Us</a></li>
        </div>
      )}

      <ul className="nav-side right desktop-only">
        {/* Search in navbar */}
        <li className="nav-link">
          <div className="navbar-search-wrap">
            <Search />
            <input
              className="navbar-search"
              type="search"
              placeholder="Search blouses..."
              value={query || ''}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search site"
            />
          </div>
          <div className="tab-search"><Search /></div>
        </li>
        <li><a href="#contact-us" className="nav-link"><Mail />Contact Us</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
