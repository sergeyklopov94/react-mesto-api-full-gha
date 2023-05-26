import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardDelete, onCardLike}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  const cardLikeButtonClassName = ( 
    `element__like-button ${isLiked && 'element__like-button_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    console.log("currentUser " + currentUser);
    console.log("isLiked " + isLiked);
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  
  return (
    <li className="element">
      {isOwn && <button className="element__delete-button" type="button" onClick={handleDeleteClick} />}
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <div className="element__info">
        <h2 className="element__name">{card.name}</h2>
        <div className="element__like-section">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="element__like-number">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}
  
export default Card;