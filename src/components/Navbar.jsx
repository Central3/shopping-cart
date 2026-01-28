import Icon from "@mdi/react";
import { mdiCartOutline, mdiCart } from "@mdi/js";
import { Link } from "react-router";

function Navbar({ cart }) {
  const cartItemsCount = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <nav>
      <ul className="nav-items">
        <div className="spacer"></div>
        <li className="nav-item">
          <Link to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="shop">Shop</Link>
        </li>
        <div className="spacer"></div>
        <li className="nav-item nav-cart">
          <Link to="cart">
            {cart.length < 1 ? (
              <Icon path={mdiCartOutline} size={1} />
            ) : (
              <Icon path={mdiCart} size={1} />
            )}
          </Link>
          {cart.length > 0 ? (
            <span className="counter-badge" data-testid="badge">
              {cartItemsCount}
            </span>
          ) : (
            ""
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
