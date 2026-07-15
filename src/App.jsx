import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FeaturedJourneys from './components/FeaturedJourneys';
import PopularExperiences from './components/PopularExperiences';
import BookingSection from './components/BookingSection';

function App() {
  return (
    <>
      {/* Animated Aurora Glow Backdrop */}
      <div className="aurora-bg-container">
        <div className="aurora-glow-1" />
        <div className="aurora-glow-2" />
        <div className="aurora-glow-3" />
      </div>

      {/* Main Header & Navbar */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Full-width Parallax Hero */}
        <Hero />
        
        {/* Floating Search Widget */}
        <SearchBar />

        {/* Featured Journeys slider */}
        <FeaturedJourneys />

        {/* Neon themed Popular Experiences */}
        <PopularExperiences />

        {/* Booking date picker & Map widget */}
        <BookingSection />
      </main>

      {/* Premium Dark Footer */}
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
              <li><a href="#explore">Iceland Cabin</a></li>
              <li><a href="#explore">Swiss Alps Retreat</a></li>
              <li><a href="#explore">Patagonia Trek</a></li>
              <li><a href="#explore">Norway Aurora</a></li>
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
    </>
  );
}

export default App;
