import { Link } from "react-router";
import image1 from "../assets/images/alex-roosso-KSJLQsXTgzE-unsplash.jpg";
import image2 from "../assets/images/spencer-plouzek-NLnSTuzsg5g-unsplash.jpg";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

function Home() {
  return (
    <div className="home">
      <div className="main-container">
        <div className="img-wrapper">
          <img src={image1} alt="" />
        </div>
        <div className="img-wrapper">
          <img src={image2} alt="" />
        </div>
        <Link className="shop-btn" to="/shop">
          Shop Now{" "}
          <Icon className="arrow-right" path={mdiArrowRight} size={1} />
        </Link>
      </div>
    </div>
  );
}

export default Home;
