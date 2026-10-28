// src/pages/ClientMenu.jsx
import React, { useState } from 'react';
import { ShoppingCart, Plus, Check, ArrowLeft } from 'lucide-react';
import { menuCategories, aditionalItems } from '../data/menuData';

export default function ClientMenu({ tableNumber, setRoute }) {
  const [cart, setCart] = useState([]);
  const [orderSent, setOrderSent] = useState(false);

  const addToCart = (item) => {
    setCart([...cart, { ...item, cartId: Date.now(), adicionais: [] }]);
  };

  const addAdicional = (cartId, adicional) => {
    setCart(cart.map(item => {
      if (item.cartId === cartId) {
        return { ...item, adicionais: [...item.adicionais, adicional] };
      }
      return item;
    }));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const itemTotal = item.price + item.adicionais.reduce((sum, add) => sum + add.price, 0);
      return total + itemTotal;
    }, 0);
  };

  const sendOrder = () => {
    if (cart.length === 0) return;
    
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      table: tableNumber,
      items: cart,
      total: getCartTotal(),
      timestamp: Date.now(),
      status: 'pendente'
    };

    // Salvando no LocalStorage
    const existingOrders = JSON.parse(localStorage.getItem('raiz_orders')) || [];
    localStorage.setItem('raiz_orders', JSON.stringify([...existingOrders, newOrder]));

    setOrderSent(true);
    setCart([]);
  };

  if (orderSent) {
    return (
      <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-green-600 p-6 rounded-full mb-6">
          <Check size={48} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Pedido Enviado!</h2>
        <p className="text-gray-400 mb-8">A cozinha já recebeu seu pedido e ele está sendo preparado.</p>
        <button 
          onClick={() => setOrderSent(false)}
          className="bg-[#d32f2f] text-white px-8 py-3 rounded-lg font-bold"
        >
          Fazer novo pedido
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] pb-24">
      {/* Header */}
      <header className="bg-[#1a1a1a] p-4 sticky top-0 z-10 shadow-md flex justify-between items-center border-b border-red-900">
        <button onClick={() => setRoute('home')} className="text-gray-400">
          <ArrowLeft size={24} />
        </button>
        <div className="text-center">
          <h1 className="text-2xl font-black text-[#d32f2f]">RAIZ</h1>
          <p className="text-gray-400 text-xs">Mesa {tableNumber}</p>
        </div>
        <div className="w-6"></div> {/* Spacer */}
      </header>

      {/* Menu List */}
      <div className="p-4 space-y-8 max-w-2xl mx-auto">
        {menuCategories.map((category, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold text-white border-b-2 border-[#d32f2f] pb-2 mb-4">
              {category.title}
            </h2>
            <div className="space-y-4">
              {category.items.map(item => (
                <div key={item.id} className="bg-[#1e1e1e] p-4 rounded-xl flex justify-between items-center shadow-lg">
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2 pr-2">{item.desc}</p>
                    <p className="text-[#d32f2f] font-bold mt-1">R$ {item.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-[#2a2a2a] hover:bg-[#d32f2f] text-white p-3 rounded-lg transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Resumo do Carrinho Fixo no Rodapé */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-[#1e1e1e] border-t border-gray-800 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-20">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <div>
              <p className="text-gray-400 text-sm">{cart.length} item(s)</p>
              <p className="text-white font-bold text-xl">R$ {getCartTotal().toFixed(2)}</p>
            </div>
            <button 
              onClick={sendOrder}
              className="bg-[#d32f2f] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-700"
            >
              <ShoppingCart size={20} />
              Enviar Pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
