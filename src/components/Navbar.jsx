import React, { useState } from 'react';
import { Search, Menu, X, Globe, DollarSign, User } from 'lucide-react';
import './Navbar.css';

const LANGUAGES = [
  { code: 'EN', name: 'English' },
  { code: 'NO', name: 'Norsk' },
  { code: 'DE', name: 'Deutsch' },
  { code: 'FR', name: 'Français' },
  { code: 'ES', name: 'Español' },
  { code: 'IT', name: 'Italiano' },
  { code: 'JA', name: '日本語' },
  { code: 'HI', name: 'हिन्दी' }
];

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'NOK', symbol: 'kr' },
  { code: 'INR', symbol: '₹' },
  { code: 'GBP', symbol: '£' },
  { code: 'JPY', symbol: '¥' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'AUD', symbol: 'A$' }
];

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

  const getCurrencySymbol = (code) => {
    const match = CURRENCIES.find(c => c.code === code);
    return match ? match.symbol : '$';
  };

  // Cycle switchers for mobile views
  const cycleCurrency = () => {
    const idx = CURRENCIES.findIndex(c => c.code === currency);
    const nextIdx = (idx + 1) % CURRENCIES.length;
    onCurrencyChange(CURRENCIES[nextIdx].code);
  };

  const cycleLanguage = () => {
    const idx = LANGUAGES.findIndex(l => l.code === language);
    const nextIdx = (idx + 1) % LANGUAGES.length;
    onLanguageChange(LANGUAGES[nextIdx].code);
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
              <button onClick={cycleCurrency}>
                Currency: {currency} ({getCurrencySymbol(currency)})
              </button>
              <button onClick={cycleLanguage}>
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
              <div className="switcher-dropdown-list glass-panel dropdown-long-list">
                {LANGUAGES.map(lang => (
                  <div 
                    key={lang.code}
                    className="dropdown-item" 
                    onClick={() => { onLanguageChange(lang.code); setShowLangMenu(false); }}
                  >
                    {lang.name}
                  </div>
                ))}
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
              <span className="curr-symbol">{getCurrencySymbol(currency)}</span>
              <span>{currency}</span>
            </button>
            {showCurrMenu && (
              <div className="switcher-dropdown-list glass-panel dropdown-long-list">
                {CURRENCIES.map(curr => (
                  <div 
                    key={curr.code}
                    className="dropdown-item" 
                    onClick={() => { onCurrencyChange(curr.code); setShowCurrMenu(false); }}
                  >
                    {curr.code} ({curr.symbol})
                  </div>
                ))}
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
