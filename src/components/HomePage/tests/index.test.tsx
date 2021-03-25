import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import HomePage from "../index";

describe("<HomePage />", () => {
  const setupTest = () =>
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

  it("displays card for Exercise1", () => {
    const { getByRole } = setupTest();
    const exercise1Button = getByRole("button", { name: /view exercise 1/i });
    expect(exercise1Button).toBeVisible();
    expect(exercise1Button).toBeEnabled();
  });

  it("displays card for Exercise2", () => {
    const { getByRole } = setupTest();
    const exercise2Button = getByRole("button", { name: /view exercise 2/i });
    expect(exercise2Button).toBeVisible();
    expect(exercise2Button).toBeEnabled();
  });
});
