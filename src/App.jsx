import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main id="content-display">
        <Outlet />
      </main>
    </>
  );
}

export default App;
