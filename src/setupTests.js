import "@testing-library/jest-dom/extend-expect";

let errorSpy: jest.SpyInstance;

beforeEach(() => {
  errorSpy = jest.spyOn(global.console, "error");
});

afterEach(() => {
  expect(errorSpy).not.toHaveBeenCalled();
});
