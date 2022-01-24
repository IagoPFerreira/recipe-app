import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
// import '../styles/style.css';

function LoginPage() {
  const contextUser = useContext(UserContext);
  const { userEmail, setUserEmail, userPassw, setUserPassw } = contextUser;
  const [validEmail, setValidEmail] = useState(false);
  const [validPassw, setValidPassw] = useState(false);
  const [btnLogin, setBtnLogin] = useState(true);

  useEffect(() => {
    if (validEmail && validPassw) {
      setBtnLogin(false);
    } else { setBtnLogin(true); }
  }, [validEmail, validPassw]);

  function handleChanges(event, setState, setValid, type) {
    let validated = false;
    const passwordMinimumLength = 7;
    const { value } = event.target;
    if (type === 'email' && /\S+@\S+\.\S+/.test(value)) {
      validated = true;
    }
    if (type === 'password' && value.length >= passwordMinimumLength) {
      validated = true;
    }
    setState(value);
    if (validated === true) {
      setValid(true);
    }
  }

  function setLocalStorage() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    const setUser = { email: userEmail };
    const emailStringFly = JSON.stringify(setUser);
    localStorage.setItem('user', emailStringFly);
    const initialObj = {
      cocktails: {},
      meals: {},
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(initialObj));
  }

  return (
    <section className="login-main">
      <div className="login-box">
        <label htmlFor="emailInput" className="login-label">
          E-mail
          <input
            className="login-input"
            data-testid="email-input"
            id="emailInput"
            type="email"
            name="email"
            value={ userEmail }
            onChange={
              (event) => handleChanges(event, setUserEmail, setValidEmail, 'email')
            }
            required
            placeholder="ex.ex@exemplo.com"
          />
        </label>

        <label htmlFor="passwordInput" className="login-label">
          Senha
          <input
            className="login-input"
            data-testid="password-input"
            id="passwordInput"
            type="password"
            name="password"
            value={ userPassw }
            onChange={
              (event) => handleChanges(event, setUserPassw, setValidPassw, 'password')
            }
            placeholder="Min. 7 characters"
          />
        </label>
        <Link to="/comidas">
          <button
            className="login-button"
            data-testid="login-submit-btn"
            type="submit"
            disabled={ btnLogin }
            onClick={ setLocalStorage }
          >
            Entrar
          </button>
        </Link>
      </div>
    </section>
  );
}

export default LoginPage;
