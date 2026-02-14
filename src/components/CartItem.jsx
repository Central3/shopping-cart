import { useOutletContext } from "react-router";
import Icon from "@mdi/react";
import { mdiDeleteOutline } from "@mdi/js";

function CartItem({ item }) {
  const { updateCartItem } = useOutletContext();

  function handleIncrease() {
    updateCartItem(item, 1);
  }

  function handleDecrease() {
    updateCartItem(item, -1);
  }

  return (
    <div className="cart-item" data-testid="cart-item">
      <div className="img-container">
        <img src={item.image} alt="" />
      </div>
      <div className="item-info">
        <h3>{item.title}</h3>
        <div className="quantity">
          <button
            className={`qty-btn ${item.count === 1 ? "del-btn" : ""}`}
            onClick={handleDecrease}
            aria-label={item.count === 1 ? "Remove-item" : "Decrease-quantity"}
          >
            {item.count !== 1 ? "-" : <Icon path={mdiDeleteOutline} size={1} />}
          </button>
          {item.count}
          <button
            className="qty-btn"
            onClick={handleIncrease}
            aria-label="Increase-quantity"
          >
            +
          </button>
        </div>
      </div>
      <p className="item-price">${item.price}</p>
    </div>
  );
}

export default CartItem;
