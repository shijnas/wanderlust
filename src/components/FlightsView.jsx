import React, { useState } from 'react';
import { Plane, Users, Calendar, Award, Armchair, ChevronRight, Check } from 'lucide-react';
import './FlightsView.css';

const FLIGHTS_DATA = [
  {
    id: 'f1',
    airline: 'Nordic Sky Premium',
    logo: '🏔️',
    from: 'OSL',
    to: 'LYR',
    departure: '08:30',
    arrival: '11:15',
    duration: '2h 45m',
    class: 'Business',
    price: 380
  },
  {
    id: 'f2',
    airline: 'Aurora Airways',
    logo: '❇️',
    from: 'OSL',
    to: 'KEF',
    departure: '14:20',
    arrival: '16:05',
    duration: '2h 45m',
    class: 'First Class',
    price: 540
  },
  {
    id: 'f3',
    airline: 'Swiss Aero Luxury',
    logo: '🇨🇭',
    from: 'ZRH',
    to: 'LYR',
    departure: '10:15',
    arrival: '15:10',
    duration: '4h 55m',
    class: 'Business',
    price: 490
  }
];

export default function FlightsView({ onBookFlight, currencySymbol, currencyFactor }) {
  const [tripType, setTripType] = useState('Round Trip');
  const [selectedFlight, setSelectedFlight] = useState(FLIGHTS_DATA[0]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [cabinClass, setCabinClass] = useState('Business');

  const getPrice = (usd) => {
    return `${currencySymbol}${Math.round(usd * currencyFactor).toLocaleString()}`;
  };

  // Generate 24 cabin seats (6 rows, 4 columns: A B C D)
  const renderCabinSeats = () => {
    const rows = [1, 2, 3, 4, 5, 6];
    const cols = ['A', 'B', 'C', 'D'];
    const takenSeats = ['1B', '2D', '4A', '5C'];

    return (
      <div className="cabin-grid">
        <div className="cabin-header">CABIN SEAT SELECTOR</div>
        <div className="cabin-aisle-labels">
          <span>A</span>
          <span>B</span>
          <span className="aisle-spacer">AISLE</span>
          <span>C</span>
          <span>D</span>
        </div>
        {rows.map(row => (
          <div key={row} className="cabin-row">
            <span className="row-num">{row}</span>
            {cols.map((col, idx) => {
              const seatId = `${row}${col}`;
              const isTaken = takenSeats.includes(seatId);
              const isSelected = selectedSeat === seatId;

              return (
                <React.Fragment key={col}>
                  {idx === 2 && <div className="cabin-aisle-divider" />}
                  <button 
                    disabled={isTaken}
                    className={`cabin-seat ${isTaken ? 'taken' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedSeat(seatId)}
                    title={isTaken ? `Seat ${seatId} (Booked)` : `Seat ${seatId} (Available)`}
                  >
                    <Armchair size={16} />
                    <span className="seat-label">{seatId}</span>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
    );
  };

  const handleCheckout = () => {
    let finalPrice = selectedFlight.price;
    if (selectedSeat) {
      finalPrice += 50; // extra charge for seat reservation
    }
    onBookFlight({
      name: `${selectedFlight.airline} (${selectedFlight.from} → ${selectedFlight.to})`,
      type: `Flight - Seat ${selectedSeat || 'Auto'}`,
      price: finalPrice.toString(),
      image: '/hero_bg.jpg'
    });
  };

  return (
    <div className="flights-view container fade-in-up">
      {/* Hero Header */}
      <div className="flights-hero text-center">
        <h1 className="flights-title">PRIVATE & CHARTER FLIGHTS</h1>
        <p className="flights-sub">Direct polar charters and luxury airline partners with priority lounges.</p>
      </div>

      {/* Flight Search Selector Types */}
      <div className="flights-type-tabs">
        {['Round Trip', 'One Way', 'Multi City'].map(type => (
          <button 
            key={type} 
            className={`type-tab ${tripType === type ? 'active' : ''}`}
            onClick={() => setTripType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Main Layout Grid */}
      <div className="flights-grid-layout">
        
        {/* Left Side: Flights List */}
        <div className="flights-list-container">
          <h3 className="section-title">AVAILABLE FLIGHTS</h3>
          <div className="flights-list">
            {FLIGHTS_DATA.map(flight => (
              <div 
                key={flight.id} 
                className={`flight-item-card glass-panel ${selectedFlight.id === flight.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedFlight(flight);
                  setSelectedSeat(null); // reset seat on flight change
                }}
              >
                <div className="flight-airline-badge">
                  <span className="airline-icon">{flight.logo}</span>
                  <div>
                    <h4>{flight.airline}</h4>
                    <span>{flight.class} Class</span>
                  </div>
                </div>

                <div className="flight-timeline">
                  <div className="timeline-airport text-left">
                    <strong>{flight.departure}</strong>
                    <span>{flight.from}</span>
                  </div>
                  <div className="timeline-arrow-line">
                    <span>{flight.duration}</span>
                    <div className="arrow-bar" />
                    <Plane size={12} className="arrow-plane" />
                  </div>
                  <div className="timeline-airport text-right">
                    <strong>{flight.arrival}</strong>
                    <span>{flight.to}</span>
                  </div>
                </div>

                <div className="flight-card-footer">
                  <span className="flight-price">{getPrice(flight.price)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mini Price Calendar Trend Chart */}
          <div className="price-calendar-card glass-panel">
            <h4>Fare Price Trends (Next 7 Days)</h4>
            <div className="calendar-chart-wrapper">
              <svg viewBox="0 0 300 100" className="mini-chart">
                <path 
                  d="M 10 70 Q 50 30 90 60 T 170 20 T 250 50 T 290 30" 
                  fill="none" 
                  stroke="var(--accent-cyan)" 
                  strokeWidth="2" 
                  className="chart-path"
                />
                <circle cx="170" cy="20" r="4" fill="var(--accent-aurora)" />
                <text x="170" y="15" fill="var(--accent-aurora)" fontSize="8" fontWeight="700">Best Price</text>
              </svg>
            </div>
            <p className="calendar-tip">Prices are currently low. We recommend locking your flights today.</p>
          </div>
        </div>

        {/* Right Side: Interactive Seat Selection & Summary */}
        <div className="flights-selection-panel">
          <div className="seat-selection-card glass-panel">
            {renderCabinSeats()}
            
            <div className="seat-legend">
              <div className="legend-item"><div className="seat-sample available" /><span className="legend-lbl">Available</span></div>
              <div className="legend-item"><div className="seat-sample taken" /><span className="legend-lbl">Booked</span></div>
              <div className="legend-item"><div className="seat-sample selected" /><span className="legend-lbl">Selected</span></div>
            </div>

            {/* Selection Summary */}
            <div className="selection-checkout-summary">
              <div className="summary-row">
                <span>Selected Flight:</span>
                <strong>{selectedFlight.airline}</strong>
              </div>
              <div className="summary-row">
                <span>Cabin Seat:</span>
                <strong>{selectedSeat ? `Seat ${selectedSeat} (Preferred)` : 'Auto-assigned'}</strong>
              </div>
              <div className="summary-row">
                <span>Seat Charge:</span>
                <strong>{selectedSeat ? getPrice(50) : getPrice(0)}</strong>
              </div>
              <div className="summary-row total">
                <span>Total Fare:</span>
                <span className="total-price-val">
                  {getPrice(selectedFlight.price + (selectedSeat ? 50 : 0))}
                </span>
              </div>
              
              <button className="btn-primary w-full flight-book-btn" onClick={handleCheckout}>
                <span>Confirm Seats & Book</span>
                <ChevronRight size={16} />
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
