import React, { useState } from 'react';
import CalorieForm from './CalorieForm.jsx';
import './App.css';
import brandingVideo from './assets/branding.mp4';

const App = () => {
  const [result, setResult] = useState(null);

  return (
    <div className="app-container">

      <div className="panel slide-left">
        <CalorieForm setResult={setResult} />
      </div>


      <div className="panel slide-right">
          <div className="logo-section">
           <video
              className="company-video"
              src={brandingVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          <p className="tagline">"Know Your Calories, Fuel Your Goals!"</p>
        </div>

        {result && (
          <div className="result-box">
            <h2>Calories Breakdown</h2>
            <ul>
              <li><strong>Maintenance:</strong> {result.maintenance} kcal</li>
              <li><strong>Weight Loss:</strong> {result.maintenance - 250} kcal</li>
              <li><strong>Extreme Weight Loss:</strong> {result.maintenance - 500} kcal</li>
              <li><strong>Weight Gain:</strong> {result.maintenance + 250} kcal</li>
              <li><strong>Extreme Weight Gain:</strong> {result.maintenance + 500} kcal</li>
            </ul>
          </div>
        )}

        <footer className="footer">
          <p>Created by Amrit Saini</p>
          <p>&copy; {new Date().getFullYear()} Fuel To Fit. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
