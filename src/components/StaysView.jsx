import React, { useState } from 'react';
import { Star, ShieldAlert, Wifi, Tv, Coffee, Utensils, MapPin, Heart, Shield } from 'lucide-react';
import './StaysView.css';

const STAYS_DATA = [
  {
    id: 's1',
    title: 'Lofoten Glass Domes',
    type: 'Resort',
    location: 'Lofoten, Norway',
    rating: 4.9,
    price: 450,
    image: '/norway_aurora.jpg',
    amenities: ['wifi', 'breakfast', 'spa']
  },
  {
    id: 's2',
    title: 'Swiss Alpine Chalet',
    type: 'Cabin',
    location: 'Zermatt, Switzerland',
    rating: 5.0,
    price: 520,
    image: '/swiss_alps.jpg',
    amenities: ['wifi', 'fireplace', 'kitchen']
  },
  {
    id: 's3',
    title: 'Icelandic Black Sand Lodge',
    type: 'Villa',
    location: 'Vík, Iceland',
    rating: 4.8,
    price: 390,
    image: '/iceland_cabin.jpg',
    amenities: ['wifi', 'fireplace', 'parking']
  },
  {
    id: 's4',
    title: 'Fitz Roy Eco Geodomes',
    type: 'Camping',
    location: 'El Chaltén, Argentina',
    rating: 4.7,
    price: 320,
    image: '/patagonia_trek.jpg',
    amenities: ['hiking', 'breakfast']
  }
];

export default function StaysView({ onBookStay, wishlist, onToggleWishlist, currencySymbol, currencyFactor }) {
  const [selectedType, setSelectedType] = useState('All');
  
  const getPrice = (usd) => {
    return `${currencySymbol}${Math.round(usd * currencyFactor).toLocaleString()}`;
  };

  const filteredStays = selectedType === 'All' 
    ? STAYS_DATA 
    : STAYS_DATA.filter(s => s.type === selectedType);

  return (
    <div className="stays-view container fade-in-up">
      {/* Page Header */}
      <div className="stays-hero">
        <h1 className="stays-title">LUXURY ACCOMMODATIONS</h1>
        <p className="stays-sub">Frosted glass cabins, panoramic domes, and elite mountain chalets.</p>
      </div>

      {/* Filter Tabs */}
      <div className="stays-filters">
        {['All', 'Resort', 'Cabin', 'Villa', 'Camping'].map(type => (
          <button 
            key={type} 
            className={`filter-tab ${selectedType === type ? 'active' : ''}`}
            onClick={() => setSelectedType(type)}
          >
            {type}s
          </button>
        ))}
      </div>

      {/* Stays Grid */}
      <div className="stays-grid">
        {filteredStays.map(stay => {
          const isFav = wishlist.includes(stay.id);
          return (
            <div key={stay.id} className="stay-card glass-panel glass-glow-effect">
              <button 
                className={`stay-fav-btn ${isFav ? 'active' : ''}`}
                onClick={() => onToggleWishlist(stay.id)}
                aria-label="Add to favorites"
              >
                <Heart size={16} fill={isFav ? '#00F0FF' : 'transparent'} />
              </button>

              <div className="stay-img-wrapper">
                <img src={stay.image} alt={stay.title} className="stay-img" />
                <span className="stay-type-badge">{stay.type}</span>
              </div>

              <div className="stay-info">
                <div className="stay-rating-row">
                  <span className="stay-loc"><MapPin size={12} /> {stay.location}</span>
                  <span className="stay-rating"><Star size={12} fill="#FFD700" color="#FFD700" /> {stay.rating}</span>
                </div>
                
                <h3 className="stay-card-title">{stay.title}</h3>
                
                {/* Icons */}
                <div className="stay-amenities-icons">
                  {stay.amenities.includes('wifi') && <Wifi size={14} title="Free Wi-Fi" />}
                  {stay.amenities.includes('breakfast') && <Coffee size={14} title="Complimentary Breakfast" />}
                  {stay.amenities.includes('fireplace') && <Utensils size={14} title="Fireplace/Kitchen" />}
                </div>

                <div className="stay-card-footer">
                  <div className="stay-price">
                    <span className="stay-price-val">{getPrice(stay.price)}</span>
                    <span className="stay-price-unit">/night</span>
                  </div>
                  
                  <button 
                    className="stay-book-btn"
                    onClick={() => onBookStay({
                      name: stay.title,
                      type: 'Stay Booking',
                      price: stay.price.toString(),
                      image: stay.image
                    })}
                  >
                    Reserve
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="comparison-section">
        <h2 className="comparison-title">STAYS COMPARISON</h2>
        <div className="table-wrapper glass-panel">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Breakfast</th>
                <th>Airport Shuttle</th>
                <th>Rating</th>
                <th>Avg. Price</th>
              </tr>
            </thead>
            <tbody>
              {STAYS_DATA.map(stay => (
                <tr key={stay.id}>
                  <td className="prop-name">{stay.title}</td>
                  <td>{stay.type}</td>
                  <td>{stay.amenities.includes('breakfast') ? 'Included' : 'Add-on'}</td>
                  <td><Shield size={14} className="shuttle-check" /> Complimentary</td>
                  <td className="rating-cell">★ {stay.rating}</td>
                  <td className="price-cell">{getPrice(stay.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
