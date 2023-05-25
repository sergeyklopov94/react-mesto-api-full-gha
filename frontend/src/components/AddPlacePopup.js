import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

  const [cardName, setCardName] = React.useState('');

  const [cardLink, setCardLink] = React.useState('');

  function handleCardNameChange(evt) {
    setCardName(evt.target.value);
  }

  function handleCardLinkChange(evt) {
    setCardLink(evt.target.value);
  }

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
        name: cardName,
        link: cardLink,
      })
  
      setCardName('');
      setCardLink('');
    } 

  return (
    <PopupWithForm
      name="add-cards"
      title="Новое место"
      buttonText="Создать"
      size="l"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit} 
    >
      <input className="popup__info"
        type="text"
        name="name"
        id="appelation-input"
        placeholder="Название"
        minLength="2" 
        maxLength="30" 
        required
        onChange={handleCardNameChange}
        value={cardName}
      >
      </input>
      <input className="popup__info"
        type="url"
        name="link"
        id="link-input"
        placeholder="Ссылка на картинку"
        required
        onChange={handleCardLinkChange}
        value={cardLink}
      >
      </input> 
    </PopupWithForm>
  )
}
  
export default AddPlacePopup;