"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("libas-cart");

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        const normalizedCart = parsedCart.map((item) => ({
          ...item,
          id: String(item.id || item._id),
        }));

        setCart(normalizedCart);
      } catch (error) {
        console.error("CART LOAD ERROR:", error);
        localStorage.removeItem("libas-cart");
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("libas-cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  const addToCart = (product, selectedSize) => {
    const productId = String(product._id || product.id);

    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) =>
          item.id === productId &&
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === productId &&
          item.selectedSize === selectedSize
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          id: productId,
          selectedSize,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id, selectedSize) => {
    const productId = String(id);

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId &&
        item.selectedSize === selectedSize
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id, selectedSize) => {
    const productId = String(id);

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId &&
          item.selectedSize === selectedSize
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, selectedSize) => {
    const productId = String(id);

    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          !(
            item.id === productId &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}