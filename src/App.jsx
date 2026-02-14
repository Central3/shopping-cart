import Navbar from "./components/Navbar";
import { Outlet, useLoaderData } from "react-router";
import { useState } from "react";
import "./App.css";

function App() {
  const { data } = useLoaderData();
  const [cart, setCart] = useState([]);

  function updateCartItem(product, delta) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (!existingItem) {
        return [...prevCart, { ...product, count: delta }];
      }

      const newCount = existingItem.count + delta;

      if (newCount < 1) {
        return prevCart.filter((item) => item.id !== product.id);
      }

      return prevCart.map((item) =>
        item.id === product.id ? { ...item, count: newCount } : item
      );
    });
  }

  return (
    <>
      <Navbar cart={cart} />
      <main id="content-display">
        <Outlet context={{ data, cart, updateCartItem }} />
      </main>
    </>
  );
}

export default App;
