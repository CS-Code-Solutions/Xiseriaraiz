// src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, ArrowLeft } from 'lucide-react';

export default function AdminPanel({ setRoute }) {
  const [orders, setOrders] = useState([]);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Atualiza o relógio a cada segundo e busca pedidos novos no localStorage
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
      const savedOrders = JSON.parse(localStorage.getItem('raiz_orders')) || [];
      // Mostra apenas os pendentes
      setOrders(savedOrders.filter(o => o.status === 'pendente'));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const completeOrder = (orderId) => {
    const allOrders = JSON.parse(localStorage.getItem('raiz_orders')) || [];
    const updatedOrders = allOrders.map(o => 
      o.id === orderId ? { ...o, status: 'concluido' } : o
    );
    localStorage.setItem('raiz_orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders.filter(o => o.status === 'pendente'));
  };

  // Função para formatar o cronômetro
  const getElapsedTime = (timestamp) => {
    const diff = Math.floor((currentTime - timestamp) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#121212] p-6">
      <header className="flex justify-between items-center mb-8 bg-[#1e1e1e] p-4 rounded-xl">
        <button onClick={() => setRoute('home')} className="text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-white">PAINEL DA <span className="text-[#d32f2f]">COZINHA</span></h1>
        <div className="text-white flex items-center gap-2 bg-[#d32f2f] px-3 py-1 rounded-full">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          Recebendo Pedidos
        </div>
      </header>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Clock size={48} className="mb-4 opacity-50" />
          <p className="text-xl">Nenhum pedido na fila. Cozinha limpa!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-[#1e1e1e] border-l-4 border-[#d32f2f] rounded-xl p-5 shadow-xl flex flex-col">
              
              {/* Cabeçalho do Card */}
              <div className="flex justify-between items-start border-b border-gray-700 pb-3 mb-3">
                <div>
                  <h2 className="text-2xl font-black text-white">Mesa {order.table}</h2>
                  <p className="text-gray-400 text-sm">ID: #{order.id}</p>
                </div>
                <div className="bg-[#2a2a2a] text-[#d32f2f] font-mono font-bold px-3 py-1 rounded-lg text-xl flex items-center gap-2">
                  <Clock size={18} />
                  {getElapsedTime(order.timestamp)}
                </div>
              </div>

              {/* Itens do Pedido */}
              <div className="flex-1 space-y-3 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-white">
                    <p className="font-bold text-lg">• 1x {item.name}</p>
                    {item.adicionais.map((add, i) => (
                      <p key={i} className="text-sm text-gray-400 pl-4">+ {add.name}</p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Rodapé / Botão Ação */}
              <button 
                onClick={() => completeOrder(order.id)}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-lg flex justify-center items-center gap-2 transition-colors text-lg mt-auto"
              >
                <CheckCircle size={24} />
                Finalizar e Entregar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
