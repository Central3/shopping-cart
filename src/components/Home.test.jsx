import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import routes from "./routes";

describe("Home Component", () => {
  it("renders home route successfully", () => {
    const testRoutes = [...routes];
    testRoutes[0].loader = () => ({
      data: [],
    });
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/"],
    });
    const { container } = render(<RouterProvider router={router} />);
    expect(container).toMatchSnapshot();
  });

  it("shows a 'Shop Now' navigation link on the home page", async () => {
    const testRoutes = [...routes];
    testRoutes[0].loader = () => [];
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);
    const link = await screen.findByRole("link", { name: /shop now/i });
    expect(link).toBeInTheDocument();
  });

  it("routes the user to the shop page via the home CTA", async () => {
    const user = userEvent.setup();
    const testRoutes = [...routes];
    testRoutes[0].loader = () => ({
      data: [],
    });
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    const link = await screen.findByRole("link", { name: /shop now/i });

    await user.click(link);

    const shopHeading = await screen.findByRole("heading", { name: /shop/i });
    expect(shopHeading).toBeInTheDocument();
  });
});
