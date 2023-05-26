export const BASE_URL = 'https://api.sergklo94.nomoredomains.rocks';

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({password, email})
  })
  .then((res) => {
    if (res.ok) 
      return res.json();
    return Promise.reject(res.status);
  });
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({email, password})
    })
    .then((res) => {
      if (res.ok) 
        return res.json();
      return Promise.reject(res.status);
    });
  };

  export const checkToken = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${token}`
      },
      credentials: 'include',
    })
    .then((res) => {
      if (res.ok) 
        return res.json();
      return Promise.reject(res.status);
    });
  };

  export const logout = () => {
    return fetch(`${BASE_URL}/signout`, {
      method: "GET",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      })
      .then((res) => {
        if (res.ok) 
          return res.json();
        return Promise.reject(res.status);
    });
  };