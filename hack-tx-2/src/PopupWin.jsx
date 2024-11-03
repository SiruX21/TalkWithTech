import React from 'react';
import './PopupWin.css'; 
import Confetti from 'react-confetti-boom';
function MyApp() {
  return <Confetti />;
}

const PopupWin = () => {
  return (
    
    <div className="custom-popup-overlay" role="dialog" aria-modal="true">
      <div className="custom-popup-content">
        <h1 className="custom-popup-heading">You Won!!!</h1>
        <Confetti mode="boom" particleCount={50} colors={['#ff577f', '#ff884b']} />
      </div>
    </div>
  );
};

export default PopupWin;