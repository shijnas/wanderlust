import React, { useRef } from 'react';
import { Star, Heart, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';
import './FeaturedJourneys.css';

const JOURNEYS_DATA = [
  {
    id: 1,
    slug: 'iceland-aurora',
    title: 'Icelandic Aurora',
    location: 'Aurora | Cabin',
    description: 'Discover the world\'s most breathtaking destinations in absolute comfort. Cozy remote glass cabins with views of the volcanic landscape.',
    rating: '4.9',
    reviews: 152,
    price: '2,499',
    image: '/iceland_cabin.jpg'
  },
  {
    id: 2,
    slug: 'swiss-alps',
    title: 'Swiss Alps Retreat',
    location: 'Snowy Peaks | Chalet',
    description: 'Discover the world\'s most breathtaking destinations in absolute comfort. Unwind in a premium ski-in chalet overlooking the Matterhorn.',
    rating: '5.0',
    reviews: 98,
    price: '3,150',
    image: '/swiss_alps.jpg'
  },
  {
    id: 3,
    slug: 'patagonia',
    title: 'Patagonia Trek',
    location: 'Mountains | Tent',
    description: 'Discover the world\'s most breathtaking destinations in absolute comfort. Luxurious heated domes beneath the legendary towers of Mount Fitz Roy.',
    rating: '4.8',
    reviews: 114,
    price: '2,780',
    image: '/patagonia_trek.jpg'
  },
  {
    id: 4,
    slug: 'norway-aurora',
    title: 'Norway Aurora Suite',
    location: 'Aurora | Suite',
    description: 'Discover the world\'s most breathtaking destinations in absolute comfort. Elegant fjord-side suites with automated glass stargazing roofs.',
    rating: '4.9',
    reviews: 135,
    price: '2,950',
    image: '/norway_aurora.jpg'
  }
];

export default function FeaturedJourneys({ 
  onViewDestination, 
  wishlist = [], 
  onToggleWishlist, 
  onViewRating,
  onViewPricing,
  currencySymbol = '$', 
  currencyFactor = 1.0,
  searchFilters
}) {
  const scrollContainerRef = useRef(null);

  const getFormattedPrice = (basePriceUSD) => {
    const numericPrice = parseFloat(basePriceUSD.replace(/,/g, ''));
    const converted = Math.round(numericPrice * currencyFactor);
    return `${currencySymbol}${converted.toLocaleString()}`;
  };

  const getFilteredJourneys = () => {
    if (!searchFilters || !searchFilters.destination) return JOURNEYS_DATA;
    
    const searchStr = searchFilters.destination.toLowerCase();
    const filtered = JOURNEYS_DATA.filter(j => 
      j.title.toLowerCase().includes(searchStr) || 
      j.location.toLowerCase().includes(searchStr) ||
      j.description.toLowerCase().includes(searchStr)
    );

    return filtered;
  };

  const filteredJourneys = getFilteredJourneys();

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 360; 
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

        {/* Dynamic filter notice */}
        {searchFilters && searchFilters.destination && filteredJourneys.length === 0 ? (
          <div className="empty-search-notice glass-panel">
            <AlertCircle size={20} className="notice-icon" />
            <div className="notice-text">
              <h4>No matches for "{searchFilters.destination}"</h4>
              <p>Showing all available luxury packages instead.</p>
            </div>
          </div>
        ) : searchFilters && searchFilters.destination ? (
          <div className="filter-active-tag">
            <span>Filtering by destination: "{searchFilters.destination}"</span>
          </div>
        ) : null}

        {/* Scrollable Card Container */}
        <div className="journeys-scroll-wrapper" ref={scrollContainerRef}>
          <div className="journeys-grid">
            {(filteredJourneys.length > 0 ? filteredJourneys : JOURNEYS_DATA).map((journey) => {
              const isFav = wishlist.includes(journey.id);
              return (
                <div 
                  key={journey.id} 
                  className="journey-card glass-panel glass-glow-effect clickable-journey-card"
                  onClick={() => onViewDestination(journey)}
                >
                  
                  {/* Heart Toggle Button */}
                  <button 
                    className={`fav-btn ${isFav ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(journey.id);
                    }}
                    aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={18} fill={isFav ? '#00F0FF' : 'transparent'} />
                  </button>

                  {/* Card Image Wrapper */}
                  <div className="journey-img-wrapper">
                    <img src={journey.image} alt={journey.title} className="journey-img" />
                    
                    {/* Rating Badge - Clickable to open reviews */}
                    <div 
                      className="journey-rating interactive-rating"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewRating(journey);
                      }}
                      title="View verified reviews"
                    >
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
                      
                      {/* Price tag - Clickable to open pricing drawer */}
                      <div 
                        className="journey-price-tag interactive-price"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewPricing(journey);
                        }}
                        title="View breakdown details"
                      >
                        <span className="price-value">{getFormattedPrice(journey.price)}</span>
                        <span className="price-unit">/pp</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
export { JOURNEYS_DATA };
