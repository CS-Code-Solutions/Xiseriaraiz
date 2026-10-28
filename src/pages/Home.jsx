// src/pages/Home.jsx
import React, { useState } from 'react';
import { ChefHat, Smartphone } from 'lucide-react';

export default function Home({ setRoute, setTableNumber }) {
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState('');

  const handleAdminLogin = () => {
    if (adminPassword === '1234') {
      setRoute('admin');
    } else {
      setError('Senha incorreta!');
    }
  };

  const handleSimulateClient = () => {
    setTableNumber('1');
    setRoute('client');
  };

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <div className="bg-[#1e1e1e] p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-5xl font-black text-[#d32f2f] tracking-tighter mb-1">RAIZ</h1>
        <p className="text-gray-400 text-sm tracking-[0.3em] mb-8">XISERIA • CIA</p>
        
        <h2 className="text-white text-xl mb-6">Simulador do Sistema</h2>

        <button 
          onClick={handleSimulateClient}
          className="w-full bg-[#d32f2f] hover:bg-red-700 text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2 mb-4 transition-all"
        >
          <Smartphone size={20} />
          Simular Cliente (Mesa 1)
        </button>

        <div className="bg-[#2a2a2a] p-4 rounded-xl mt-6">
          <div className="flex items-center justify-center gap-2 text-gray-300 mb-4 font-bold">
            <ChefHat size={20} />
            Acesso da Cozinha
          </div>
          <input 
            type="password" 
            placeholder="Senha do Admin (1234)" 
            className="w-full bg-[#121212] text-white border border-gray-700 p-3 rounded-lg mb-3 text-center"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button 
            onClick={handleAdminLogin}
            className="w-full bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg font-bold transition-all"
          >
            Entrar no Painel
          </button>
        </div>
      </div>
    </div>
  );
}
