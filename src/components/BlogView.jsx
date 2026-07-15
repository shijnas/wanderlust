import React, { useState } from 'react';
import { BookOpen, Compass, Camera, Calendar, ArrowRight, User } from 'lucide-react';
import './BlogView.css';

const POSTS = [
  {
    id: 1,
    title: 'Chasing the Green Aurora: Night Photography Masterclass',
    category: 'Photography',
    date: 'July 14, 2026',
    author: 'Elena Rostova',
    readTime: '6 min read',
    summary: 'A comprehensive guide to shutter speeds, ISO ranges, and location scouting for captures of the aurora borealis.',
    image: '/norway_aurora.jpg'
  },
  {
    id: 2,
    title: 'The Switzerland Panoramic Express: A First-Class Guide',
    category: 'Guides',
    date: 'June 28, 2026',
    author: 'Marcus Vance',
    readTime: '8 min read',
    summary: 'Unlocking secret stopover cabins and first-class carriage bookings along the Alpine Glacier Express path.',
    image: '/swiss_alps.jpg'
  },
  {
    id: 3,
    title: 'Trekking Fitz Roy: Packing Smart for Patagonian Winds',
    category: 'Adventure',
    date: 'May 12, 2026',
    author: 'Alex Honnold',
    readTime: '5 min read',
    summary: 'What lightweight gear, wind breakers, and tracking poles will make or break your expedition to Fitz Roy towers.',
    image: '/patagonia_trek.jpg'
  },
  {
    id: 4,
    title: 'Iceland Glass Dome Cabins: Stargazing in the Cold',
    category: 'Guides',
    date: 'April 02, 2026',
    author: 'Sven Lindqvist',
    readTime: '7 min read',
    summary: 'A tour of the top remote cabins featuring automated double-glazed stargazing domes in the volcanic fields.',
    image: '/iceland_cabin.jpg'
  }
];

export default function BlogView() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [readingPost, setReadingPost] = useState(null);

  const filteredPosts = selectedCat === 'All' 
    ? POSTS 
    : POSTS.filter(p => p.category === selectedCat);

  return (
    <div className="blog-view container fade-in-up">
      
      {/* Hero */}
      <div className="blog-hero text-center">
        <h1 className="blog-title">WANDERLUST CHRONICLES</h1>
        <p className="blog-sub">Expert insights, photography guides, and adventure stories from the edge of the world.</p>
      </div>

      {/* Category Tabs */}
      <div className="blog-categories">
        {['All', 'Guides', 'Photography', 'Adventure'].map(cat => (
          <button 
            key={cat} 
            className={`cat-tab ${selectedCat === cat ? 'active' : ''}`}
            onClick={() => setSelectedCat(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div className="blog-grid">
        {filteredPosts.map(post => (
          <div key={post.id} className="blog-post-card glass-panel glass-glow-effect">
            <div className="post-img-wrapper">
              <img src={post.image} alt={post.title} className="post-img" />
              <span className="post-cat-tag">{post.category}</span>
            </div>
            
            <div className="post-info">
              <div className="post-meta">
                <span className="post-date"><Calendar size={12} /> {post.date}</span>
                <span className="post-time">{post.readTime}</span>
              </div>
              
              <h3 className="post-card-title">{post.title}</h3>
              <p className="post-summary">{post.summary}</p>
              
              <div className="post-card-footer">
                <div className="post-author">
                  <User size={12} />
                  <span>{post.author}</span>
                </div>
                <button className="post-read-btn" onClick={() => setReadingPost(post)}>
                  <span>Read Article</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Article Reading Overlay Modal */}
      {readingPost && (
        <div className="modal-backdrop" onClick={() => setReadingPost(null)}>
          <div className="article-reading-modal glass-panel fade-in-up" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setReadingPost(null)} aria-label="Close article">
              X
            </button>
            <div className="article-hero" style={{ backgroundImage: `url(${readingPost.image})` }}>
              <div className="article-hero-overlay" />
              <div className="article-hero-content">
                <span className="article-cat-lbl">{readingPost.category}</span>
                <h2>{readingPost.title}</h2>
                <div className="article-meta-row">
                  <span>By {readingPost.author}</span>
                  <span>•</span>
                  <span>{readingPost.date}</span>
                </div>
              </div>
            </div>
            <div className="article-body">
              <p className="article-lead">{readingPost.summary}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <h5>Pro Stargazing Travel Tip:</h5>
              <p>
                Make sure you check KP indexes at least 48 hours prior to arrival. Packing specialized thermal glove liners is crucial for adjusting tripod dials in -10°C conditions.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
