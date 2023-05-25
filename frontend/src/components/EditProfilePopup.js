import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

  const [name, setName] = React.useState('');

  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 


  function handleEditProfileSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    })
  } 

  return (
    <PopupWithForm 
      name="edit-profile" 
      title="Редактировать профиль"
      buttonText="Сохранить"
      size="l"
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleEditProfileSubmit}
    >
      <input className="popup__info"
        type="text"
        id="name-input"
        name="name"
        placeholder="Имя"
        onChange={handleNameChange}
        value={name || ''}
        minLength="2"
        maxLength="40"
        required>
      </input>
      <input className="popup__info"
        type="text"
        id="about-name"
        name="about"
        placeholder="О себе"
        onChange={handleDescriptionChange}
        value={description || ''}
        minLength="2"
        maxLength="200"
        required>
      </input>
    </PopupWithForm>
  )
}
  
export default EditProfilePopup;