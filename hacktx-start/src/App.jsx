import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const games = ["Karen Game", "Teacher Sim", "Interview Sim"];
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const changeGame = (direction) => {
    if (direction === 'left') {
      setCurrentGameIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
    } else {
      setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
    }
  };

  useEffect(() => {
    // Array of background colors corresponding to each game
    const colors = ['red', 'orange', 'brown'];
    document.body.style.backgroundColor = colors[currentGameIndex];
  }, [currentGameIndex]);

  return (
    <div id="root">
      <div className="arrow-box left" onClick={() => changeGame('left')}>
        &#8592;
      </div>
      <div className="arrow-box right" onClick={() => changeGame('right')}>
        &#8594;
      </div>
      <div className="title-screen">{games[currentGameIndex]}</div>
      <button className="select-game-button">Select Game</button>
    </div>
  );
}

export default App;