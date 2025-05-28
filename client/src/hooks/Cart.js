import { useState, useEffect } from 'react';

export const useCart = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setList(storedCart);
  }, []);

  const addToCart = (toy, quantity = 1) => {
    const existingItem = list.find(item => item.toy.id === toy.id);

    let updatedCart;
    if (existingItem) {
      updatedCart = list.map(item =>
        item.toy.id === toy.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...list, { toy, quantity }];
    }

    setList(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (toyId) => {
    const updatedCart = list.filter(item => item.toy.id !== toyId);
    setList(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setList([]);
    localStorage.removeItem('cart');
  };

  return { list, addToCart, removeFromCart, clearCart };
};
