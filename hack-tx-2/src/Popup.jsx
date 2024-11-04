import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

function Popup({ onStart, onClose }) {
  const [difficulty, setDifficulty] = useState('normal');

  const handleStart = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      const res = await fetch('https://api2.talkwith.tech/chat-two', requestOptions);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      console.log(data);
      onStart(difficulty);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <div className="popup-contents">
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

        <button className="start-button" onClick={handleStart}>
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