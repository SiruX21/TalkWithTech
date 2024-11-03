import React from 'react';
import './PopupWin.css';

const PopupWin = () => {
  return (
    <div className="popup-overlay" role="dialog" aria-modal="true">
      <div className="popup-content">
        <h1>You Won!!!</h1>
      </div>
    </div>
  );
};

export default PopupWin;