import React, { useState } from 'react';
import { Sparkles, Calendar, Compass, MapPin, ChevronRight, DollarSign, Loader2 } from 'lucide-react';
import './AITripPlanner.css';

const SAMPLE_ITINERARIES = {
  norway: [
    { day: 'Day 1', title: 'Arrival & Fjord Cruise', desc: 'Transfer from Tromsø to Waterfront suite. Evening luxury yacht cruise with seal sighting.', location: 'Fjord' },
    { day: 'Day 2', title: 'Blue Glacier Glacier-Walk', desc: 'Trek inside prehistoric glacier caves with private alpine guides.', location: 'Glaciers' },
    { day: 'Day 3', title: 'Aurora Hunting & Stargazing', desc: 'Recline in glass dome cabin. Dine on native berries under glowing northern lights.', location: 'Aurora Dome' },
    { day: 'Day 4', title: 'Alpine Dog Sledding', desc: 'Harness the huskies and mush through quiet pine mountain forests.', location: 'Mountains' }
  ],
  switzerland: [
    { day: 'Day 1', title: 'Chalet Check-In & Fondue Dinner', desc: 'Arrive at alpine valley chalet. Welcome cheese fondue and private spa.', location: 'Zermatt' },
    { day: 'Day 2', title: 'Matterhorn Peak Expedition', desc: 'Private cable cabin up the Matterhorn for skiing or high-altitude glacier tours.', location: 'Glaciers' },
    { day: 'Day 3', title: 'Panoramic Express Rail', desc: 'Hop on Glacier Express First Class with full panoramic glass roofs.', location: 'St. Moritz' }
  ]
};

export default function AITripPlanner({ onBookActivity }) {
  const [prompt, setPrompt] = useState('4 days in Norway under $5,000');
  const [budget, setBudget] = useState('Medium');
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setItinerary(null);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsLoading(false);
      if (prompt.toLowerCase().includes('swiss') || prompt.toLowerCase().includes('switzerland')) {
        setItinerary(SAMPLE_ITINERARIES.switzerland);
      } else {
        setItinerary(SAMPLE_ITINERARIES.norway);
      }
    }, 1800);
  };

  return (
    <div className="ai-planner-card glass-panel glow-hover">
      <div className="ai-planner-header">
        <Sparkles size={20} className="ai-spark-icon" />
        <h3>AI TRIP PLANNER</h3>
      </div>
      
      <form onSubmit={handleGenerate} className="ai-planner-form">
        <div className="ai-input-row">
          <div className="ai-field flex-2">
            <label>Itinerary Dream Prompt</label>
            <input 
              type="text" 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)} 
              placeholder="e.g. 4 days in Switzerland for snow sports..." 
              required
            />
          </div>
          
          <div className="ai-field">
            <label>Budget Tier</label>
            <div className="ai-select-wrapper">
              <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                <option value="Luxury">Luxury</option>
                <option value="Medium">Elite Mid</option>
                <option value="Casual">Casual</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary ai-generate-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 size={16} className="spinner-icon" />
              <span>Planning Itinerary...</span>
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <span>Generate Itinerary</span>
            </>
          )}
        </button>
      </form>

      {/* Generated Itinerary Output */}
      {itinerary && (
        <div className="generated-itinerary-box fade-in-up">
          <h4 className="itinerary-output-title">Custom Curated Itinerary</h4>
          <div className="itinerary-timeline">
            {itinerary.map((item, index) => (
              <div key={index} className="timeline-node">
                <div className="node-marker">
                  <div className="node-dot" />
                  {index !== itinerary.length - 1 && <div className="node-line" />}
                </div>
                <div className="node-content glass-panel">
                  <div className="node-header">
                    <span className="node-day">{item.day}</span>
                    <span className="node-loc"><MapPin size={10} /> {item.location}</span>
                  </div>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                  
                  <button 
                    className="node-book-shortcut"
                    onClick={() => onBookActivity({
                      name: `${item.day}: ${item.title}`,
                      type: 'AI Tour Package',
                      price: '850',
                      image: '/iceland_cabin.jpg'
                    })}
                  >
                    <span>Reserve Day Activity</span>
                    <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
