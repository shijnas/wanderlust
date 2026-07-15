import React from 'react';
import Hero from './Hero';
import SearchBar from './SearchBar';
import FeaturedJourneys from './FeaturedJourneys';
import PopularExperiences from './PopularExperiences';
import BookingSection from './BookingSection';
import AITripPlanner from './AITripPlanner';

export default function ExploreView({ 
  onViewDestination, 
  onBookActivity,
  searchFilters,
  onSearch,
  wishlist,
  onToggleWishlist,
  currencySymbol,
  currencyFactor,
  language
}) {
  return (
    <div className="explore-view-wrapper">
      {/* Parallax banner */}
      <Hero language={language} />

      {/* Floating search form */}
      <SearchBar onSearch={onSearch} filters={searchFilters} language={language} />

      {/* Main Journeys list */}
      <FeaturedJourneys 
        onViewDestination={onViewDestination} 
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        currencySymbol={currencySymbol}
        currencyFactor={currencyFactor}
        searchFilters={searchFilters}
        language={language}
      />

      {/* Popular experience categories */}
      <PopularExperiences language={language} />

      {/* Interactive Map & Booking */}
      <BookingSection 
        onBook={onBookActivity} 
        currencySymbol={currencySymbol} 
        currencyFactor={currencyFactor} 
        language={language}
      />

      {/* AI Trip Planner Timeline widget */}
      <div className="container">
        <AITripPlanner onBookActivity={onBookActivity} />
      </div>
    </div>
  );
}
