import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = React.useRef();

  function handleEditAvatarSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm 
      name="edit-avatar" 
      title="Обновить аватар"
      buttonText="Сохранить"
      size="m" 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleEditAvatarSubmit}
    >
      <input className="popup__info"
        type="url"
        id="avatar-link-input"
        name="link"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      >
      </input>
    </PopupWithForm>
  )
}
  
export default EditAvatarPopup;