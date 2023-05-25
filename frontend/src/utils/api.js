export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._cohortId = this._options.cohortId;
    this._headers = this._options.headers;
  }

  // приватный метод проверки ответа от сервера
  _checkResponse(res) {
    if (res.ok)
      return res.json();
    return Promise.reject(`Код ошибки: ${res.status}`);
  }

  // публичный метод для получения информации о пользователе с сервера
  getUserData() {
    return fetch(this._baseUrl + '/' + this._cohortId + '/users/me', {
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для получения карточек с сервера
  getInitialCards() {
    return fetch(this._baseUrl + '/' + this._cohortId + '/cards', {
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для редактирования данных профиля на сервере
  editUserInfo(data) {
    return fetch(this._baseUrl + '/' + this._cohortId + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для редактирования аватара пользователя на сервере
  editUserAvatar(data) {
    return fetch(this._baseUrl + '/' + this._cohortId + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для добавления карточки на сервер
  createCard(data) {
    return fetch(this._baseUrl + '/' + this._cohortId + '/cards', {
      method: 'POST',
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
    return fetch(this._baseUrl + '/' + this._cohortId + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для постановки лайка на сервере
  likeCard(cardId) {
    return fetch(this._baseUrl + '/' + this._cohortId + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }

  // публичный метод для удаления лайка на сервере
  dislikeCard(cardId) {
    return fetch(this._baseUrl + '/' + this._cohortId + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: this._headers
    })
    .then((res) => this._checkResponse(res))
  }
}

const api = new Api({
  baseUrl: 'https://localhost:3001',
  cohortId: 'cohort-59',
  headers: {
    authorization: '553f0747-650c-4980-b831-611e9b7f89ca',
    'Content-Type': 'application/json'
  }
});

export default api;