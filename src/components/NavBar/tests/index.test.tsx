import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NavBar from "../index";

describe("<NavBar />", () => {
  const setupTest = () =>
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

  describe("defaults", () => {
    it("renders navbar", () => {
      const { getByRole } = setupTest();
      expect(getByRole("navigation")).toBeVisible();
    });
  });
});
