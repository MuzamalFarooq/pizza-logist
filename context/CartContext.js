"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);


  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    
  };


  const toggleCart = () => {
    setIsOpen((prev) => !prev);
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, toggleCart, isOpen, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);