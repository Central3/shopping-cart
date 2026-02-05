import { describe, expect, it } from "vitest";
import routes from "./routes";
import { render, screen, within } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import userEvent from "@testing-library/user-event";
import findRouteById from "../utils/test-utils";

const mockedProducts = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
];

describe("Shop component", () => {
  it("renders the correct number of product cards from the loader", async () => {
    const testRoutes = [...routes];
    const targetRoute = findRouteById(testRoutes, "shop-data");

    targetRoute.loader = () => ({ data: mockedProducts });

    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/shop"],
    });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("heading", { name: mockedProducts[0].title })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: mockedProducts[1].title })
    ).toBeInTheDocument();

    const cards = screen.getAllByTestId("product");
    expect(cards).toHaveLength(2);
  });

  it("calls the add to cart logic when the button is clicked", async () => {
    const user = userEvent.setup();
    const testRoutes = [...routes];
    const targetRoute = findRouteById(testRoutes, "shop-data");
    targetRoute.loader = () => {
      return { data: mockedProducts };
    };

    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/shop"],
    });

    render(<RouterProvider router={router} />);

    expect(screen.queryByTestId("badge")).not.toBeInTheDocument();

    const addButtons = await screen.findAllByRole("button", {
      name: /add to cart/i,
    });
    await user.click(addButtons[0]);
    expect(await screen.findByTestId("badge")).toHaveTextContent("1");
    await user.click(addButtons[1]);
    expect(await screen.findByTestId("badge")).toHaveTextContent("2");
  });

  it("changes the button state after adding an item", async () => {
    const user = userEvent.setup();
    const testRoutes = [...routes];
    const targetRoute = findRouteById(testRoutes, "shop-data");
    targetRoute.loader = () => ({ data: mockedProducts });

    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/shop"],
    });

    render(<RouterProvider router={router} />);

    const cards = await screen.findAllByTestId("product");
    const firstCard = cards[0];

    const addBtn = within(firstCard).getByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addBtn);

    expect(within(firstCard).getByText(/added/i)).toBeInTheDocument();
    expect(
      within(firstCard).queryByText(/add to cart/i)
    ).not.toBeInTheDocument();
  });
});
