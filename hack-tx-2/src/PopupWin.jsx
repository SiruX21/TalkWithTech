import React from 'react';
import './PopupWin.css'; // Ensure this path is correct

const PopupWin = () => {
  return (
    <div className="custom-popup-overlay" role="dialog" aria-modal="true">
      <div className="custom-popup-content">
        <h1 className="custom-popup-heading">You Won!!!</h1>
      </div>
    </div>
  );
};

export default PopupWin;