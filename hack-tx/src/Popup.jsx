// Popup.jsx
import React, { useState } from 'react';
import './Popup.css';

function Popup({ onStart }) {
  const [difficulty, setDifficulty] = useState('normal');

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2 className="popup-title">Instructions</h2>
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button className="start-button" onClick={() => onStart(difficulty)}>
          Start
        </button>
      </div>
    </div>
  );
}

export default Popup;