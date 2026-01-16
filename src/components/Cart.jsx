import { useOutletContext } from "react-router";
import CartItem from "./CartItem";

function Cart() {
  const { cart } = useOutletContext();

  if (cart.length < 1) return "Cart is empty";

  function cartTotal() {
    return cart.reduce((total, item) => total + item.count * item.price, 0);
  }

  return (
    <>
      <h1>Cart</h1>
      <div className="cart-items">
        {cart.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
        <p>Total: {cartTotal()}</p>
      </div>
    </>
  );
}

export default Cart;
