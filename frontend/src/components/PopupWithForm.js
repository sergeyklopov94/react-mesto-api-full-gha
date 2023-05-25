import React from 'react';

function PopupWithForm({name, title, buttonText, size, isOpen, onClose, children, onSubmit}) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_size-${size}`}>
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__content" name={`${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}
    
export default PopupWithForm;