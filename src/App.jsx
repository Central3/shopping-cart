import Navbar from "./components/Navbar";
import { Outlet, useLoaderData } from "react-router";
import { useState } from "react";
import "./App.css";

function App() {
  const { data } = useLoaderData();
  const [cart, setCart] = useState([]);

  function handleAddCart(item, count) {
    if (count < 1) {
      setCart(cart.filter((obj) => obj.id !== item.id));
      return;
    }

    const isExists = cart.find((obj) => obj.id === item.id);
    if (isExists) {
      setCart(
        cart.map((obj) => (obj.id === item.id ? { ...item, count } : obj))
      );
    } else {
      setCart([...cart, { ...item, count }]);
    }
  }

  return (
    <>
      <Navbar />
      <main id="content-display">
        <Outlet context={{ data, handleAddCart, cart }} />
      </main>
    </>
  );
}

export default App;
