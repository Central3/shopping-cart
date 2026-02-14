import { useOutletContext } from "react-router";

function Card({ product }) {
  const { updateCartItem, cart } = useOutletContext();

  const inCart = cart.find((item) => item.id === product.id);
  const altText = `${product.title} product image`;

  return (
    <div className="card" data-testid="product">
      <div className="image-deck">
        <img src={product.image} alt={altText} />
      </div>
      <div className="item-info">
        <h2 className="item-title">{product.title}</h2>
        <p>
          ⭐{product.rating.rate}({product.rating.count})
        </p>
        <p>${product.price}</p>
        {inCart ? (
          <button className="added">Added</button>
        ) : (
          <button
            onClick={() => updateCartItem(product, 1)}
            className="add-cart"
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
