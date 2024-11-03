import React from 'react';
import './PopupWin.css';
import Confetti from 'react-confetti-boom';

const PopupWin = () => {
  return (
    <div className="custom-popup-overlay" role="dialog" aria-modal="true">
      <div className="custom-popup-content">
        <h1 className="custom-popup-heading">You Won!!!</h1>
        <Confetti mode="boom" particleCount={5000} colors={['#ff577f', '#ff884b']} />
      </div>
    </div>
  );
};

export default PopupWin;