import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './compenents/Footer';
import Profile from './pages/Profile';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import UserProvider from './contexts/UserProvider';
import Header from './compenents/Header';

function App() {
  return (
    <div className="meals">
      <Header />
      <UserProvider>
        <Switch>
          <Route exact path="/" component={ LoginPage } />
          <Route path="/perfil" component={ Profile } />
          <Route path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        </Switch>
      </UserProvider>
      <Footer />
    </div>
  );
}

export default App;
