import React, { useState, useContext, useRef, useMemo } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo1.png';
import logoShort from '../../assets/logo_short.png';
import { SearchContext } from '../../contexts/SearchContext';
import { Search, X, Menu, Phone, Heart, ChevronRight } from 'lucide-react';

const BLOUSE_SUGGESTIONS = [
  'Georgette Grace', 'Emerald Elegance', 'Royal Blue Radiance',
  'Classic Charm', 'Silken Serenity', 'Chikankari Charm',
  'Mirror Work Marvel', 'Silk Heritage',
  'Georgette', 'Pure Silk', 'Kanjivaram Silk', 'Pure Cotton',
  'Satin Silk', 'Banarasi Silk', 'Chanderi Silk',
];

const NAV_LINKS = [
  { label: 'Style Buzz',   to: '/#collections'  },
  { label: 'New Arrivals', to: '/#new-arrivals'  },
  { label: 'Shop All',     to: '/blouses/all'    },
  { label: 'About Us',     to: '/#about-us'      },
  { label: 'Contact',      to: '/#contact-us'    },
];

const Navbar = () => {
  const [drawerOpen,       setDrawerOpen]       = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showSuggestions,  setShowSuggestions]  = useState(false);

  const { query, setQuery } = useContext(SearchContext || { query: '', setQuery: () => {} });
  const inputRef       = useRef(null);
  const mobileInputRef = useRef(null);
  const navigate  = useNavigate();
  const location  = useLocation();

  /* ── helpers ── */
  const isActive = (to) => {
    if (to === '/blouses/all') return location.pathname === '/blouses/all';
    return location.pathname === '/';          // hash links live on home
  };

  const suggestions = useMemo(() => {
    const q = (query || '').trim().toLowerCase();
    if (!q) return [];
    return BLOUSE_SUGGESTIONS.filter(s => s.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  const goToBlouses = () => {
    if (location.pathname !== '/blouses/all') navigate('/blouses/all');
  };

  const handleChange = (val) => {
    setQuery(val);
    setShowSuggestions(true);
    goToBlouses();
  };

  const handleSuggestion = (name) => {
    setQuery(name);
    setShowSuggestions(false);
    setMobileSearchOpen(false);
    goToBlouses();
  };

  const clearSearch = (ref) => {
    setQuery('');
    setShowSuggestions(false);
    ref?.current?.focus();
  };

  const openMobileSearch = () => {
    setMobileSearchOpen(true);
    setDrawerOpen(false);
    setTimeout(() => mobileInputRef.current?.focus(), 80);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter')  { setShowSuggestions(false); goToBlouses(); }
    if (e.key === 'Escape') { setShowSuggestions(false); setMobileSearchOpen(false); }
  };

  /* ── shared search bar component ── */
  const SearchBar = ({ refProp, extraClass = '' }) => (
    <div className={`search-bar-wrap ${extraClass}`}>
      <Search size={16} className="search-bar-icon" />
      <input
        ref={refProp}
        className="search-bar-input"
        type="text"
        placeholder="Search blouses, fabrics…"
        value={query || ''}
        onChange={e => handleChange(e.target.value)}
        onFocus={() => { setShowSuggestions(true); goToBlouses(); }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 160)}
        onKeyDown={handleKeyDown}
        aria-label="Search"
        autoComplete="off"
      />
      {query && (
        <button className="search-clear-btn" onClick={() => clearSearch(refProp)} aria-label="Clear">
          <X size={14} />
        </button>
      )}
      <button className="search-submit-btn" onClick={() => { setShowSuggestions(false); goToBlouses(); }}>
        <Search size={14} />
      </button>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map(s => {
            const q   = (query || '').trim();
            const idx = s.toLowerCase().indexOf(q.toLowerCase());
            return (
              <li key={s}>
                <button className="suggestion-item" onMouseDown={() => handleSuggestion(s)}>
                  <Search size={13} className="suggestion-icon" />
                  <span className="suggestion-text">
                    {idx === -1 ? s : (
                      <>{s.slice(0, idx)}<mark>{s.slice(idx, idx + q.length)}</mark>{s.slice(idx + q.length)}</>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="announcement-bar" role="banner">
        <div className="announcement-track">
          <span>✦ Handcrafted Blouses</span>
          <span className="ann-dot">·</span>
          <span>Custom Stitching Available</span>
          <span className="ann-dot">·</span>
          <span>Premium Indian Fabrics</span>
          <span className="ann-dot">·</span>
          <span>Temple of Blouse</span>
          <span className="ann-dot">·</span>
          <span>✦ Handcrafted Blouses</span>
          <span className="ann-dot">·</span>
          <span>Custom Stitching Available</span>
          <span className="ann-dot">·</span>
          <span>Premium Indian Fabrics</span>
          <span className="ann-dot">·</span>
          <span>Temple of Blouse</span>
        </div>
      </div>

      {/* ── Main navbar ── */}
      <nav className="navbar">

        {/* Left */}
        <div className="nav-left">
          <button
            className={`hamburger ${drawerOpen ? 'open' : ''}`}
            onClick={() => { setDrawerOpen(o => !o); setMobileSearchOpen(false); }}
            aria-label="Menu" aria-expanded={drawerOpen}
          >
            {drawerOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <ul className="nav-links desktop-only">
            {NAV_LINKS.slice(0, 3).map(({ label, to }) => (
              <li key={to}>
                <Link to={to} className={`nav-link ${isActive(to) ? 'active' : ''}`}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Center — Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Murugan Tex" className="logo-full" />
            <img src={logoShort} alt="Murugan Tex" className="logo-short" />
          </Link>
        </div>

        {/* Right */}
        <div className="nav-right">
          <div className="desktop-search-wrap">
            <SearchBar refProp={inputRef} />
          </div>

          <ul className="nav-links desktop-only">
            <li>
              <a href="tel:+919876543210" className="nav-link nav-icon-link" title="Call us">
                <Phone size={16} />
                <span>Call Us</span>
              </a>
            </li>
            <li>
              <Link to="/#contact-us" className="nav-link nav-cta-btn">Enquire Now</Link>
            </li>
          </ul>

          {/* Mobile icons */}
          <button className="icon-btn mobile-only" onClick={openMobileSearch} aria-label="Search">
            <Search size={21} />
          </button>
          <a href="tel:+919876543210" className="icon-btn mobile-only" aria-label="Call">
            <Phone size={20} />
          </a>
        </div>
      </nav>

      {/* ── Mobile search overlay ── */}
      {mobileSearchOpen && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-row">
            <SearchBar refProp={mobileInputRef} extraClass="mobile-search-bar" />
            <button className="mobile-cancel-btn" onClick={() => { setMobileSearchOpen(false); setShowSuggestions(false); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile drawer overlay ── */}
      {drawerOpen && (
        <div className="drawer-overlay" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      )}

      {/* ── Mobile slide drawer ── */}
      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <img src={logo} alt="Murugan Tex" className="drawer-logo" />
          <button className="drawer-close-btn" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-tagline">Temple of Blouse</div>

        <nav className="drawer-nav">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className={`drawer-link ${isActive(to) ? 'active' : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              <span>{label}</span>
              <ChevronRight size={16} className="drawer-chevron" />
            </Link>
          ))}
        </nav>

        <div className="drawer-footer">
          <a href="tel:+919876543210" className="drawer-call-btn">
            <Phone size={16} /> Call Us
          </a>
          <p className="drawer-foot-note">✦ Handcrafted with love</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
