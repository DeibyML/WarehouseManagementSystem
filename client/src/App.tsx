import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// Pages
import { Clients, HomePage, NotFound, Orders, Products } from './pages/Index';
import PostContext from './context/postContext';

export const App = () =>
  <div className='bg-neutral-900 min-h-screen flex items-center'>
    <div className='px-10 container m-auto text-white'>
      <PostContext>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PostContext>
    </div>
  </div>

export default App;
