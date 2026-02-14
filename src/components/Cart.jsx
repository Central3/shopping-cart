import { useOutletContext, Link } from "react-router";
import Icon from "@mdi/react";
import { mdiArrowLeftCircle } from "@mdi/js";
import CartItem from "./CartItem";

function Cart() {
  const { cart } = useOutletContext();

  const totalPrice = cart.reduce(
    (total, item) => total + item.count * item.price,
    0
  );

  const cartItemsCount = cart.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
      {cart.length < 1 ? (
        <div className="empty">
          <h2>Your Cart is empty</h2>

          <Link to="/shop">
            <Icon className="back-btn" path={mdiArrowLeftCircle} size={1} />
            Back to shop
          </Link>
        </div>
      ) : (
        <section className="cart">
          <div className="cart-items">
            {cart.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </div>
          <div className="checkout">
            <p>
              Subtotal ({cartItemsCount} {cartItemsCount > 1 ? "items" : "item"}
              ): ${totalPrice.toFixed(2)}
            </p>
            <button className="checkout-btn">Checkout</button>
          </div>
        </section>
      )}
    </>
  );
}

export default Cart;
