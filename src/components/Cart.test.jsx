import { describe, expect, it } from "vitest";
import routes from "./routes";
import { createMemoryRouter, RouterProvider } from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

describe("Cart component", () => {
  it("shows empty cart", async () => {
    const testRoutes = [...routes];
    testRoutes[0].loader = () => ({ data: [] });
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/cart"],
    });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByRole("heading", {
        name: /your cart is empty/i,
        level: 2,
      })
    ).toBeInTheDocument();
  });

  it("shows cart items added from Shop", async () => {
    const user = userEvent.setup();
    const testRoutes = [...routes];
    testRoutes[0].loader = () => ({ data: mockedProducts });
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/shop"],
    });
    render(<RouterProvider router={router} />);

    const addButtons = await screen.findAllByRole("button", {
      name: /add to cart/i,
    });

    for (const btn of addButtons) {
      await user.click(btn);
    }

    addButtons.forEach(async (btn) => await user.click(btn));

    const cartLink = screen.getByTestId("cart-link");

    await user.click(cartLink);

    expect(
      screen.getByRole("heading", { name: mockedProducts[0].title, level: 3 })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: mockedProducts[1].title, level: 3 })
    ).toBeInTheDocument();
    expect(screen.getAllByTestId("cart-item")).toHaveLength(2);
  });

  it("correctly updates subtotal when quantities change", async () => {
    const user = userEvent.setup();
    const testRoutes = [...routes];
    testRoutes[0].loader = () => ({ data: [mockedProducts[0]] });
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/shop"],
    });

    render(<RouterProvider router={router} />);

    await user.click(
      await screen.findByRole("button", { name: /add to cart/i })
    );

    await user.click(screen.getByTestId("cart-link"));
    const cartCount = screen.getByTestId("badge");

    expect(cartCount).toHaveTextContent("1");
    expect(
      screen.getByText(/Subtotal \(1 item\): \$109.95/i)
    ).toBeInTheDocument();

    const plusBtn = screen.getByRole("button", { name: /increase-quantity/i });
    await user.click(plusBtn);
    expect(cartCount).toHaveTextContent("2");
    expect(
      screen.getByText(/Subtotal \(2 items\): \$219.90/i)
    ).toBeInTheDocument();

    const minusBtn = screen.getByRole("button", { name: /decrease-quantity/i });
    await user.click(minusBtn);
    expect(cartCount).toHaveTextContent("1");

    const deleteBtn = screen.getByRole("button", { name: /remove-item/i });
    await user.click(deleteBtn);
    expect(
      screen.getByRole("heading", { name: /your cart is empty/i, level: 2 })
    ).toBeInTheDocument();
  });
});
