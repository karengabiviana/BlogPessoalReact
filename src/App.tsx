import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Navbar from './components/Statics/navbar/Navbar';
import Footer from './components/Statics/footer/Footer';
import Login from './paginas/login/Login';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import Home from './paginas/home/Home';
import ListaTema from './components/temas/listaTema/ListaTema';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <div style={{ minHeight: "100vh" }}>

          <Route exact path="/">
            <Login />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/home">
            <Home />
          </Route>

          <Route path="/usuarios/cadastrar">
            <CadastroUsuario />
          </Route>

          <Route path="/temas">
            < ListaTema />
          </Route>

          <Route path="/postagens">
            < ListaPostagem />
          </Route>

          <Route exact path='/post/postagens'>
            <CadastroPostagem />
          </Route>
          <Route exact path='/post/postagens/:id'>
            <CadastroPostagem />
          </Route>

          <Route exact path='/formularioTema'>
            <CadastroTema />
          </Route>
          <Route exact path='/formularioTema/:id'>
            <CadastroTema />
          </Route>

          <Route exact path='delete/postagens/:id'>
            <DeletarPostagem />
          </Route>
          <Route exact path='delete/temas/:id'>
            <DeletarTema />
          </Route>

        </div>
      </Switch>
      <Footer />

    </Router>
  );
}

export default App;
