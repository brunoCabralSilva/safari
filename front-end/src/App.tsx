import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import ShoppingCart from './pages/ShoppingCart';
import Profile from './pages/Profile';
import Requests from './pages/Requests';

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate replace to ="/home" />}
      />
      <Route
        path="/home"
        element={<Home />}
      />
      <Route
        path="/favoritos"
        element={<Favorites />}
      />
      <Route
        path="/carrinho-de-compras"
        element={<ShoppingCart />}
      />
      <Route
        path="/meus-pedidos"
        element={<Requests />}
      />
      <Route
        path="/perfil"
        element={<Profile />}
      />
    </Routes>
  );
}
