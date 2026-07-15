import React from 'react';
import { X, Star, User } from 'lucide-react';
import './RatingBreakdownModal.css';

export default function RatingBreakdownModal({ destination, onClose }) {
  if (!destination) return null;

  const mockReviews = [
    { name: 'Sarah Connor', rating: 5, date: '2 days ago', text: 'An absolute masterpiece of design! The glass roof gave us perfect views of the aurora. Worth every single cent.', avatar: 'SC' },
    { name: 'Bruce Wayne', rating: 5, date: '1 week ago', text: 'Exceptionally private and secure. The chalet views of the snow peaks are unmatched. Will return next season.', avatar: 'BW' },
    { name: 'John Doe', rating: 4, date: '3 weeks ago', text: 'Wonderful stays, but make sure to pack heavy coats. The glacier walk is breathtaking but freezing.', avatar: 'JD' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="rating-modal glass-panel fade-in-up" onClick={(e) => e.stopPropagation()}>
        
        {/* Close */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <h3 className="rating-modal-title">GUEST REVIEWS & RATINGS</h3>
        
        <div className="rating-summary-row">
          <div className="overall-score-box">
            <h2>{destination.rating}</h2>
            <div className="stars-row">
              <Star size={16} fill="#FFD700" color="#FFD700" />
              <span>Out of 5.0</span>
            </div>
            <span className="reviews-count-lbl">{destination.reviews || 152} verified reviews</span>
          </div>

          <div className="rating-bars-box">
            {[
              { label: '5 Stars', pct: '85%' },
              { label: '4 Stars', pct: '12%' },
              { label: '3 Stars', pct: '2%' },
              { label: '2 Stars', pct: '1%' },
              { label: '1 Star', pct: '0%' }
            ].map((bar, idx) => (
              <div key={idx} className="rating-bar-row">
                <span className="bar-label">{bar.label}</span>
                <div className="bar-bg">
                  <div className="bar-fill" style={{ width: bar.pct }} />
                </div>
                <span className="bar-pct">{bar.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Reviews List */}
        <div className="reviews-feed-section">
          <h4>Recent Explorer Feedback</h4>
          <div className="reviews-feed">
            {mockReviews.map((rev, idx) => (
              <div key={idx} className="feed-review-card glass-panel">
                <div className="reviewer-header">
                  <div className="reviewer-avatar">{rev.avatar}</div>
                  <div className="reviewer-meta">
                    <strong>{rev.name}</strong>
                    <span>{rev.date}</span>
                  </div>
                  <div className="reviewer-stars">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={12} fill="#00F0FF" color="#00F0FF" />
                    ))}
                  </div>
                </div>
                <p className="reviewer-text">"{rev.text}"</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
