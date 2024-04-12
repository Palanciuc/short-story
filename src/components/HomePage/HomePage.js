import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="homepage-background">
      <div className="homepage-container">
        <h1>Welcome to the Story Generator</h1>
        <p>Generate your unique story based on your preferences.</p>
        <div>
          <Link to="/create-story" className="nav-link">Create a Story</Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
