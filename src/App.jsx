// src/App.jsx
import React, { useState } from 'react';
import Home from './pages/Home';
import ClientMenu from './pages/ClientMenu';
import AdminPanel from './pages/AdminPanel';

export default function App() {
  const [route, setRoute] = useState('home');
  const [tableNumber, setTableNumber] = useState('');

  return (
    <div className="font-sans antialiased text-white">
      {route === 'home' && (
        <Home setRoute={setRoute} setTableNumber={setTableNumber} />
      )}
      
      {route === 'client' && (
        <ClientMenu setRoute={setRoute} tableNumber={tableNumber} />
      )}
      
      {route === 'admin' && (
        <AdminPanel setRoute={setRoute} />
      )}
    </div>
  );
}
