import React, { createContext, useContext, useState } from "react";
import { useLocalStorage } from "../components/useLocalStorage";

type CartItem = {
  id: number;
  quantity: number;
};

type cartContext = {
  openCard: () => void;
  closeCard: () => void;
  cartQuantity: number;
  cartItem: CartItem[];
  getItemQuantity: (id: number) => number;
  increaseItemQuantity: (id: number) => void;
  decreaseItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext({} as cartContext);

interface CartContextProviderProps {
  children: React.ReactNode;
}

export function useShoppingCart() {
  return useContext(CartContext);
}
export const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [cartItem, setCartItem] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItem.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const openCard = () => setOpen(true);
  const closeCard = () => setOpen(false);

  function getItemQuantity(id: number): number {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseItemQuantity(id: number) {
    setCartItem((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseItemQuantity(id: number) {
    setCartItem((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id === id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeFromCart(id: number) {
    setCartItem((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeFromCart,
        cartItem,
        cartQuantity,
        openCard,
        closeCard,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
