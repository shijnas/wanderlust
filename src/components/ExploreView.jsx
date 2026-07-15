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
  currencyFactor
}) {
  return (
    <div className="explore-view-wrapper">
      {/* Parallax banner */}
      <Hero />

      {/* Floating search form */}
      <SearchBar onSearch={onSearch} filters={searchFilters} />

      {/* Main Journeys list */}
      <FeaturedJourneys 
        onViewDestination={onViewDestination} 
        wishlist={wishlist}
        onToggleWishlist={onToggleWishlist}
        currencySymbol={currencySymbol}
        currencyFactor={currencyFactor}
        searchFilters={searchFilters}
      />

      {/* Popular experience categories */}
      <PopularExperiences />

      {/* Interactive Map & Booking */}
      <BookingSection 
        onBook={onBookActivity} 
        currencySymbol={currencySymbol} 
        currencyFactor={currencyFactor} 
      />

      {/* AI Trip Planner Timeline widget */}
      <div className="container">
        <AITripPlanner onBookActivity={onBookActivity} />
      </div>
    </div>
  );
}
