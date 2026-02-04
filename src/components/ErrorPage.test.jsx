import { describe, expect, it } from "vitest";
import routes from "./routes";
import { createMemoryRouter, RouterProvider } from "react-router";
import { render, screen } from "@testing-library/react";

describe("Error page", () => {
  it("renders API error message when loader fails", async () => {
    const testRoutes = [...routes];
    testRoutes[0].loader = () => {
      throw new Error("Failed to fetch products");
    };
    const router = createMemoryRouter(testRoutes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);

    expect(
      await screen.findByText(/failed to fetch products/i)
    ).toBeInTheDocument();
  });

  it("renders 404 message for non-existent routes", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/this-route-does-not-exist"],
    });

    render(<RouterProvider router={router} />);

    expect(
      screen.getByRole("heading", {
        name: /oh no, this page doesn't exist!/i,
        level: 1,
      })
    ).toBeInTheDocument();
  });
});
