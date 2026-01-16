import { useOutletContext } from "react-router";

function CartItem({ item }) {
  const { updateCart } = useOutletContext();

  function handleChange(e) {
    const value = Number(e.target.value);
    updateCart(item.id, value);
  }

  return (
    <div className="cart-item">
      <div className="img-container">
        <img src={item.image} alt="" />
      </div>
      <div className="item-info">
        <h3>{item.title}</h3>
        <input
          type="number"
          value={item.count}
          min="0"
          onChange={handleChange}
        />
      </div>
      <p className="item-price">${item.price}</p>
    </div>
  );
}

export default CartItem;
