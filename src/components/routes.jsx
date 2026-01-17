import shoppingItems from "../utils/fetchItems.js";
import App from "../App.jsx";
import Home from "./Home.jsx";
import Shop from "./Shop.jsx";
import Cart from "./Cart.jsx";
import ErrorPage from "./ErrorPage.jsx";

const routes = [
  {
    path: "/",
    loader: shoppingItems,
    element: <App />,
    ErrorBoundary: ErrorPage,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      {
        path: "shop",
        element: <Shop />,
      },
      { path: "cart", element: <Cart /> },
    ],
  },
];

export default routes;
