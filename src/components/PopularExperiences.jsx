import React from 'react';
import './PopularExperiences.css';

const EXPERIENCES = [
  {
    id: 1,
    title: 'HIKING',
    description: 'Explore majestic mountain trails, lush pine forests, and high-altitude lookouts with experienced alpine guides.',
    iconColor: '#00F0FF',
    // Custom premium SVG hiker
    svg: (color) => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M38 12C40.2091 12 42 10.2091 42 8C42 5.79086 40.2091 4 38 4C35.7909 4 34 5.79086 34 8C34 10.2091 35.7909 12 38 12Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 60L28 46L24 34L28 20H38L42 28L46 32" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M28 46L36 36L42 44L48 58" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 58L22 28L18 22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M46 16L44 48" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="44" cy="48" r="2" fill={color}/>
      </svg>
    )
  },
  {
    id: 2,
    title: 'GLACIERS',
    description: 'Trek through crystal-blue glacier tunnels, scale vertical ice walls, and witness frozen prehistoric wonders.',
    iconColor: '#4DFFD8',
    // Custom premium SVG glaciers/crystals
    svg: (color) => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 6L54 48H10L32 6Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M32 6L20 48" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M32 6L40 48" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M44 24L58 52H38L44 24Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M20 28L28 52H6L20 28Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M10 48H54" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 3,
    title: 'NORTHERN LIGHTS',
    description: 'Witness the breathtaking dance of the green aurora borealis across clear, crisp Arctic winter skies.',
    iconColor: '#2B8FFF',
    // Custom premium SVG Aurora curves
    svg: (color) => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 38C12 28 20 18 32 18C44 18 52 28 58 38" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 48C15 36 24 26 34 26C44 26 50 36 56 48" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" strokeLinecap="round"/>
        <path d="M10 24C18 14 26 8 36 8C46 8 50 14 54 24" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 18V26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M32 10V22" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M48 18V26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 4,
    title: 'FJORD CRUISE',
    description: 'Sail through deep, emerald-green fjords, beneath massive mountain cliffs, and past tumbling waterfalls.',
    iconColor: '#A35CFF',
    // Custom premium SVG yacht/cruise
    svg: (color) => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 46C18 42 46 42 58 46L54 54H10L6 46Z" stroke={color} strokeWidth="2" strokeLinejoin="round"/>
        <path d="M22 42V18L44 24V42" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 28H44" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 46L22 34" stroke={color} strokeWidth="1.5"/>
        <path d="M50 46L44 34" stroke={color} strokeWidth="1.5"/>
        <path d="M4 56C12 58 20 58 32 56C44 54 52 56 60 56" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
  }
];

export default function PopularExperiences() {
  return (
    <section className="experiences-section" id="stays">
      <div className="container">
        {/* Section Header */}
        <div className="experiences-header">
          <h2 className="experiences-title">POPULAR EXPERIENCES</h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="experiences-grid">
          {EXPERIENCES.map((exp) => (
            <div 
              key={exp.id} 
              className="experience-card glass-panel"
              style={{
                '--hover-glow-color': exp.iconColor
              }}
            >
              {/* Glowing Vector Icon Container */}
              <div 
                className="experience-icon-wrapper" 
                style={{ 
                  borderColor: `${exp.iconColor}22`,
                  boxShadow: `0 0 20px ${exp.iconColor}08`
                }}
              >
                <div className="experience-icon-glow" style={{ background: exp.iconColor }} />
                {exp.svg(exp.iconColor)}
              </div>

              {/* Title & Description */}
              <h3 className="experience-card-title">{exp.title}</h3>
              <p className="experience-desc">{exp.description}</p>
              
              {/* Bottom accent glow strip */}
              <div className="experience-accent-line" style={{ background: exp.iconColor }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
