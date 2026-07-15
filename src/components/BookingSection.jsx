import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Map, MapPin, ChevronDown, Compass, Search, Navigation, CloudSun, Loader2, Sparkles, Sliders } from 'lucide-react';
import './BookingSection.css';

// Extended destinations for search autocomplete and routing
const DESTINATIONS = {
  'lofoten islands': { name: 'Lofoten Islands, Norway', lat: 68.0, lng: 13.5, temp: '-2°C', weather: 'KP 5 Aurora', price: 450, hotel: 'Lofoten Dome Resorts' },
  'swiss alps': { name: 'Swiss Alps, Switzerland', lat: 46.0, lng: 7.7, temp: '3°C', weather: 'Sunny Snow', price: 520, hotel: 'Zermatt Summit Chalet' },
  'patagonia': { name: 'Patagonia, Argentina', lat: -49.3, lng: -72.9, temp: '8°C', weather: 'Windy Clouds', price: 320, hotel: 'Fitz Roy Eco-Domes' },
  'norway': { name: 'Tromsø, Norway', lat: 69.6, lng: 18.9, temp: '-4°C', weather: 'Aurora Active', price: 490, hotel: 'Arctic Water Chalets' },
  'iceland': { name: 'Reykjavik, Iceland', lat: 64.1, lng: -21.8, temp: '1°C', weather: 'Light Snow', price: 390, hotel: 'Black Sand Lodge' },
  'tokyo': { name: 'Tokyo, Japan', lat: 35.6, lng: 139.6, temp: '22°C', weather: 'Clear Sky', price: 650, hotel: 'The Peninsula Tokyo' },
  'bali': { name: 'Bali, Indonesia', lat: -8.4, lng: 115.1, temp: '28°C', weather: 'Tropical Sunny', price: 410, hotel: 'Ubud Hanging Gardens' }
};

export default function BookingSection({ onBook, currencySymbol = '$', currencyFactor = 1.0 }) {
  const [searchVal, setSearchVal] = useState('Lofoten Islands');
  const [activeDest, setActiveDest] = useState(DESTINATIONS['lofoten islands']);
  const [checkIn, setCheckIn] = useState('2026-10-14');
  const [checkOut, setCheckOut] = useState('2026-10-21');
  const [guests, setGuests] = useState('2 Adults');
  const [roomType, setRoomType] = useState('Luxury Suite');
  const [budget, setBudget] = useState(3000);
  const [travelStyle, setTravelStyle] = useState('Romantic');
  
  // Map and AI filters
  const [activeFilters, setActiveFilters] = useState(['Hotels', 'Attractions']);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiPlanning, setIsAiPlanning] = useState(false);
  const [selectedRouteMode, setSelectedRouteMode] = useState('driving');
  
  // Real Maps API load status
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapsError, setMapsError] = useState(false);
  
  const mapRef = useRef(null);
  const googleMapObj = useRef(null);
  const markersRef = useRef([]);

  // Convert prices dynamically
  const formatPrice = (usd) => {
    return `${currencySymbol}${Math.round(usd * currencyFactor).toLocaleString()}`;
  };

  // Autocomplete search suggestions
  const [suggestions, setSuggestions] = useState([]);
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchVal(val);
    if (val.length > 1) {
      const filtered = Object.keys(DESTINATIONS).filter(k => k.includes(val.toLowerCase()));
      setSuggestions(filtered.map(k => DESTINATIONS[k]));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (dest) => {
    setSearchVal(dest.name);
    setActiveDest(dest);
    setSuggestions([]);
    if (googleMapObj.current) {
      const newPos = { lat: dest.lat, lng: dest.lng };
      googleMapObj.current.panTo(newPos);
      googleMapObj.current.setZoom(10);
      recreateMarkers(dest);
    }
  };

  // Google Maps Loader
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      setMapsError(true);
      return;
    }

    // Dynamic Google script injection
    const scriptId = 'google-maps-script';
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,directions`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsMapLoaded(true);
        initGoogleMap();
      };
      script.onerror = () => {
        setMapsError(true);
      };
      document.head.appendChild(script);
    } else if (window.google && window.google.maps) {
      setIsMapLoaded(true);
      initGoogleMap();
    }
  }, []);

  const initGoogleMap = () => {
    if (!mapRef.current) return;
    
    // Custom premium Dark theme style for maps
    const darkThemeStyle = [
      { elementType: "geometry", stylers: [{ color: "#07131E" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#07131E" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#B5C2D0" }] },
      { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#2B8FFF", opacity: 0.1 }] },
      { featureType: "water", elementType: "geometry", stylers: [{ color: "#030a10" }] },
      { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#2B8FFF" }] },
      { featureType: "road", elementType: "geometry", stylers: [{ color: "#122536" }] },
      { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#1b354d" }] },
      { featureType: "poi", stylers: [{ visibility: "off" }] }
    ];

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: activeDest.lat, lng: activeDest.lng },
      zoom: 8,
      styles: darkThemeStyle,
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      scaleControl: true,
      streetViewControl: true,
      rotateControl: true,
      fullscreenControl: true
    });

    googleMapObj.current = map;
    recreateMarkers(activeDest);
  };

  const recreateMarkers = (dest) => {
    if (!googleMapObj.current) return;

    // Clear old markers
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    // Main Destination marker
    const destMarker = new window.google.maps.Marker({
      position: { lat: dest.lat, lng: dest.lng },
      map: googleMapObj.current,
      title: dest.name,
      animation: window.google.maps.Animation.DROP
    });

    const infoWindow = new window.google.maps.InfoWindow({
      content: `
        <div style="background:#07131E; color:white; padding:12px; border-radius:12px; font-family:Inter; max-width:200px;">
          <h4 style="margin:0 0 6px 0; font-family:Space Grotesk;">${dest.name}</h4>
          <p style="margin:0 0 8px 0; font-size:12px; color:#B5C2D0;">Starting rate: $${dest.price}/night</p>
          <p style="margin:0; font-size:11px; color:#00F0FF;">Live weather: ${dest.temp} (${dest.weather})</p>
        </div>
      `
    });

    destMarker.addListener('click', () => {
      infoWindow.open(googleMapObj.current, destMarker);
    });

    markersRef.current.push(destMarker);
  };

  const handleFilterToggle = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(prev => prev.filter(f => f !== filter));
    } else {
      setActiveFilters(prev => [...prev, filter]);
    }
  };

  // AI Assistant Map Auto-Planner
  const handleAiPlan = (e) => {
    e.preventDefault();
    if (!aiPrompt) return;
    setIsAiPlanning(true);
    
    setTimeout(() => {
      setIsAiPlanning(false);
      
      // Smart prompt matching
      let match = DESTINATIONS['norway'];
      if (aiPrompt.toLowerCase().includes('japan') || aiPrompt.toLowerCase().includes('tokyo')) {
        match = DESTINATIONS['tokyo'];
      } else if (aiPrompt.toLowerCase().includes('swiss') || aiPrompt.toLowerCase().includes('alps')) {
        match = DESTINATIONS['swiss alps'];
      } else if (aiPrompt.toLowerCase().includes('bali')) {
        match = DESTINATIONS['bali'];
      } else if (aiPrompt.toLowerCase().includes('iceland')) {
        match = DESTINATIONS['iceland'];
      } else if (aiPrompt.toLowerCase().includes('patagonia')) {
        match = DESTINATIONS['patagonia'];
      }
      
      setSearchVal(match.name);
      setActiveDest(match);
      setTravelStyle('Romantic');
      setGuests('2 Adults');
      
      if (googleMapObj.current) {
        googleMapObj.current.panTo({ lat: match.lat, lng: match.lng });
        googleMapObj.current.setZoom(9);
        recreateMarkers(match);
      }
    }, 1500);
  };

  const handleReserve = () => {
    onBook({
      name: `${activeDest.name} (${roomType})`,
      type: `${travelStyle} Experience Package`,
      price: activeDest.price.toString(),
      image: activeDest.name.includes('Lofoten') || activeDest.name.includes('Norway') 
        ? '/norway_aurora.jpg' 
        : activeDest.name.includes('Alps') 
        ? '/swiss_alps.jpg'
        : activeDest.name.includes('Patagonia')
        ? '/patagonia_trek.jpg'
        : '/iceland_cabin.jpg'
    });
  };

  return (
    <section className="booking-section" id="deals">
      <div className="container">
        
        {/* Filter chips above map dashboard */}
        <div className="map-filter-chips">
          {['Hotels', 'Resorts', 'Cabins', 'Villas', 'Restaurants', 'Attractions', 'Hiking', 'Beaches', 'Airports'].map(filter => {
            const isActive = activeFilters.includes(filter);
            return (
              <button 
                key={filter} 
                className={`filter-chip ${isActive ? 'active' : ''}`}
                onClick={() => handleFilterToggle(filter)}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="booking-widget glass-panel">
          <div className="booking-grid">
            
            {/* Left Panel: Autocomplete & parameters input */}
            <div className="booking-selectors">
              <h3 className="booking-widget-title">BOOK YOUR STAY</h3>
              
              {/* Destination Google Places Autocomplete */}
              <div className="selector-field-group">
                <label className="selector-label">Destination search</label>
                <div className="search-input-wrapper">
                  <Search size={16} className="search-icon" />
                  <input 
                    type="text" 
                    value={searchVal}
                    onChange={handleSearchChange}
                    placeholder="Search destination (e.g. Lofoten, Swiss Alps...)" 
                    className="map-search-input"
                  />
                  {suggestions.length > 0 && (
                    <div className="autocomplete-suggestions glass-panel">
                      {suggestions.map((dest, i) => (
                        <div 
                          key={i} 
                          className="suggestion-item" 
                          onClick={() => handleSelectSuggestion(dest)}
                        >
                          <MapPin size={12} className="suggestion-icon" />
                          <span>{dest.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="form-row">
                <div className="selector-field-group flex-1">
                  <label className="selector-label">Check-In</label>
                  <input 
                    type="date" 
                    value={checkIn} 
                    onChange={(e) => setCheckIn(e.target.value)} 
                    className="date-input-field" 
                  />
                </div>
                <div className="selector-field-group flex-1">
                  <label className="selector-label">Check-Out</label>
                  <input 
                    type="date" 
                    value={checkOut} 
                    onChange={(e) => setCheckOut(e.target.value)} 
                    className="date-input-field" 
                  />
                </div>
              </div>

              {/* Guests and Room Type */}
              <div className="form-row">
                <div className="selector-field-group flex-1">
                  <label className="selector-label">Guests</label>
                  <div className="select-dropdown-container">
                    <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                      <option value="1 Adult">1 Adult</option>
                      <option value="2 Adults">2 Adults</option>
                      <option value="3 Adults">3 Adults</option>
                      <option value="4 Adults">4 Family</option>
                    </select>
                  </div>
                </div>
                
                <div className="selector-field-group flex-1">
                  <label className="selector-label">Room Type</label>
                  <div className="select-dropdown-container">
                    <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                      <option value="Luxury Suite">Luxury Suite</option>
                      <option value="A-Frame Chalet">A-Frame Chalet</option>
                      <option value="Glass Dome Dome">Glass Dome Dome</option>
                      <option value="Eco Cabin Lodge">Eco Cabin Lodge</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Budget slider */}
              <div className="selector-field-group">
                <div className="budget-label-row">
                  <label className="selector-label">Budget range</label>
                  <span className="budget-val-indicator">{formatPrice(budget)} max</span>
                </div>
                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="250" 
                  value={budget} 
                  onChange={(e) => setBudget(parseInt(e.target.value))} 
                  className="budget-slider"
                />
              </div>

              {/* Travel Style */}
              <div className="selector-field-group">
                <label className="selector-label">Travel Style</label>
                <div className="travel-styles-grid">
                  {['Solo', 'Romantic', 'Adventure', 'Family'].map(style => (
                    <button 
                      key={style}
                      className={`style-btn ${travelStyle === style ? 'active' : ''}`}
                      onClick={() => setTravelStyle(style)}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Auto-Itinerary search box */}
              <div className="ai-map-planner-bar">
                <form onSubmit={handleAiPlan} className="ai-map-search-form">
                  <Sparkles size={14} className="ai-mini-spark" />
                  <input 
                    type="text" 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="AI: e.g. romantic getaway in Japan..." 
                    className="ai-map-input"
                  />
                  <button type="submit" className="ai-map-go-btn" disabled={isAiPlanning}>
                    {isAiPlanning ? <Loader2 size={12} className="spinner-icon" /> : 'Plot'}
                  </button>
                </form>
              </div>

              <button className="btn-primary w-full booking-submit-btn" onClick={handleReserve}>
                <span>RESERVE JOURNEY</span>
              </button>
            </div>

            {/* Right Panel: Interactive Maps container */}
            <div className="booking-map-area">
              
              {/* Google Maps Container */}
              <div 
                ref={mapRef} 
                className="google-map-element" 
                style={{ width: '100%', height: '100%' }}
              />

              {/* Fallback mock map details displayed when API key is missing */}
              {mapsError && (
                <div className="fallback-map-overlay glass-panel">
                  {/* Grid Lines background */}
                  <div className="fallback-grid" />
                  
                  {/* Glowing Sonar Circles */}
                  <div className="radar-ripple ripple-1" />
                  <div className="radar-ripple ripple-2" />

                  {/* Connecting Route lines simulation */}
                  <svg className="fallback-svg-routes" viewBox="0 0 600 400">
                    <path 
                      d="M 120 180 Q 220 100 350 140 T 480 200" 
                      fill="none" 
                      stroke="var(--accent-cyan)" 
                      strokeWidth="2" 
                      strokeDasharray="5 5" 
                      className="draw-route-path"
                    />
                  </svg>

                  {/* Pulse Location Markers */}
                  <div className="fallback-marker active" style={{ left: '45%', top: '35%' }}>
                    <div className="pulsing-marker-core" />
                    <div className="pulsing-marker-ring" />
                    <span className="marker-name-lbl">{activeDest.name}</span>
                  </div>

                  {/* Fallback control bar */}
                  <div className="fallback-badge-notice">
                    <span>Google Maps API Offline • Interactive Simulated Mode</span>
                  </div>
                </div>
              )}

              {/* Floating Slide-in Info Card (glass effect) */}
              <div className="map-info-slide-card glass-panel fade-in-up">
                <img 
                  src={
                    activeDest.name.includes('Lofoten') || activeDest.name.includes('Norway') 
                      ? '/norway_aurora.jpg' 
                      : activeDest.name.includes('Alps') 
                      ? '/swiss_alps.jpg'
                      : activeDest.name.includes('Patagonia')
                      ? '/patagonia_trek.jpg'
                      : '/iceland_cabin.jpg'
                  } 
                  alt={activeDest.name} 
                  className="info-card-img" 
                />
                
                <div className="info-card-details">
                  <div className="card-top-row">
                    <span className="card-lbl-tag">{activeDest.weather}</span>
                    <span className="card-lbl-temp"><CloudSun size={12} /> {activeDest.temp}</span>
                  </div>
                  
                  <h4>{activeDest.name}</h4>
                  
                  <div className="card-bottom-row">
                    <div className="card-price">
                      <span className="price-lbl">Starting rate</span>
                      <strong>{formatPrice(activeDest.price)}/night</strong>
                    </div>
                    
                    <button className="card-action-btn" onClick={handleReserve}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
