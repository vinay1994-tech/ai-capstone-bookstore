import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (book, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === book.id);
      if (existing) {
        return prev.map((i) =>
          i.id === book.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...book, qty }];
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== bookId));
  };

  const updateQty = (bookId, qty) => {
    if (qty < 1) {
      removeFromCart(bookId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === bookId ? { ...i, qty } : i))
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
        user,
        setUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
