export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._cohortId = this._options.cohortId;
    this._headers = this._options.headers;
    this._credentials = options.credentials;
  }

  // приватный метод проверки ответа от сервера
  _checkResponse(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(`Код ошибки: ${res.status}`);
  }

  // публичный метод для получения информации о пользователе с сервера
  getUserData() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
      credentials: this._credentials,
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для получения карточек с сервера
  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers,
      credentials: this._credentials,
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для редактирования данных профиля на сервере
  editUserInfo({ name, about }) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для редактирования аватара пользователя на сервере
  editUserAvatar({ avatar }) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      credentials: this._credentials,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для добавления карточки на сервер
  createCard(data) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      credentials: this._credentials,
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для удаления карточки на сервере
  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для постановки лайка на сервере
  likeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      credentials: this._credentials,
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для удаления лайка на сервере
  dislikeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      credentials: this._credentials,
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    authorization: '553f0747-650c-4980-b831-611e9b7f89ca',
    'Content-Type': 'application/json'
  },
  credentials: 'include',
});

export default api;