import React, { useState } from 'react';
import { Calendar, Map, MapPin, ChevronDown } from 'lucide-react';
import './BookingSection.css';

const LOCATIONS = [
  { id: 'lofoten', name: 'Lofoten Islands, NO', lat: 380, lng: 180, dates: '14 Oct - 21 Oct' },
  { id: 'swiss', name: 'Swiss Alps, CH', lat: 460, lng: 240, dates: '22 Oct - 29 Oct' },
  { id: 'iceland', name: 'Reykjavik, IS', lat: 310, lng: 130, dates: '02 Nov - 09 Nov' },
  { id: 'patagonia', name: 'Fitz Roy, AR', lat: 780, lng: 210, dates: '12 Dec - 19 Dec' }
];

export default function BookingSection() {
  const [selectedLoc, setSelectedLoc] = useState(LOCATIONS[0]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showMapSelect, setShowMapSelect] = useState(false);

  const selectLocation = (loc) => {
    setSelectedLoc(loc);
  };

  return (
    <section className="booking-section" id="deals">
      <div className="container">
        <div className="booking-widget glass-panel">
          
          {/* Main Grid */}
          <div className="booking-grid">
            
            {/* Left Content: Selector widgets */}
            <div className="booking-selectors">
              <h3 className="booking-widget-title">BOOK YOUR STAY</h3>
              
              {/* Datepicker field */}
              <div className="selector-field-group">
                <label className="selector-label">Datepicker</label>
                <div 
                  className="selector-box glass-panel-hover"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  <Calendar size={18} className="selector-icon" />
                  <span className="selector-value">{selectedLoc.name}</span>
                  <ChevronDown size={16} className="chevron-icon" />
                </div>
                {showDatePicker && (
                  <div className="dropdown-panel glass-panel">
                    {LOCATIONS.map(loc => (
                      <div 
                        key={loc.id} 
                        className={`dropdown-item ${selectedLoc.id === loc.id ? 'active' : ''}`}
                        onClick={() => {
                          selectLocation(loc);
                          setShowDatePicker(false);
                        }}
                      >
                        {loc.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Map view field */}
              <div className="selector-field-group">
                <label className="selector-label">Map view</label>
                <div 
                  className="selector-box glass-panel-hover"
                  onClick={() => setShowMapSelect(!showMapSelect)}
                >
                  <MapPin size={18} className="selector-icon" />
                  <span className="selector-value">{selectedLoc.dates}</span>
                  <ChevronDown size={16} className="chevron-icon" />
                </div>
                {showMapSelect && (
                  <div className="dropdown-panel glass-panel">
                    {LOCATIONS.map(loc => (
                      <div 
                        key={loc.id} 
                        className={`dropdown-item ${selectedLoc.id === loc.id ? 'active' : ''}`}
                        onClick={() => {
                          selectLocation(loc);
                          setShowMapSelect(false);
                        }}
                      >
                        {loc.dates} ({loc.name})
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button className="btn-primary w-full booking-submit-btn">
                <span>RESERVE JOURNEY</span>
              </button>
            </div>

            {/* Right Content: Interactive Map */}
            <div className="booking-map-area">
              {/* Floating map controls */}
              <div className="map-controls">
                <button className="map-view-toggle">
                  <Map size={14} />
                  <span>Map view</span>
                  <ChevronDown size={12} />
                </button>
              </div>

              {/* Futuristic SVG Map */}
              <div className="map-svg-container">
                <svg viewBox="0 0 1000 900" className="futuristic-map">
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />

                  {/* High-tech background network/sonar rings */}
                  <circle cx="500" cy="450" r="300" fill="none" stroke="rgba(0, 240, 255, 0.02)" strokeWidth="1" strokeDasharray="5 5" />
                  <circle cx="500" cy="450" r="150" fill="none" stroke="rgba(77, 255, 216, 0.02)" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Styled Continents (abstracted premium paths) */}
                  {/* North America */}
                  <path d="M 50 150 Q 150 120 220 180 T 250 350 T 200 450 T 120 500 T 50 420 Z" fill="rgba(255, 255, 255, 0.015)" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.5" />
                  {/* South America */}
                  <path d="M 180 500 Q 230 520 250 600 T 260 750 T 220 850 T 180 750 T 150 600 Z" fill="rgba(255, 255, 255, 0.015)" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.5" />
                  {/* Europe & Asia */}
                  <path d="M 320 250 Q 420 150 550 180 T 700 200 T 850 180 T 900 350 T 800 500 T 600 480 T 450 420 Z" fill="rgba(255, 255, 255, 0.015)" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.5" />
                  {/* Africa */}
                  <path d="M 400 450 Q 520 440 550 500 T 580 650 T 500 780 T 440 700 T 380 555 Z" fill="rgba(255, 255, 255, 0.015)" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1.5" />

                  {/* Connecting high-tech paths between active locations */}
                  <path d="M 180 180 Q 240 130 310 130 T 380 180 T 460 240" fill="none" stroke="rgba(0, 240, 255, 0.1)" strokeWidth="1.5" strokeDasharray="4 4" />
                  <path d="M 210 780 Q 240 600 310 130" fill="none" stroke="rgba(77, 255, 216, 0.08)" strokeWidth="1.5" strokeDasharray="4 4" />

                  {/* Map Markers */}
                  {LOCATIONS.map(loc => {
                    const isActive = selectedLoc.id === loc.id;
                    return (
                      <g 
                        key={loc.id} 
                        className={`map-marker-group ${isActive ? 'active' : ''}`}
                        onClick={() => selectLocation(loc)}
                      >
                        {/* Outer Glow Ring */}
                        <circle 
                          cx={loc.lng + 200} // adjust offset to visually align locations
                          cy={loc.lat - 150} 
                          r={isActive ? 22 : 12} 
                          className="marker-glow-ring" 
                          fill="none" 
                          stroke={isActive ? '#00F0FF' : 'rgba(77, 255, 216, 0.4)'} 
                          strokeWidth="2"
                        />
                        {/* Core Pulse */}
                        <circle 
                          cx={loc.lng + 200} 
                          cy={loc.lat - 150} 
                          r={isActive ? 8 : 5} 
                          className="marker-core" 
                          fill={isActive ? '#4DFFD8' : '#00F0FF'} 
                        />
                        
                        {/* Floating destination text tooltip */}
                        {isActive && (
                          <g className="marker-tooltip">
                            <rect 
                              x={loc.lng + 200 - 80} 
                              y={loc.lat - 150 - 48} 
                              width="160" 
                              height="30" 
                              rx="6" 
                              fill="rgba(7, 19, 30, 0.85)" 
                              stroke="rgba(0, 240, 255, 0.3)" 
                              strokeWidth="1"
                              className="tooltip-box"
                            />
                            <text 
                              x={loc.lng + 200} 
                              y={loc.lat - 150 - 28} 
                              textAnchor="middle" 
                              fill="white" 
                              fontSize="11" 
                              fontWeight="600"
                              fontFamily="Inter"
                            >
                              {loc.name.split(',')[0]}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
