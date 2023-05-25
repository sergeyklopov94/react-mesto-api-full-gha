import React from 'react';

const Login = ({handleLogin}) => {

  const [formValue, setFormValue] = React.useState({email: '', password: ''});
  
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormValue({...formValue, [name]: value});
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(formValue.email, formValue.password, setFormValue);
  }

  return (
    <main className="sign">
    <div className="sign__container">
      <h3 className="sign__header">Вход</h3>
      <form className="sign__form"
        name="sign-up-form"
        onSubmit={handleSubmit}>
        <fieldset className="sign__input-container">
          <input className="sign__input"
            name="email"
            id="email"
            type="email"
            minLength="2"
            maxLength="40"
            placeholder="Email"
            required
            onChange={handleChange}
            value={formValue.email}
            autoComplete="current-username"
          >
          </input>
          <input className="sign__input"
            name="password"
            id="password"
            type="password"
            minLength="3"
            maxLength="20"
            placeholder="Password"
            required
            onChange={handleChange}
            value={formValue.password}
            autoComplete="current-password"
          >
          </input>
        </fieldset>
        <button className="sign__button" type="submit">Войти</button>
      </form>
    </div>
  </main>
  );
}
   
export default Login;