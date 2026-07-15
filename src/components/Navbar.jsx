import React, { useState } from 'react';
import { Search, Menu, X, Globe, DollarSign, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ 
  activeTab, 
  onTabChange, 
  currency, 
  onCurrencyChange, 
  language, 
  onLanguageChange, 
  onProfileClick 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrMenu, setShowCurrMenu] = useState(false);

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-container glass-panel">
      <div className="navbar-content">
        
        {/* Left: Logo */}
        <div className="logo-area">
          <a href="#" className="logo-text" onClick={() => handleTabClick('explore')}>WANDERLUST</a>
        </div>

        {/* Center: Navigation Menu */}
        <div className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
          {['explore', 'stays', 'flights', 'deals', 'blog'].map(tab => (
            <a 
              key={tab}
              href={`#${tab}`} 
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleTabClick(tab);
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </a>
          ))}
          
          {/* Mobile Actions Panel */}
          <div className="mobile-only-actions">
            <div className="mobile-switchers">
              <button onClick={() => onCurrencyChange(currency === 'USD' ? 'EUR' : currency === 'EUR' ? 'NOK' : 'USD')}>
                Currency: {currency}
              </button>
              <button onClick={() => onLanguageChange(language === 'EN' ? 'NO' : language === 'NO' ? 'DE' : 'EN')}>
                Language: {language}
              </button>
            </div>
            <button className="btn-primary w-full" onClick={() => { setMobileMenuOpen(false); onProfileClick(); }}>
              <User size={16} />
              <span>My Profile</span>
            </button>
          </div>
        </div>

        {/* Right: Actions and Switchers */}
        <div className="nav-actions">
          
          {/* Language Switcher */}
          <div className="switcher-dropdown-wrapper">
            <button 
              className="switcher-trigger-btn" 
              onClick={() => { setShowLangMenu(!showLangMenu); setShowCurrMenu(false); }}
              title="Change Language"
            >
              <Globe size={18} />
              <span>{language}</span>
            </button>
            {showLangMenu && (
              <div className="switcher-dropdown-list glass-panel">
                <div className="dropdown-item" onClick={() => { onLanguageChange('EN'); setShowLangMenu(false); }}>English</div>
                <div className="dropdown-item" onClick={() => { onLanguageChange('NO'); setShowLangMenu(false); }}>Norsk</div>
                <div className="dropdown-item" onClick={() => { onLanguageChange('DE'); setShowLangMenu(false); }}>Deutsch</div>
              </div>
            )}
          </div>

          {/* Currency Switcher */}
          <div className="switcher-dropdown-wrapper">
            <button 
              className="switcher-trigger-btn" 
              onClick={() => { setShowCurrMenu(!showCurrMenu); setShowLangMenu(false); }}
              title="Change Currency"
            >
              <span className="curr-symbol">{currency === 'USD' ? '$' : currency === 'EUR' ? '€' : 'kr'}</span>
              <span>{currency}</span>
            </button>
            {showCurrMenu && (
              <div className="switcher-dropdown-list glass-panel">
                <div className="dropdown-item" onClick={() => { onCurrencyChange('USD'); setShowCurrMenu(false); }}>USD ($)</div>
                <div className="dropdown-item" onClick={() => { onCurrencyChange('EUR'); setShowCurrMenu(false); }}>EUR (€)</div>
                <div className="dropdown-item" onClick={() => { onCurrencyChange('NOK'); setShowCurrMenu(false); }}>NOK (kr)</div>
              </div>
            )}
          </div>

          {/* Profile Access Button */}
          <button className="btn-primary profile-btn-pill" onClick={onProfileClick} title="Open Explorer Profile">
            <User size={16} />
            <span>Profile</span>
          </button>
          
          {/* Hamburger Menu Trigger */}
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
