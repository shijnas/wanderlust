import React, { useEffect, useState } from 'react';
import { getTranslation } from '../translations';
import './Hero.css';

export default function Hero({ language }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Format Malayalam or languages with <br/> appropriately, or split by full stop
  const renderTitle = () => {
    const raw = getTranslation(language, 'heroTitle');
    // If contains dots or stops, split to create stacked effect
    const parts = raw.split(/[.।]/).filter(p => p.trim().length > 0);
    if (parts.length >= 3) {
      return (
        <>
          {parts[0]}.<br />
          {parts[1]}.<br />
          {parts[2]}.
        </>
      );
    }
    return raw;
  };

  return (
    <section className="hero-section">
      {/* Background Image with subtle parallax */}
      <div 
        className="hero-bg" 
        style={{ 
          transform: `translateY(${scrollY * 0.4}px)`,
          backgroundImage: "url('/hero_bg.jpg')"
        }}
      />
      
      {/* Dark overlay & fog effect */}
      <div className="hero-overlay" />
      <div className="hero-fog" />

      {/* Hero Content */}
      <div className="container hero-container">
        <div className="hero-text-content fade-in-up">
          <h1 className="hero-title">
            {renderTitle()}
          </h1>
          <p className="hero-subheading">
            {getTranslation(language, 'heroSub')}
            <span className="subheading-accent"> {getTranslation(language, 'heroSubAccent')}</span>
          </p>
        </div>
      </div>
      
      {/* Decorative bottom fade to blend with page content */}
      <div className="hero-bottom-fade" />
    </section>
  );
}
