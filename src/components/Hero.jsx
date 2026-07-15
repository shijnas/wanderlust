import React, { useEffect, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            EXPLORE.<br />
            EXPERIENCE.<br />
            EMBRACE.
          </h1>
          <p className="hero-subheading">
            Discover the world's most breathtaking destinations in absolute comfort.
            <span className="subheading-accent"> Start your journey tonight.</span>
          </p>
        </div>
      </div>
      
      {/* Decorative bottom fade to blend with page content */}
      <div className="hero-bottom-fade" />
    </section>
  );
}
