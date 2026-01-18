import { useOutletContext } from "react-router";

function Card({ data }) {
  const { handleAddCart, cart } = useOutletContext();

  const inCart = cart.find((item) => item.id === data.id);

  return (
    <div className="card">
      <div className="image-deck">
        <img src={data.image} alt="" />
      </div>
      <div className="item-info">
        <p className="item-title">{data.title}</p>
        <p>
          ⭐{data.rating.rate}({data.rating.count})
        </p>
        <p>${data.price}</p>
        {inCart ? (
          <div className="added">Added</div>
        ) : (
          <button onClick={() => handleAddCart(data, 1)} className="add-cart">
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
