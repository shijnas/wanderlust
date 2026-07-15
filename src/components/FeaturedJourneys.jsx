import React, { useRef, useState } from 'react';
import { Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import './FeaturedJourneys.css';

const JOURNEYS_DATA = [
  {
    id: 1,
    title: 'Icelandic Aurora',
    location: 'Aurora | Cabin',
    description: 'Discover the world\'s most breathtaking destinations in absolute comfort.',
    rating: '4.9',
    price: '2,499',
    image: '/iceland_cabin.jpg'
  },
  {
    id: 2,
    title: 'Swiss Alps Retreat',
    location: 'Snowy Peaks | Chalet',
    description: 'Discover the world\'s most breathtaking destinations in absolute comfort.',
    rating: '5.0',
    price: '3,150',
    image: '/swiss_alps.jpg'
  },
  {
    id: 3,
    title: 'Patagonia Trek',
    location: 'Mountains | Tent',
    description: 'Discover the world\'s most breathtaking destinations in absolute comfort.',
    rating: '4.8',
    price: '2,780',
    image: '/patagonia_trek.jpg'
  },
  {
    id: 4,
    title: 'Norway Aurora',
    location: 'Aurora | Suite',
    description: 'Discover the world\'s most breathtaking destinations in absolute comfort.',
    rating: '4.9',
    price: '2,950',
    image: '/norway_aurora.jpg'
  }
];

export default function FeaturedJourneys() {
  const scrollContainerRef = useRef(null);
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 360; // Card width + gap
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="featured-section" id="explore">
      <div className="container">
        {/* Header with Navigation Arrows */}
        <div className="featured-header">
          <h2 className="featured-title">FEATURED JOURNEYS</h2>
          <div className="slider-controls">
            <button className="control-btn" onClick={() => scroll('left')} aria-label="Previous journeys">
              <ChevronLeft size={20} />
            </button>
            <button className="control-btn" onClick={() => scroll('right')} aria-label="Next journeys">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Card Container */}
        <div className="journeys-scroll-wrapper" ref={scrollContainerRef}>
          <div className="journeys-grid">
            {JOURNEYS_DATA.map((journey) => (
              <div key={journey.id} className="journey-card glass-panel glass-glow-effect">
                {/* Heart Toggle Button */}
                <button 
                  className={`fav-btn ${favorites[journey.id] ? 'active' : ''}`}
                  onClick={() => toggleFavorite(journey.id)}
                  aria-label="Add to favorites"
                >
                  <Heart size={18} fill={favorites[journey.id] ? '#00F0FF' : 'transparent'} />
                </button>

                {/* Card Image Wrapper */}
                <div className="journey-img-wrapper">
                  <img src={journey.image} alt={journey.title} className="journey-img" />
                  <div className="journey-rating">
                    <Star size={14} className="star-icon" />
                    <span>{journey.rating}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="journey-details">
                  <h3 className="journey-card-title">{journey.title}</h3>
                  <span className="journey-location">{journey.location}</span>
                  <p className="journey-desc">{journey.description}</p>
                  
                  <div className="journey-card-footer">
                    <button className="journey-explore-btn">
                      <span>EXPLORE</span>
                    </button>
                    <div className="journey-price-tag">
                      <span className="price-value">${journey.price}</span>
                      <span className="price-unit">/pp</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
