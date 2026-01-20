import { useOutletContext } from "react-router";
import Card from "./Card";

function Shop() {
  const { data } = useOutletContext();

  return (
    <div className="shop">
      <h1>Shop</h1>
      <div className="cards">
        {data &&
          data.map((item) => {
            return <Card key={item.id} data={item} />;
          })}
      </div>
    </div>
  );
}

export default Shop;
