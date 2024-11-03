// Popup.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

function Popup({ onStart, onClose }) {
  const [difficulty, setDifficulty] = useState('normal');

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <div className="popup-contents">
        <button className="close-button" onClick={onClose} aria-label="Close popup">
          &times;
        </button>
        <h1>Welcome to TalkWith.Tech</h1>
        <p>
          TalkWith.Tech is an LLM-based interaction simulator designed to test your emotional intelligence. Follow the guidelines below to engage with the scenarios effectively:
        </p>

        <h2>Available Scenarios</h2>
        <ul>
          <li><strong>Customer Simulator:</strong> Interact with a client who is feeling upset.</li>
          <li><strong>Teacher Simulator:</strong> Navigate a conversation with a distressed student.</li>
          <li><strong>Interview Simulator:</strong> Manage an interview situation with a frustrated candidate.</li>
        </ul>

        <h2>Objective</h2>
        <p>
          In each scenario, you will encounter a character displaying angry or sad emotions. Your goal is to:
        </p>
        <ul>
          <li>Engage in conversation and guide the character towards a calm or happy sentiment.</li>
          <li>Achieve this within a limited number of responses.</li>
        </ul>

        <h2>Tips for Success</h2>
        <p>
          Keep the following in mind to ensure positive interactions:
        </p>
        <ul>
          <li>Be mindful of your responses; your words can either soothe or further upset the character.</li>
          <li>Strive for empathy and understanding in your replies.</li>
        </ul>

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

Popup.propTypes = {
  onStart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
