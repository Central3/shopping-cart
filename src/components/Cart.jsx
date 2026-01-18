import { useOutletContext } from "react-router";
import CartItem from "./CartItem";

function Cart() {
  const { cart } = useOutletContext();

  const totalPrice = cart.reduce(
    (total, item) => total + item.count * item.price,
    0
  );

  const totalItems = cart.reduce((total, item) => total + item.count, 0);

  return (
    <>
        <section className="cart">
          <div className="cart-items">
            {cart.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </div>
          <div className="checkout">
            <p>
              Subtotal ({totalItems} {cart.length > 1 ? "items" : "item"}): $
              {totalPrice.toFixed(2)}
            </p>
            <button className="checkout-btn">Checkout</button>
          </div>
        </section>
    </>
  );
}

export default Cart;
