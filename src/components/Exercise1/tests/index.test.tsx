import { render } from "@testing-library/react";

import Exercise1 from "../index";

describe("<Exercise1 />", () => {
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    errorSpy = jest.spyOn(global.console, "error");
  });

  afterEach(() => {
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("renders form with default values", () => {
    const { getByRole } = render(<Exercise1 />);
    const input = getByRole("textbox", { name: /github username input/i });
    expect(input).toHaveTextContent("");
    expect(input).toBeEnabled();
  });
});
