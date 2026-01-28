import { useOutletContext } from "react-router";
import Card from "./Card";

function Shop() {
  const { data } = useOutletContext();

  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="cards">
        {data &&
          data.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
}

export default Shop;
