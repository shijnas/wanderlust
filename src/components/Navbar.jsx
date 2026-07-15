import React, { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar-container glass-panel">
      <div className="navbar-content">
        {/* Left: Logo */}
        <div className="logo-area">
          <a href="#" className="logo-text">WANDERLUST</a>
        </div>

        {/* Center: Menu links */}
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          <a href="#explore" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Explore</a>
          <a href="#stays" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Stays</a>
          <a href="#flights" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Flights</a>
          <a href="#deals" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Deals</a>
          <a href="#blog" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Blog</a>
          
          {/* Mobile elements */}
          <div className="mobile-only-actions">
            <button className="mobile-search-btn">
              <Search size={20} />
              <span>Search Destination</span>
            </button>
            <button className="btn-primary w-full">
              <span>Sign Up</span>
            </button>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="nav-actions">
          <button className="search-btn-icon" aria-label="Search">
            <Search size={20} />
          </button>
          <button className="btn-primary sign-up-btn">
            <span>Sign Up</span>
          </button>
          
          {/* Hamburger button */}
          <button 
            className="hamburger-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
