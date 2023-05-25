import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_open-cards ${(Object.entries(card).length > 0) ? "popup_opened" : ""}`}>
      <div className="popup__container-figure">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <figure className="popup__figure">
          <img className="popup__image" src={card.link} alt={card.name} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  )
}
  
export default ImagePopup;