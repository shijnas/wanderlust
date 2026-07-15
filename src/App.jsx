import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ExploreView from './components/ExploreView';
import StaysView from './components/StaysView';
import FlightsView from './components/FlightsView';
import DealsView from './components/DealsView';
import BlogView from './components/BlogView';

// Modals and Aux drawers
import DestinationDetailsModal from './components/DestinationDetailsModal';
import RatingBreakdownModal from './components/RatingBreakdownModal';
import PricingDrawer from './components/PricingDrawer';
import CheckoutModal from './components/CheckoutModal';
import UserDashboard from './components/UserDashboard';
import { JOURNEYS_DATA } from './components/FeaturedJourneys';

// Initial pre-booked trip
const INITIAL_TRIP = {
  id: 0,
  title: 'Waterfront Fjord Chalet',
  type: 'Resort stay',
  price: '$5,400',
  image: '/norway_aurora.jpg',
  code: 'WL-729450',
  traveler: 'Ezio Auditore',
  date: 'Sep 24, 2026'
};

function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('EN');
  const [toasts, setToasts] = useState([]);

  // Wishlist state synced with localStorage
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Booked trips state
  const [upcomingTrips, setUpcomingTrips] = useState([INITIAL_TRIP]);

  // Search Filters state
  const [searchFilters, setSearchFilters] = useState({
    departure: 'Oslo, NO',
    destination: '',
    dates: '14 Oct - 21 Oct',
    guests: '2 Adults'
  });

  // Modal / Drawer visibility states
  const [activeDestination, setActiveDestination] = useState(null);
  const [activeRating, setActiveRating] = useState(null);
  const [activePricing, setActivePricing] = useState(null);
  const [activeCheckout, setActiveCheckout] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  // Toast adder helper
  const addToast = (message) => {
    const id = Math.random();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2800);
  };

  // Currency factors and symbols
  const currencySymbols = { USD: '$', EUR: '€', NOK: 'kr' };
  const currencyFactors = { USD: 1.0, EUR: 0.92, NOK: 10.5 };

  const handleToggleWishlist = (id) => {
    setWishlist(prev => {
      const isFav = prev.includes(id);
      if (isFav) {
        addToast('Removed from Wishlist 💔');
        return prev.filter(item => item !== id);
      } else {
        addToast('Added to Wishlist ❤️');
        return [...prev, id];
      }
    });
  };

  const handleBookingSuccess = (tripDetails) => {
    setUpcomingTrips(prev => [tripDetails, ...prev]);
    addToast('Booking Authorized Successfully! 🎉');
  };

  // Shared elements loading triggers
  const handleOpenDestination = (item) => {
    // Simulated transition delay
    addToast('Opening destination details...');
    setTimeout(() => {
      setActiveDestination(item);
    }, 200);
  };

  return (
    <>
      {/* Aurora backdrop glow grids */}
      <div className="aurora-bg-container">
        <div className="aurora-glow-1" />
        <div className="aurora-glow-2" />
        <div className="aurora-glow-3" />
      </div>

      {/* Fixed header navbar */}
      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        currency={currency}
        onCurrencyChange={setCurrency}
        language={language}
        onLanguageChange={setLanguage}
        onProfileClick={() => setShowDashboard(true)}
      />

      {/* Active Tab Router */}
      <main>
        {activeTab === 'explore' && (
          <ExploreView 
            onViewDestination={handleOpenDestination}
            onBookActivity={setActiveCheckout}
            searchFilters={searchFilters}
            onSearch={setSearchFilters}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            currencySymbol={currencySymbols[currency]}
            currencyFactor={currencyFactors[currency]}
          />
        )}

        {activeTab === 'stays' && (
          <StaysView 
            onBookStay={setActiveCheckout}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            currencySymbol={currencySymbols[currency]}
            currencyFactor={currencyFactors[currency]}
          />
        )}

        {activeTab === 'flights' && (
          <FlightsView 
            onBookFlight={setActiveCheckout}
            currencySymbol={currencySymbols[currency]}
            currencyFactor={currencyFactors[currency]}
          />
        )}

        {activeTab === 'deals' && (
          <DealsView 
            onBookDeal={setActiveCheckout}
            currencySymbol={currencySymbols[currency]}
            currencyFactor={currencyFactors[currency]}
          />
        )}

        {activeTab === 'blog' && (
          <BlogView />
        )}
      </main>

      {/* Footer */}
      <footer className="footer-container">
        <div className="container footer-grid">
          <div className="footer-col">
            <h3>WANDERLUST</h3>
            <p>
              Futuristic luxury travel booking platform inspired by timeless elegance and natural wonders.
            </p>
          </div>
          <div className="footer-col">
            <h4>Destinations</h4>
            <ul>
              <li><a href="#explore" onClick={() => setActiveTab('explore')}>Iceland Cabin</a></li>
              <li><a href="#explore" onClick={() => setActiveTab('explore')}>Swiss Alps Retreat</a></li>
              <li><a href="#explore" onClick={() => setActiveTab('explore')}>Patagonia Trek</a></li>
              <li><a href="#explore" onClick={() => setActiveTab('explore')}>Norway Aurora</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Press Room</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul>
          </div>
        </div>
        
        <div className="container footer-bottom">
          <span className="footer-copyright">
            © {new Date().getFullYear()} WANDERLUST Inc. All rights reserved.
          </span>
          <span className="footer-socials">
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
          </span>
        </div>
      </footer>

      {/* Modals & Overlays Render Pipeline */}
      
      {/* Destination Details Modal */}
      {activeDestination && (
        <DestinationDetailsModal 
          destination={activeDestination}
          onClose={() => setActiveDestination(null)}
          onBook={(bookingItem) => {
            setActiveDestination(null);
            setActiveCheckout(bookingItem);
          }}
          currencySymbol={currencySymbols[currency]}
          currencyFactor={currencyFactors[currency]}
        />
      )}

      {/* Review & Rating Breakdown Modal */}
      {activeRating && (
        <RatingBreakdownModal 
          destination={activeRating}
          onClose={() => setActiveRating(null)}
        />
      )}

      {/* Pricing breakdown Details Drawer */}
      {activePricing && (
        <PricingDrawer 
          destination={activePricing}
          onClose={() => setActivePricing(null)}
          onBook={setActiveCheckout}
          currencySymbol={currencySymbols[currency]}
          currencyFactor={currencyFactors[currency]}
        />
      )}

      {/* Booking Checkout Wizard */}
      {activeCheckout && (
        <CheckoutModal 
          item={activeCheckout}
          onClose={() => setActiveCheckout(null)}
          onBookingSuccess={handleBookingSuccess}
          currencySymbol={currencySymbols[currency]}
          currencyFactor={currencyFactors[currency]}
        />
      )}

      {/* Profile/Wishlist Drawer Dashboard */}
      {showDashboard && (
        <UserDashboard 
          onClose={() => setShowDashboard(false)}
          upcomingTrips={upcomingTrips}
          wishlist={wishlist}
          onRemoveWishlist={handleToggleWishlist}
          onViewDestination={handleOpenDestination}
          journeysList={JOURNEYS_DATA}
        />
      )}

      {/* Float Toasts notifications container */}
      <div className="toasts-container">
        {toasts.map(t => (
          <div key={t.id} className="toast-item glass-panel">
            {t.message}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
