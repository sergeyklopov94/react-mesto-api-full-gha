import React from 'react';
import { Link } from 'react-router-dom';

const Register = ({handleRegister}) => {

  const [formValue, setFormValue] = React.useState({email: '', password: ''})
  
  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setFormValue({...formValue, [name]: value});
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(formValue);
  }
    
  return (
      <main className="sign">
        <div className="sign__container">
          <h3 className="sign__header">Регистрация</h3>
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
            <button className="sign__button" type="submit">Зарегистрироваться</button>
          </form>
          <p className="sign__text">Уже зарегистрированы?
            <Link to="/sign-in" className="sign__link"> Войти</Link>
          </p>
        </div>
      </main>
  );
}
   
export default Register;