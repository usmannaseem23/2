"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  inStock: boolean;
  stock: number;
}

type CartContextType = {
  cartItems: CartItem[];
  wishlist: CartItem[];
  addToCart: (item: CartItem) => void;
  addToWishlist: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  clearCart: () => void;
  clearWishlist: () => void;
  decreaseQuantity: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<CartItem[]>([]);

  // Load cart and wishlist from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    const storedWishlist = localStorage.getItem("wishlistItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  // Save cart and wishlist to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add to Cart (only if the product is in stock)
  const addToCart = (item: CartItem) => {
    if (!item.inStock) {
      console.log("Cannot add out-of-stock product to cart.");
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Add to Wishlist (works for both in-stock and out-of-stock products)
  const addToWishlist = (item: CartItem) => {
    setWishlist((prevItems) => {
      const existingItem = prevItems.find(
        (wishlistItem) => wishlistItem.id === item.id
      );
      if (existingItem) {
        return prevItems; // Item already exists in wishlist
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // Remove from Cart
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== id)
    );
  };

  // Remove from Wishlist
  const removeFromWishlist = (id: string) => {
    setWishlist((prevItems) =>
      prevItems.filter((wishlistItem) => wishlistItem.id !== id)
    );
  };

  // Clear Cart
  const clearCart = () => setCartItems([]);

  // Clear Wishlist
  const clearWishlist = () => setWishlist([]);

  // Decrease Quantity in Cart
  const decreaseQuantity = (id: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
        clearCart,
        clearWishlist,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
export default CartProvider