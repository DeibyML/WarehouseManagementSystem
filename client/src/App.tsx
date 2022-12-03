import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

// Pages
import { NavBar } from './components/nav-bar';

export const App = () =>
  <div className='container'>
    <NavBar />
  </div>

export default App;
