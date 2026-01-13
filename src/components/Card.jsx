import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

function Card({ data }) {
  const { handleAddCart, cart } = useOutletContext();
  const inCart = cart.find((item) => item.id === data.id);
  const [itemCount, setItemCount] = useState(inCart ? inCart.count : 0);

  useEffect(() => {
    if (inCart) {
      setItemCount(inCart.count);
    } else {
      setItemCount(0);
    }
  }, [inCart]);

  function handleChange(e) {
    setItemCount(e.target.value);
  }

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
        <input
          id="item-count"
          type="number"
          value={itemCount}
          onChange={handleChange}
        />
        <button
          onClick={() => handleAddCart(data, itemCount)}
          className="add-cart"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default Card;
