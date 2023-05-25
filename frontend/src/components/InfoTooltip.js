import React from 'react';

function InfoTooltip({image, text, isOpen, onClose}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_size-l">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img className="popup__tooltip-image" src={image} alt={text} />
        <p className="popup__tooltip-text">{text}</p> 
      </div>
    </div>
  );
}
   
export default InfoTooltip;