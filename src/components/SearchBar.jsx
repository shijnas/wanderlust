import React, { useState } from 'react';
import { PlaneTakeoff, MapPin, Calendar, Users, Search } from 'lucide-react';
import './SearchBar.css';

export default function SearchBar({ filters, onSearch }) {
  const [departure, setDeparture] = useState(filters?.departure || 'Oslo, NO');
  const [destination, setDestination] = useState(filters?.destination || '');
  const [dates, setDates] = useState(filters?.dates || '14 Oct - 21 Oct');
  const [guests, setGuests] = useState(filters?.guests || '2 Adults');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ departure, destination, dates, guests });
    }
  };

  return (
    <div className="search-bar-section">
      <div className="container">
        <div className="search-card glass-panel glow-hover">
          <div className="search-card-header">
            <span className="search-section-tag">SEARCH BAR</span>
          </div>
          
          <form className="search-form" onSubmit={handleSearch}>
            {/* Departure */}
            <div className="input-group-wrapper">
              <label className="input-label">Departure</label>
              <div className="input-field-container">
                <PlaneTakeoff className="input-icon" size={18} />
                <input 
                  type="text" 
                  value={departure} 
                  onChange={(e) => setDeparture(e.target.value)} 
                  className="search-input"
                  placeholder="Where from?"
                />
              </div>
            </div>

            {/* Divider Arrow */}
            <div className="search-arrow-divider">
              <span>→</span>
            </div>

            {/* Destination */}
            <div className="input-group-wrapper">
              <label className="input-label">Destination</label>
              <div className="input-field-container">
                <MapPin className="input-icon" size={18} />
                <input 
                  type="text" 
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)} 
                  className="search-input"
                  placeholder="Where to? (e.g. Iceland, Swiss, Patagonia)"
                />
              </div>
            </div>

            {/* Dates */}
            <div className="input-group-wrapper">
              <label className="input-label">Dates</label>
              <div className="input-field-container">
                <Calendar className="input-icon" size={18} />
                <input 
                  type="text" 
                  value={dates} 
                  onChange={(e) => setDates(e.target.value)} 
                  className="search-input"
                  placeholder="Select dates"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="input-group-wrapper">
              <label className="input-label">Guests</label>
              <div className="input-field-container">
                <Users className="input-icon" size={18} />
                <input 
                  type="text" 
                  value={guests} 
                  onChange={(e) => setGuests(e.target.value)} 
                  className="search-input"
                  placeholder="How many guests?"
                />
              </div>
            </div>

            {/* Search Button */}
            <button type="submit" className="search-submit-btn">
              <span>SEARCH</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
