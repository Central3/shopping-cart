import { Link } from "react-router";

function Navbar() {
  return (
    <nav>
      <ul className="nav-items">
        <li className="nav-item">
          <Link to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="shop">Shop</Link>
        </li>
        <li className="nav-item">
          <Link to="cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
