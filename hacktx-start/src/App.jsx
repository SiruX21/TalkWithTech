import React, { useState, useEffect } from 'react';
import './App.css';
import marketImage from './assets/market.png';
import interviewImage from './assets/interview.png';
import classroomImage from './assets/classroom.png';

function App() {
  const games = ["Customer Simulator", "Interview Simulator", "Teacher Simulator"];
  const websites = ["https://customer.talkwith.tech", "https://interview.talkwith.tech", "https://teacher.talkwith.tech"];
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

  const changeGame = (direction) => {
    if (direction === 'left') {
      setCurrentGameIndex((prevIndex) => (prevIndex - 1 + games.length) % games.length);
    } else {
      setCurrentGameIndex((prevIndex) => (prevIndex + 1) % games.length);
    }
  };

  useEffect(() => {
    const images = [marketImage, interviewImage, classroomImage];
    document.body.style.backgroundImage = `url(${images[currentGameIndex]})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  }, [currentGameIndex]);

  const handleSelectGame = () => {
    window.location.href = websites[currentGameIndex];
  };

  return (
    <div id="root">
      <div className="arrow-box left" onClick={() => changeGame('left')}>
        &#8592;
      </div>
      <div className="arrow-box right" onClick={() => changeGame('right')}>
        &#8594;
      </div>
      <div className="title-screen">{games[currentGameIndex]}</div>
      <button className="select-game-button" onClick={handleSelectGame}>Select Game</button>
    </div>
  );
}

export default App;
