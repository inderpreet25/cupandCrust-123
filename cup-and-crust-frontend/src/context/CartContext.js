import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CartContext = createContext();

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

function getAuthHeaders() {
  const token = localStorage.getItem("token"); // optional JWT
  return token ? token : console.log("No Token Found");
  ;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  // Helper: send request and optionally return data
  const api = axios.create({
    baseURL: API_BASE,
    headers: { Authorization: getAuthHeaders() },
  });

  // Load cart from backend on mount if user exists
  useEffect(() => {
    const loadCart = async () => {
      setLoadingCart(true);
      try {
        const res = await api.get("/cart");
        // assume res.data.items or res.data.cart.items
        const items = res.data?.items ?? res.data?.cart?.items ?? [];
        setCartItems(items);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoadingCart(false);
      }
    };

    loadCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  // utility: sync full cart to backend (fallback)
  const syncFullCart = async (newCart) => {
    const userId = localStorage.getItem("loggedInUser");
    if (!userId) return;

    try {
      await api.post("/cart/sync", { userId, items: newCart });
    } catch (err) {
      console.error("Failed to sync cart:", err);
    }
  };

  const addToCart = async (item) => {
    // optimistic UI update
    const exists = cartItems.find((i) => i.id === item.id);
    const prev = cartItems;
    let newCart;
    if (exists) {
      newCart = cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newCart = [...cartItems, { ...item, quantity: 1 }];
    }
    setCartItems(newCart);


    try {

      await api.post("/cart/add", item);
    } catch (err) {
      console.error("Failed to add to cart on server:", err);
      // rollback UI
      setCartItems(prev);
    }
  };

  const updateQuantity = async (itemId, qty) => {
    if (qty <= 0) {
      return removeFromCart(itemId);
    }

    const prev = cartItems.map((i) => ({ ...i }));

    setCartItems((items) =>
      items.map((item) => (item.id === itemId ? { ...item, quantity: qty } : item))
    );

    try {
      await api.post("/cart/update", { itemId, quantity: qty });
    } catch (err) {
      console.error("Failed to update quantity on server:", err);
      // rollback UI to previous stable state
      setCartItems(prev);
    }
  };

  const removeFromCart = async (itemId) => {
    // take a shallow snapshot so we can rollback if API fails
    const prev = cartItems.map((i) => ({ ...i }));



    // optimistic UI: remove locally right away
    setCartItems((items) => items.filter((i) => i.id !== itemId));


    try {
      // POST to your remove endpoint. Adjust payload/URL if your backend expects { productId } or a different route.
      // send body with axios.delete by using the `data` option
      const res = await api.delete("/cart/remove", { data: { itemId } });


      // If backend returns the updated cart, keep UI in sync with server truth
      if (res?.data?.cart?.items) {
        setCartItems(res.data.cart.items);
      }
      return res;
    } catch (err) {
      console.error("Failed to remove item on server:", err);
      // rollback UI to previous stable state
      setCartItems(prev);
      // rethrow if callers want to handle the error
      throw err;
    }
  };



  const clearCart = async () => {
    // make a shallow copy for rollback (important!)
    const prev = cartItems.map((i) => ({ ...i }));

    // optimistic clear
    setCartItems([]);

    try {
      await api.post("/cart/clear");
    } catch (err) {
      console.error("Failed to clear server cart:", err);
      // rollback UI on failure
      setCartItems(prev);
    }
  };


  // calculated total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  // If you want to periodically ensure server and client are in sync,
  // you could call syncFullCart(cartItems) at certain times (e.g. on logout).

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
        loadingCart,
        syncFullCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

export default CartContext;
