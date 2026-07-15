import React, { useState } from 'react';
import { X, CloudSnow, Flame, Star, Plane, Hotel, Compass, AlertCircle } from 'lucide-react';
import './DestinationDetailsModal.css';

export default function DestinationDetailsModal({ destination, onClose, onBook, currencySymbol, currencyFactor }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!destination) return null;

  // Render price helper
  const renderPrice = (basePriceUSD) => {
    const numericPrice = parseFloat(basePriceUSD.replace(/,/g, ''));
    const converted = Math.round(numericPrice * currencyFactor);
    return `${currencySymbol}${converted.toLocaleString()}`;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="destination-modal glass-panel fade-in-up" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Hero Gallery Area */}
        <div className="modal-gallery-hero" style={{ backgroundImage: `url(${destination.image})` }}>
          <div className="modal-gallery-overlay" />
          <div className="modal-hero-content">
            <span className="modal-hero-tag">{destination.location}</span>
            <h2 className="modal-hero-title">{destination.title}</h2>
            
            {/* Live Weather Simulator widget */}
            <div className="modal-weather-widget glass-panel">
              <CloudSnow size={18} className="weather-icon" />
              <div className="weather-info">
                <span className="weather-temp">-2°C</span>
                <span className="weather-desc">KP 5 Aurora active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="modal-tabs">
          <button 
            className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`modal-tab-btn ${activeTab === 'hotels' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotels')}
          >
            Hotels
          </button>
          <button 
            className={`modal-tab-btn ${activeTab === 'activities' ? 'active' : ''}`}
            onClick={() => setActiveTab('activities')}
          >
            Activities
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="modal-scroll-content">
          {activeTab === 'overview' && (
            <div className="overview-tab-content">
              <p className="modal-desc">
                {destination.description} Experience ultimate comfort nestled in one of the most stunning locations in the world. Enjoy direct access to private hiking tracks, private shoreline docks, and transparent stargazing roofs.
              </p>
              
              <div className="highlights-row">
                <div className="highlight-item glass-panel">
                  <Star size={16} className="highlight-icon" />
                  <div className="highlight-text">
                    <span className="highlight-label">Guest Rating</span>
                    <span className="highlight-val">{destination.rating} / 5.0</span>
                  </div>
                </div>
                <div className="highlight-item glass-panel">
                  <Flame size={16} className="highlight-icon" />
                  <div className="highlight-text">
                    <span className="highlight-label">Best Season</span>
                    <span className="highlight-val">Oct - Feb (Aurora)</span>
                  </div>
                </div>
              </div>

              <div className="inclusion-notice glass-panel">
                <AlertCircle size={18} className="notice-icon" />
                <p>Private transfers and stargazing gear are included in all bookings.</p>
              </div>
            </div>
          )}

          {activeTab === 'hotels' && (
            <div className="hotels-tab-content">
              <div className="modal-list-item glass-panel">
                <Hotel size={20} className="list-item-icon" />
                <div className="list-item-details">
                  <h4>Lofoten Aurora Glamping Domes</h4>
                  <span>Luxury eco-glamping under the stars • 5★</span>
                </div>
                <button className="list-item-action-btn" onClick={() => onBook({ type: 'Hotel', name: 'Lofoten Aurora Domes', price: destination.price, image: destination.image })}>
                  Book Dome
                </button>
              </div>

              <div className="modal-list-item glass-panel">
                <Hotel size={20} className="list-item-icon" />
                <div className="list-item-details">
                  <h4>Arctic Waterfront Chalets</h4>
                  <span>Modern glass cabins hanging over the fjord • 5★</span>
                </div>
                <button className="list-item-action-btn" onClick={() => onBook({ type: 'Chalet', name: 'Waterfront Chalet', price: (parseFloat(destination.price.replace(/,/g, '')) * 1.25).toString(), image: destination.image })}>
                  Book Chalet
                </button>
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="activities-tab-content">
              <div className="modal-list-item glass-panel">
                <Compass size={20} className="list-item-icon" />
                <div className="list-item-details">
                  <h4>Guided Glacier Ice-Trek</h4>
                  <span>Explore prehistoric ice caverns with specialized climbing gear</span>
                </div>
                <span className="list-item-meta">{renderPrice('220')} / person</span>
              </div>

              <div className="modal-list-item glass-panel">
                <Compass size={20} className="list-item-icon" />
                <div className="list-item-details">
                  <h4>Fjord Yacht & Photography Tour</h4>
                  <span>Cruise deep waters and photograph local seals, whales, and aurora reflections</span>
                </div>
                <span className="list-item-meta">{renderPrice('450')} / person</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer (Action Panel) */}
        <div className="modal-footer">
          <div className="modal-price-display">
            <span className="price-label">Starting from</span>
            <div className="price-value-container">
              <span className="price-val">{renderPrice(destination.price)}</span>
              <span className="price-unit">/pp</span>
            </div>
          </div>
          <button className="btn-primary modal-action-submit" onClick={() => onBook({ type: 'Journey', name: destination.title, price: destination.price, image: destination.image })}>
            <span>Book Journey</span>
          </button>
        </div>

      </div>
    </div>
  );
}
