import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Statics/navbar/Navbar';
import Footer from './components/Statics/footer/Footer';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import Home from './paginas/home/Home';
import { Grid } from '@material-ui/core';
import './App.css';

function App() {
  return (
  <Router>
    <Navbar />
      <Switch>
        <div style={{ minHeight:"100vh" }}>
          <Route exact path="/">
              <Login />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/home">
              <Home />
          </Route>
          <Route path="/cadastrousuario">
              <CadastroUsuario />
          </Route>
        </div>
      </Switch>
    <Footer />
    
  </Router>
  );
}

export default App;
