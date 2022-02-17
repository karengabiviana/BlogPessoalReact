import React from 'react';
import Navbar from './components/Statics/navbar/Navbar';
import Home from './paginas/home/Home';
import Footer from './components/Statics/footer/Footer';
import { Grid } from '@material-ui/core';
import './App.css';

function App() {
  return (
  <>
    <Navbar />
    <Home  />
    <Footer/>

  </>
  );
}

export default App;
