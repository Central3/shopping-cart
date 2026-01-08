function Card({ data }) {
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
        <button className="add-cart">Add to cart</button>
      </div>
    </div>
  );
}

export default Card;
