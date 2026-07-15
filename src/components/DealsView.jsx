import React, { useState, useEffect } from 'react';
import { Tag, Clock, Gift, Percent, Calendar, Heart, ShieldAlert, Sparkles } from 'lucide-react';
import './DealsView.css';

const BUNDLE_PACKAGES = [
  {
    id: 'd1',
    title: 'Arctic Stargazer Bundle',
    includes: 'Flight + Dome Stay + Aurora Hunt',
    duration: '4 Days / 3 Nights',
    rating: '4.9',
    price: '2,850',
    discount: '15% Off Included',
    image: '/norway_aurora.jpg'
  },
  {
    id: 'd2',
    title: 'Alpine Summit Package',
    includes: 'Flight + Chalet Stay + Private Ski Pass',
    duration: '5 Days / 4 Nights',
    rating: '5.0',
    price: '3,420',
    discount: 'Early Bird Benefit',
    image: '/swiss_alps.jpg'
  },
  {
    id: 'd3',
    title: 'Patagonia Glacier Explorer',
    includes: 'Flight + Dome Stay + Glacier Ice-Trek',
    duration: '6 Days / 5 Nights',
    rating: '4.8',
    price: '2,990',
    discount: 'Bundle & Save $400',
    image: '/patagonia_trek.jpg'
  }
];

export default function DealsView({ onBookDeal, currencySymbol, currencyFactor }) {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 45, seconds: 30 });
  const [copiedCode, setCopiedCode] = useState(null);

  // Countdown ticking effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 }; // reset
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getPrice = (basePriceUSD) => {
    const numeric = parseFloat(basePriceUSD.replace(/,/g, ''));
    return `${currencySymbol}${Math.round(numeric * currencyFactor).toLocaleString()}`;
  };

  const copyPromo = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="deals-view container fade-in-up">
      {/* Hero */}
      <div className="deals-hero text-center">
        <h1 className="deals-title">EXCLUSIVE VOYAGE DEALS</h1>
        <p className="deals-sub">Curated package bundles, early-bird vouchers, and limited-edition discounts.</p>
      </div>

      {/* Flash Sale Banner */}
      <div className="flash-deals-banner glass-panel">
        <div className="flash-header-glow" />
        <div className="flash-content">
          <div className="flash-left">
            <span className="flash-tag"><Sparkles size={14} /> EXTREME FLASH SALE</span>
            <h2>Get 20% off all Icelandic Cabin bookings</h2>
            <p>Applies to any stay booked between October and December. Use code <strong>AURORA20</strong>.</p>
          </div>
          <div className="flash-right">
            <div className="countdown-box">
              <span className="countdown-lbl">ENDS IN</span>
              <div className="countdown-timer">
                <div className="timer-unit">
                  <strong>{timeLeft.hours.toString().padStart(2, '0')}</strong>
                  <span>HRS</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-unit">
                  <strong>{timeLeft.minutes.toString().padStart(2, '0')}</strong>
                  <span>MIN</span>
                </div>
                <span className="timer-separator">:</span>
                <div className="timer-unit">
                  <strong>{timeLeft.seconds.toString().padStart(2, '0')}</strong>
                  <span>SEC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Package Bundles Grid */}
      <h2 className="section-title">POPULAR PACKAGE BUNDLES</h2>
      <div className="deals-grid">
        {BUNDLE_PACKAGES.map(pack => (
          <div key={pack.id} className="deal-package-card glass-panel glass-glow-effect">
            <div className="deal-img-wrapper">
              <img src={pack.image} alt={pack.title} className="deal-img" />
              <span className="deal-discount-badge">{pack.discount}</span>
            </div>
            
            <div className="deal-info">
              <span className="deal-duration">{pack.duration}</span>
              <h3>{pack.title}</h3>
              <p className="deal-includes">{pack.includes}</p>
              
              <div className="deal-card-footer">
                <div className="deal-price">
                  <span className="deal-price-val">{getPrice(pack.price)}</span>
                  <span className="deal-price-unit">/package</span>
                </div>
                <button 
                  className="deal-book-btn"
                  onClick={() => onBookDeal({
                    name: pack.title,
                    type: 'Bundle Offer',
                    price: pack.price,
                    image: pack.image
                  })}
                >
                  Book Bundle
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Promo Vouchers Panel */}
      <h2 className="section-title">PROMO CODES & VOUCHERS</h2>
      <div className="vouchers-row">
        <div className="voucher-card glass-panel">
          <div className="voucher-left">
            <Percent size={24} className="voucher-icon" />
          </div>
          <div className="voucher-right">
            <h4>10% Off All Stays</h4>
            <p>Save on any private lodge or chalet booking globally.</p>
            <button className="promo-btn" onClick={() => copyPromo('WANDER10')}>
              {copiedCode === 'WANDER10' ? 'Copied!' : 'CODE: WANDER10'}
            </button>
          </div>
        </div>

        <div className="voucher-card glass-panel">
          <div className="voucher-left">
            <Gift size={24} className="voucher-icon" />
          </div>
          <div className="voucher-right">
            <h4>$150 Resort Credit</h4>
            <p>Spend on complimentary gourmet food, yacht runs, or ski gear.</p>
            <button className="promo-btn" onClick={() => copyPromo('ELITEVIP')}>
              {copiedCode === 'ELITEVIP' ? 'Copied!' : 'CODE: ELITEVIP'}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
