import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext, currentData } from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';
import errorIcon from '../images/no-success-icon.svg';
import successIcon from '../images/success-icon.svg';


function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);

  const [infoTooltipData, setInfoTooltipData] = React.useState({image: null, text: ''});

  const [selectedCard, setSelectedCard] = React.useState({});

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState(currentData);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();
  
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleCardClick({name, link}) {
    setSelectedCard({name, link});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.dislikeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.likeCard(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(err);
        });
    }
} 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter(c => c._id !== card._id));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser({ name, about }) {
    api.editUserInfo({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api.editUserAvatar({ avatar })
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(email, password, setFormValue) {
    let infoTooltipText = '';
    let infoTooltipImage = null;
    auth.authorize(email, password)
      .then((res) => {
        if (res) {
          setFormValue({email: '', password: ''});
          navigate('/', {replace: true});
          setEmail(email);
          setLoggedIn(true);
          infoTooltipText = 'Вы успешно вошли!';
          infoTooltipImage = successIcon;
        }
      })
      .catch((err) => {
        console.log(err);
        infoTooltipText = 'Что-то пошло не так! Попробуйте еще раз.';
        infoTooltipImage = errorIcon;
      })
      .finally(() => {
        setInfoTooltipData({image: infoTooltipImage, text: infoTooltipText});
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogout() {
    auth.logout()
      .then((res) => {
        setLoggedIn(false);
        setEmail('');
      })
      .catch((err) => { 
        console.log(err);
    });
  }

  function handleRegister(formValue) {
    let infoTooltipText = '';
    let infoTooltipImage = null;
    const { password, email } = formValue;
    auth.register(password, email)
      .then((res) => {
        navigate('/sign-in', {replace: true});
        infoTooltipText = 'Вы успешно зарегистрировались!';
        infoTooltipImage = successIcon;
      })
      .catch((err) => {
        console.log(err);
        infoTooltipText = 'Что-то пошло не так! Попробуйте еще раз.';
        infoTooltipImage = errorIcon;
      })
      .finally(() => {
        setInfoTooltipData({image: infoTooltipImage, text: infoTooltipText});
        setIsInfoTooltipOpen(true);
      });
  }

  React.useEffect(() => {
    auth.checkToken()
      .then((res) => {
        if (res) {
          setEmail(res.email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
      });
      // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    if(loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cardData]) => {
          setCurrentUser(userData);
          setCards(cardData.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root" id="root">
        <Header 
          email={email} 
          onLogout={handleLogout}/>
        <Routes>
          <Route path="/sign-up" element={
            <Register handleRegister={handleRegister} />} />
          <Route path="/sign-in" element={
            <Login handleLogin={handleLogin} />} />
          <Route path="/" element={
            <ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              cards={cards}
              onEditProfile ={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
          }/>
          <Route path="/*" element={<Navigate to="/" replace/>} />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup 
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        >
        </ImagePopup>
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          image={infoTooltipData.image}
          text={infoTooltipData.text}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;