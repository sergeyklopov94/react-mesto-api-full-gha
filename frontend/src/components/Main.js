import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, onCardLike}) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content root__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" onClick={onEditAvatar}/>
        </div>
        <div className="profile__info">
          <div className="profile__edit-name">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        <ul className="elements-container">
          {cards.map((card) => (
            <Card 
              card={card}
              onCardClick={onCardClick}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike} 
              key={card._id}>
            </Card>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;