import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Statics/navbar/Navbar';
import Footer from './components/Statics/footer/Footer';
import Login from './paginas/login/Loginn';
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import Home from './paginas/home/Home';
import ListaTema from './components/temas/listaTema/ListaTema';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem';
import DeletarTema from './components/temas/deletarTema/DeletarTema';
import store from './store/store';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer/>
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

            <Route exact path='/formularioPostagens'>
              <CadastroPostagem />
            </Route>
            <Route exact path='/formularioPostagens/:id'>
              <CadastroPostagem />
            </Route>

            <Route exact path='/formularioTema'>
              <CadastroTema />
            </Route>
            <Route exact path='/formularioTema/:id'>
              <CadastroTema />
            </Route>

            <Route exact path='/deletarPostagens/:id'>
              <DeletarPostagem />
            </Route>
            <Route exact path='/deletarTemas/:id'>
              <DeletarTema />
            </Route>

          </div>
        </Switch>
        <Footer />

      </Router>
    </Provider>
  );
}

export default App;
