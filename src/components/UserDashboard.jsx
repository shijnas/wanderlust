import React from 'react';
import { X, Award, MapPin, Heart, Calendar, Compass, CreditCard, ChevronRight } from 'lucide-react';
import './UserDashboard.css';

export default function UserDashboard({ 
  onClose, 
  upcomingTrips, 
  wishlist, 
  onRemoveWishlist, 
  onViewDestination, 
  journeysList 
}) {
  
  // Find wishlist journey details
  const wishlistItems = journeysList.filter(item => wishlist.includes(item.id));

  return (
    <div className="dashboard-overlay" onClick={onClose}>
      <div className="dashboard-drawer glass-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="dashboard-header">
          <div className="user-profile-badge">
            <div className="user-avatar">EA</div>
            <div className="user-meta">
              <h4>Ezio Auditore</h4>
              <span>Elite Explorer Member</span>
            </div>
          </div>
          <button className="dashboard-close-btn" onClick={onClose} aria-label="Close dashboard">
            <X size={20} />
          </button>
        </div>

        {/* Loyalty Points Panel */}
        <div className="loyalty-points-card glass-panel">
          <div className="loyalty-header">
            <Award size={20} className="loyalty-icon" />
            <span>LOYALTY STATUS</span>
          </div>
          <div className="points-display">
            <h3>45,280</h3>
            <span>Points</span>
          </div>
          <p className="points-status-text">You are 4,720 points away from next reward tier (Vanguard level).</p>
        </div>

        {/* Scrollable sections */}
        <div className="dashboard-scrollable-area">
          
          {/* Upcoming Trips */}
          <div className="dashboard-section">
            <h3 className="section-title">UPCOMING TRIPS</h3>
            {upcomingTrips.length === 0 ? (
              <div className="empty-section-card glass-panel">
                <Compass size={24} className="empty-icon" />
                <p>No upcoming trips booked yet. Start exploring!</p>
              </div>
            ) : (
              <div className="dashboard-list">
                {upcomingTrips.map(trip => (
                  <div key={trip.id} className="trip-booking-card glass-panel">
                    <img src={trip.image} alt={trip.title} className="trip-card-img" />
                    <div className="trip-card-details">
                      <div className="trip-header-row">
                        <h4>{trip.title}</h4>
                        <span className="booking-status-badge">Confirmed</span>
                      </div>
                      <span className="trip-card-meta">{trip.type} • Reference: {trip.code}</span>
                      <div className="trip-card-footer">
                        <span className="trip-card-date"><Calendar size={12} /> {trip.date}</span>
                        <span className="trip-card-price">{trip.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Saved Wishlist */}
          <div className="dashboard-section">
            <h3 className="section-title">SAVED RETREATS</h3>
            {wishlistItems.length === 0 ? (
              <div className="empty-section-card glass-panel">
                <Heart size={24} className="empty-icon" />
                <p>Your wishlist is empty. Tap the heart icon on any card to save it.</p>
              </div>
            ) : (
              <div className="dashboard-list">
                {wishlistItems.map(item => (
                  <div 
                    key={item.id} 
                    className="wishlist-item-card glass-panel"
                    onClick={() => {
                      onViewDestination(item);
                      onClose();
                    }}
                  >
                    <img src={item.image} alt={item.title} className="wishlist-img" />
                    <div className="wishlist-details">
                      <h4>{item.title}</h4>
                      <span>{item.location}</span>
                    </div>
                    <button 
                      className="wishlist-remove-btn" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveWishlist(item.id);
                      }}
                      aria-label="Remove from wishlist"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
